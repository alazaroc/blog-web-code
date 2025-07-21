---
layout: post
title: Automatizando el despliegue de recursos de AWS con GitHub Actions y Terraform
date: 2025-09-04 03:38 +0200
last_modified_at:
lang: es
lang-exclusive: ['en', 'es']
description: Aprende a automatizar el despliegue de recursos en AWS usando Terraform y GitHub Actions con esta guía paso a paso.
category: 
- DevOps
tags: 
- how-to
- github
- github-actions
- iac
- cicd
- terraform
- level-300
level: 300
published: true
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath:  /assets/img/posts/2024-10-02-automating-aws-resource-deployment-with-github-actions-and-terraform/
image:
  path: 7-deployment-successful.png
  header_post: false
series:
  name: "Terraform & AWS"
  order: 2
  total: 3
  description: "Serie sobre Terraform y AWS"
---

> Traducido el 04/09/2025, actualizando también el artículo original para explicar el enfoque recomendado con OIDC y reemplazar las claves de acceso de AWS de larga duración.
{: .prompt-tip }

## 1. Introducción

En artículos anteriores hemos tratado `Terraform` y explorado diversas `estrategias DevOps para automatizar despliegues en AWS`.

- [Cómo desplegar una web serverless con Terraform](https://playingaws.com/posts/how-to-deploy-serverless-website-with-terraform/)
- [Cómo añadir CI/CD a mi proyecto de CDK](https://playingaws.com/posts/how-to-add-ci-cd-to-my-cdk-project/)
- [Cómo añadir CI/CD a mi proyecto de SAM](https://playingaws.com/posts/how-to-add-ci-cd-to-my-sam-project/)

Estos artículos todavía no están traducidos. Dejo los links a los artículos en inglés.

Ahora vamos a automatizar el `despliegue de proyectos Terraform utilizando GitHub Actions`. Independientemente de lo que necesites desplegar, este enfoque permite despliegues de infraestructura con Terraform de forma eficiente y automatizada.

Antes de entrar en detalles quiero mencionar que explicaré dos enfoques para configurar la autenticación con AWS, usando OIDC o usando Secrets.

Y he creado un repositorio para cada tipo:

- Desplegando Terraform desde GitHub usando OIDC: [https://github.com/alazaroc/terraform-aws-cicd-github-actions-with-oidc](https://github.com/alazaroc/terraform-aws-cicd-github-actions-with-oidc){:target="_blank"}
- Desplegando Terraform desde GitHub usando secrets: [https://github.com/alazaroc/terraform-aws-cicd-github-actions-with-secrets](https://github.com/alazaroc/terraform-aws-cicd-github-actions-with-secrets){:target="_blank"}
{: .prompt-info }

> Siéntete libre de personalizar los ejemplos. **puedes utilizarlos para desplegar cualquier recurso de AWS**.
{: .prompt-tip }

### 1.1. ¿Qué es GitHub Actions?

**GitHub Actions** es una herramienta de automatización dentro de GitHub que permite crear flujos de trabajo desencadenados por eventos de GitHub, como *pushes* o *pull requests*. Se utiliza habitualmente para pipelines de CI/CD que automatizan tareas como pruebas, construcción y despliegue de aplicaciones.

### 1.2. Cómo funciona GitHub Actions con Terraform

Al usar GitHub Actions para desplegar recursos con Terraform, el flujo típico incluye:

- **Disparar flujos de trabajo** en función de cambios en el repositorio.
- **Configurar el acceso a AWS** mediante GitHub Secrets (o, preferiblemente, usando **OIDC** por mayor seguridad).
- **Ejecutar comandos de Terraform** (p. ej., `terraform plan`, `terraform apply`) para gestionar la infraestructura.

### 1.3. Requisitos previos

Antes de empezar, asegúrate de contar con:

- **Cuenta de AWS** con permisos para crear los recursos (S3, DynamoDB, Budgets).
- **Repositorio de GitHub** para almacenar tu configuración de Terraform.
  > - Desplegando Terraform desde GitHub usando OIDC: [https://github.com/alazaroc/terraform-aws-cicd-github-actions-with-oidc](https://github.com/alazaroc/terraform-aws-cicd-github-actions-with-oidc){:target="_blank"}
  > - Desplegando Terraform desde GitHub usando secrets: [https://github.com/alazaroc/terraform-aws-cicd-github-actions-with-secrets](https://github.com/alazaroc/terraform-aws-cicd-github-actions-with-secrets){:target="_blank"}
  {: .prompt-info }
- Opcional:
  - **Backend remoto para el estado de Terraform**: puedes usar un bucket de S3 y una tabla de DynamoDB para el *state locking*.
  - **Terraform instalado localmente**: recomendable para probar en local antes de hacer *commit*.

> La autenticación con AWS se configurará más adelante.
{: .prompt-warning }

## 2. Paso 1: Prepara el código de Terraform

Crea tu código de Terraform. En este ejemplo, desplegaremos un recurso sencillo de **AWS Budget**, pero puedes desplegar cualquier cosa con Terraform.

Primero, crea un archivo `main.tf` con el siguiente contenido:

```hcl
provider "aws" {
  region = "eu-west-1"
}

# Personaliza con tu propio bucket S3 y tabla DynamoDB si quieres usar un backend remoto para el estado
terraform {
  backend "s3" {
    bucket         = "terraform-tfstate-playingaws-poc"     # Actualízalo
    key            = "poc/terraform-github-actions.tfstate" # Actualízalo
    region         = "eu-west-1"                            # Actualízalo
    dynamodb_table = "terraform-lock"                       # Actualízalo
    encrypt        = true
  }
}

resource "aws_budgets_budget" "zero_spend_budget" {
  name         = "ZeroSpendBudget"
  budget_type  = "COST"
  limit_amount = "0.1"
  limit_unit   = "USD"
  time_unit    = "MONTHLY"
  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 0
    threshold_type             = "ABSOLUTE_VALUE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = ["your_email@domain.com"]
  }
}
```

> Si **no** incluyes la configuración del backend, por defecto el estado de Terraform se almacena localmente en el *runner* de GitHub. Esto puede provocar inconsistencias del estado en ejecuciones posteriores, por lo que se recomienda usar un backend remoto.
{: .prompt-warning }

> Si incluyes la configuración del backend pero **no** has creado previamente el bucket S3 y la tabla de DynamoDB, obtendrás un error en la ejecución del pipeline.
{: .prompt-danger }

## 3. Paso 2: Configurar las credenciales de AWS en GitHub

Para que GitHub Actions pueda desplegar recursos en tu cuenta de AWS, debes proporcionar credenciales de AWS al *runner*. Hay dos maneras de hacerlo:

- **`OIDC (recomendado)`**: credenciales temporales emitidas en tiempo de ejecución mediante OpenID Connect, con una **trust policy** restrictiva ligada a tu repositorio/rama (*sin* secretos estáticos).
- **Legacy (menos seguro)**: claves de acceso de larga duración almacenadas como GitHub Secrets.

A continuación se muestran ambos enfoques. Empezaremos con OIDC y después veremos el método legacy para escenarios de compatibilidad o migración.

### 3.1. Uso de OIDC (recomendado)

Aunque almacenar claves de acceso en GitHub Secrets funciona, ya no es la mejor práctica. Un enfoque más seguro es usar **GitHub OpenID Connect (OIDC)** para `obtener credenciales temporales directamente desde AWS, sin secretos de larga duración`.

#### Por qué OIDC es mejor

- **Sin secretos estáticos** almacenados en GitHub → menor riesgo de filtraciones.  
- **Credenciales efímeras** → válidas solo durante un corto periodo.  
- **Trust policy granular** → restringe el acceso a repositorios/ramas concretas.

#### Cómo funciona

1. Configura **GitHub como proveedor OIDC** en tu cuenta de AWS.  
2. Crea un **IAM Role** con una *trust policy* restringida a tu repositorio y rama de GitHub.  
3. Adjunta la **política de mínimo privilegio** necesaria para Terraform (S3, DynamoDB y Budgets en este ejemplo).  
4. Actualiza tu workflow para usar OIDC.

Ejemplo de *trust policy*:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Federated": "arn:aws:iam::<YOUR_ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com" },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:<YOUR_ORG_OR_USER>/<YOUR_REPO>:ref:refs/heads/main"
        }
      }
    }
  ]
}
```

Cambio clave en el workflow:

{% raw %}

```yaml
permissions:
  id-token: write
  contents: read

- name: Configure AWS credentials (OIDC)
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::<YOUR_ACCOUNT_ID>:role/<ROLE_FOR_GITHUB>
    aws-region: eu-west-1 # TODO: ${{ env.AWS_REGION }} --> remove spaces between "{{" and "}}"
```

{% endraw %}

Usando OIDC, GitHub Actions obtiene credenciales de corta vida en cada ejecución, haciendo la configuración **`más segura y alineada con las buenas prácticas de AWS`**.

> OIDC es hoy el estándar del sector para conectar GitHub Actions con AWS. Al adoptarlo, reduces el riesgo de comprometer credenciales y te alineas con las buenas prácticas de seguridad de AWS.
{: .prompt-tip }

### 3.2. Uso de GitHub Secrets (Legacy)

Si todavía no puedes usar OIDC (por restricciones organizativas, por ejemplo), puedes recurrir a almacenar **AWS Access Keys** en GitHub Secrets.

Añade los siguientes *secrets* en tu repositorio de GitHub:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

¿Cómo?

- Ve a la configuración del repositorio.
  - ![1-access-settings](1-access-settings.png)
- Navega a *Secrets and Variables* → *Actions*.
  - ![2-access-secrets](2-access-secrets.png)
  - ![3-create-new-secret](3-create-new-secret.png)
- Crea los secretos:
  - `AWS_ACCESS_KEY_ID`: tu Access Key ID.
  - `AWS_SECRET_ACCESS_KEY`: tu Secret Access Key.
  - ![4-secrets-created](4-secrets-created.png)

Esto garantiza que tus credenciales de AWS estén disponibles de forma segura para el workflow de GitHub Actions.

Después, configura el workflow así:

{% raw %}

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
   
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: "eu-west-1"
```

{% endraw %}

> Aunque tu repositorio sea público, `tus credenciales de AWS permanecen seguras` al almacenarse en la sección de Secrets cifrada.
>
> GitHub también incluye **detección de secretos** para evitar exposiciones accidentales.
{: .prompt-tip }

## 4. Paso 3: Configurar GitHub Actions para el despliegue de Terraform

Ahora que tenemos el código de Terraform, vamos a configurar `GitHub Actions` para automatizar su despliegue.

Crea el archivo de workflow en tu repositorio de GitHub en `.github/workflows/terraform-deploy.yml`.

### 4.1. Usando OIDC (recomendado)

{% raw %}

```yaml
name: Terraform Deploy (OIDC)

on:
  push:
    branches:
      - main
    paths:
      - 'main.tf'
      - '.github/workflows/terraform-deploy.yml'
  pull_request:
    branches:
      - main
    paths:
      - 'main.tf'
      - '.github/workflows/terraform-deploy.yml'
  workflow_dispatch:

permissions:
  id-token: write   # requerido para OIDC
  contents: read    # requerido para checkout

env:
  AWS_REGION: eu-west-1
  TF_IN_AUTOMATION: true

concurrency:
  group: terraform-${{ github.ref }}
  cancel-in-progress: false

jobs:
  plan:
    name: Terraform Plan
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::<YOUR_ACCOUNT_ID>:role/<ROLE_FOR_GITHUB>
          aws-region: ${{ env.AWS_REGION }}

      - name: Terraform Init
        run: terraform init -input=false

      - name: Terraform Format Check
        run: terraform fmt -check

      - name: Terraform Validate
        run: terraform validate

      - name: Terraform Plan
        run: terraform plan -input=false -out=tfplan

      - name: Upload plan artifact
        uses: actions/upload-artifact@v4
        with:
          name: tfplan
          path: tfplan

  apply:
    name: Terraform Apply (requires approval)
    needs: plan
    runs-on: ubuntu-latest
    environment:
      name: production   # configura protecciones del Environment (reviewers) en GitHub -> Settings -> Environments
    if: github.event_name != 'pull_request'  # no aplicar en PRs

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::<YOUR_ACCOUNT_ID>:role/<ROLE_FOR_GITHUB>
          aws-region: ${{ env.AWS_REGION }}

      - name: Terraform Init
        run: terraform init -input=false

      - name: Download plan artifact
        uses: actions/download-artifact@v4
        with:
          name: tfplan
          path: .

      - name: Terraform Apply
        run: terraform apply -input=false tfplan
```

{% endraw %}

> En el job `apply` especificamos `environment: production`.
>
> Esto te permite configurar **Environment Protection Rules** en GitHub (Settings → Environments → *production*), de modo que `terraform apply` requiera **aprobación manual** antes de ejecutarse.
>
> Si no necesitas este comportamiento, puedes quitar la línea `environment:` sin problema.
{: .prompt-tip }

> Sugerencia: también puedes definir múltiples entornos (p. ej., `staging`, `production`) y requerir revisores distintos para cada uno.
{: .prompt-tip }

### 4.2. Usando GitHub Secrets (Legacy)

{% raw %}

```yaml
name: Deploy Terraform

on:
  push:
    branches:
      - main

jobs:
  terraform:
    name: Deploy Terraform Job
    runs-on: ubuntu-latest

    steps:
      # Recupera el código del repositorio
      - name: Checkout code
        uses: actions/checkout@v4

      # Instala Terraform en el runner de GitHub
      - name: Set up Terraform
        uses: hashicorp/setup-terraform@v3

      # Configura el acceso a AWS usando credenciales en GitHub Secrets
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
         
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      # Inicializa Terraform
      - name: Initialize Terraform
        run: terraform init

      # Ejecuta terraform plan
      - name: Terraform Plan
        run: terraform plan

      # Aplica cambios de Terraform
      - name: Terraform Apply
        run: terraform apply -auto-approve

      # Destruye recursos (descomenta si lo necesitas)
      # - name: Terraform Destroy
      #   run: terraform destroy -auto-approve
```

{% endraw %}

## 5. Paso 4: Probar la configuración

Haz *push* de tu código de Terraform y de la configuración de GitHub Actions a la rama `main`.

![5-commit-code](5-commit-code.png)

GitHub Actions se disparará automáticamente y podrás monitorizar la ejecución en la pestaña **Actions** de tu repositorio.

![6-automatic-deployment](6-automatic-deployment.png)

Si el despliegue tiene éxito, tu **AWS Budget** (o el recurso que hayas definido) quedará aplicado automáticamente.

![7-deployment-successful](7-deployment-successful.png)

![8-aws-resource-created](8-aws-resource-created.png)

A partir de ahora, cada vez que empujes cambios al repositorio se ejecutará el pipeline; **si no has realizado cambios**, la ejecución finalizará con un mensaje similar a este:

![9-new-execution-without-changes](9-new-execution-without-changes.png)

## 6. Conclusión

Usando `GitHub Actions` para desplegar recursos `con Terraform` puedes **`automatizar por completo la gestión de tu infraestructura`**. La combinación de Terraform y GitHub Actions crea un pipeline de CI/CD potente que permite aplicar cambios de infraestructura de forma automática.

Aunque en este ejemplo hemos usado un recurso de **AWS Budget**, puedes aplicar el mismo proceso a cualquier otro recurso de AWS soportado por Terraform.

> Aunque este artículo muestra ambos métodos, el enfoque recomendado es usar **OIDC** para evitar credenciales estáticas y mejorar la seguridad.
{: .prompt-warning }

## 7. Próximos pasos

- **Aprobación manual para "terraform apply"**: añade un paso de aprobación para revisar la salida del *plan* antes de aplicar.  
- **Herramientas de seguridad**: integra *tflint* y *checkov* para linting y comprobaciones de seguridad.  
- **Pruebas automatizadas**: usa *terratest* para validar tu código de Terraform antes del despliegue.  
- **Migración a OIDC**: si aún usas **AWS Access Keys** en GitHub Secrets, **`migra al enfoque OIDC cuanto antes`** para reducir riesgos y alinearte con las buenas prácticas de seguridad de AWS.
  - He escrito un artículo sobre [cómo migrar de GitHub Secrets a OIDC](/posts/migrating-from-github-secrets-to-oidc-for-terraform-deployments-on-aws/)

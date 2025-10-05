---
layout: post
title: Migración de GitHub Secrets (legacy) a OIDC en despliegues Terraform sobre
  AWS
date: 2025-09-05 06:33 +0200
last_modified_at:
lang: es
lang-exclusive:
- en
- es
description: Por qué y cómo migrar de Access Keys en GitHub Secrets a OIDC para desplegar infraestructura con Terraform y GitHub Actions en AWS.
category:
- DevOps
tags:
- oidc
- seguridad
- github-actions
- terraform
- iac
- cicd
- migration
level: 300
published: true
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2025-09-05-migrating-from-github-secrets-to-oidc-for-terraform-deployments-on-aws/
image:
  path: github-actions-execution-oidc-configuration.png
  header_post: false
---
---

## 1. Introducción

En este artículo te explico **cómo migrar** un repositorio que usa **GitHub Secrets (legacy)** con *Access Keys* a **OIDC**, tomando como ejemplo un despliegue con Terraform sobre AWS.

El objetivo es que entiendas **por qué** conviene migrar y **cómo** hacerlo con el mínimo riesgo y sin interrumpir tus pipelines.

Si buscas el tutorial completo del pipeline (con código y workflows) empieza por la guía base: **[Automatizando el despliegue de recursos de AWS con GitHub Actions y Terraform](/posts/automating-aws-resource-deployment-with-github-actions-and-terraform/)**.

Repos de ejemplo (mismos recursos, distintas autenticaciones):

- [Desplegando Terraform desde GitHub usando OIDC](https://github.com/alazaroc/terraform-aws-cicd-github-actions-with-oidc)
- [Desplegando Terraform desde GitHub usando secrets](https://github.com/alazaroc/terraform-aws-cicd-github-actions-with-secrets)

---

## 2. Por qué migrar de **Access Keys (Secrets)** a **OIDC**

Antes de tocar nada, merece la pena entender **qué ganamos** con el cambio.

### 2.1. Riesgos de las claves estáticas (método legacy)

- **Exposición accidental**: ramas, *forks*, logs, *screenshots*, paquetes NPM/publicaciones…
- **Larga vida**: si se filtran, el impacto y el radio de blast pueden ser altos.
- **Rotación manual**: más operativa y más riesgo humano.
- **Difícil acotar el alcance**: las *policies* tienden a sobredimensionarse.

### 2.2. Ventajas de OIDC (recomendado)

- **Sin secretos de larga duración** en GitHub → credenciales **efímeras** en tiempo de ejecución.
- **Trust policy granular**: restringe por **org/repo/branch**, y también por *paths* si lo necesitas.
- **Menos operativa**: adiós a rotaciones periódicas de Access Keys.
- **Buenas prácticas**: reduce superficie de ataque y facilita auditoría/forensics.

### 2.3. ¿Cuándo podría seguir usando el método legacy?

- Restricciones temporales de la organización.
- Repositorios heredados que requieren una migración progresiva.
- Entornos de laboratorio o cuentas personales (aun así, mejor OIDC).

---

## 3. Plan de migración paso a paso

Vamos a migrar de **Secrets** a **OIDC** con un **plan en 6+1 pasos**. Son pasos cortos y acotados, pensados para minimizar riesgos y permitir **rollback** si lo necesitas.

### Paso 1: Inventario y preparación

- Identifica los repos que usan `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY`.
- Verifica quién consume el *state* de Terraform (S3) y los permisos que requiere.
- (Opcional) Define **Environments** (p. ej., `staging`, `production`) y quién aprueba `apply`.

### Paso 2: Habilitar el **OIDC provider** de GitHub en AWS (una vez por cuenta)

Si tu cuenta aún no lo tiene, **crea el proveedor OIDC** con estos datos:

- **Provider URL**: `https://token.actions.githubusercontent.com`
- **Audience (client ID)**: `sts.amazonaws.com`

**Vía consola (recomendado):**

1. IAM → *Identity providers* → **Add provider**.
2. Tipo **OpenID Connect**.
3. *Provider URL*: pega `https://token.actions.githubusercontent.com`.
4. *Audience*: añade `sts.amazonaws.com`.
5. Revisa los **thumbprints** que la consola muestra (AWS suele rellenarlos automáticamente).
6. Guarda.

![aws-identity-provider-configuration](aws-identity-provider-configuration.png)

> Documenta el alta del proveedor (quién, cuándo y por qué) y vincúlalo a tu repositorio/proyecto.
{: .prompt-tip }

### Paso 3: Configurar **IAM Role** en AWS (uno por repositorio o uno por cuenta)

`Lo recomendado es crear un IAM Role por repositorio`, para que puedas seguir el principio del mínimo privilegio (recomendado), pero también podrías crear un solo IAM Role para todos tus despliegues de GitHub con permisos más amplios (no recomendado pero más práctico).

Vía consola (recomendado):

1. IAM → Roles → **Create Role**
2. Tipo **Custom trust policy**
3. Indicar Custom trust policy

    Restringida a una rama concreta (`main`) de un repo específico:

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

    Ajusta `<YOUR_ORG_OR_USER>` y `<YOUR_REPO>`. Si necesitas permitir más ramas, añade más patrones `sub` o amplía el patrón `StringLike`.

4. Añade los permisos de la **política de mínimo privilegio**

    Para el ejemplo del artículo (state en S3 y **AWS Budgets**), el resumen de permisos sería:

    - **S3 (bucket del state)**: `ListBucket`, `Get/PutBucketVersioning`; en objetos `Get/Put/Delete` sobre `arn:aws:s3:::<BUCKET>/*`
    - **Budgets**: `Create/Update/Delete/Describe*`, `Create/Update/DeleteNotification` (**Resource: "*"** en la mayoría de acciones)

    **¿Por qué estos permisos?**

    - S3 da servicio al **state** y **lock** de Terraform.
    - Budgets es el recurso **de ejemplo** que crea el código del repositorio (ajústalo a tu caso).

    > Mantén el **scope** lo más acotado posible (región, tabla, bucket, prefijos). Esto reduce el impacto en caso de uso indebido y se ajusta al principio de **mínimo privilegio**.
    {: .prompt-tip }

5. Termina de crear el rol y guárdate el ARN

### Paso 4: Actualizar el **workflow** para usar OIDC

Fragmento clave (añade *permissions* y configura `configure-aws-credentials` con `role-to-assume`):

{% raw %}

```yaml
permissions:
  id-token: write
  contents: read

- name: Configure AWS credentials (OIDC)
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: ${{ vars.AWS_ROLE_FOR_GITHUB_DEPLOYMENTS }}
    aws-region: ${{ env.AWS_REGION }}
```

{% endraw %}

Puedes actualizar directamente el valor de "role-to-assume" o puedes crearte una variable de GitHub y definirla en la configuración del proyecto.

En mi caso crearé una variable:

![github-repository-secrets](github-repository-secrets.png){: width="400" }

![github-repository-variables](github-repository-variables.png){: width="700" }

![github-repository-variables-role](github-repository-variables-role.png){: width="550" }

{% raw %}

```yaml
permissions:
  id-token: write
  contents: read

- name: Configure AWS credentials (OIDC)
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: ${{ vars.AWS_ROLE_FOR_GITHUB_DEPLOYMENTS }}
    aws-region: ${{ env.AWS_REGION }}
```

{% endraw %}

> Recuerda sustituir la variable `role-to-assume` en todas partes
{: .prompt-tip }

Este es el Workflow completo de despliegue (con plan/apply/manual destroy, y approvals opcionales):

{% raw %}

```yaml
name: Terraform Deploy (OIDC)

on:
  push:
    branches: [ main ]
    paths:
      - '**.tf'
      - '.github/workflows/terraform-deploy.yml'
  pull_request:
    branches: [ main ]
    paths:
      - '**.tf'
      - '.github/workflows/terraform-deploy.yml'
  workflow_dispatch:
    inputs:
      action:
        description: "Select action to run"
        type: choice
        required: true
        options:
          - plan-apply
          - destroy
        default: plan-apply
      var_file:
        description: "Optional .tfvars file (e.g., dev.tfvars)"
        required: false
        default: ""

permissions:
  id-token: write   # required for OIDC
  contents: read    # required for checkout

env:
  AWS_REGION: eu-west-1
  TF_IN_AUTOMATION: true
  STATE_BUCKET: terraform-tfstate-playingaws-poc  # <- keep in sync with backend bucket

concurrency:
  group: terraform-${{ github.ref }}
  cancel-in-progress: false

jobs:
  plan:
    name: Terraform Plan
    runs-on: ubuntu-latest
    # run on push/PR, or when manually triggered with action=plan-apply
    if: github.event_name != 'workflow_dispatch' || github.event.inputs.action == 'plan-apply'
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ vars.AWS_ROLE_FOR_GITHUB_DEPLOYMENTS }} # or hardcode the updated value "arn:aws:iam::<YOUR_ACCOUNT_ID>:role/<ROLE_FOR_GITHUB>"
          aws-region: ${{ env.AWS_REGION }}

      # Optional safety net to avoid init failures if the state bucket was deleted
      - name: Ensure backend bucket exists (optional)
        run: |
          if ! aws s3api head-bucket --bucket "$STATE_BUCKET" 2>/dev/null; then
            aws s3api create-bucket --bucket "$STATE_BUCKET" \
              --region "$AWS_REGION" \
              --create-bucket-configuration LocationConstraint="$AWS_REGION"
            aws s3api put-bucket-versioning --bucket "$STATE_BUCKET" \
              --versioning-configuration Status=Enabled
          fi

      - name: Terraform Init
        run: terraform init -input=false

      - name: Terraform Format Check
        run: terraform fmt -check

      - name: Terraform Validate
        run: terraform validate

      - name: Terraform Plan
        run: |
          if [ -n "${{ github.event.inputs.var_file }}" ]; then
            terraform plan -input=false -out=tfplan -var-file="${{ github.event.inputs.var_file }}"
          else
            terraform plan -input=false -out=tfplan
          fi

      - name: Upload plan artifact
        uses: actions/upload-artifact@v4
        with:
          name: tfplan
          path: tfplan

  apply:
    name: Terraform Apply (requires approval)
    needs: plan
    runs-on: ubuntu-latest
    # do not apply on PRs; allow on push or manual action=plan-apply
    if: github.event_name != 'pull_request' && (github.event_name != 'workflow_dispatch' || github.event.inputs.action == 'plan-apply')
    environment:
      name: production   # configure required reviewers in Settings → Environments → production
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ vars.AWS_ROLE_FOR_GITHUB_DEPLOYMENTS }}
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

  destroy:
    name: Terraform Destroy (manual)
    runs-on: ubuntu-latest
    # only when manually triggered with action=destroy
    if: github.event_name == 'workflow_dispatch' && github.event.inputs.action == 'destroy'
    environment:
      name: production   # optional: require approval for destroys as well
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ vars.AWS_ROLE_FOR_GITHUB_DEPLOYMENTS }}
          aws-region: ${{ env.AWS_REGION }}

      # Optional safety net (same as in plan)
      - name: Ensure backend bucket exists (optional)
        run: |
          if ! aws s3api head-bucket --bucket "$STATE_BUCKET" 2>/dev/null; then
            aws s3api create-bucket --bucket "$STATE_BUCKET" \
              --region "$AWS_REGION" \
              --create-bucket-configuration LocationConstraint="$AWS_REGION"
            aws s3api put-bucket-versioning --bucket "$STATE_BUCKET" \
              --versioning-configuration Status=Enabled
          fi

      - name: Terraform Init
        run: terraform init -input=false

      - name: Terraform Destroy
        run: |
          if [ -n "${{ github.event.inputs.var_file }}" ]; then
            terraform destroy -input=false -auto-approve -var-file="${{ github.event.inputs.var_file }}"
          else
            terraform destroy -input=false -auto-approve
          fi
```

{% endraw %}

### Paso 5: Validar que estás usando el rol OIDC

Puedes validarlo **en el propio workflow** (recomendado) o **desde tu equipo** si asumes el rol manualmente.

**En el workflow (paso temporal de diagnóstico):**

```yaml
- name: Who am I?
  run: aws sts get-caller-identity
```

**Desde tu equipo (si asumes el rol OIDC con tus herramientas):**

```bash
aws sts get-caller-identity
```

En ambos casos deberías ver el **IAM Role** en el campo `Arn`. Si ves un **usuario IAM**, sigues usando Access Keys (legacy).

O también puedes **validar la ejecución del workflow y revisar los logs**:

Dependiendo del proyecto y entorno que estés, esto puede ser otra opción. De todas formas, lo recomendado es testear que la configuración es correcta antes de ejecutarlo...

![github-actions-execution-oidc-configuration](github-actions-execution-oidc-configuration.png)

### Paso 6: Retirar secretos legacy y limpiar

- Deshabilita el workflow antiguo basado en **Secrets** (o déjalo como `workflow_dispatch` manual, solo para emergencia).
- Elimina `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY` en **Settings → Secrets and variables → Actions**.
- Revisa **CloudTrail** y **IAM Access Analyzer** para confirmar que no quedan usos residuales.

### Paso 7: Monitoreo y *post-mortem* ligero

- Añade alertas básicas (fallos de job, fallos de OIDC).
- Documenta incidencias de la migración (qué salió bien, lecciones aprendidas).

---

## 4. Errores comunes y cómo solucionarlos

Problemas frecuentes en migraciones reales (con mensajes típicos y arreglo rápido):

- **Backend S3 inexistente**
  - Error:  
    `Error: Failed to get existing workspaces: S3 bucket "<bucket>" does not exist.`  
  - Fix: crea el bucket (con versioning) y `terraform init -reconfigure`. En CI, paso “Ensure backend bucket exists”. Con TF ≥ 1.10 usa `use_lockfile = true` en el backend y elimina `dynamodb_table`.

- **Recurso Budget ya existe**
  - Error:  
    `DuplicateRecordException: ... the budget already exists.`  
  - Fix: añade sufijo estable con `random_id` en `name` **o** elimina/importa el presupuesto existente.

- **No se cargan credenciales OIDC**
  - Error:  
    `Credentials could not be loaded, please check your action inputs: Could not load credentials from any providers`  
  - Fix: comprueba `id-token: write`, evento soportado (no PRs desde fork), proveedor OIDC en AWS y *trust policy*; verifica que `role-to-assume` **no esté vacío** (variable/secret bien definida).

- **ARN inválido al asumir la role**
  - Error:  
    `Could not assume role with OIDC: Request ARN is invalid`  
  - Fix: no hardcodes; usa en **todos** los jobs la misma variable/secret p.ej.  
    `role-to-assume: ${{ vars.AWS_ROLE_FOR_GITHUB_DEPLOYMENTS }}`. Revisa que el ARN sea de **rol**, sin espacios ni comillas, y que exista en la partición correcta.

- **Bloqueo del estado en S3**
  - Error:  
    `Error acquiring the state lock … PreconditionFailed (StatusCode: 412)`  
  - Fix: evita carreras con  
  
    ```yaml
    concurrency:
      group: terraform-state
      cancel-in-progress: true
    ```  
  
    añade `-lock-timeout=5m` y usa **otra clave de state para PRs** (`key=poc/pr-<num>/terraform.tfstate`). Si quedó colgado: `terraform force-unlock <LOCK_ID>` (con precaución).

- **Falta permiso OIDC**
  - Error: *(no hay token)*  
    `permissions: id-token: write` ausente en workflow/job  
  - Fix: añade
  
    ```yaml
    permissions:
      id-token: write
      contents: read
    ```

- **Trust policy no coincide**
  - Error: *aud/sub no coinciden*  
    `aud` ≠ `sts.amazonaws.com` o `sub` no casa con el repo/branch/evento  
  - Fix: `aud: sts.amazonaws.com` y `sub: repo:ORG/REPO:ref:refs/heads/*` (añade `pull_request`/`refs/tags/*` si aplica).

- **Rol sin permisos suficientes**
  - Error: *AccessDenied* en S3/DynamoDB/Budgets  
  - Fix: mínimo privilegio para **S3 (state)**, **Budgets** y (si lo usas) **DynamoDB**; acota por bucket/tabla/región.

- **Aprobaciones olvidadas**
  - Comportamiento: `apply` sin revisión previa  
  - Fix: usa `environment:` y configura *required reviewers* en GitHub → Settings → Environments.

- **Paths/triggers mal definidos**
  - Síntoma: el pipeline no se dispara / se dispara “de más”  
  - Fix: revisa `on.push.paths` / `paths-ignore` para incluir/ignorar lo correcto.

Una captura con algunas de las pruebas...

![github-actions-execution-errors](github-actions-execution-errors.png)

---

## 5. Checklist de migración (resumen)

- [ ] 1. Inventario de repos con Access Keys en Secrets.
- [ ] 2. Crear/validar **OIDC provider** en AWS.
- [ ] 3. Crear **IAM Role** (*trust policy* OIDC y adjuntar **política de mínimo privilegio**).
- [ ] 4. Actualizar workflow a **OIDC** (`id-token: write` + `role-to-assume`).
- [ ] 5. Validar con `aws sts get-caller-identity`.
- [ ] 6. Retirar secretos legacy y deshabilitar workflow antiguo.
- [ ] (Opcional) Activar **Environment Protection Rules** para `apply`.

---

## 6. Conclusión

Migrar de **Access Keys en Secrets** a **OIDC** reduce drásticamente el riesgo, simplifica la operación y alinea tus pipelines con las **`mejores prácticas de seguridad`**.

Si necesitas un ejemplo funcionando, consulta:

- Mi artículo base que explica el proceso completo de cómo **[automatizar el despliegue de recursos de AWS con GitHub Actions y Terraform](/posts/automating-aws-resource-deployment-with-github-actions-and-terraform/)**.
- Mi repositorio GitHub de:
  - [Ejemplo usando OIDC](https://github.com/alazaroc/terraform-aws-cicd-github-actions-with-oidc)
  - [Ejemplo usando secrets](https://github.com/alazaroc/terraform-aws-cicd-github-actions-with-secrets)

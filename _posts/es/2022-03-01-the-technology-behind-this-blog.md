---
layout: post
title: Cómo decidí la tecnología del blog
date: 2022-03-02 21:49 +0100
last_modified_at:
lang: es
lang-exclusive: ['en','es']
description: Antes de crear mi blog y empezar a publicar, investigué mucho comparando tecnologías, haciendo pruebas de concepto y tardé semanas en averiguar cómo hacerlo. ¿Quieres saber más?
category:
- Arquitectura
tags:
- amplify
- cdk
- github
- serverless
- level-200
level: 200
published: true
pin: false
featured_post: false
comments: true
sitemap: true
mermaid: true
media_subpath: /assets/img/posts/2022-03-01-the-technology-behind-this-blog/
image:
  path: technology_blog.jpg
  header_post: false
---
---

> Última actualización: He migrado mi sitio web de AWS Amplify Hosting a Terraform + S3 + CloudFront + AWS Certificate Manager + Developer Tools.
{: .prompt-info }

## 1. Introducción

Mi enfoque tecnológico es el siguiente:

- Usar **recursos de AWS** siempre que sea posible.
  - Una de las razones para crear este blog es para practicar con AWS.
  - Así que el propio blog debe utilizar los recursos de AWS.
  - Sin embargo, hay una excepción:
    > <kbd>GitHub</kbd> se usa como **repositorio de código** porque quiero compartir mi código fácilmente de forma pública.
    {: .prompt-danger }
- Arquitectura *Serverless* (sin servidores que gestionar).
- Apliqué el principio de diseño de separación de responsabilidades tanto al frontend como al backend.
  - **Frontend**: sitio web estático generado con Jekyll e implementado con AWS Amplify.
    - Código [aquí](https://github.com/alazaroc/blog-web-code/){:target="_blank"}
  - **Backend**: los recursos de AWS se implementan con AWS CDK usando el lenguaje TypeScript.
    - Código [aquí](https://github.com/alazaroc/blog-backend-infrastructure/){:target="_blank"}
- Esta es la arquitectura de mi blog:
  - Versión anterior [1]:
    - ![diagrama_arquitectura_v1](blog-architecture-v1.png)
  - Versión actual [2]:
    - ![diagrama_arquitectura_v2](blog-architecture-v2.png)

## 2. Frontend

### 2.1. Tecnología para crear el blog

En primer lugar, tenía que elegir cómo crear el blog y hoy en día hay muchas opciones para hacerlo *servereless*:

- `Aplicación de página única (SPA - Single Page Application)`: React, Angular, Vue.js, Ionic, Ember
- `Renderización del lado del servidor (SSR - Server-Side Rendering)`: Express.js, Next.js, Nux.js, Gatsby.js
- `Generador de sitios estáticos (SSG - Static Site Generator)`: Gatsby, Next.js, Nuxt.js, Hugo, Jekyll, Hexo
- `Aplicaciones web progresivas (PWA - Progressive Web Apps)`: React, Angular, Vue.js, Preact, PWABuilder

Como quería hacerlo **sencillo**, usé un **generador de sitios estáticos.** Debo admitir que dudé con Hugo, Jekyll y Hexo. Aunque me gustó Hugo por sus rápidos tiempos de creación y rendimiento de ejecución, finalmente me decidí por `Jekyll` solo por el tema que usé ([Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy/){:target="_blank"}). Me gustó más visualmente que las demás opciones y no quería tener que personalizarla demasiado.

> Por cierto, ¡soy un gran fan del principio de diseño de KISS (Keep It Simple, Stupid)!
{: .prompt-info }

### 2.2. Tecnología para desplegar el blog

Tras elegir <kbd>Jekyll</kbd> como mi `generador de sitios estáticos`, tuve que decidir cómo desplegarlo en AWS. Hay muchas opciones para hacerlo:

- `EC2 + RDS` (es decir, blog tradicional con WordPress/Ghost + Gatsby/...)
- `LightSail` (por cierto, [un interesante artículo que compara LightSail con EC2](https://aws.amazon.com/premiumsupport/knowledge-center/lightsail-differences-from-ec2/){:target="_blank"})
- `Soluciones de contenedores' (ECS/EKS)
- `AWS Elastic Beanstalk`
- `S3`
- `AWS Amplify`

#### 2.2.1. Versión 1

Pero como quería que fuera sencillo y *serverless* (sin servidores que gestionar), en la versión 1 (que usé hasta el 5 de marzo de 2023) usé <kbd>AWS Amplify</kbd>.

> ¿Qué es AWS Amplify? (Explicado por AWS)
>
> *[AWS Amplify](https://aws.amazon.com/amplify/){:target="_blank"} es un conjunto de herramientas y funciones diseñadas especialmente que permiten a los desarrolladores web y móviles de frontend crear aplicaciones completas en AWS de forma rápida y sencilla.*
>
> *Amplify ofrece dos servicios: Amplify Hosting y Amplify Studio.*
>
> - ***Amplify Hosting** proporciona un flujo de trabajo basado en git para alojar aplicaciones web serverless completas con un despliegue continuo.*
> - ***Amplify Studio** es un entorno de desarrollo visual que simplifica la creación de aplicaciones web y móviles escalables y completas. Usa Studio para crear tu interfaz de usuario de frontend con un conjunto de componentes de interfaz de usuario listos para usar, crear un backend de aplicaciones y, a continuación, conectar los dos.*

> AWS Amplify es la forma más rápida y sencilla de desarrollar e implementar aplicaciones móviles y web fiables y escalables en AWS.
{: .prompt-tip }

He utilizado **Amplify Hosting** por las siguientes razones:

- *Serverless* (usa S3 y CloudFront entre bastidores)
- Se integra con mi código actual en GitHub
- Soporta Jekyll (mi generador de sitios estáticos)
- Gestiona el CI/CD de mi aplicación
- Es una forma sencilla de conectar mi aplicación con mi dominio personalizado
- Realiza invalidaciones instantáneas de la caché en las nuevas versiones
- Está integrado con Amazon CloudWatch

Como puedes ver, esta solución es estupenda si quieres que AWS gestione por ti el CI/CD, la web, la caché, el certificado de tu dominio...

#### 2.2.2. Versión 2 [Versión actual]

La versión 1, que utilizaba **Amplify Hosting**, era demasiado `auto-mágica` para mí y estoy aquí para practicar o jugar y mostrarte los resultados... así que **He migrado mi sitio web a una solución personalizada** para tener más control y acceso a una gama más amplia de servicios, lo que añade más diversión.

Creé la infraestructura con Terraform con los siguientes servicios de AWS:

- `S3 bucket` se usa para almacenar el sitio web (*serverless*)
- `CloudFront Distribution` (cache) delante de S3
- `Lambda Edge` usado en CloudFront, para transformar todas las solicitudes (necesario para la web de Jekyll)
- `AWS ACM`: gestión de certificados para mi dominio personalizado (playingaws.com)
- `Developer Tools` (Amazon CodeBuild y Amazon CodePipeline): para desplegar la infraestructura como código (IaC) con Terraform

### 2.3. Cómo desplegarlo

#### 2.3.1. Versión 1

Escribí cómo lo hice en este post: [Cómo implementar un sitio web con AWS Amplify Hosting](https://www.playingaws.com/posts/how-to-deploy-a-web-with-amplify-hosting/){:target="_blank"}.

Y lo complementé con este otro artículo: [Cómo añadir CI/CD a mi proyecto de CDK](https://www.playingaws.com/posts/how-to-add-ci-cd-to-my-cdk-project/){:target="_blank"}.

#### 2.3.2. Versión 2 [Versión actual]

La infraestructura como código (IaC) se creó con <kbd>Terraform</kbd> y utilizo las Developer Tools (<kbd>Amazon CodeBuild y Amazon CodePipeline</kbd>) para desplegar los servicios.

## 3. Backend

### 3.1. ¿Qué recursos debo crear?

`No se necesita ningún backend para un blog`. Los blogs sencillos que solo tienen contenido no necesitan nada más que páginas estáticas. Sin embargo, si quieres más funciones, como formularios, suscripciones de correo electrónico o comentarios, tendrás que utilizar complementos externos (para almacenar los datos en otro lugar, no en AWS) o crear tus soluciones.

Yo no quiero usar complementos externos si puedo hacer `lo mismo` yo mismo en AWS y practicar o jugar con nuevos servicios en el proceso.

Tras crear mi blog vacío, pensé que sería una buena idea implementar lo siguiente:

- Formularios de contacto
- Suscripción por correo electrónico (para recibir actualizaciones del blog)
- Añadir comentarios a cada publicación (registrarla y mostrarla)

Ahora tengo una implementación básica de estos puntos, pero la mejoraré en el futuro.

> El backend podría integrarse con el frontend con `AWS Amplify Studio`, pero no me interesa hacerlo así. Quiero separar frontend y backend y gestionar ambas de forma independiente.
{: .prompt-info }

#### 3.1.1. Formularios

<!-- - Used in the lateral panel and also here [Feedback form](/feedback){:target="_blank"} -->
- Opción externa fácil de integrar: ~~Google Forms~~.
- Solución de AWS personalizada:

  ```mermaid
    flowchart LR
    A(Contact form) --> B(API Gateway)
    B --> C(AWS Lambda)
    C --> D(Amazon SES)
    D --> E(Mi email)
  ```

#### 3.1.2. Suscripción por correo electrónico

- Se usa aquí: [Suscripción de correo](/es/about/#el-blog){:target="_blank"}
- Opción externa fácil de integrar: ~~Mailchimp~~
- Solución de AWS personalizada:

  ```mermaid
    flowchart LR
    A(formulario de suscripción por correo electrónico) --> B(API Gateway)
    B --> C(AWS Lambda)
    C --> D(Amazon DynamoDB)
  ```

> En este momento, solo guardo la información de la suscripción y si quiero enviar correos electrónicos tengo que hacerlo de forma manual. Sin embargo, en el futuro, lo automatizaré y añadiré la opción de darse de baja en el correo electrónico enviado.
{: .prompt-warning }

#### 3.1.3. Comentarios (actualizado el 27 de enero de 2023)

- Se usa al final de cada publicación
- Durante el primer año de mi blog, la solución era la siguiente:

  ```mermaid
    flowchart LR
    A(formulario de suscripción por correo electrónico) --> B(Amazon API Gateway)
    B --> C(AWS Lambda)
    C --> D(Amazon DynamoDB)
  ```

- Esta solución era una solución de AWS personalizada para utilizar más servicios de AWS y, aunque recibí algunos comentarios y los guardé en la base de datos, no implementé el sistema para mostrarlos en el blog.
- Sin embargo, ahora uso el complemento externo `giscus`:

  ```mermaid
    flowchart LR
    A(formulario de suscripción por correo electrónico) --> B(repositorio de GitHub)
    B --> C(GitHub discussion)
  ```

### 3.2. Tecnología para desplegar la infraestructura

> Ahora uso AWS CDK (Cloud Development Kit) y Terraform.
{: .prompt-info }

#### 3.2.1. Versión 1

Al principio, en la versión 1, usé:

- Lenguaje de programación `AWS CDK con TypeScript` para desplegar una `infraestructura de backend` mediante este repositorio de GitHub: [https://github.com/alazaroc/blog-backend-infrastructure](https://github.com/alazaroc/blog-backend-infrastructure){:target="_blank"}.
- `AWS Amplify Hosting` para crearme la `infraestructura de frontend` para desplegar la web de Jekyll ubicada en este repositorio de GitHub: [https://github.com/alazaroc/blog-web-code](https://github.com/alazaroc/blog-web-code){:target="_blank"}.

Sinceramente, no evalué otras opciones, ya que sabía cuál elegir y quería ser lo más sencillo posible.

> ¿Qué es AWS CDK? (Explicado por AWS)
> *[CDK](https://aws.amazon.com/cdk/){:target="_blank"} es un marco de desarrollo de software de código abierto que define los recursos de las aplicaciones en la nube mediante lenguajes de programación conocidos.*
>
> *AWS CDK de AWS aprovisiona tus recursos de forma segura y repetible a través de **AWS CloudFormation**, pero también está disponible (en fase alfa) un CDK para **Terraform** [cdktf](https://github.com/hashicorp/terraform-cdk){:target="_blank"} y un CDK para **Kubernetes** [cdk8s](https://cdk8s.io/){:target="_blank"}. Para encontrar todos estos CDK en un solo lugar, visita [Construct Hub](https://constructs.dev/){:target="_blank"}, un sitio para descubrir y compartir bibliotecas de construcción publicadas por la comunidad de código abierto, AWS y sus socios.*

> Para mí, con experiencia como desarrollador, AWS CloudFormation es complejo y AWS CDK me encaja perfectamente porque me permite usar un lenguaje de programación para crear la infraestructura fácilmente, es fantástico.
{: .prompt-info }

#### 3.2.2. Versión 2 [Versión actual]

Sin embargo, ahora he migrado la `infraestructura de frontend` a `Terraform`. La `infraestructura de backend` sigue siendo `AWS CDK con TypeScript`.

### 3.3. Cómo desplegar la infraestructura

He escrito los siguientes artículos para explicarlo:

- [Cómo crear infraestructura con AWS CDK](https://www.playingaws.com/posts/how-to-create-infrastructure-with-cdk/){:target="_blank"}
- [Cómo desplegar un sitio web Serverless con Terraform](https://www.playingaws.com/posts/how-to-deploy-serverless-website-with-terraform/){:target="_blank"}

## 4. Estimación de precios del blog

Cuando creé mi blog, con la **capa gratuita**, el coste era de 0 euros al mes, excepto el pago del dominio.

Información de precios por servicios utilizados:

- [Amazon Route53](https://aws.amazon.com/route53/pricing){:target="_blank"}
- [AWS Amplify](https://aws.amazon.com/amplify/pricing){:target="_blank"}
- [API Gateway](https://aws.amazon.com/api-gateway/pricing){:target="_blank"}
- [Amazon DynamoDB](https://aws.amazon.com/dynamodb/pricing/on-demand){:target="_blank"}
- [AWS Lambda](https://aws.amazon.com/lambda/pricing){:target="_blank"}

| Recurso de AWS | Acción | Nivel gratuito (al mes) | Precio estimado |
|----------------------|------------------------------------------------------------------------------------------------------------------|
| Amazon Route53 | Registro de dominios | 1 dólar para el dominio | 1 dólar |
| Amazon Route53 | Zona alojada | 0,50 USD por zona alojada durante las 25 primeras | 0,50$ |
| AWS Amplify | Compilación e implementación | 0$ por 1000 minutos de construcción | 0$ |
| AWS Amplify | Alojamiento | 5 GB almacenados | 0$ |
| AWS Amplify | Alojamiento | 0$ por 15 GB servidos | 0$ |
| Amazon API Gateway | Llamadas al API REST | 0 dólares por 1 millón | 0 dólares |
| Amazon DynamoDB bajo demanda | Almacenamiento de datos en tabla estándar | 0$ para 25 GB | 0$ |
| Amazon DynamoDB On-Demand | Transferencia de datos a Internet | 0$ por 100 GB | 0$ |
| AWS Lambda | Solicitudes al mes | 0$ por 1 millón | 0$ |
| AWS Lambda | Tiempo de cálculo | 0$ por 400 000 GB-segundos | 0$ |
| AWS CDK y AWS CloudFormation | De uso gratuito | | 0$ |

**UN TOTAL DE 1,5$ al mes**. Los impuestos NO están incluidos.

> La compra del registro de los nombres de dominio en Amazon Route53 es anual y se paga el mes de la compra, pero para simplificar, la he dividido mensualmente. Además, la categoría de facturación NO es Amazon Route53 sino "Registrar", "Global Region", y "Amazon Registrar DomainRegistration".
{: .prompt-info }

> Usar **Amazon Route53** para registrar un dominio no es la opción más barata. Pagué 12 dólares en lugar de 1 dólar durante el primer año con GoDaddy, pero para mi vale la pena.
{: .prompt-tip }

## 5. Próximos pasos

Tengo muchos próximos pasos identificados, pero pondré aquí los relacionados con el contenido de esta publicación.

- [x] Actualizar formulario de comentarios --> 17 de marzo de 2022 --> Había un formulario disponible y los comentarios se registraban en una base de datos
- [x] Mostrar comentarios en las publicaciones --> 27 de enero de 2023 --> El complemento `giscus` se ha integrado en mi web
- [x] Migrar AWS Amplify Hosting a S3 + CloudFront + AWS Certificate Manager + Herramientas de desarrollo —> 5 de marzo de 2023
- [] Automatizar la suscripción por correo electrónico

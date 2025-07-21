---
layout: post
title: 'Cómo empezar con AWS Step Functions: el flujo de trabajo sin servidor que necesitas'
date: 2025-07-14 13:11 +0200
last_modified_at:
lang: es
lang-exclusive: ['en','es']
description: Descubre cómo AWS Step Functions puede ayudarte a organizar los flujos de trabajo sin servidor sin esfuerzo. En este artículo, explicaré los conceptos básicos, ejemplos del mundo real y por qué Step Functions podría ser la pieza que falta en tu arquitectura sin servidores.
category:
- Serverless
tags:
- serverless
- level-200
level: 200
published: true
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2025-07-14-why-step-functions/
image:
  path: blog-contact-sf.png
  header_post: false
---
---

> Este es el primer artículo de una serie sobre `Step Functions`:
>
> Artículos de la serie:
>
> - 1/2: **Primeros pasos con AWS Step Functions: el flujo de trabajo sin servidor que necesitas**
> - 2/2: [AWS Step Functions en acción: crea, migra y simplifica tu arquitectura sin servidores](/posts/es/how-step-functions/){:target="_blank"}
>
> Esta serie es la evolución de un artículo anterior que escribí hace más de un año (en inglés, y que no he traducido): [Mastering Serverless Workflows with AWS Step Functions](https://www.playingaws.com/posts/mastering-serverless-workflows-aws-step-functions-unleashed/){:target="_blank"}. Desde entonces, he adquirido conocimientos más profundos y experiencia práctica con AWS Step Functions, lo que me ha llevado a comprender mejor sus capacidades y prácticas recomendadas. En esta serie actualizada, mi objetivo es compartir estas perspectivas mejoradas, ofreciendo información práctica, limitaciones y consejos basados en la experiencia del mundo real. Tanto si acabas de empezar como si quieres perfeccionar tus habilidades, aquí hay algo para ti.
{: .prompt-info }

---

## 1. Introducción

Si estás creando aplicaciones sin servidor en AWS, probablemente empezaste con unas cuantas funciones de Lambda que funcionaron muy bien. Pero en algún momento, se te fue de control y tus microservicios comenzaron a comportarse como un grupo de adolescentes locos sin supervisión. En ese momento es cuando la orquestación te salva el día.

Puede que AWS Step Functions no sea un servicio nuevo ni esté de moda, pero es una herramienta fiable que te ayuda a diseñar flujos de trabajo escalables y tolerantes a errores para tu arquitectura sin servidores.

> No descartes Step Functions solo porque no sea la herramienta más nueva. Su poder reside en `simplificar la complejidad` entre bastidores.
{: .prompt-warning }

---

## 2. ¿Qué es AWS Step Functions?

AWS Step Functions es un `servicio de orquestación sin servidor` que permite definir el flujo de trabajo de una aplicación como una serie de pasos basados en eventos.

A través de `flujos de trabajo visuales`, puedes diseñar y ejecutar flujos que unan servicios como AWS Lambda, Amazon SNS, Amazon DynamoDB y más, creando aplicaciones sofisticadas sin gestionar la infraestructura.

Este es un ejemplo de una Step Functions que he implementado en mi blog:

![Ejemplo de Step Functions](blog-contact-sf.png){: width="500"}

### 2.1. Características principales

- **Gestión visual del flujo de trabajo** para visualizar la arquitectura de la aplicación y supervisar las ejecuciones.
- **Sin servidor por naturaleza**: No hay infraestructura que gestionar. Céntrate en construir, no en mantener.
- **Gestión y recuperaciones de errores**: lógica integrada para reintentos y detección de errores con facilidad. Se puede reintentar la ejecución desde un estado fallido.
- **Integraciones con AWS**: coordina fácilmente servicios como Lambda, DynamoDB, ECS, EventBridge y más.
- **Historial de ejecución**: visibilidad total del flujo y el estado de tus procesos.

### 2.2. Dos tipos de flujos de trabajo

Step Functions admite dos tipos de flujo de trabajo:

| Características | Flujo de trabajo estándar | Flujo de trabajo exprés |
|-----------------|----------------------------------------------------------|
| Duración | Hasta 1 año | Hasta 5 minutos |
| Modelo de precios | Por transición (más alto) | Por solicitud y duración (más barato) |
| Caso de uso | De larga duración, complejo | Gran volumen, efímero |
| Observabilidad | CloudWatch + X-Ray completo  | CloudWatch + X-Ray limitado |

> Puedes combinar ambos tipos e iniciar un flujo de trabajo exprés desde uno estándar.
{: .prompt-info }

Más información sobre las diferencias [en la documentación oficial aquí](https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html){:target="_blank"}.

### 2.3 Cuando puede que no lo necesites

Step Functions es potente, pero no siempre es necesario. Si estás creando una aplicación sencilla o unas cuantas funciones de Lambda aisladas, la orquestación puede añadir más complejidad que valor.

Estos son algunos casos en los que puedes prescindir de Step Functions:

- **Lógica de un solo paso**: una sola función de Lambda que lo haga todo de forma limpia no necesita orquestación.
- **Casos de uso de latencia extremadamente baja**: Step Functions introduce una ligera sobrecarga; para respuestas ultrarrápidas, una llamada directa podría ser mejor.
- **Invocaciones de alta frecuencia con pasos muy cortos**: Si llamas a una Lambda pequeña 10 000 veces por segundo durante menos de 50 ms, los flujos de trabajo rápidos podrían funcionar, pero a veces es mas eficaz usar Kinesis o EventBridge.
- **Necesitas el control total del estado y los intentos**: Step Functions se encarga de esto por ti, pero en algunos casos, puede que prefieras hacerlo de forma manual (por ejemplo, con una máquina de estados personalizada).

> Empieza de forma sencilla. No utilices la orquestación solo porque puedes. Úsala cuando necesites estructura, fiabilidad y claridad.
{: .prompt-warning }

### 2.4. Cuándo y qué automatizar con Step Functions

Step Functions brilla cuando tu aplicación necesita orquestar varios pasos o servicios con fiabilidad y visibilidad. La automatización típica incluye:

- Orquestación de microservicios
- Flujos de trabajo prolongados que pueden durar minutos o días
- Pipelines de datos basadas en eventos activadas por eventos o horarios
- Procesamiento de solicitudes en varios pasos con validaciones
- Aprobaciones y puntos de decisión humanos
- Generación de informes programada o bajo demanda

> Si te imaginas tu proceso como un diagrama de flujo, Step Functions probablemente sea la herramienta adecuada para ti.
{: .prompt-tip }

---

## 3. Por qué Step Functions te facilita la vida

No necesitas AWS Step Functions para todo. Pero cuando tu arquitectura va más allá de simples funciones Lambda, la orquestación pasa a ser esencial para que las cosas sean gestionables.

Aquí tienes algunas razones del por qué las Step Functions son valiosas:

- Organiza los servicios de AWS sin escribir código extra
- Flujos de trabajo visuales integrados e historial de ejecución completo
- Sustituye la lógica de reintentos personalizada por una gestión de errores integrada
- Permisos de IAM detallados para un control de acceso seguro
- Pago por uso con escalado automático
- Totalmente gestionado y sin servidores (sin infraestructura que mantener)

> Step Functions elimina el código adicional y te permite centrarte en la lógica empresarial.
{: .prompt-info }

---

## 4. Ejemplo real: refactorización de una Lambda en AWS Step Functions

He aquí un caso real de mi blog:

Al principio usé una sola función de Lambda para hacer todo el trabajo:

1. Validar los datos de entrada
2. Añadir información de contacto a DynamoDB
3. Enviar un correo electrónico a través de SES
4. Devolver una respuesta exitosa o fallida

![Controlador Lambda](lambda-handler.png)

Luego lo refactoricé para usar Step Functions:

- Creé una máquina de estado para orquestar el flujo
- Delegué la validación y el procesamiento de entradas a una Lambda dedicada
- Usé integraciones de servicios nativos con DynamoDB y SES
- Añadí gestión de errores y más visibilidad

Y ahora, es más sencillo supervisar, actualizar y depurar:

![Step Functions sin errores](step-functions-ok.png)

![Step Functions con errores](step-functions-error.png)

![Ejecución de Step Functions](step-functions-execution.png)

> ¡Intenta crear tu propio flujo con una de las plantillas integradas de Step Functions!
{: .prompt-tip }

---

## 5. Cómo funcionan las Step Functions (lo básico)

Cada flujo de trabajo de Step Functions se compone de **estados**, definidos en **Amazon States Language (ASL)**. Tú defines una máquina de estado, la despliegas y la activas. Fin.

### 5.1. Lo básico

- Define tu flujo usando JSON/YAML o visualmente con Workflow Studio
- Usa estados integrados: `Tareas`, `Elección`, `Mapa`, `Paralelizar`, `Espera`, etc.
- Cada paso puede llamar a una Lambda, a otro servicio o incluso a otra Step Functions

![cómo funciona](how-it-works-light.gif)

Si la animación se ha detenido o está empezada, haz clic en la imagen para volver a reproducirla desde el principio.

### 5.2. Conceptos básicos

- `Flujo de trabajo` (también llamado máquina de estados): es una serie de pasos coordinados que reflejan un proceso
- `Estados`: cada paso del proceso; puede trabajar, tomar decisiones o esperar
- `Tareas`: unidades de trabajo (por ejemplo, llamar a una Lambda o enviar un mensaje)
- `Transiciones`: define lo que viene después de que termine un estado
- `Integraciones de servicios`: llamadas nativas a otros servicios de AWS, como DynamoDB, ECS o SNS

---

## 6. Por qué deberías empezar a usar las funciones de paso hoy

AWS Step Functions te ayuda a `eliminar la complejidad y poner orden` en tus aplicaciones sin servidor. Te da estructura, visibilidad y gestión de errores de forma inmediata. Todo ello `sin servidor y totalmente gestionado`.

Ya sea que coordines microservicios, crees canales de datos o añadas aprobaciones humanas, Step Functions ofrece una solución escalable, fácil de mantener y observable.

Así que, si tu arquitectura parece caótica o quieres aumentar la fiabilidad y la visibilidad, prueba Step Functions. Tu yo futuro te lo agradecerá.

> En el siguiente artículo [AWS Step Functions in Action: crea, migra y simplifica tu arquitectura sin servidores](/posts/es/how-step-functions/) explicaré cómo crear una Step Functions paso a paso y mucho más.
{: .prompt-info }

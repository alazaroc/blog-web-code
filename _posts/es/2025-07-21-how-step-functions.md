---
layout: post
title: 'AWS Step Functions en acción: crea, migra y simplifica tu arquitectura sin servidores'
date: 2025-07-21 06:24 +0200
last_modified_at:
lang: es
lang-exclusive: ['en','es']
description: Descubre cómo AWS Step Functions puede transformar tu arquitectura sin servidores. Este artículo explica cómo crear flujos de trabajo, decidir cuándo migrar desde Lambda, explorar los patrones comunes y compartir las mejores prácticas para simplificar y mantener tus aplicaciones.
category:
- Serverless
tags:
- serverless
- level-300
level: 300
published: true
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2025-07-21-how-step-functions/
image:
  path: visualize1.png
  header_post: false
---
---

> Este es el segundo artículo de una serie sobre `Step Functions`:
>
> Artículos en la serie:
>
> - 1/2: [Cómo empezar con AWS Step Functions: el flujo de trabajo sin servidor que necesitas](/posts/why-step-functions/){:target="_blank"}
> - 2/2**:AWS Step Functions en acción: crea, migra y simplifica tu arquitectura sin servidores**
>
> Esta serie es la evolución de un artículo anterior que escribí hace más de un año (en inglés, y que no he traducido): [Mastering Serverless Workflows with AWS Step Functions](https://www.playingaws.com/posts/mastering-serverless-workflows-aws-step-functions-unleashed/){:target="_blank"}. Desde entonces, he adquirido conocimientos más profundos y experiencia práctica con AWS Step Functions, lo que me ha llevado a comprender mejor sus capacidades y prácticas recomendadas. En esta serie actualizada, mi objetivo es compartir estas perspectivas mejoradas, ofreciendo información práctica, limitaciones y consejos basados en la experiencia del mundo real. Tanto si acabas de empezar como si quieres perfeccionar tus habilidades, aquí hay algo para ti.
{: .prompt-tip }

---

## 1. Introducción

En el [artículo anterior](/posts/why-step-functions/), introduje AWS Step Functions con una visión general: qué son, cómo ayudan a manejar la complejidad y por qué son una mejor alternativa a encadenar múltiples funciones Lambda manualmente.

Ahora es momento de llevarlo al siguiente nivel.

En este artículo, pasamos a la práctica. Vamos a construir nuestro primer workflow usando AWS Workflow Studio, explorar patrones comunes y compartir buenas prácticas aprendidas con la experiencia.

Si alguna vez te has visto enterrado en un espagueti de funciones Lambda, esto es para ti.

---

## 2. Crea tu Primer Workflow

Comencemos creando visualmente una Step Function desde la consola de AWS.

### 2.1. Usando AWS Workflow Studio (Consola de AWS)

#### 2.1.1. Crear desde cero

> La [documentacion oficial](https://docs.aws.amazon.com/step-functions/latest/dg/workflow-studio.html) tiene una sección completa sobre Workflow Studio, con muchos ejemplos e información detallada.
{: .prompt-info }

`Workflow Studio` es un diseñador visual de bajo código integrado en la consola de Step Functions. Es perfecto para diseñar workflows de forma intuitiva, especialmente si prefieres un enfoque gráfico y no quieres escribir código desde cero.

Paso a paso:

- **Accede a la consola AWS**: Ve al servicio Step Functions.
- **Crea una nueva máquina de estados**: Haz clic en `Crear máquina de estado`.
- **Selecciona una opción**: Elige la opción para diseñar tu flujo de trabajo de forma visual.
  - ![Paso 0](step0.png)
- **Arrastrar y soltar**: Puedes arrastrar y soltar diferentes tipos de estados (tarea, elección, paralelo, mapa, etc.) desde el panel izquierdo hasta el lienzo de diseño.
  - ![Paso 1](step1.png){: width="500" }
  - ![Paso 2](step2.png){: width="500" }
- **Configurar estados**: Haz clic en cada estado para configurar sus propiedades, como la función Lambda que se invoca, las condiciones de las sucursales, etc.
- **Visualiza el código ASL**: A medida que diseñas, Workflow Studio genera automáticamente el código correspondiente en Amazon States Language (ASL) en el panel derecho.
  - ![Paso 3](step3.png)
- **Guardar e implementar**: Cuando estés satisfecho con el diseño, pulsa en `Crear`.
  - ![Paso 4](step4.png){: width="500" }
  - ![Paso 5](step5.png)

#### 2.1.2. Crear a partir de una plantilla

También puedes crear una función escalonada con una plantilla.

Paso a paso:

- **Accede a la consola AWS**: Ve al servicio Step Functions.
- **Crear una nueva máquina de estados**: Haz clic en `Crear máquina de estado`.
- **Selecciona Workflow Studio**: Elige la opción para diseñar tu flujo de trabajo de forma visual.
  - ![plantilla1](template1.png)
  - ![plantilla2](template2.png)
- **Selecciona Usar una plantilla** cuando hayas elegido la opción que quieres.
- ![plantilla 3](template3.png)

#### 2.1.3. Explicando la interfaz de Step Function

Cuando accedas a una Step Function, verás 3 áreas principales:

- **Izquierda**: Estados y tareas disponibles
- **Centro**: Tu flujo de trabajo visual
- **Cierto**: Configuración de tareas

![visualizar1](visualize1.png)

En la parte superior de la pantalla, verás:

- Nombre del flujo de trabajo
- Tres modos de visualización:
  - **Diseño**: editor visual (vista predeterminada)
  - **Código**: código ASL para el flujo de trabajo
  - **Configuración**: elige Estandar/Rápido, establece los permisos, el registro, el rastreo, las versiones y las etiquetas

![visualizar2](visualize2.png)

Así es como se ve el código ASL:

![visualizar 3](visualize3.png)

> Te recomiendo encarecidamente crear tus flujos de trabajo en `modo Diseño`, cambiarlos al `modo Código` y, a continuación, copiar la definición de ASL a tus plantillas de IaC (AWS SAM lo hace muy fácil).
{: .prompt-tip }

#### 2.1.4. Iniciar la ejecución (Ejecutar)

Probar una función de paso es muy sencillo.

- Abrir una Step Functions
- Haz clic en `Ejecutar`
- Añadir una entrada (campo opcional)
  - ![ejecución1](execution1.png){: width="500" }
- Haz clic en `Iniciar la ejecución` para ejecutar
- Verás el resultado de la ejecución y podrás revisar visualmente el estado y los registros
  - ![ejecución 2](execution2.png)
  - ![ejecución 3](execution3.png){: width="500" }

### 2.2 AWS Infrastructure Composer

> Infrastructure Composer está ahora disponible como parte del AWS Toolkit de Visual Studio Code.
{: .prompt-info }

`AWS Infrastructure Composer` te ayuda a componer visualmente aplicaciones modernas e iterar el diseño de su arquitectura. Es una opción excelente para visualizar y componer aplicaciones enteras, incluidas Step Functions.

![compositor0](composer0.png)

Cómo hacerlo con esta opción, paso a paso:

- **Accede a AWS Application Composer**: Abre el servicio en la consola de AWS.
- **Crear un nuevo proyecto**: iniciar un nuevo proyecto o abrir uno existente.
- **Arrastrar y soltar componentes**: Desde la paleta de componentes, arrastra el icono `Máquina de estado de Step Functions` al lienzo.
  - ![compositor1](composer1.png){: width="500" }
- **Conéctate con otros servicios**: Puedes conectar tu máquina de estados de Step Functions con otros servicios de AWS arrastrando las líneas entre ellos. Por ejemplo, puedes conectar una función Lambda a la que invoque un estado de Step Functions.
- **Configurar la Step Functions**: Haz clic en el componente de Step Functions. En el panel de propiedades, puedes definir la estructura de tu máquina de estados. Esto suele implicar editar directamente el código ASL en Application Composer o pegar una ASL existente si ya la tienes.
  - ![compositor2](composer2.png)
- **Generación IAC**: Application Composer genera automáticamente el código de CloudFormation o SAM que representa tu arquitectura, incluida la definición de Step Function. Este código aparece en un panel lateral.
  - ![composer3](composer3.png){: width="500" }
- **Sincronización bidireccional**: Una de las grandes ventajas es que puedes editar el diagrama visual o el código iAC directamente y los cambios se reflejarán en ambos.
- **Implementación**: Una vez que tu diseño esté completo y se genere el código, podrás descargarlo o implementarlo directamente desde la consola de Application Composer mediante CloudFormation.

### 2.3. Uso de IaC (infraestructura como código)

Este es el método preferido de muchos equipos de desarrollo para gestionar y versionar su infraestructura. Te permite definir tu función de paso en un archivo de texto, que luego se puede versionar e implementar automáticamente.

#### 2.3.1. AWS CloudFormation

Este es el servicio IaC nativo de AWS. Tú defines tu función Step (y otros recursos de AWS) en plantillas YAML o JSON.

Ejemplo:

```yaml
Resources:
  MyStateMachine:
    Type: AWS::StepFunctions::StateMachine
    Properties:
      StateMachineName: MyWorkflow
      DefinitionString: !Sub |
        {
          "Comment": "A simple Step Function",
          "StartAt": "HelloWorld",
          "States": {
            "HelloWorld": {
              "Type": "Task",
              "Resource": "arn:aws:lambda:REGION:ACCOUNT_ID:function:MyLambdaFunction",
              "End": true
            }
          }
        }
      RoleArn: !GetAtt StateMachineExecutionRole.Arn
```

#### 2.3.2. AWS SAM (Serverless Application Model)

Una extensión de CloudFormation optimizada para aplicaciones sin servidor. Simplifica la definición de recursos como Step Functions, Lambdas, API Gateways, etc.

Ejemplo:

```yaml
Resources:
  MyWorkflow:
    Type: AWS::Serverless::StateMachine
    Properties:
      DefinitionUri: sfn/statemachine.asl.json # Path to your ASL definition file
      Policies:
        - LambdaInvokePolicy:
            FunctionName: MyLambdaFunction
      Events:
        MyApi:
          Type: Api
          Properties:
            Path: /start-workflow
            Method: post
```

#### 2.3.3. AWS CDK (Cloud Development Kit)

Te permite definir tu infraestructura mediante lenguajes de programación populares, como TypeScript, Python, Java, .NET o Go. A continuación, el CDK sintetiza esta definición en plantillas de CloudFormation. Es muy potente para crear patrones arquitectónicos complejos mediante programación.

Ejemplo:

```python
import aws_cdk as cdk
from aws_cdk import aws_stepfunctions as sfn
from aws_cdk import aws_stepfunctions_tasks as tasks
from aws_cdk import aws_lambda as lambda_

class MyStepFunctionStack(cdk.Stack):
    def __init__(self, scope: cdk.App, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        my_lambda = lambda_.Function.from_function_arn(
            self, "MyLambdaFunction",
            "arn:aws:lambda:REGION:ACCOUNT_ID:function:MyLambdaFunction"
        )

        task = tasks.LambdaInvoke(self, "InvokeLambda",
            lambda_function=my_lambda,
            payload_response_only=True
        )

        definition = sfn.Chain.start(task)

        sfn.StateMachine(self, "MyStateMachine",
            definition_body=sfn.DefinitionBody.from_chainable(definition),
            state_machine_name="CDKStepFunction"
        )
```

#### 2.3.4. Terraforma

Una herramienta de iAC de terceros popular por su capacidad de gestionar la infraestructura en varios proveedores de nube.

Ejemplo:

```hcl
resource "aws_sfn_state_machine" "sfn_machine" {
  name     = "MyTerraformStateMachine"
  role_arn = aws_iam_role.sfn_role.arn

  definition = jsonencode({
    Comment = "A simple Terraform Step Function"
    StartAt = "HelloWorld"
    States = {
      HelloWorld = {
        Type     = "Task"
        Resource = "arn:aws:lambda:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:function:MyLambdaFunction"
        End      = true
      }
    }
  })
}
```

---

## 3. Cuándo y por qué migrar de Lambda a Step Functions

Te preguntarás: ¿cuándo tiene sentido cambiarse realmente?

### Cuándo migrar

- **Tu lógica de Lambda está creciendo** y es difícil de gestionar.
- **Necesitas un estado** en varios pasos (como esperar entre reintentos).
- **La gestión de errores se está volviendo compleja** y quieres evitar tener que volver a escribir la lógica de captura en todas partes.
- **Se trata de la orquestación**, no de la lógica empresarial.
- **Tus cargas de trabajo superan los límites de Lambda**, en duración o en reintentos.

### Por qué migrar

- Los flujos de trabajo visuales simplifican la comprensión y la incorporación.
- Gestión de errores y reintentos integrados.
- Integraciones directas con muchos servicios de AWS.
- Menos código adhesivo, menos estuches laterales.
- Más fácil de observar y depurar (CloudWatch, X-Ray, historial de ejecuciones).
- Arquitectura más limpia y fácil de mantener.

> Usa Step Functions para la coordinación y Lambda para el cálculo.
{: .prompt-tip }

---

## 4. Patrones comunes para Step Functions

AWS Step Functions ofrecen una forma visual y declarativa de modelar lógica compleja. Aunque puedes usarlas casi para cualquier cosa, hay algunos patrones que se repiten constantemente en arquitecturas modernas. Aquí te dejo los más comunes, con algo más de detalle y ejemplos reales:

- **State Machine Pattern**
  - El patrón más básico, pero también el más poderoso. Aquí diseñas visualmente una máquina de estados con pasos bien definidos: tareas, decisiones, paralelismos, etc. Muy útil para describir procesos paso a paso, como una cadena de validaciones o una automatización compleja.
  -Ejemplo: Un flujo de onboarding de usuarios, donde cada paso (registro, validación de email, creación de perfil, notificación) es un estado.

- **Microservices Orchestration**
  - En una arquitectura basada en microservicios, cada servicio hace una cosa muy bien. Pero alguien tiene que orquestar todo el proceso… y ahí entra Step Functions. Puedes invocar distintos servicios (vía Lambda, HTTP, SQS…) y controlar el flujo.
  - Ejemplo: Una compra online que pasa por validación de stock, cálculo de precio, cobro, envío, y notificación al cliente. Cada paso puede ser un microservicio separado.

- **Event-Driven Processing**
  - Puedes iniciar flujos automáticamente a partir de eventos lanzados desde Amazon EventBridge, SNS, o incluso S3. Esto te permite diseñar sistemas muy reactivos y desacoplados.
  - Ejemplo: Cada vez que se sube un archivo a S3, se lanza un flujo que valida, transforma, y guarda los datos en una base de datos.

- **Saga Pattern (Compensating Transactions)**
  - Ideal para sistemas distribuidos donde necesitas asegurar consistencia eventual. Si algo falla a mitad del proceso, puedes lanzar tareas compensatorias que "deshacen" acciones previas.
  - Ejemplo: Si el cobro fue exitoso pero el pedido no se puede preparar, puedes lanzar una devolución automática.

- **Batch Processing**
  - Aunque Step Functions no es un sistema de procesamiento masivo en sí, puede coordinar ejecuciones en paralelo, lanzar procesos ETL, y controlar errores por item.
  - Ejemplo: Orquestar un pipeline diario que lee ficheros de S3, ejecuta transformaciones con Glue, y guarda resultados en Redshift.

- **Nested Workflows (Modularización)**
  - Puedes invocar otras máquinas de estados como parte de una más grande. Esto permite reutilizar lógica, reducir duplicación y mantener flujos más limpios.
  - Ejemplo: Un flujo principal de análisis de fraude puede invocar flujos secundarios para diferentes tipos de validaciones.

- **Approval Workflows (Human-in-the-loop)**
  - Algunos procesos requieren interacción humana, como validaciones o aprobaciones. Puedes pausar el flujo esperando una señal (TaskToken) y reanudarlo cuando haya respuesta.
  - Ejemplo: Un sistema de aprobación de gastos que espera la validación de un manager antes de continuar.

- **Fan-out/Fan-in con Map**
  - Ejecutar múltiples tareas en paralelo sobre una lista (fan-out), esperar a que todas terminen, y luego continuar (fan-in). Ideal para procesar colecciones de datos.
  - Ejemplo: Enviar notificaciones por diferentes canales (email, SMS, push) a una lista de usuarios.

- **Hybrid Orchestration**
  - Combinar Step Functions con EventBridge y Lambdas para obtener flujos parcialmente definidos y parcialmente dinámicos. Útil cuando algunos pasos cambian según el evento o el cliente.
  - Ejemplo: En una plataforma multi-tenant, cada cliente puede tener su propio flujo personalizado con ciertos pasos comunes.

- **Error Handling + Retries + Dead Letter Flows**
  - No es solo patrón, es una filosofía: define bien las políticas de reintento (Retry) y usa estados Catch para redirigir a flujos de error o notificaciones cuando algo falla.
  - Ejemplo: Si una tarea falla tres veces, notificar a un equipo y mover el dato a una cola de errores.

---

## 5. Best Practices desde mi experiencia

Aquí van buenas prácticas que he ido aprendiendo en proyectos reales (sí, algunas tras cometer errores):

- **Comenta tu ASL (Amazon States Language)**
  - Añade campos Comment en tus estados para explicar qué hacen. Te lo agradecerás en tres meses cuando vuelvas a ese flujo olvidado.

- **Divide y vencerás**
  - Las Lambdas deben tener lógica concreta y pequeña. No intentes hacer toda la orquestación dentro de una Lambda. Deja que Step Functions coordine y cada Lambda se encargue de una tarea clara.

- **Payloads livianos**
  - No pases grandes objetos JSON entre estados. Usa S3 o DynamoDB para almacenar lo pesado y pasa solo referencias. Reducirás el coste, mejorarás el rendimiento y evitarás errores por tamaño de input.

- **Controla el flujo de datos**
  - Usa InputPath, ResultPath y Parameters para decidir qué entra, qué sale y qué se pasa al siguiente estado.
  - Tip: ResultPath: "$.result" te permite conservar el input original y añadir el resultado bajo una clave.

- **Evita Lambdas innecesarias**
  - Si solo necesitas enrutar, transforma datos simples o hacer una condición, usa Pass, Choice o incluso Map. Reducirás coste y ganarás legibilidad.

- **Paraleliza inteligentemente**
  - Con Parallel y Map, puedes ejecutar tareas simultáneamente o aplicar lógica a una lista de elementos. Es más robusto que intentar hacer esto con recursividad o bucles manuales.

- **Observabilidad total**
  - Habilita los logs en CloudWatch, usa AWS X-Ray para seguir trazas y revisa el historial de ejecución para ver qué pasó exactamente en cada paso.

- **Pon límites de tiempo**
  - Cada tarea debe tener su TimeoutSeconds. Evita ejecuciones zombie que consumen recursos sin hacer nada.

- **Reutiliza con Nested Workflows**
  - Si una parte del flujo es común en muchos procesos, conviértela en una Step Function aparte. Mejora el mantenimiento y evita duplicaciones.

- **Piensa en la idempotencia**
  - Si algo puede fallar y repetirse, asegúrate de que tu Lambda o tu API pueden manejar llamadas duplicadas sin efectos secundarios no deseados.

- **Nombrado consistente y claro**
  - Usa nombres descriptivos para tus estados. Es mejor un ValidatePaymentResponse que un Task1. Piensa que en CloudWatch o en X-Ray esos nombres te ayudarán a entender qué pasó.

- **Versiona tus workflows**
  - Si haces cambios frecuentes, guarda versiones anteriores del .asl.json o usa nombres con sufijos (MyFlow_v1, MyFlow_v2). Así puedes probar nuevas versiones sin romper producción.

- **Aprovecha Catch y Retry bien definidos**
  - Define claramente los errores que esperas y maneja cada tipo por separado. No uses ErrorEquals: ["States.ALL"] en todos lados si puedes distinguir errores.

- **Simula antes de desplegar**
  - Usa el simulador de Step Functions en consola o el modo dry-run en tests para validar que el flujo hace lo que esperas antes de lanzar en producción.

- **Integra con IAM mínimo necesario**
  - Cada Step Function necesita permisos para ejecutar Lambdas, leer S3, etc. No le pongas *:*, define políticas mínimas y, si puedes, usa roles por flujo.

---

## 6. Los errores más comunes que hay que evitar

Aquí algunos errores comunes que he visto o cometido:

- ❌ **Intentar usar Step Functions para latencias sub-segundo**
  - No es un sistema real-time. Aunque responde rápido, no está diseñado para casos como juegos, trading financiero o procesamiento de eventos críticos al milisegundo.

- ❌ **Usarlo como planificador de tareas**
  - Si lo único que necesitas es lanzar algo cada X tiempo, usa EventBridge Scheduler o CloudWatch Events. No metas un flujo para eso.

- ❌ **Olvidar los timeouts**
  - Si no pones límite, una tarea puede quedar esperando eternamente por una Lambda que se colgó. Y eso significa pagar por algo que no avanza.

- ❌ **Meter demasiadas cosas en un solo flujo**
  - Cuando un workflow empieza a tener demasiados pasos, decisiones y caminos alternativos, es hora de dividirlo. Aplica el principio de separación de responsabilidades, también aquí.

- ❌ **Ignorar el coste**
  - Aunque Step Functions es barato para muchos escenarios, si tienes millones de ejecuciones con muchos pasos, el coste puede acumularse. Monitoriza y revisa.

- ❌ **Pasar demasiado contexto entre estados**
  - Si el input de cada estado arrastra todo el historial, el tamaño del payload crece innecesariamente. Usa ResultPath e InputPath para reducirlo.

- ❌ **Olvidar la limpieza de ejecuciones fallidas**
  - Las ejecuciones fallidas quedan almacenadas. No hay coste directo, pero sí pueden dificultar la observabilidad. Implementa alertas o limpieza periódica si es necesario.

- ❌ **No documentar los flujos**
  - Si alguien más (o tú dentro de tres meses) mira esa definición de 300 líneas en JSON sin comentarios, entenderla será una pesadilla. Usa Comment, diagramas o notas externas.

---

## Concluyendo

AWS Step Functions te permite crear flujos de trabajo limpios y tolerantes a los errores que son más fáciles de mantener que el extenso código de espaguetis de Lambda. Pero para sacarle el máximo provecho, tienes que pensar como un diseñador de flujos de trabajo, no solo como un desarrollador.

Planifica tus estados. Mantén tus flujos de trabajo reducidos. Haz que cada paso haga bien una cosa.

Las Step Functions no son mágicas, pero podrían salvarte del caos de los sistemas en crecimiento.

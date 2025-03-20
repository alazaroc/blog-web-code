---
layout: post
title: 'Amazon Q Developer: El compañero de código impulsado por IA que has estado esperando'
date: 2024-12-11 18:27 +0100
last_modified_at:
lang: es
lang-exclusive: ['en','es']
description: Amazon Q Developer es una herramienta impulsada por IA diseñada para ayudar a los desarrolladores de AWS. Ofrece sugerencias de código, transformaciones, revisiones, pruebas unitarias y generación de documentación de forma integrada en el IDE.
category: IA Generativa
tags:
- level-300
- "Amazon Q Developer"
- "IA Generativa"
published: true
level: 300
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2024-12-11-amazon-q-developer-the-ai-powered-code-companion-i-ve-been-waiting-for/
image:
  path: cover.jpg
  header_post: false
---
---

## 1. Introducción

Durante meses, probé diferentes herramientas de IA generativa en mi IDE, pero ninguna parecía estar orientada a AWS ni totalmente integrada, `hasta ahora`.

En este artículo, te mostraré `cómo Amazon Q puede mejorar tu productividad`, desde chatear sobre código y recibir sugerencias en línea hasta realizar transformaciones avanzadas de código y generación automática de pruebas. También abordaré la gran pregunta: ¿qué pasa con tu código cuando usas un servicio de IA generativa como este? Y sí, te mostraré ejemplos reales usando uno de mis repositorios públicos de GitHub, [appsync-website-mutation](https://github.com/alazaroc/appsync-website-mutation){:target="_blank"}, para que veas lo fácil que es empezar.

Este post está enfocado en `Amazon Q Developer`, pero primero, permíteme darte un poco de contexto.

### 1.1. Amazon Q one year ago

Amazon Q se anunció hace un año, en el re:Invent de 2023 (en la última semana de noviembre de 2023), como un `asistente de IA diseñado para ayudar a desarrolladores y profesionales de TI a crear, desplegar y gestionar aplicaciones y cargas de trabajo en AWS`.

Aunque su potencial era evidente, mi experiencia inicial me dejó la sensación de que `AWS había apresurado su lanzamiento` para poder enseñarlo en el re:Invent, sin que la herramienta estuviera realmente preparada. Parecía incompleto y no del todo listo para los caso de uso reales del día a día.

Ahora, un año después, en el re:Invent de 2024 (primera semana de diciembre de 2024), `AWS presentó el servicio de Amazon Q renovado`. Lo he probado y ahora sí que puedo decir con confianza que es una herramienta valiosa para cualquier desarrollador. De hecho, este es el motivo principal de este artículo.

### 1.2. Amazon Q: Amazon Q Developer + Amazon Q Business

Basado en Amazon Bedrock y aprovechando 17 años de experiencia de AWS, Amazon Q abarca tanto Amazon Q Developer para tareas de desarrollo de software como Amazon Q Business para mejorar la productividad empresarial.

Se basa en la documentación de AWS, las prácticas recomendadas y los ejemplos del mundo real, convirtiéndolo en un asistente de IA fiable y completo.

#### 1.2.1. Amazon Q Developer

- `Diseñado específicamente para desarrolladores de software`
- Enfocado en tareas de codificación y desarrollo
- Las características clave incluyen:
  - Chat con código y asistencia
  - Completado de código en línea
  - Generación de nuevo código
  - Escaneo de vulnerabilidades de seguridad
  - Actualizaciones y mejoras de código
  - Sugerencias de depuración y optimización
  - Guía sobre arquitectura y recursos de AWS
- Disponible en IDEs y entornos de desarrollo

#### 1.2.2. Amazon Q Business

- `Diseñado para el uso empresarial en toda la organización`
- Enfocado en operaciones y productividad empresarial
- Las características principales incluyen:
  - Proporciona respuestas basadas en datos empresariales
  - Resumen de contenido
  - Análisis de documentos
  - Automatización de tareas
  - Creación de aplicaciones personalizadas (Q Apps)
  - Integración con herramientas empresariales (más de 40 integraciones)
  - Conectividad con fuentes de datos como SharePoint, S3 y Salesforce
- Incluye funciones de seguridad como:
  - Control de acceso basado en roles
  - Controles de privacidad de datos
  - Filtrado de contenido
  - Integración con permisos de seguridad existentes

#### 1.2.3. Las principales diferencias

| Característica   | Amazon Q Developer                 | Amazon Q Business                   |
|-----------------|------------------------------------|--------------------------------------|
| **Propósito** | Tareas de desarrollo               | Productividad empresarial            |
| **Usuarios objetivo** | Desarrolladores y equipos técnicos | Empleados de diversas áreas de negocio |
| **Fuentes de datos** | Código y documentación de AWS      | Datos y documentos empresariales     |

## 2. Amazon Q Developer: IA generativa en tu IDE

El 30 de abril de 2024, `Amazon CodeWhisperer` pasó a formar parte de Amazon Q Developer, e incorporó a la nueva plataforma sus sugerencias de código en línea, el análisis de vulnerabilidades de seguridad y la solución de problemas de seguridad impulsados por la IA generativa.

En el re:Invent 2024 (del 2 al 5 de diciembre de 2024), Amazon Q Developer introdujo un conjunto de características ampliadas, transformándolo en mucho más que una simple herramienta de sugerencias. Ahora ayuda a generar pruebas unitarias, revisar código en busca de mejores prácticas e incluso generar documentación bajo demanda. Esta evolución hace que Amazon Q Developer se sienta como un verdadero compañero de IA, en lugar de solo una herramienta de autocompletado.

### 2.1. ¿Dónde puedes usar Amazon Q Developer?

Amazon Q Developer está disponible en varios entornos, facilitando su integración en tu flujo de trabajo:

- En AWS: [más info](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-on-aws.html){:target="_blank"}
- En tu IDE: [más info](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-in-IDE.html){:target="_blank"}
- En la línea de comandos: [más info](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/command-line.html){:target="_blank"}
- En GitLab (en versión preliminar): [más info](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/gitlab-with-amazon-q.html){:target="_blank"}

### 2.2. IA Generativa al Alcance de Tu Mano

Cuando se integra en tu IDE, Amazon Q Developer actúa como un `potente asistente, proporcionando orientación en tiempo real para el desarrollo`. Con su interfaz de chat y comandos con /, puedes interactuar directamente con el modelo y solicitar sugerencias o ejecutar comandos en lenguaje natural.

> `¡IMPORTANTE!` Amazon Q Developer no solo te ayuda con el código. Puedes hacer preguntas sobre arquitectura en AWS, tus recursos en la nube, buenas prácticas, documentación, soporte y más. [Aquí](https://docs.aws.amazon.com/es_es/amazonq/latest/qdeveloper-ug/features.html){:target="_blank"} tienes la lista completa de características de Amazon Q Developer.
{: .prompt-tip }

### 2.3. ¿Es realmente gratuito?

Amazon Q Developer ofrece dos planes:

| Nivel       | Precio                    |
|-------------|---------------------------|
| Nivel Gratuito | `Gratis` (con límites)       |
| Nivel Pro    | $19/mes por usuario       |

> Importante: En el Free Tier, cuando alcances 50 interacciones en el IDE, recibirás la siguiente notificación:
>
> ![limit](limit.png)
{: .prompt-danger }

Más información: [Comparación de planes y precios](https://aws.amazon.com/q/developer/pricing/){:target="_blank"}

### 2.4. ¿Qué pasa con tu código?

Un problema común es si Amazon Q Developer usa tu código privado para entrenar modelos o compartirlo. Esto es lo que debes saber:

| Nivel       | Uso de datos para entrenamiento de modelos |
|-------------|------------------------------------------|
| Nivel Gratuito | El contenido puede usarse (opción de exclusión disponible) |
| Nivel Pro    | El contenido no se usa                     |

AWS también aclara en su documentación:

> *Amazon Q `almacena tus preguntas, sus respuestas y contexto adicional`, como metadatos de la consola y código en tu IDE, para generar respuestas. Tu código también se almacena para funciones como la transformación de código. Estos datos se almacenan `hasta 90 días para proporcionar el servicio y luego se eliminan permanentemente`.*

### 2.5. Cómo no compartir datos en tu IDE

Si estás usando la versión gratuita y prefieres no compartir tu contenido, `puedes desactivar esta opción fácilmente`. Así es cómo hacerlo:

![opt-out-1](0-opt out of data sharing 1.jpg)
![opt-out-2](0-opt out of data sharing 2.jpg)

La opción clave es "Amazon Q: Share Content". [Más información](https://docs.aws.amazon.com/es_es/amazonq/latest/qdeveloper-ug/opt-out-IDE.html){:target="_blank"}

## 3. Probando Amazon Q Developer

Antes de empezar, si aún no has instalado el plugin en tu IDE, [sigue esta guía](https://docs.aws.amazon.com/es_es/amazonq/latest/qdeveloper-ug/q-in-IDE-setup.html){:target="_blank"}.

Luego, accede al plugin de AWS / Amazon Q y comienza a escribir o simplemente pulsa `/`:

![slash](0-options slash.jpg)

### 3.1. Chateando sobre código o AWS

Puedes `usar el chat` de Amazon Q en el IDE para hacer preguntas relacionadas con AWS. Tenía algunas dudas sobre la privacidad de Amazon Q, así que en lugar de buscar en la documentación, le pregunté directamente a Q:

![q-question](1-ask Amazon Q 1.jpg)
![q-response](1-ask Amazon Q 2.png)

Como puedes ver, solo tienes que abrir la extensión del chat de Amazon Q y escribir tu pregunta.

### 3.2. Generación de sugerencias en línea

Mientras escribes, Q Developer te ayuda a `autocompletar` dentro del editor. Por ejemplo, si estás escribiendo código Terraform y necesitas añadir una tabla DynamoDB, Amazon Q te sugiere el siguiente fragmento:

```hcl
resource "aws_dynamodb_table" "feedback" {
  name         = var.dynamodb_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  range_key    = "notificationId"

  a
}
```

Antes de terminar de escribir, Q Developer completa la siguiente parte del código, ayudándote a programar más rápido sin interrumpir tu flujo de trabajo.

![inline-suggestions](2-inline-suggestions.png)

### 3.3. Generar documentación (/doc)

> `/doc` permite a Amazon Q `escribir documentación` sobre APIs, diseño técnico y procesos de incorporación.
{: .prompt-info }

En mi proyecto, quería generar un archivo README basado en mi código. Para hacerlo, simplemente escribí:

```shell
/doc
```

Esto abre la ventana `Q-Doc`, donde solo necesitas seleccionar las opciones deseadas:

![docs-1](3-docs-1.png)
![docs-2](3-docs-2.png)

También puedes personalizar el mensaje para obtener documentación adaptada a tus necesidades.

> Sin embargo, he encontrado algunas `limitaciones` al utilizar `/doc`:
>
> - Si tu espacio de trabajo (*workspace*) tiene varios proyectos,
>   - la selección del correcto puede ser confusa
>   - si seleccionas un proyecto diferente al primero, el README se genera en la carpeta del primer proyecto.
> - Si tienes un workspace con más de un proyecto:
>   - la selección del proyecto puede ser mejorada
>   - si seleccionas un proyecto diferente al primero, el CONTENIDO se genera generarse en la carpeta del primer proyecto. Esto está mal, pero seguro que lo arreglarán ráoido.
> - Esta característica solo creará ficheros README y solo en la raiz del proyecto. Que pasa si solo quiero crear el README de una parte del proyecto? Puedes hacerlo con instrucciones personalizadas, pero el fichero se guardará en la raíz del proyecto.
> - El markdown generado no sigue completamente las reglas de linting (markdownlint).
{: .prompt-warning }

### 3.4. Desarrollar funcionalidades (/dev)

> `/dev` permite a Amazon Q `generar código` en todo el proyecto e implementar nuevas funcionalidades.
{: .prompt-info }

Puedes usar `/dev` para refactorizar código existente:

![refactor-1](4-dev-refactor-code-1.png)
![refactor-2](4-dev-refactor-code-2.png)
![refactor-3](4-dev-refactor-code-3.png)

### 3.5. Generar tests unitarios (/test)

> `/test genera tests unitarios` y los añade a tu proyecto, mejorando la calidad del código.
{: .prompt-info }

Si estás cansado de escribir tests unitarios repetitivos, solo resalta una función o clase y ejecuta:

```shell
/test create the unit test for main.ts file
```

![test](5-test.png)

> Actualmente, solo se admiten Java y Python. Para otros lenguajes, `Amazon Q ofrecerá sugerencias en el chat en lugar de generar los archivos de test directamente`.
{: .prompt-tip }

### 3.6. Revisar código (/review)

> `/review realiza revisiones de código`, identificando patrones sospechosos y riesgos en la implementación.
{: .prompt-info }

Si necesitas una segunda opinión, Q Developer revisa tu código y destaca problemas de seguridad o rendimiento. Solo selecciona un fragmento y escribe:

```shell
/review
```

Recibirás sugerencias concretas, como manejo de errores o paginación en consultas a DynamoDB. Es como tener a un ingeniero senior a tu lado 24/7.

![review](6-review-1.png)

### 3.7. Transformar código (/transform)

> `/transform permite actualizar aplicaciones Java en minutos`, en lugar de semanas.
{: .prompt-info }

No tengo código en Java para probar esta función, pero puedes intentarlo en tu proyecto.

### 3.8. Seleccionar código y hacer clic derecho

Otra opción es `seleccionar el código, hacer clic derecho y elegir una de las opciones disponibles` en el menú contextual.

![right-click](8-right-click.png)

## 4. Conclusiones

Amazon Q Developer `se siente como la próxima generación de asistencia para la codificación`, diseñada específicamente para desarrolladores de AWS. Con orientación basada en chat, sugerencias en línea, potentes transformaciones, generación automatizada de pruebas, revisión de código y documentación fácil, agiliza muchas de las tareas tediosas que reducen nuestra productividad.

Si planeas usar Amazon Q Developer con frecuencia, `el Free Tier podría quedarse corto debido a sus límites de interacción`. Si necesitas más funcionalidades, el Pro Tier ofrece un mayor número de interacciones y características adicionales

Si has estado dudando en usar un asistente de codificación con IA generativa para tus proyectos en AWS, `Amazon Q Developer podría ser la herramienta que has estado buscando`. Después de probarlo en algunos repositorios personales y ver las mejoras inmediatas en velocidad y calidad, puedo decir que esta es una herramienta de AWS que no debes pasar por alto.

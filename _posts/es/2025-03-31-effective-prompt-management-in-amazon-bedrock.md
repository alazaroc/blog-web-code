---
layout: post
title: "Prompts II - Domina la Gestión de Prompts en Amazon Bedrock: Versionado, Optimización y Buenas Prácticas"
date: 2025-03-31 15:38 +0200
last_modified_at:
lang: es
lang-exclusive: ['en', 'es']
description: En este artículo exploramos cómo gestionar de forma efectiva los prompts en Amazon Bedrock, cubriendo funcionalidades clave como versionado, optimización y colaboración para mejorar tus proyectos basados en inteligencia artificial.
category: Generative AI
tags:
- level-300
- generative-ai
- bedrock
published: true
level: 300
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2025-03-31-effective-prompt-management-in-amazon-bedrock/
image:
  path: compare-variants-models-1-es.png
  header_post: false
---
---

> Tercer artículo de una serie sobre `Amazon Bedrock`:
>
> - 1/3: [Introducción a Amazon Bedrock y sus Modelos Fundacionales](/es/posts/introduction-to-amazon-bedrock-and-its-foundational-models/){:target="_blank"}
> - 2/3: [Prompts I: Cómo Diseñar Prompts Efectivos en Amazon Bedrock](/es/posts/designing-effective-prompts-in-amazon-bedrock/){:target="_blank"}
> - 3/3: **Prompts II - Domina la Gestión de Prompts en Amazon Bedrock: Versionado, Optimización y Buenas Prácticas**
{: .prompt-tip }

## 1. Introducción

Escribir un buen prompt es solo el comienzo. Sin una estrategia de gestión, pronto surgen problemas:

- ¿qué cambios hiciste?
- ¿cuál es la mejor versión?
- ¿cómo colaborar eficientemente?

En este artículo aprenderás a organizar, versionar y optimizar tus prompts con `Amazon Bedrock Prompt Management`, asegurando que siempre tengas control total y puedas obtener los mejores resultados.

## 2. Gestión de Prompts con Bedrock Prompt Management (Administración de peticiones)

Bedrock Prompt Management **permite organizar, versionar y optimizar los prompts dentro de un flujo de trabajo estructurado**, lo que facilita el control, la mejora continua y la colaboración en proyectos que utilizan Amazon Bedrock.

![Pompt Managament option in Bedrock image](prompt-management.png)

### 2.1. Funcionalidades clave

Amazon Bedrock ofrece varias funcionalidades para la gestión eficaz de prompts:

- **Versionado de prompts**: Permite mantener un historial detallado de cambios realizados en los prompts. Cada nueva versión se guarda para una referencia futura, facilitando el control de modificaciones y el rollback si es necesario.
- **Colaboración**: Los prompts pueden ser compartidos con otros miembros del equipo, lo que facilita el trabajo colaborativo en el desarrollo de contenido optimizado.
- **Análisis de rendimiento**: Puedes evaluar qué prompts generan las mejores respuestas, lo que te ayuda a iterar y mejorar continuamente tus interacciones y resultados.

### 2.2. Gestionando nuestros prompts

Crear un nuevo prompt es un proceso sencillo. A continuación se describen los pasos:

- Paso 1: Definir nombre (y opcionalmente descripción)
  - Al crear un nuevo prompt, utiliza un nombre que lo describa de manera concisa. Puedes agregar una descripción si es necesario para proporcionar más contexto.
  - ![Create new prompt image](create-prompt.png)
- Paso 2: Configurar el prompt
  - Añade el texto del prompt (cuadro 1 en la imagen)
  - Elige el modelo y configura sus parámetros (cuadro 2 en la imagen)
  - Revisa la respuesta generada por el modelo para asegurarte de que se alinea con tus expectativas y objetivos (cuadro 3 en la imagen)
  - ![Prompt Builder](prompt-builder-es.png)

### 2.3. Comparando variantes de Prompts

Bedrock Prompt Management permite testear nuevas versiones de un prompt de varias formas:

- Realizando cambios en el propio prompt.
- Cambiando el modelo que se utiliza para generar la respuesta.
- Modificando la configuración de los parámetros del modelo (por ejemplo, temperatura, tokens máximos).

A continuación se muestra cómo se comparan dos variantes del mismo prompt utilizando diferentes modelos:

![Compare variants configuration](compare-variants-models-1-es.png)

Una vez configuradas las variantes, podemos analizar las respuestas generadas para evaluar cuál cumple mejor con nuestros objetivos.

![compare variants response](compare-variants-models-2-es.png)

### 2.4. Optimizando Prompts

¿Quieres mejorar la precisión de tus respuestas?

AWS Bedrock incluye una funcionalidad que permite optimizar los prompts generados, mejorando su desempeño en función de las respuestas obtenidas. Esta funcionalidad está disponible para algunos modelos.

![optimizing prompts loading](optimizing-prompts.png)

Cuando se aplica esta optimización, el texto optimizado aparece junto a tu texto original, lo que te permite comparar los cambios y evaluar cuál versión genera mejores resultados.

![optimizing prompts done](optimizing-prompts-es.png)

> En este caso hemos optimizado un prompt en español y nos ha dado el nuevo texto en inglés.
{: .prompt-warning }

Para obtener más información sobre cómo utilizar la optimización de prompts, puedes consultar la documentación oficial de AWS [aquí](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-optimize.html){:target="_blank"}.

> A día de publicación de este artículo, la optimización de prompts se encuentra en versión preliminar.
{: .prompt-info }

### 2.5. Versiones

Crear versiones de tus prompts es una excelente manera de gestionarlos de forma efectiva, evitando sobrescribir cambios de manera accidental.

![generate new version of the prompt](save-prompt-version.png)

Es fundamental desarrollar una estrategia de versionado bien definida para facilitar la gestión y el rastreo de cambios en tus prompts.

A continuación, puedes visualizar las versiones disponibles de un prompt:

![Prompt version](prompt-versions.png)

> Aún echo de menos poder añadir una `descripción` a las versiones de los prompts. Esto sería útil para identificar rápidamente qué cambios se han realizado en cada versión.
>
> Estoy seguro de que AWS incorporará esta funcionalidad en futuras actualizaciones.
{: .prompt-warning }

### 2.6. Gestionando mis Prompts con CloudFormation

Si prefieres gestionar tus prompts utilizando Infraestructura como Código (IaC), puedes hacerlo a través de CloudFormation o SAM. A continuación, te muestro cómo crear un prompt utilizando CloudFormation.

A mi me costó un poco hacerlo funcionar, espero que te sirva:

```console
  MyExampleBedrockPrompt:
    Type: 'AWS::Bedrock::Prompt'
    Properties:
      Name: 'MyExamplePrompt'
      Description: 'Example prompt generated with CloudFormation'
      Variants:
        - Name: 'titan'
          ModelId: 'amazon.titan-text-express-v1'
          InferenceConfiguration:
            Text:
              Temperature: 0.7 # Adjusted temperature for more creative suggestions
              MaxTokens: 2048
          TemplateType: 'TEXT'
          TemplateConfiguration:
            Text:
              InputVariables:
                - Name: prompt_text
              Text: |
                Summarize my {"{prompt_text}"} ---> remove ""
```

Este fragmento de código te muestra cómo definir un prompt que utiliza el modelo de Amazon Titan.

### 2.7. Obteniendo mi Prompt desde Codigo

Si deseas acceder a los detalles de un prompt desde tu código, puedes hacerlo fácilmente usando el SDK de AWS. A continuación, te muestro un ejemplo en Python para obtener la información de un prompt a través de su ARN:

```python
def get_prompt_information(prompt_arn: str) -> tuple[str, float, int]:
    """Retrieve prompt content from Bedrock Prompt Management."""
    try:
        prompt_response = bedrock_agent.get_prompt(
            promptIdentifier=prompt_arn
        )

        variant = prompt_response['variants'][0]
        logger.debug(f"variant: {variant}")
        model_id = variant['modelId']
        prompt_text = variant['templateConfiguration']['text']['text']
        temperature = float(variant['inferenceConfiguration']['text']['temperature'])
        max_tokens = int(variant['inferenceConfiguration']['text']['maxTokens'])
        logger.debug(f"Prompt content retrieved successfully for ARN: {prompt_arn}. Temperature: {temperature}, Max Tokens: {max_tokens}")
        return prompt_text, temperature, max_tokens, model_id

    except Exception as e:
        logger.error(f"Error retrieving prompt content: {e}")
        raise
```

Este código Python muestra cómo obtener la información detallada de un prompt utilizando el ARN, lo que te permite integrarlo en tus aplicaciones de forma programática.

## 3. Buenas Practicas al Gestionar Prompts

Gestionar los prompts de forma eficiente es esencial para mantener la calidad y el control a medida que escalas tu proyecto en Amazon Bedrock. Aquí te dejo algunas buenas prácticas:

- **Mantener Nombres Claros y Consistentes**
  - Darle nombres claros y consistentes a tus prompts es fundamental para que puedas identificar rápidamente su propósito y contexto.
  - Un buen nombre debería reflejar de forma precisa lo que hace el prompt, por ejemplo, "SummarizeArticlePrompt" en lugar de nombres genéricos como "Prompt1". Esto facilita su búsqueda y gestión, especialmente en proyectos con varios prompts.
- **Establecer una Estrategia de Versionado**
  - El versionado es crucial para seguir el historial de cambios y poder revertir a versiones anteriores si es necesario.
  - Siempre que realices una modificación importante en un prompt, asegúrate de crear una nueva versión en lugar de sobrescribir la anterior.
  - También es útil asignar una descripción breve a cada versión para identificar rápidamente el cambio realizado, aunque como te he comentado, esta funcionalidad no está disponible en Amazon Bedrock Prompt Management, por lo que tendrás que tenerlo en otro sitio.
- **Gestionar la Colaboración entre varias personas**
  - Cuando no trabajas solo, la colaboración se convierte en un reto.
  - Para gestionar correctamente los prompts, asegúrate de que todos los miembros del equipo tengan acceso a los mismos recursos y versiones.
  - Además, fomenta el uso de herramientas de seguimiento de tareas para que cada miembro esté al tanto de las actualizaciones y cambios, como las etiquetas (tags) y comentarios en cada prompt.
  - Utilizar un control de acceso adecuado también es importante para evitar modificaciones accidentales.

## 4. Conclusión

Si trabajas con Amazon Bedrock, empezar a gestionar tus prompts con Bedrock Prompt Management te ahorrará tiempo y mejorará la calidad de tus respuestas.

¿Ya usas Bedrock Prompt Management? Comparte tu experiencia:

- ¿Cómo gestionas actualmente tus prompts?
- ¿Qué trucos o estrategias te han funcionado mejor?
- ¿Qué funcionalidad te gustaría que AWS añadiera?

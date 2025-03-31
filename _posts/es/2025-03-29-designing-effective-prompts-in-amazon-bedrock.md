---
layout: post
title: "Prompts I: Cómo Diseñar Prompts Efectivos en Amazon Bedrock"
date: 2025-03-29 08:21 +0100
last_modified_at:
lang: es
lang-exclusive: ['en', 'es']
description: Descubre cómo diseñar prompts efectivos en Amazon Bedrock para mejorar la calidad de las respuestas de los modelos de IA. Aprende a estructurar tus prompts, aplicar técnicas avanzadas y validar su efectividad.
category: Generative AI
tags:
- level-200
- generative-ai
- bedrock
published: true
level: 200
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2025-03-29-designing-effective-prompts-in-amazon-bedrock/
image:
  path: playground-1-test-models-es.png
  header_post: false
---
---

> Segundo artículo de una serie sobre `Amazon Bedrock`:
>
> - 1/3: [Introducción a Amazon Bedrock y sus Modelos Fundacionales](/es/posts/introduction-to-amazon-bedrock-and-its-foundational-models/){:target="_blank"}
> - 2/3: **Prompts I: Cómo Diseñar Prompts Efectivos en Amazon Bedrock**
> - 3/3: [Prompts II - Domina la Gestión de Prompts en Amazon Bedrock: Versionado, Optimización y Buenas Prácticas](/es/posts/effective-prompt-management-in-amazon-bedrock/){:target="_blank"}
{: .prompt-tip }

## 1. Introducción

Si alguna vez has probado modelos de inteligencia artificial generativa, seguro que te has encontrado con respuestas inconsistentes, demasiado largas o fuera de contexto. ¿Por qué ocurre esto? **Porque el diseño del prompt influye directamente en la calidad del resultado.**

En este artículo, aprenderás a crear **prompts efectivos** en Amazon Bedrock para obtener respuestas más precisas y útiles. Revisaremos:

- Qué es un prompt y por qué es importante.
- Cómo estructurar un prompt correctamente.
- Técnicas avanzadas de optimización de prompts.
- Métodos para probar y validar la efectividad de tus prompts.

`El objetivo es que,` al finalizar, `puedas mejorar significativamente la interacción con modelos de IA en Amazon Bedrock`, reduciendo la necesidad de ajustes manuales y obteniendo respuestas más alineadas con tus necesidades.

## 2. Qué Es un Prompt y Cómo Estructurarlo

### 2.1. Qué Es un Prompt

Un **prompt** es la **entrada que proporcionamos a un modelo de inteligencia artificial generativa para obtener una respuesta**.

| Prompt de entrada | Respuesta esperada |
|------------------|------------------|
| ¿Cuál es el servicio más importante de IA Generativa en AWS? | Amazon Bedrock |
| Resume el concepto de Amazon Bedrock en una frase. | Amazon Bedrock es un servicio que proporciona acceso a modelos fundacionales de IA generativa en AWS. |

El prompt es la base de la interacción con los modelos y **afecta directamente a la calidad y relevancia del resultado**.

### 2.2. Partes Clave de un Prompt

Un buen prompt suele estructurarse en varias partes para mejorar la precisión de la respuesta:

| Componente           | Descripción | Ejemplo |
|----------------------|-------------|---------|
| **Contexto**        | Información adicional para guiar la respuesta del modelo. | Eres un arquitecto de soluciones en AWS explicando conceptos a gente no técnica. |
| **Instrucción principal** | Petición directa al modelo. | Explica en términos sencillos qué es la inteligencia artificial generativa. |
| **Formato deseado**  | Cómo quieres que se estructure la respuesta. | Responde en menos de 200 palabras y usa viñetas para los puntos clave. |
| **Ejemplo de respuesta esperada** | Modelo de referencia para guiar la generación. | Serverless es como: <br>- Un servicio a demanda: solo pagas por lo que usas, como la luz en tu casa. <br>- Sin preocupaciones: no gestionas servidores, como no arreglas las tuberías del edificio donde vives. <br>- Escalabilidad automática: se adapta a la demanda, como un taxi que aparece cuando lo necesitas. <br>En resumen, serverless te libera de la administración de servidores, permitiéndote enfocarte solo en tu aplicación. |
| **Restricciones o reglas** | Límites en la respuesta (qué incluir/excluir). | No menciones términos técnicos avanzados como redes neuronales convolucionales. |

Ejemplo completo:

```console
Contexto:
Eres un arquitecto de soluciones en AWS explicando conceptos a gente no técnica.

Instrucción principal:
Explica en términos sencillos qué es la inteligencia artificial generativa.

Formato deseado:
Responde en menos de 200 palabras y usa viñetas para los puntos clave.

Ejemplo de respuesta esperada:
Serverless es como:
- Un servicio a demanda: solo pagas por lo que usas, como la luz en tu casa.
- Sin preocupaciones: no gestionas servidores, como no arreglas las tuberías del edificio donde vives.
- Escalabilidad automática: se adapta a la demanda, como un taxi que aparece cuando lo necesitas.
En resumen, serverless te libera de la administración de servidores, permitiéndote enfocarte solo en tu aplicación.

Restricciones o reglas:
- No menciones términos técnicos avanzados como redes neuronales convolucionales.
- No uses ecuaciones o fórmulas matemáticas.
- Asegúrate de que la explicación sea accesible para cualquier persona sin conocimientos previos.
```

Ejemplo real probando este prompt en el playground con el modelo de "Amazon Titan G1 - Premier":

![Bedrock PlayGround example](example_prompt_es.png)

## 3. Cómo Mejorar la Calidad de Tus Prompts

El diseño de prompts impacta directamente en la calidad de las respuestas generadas por los modelos de IA. Aplicando estrategias avanzadas, podemos obtener resultados más precisos, relevantes y alineados con el caso de uso. A continuación, exploramos las técnicas más efectivas.

## 3.1. Por Qué Es Importante Diseñar Bien un Prompt

Un prompt bien diseñado mejora la interacción con modelos de IA como los de Amazon Bedrock. **No se trata solo de hacer preguntas, sino de estructurarlas estratégicamente para obtener respuestas más útiles y precisas**.

| Beneficio | Descripción |
|-----------|------------|
| **Evita respuestas ambiguas o irrelevantes** | Un prompt claro y bien definido guía al modelo hacia respuestas más precisas. |
| **Reduce la necesidad de reintentos** | Formular correctamente la pregunta desde el inicio disminuye las consultas innecesarias, optimizando costos computacionales. |
| **Facilita la automatización** | Diseñar prompts eficientes permite integrar IA en flujos de trabajo sin intervención manual. |
| **Mejora la experiencia del usuario** | Un prompt bien estructurado ayuda a generar respuestas más comprensibles y relevantes. |
| **Aprovecha mejor las capacidades del modelo** | Ajustar el prompt permite obtener respuestas más detalladas, estructuradas y alineadas con el objetivo. |

## 3.2. Cómo Escribir Prompts Más Precisos

Para mejorar la calidad de las respuestas, aplica estos principios clave al formular tus prompts:

1. **Sé específico**: Cuanto más detallado sea el prompt, más precisa será la respuesta.
   - Ejemplos:
     - ❌ *Explica Amazon Bedrock.*
     - ✅ *Explica qué es Amazon Bedrock en menos de 150 palabras, incluyendo sus ventajas principales.*

2. **Aclara el contexto**: Indica el rol del modelo o el público objetivo.
   - Ejemplo:
     - *Eres un arquitecto de soluciones AWS explicando Amazon Bedrock a un equipo de desarrolladores junior.*

3. **Estructura la respuesta**: Usa listas, pasos o restricciones de formato.
   - Ejemplo:
     - *Lista tres ventajas clave de Amazon Bedrock y explícalas en una oración cada una.*

4. **Prueba e itera**: Ajusta el prompt según los resultados obtenidos.
   - Si la respuesta es demasiado general, agrega más detalles.
   - Si es extensa, limita la cantidad de palabras o el formato de salida.

> Estos principios pueden combinarse con técnicas avanzadas para obtener resultados aún más precisos.
{: .prompt-tip }

## 3.3. Técnicas Avanzadas para Escribir Prompts

A continuación, exploramos técnicas avanzadas para mejorar la formulación de prompts y obtener mejores respuestas de los modelos de IA:

| Técnica | Descripción | Ejemplo |
|---------|------------|---------|
| **Zero-Shot Prompting** | Pide al modelo una respuesta sin proporcionar ejemplos previos. | *Resume este texto en una frase: Amazon Bedrock proporciona acceso a modelos fundacionales de IA...* |
| **Few-Shot Prompting** | Incluye ejemplos para mejorar la precisión de la respuesta. | *Pregunta: ¿Cuál es la capital de Francia? <br>Respuesta: París. <br>Pregunta: ¿Cuál es la capital de España? <br>Respuesta: ...* |
| **Chain-of-Thought (CoT)** | Solicita al modelo razonar paso a paso antes de responder. | *Calcula cuántos minutos hay en 3 horas. Explica el cálculo paso a paso antes de dar la respuesta.* |
| **Prompt con Restricciones** | Define límites específicos en la respuesta del modelo. | *Escribe una definición de IA en máximo 20 palabras.* |
| **Prompting Incremental** | Construye respuestas complejas en varios pasos. | *Primero, define Amazon Bedrock en una frase. Luego, explica su diferencia con otros servicios de IA en AWS.* |
| **Self-Refinement Prompting** | Pide al modelo que revise y mejore su propia respuesta. | *Escribe una explicación sobre Amazon Bedrock. Luego, revísala y mejora su claridad y precisión.* |
| **Role-Playing Prompting** | Asigna un rol específico al modelo para contextualizar la respuesta. | *Eres un arquitecto de AWS explicando Amazon Bedrock a un equipo de desarrolladores junior.* |

> Experimenta combinando estas técnicas para optimizar aún más tus prompts.
{: .prompt-tip }

## 4. Adapta Tu Prompt a Tu Modelo

> IMPORTANTE! Para obtener una mejor respuesta, necesitas adaptar tu prompt a tu modelo específico.
{: .prompt-info }

**El mismo prompt utilizado en varios modelos dará respuestas diferentes**, por lo que es importante revisar las guías de cada proveedor y ajustar el prompt al modelo específico.

A continuación, probaremos el prompt que comentamos anteriormente en los modelos "*Amazon Titan Express*" y "*Anthropic Claude 3 Haiku*":

![Bedrock PlayGround probar modelos](playground-1-test-models-es.png)

Y vemos que obtenemos dos respuestas diferentes:

- en la primera, NO obtenemos la respuesta en el formato que queremos (usa viñetas para los puntos clave)
- y en la segunda, la respuesta es mayor a 200 palabras

![Bedrock Playground comparar modelos](playground-2-compare-models-es.png)

Por tanto, para obtener una buena respuesta `habrá que ajustar el prompt para cada modelo`.

Aquí tienes un listado con las guías para cada proveedor, extraído de este [link](https://docs.aws.amazon.com/es_es/bedrock/latest/userguide/prompt-engineering-guidelines.html){:target="_blank"} oficial de AWS.

> - Guía de Prompts para `Amazon Nova Micro, Lite y Pro`: [https://docs.aws.amazon.com/nova/latest/userguide/prompting.html](https://docs.aws.amazon.com/nova/latest/userguide/prompting.html){:target="_blank"}
> - Guía de Prompts para `Amazon Nova Canvas`: [https://docs.aws.amazon.com/nova/latest/userguide/image-generation.html](https://docs.aws.amazon.com/nova/latest/userguide/image-generation.html){:target="_blank"}
> - Guía de Prompts para `Amazon Nova Reel`: [https://docs.aws.amazon.com/nova/latest/userguide/video-generation.html](https://docs.aws.amazon.com/nova/latest/userguide/video-generation.html){:target="_blank"}
> - Guía de Prompts para `Anthropic Claude`: [https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview){:target="_blank"}
> - Guía de Prompts para `Cohere`: [https://cohere.com/blog/how-to-train-your-pet-llm-prompt-engineering](https://cohere.com/blog/how-to-train-your-pet-llm-prompt-engineering){:target="_blank"}
> - Guía de Prompts para `AI21 Labs`: [https://docs.ai21.com/docs/prompt-engineering](https://docs.ai21.com/docs/prompt-engineering){:target="_blank"}
> - Guía de Prompts para `Meta Llama 2`: [https://ai.meta.com/llama/get-started/#prompting](https://ai.meta.com/llama/get-started/#prompting){:target="_blank"}
> - Guía de Prompts para `Stability AI`: [https://platform.stability.ai/docs/getting-started](https://platform.stability.ai/docs/getting-started){:target="_blank"}
> - Guía de Prompts para `Mistral AI`: [https://docs.mistral.ai/guides/prompting_capabilities/](https://docs.mistral.ai/guides/prompting_capabilities/){:target="_blank"}

## 5. Pruebas y Validación de Prompts

**Diseñar un buen prompt no es suficiente**, también debes asegurarte de que funcione bien en diferentes escenarios. Para ello, debemos saber cómo probarlo y validarlo correctamente.

### 5.1. Métodos de Prueba

Existen varias formas de probar un prompt para evaluar su calidad y comportamiento:

1. **Pruebas Manuales**
   - Ejecuta el prompt varias veces y analiza la consistencia de las respuestas.
   - Evalúa si la respuesta es **precisa, clara y relevante**.
   - En Amazon Bedrock, puedes hacerlo en el `playground`, tanto en modo chat como en modo "Prompt único":
      - ![Prueba en Bedrock Playground](bedrock-playground.jpg)
   - También puedes comparar el mismo prompt en varios modelos:
      - ![Comparación de modelos en Bedrock Playground](compare_models_playground_es.png)

2. **Comparación de Variantes**
   - Prueba diferentes versiones del prompt y compara los resultados.
   - Usa **A/B testing** para identificar cuál ofrece mejores respuestas.
   - En Amazon Bedrock, puedes hacer esto de dos formas:
     - Modificando manualmente el prompt en cada iteración dentro del `playground`.
     - Utilizando la opción de "Variantes" en `Bedrock Prompt Management`, que permite probar distintos modelos o diferentes prompts sobre el mismo modelo:
        - ![Opciones en Bedrock Prompt Management](prompt-management.png)
        - ![Comparación de variantes en Bedrock](compare-variants-models-1-es.png)

    > Explico Amazon Bedrock Prompt Management con más detalle en el siguiente artículo [aquí](/es/posts/effective-prompt-management-in-amazon-bedrock/){:target="_blank"}.
    {: .prompt-info }

3. **Validación Automática**
   - También puedes automatizar la validación de nuevos prompts.
   - Algunos servicios de AWS pueden ayudarte a ejecutar prompts y analizar respuestas automáticamente:
     - **Amazon Bedrock con Lambda** para generar y analizar respuestas.
     - **Amazon CloudWatch Logs** para registrar y auditar respuestas.
     - **AWS Step Functions** para definir flujos de pruebas automatizadas.

    > Hasta el momento, no he encontrado una solución automatizada lista para usar que facilite esta validación de manera rápida y sencilla. ¡Si conoces alguna, cuéntamelo!
    {: .prompt-warning }

### 5.2. Evaluando la Calidad de un Prompt

Cuando diseñes nuevas versiones de un prompt, valida los siguientes aspectos:

- **Precisión**: ¿La respuesta es correcta y relevante para la pregunta?
- **Consistencia**: ¿Obtienes respuestas similares en diferentes ejecuciones?
- **Coherencia**: ¿El modelo sigue correctamente las instrucciones del prompt?
- **Formato correcto**: ¿La respuesta respeta el formato esperado? (listas, viñetas, estructura, etc.)

## 6. Conclusión

El diseño de prompts es clave para obtener respuestas precisas y útiles en Amazon Bedrock. Como hemos visto, pequeños ajustes pueden marcar una gran diferencia en la calidad del resultado.

Cómo crear un buen prompt:

- ✅ Sé claro y específico.
- ✅ Usa contexto y ejemplos cuando sea necesario.
- ✅ Define el formato esperado de la respuesta.
- ✅ Itera y ajusta según el modelo.

Cómo validar un prompt correctamente:

- ✅ **Prueba diferentes variantes** y compara resultados.
- ✅ **Mide la precisión, coherencia y formato** de las respuestas.
- ✅ **Aprovecha herramientas como Bedrock Playground o Bedrock Prompt Management** para afinar tus prompts.

**¿El próximo paso?** Aplica estas técnicas en tus propios casos de uso y optimiza continuamente tus prompts.

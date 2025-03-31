---
layout: post
title: Introducción a Amazon Bedrock y sus Modelos Fundacionales
date: 2025-03-26 08:00 +0100
last_modified_at:
lang: es
lang-exclusive: ['en','es']
description: Descubre cómo Amazon Bedrock facilita el acceso a modelos fundacionales de IA, sus casos de uso, ventajas y cómo integrarlos en aplicaciones para generar contenido, analizar datos y mejorar procesos.
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
media_subpath: /assets/img/posts/2025-03-26-introduction-to-amazon-bedrock-and-its-foundational-models/
image:
  path: bedrock-testing-model.jpg
  header_post: false
---
---

> Este artículo es el primero de una serie sobre `Amazon Bedrock`:
>
> - 1/3: **Introducción a Amazon Bedrock y sus Modelos Fundacionales**
> - 2/3: [Prompts I: Cómo Diseñar Prompts Efectivos en Amazon Bedrock](/es/posts/designing-effective-prompts-in-amazon-bedrock/){:target="_blank"}
> - 3/3: [Prompts II - Domina la Gestión de Prompts en Amazon Bedrock: Versionado, Optimización y Buenas Prácticas](/es/posts/effective-prompt-management-in-amazon-bedrock/){:target="_blank"}
{: .prompt-tip }

## 1. Introducción

La inteligencia artificial generativa ha transformado la manera en que interactuamos con la tecnología, y si estás trabajando con AWS, `debes conocer sí o sí todo lo que voy a explicar en esta serie de artículos`.

Por supuesto, puedes complicarte la vida todo lo que quieras y podrías, por ejemplo, entrenar tus propios modelos desde cero. Pero seamos sinceros, esto es muy, muy caro y en el 99% de los casos NO es lo que necesitas.

En este primer artículo aprenderás cómo:

- Explorar Amazon Bedrock.
- Elegir el modelo adecuado en Amazon Bedrock.
- Usar la consola de AWS y el SDK para probar modelos.
- Comparar modelos según costos, latencia y casos de uso.

## 2. Amazon Bedrock

> Amazon Bedrock es el servicio más importante de IA Generativa en AWS.
{: .prompt-info }

Amazon Bedrock `permite acceder a modelos fundacionales` de diferentes proveedores, `sin necesidad de administrar infraestructura`.

Puedes hacer muchas cosas dentro de Amazon Bedrock, como:

- Explorar y acceder a una amplia variedad de modelos fundacionales.
- Adaptar y personalizar modelos, ya sean pre-entrenados o propios, optimizando su rendimiento según tus necesidades.
- Experimentar y poner a prueba los modelos en un entorno interactivo (`playground`), ya sea con texto, imágenes o videos.
- Crear agentes inteligentes que automaticen tareas y procesos.
- Diseñar flujos de trabajo de IA generativa conectando diferentes recursos y servicios.
- Organizar y utilizar bases de conocimiento para mejorar la precisión de las respuestas.
- Gestionar y optimizar los prompts para obtener los mejores resultados.
- Implementar medidas de seguridad (Guardrails) para proteger tus prompts y resultados.
- Procesar grandes volúmenes de datos de forma eficiente con la inferencia por lotes.
- Aprovechar modelos disponibles en diferentes regiones de AWS."

Pero empezaremos por lo básico: revisar los modelos fundacionales disponibles y saber cómo utilizarlos, tanto directamente desde la consola de AWS como desde código.

![Bedrock Overview image](bedrock-overview.jpg)

## 3. Modelos Fundacionales en Amazon Bedrock

Los modelos fundacionales (FM, por sus siglas en inglés) son `modelos de IA preentrenados con grandes cantidades de datos` y optimizados para diversas tareas, como la generación de texto, imágenes y código. Estos modelos han sido diseñados para ofrecer respuestas coherentes y relevantes sin necesidad de entrenarlos desde cero.

Estos modelos pueden utilizarse tal cual están o personalizarse para adaptarse a necesidades específicas, lo que permite ajustarlos a distintos casos de uso sin incurrir en los costos y la complejidad de desarrollar un modelo propio.

> La disponibilidad de modelos y funcionalidades en Amazon Bedrock varía según la región, por lo que es importante revisar qué opciones están habilitadas en tu zona antes de diseñar una solución.
{: .prompt-warning }

### 3.1. Proveedores disponibles

Ahora mismo, hay 8 proveedores diferentes que ofrecen modelos serverless en Amazon Bedrock. Esta imagen puede no estar actualizada, pero te servirá para hacerte una idea:

| Provider name | Number of available models | Deployment type | Latest release |
|---|---|---|---|
| [AI21 Labs](https://www.ai21.com/) | 3 | Serverless | Thu, 05 Sep 2024 08:00:00 GMT |
| [Amazon](https://aws.amazon.com/) | 13 | Serverless | Tue, 03 Dec 2024 08:00:00 GMT |
| [Anthropic](https://www.anthropic.com/) | 10 | Serverless | Wed, 19 Feb 2025 08:00:00 GMT |
| [Cohere](https://cohere.ai/) | 6 | Serverless | Mon, 29 Apr 2024 08:00:00 GMT |
| [DeepSeek](https://deepseek.com/) | 1 | Serverless | Mon, 03 Mar 2025 08:00:00 GMT |
| [Meta](https://meta.com/) | 9 | Serverless | Wed, 18 Dec 2024 08:00:00 GMT |
| [Mistral AI](https://mistral.ai/) | 4 | Serverless | Tue, 02 Apr 2024 08:00:00 GMT |
| [Stability AI](https://stability.ai/) | 1 | Serverless | Wed, 26 Jul 2023 08:00:00 GMT |

### 3.2. Modelos Disponibles en Amazon Bedrock

Cada uno de los proveedores tiene uno o más modelos disponibles. Puedes ver la lista completa y su disponibilidad por regiones [aquí](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html){:target="_blank"}.

En el catálogo de modelos en la región de Virginia del norte (us-east-1) tienes, en el momento en el que estoy escribiendo este artículo, 188 modelos disponibles, lo que incluye modelos serverless (47) y modelos del mercado (141).

![Bedrock Model Catalog image](bedrock-model-catalog.jpg)

En la imagen puedes ver que se explica para qué se puede utilziar cada modelo. Por tanto, dependiendo de tu caso de uso podrías elegir un modelo u otro.

Ejemplos de modelos (hay muchos más):

| Proveedor       | Modelo          | Casos de uso principales                               |
|----------------|----------------|-------------------------------------------------------|
| **Amazon**     | Titan Text      | Generación de texto, chatbots, resúmenes             |
| **Amazon**     | Titan Image     | Generación y modificación de imágenes                |
| **Amazon**     | Nova            | Optimización para eficiencia y escalabilidad         |
| **Anthropic**  | Claude          | Chatbots, análisis de texto                          |
| **AI21 Labs**  | Jurassic        | Generación de contenido y texto largo               |
| **Cohere**     | Command         | Resúmenes y clasificación de texto                  |
| **Meta**       | Llama           | Investigación y aplicaciones avanzadas              |
| **Mistral**    | Mistral/Mixtral | Optimización de tareas con eficiencia               |
| **Stability AI** | Stable Diffusion | Generación de imágenes                           |

Cada modelo tiene costos y tiempos de inferencia diferentes, por lo que es importante elegir el adecuado para cada caso.

### 3.3. Comparando diferentes modelos para tu caso de uso

Para elegir un modelo, ten en cuenta lo siguiente:

- **Elige según la tarea**: No todos los modelos sirven para lo mismo.
- **Prueba diferentes opciones**: Cada modelo responde de forma distinta. Prueba varios y elige el que mejor te funcione.
- **Evalúa costos y latencia**: Modelos más potentes pueden ser más costosos. Tenlo en cuenta.
- **Aprovecha opciones de personalización**: Algunos modelos lo permiten.

## 4. Probando Modelos Fundacionales en Bedrock

### 4.1. Habilitar acceso al modelo

El primer paso es habilitar el modelo que deseas probar desde la consola de AWS.

Sigue los siguientes pasos:

- 1) Accede a la opción de `Acceso a modelos`, modifica el acceso a modelos
- 2) Modifica el acceso a modelos
- 3) Elige los modelos que quieras habilitar
- 4) Confirma y espera a que estén listos para ser probados

### 4.2. Ejemplo Práctico: Uso de Amazon Bedrock en consola de AWS

Accede al playground, selecciona tu modelo y escribe tus prompts.

![Bedrock Playground image](bedrock-playground.jpg)

![Bedrock Select Model image](bedrock-select-model.jpg)

![Bedrock Testing Model image](bedrock-testing-model.jpg)

### 4.3. Ejemplo Práctico: Uso de Amazon Bedrock con SDK de AWS

Además de probarla desde la consola de AWS puedes integrarla en tu código, ya sea en una función lambda, o en cualquier otro lugar.

Este es un ejemplo de cómo llamar a un modelo desde Python:

```python
import boto3

# Crear cliente de Bedrock
client = boto3.client("bedrock-runtime")

# Solicitar una generación de texto
response = client.invoke_model(
    modelId="anthropic.claude-v2",
    body={"prompt": "Explica la importancia de la IA generativa."}
)

# Mostrar resultado
print(response["body"].read())
```

## 5. Mis Recomendaciones en la Selección de Modelos

Basado en mi experiencia, te recomiendo:

- Si buscas un chatbot: Usa Claude de Anthropic.
- Para generación de contenido largo: AI21 Jurassic es una buena opción.
- Si necesitas resúmenes: Cohere Command es muy eficiente.
- Para generación de imágenes: Stable Diffusion de Stability AI es el más utilizado.
- Si la eficiencia es clave: Los modelos de Mistral son ligeros y rápidos.
- Si quieres algo barato o que puedas cubrir con los créditos de AWS: usa los modelos de Amazon.

### 5. Conclusión

Amazon Bedrock ofrece una `plataforma potente para aprovechar la IA generativa sin preocuparse por la infraestructura`. Elegir el modelo adecuado depende del caso de uso, el coste y la latencia esperada.

Revisa los demás artículos de esta serie para saber más.

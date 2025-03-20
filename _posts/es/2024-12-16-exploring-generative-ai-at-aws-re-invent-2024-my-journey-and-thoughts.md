---
layout: post
title: 'Explorando la IA Generativa en AWS en el re:Invent 2024: Mi viaje y reflexiones'
date: 2024-12-12 23:58 +0100
last_modified_at:
lang: es
lang-exclusive: ['en','es']
description: Explora la oferta de AWS en IA Generativa, incluyendo  Amazon Q Developer, Amazon Bedrock y Amazon SageMaker, a través de mis experiencias prácticas y aprendizajes en el re:Invent de 2024.
category: IA Generativa
tags:
- level-200
- "Amazon Q Developer"
- "Amazon Bedrock"
- "Amazon SageMaker"
- "IA Generativa"
published: true
level: 200
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2024-12-16-exploring-generative-ai-at-aws-re-invent-2024-my-journey-and-thoughts/
image:
  path: cover.jpeg
  header_post: false
description_enabled: false
---
---

> Disclaimer: Todo lo mencionado en este post refleja mis opiniones personales.
{: .prompt-warning }

## 1. Introducción

A diciembre de 2024, parece que AWS finalmente ha entrado en la carrera de la IA generativa.

Resulta divertido cuando la gente afirma que AWS siempre ha estado ahí. Seamos claros, no es verdad. Esto es lo que la mayoría de la gente piensa en la comunidad, y yo también.

Durante los últimos años, AWS se ha centrado casi al 100% en la IA generativa. Aunque ha sido un gran esfuerzo para ser competitivo en este campo, y probablemente ha sido una estrategia lucrativa (ahora incluso hay una certificación relacionada: [`AWS Certified AI Practitioner Certification`](https://aws.amazon.com/certification/certified-ai-practitioner/){:target="_blank"}), esta obsesión también ha sido `frustrante` para muchos miembros de la comunidad, y ha sido un tema frecuente de debate frecuente entre los usuarios de AWS.

Por ejemplo, los eventos de AWS. La IA generativa parecía dominarlo todo. Si una sesión no la mencionaba, casi parecía fuera de lugar. Y si querías presentar algo sin incluir IA generativa, bueno... ¡buena suerte!

Para mí, los aspectos más frustrantes han sido:

- La IA generativa es, sin duda, `prometedora`, pero ¿cómo se usa de manera práctica? ¿Cómo puede realmente mejorar las soluciones, aumentar la productividad y garantizar que los datos sensibles permanezcan seguros? Parecía haber grandes lagunas en la respuesta a estas preocupaciones.
- Algunos `contenidos sobre "IA generativa" realmente no trataban sobre IA generativa`. En su lugar, era el mismo material de siempre con un toque de IA, dejando las expectativas insatisfechas.

Dicho esto, la IA (y especialmente la IA generativa) supone, sin lugar a dudas, un `punto de inflexión`. Ya está transformando vidas y seguirá haciéndolo. La verdadera pregunta es: ¿dónde estamos nosotros en el ciclo de adopción tecnológica?

![Technology-Adoption-Lifecycle-wikipedia](Technology-Adoption-Lifecycle-wikipedia.jpg)

Después del re:Invent 2024 (del 2 al 5 de diciembre de 2024), mi opinión sobre el enfoque de AWS respecto a la IA generativa ha cambiado. Quizás en parte porque ahora entiendo mejor sus servicios, porque parecen más maduros y refinados, o tal vez por todas estas razones combinadas.

> ¿Y tú? ¿Dónde estás y qué opinas al respecto?
{: .prompt-info }

## 2. Preparación para el re:Invent y objetivos personales antes de ir

Sabíamos que el evento del AWS re:Invent de este año sería una semana inmersiva centrada en la IA generativa. Todo giraría en torno a ella, así que decidí prepararme para ello obteniendo la certificación `AWS Certified AI Practitioner Certification`. Esto me proporcionó una base teórica sólida, y me sentí listo para aprender tanto como fuera posible mientras, con suerte, cambiaba mi percepción sobre este tema.

![generative AI certification](ai-practitioner-certification.jpeg)

Mi objetivo era e`ntender mejor todo este ecosistema dentro de AWS, experimentar con las herramientas y aprender a usar los servicios` para aumentar mi productividad y llenar algunos vacíos que tenía.

Quería saber más acerca de:

- Aspectos generales
  - Explorar cómo utilizar la IA generativa para ayudar en el proceso del ciclo de vida del desarrollo del software (Amazon Q, Amazon Bedrock)
  - Explorar cómo usar la IA generativa dentro de mi IDE (Amazon Q Developer)
  - Explorar cómo funcionan los agentes: tanto utilizando enfoques simples como creando mi propio agente desde cero (Amazon Bedrock y Amazon SageMaker)
  - Buscar dentro de mis propios documentos y bases de datos (bases de conocimiento): Amazon Q Business, Amazon Bedrock y Amazon SageMaker
- Amazon Bedrock
  - Obtener experiencia práctica integrando Amazon Bedrock a través de APIs: API Gateway y AWS AppSync
  - Explorar funciones avanzadas de Amazon Bedrock
- Amazon SageMaker
  - Experiencia práctica con SageMaker
  - Aprender a entrenar y personalizar modelos usando Amazon SageMaker

Mis dos primeras conclusiones fueron (no he descubierto nada nuevo):

- `Crear soluciones personalizadas es complejo, costoso y requiere conocimiento especializado`. Ejemplos: Entrenar tu propio modelo con SageMaker, personalizar un modelo, navegar por las numerosas características disponibles en los servicios...
- `Quería usar los enfoques más simples`, pero siempre con un ojo en el costo. Quería soluciones fáciles de implementar pero asequibles.

Ahora, estoy empezando a ver la luz y lo entiendo todo mejor, pero aún me queda mucho por aprender. Lo que más me gusta de la IA generativa es lo simple que parece en la superficie, mientras que por debajo puede ser increíblemente compleja.

## 3. IA Generativa en AWS

### 3.1. Amazon Q

Empecemos con Amazon Q, `el asistente de IA generativa de AWS`.

El año pasado, este servicio fue uno de los anuncios más importantes, y fue emocionante, pero daba la impresión de que fue lanzado prematuramente. Aunque su potencial era claro, la ejecución no cumplió con las expectativas. Para mí, igual que para muchos más, fue frustrante.

Ahora, un año después, las cosas parecen diferentes.

Este servicio viene con dos sabores:

- Amazon Q Developer
- Amazon Q Business

#### 3.1.1. Amazon Q Developer

Amazon Q Developer es la evolución de `Amazon CodeWhisperer`. Desde el 30 de abril de 2024, Amazon CodeWhisperer pasó oficialmente a formar parte de Amazon Q Developer, así que podríamos decir que Amazon Q Developer es "lo mismo", pero renombrado y mejorado.

En el re:Invent de 2024, AWS presentó muchas `nuevas functionalidades` para Amazon Q Developer:

- Generación/refactorización de código
- Creación de documentación con un solo comando
- Creación de pruebas unitarias
- Realización de revisiones de código

La herramienta se integra perfectamente en tu IDE, lo que la hace ideal para desarrolladores, ingenieros DevOps, arquitectos... ¡cualquiera que use un IDE! Sin embargo, Amazon Q Developer también está disponible a través de la consola de AWS, la CLI e incluso se integra con GitLab (actualmente en modo `preview`, y es bastante costoso).

¿La mejor parte para mí?

- Amazon Q ofrece un `nivel gratuito` (con algunas limitaciones) y puedes `desactivar la opción de compartir datos con AWS`, por lo que tus datos están seguros.

Esta integración en el IDE de Amazon Q Developer es justo lo que estaba buscando. Tendrás que revisar [mi post específico sobre Amazon Q Developer para descubrir por qué](/posts/es/amazon-q-developer-the-ai-powered-code-companion-i-ve-been-waiting-for/){:target="_blank"}.

#### 3.1.2. Amazon Q Business

Hay más sobre Amazon Q: `Amazon Q Business`, que utiliza IA generativa para `proporcionar información y capacidades personalizadas al integrarse con bases de conocimiento y recursos organizacionales`.

Lo probé en algunos talleres y, aunque parece prometedor, tengo ciertas preocupaciones sobre sus `posibles costos`.

> Cuidado con el costo: el precio por usuario es muy claro, pero ¿qué pasa con el precio del índice? Magia. Si quieres usarlo para tu empresa, no hay problema, pero para uso personal hay mejores opciones (y más baratas). [Página de precios de Amazon Q Developer](https://aws.amazon.com/es/q/business/pricing/?nc1=h_ls){:target="_blank"}
{: .prompt-warning }

### 3.2. Amazon Bedrock y Amazon SageMaker: Están en otro nivel

**Amazon Bedrock** y **Amazon SageMaker** son dos servicios que operan en un nivel completamente diferente:

- **Amazon Bedrock** simplifica el acceso a modelos fundacionales para tareas de IA generativa. Es perfecto para `desarrolladores` que quieren usar modelos preentrenados sin profundizar demasiado en el aprendizaje automático.
- **Amazon SageMaker**, en cambio, es una plataforma completa para construir, entrenar y desplegar modelos de ML. Está dirigido a `científicos de datos e ingenieros de ML` que necesitan control total sobre el proceso.

Este año, `Amazon Bedrock fue el protagonista en el AWS re:Invent`, como era de esperar, eclipsando la atención que recibió SageMaker el año pasado. Ambos servicios son increíblemente potentes y ricos en funciones, pero he notado cierta superposición en sus capacidades. Me hace preguntarme si AWS podría eventualmente fusionarlos.

La forma más sencilla de integrar IA generativa en tu aplicación es a través de una API y conectándola con Amazon Bedrock. Puedes hacerlo con una función Lambda desde API Gateway o AWS AppSync. Solo necesitas definir tu caso de uso y gestionar el costo.

Quiero mencionar dos anuncios sobre Amazon Bedrock que exploraré en profundidad pronto (pero no aquí):

- **Knowledge Bases for Amazon Bedrock**: Permite crear bases de conocimiento personalizadas a partir de tus datos de forma sencilla. También puedes hacerlo con Amazon Q Business (fácil pero costoso) y con Amazon SageMaker (complejo pero 100 % personalizable).
- **Agents for Amazon Bedrock**: Ayuda a construir experiencias conversacionales orientadas a tareas y puede ejecutar tareas en múltiples pasos e integrarse con sistemas externos. Lo probé y es muy prometedor.

## 4. Hands-on (talleres)

Por último, me gustaría compartir contigo algunos talleres sobre IA generativa para que puedas explorarlos por tu cuenta.

- **IA generativa (general)**
  - [Uso de IA generativa en AWS para diversos tipos de contenido](https://catalog.workshops.aws/genai-on-aws/en-US){:target="_blank"}: En este taller, utilizarás IA generativa en AWS para trabajar con diferentes tipos de contenido, incluyendo documentos, archivos PDF, videos, audios, imágenes, inteligencia empresarial, bases de datos SQL y en grafo, registros de aplicaciones y datos en streaming. Aprenderás a aprovechar la IA generativa para tareas como mantener conversaciones, formular preguntas, analizar contenido, generar resúmenes y crear imágenes basadas en estas fuentes de contenido.
- **Amazon Q Developer**
  - [Amazon Q Developer](https://catalog.workshops.aws/q-developer/en-US){:target="_blank"}: En este taller inmersivo, explorarás el impacto transformador de la IA generativa en las actividades de desarrollo, permitiéndote aplicar conceptos de experiencia de desarrollo de próxima generación en todo el ciclo de vida del software (SDLC). Obtendrás conocimientos prácticos sobre cómo la IA generativa puede mejorar significativamente tu eficiencia.
  - [Taller de Amazon Q Developer - Creando la aplicación Q-Wordsp](https://catalog.workshops.aws/qwords/en-US){:target="_blank"}: En este taller, utilizarás Amazon Q Developer para acelerar tu proceso de desarrollo de software.
- **Amazon Bedrock**
  - [Taller de Amazon Bedrock](https://catalog.workshops.aws/amazon-bedrock/en-US){:target="_blank"}: El objetivo de este taller es brindarte experiencia práctica en el uso de modelos fundacionales (FMs) a través de Amazon Bedrock.
  - [IA generativa a escala: Flujos de trabajo serverless para aplicaciones empresariales listas para producción](https://catalog.us-east-1.prod.workshops.aws/workshops/67ce9942-58f6-4caa-bf3b-c893f49b4368/en-US): En este taller, obtendrás experiencia práctica en la creación de aplicaciones de IA generativa listas para producción para casos de uso comunes, utilizando servicios serverless como AWS Step Functions, Lambda y Amazon Bedrock.
  - [Crea un chatbot serverless usando Amazon Bedrock, Amazon Kendra y tus propios datos](https://catalog.us-east-1.prod.workshops.aws/workshops/27eb3134-4f33-4689-bb73-269e4273947a/en-US){:target="_blank"}: En este taller, usarás chat general y la técnica de Recuperación Aumentada por Generación (RAG) para construir un chatbot potenciado por IA generativa. Se emplea un modelo de lenguaje grande (LLM) en Amazon Bedrock para responder preguntas a partir de contenido preindexado.
- Operaciones en la nube
  - [Construcción de resiliencia operativa en cargas de trabajo usando IA generativa](https://catalog.us-east-1.prod.workshops.aws/workshops/4696cd09-8385-4f54-9391-a96f69a3f924/en-US){:target="_blank"}: En este taller, usarás servicios administrados de IA generativa de AWS en escenarios del mundo real para aprender a evaluar la preparación, mejorar proactivamente tu arquitectura, reaccionar rápidamente ante eventos, solucionar problemas e implementar prácticas efectivas de observabilidad.
  - [Automatización inteligente de operaciones en la nube](https://catalog.workshops.aws/intelligently-automating-cloud-operations/en-US){:target="_blank"}: Extrae información basada en buenas prácticas, seguridad, tolerancia a fallos y rendimiento con AWS Trusted Advisor, AWS Health y Amazon DevOps Guru. Únete a este taller para aprender cómo automatizar estas ideas de manera inteligente utilizando servicios de AWS y herramientas de aprendizaje automático.
  - [Muchos más talleres de IA aquí](https://workshops.aws/categories/AI%2FML){:target="_blank"}.

## 5. Reflexiones finales

Aunque el camino de AWS con la IA generativa ha sido frustrante a veces, su progreso es innegable y estoy emocionado por seguir explorando cómo sus herramientas pueden cambiar la forma en que trabajamos.

Es cierto que ahora entiendo mucho mejor la oferta de AWS en IA generativa, `pero mi perspectiva general sobre la IA generativa no ha cambiado`:

> debemos adoptarla en nuestros flujos de trabajo diarios para mejorar la productividad.
{: .prompt-tip }

Pero también es importante recordar que `no todos los problemas requieren IA generativa`. Como siempre, `la clave es usar la herramienta adecuada para el trabajo adecuado`.

Si tienes curiosidad por conocer más sobre las soluciones de IA generativa de AWS, te animo a explorar herramientas como Amazon Q, Amazon Bedrock y Amazon SageMaker. Representan lo más avanzado de la IA en la nube hoy en día.

## 6. Siguientes pasos

Ya he escrito sobre Amazon Q Developer [aquí](/posts/es/amazon-q-developer-the-ai-powered-code-companion-i-ve-been-waiting-for/){:target="_blank"}, por si quieres saber más al respecto.

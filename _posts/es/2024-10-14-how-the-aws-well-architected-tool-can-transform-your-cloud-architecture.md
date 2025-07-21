---
layout: post
title: Cómo el servicio del AWS Well-Architected Tool puede transformar tu Arquitectura Cloud (5/5)
date: 2025-04-23 09:57 +0200
last_modified_at:
lang: es
lang-exclusive: ['en','es']
description: Guía práctica sobre el uso del AWS Well-Architected Tool, en la que se explica por qué las revisiones son importantes y se explica cómo realizarlas paso a paso.
category: Arquitectura
tags:
- level-300
- well-architected
level: 300
published: true
pin: false
featured_post: false
comments: true
sitemap: true
mermaid: true
media_subpath: /assets/img/posts/2024-10-14-how-the-aws-well-architected-tool-can-transform-your-cloud-architecture/
image:
  path: 11.png
  header_post: false
series:
  name: "AWS Well-Architected Framework"
  order: 5
  total: 5
  description: "Serie completa sobre el AWS Well-Architected Framework, o en español, el marco de las <strong>buenas prácticas de arquitectura de AWS</strong>, sus seis pilares y cómo aplicarlos para construir arquitecturas cloud seguras, fiables y eficientes."
---
---

En todos los artículos he utilizado los términos en inglés *AWS Well-Architected* y *AWS Well-Architected Framework*, porque en el ámbito profesional están más extendidos.

---

## 1. El Servicio del AWS Well-Architected Tool

El AWS Well-Architected Tool es un `servicio interactivo que te ayuda a evaluar tus cargas de trabajo en función de los seis pilares del AWS Well-Architected Framework`.

Ofrece una visión clara de los puntos fuertes y débiles de tu arquitectura y ofrece recomendaciones prácticas para ayudar a alinear tus sistemas con las mejores prácticas de AWS.

> Esta herramienta es más que una simple guía. Es un recurso práctico diseñado para simplificar y mejorar el proceso de evaluación de la arquitectura.
{: .prompt-tip }

El uso del AWS Well-Architected Tool **permite a tu equipo autoevaluar tu arquitectura e identificar las áreas de mejora**. Sin embargo, una **revisión oficial** realizada por un socio de buena arquitectura de AWS proporciona una evaluación más exhaustiva y, a menudo, incluye un plan de corrección integral.

> El `Framework` **sienta las bases de las mejores prácticas**, y la `Tool` va un paso más allá al **convertir esos principios en información práctica** para tus cargas de trabajo específicas.
{: .prompt-info }

---

## 2. Por qué debes realizar una evaluación (review)

El AWS Well-Architected Tool ofrece una `forma sencilla de evaluar, refinar y optimizar la arquitectura cloud`, ya que convierte las mejores prácticas teóricas en mejoras reales.

### Beneficios para ti

1. **Mejora tus habilidades cloud**: profundiza tu comprensión de la arquitectura cloud mediante la evaluación y la mejora prácticas.
2. **Genera confianza con las mejores prácticas de AWS**: Sé competente en la aplicación de las mejores prácticas de AWS a escenarios del mundo real.
3. **Dirige las discusiones estratégicas**: utiliza los conocimientos de la evaluación para guiar a las partes interesadas a tomar decisiones arquitectónicas más informadas.

### Ventajas para tu arquitectura de nube

1. **Identifica los puntos débiles y los riesgos**: identifica rápidamente problemas como las brechas de seguridad, los recursos infrautilizados y los cuellos de botella en el rendimiento.
2. **Optimiza con información basada en datos**: utiliza el análisis de la herramienta para mejorar el rendimiento, reforzar la seguridad y aumentar la eficiencia.
3. **Recibe recomendaciones personalizadas**: recibe orientación personalizada que se adapte directamente a las necesidades específicas de tu arquitectura.
4. **Genera informes detallados**: Crea informes que no solo ofrezcan una visión clara de la arquitectura actual, sino que también describan las medidas estratégicas de mejora.
5. **Alinea los equipos en torno a las prioridades**: Usa el proceso de evaluación para centrar tu equipo en las áreas clave de mejora.
6. **Reduce costes**: identifica los recursos sobreaprovisionados o las configuraciones ineficientes, lo que permite ahorrar costes sin comprometer el rendimiento.

Las revisiones periódicas garantizan que tu arquitectura evoluciona con tu empresa y sigue cumpliendo con las mejores prácticas en evolución. Estas son las ventajas adicionales de realizar revisiones periódicas:

- **Promociona la mejora continua**: Mantén tus sistemas cloud en evolución con las necesidades de tu empresa y los avances tecnológicos.
- **Prepara tu arquitectura para el futuro**: garantiza la escalabilidad y la preparación para los desafíos futuros.

---

## 3. Cómo realizar una evaluación paso a paso

### 3.1. Paso 1: Acceder a la herramienta

Inicia sesión en la consola de administración de AWS y abre el servicio del AWS Well-Architected Tool.

![1](1.png)

### 3.2. Paso 2: Definir una carga de trabajo

Proporciona detalles sobre tu carga de trabajo (*workload*) para iniciar la evaluación. Una carga de trabajo puede ser una aplicación orientada al cliente, un proceso de backend, o cualquier conjunto de recursos que ofrezca valor empresarial.

> Definición de AWS: `Una carga de trabajo se refiere a los recursos y el código que ofrecen valor empresarial, como una aplicación orientada al cliente o un proceso de backend`.

**Pasos para definir una carga de trabajo**:

1. Crear un nueva carga de trabajo (workload)
   - ![create workload](2.1.png)
1. Información sobre la carga de trabajo: Introduce los detalles de tu carga de trabajo.
   - ![specify properties](2.2.png)
1. Aplicar perfil: selecciona un perfil que se ajuste a los requisitos de tu carga de trabajo.
   - ![apply profile](2.3.png)
1. Aplicar lentes: Usa la lente predeterminada de AWS Well-Architected Framework para simplificar.
   - ![apply lenses](2.4.png)

> Definición de AWS: El catálogo de lentes es una colección de lentes oficiales de AWS creada para AWS Well-Architected Tool que ofrece tecnología actualizada y mejores prácticas centradas en el sector.

### 3.3. Paso 3: Realizar la evaluación

Responde a las preguntas de cada pilar para evaluar el estado de tu arquitectura.

> **Importante**: Puedes responder a tantas preguntas como quieras. Incluso unas pocas respuestas pueden proporcionar información valiosa para mejorar tu carga de trabajo.
{: .prompt-info }

#### 3.3.1. Cómo responder a las preguntas

- En la página de la carga de trabajo (workload), empieza una nueva revision (review):
  - ![3](3.png)

- La página tiene tres secciones principales:
  1. Preguntas por pilar
  2. Detalles sobre las mejores prácticas
  3. Información de ayuda
  - ![4](4.png)

- **Navega entre las preguntas y los pilares**: Puedes reducir o ampliar cada pilar para navegar fácilmente y hacer un seguimiento del número de preguntas a las que has respondido.
- **Entiende los detalles de la pregunta**: Revisa los detalles de la pregunta, evalúa las mejores prácticas relacionadas y selecciona las que quieras
  - ![5](5.png)
- **Usa la sección de ayuda**: Haz clic en `Información` para obtener una breve explicación sobre las prácticas recomendadas.
  - ![6](6.png)

#### 3.3.2. Ejemplo: respondiendo una pregunta

Veamos un ejemplo con **OPS 5**. Utilizaré el texto de la traducción real desde la consola de AWS:

> OPS 5. ¿Cómo reduce los defectos, facilita la reparación y mejora el flujo en la producción?
>
> Adopte enfoques que mejoren el flujo de cambios en la producción, que permitan la refactorización, la retroalimentación rápida sobre la calidad y la corrección de errores. Estos aceleran los cambios beneficiosos que se introducen en la producción, limitan los problemas implementados, y permiten una rápida identificación y solución de los problemas introducidos a través de las actividades de implementación.

![7](7.png)

Revisa las mejores prácticas ofrecidas y evalúa si tu carga de trabajo se ajusta a ellas. Por ejemplo:

- La primera práctica recomendada es `Usar control de versiones`. Si, por ejemplo, utilizamos GitHub como repositorio de Git, debemos marca la casilla de verificación de esta práctica recomendada y pasar a la siguiente.

- La siguiente es `Probar y validar los cambios`. Si tenemos dudas de a qué se refiere, podemos pulsar en el botón de **Información**.
  - ![8](8.png)

> En caso de duda al responder una pregunta, la respuesta es NO.
{: .prompt-tip }

**¿Necesitas más información sobre a qué se refiere la mejor práctica?**

Consulta el [Apéndice: Preguntas y mejores prácticas](https://docs.aws.amazon.com/wellarchitected/2024-06-27/framework/appendix.html){:target="_blank"} para obtener más información.

![9.1](9.1.png)

Encontrarás:

- Descripciones detalladas
- Resultados deseados
- Antipatrones comunes
- Guías de implementación

Ejemplo:

- ![9.2](9.2.png)
- ![9.3](9.3.png)

Completemos la revisión de esta pregunta, seleccionando únicamente algunas de las mejores prácticas:

![10.1](10.1.png)

Cuando guardas una pregunta, por ejemplo, haciendo clic en `Siguiente` para pasar de pregunta, verás que en la sección izquierda de la pantalla se indica que se ha completado una pregunta para este pilar.

![10.2](10.2.png)

Guarda tus cambios (`Guardar y salir`) para ver la `Descripción general de la carga de trabajo`, que destaca los riesgos altos o medios detectados.

![11](11.png)

> Te recomiendo que tengas dudas consultes el [Apéndice: Preguntas y mejores prácticas](https://docs.aws.amazon.com/wellarchitected/2024-06-27/framework/appendix.html){:target="_blank"} para obtener más información sobre las mejores prácticas en cada pregunta. Contiene mucha información valiosa.
{: .prompt-tip }

### 3.4. Paso 4: Revisa las recomendaciones

Cuando hayas completado todas las preguntas que querías, es el momento de revisar las recomendaciones recibidas por la herramienta.

> El AWS Well-Architected Tool ofrece recomendaciones personalizadas para abordar los GAPs identificados y los posibles riesgos.
{: .prompt-info }

- Accede a la pestaña `Lentes`, elige AWS Well-Architected Framework, y ve al `Plan de mejora` (*improvement plan*).
  - ![12](12.png)
- Identifica las áreas de alto riesgo, como OPS 5 en este ejemplo, y haz clic para ver qué prácticas recomendadas hay que mejorar.
- La herramienta mostrará las medidas que se pueden tomar, como `Probar y validar los cambios` o `Realizar la gestión de parches`.
  - ![13](13.png)

### 3.5. Paso 5: generar el informe

Tras completar tu evaluación, podrás `generar un informe detallado en PDF`.

> El informe resume las conclusiones, destaca los principales riesgos y ofrece los siguientes pasos procesables. Es un recurso excelente para comunicarse con las partes interesadas.
{: .prompt-info }

- Ve a la pestaña `Lentes`, luego a la sección `Descripción general` y haz clic en el botón `Generar informe`.
  - ![14](14.png)

### 3.6. Paso 6: Revisa el informe

El informe en PDF ofrece una visión completa de tu evaluación:

- **Información sobre la carga de trabajo**
  - ![15](15.png)
- **Descripción general del objetivo**: Muestra el número de preguntas respondidas por pilar.
  - ![16](16.png)
- **Plan de mejora**: muestra el número de artículos de riesgo alto y medio identificados por pilar.
  - ![17](17.png)
- **Detalles de alto riesgo**: Enumera las preguntas con problemas de alto riesgo detectados en cada pilar.
  - ![18](18.png)
- **Detalles de la lente**: Proporciona un resumen por pilar, que incluye tus respuestas y las áreas que necesitan mejorarse.
  - ![19](19.png)
  - ![20](20.png)
- **Plan de mejora**: enumera las mejores prácticas para mitigar los riesgos de abordar.
  - ![21](21.png)

> La información detallada del informe garantiza que tienes un camino claro para optimizar tu arquitectura de nube.
{: .prompt-info }

---

## 4. Qué pasa después de la evaluación

Como hemos dicho en la sección anterior, al utilizar la herramienta se genera un `plan de mejora` con las mejores prácticas que debes abordar. Sin embargo...

> ahora te toca a ti implementar esos cambios.
{: .prompt-warning }

Una evaluación es solo el punto de partida. `El verdadero valor proviene de cómo actúas en función de las conclusiones y conviertes las ideas en mejoras tangibles`.

Algunos consejos acerca de los siguientes pasos:

- **Prioriza las recomendaciones**: céntrate primero en las acciones más importantes y alinéalas con tus objetivos empresariales y necesidades técnicas.
- **Crea una hoja de ruta**: Usa los resultados de la evaluación para planificar los próximos pasos, hacer un seguimiento del progreso y garantizar que las mejoras se implementan de manera eficaz.
- **Programa revisiones regulares**: incorpora revisiones periódicas a tu flujo de trabajo para mantenerte alineado con las mejores prácticas de AWS y garantizar una optimización continua.
- **Fomenta la colaboración en equipo**: Involucra a todos los equipos pertinentes, tanto técnicos como empresariales, para facilitar la consecución de los objetivos arquitectónicos compartidos.

> La evaluación de buena arquitectura es un viaje continuo. La iteración y la reevaluación continuas son la clave para evolucionar y optimizar tu arquitectura con el tiempo.
{: .prompt-tip }

---

## 5. ¿Demasiado complejo? ¿Necesitas ayuda? Los socios de AWS pueden ayudarte

Para cargas de trabajo complejas o cuando las limitaciones de tiempo dificultan las autorevisiones, los `socios del programa del AWS Well-Architected Framework` aportan la experiencia necesaria para garantizar una evaluación exhaustiva y una implementación de calidad.

Así es como pueden ayudarte:

- `Realización de una revisión oficial`: los socios pueden realizar una revisión oficial del AWS Well-Architected Framework, que ofrece una evaluación más profunda y completa que una evaluación autoguiada.
- `Crear una declaración de trabajo (SoW)`: ayudarán a generar un SoW para formalizar un plan de implementación de los cambios recomendados.
- `Implementar mejoras`: los socios también pueden ayudar a poner en práctica los cambios y garantizar que tu arquitectura se ajusta a las mejores prácticas de seguridad, rendimiento y eficiencia.

> Trabajar con un socio puede resultar especialmente beneficioso para cargas de trabajo complejas o si quieres lograr mejoras rápidas.
{: .prompt-info }

---

## 6. Conclusión

El AWS Well-Architected Tool ofrece una **forma eficaz de evaluar y mejorar la arquitectura cloud**. Utiliza el servicio del AWS Well-Architected Tool para identificar riesgos, optimizar costes, mejorar el rendimiento y alinear tus sistemas con las mejores prácticas de AWS.

> No esperes a que surjan problemas.
{: .prompt-danger }

Recuerda que la clave de una nube bien diseñada es la evaluación, la mejora y la adaptación continua.

Y si te has quedado con ganas de más, puedes obtener más información en los siguientes recursos de AWS:

- AWS Well-Architected Framework:
  - [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html){:target="_blank"}
  - [Laboratorios del Well-Architected](https://www.wellarchitectedlabs.com/){:target="_blank"}
  - [Herramienta de mapas en línea](https://wa.aws.amazon.com/wat.map.en.html){:target="_blank"}
- AWS Well-Architected Tool:
  - [AWS Well-Architected Tool](https://docs.aws.amazon.com/wellarchitected/latest/userguide/intro.html){:target="_blank"}
  - [FAQs del AWS Well-Architected Tool](https://aws.amazon.com/well-architected-tool/faqs){:target="_blank"}
  - [Workshop del AWS Well-Architected Tool](https://catalog.workshops.aws/well-architected-tool/en-US){:target="_blank"}
  - [Workshop para gestionar los riesgos de la carga de trabajo con OpsCenter](https://catalog.workshops.aws/well-architected-tool/en-US/6-manage-workload-risks-with-opscenter){:target="_blank"}

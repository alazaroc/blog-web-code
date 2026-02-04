---
layout: post
title: "FinOps en AWS: de la teoría a la práctica (con servicios nativos, mi herramienta serverless y una certificación como excusa)"
date: 2026-02-04 18:44 +0100
last_modified_at:
lang: es
lang-exclusive:
  - en
  - es
description: "FinOps aplicado a AWS: qué es esto y como encaja con AWS, con servicios relacionados y la herramienta que yo he creado para ayudarme."
category:
  - FinOps
tags:
  - "finops"
  - "well-Architected"
  - "optimizacion-coste"
  - "certificacion"
  - "github"
published: true
level: 200
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2026-02-04-finops-on-aws/
image:
  path: finops_phases.png
  header_post: false
---
---

Me he metido a fondo en <kbd>FinOps</kbd> por un motivo muy simple: quería **aplicarlo de verdad en mis cuentas AWS y en mi forma de trabajar**. FinOps está de moda, o lo estuvo... y yo lo tenía pendiente. Y era el momento.

¿Y dónde puedo buscar información de FinOps? 

En la [Fundación FinOps](https://www.finops.org/){:target="_blank"}. Tienen mucho material, incluyendo cursos ([este de introducción es gratuito](https://learn.finops.org/introduction-to-finops){:target="_blank"}) y certificaciones.

> La certificación de **FinOps Certified Practitioner (FOCP)** me ha servido como excusa para revisar lo que yo quería, la aplicabilidad en AWS, y poner orden en mi cabeza de una vez.
{: .prompt-info }

![Certificación FinOps Certified Practitioner](finops_certified.png)

En este artículo quiero centrarme en lo importante:

- qué es FinOps (y por qué funciona)
- cómo encaja con AWS (y qué tienes ya en AWS)
- mi herramienta serverless de FinOps, disponible en GitHub
- y al final, qué me aportó la certificación (FOCP) y en qué consiste

---

## El problema real: gastar sin contexto

En cloud, el gasto crece por dos razones: (1) porque escalas y/o (2) porque te equivocas. La primera es buena. La segunda, si no la detectas a tiempo, duele.

El problema no suele ser "me gasto mucho", sino:

- no sé **en qué** se me va el gasto (drivers)
- no sé **quién** es el responsable (ownership) de ese gasto
- no sé **qué valor** me está devolviendo (impacto)
- no lo revisa nadie (operación)

Y si no hay ownership, no hay conversación. Solo hay sustos.

---

## Qué es FinOps

La **FinOps Foundation** define FinOps como un **framework operativo y una práctica cultural** que maximiza el valor de negocio del cloud, habilita decisiones basadas en datos y crea responsabilidad financiera mediante la colaboración entre los equipos de ingeniería, finanzas y negocio.

> Para mí, FinOps es **poner orden al gasto en el cloud**: ownership por proyecto, datos a tiempo y hábitos de revisión.
{: .prompt-info }

No es solo ahorrar. Es saber:

- qué estás pagando
- quién lo está usando
- qué valor te da

y convertirlo en hábitos (revisiones, alertas, responsabilidad y decisiones).

---

## El modelo FinOps por dentro: framework, principios y dominios

Si tienes tiempo, te recomiendo revisar la web de la [Fundación FinOps](https://www.finops.org){:target="_blank"}. Contiene mucha información de utilidad y un curso gratuito que te explica todos los conceptos básicos que tienes que conocer.

Pero si quieres una imagen que resuma lo más importante, aquí la tienes:

![FinOps Framework (poster)](finops_framework.png)

Este es el [framework de FinOps](https://www.finops.org/framework/){:target="_blank"}, y es el resumen de todo lo que importa. Contiene los principios, las personas core y sus aliados, y los dominios.

### Los 6 principios de FinOps

Son simples, pero si faltan, FinOps se convierte en "un reporte más":

1. Los equipos necesitan colaborar
2. El valor de negocio guía decisiones tecnológicas
3. Cada equipo asume ownership de su uso tecnológico
4. Los datos FinOps deben ser accesibles, precisos y a tiempo
5. FinOps debe habilitarse de forma central (para consistencia y escala)
6. Aprovecha el modelo de coste variable del cloud

Si tuviera que elegir lo mínimo, sería:

- definir **ownership** por proyecto
- tener **datos** a tiempo
- crear un **hábito** de revisión

Los tienes [aquí](https://www.finops.org/framework/principles/){:target="_blank"}.

### Los dominios

El framework lo resume en 4 dominios. Estos son los resultados que buscas.

- **Entender el uso y el coste**: recopilar y normalizar los datos de uso y gasto, definir cómo se asignan (por ejemplo por proyecto) y hacerlos accesibles para todos. Las capacidades son:
	- Ingestión de datos
	- Asignación
	- Informes y análisis
	- Gestión de anomalías
- **Cuantificar el valor de negocio**: conectar el gasto con resultados, presupuestos, previsiones y KPIs para saber si "merece la pena". Las capacidades son:
	- Planificación y estimación
	- Pronóstico
	- Presupuesto
	- Evaluación comparativa
	- Economía unitaria
- **Optimizar el uso y el coste**: reducir desperdicio, elegir mejor modelo de compra y diseñar/operar sistemas de forma eficiente. Las capacidades son:
	- Arquitectura para la nube
	- Optimización de las tarifas
	- Optimización de la carga de trabajo
	- Sostenibilidad de la nube
	- Licencias y SaaS
- **Operar la práctica FinOps**: convertirlo en una rutina que mejora con el tiempo (personas, procesos y gobernanza). Las capacidades son:
	- Operaciones de práctica de FinOps
	- Política y gobernanza
	- Evaluación de FinOps
	- Herramientas y servicios de FinOps
	- Educación y capacitación en FinOps
	- Facturación y contracargos
	- Cargas de trabajo de incorporación
	- Disciplinas relacionadas

[Aquí](https://www.finops.org/framework/domains/){:target="_blank"} tienes los dominios, y [aquí](https://www.finops.org/framework/capabilities/){:target="_blank"} las capacidades.

### Los equipos en FinOps

> FinOps no es un equipo aparte que hace magia.
{: .prompt-info }

No quiero extenderme en este punto, pero se habla de dos categorías, el equipo principal y los aliados. Esta imagen creo que lo explica bien:

![FinOps personas](finops_personas.png)

Pero si quieres más información, la tienes [aquí](https://www.finops.org/framework/personas/){:target="_blank"}.

---

## FinOps en AWS: el mapa rápido (en 1 minuto)

Ahora, aterricemos esto en AWS, que es lo que me interesa a mí.

La fundación FinOps habla de un ciclo de tres fases: **Informar, Optimizar y Operar**. No son etapas que haces una vez; se repiten de forma iterativa.

![Fases de FinOps: Informar, Optimizar y Operar](finops_phases.png)

### Informar

Objetivo: saber **qué se gasta, por quién y por qué**, con datos consistentes, es decir, tener visibilidad y asignación de gastos.

En AWS, puedes usar:

- `Cost Explorer` para análisis
- `tags` y `cost allocation tags` para agrupar gastos
- `Cost Categories` para mapear gasto a un equipo
- `Budgets` y `Anomaly Detection` para recibir alertas antes de que sea tarde
- si quieres detalle fino: CUR (Cost and Usage Report) y analítica (`Athena/QuickSight`)

### Optimizar

Objetivo: reducir coste sin perder valor. Normalmente por dos vías: **usar mejor** (menos desperdicio) y **pagar mejor** (modelo de compra).

En AWS, puedes usar:

- `Cost Optimization Hub`, `Trusted Advisor` y `Compute Optimizer` para obtener recomendaciones de optimización de costes
- dashboards avanzados tipo **CID (Cloud Intelligence Dashboards)** si necesitas análisis y reporting más completo

> Optimizar no es solo "apagar cosas". También es *rightsizing*, elegir mejor modelo de compra, modernizar y mejorar arquitectura.
{: .prompt-tip }

### Operar

Objetivo: que no sea algo puntual, sino que se mantenga con una pequeña rutina. Es decir, tener gobernanza, controles y rutina.

En AWS, puedes usar:

- `Budgets` + alertas
- gobernanza de tags (`Tag Policies`, `Config rules`, controles)
- trazabilidad (`CloudTrail`/`CloudWatch`) si quieres auditar cambios

---

## Mi herramienta para operar FinOps en AWS: aws-finops-toolkit

> AWS ya trae casi todas las piezas para hacer FinOps. **Lo que a mí me faltaba era convertirlo en algo automático** (y rutinario).
{: .prompt-tip }

El proyecto es open-source, serverless, y está disponible en GitHub: [https://github.com/alazaroc/aws-finops-toolkit](https://github.com/alazaroc/aws-finops-toolkit){:target="_blank"}

### Por qué la construí

Mi contexto era muy común:

- ya tenía tagging
- ya tenía budgets
- pero me faltaba **entender los gastos por proyecto de forma sencilla y repetible, sin esfuerzo**

> No quería otro dashboard: quería datos claros por proyecto, que me llegaran solos y me obligaran a actuar.
{: .prompt-info }

Así que construí **aws-finops-toolkit**: un toolkit serverless para automatizar visibilidad, gobernanza y reportes.

### Qué incluye

Tiene 6 funcionalidades principales:

1) Creación de Budgets para recibir alertas de gasto
2) **finops-cost-analyzer**: análisis de coste del mes actual, configurable por etiqueta / región / servicio
3) **finops-tag-inventory**: inventario de recursos por región y etiquetas; detecta etiquetas similares a las obligatorias
4) **finops-compliance-checker**: auditoría de tags obligatorios (configurable) y resumen de tags más usados
5) **finops-optimization-insights**: consolida recomendaciones de optimización en un reporte mensual
6) **finops-historical-cost-analyzer**: análisis de coste histórico y comparativas con meses anteriores

Para las funciones 2, 3, 4 y 5 se envía un reporte HTML por email (y se guarda en S3).

### Arquitectura

La arquitectura es simple y está basada en servicios nativos de AWS.

Es una arquitectura serverless basada en `Lambda` + `EventBridge` + `S3` + `SES` + `CloudWatch Logs`.

![Arquitectura de aws-finops-toolkit](architecture_diagram.png)

> El proyecto está creado con AWS SAM.
{: .prompt-info }

### Cómo mapea mi herramienta con las 3 fases de FinOps

He creado esta tabla para explicarlo mejor:

| Fase      | Objetivo                 | Componente                         | Qué entrega                                             | Qué NO hace (a propósito)          | Cómo cubrirlo si lo necesitas                          |
| --------- | ------------------------ | ---------------------------------- | ------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------ |
| Informar  | Visibilidad por proyecto | finops-cost-analyzer               | Top servicios por proyecto, anomalías, reportes HTML    | BI avanzado o dashboards completos | CID (QuickSight) o CUR + Athena                        |
| Informar  | Asignación               | finops-compliance-checker + finops-tag-inventory | Control de tag obligatorio + inventario/higiene de tags | No "arregla tags" automáticamente  | Política interna + normalización manual o job dedicado |
| Informar  | Histórico programable    | finops-historical-cost-analyzer    | Peticiones bajo demanda                        | No genera emails/reportes          | Integración en portales internos o pipelines           |
| Optimizar | Backlog de ahorro        | finops-optimization-insights       | Recomendaciones consolidadas y priorizadas              | No aplica cambios automáticamente  | Runbooks + tickets (Jira/GitHub Issues)                |
| Operar    | Gobernanza continua      | finops-compliance-checker + reglas de EventBridge (schedules)     | Ejecución recurrente + reportes                         | No bloquea despliegues             | AWS Config / SCPs / guardrails en IaC                  |

### Un MVP en pocas horas (si ya tienes lo básico)

Si ya tienes lo básico (una etiqueta en tus recursos, por ejemplo `project`, acceso a Billing, y permisos para desplegar), puedes dejarlo funcionando en pocas horas:

1. activa la etiqueta que uses (por ejemplo `project`) como `cost allocation tag`
2. desplega aws-finops-toolkit, configurándolo con tus valores
3. pruébalo haciendo una ejecución a mano, para asegurar que te llegan los reportes (revisa el fichero `docs/operations.md` y busca (1) cómo confirmar tu email en SES y (2) cómo ejecutar las lambdas a mano)
4. empieza a medir:
   - % gasto asignado a tu etiqueta
   - gasto sin asignar (recursos sin la etiqueta `project`) y sus principales drivers
   - top proyectos y variación
   - anomalías relevantes

Luego, en 2 semanas, lo conviertes en práctica:

- semana 1: arreglar datos (cobertura y consistencia)
- semana 2: backlog real (top 5 acciones por impacto, responsable y fecha)

---

## La certificación (FinOps Certified Practitioner)

La parte útil de la certificación de **FinOps Certified Practitioner (FOCP)**, es que te obliga a ordenar:

- conceptos y vocabulario
- principios, roles y colaboración
- ciclo de vida y prácticas repetibles

La descripción oficial del FOCP lo deja claro: cubre fundamentos y conceptos clave en las tres secciones del ciclo FinOps (Informar, Optimizar y Operar).

[Este es el enlace a la certificación](https://learn.finops.org/finops-certified-practitioner-certification-exam){:target="_blank"}

El examen no es lo importante. Lo importante es lo que te obliga a practicar mientras lo preparas. Con la información que te he dejado en este artículo tienes el acceso a todo lo importante.

> Mi recomendación es que hagas como yo, y a la vez que te lo preparas, revisa qué estas haciendo ahora con los costes en el cloud y cómo puedes hacerlo mejor a partir de ahora.
{: .prompt-tip }

---

## Conclusión

AWS tiene herramientas muy potentes para FinOps. El problema no es que "no exista un servicio" que te ayude, sino que te falta:

- ownership
- datos consistentes
- rutina de revisión y optimización
- convertir recomendaciones en trabajo

Si yo empezara hoy desde cero en una cuenta AWS:

1. añadiría alertas (Budgets y Anomaly Detection)
2. añadiría el tag `project` en todos mis recursos
3. activaría `cost allocation tags`
4. definiría 3 métricas simples y un ritual semanal:
   - % de gasto asignado a `project`
   - gasto sin asignar (sin `project`) y sus top servicios
   - top proyectos por coste y la variación (para detectar cambios)
5. y automatizaría reportes para no depender de "ya lo miraré"

Yo lo aterricé con mi toolkit [aws-finops-toolkit](https://github.com/alazaroc/aws-finops-toolkit){:target="_blank"}. ¿Tú cómo lo estás operando ahora?

> En mi caso, si lo tengo que ir a buscar, no lo voy a mirar, pero si me llega, actúo. Así de simple.
{: .prompt-tip }

---
layout: post
title: Cómo renové la AWS Certified Security Specialty (SCS-C03)
date: 2026-02-02 09:17 +0100
last_modified_at:
lang: es
lang-exclusive:
  - en
  - es
description: "Aprobé la AWS Certified Security Specialty (SCS-C03) y cuento cómo la renové: qué cambió (IA/GenAI), qué revisé en la consola, y por qué IAM sigue siendo la clave del examen."
category:
tags:
published: true
level:
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2026-02-02-how-i-renewed-the-aws-certified-security-specialty-scs-c03/
image:
  path: security_certification.png
  header_post: false
---
---

Escribo este post después de haber aprobado la certificación **AWS Certified Security Specialty (SCS-C03)**. Quería dejar por escrito qué hice yo para prepararla y por qué, para mí, es una de las certificaciones más útiles de AWS.

![AWS Certified Security Specialty (SCS-C03)](security_certification.png)

Yo ya había aprobado una versión anterior (SCS-C01) hace más de tres años. Aunque ya estuviera caducada, se puede considerar que fue una renovación. En la práctica da igual: el examen es el mismo y lo que importa es ponerse al día con el contenido actual.

Cuando la preparé por primera vez, escribí varios artículos de seguridad en AWS, y para esta renovación me han venido genial como base y como repaso. Algunos de ellos serán actualizados próximamente. Los dejo aquí por si te sirven para profundizar en algunos temas.

**Fundamentos y enfoque**:

- [Getting Started with AWS Security](https://www.playingaws.com/posts/getting-started-with-aws-security/){:target="_blank"}
- [How to Improve Your AWS Account Security](https://www.playingaws.com/posts/how-to-improve-your-account-security/){:target="_blank"}
- [Multi-Account Approach on AWS](https://www.playingaws.com/posts/multi-account-approach/){:target="_blank"}
- [AWS Control Tower: Deep Dive](https://www.playingaws.com/posts/aws-control-tower-deep-dive/){:target="_blank"}

**Servicios (deep dives)**:

- [AWS Security Hub: Deep Dive](https://www.playingaws.com/posts/aws-security-hub-deep-dive/){:target="_blank"}
- [Amazon GuardDuty: Deep Dive](https://www.playingaws.com/posts/amazon-guardduty-deep-dive/){:target="_blank"}
- [AWS WAF (Web Application Firewall): Deep Dive](https://www.playingaws.com/posts/aws-waf-web-application-firewall-deep-dive/){:target="_blank"}

**Open source para revisiones de seguridad**:

- [AWS Open Source Tools for Security Assessments (Environment)](https://www.playingaws.com/posts/aws-open-source-tools-environment/){:target="_blank"}
- [Static Analysis of IaC on AWS (Checkov, KICS, etc.)](https://www.playingaws.com/posts/aws-open-source-tools-code/#3-analyze-iac-code-static-analysis){:target="_blank"}

Y si te interesa el método que yo sigo para estudiar una certificación de AWS, aquí hablaba de ello:

- [10 Steps to Prepare Any AWS Certification](https://www.playingaws.com/posts/10-steps-to-prepare-any-aws-certification/){:target="_blank"}

## Por qué merece la pena esta certificación

> Para mí, esta es la **segunda certificación más importante** después de la **AWS Certified Solutions Architect - Professional**.
{: .prompt-tip }

No porque "te haga más seguro" por arte de magia, sino porque te obliga a repasar best practices de seguridad que luego aplicas en cualquier arquitectura: identidad, permisos, cifrado, trazabilidad, detección y respuesta. Y cuando interiorizas eso, **diseñas mejor, operas mejor y cometes menos errores**.

El examen **SCS-C03** cubre seis dominios que en conjunto representan el ciclo de vida completo de la seguridad en AWS: desde la gobernanza y la identidad, pasando por la protección de datos y el hardening de infraestructura, hasta la detección y la respuesta a incidentes. Lo que hace que esta certificación sea genuinamente útil es que estos dominios no están aislados: una política de AWS Identity and Access Management (IAM) mal configurada puede afectar a la protección de datos, la detección y la respuesta a incidentes al mismo tiempo. El examen te entrena a pensar de forma conectada.

En seguridad, los fallos suelen ser pequeños detalles. Esta certificación te enseña esos detalles.

## El examen, en 2 minutos

Lo básico:

- Duración: **170 minutos**
- Preguntas: **65**
- Tipo: multiple choice y multiple response (preguntas largas, muy de escenario)
- Precio: **300 USD**
- Validez: **3 años**

Página oficial:

- [AWS Certified Security - Specialty](https://aws.amazon.com/certification/certified-security-specialty/){:target="_blank"}

Sobre el scoring:

- La puntuación va de 100 a 1000 y el mínimo para aprobar es 750.
- **AWS incluye 15 preguntas que no puntúan** (no están marcadas como tal).

> Tómate en serio el tiempo. No es un examen para hacerlo con prisa. Son preguntas largas y en algunos casos complejas.
{: .prompt-tip }

## SCS-C03: la nueva versión del examen

Cuando vi la nueva versión **SCS-C03**, lo que más me preocupó fue la inclusión de temas de **IA y GenAI**. No porque no tenga sentido (era inevitable), sino porque esta parte era nueva para mí.

En el temario aparecen estos servicios:

- Amazon Bedrock
- Amazon Q (Business y Developer)
- Amazon SageMaker AI
- Amazon CodeGuru Security

Yo lo preparé como "seguridad aplicada" a estos servicios, sobre todo desde el ángulo de:

- permisos y control de acceso (IAM)
- protección y uso de datos
- trazabilidad y auditoría (qué se registra y dónde)

Para **Amazon Bedrock** en concreto, las consideraciones de seguridad clave son: qué principales de IAM pueden invocar modelos fundacionales, cómo usar políticas basadas en recursos para restringir el acceso a los modelos, y cómo AWS CloudTrail registra las llamadas a la API de Bedrock para auditabilidad. Para Amazon Q Developer, la preocupación principal es el alcance de los permisos: a qué fuentes de datos puede acceder y bajo qué contexto de rol IAM.

> **Amazon Q Developer vs. Kiro**: Amazon Q Developer como servicio sigue activo. Lo que cambió es que el **Amazon Q Developer CLI** fue renombrado a **Kiro CLI** en noviembre de 2025, y AWS lanzó por separado **Kiro**, un nuevo IDE agéntico (actualmente en preview), construido sobre VS Code. Kiro el IDE es un producto distinto, no un reemplazo de Amazon Q Developer el servicio. Por tanto, cuando el temario del SCS-C03 menciona "Amazon Q Developer", se refiere al servicio de asistente de IA, no al CLI ni al IDE.
{: .prompt-info }

Y ahora el dato importante, por si estás renovando y te está pasando lo mismo que a mí:
**en mi examen solo tuve 1 pregunta relacionada con IA**, y fue sobre **permisos en Amazon Q Developer**. Nada más. El resto del examen fue muy similar a versiones anteriores.

> Mi conclusión: no ignores IA, pero tampoco te obsesiones. IAM sigue siendo el protagonista y aparece en todas partes.
{: .prompt-tip }

### Cambios de dominios

A nivel de estructura, SCS-C03 separa claramente **Detection** e **Incident Response** (antes estaban más mezclados). Y el anterior dominio de "Security Logging and Monitoring" ya no aparece como bloque independiente: se integra dentro de Detection y se conecta con respuesta.

Pesos oficiales del examen (tal cual aparecen en el Exam Guide):

| Dominio                             | Peso |
| ----------------------------------- | ---- |
| Detection                           | 16%  |
| Incident Response                   | 14%  |
| Infrastructure Security             | 18%  |
| Identity and Access Management      | 20%  |
| Data Protection                     | 18%  |
| Security Foundations and Governance | 14%  |

Que **IAM** sea el dominio más importante con un 20% no es casualidad. Casi cualquier escenario de seguridad en AWS empieza o termina con una pregunta de permisos.

## Cómo me preparé

Mi preparación fue muy directa y muy práctica, pero no fue solo consola.

Lo que hice:

1. **Consola de AWS para refrescar servicios y opciones** (mi parte favorita, porque me permite aterrizar muy bien la teoría)
2. **Curso de Udemy** (solo me revisé el PDF resumen del curso)
3. **No hice preguntas de examen**. Esto no es lo habitual y no lo recomiendo como regla general, pero en mi caso me sabía bien el temario y me apoyé en experiencia real.

Esto me funcionó, pero ojo con copiar la estrategia sin contexto: lo que marca la diferencia aquí es la práctica y la experiencia, porque las preguntas van de escenarios y matices.

## Mi ruta de repaso (y por qué este orden)

Este fue el orden que seguí:

1. **Foundations and Governance**
2. **IAM**
3. **Data Protection**
4. **Detection**
5. **Incident Response**
6. **Infrastructure Security**

Por qué así:

- Empecé por la base: el <kbd>Pilar de Seguridad del AWS Well-Architected Framework</kbd>.
- **IAM fue la estrella del examen**, sin ninguna duda. Es el tema con más matices y donde más fácil es fallar por un detalle.
- Data Protection va muy pegado a IAM (AWS Key Management Service (KMS), Amazon S3, AWS Secrets Manager) y también tiene muchas trampas.
- **Detection** e **Incident Response** las repasé seguidas, porque mentalmente van unidas: primero detectas y entiendes, luego respondes. Y aquí entran prácticamente todos los servicios de seguridad de AWS.
- Dejé **Infrastructure Security** para el final como repaso más general.

## Qué revisé en la consola (mi checklist)

No es una guía paso a paso. Es la lista de "entrar y revisar lo importante" que a mí me sirvió para refrescar.

### Foundations and Governance

- Pilar de Seguridad en el AWS Well-Architected Framework
- AWS Organizations: gobierno a escala, Service Control Policies (SCPs) y cómo interactúan con las políticas de IAM. Las SCPs actúan como barreras: definen los permisos máximos disponibles para las cuentas de una unidad organizativa, pero no conceden permisos por sí solas. Una acción requiere tanto un allow de SCP como un allow de IAM para ejecutarse.
- AWS Artifact y AWS Audit Manager: informes de cumplimiento, recopilación de evidencias y automatización de auditorías

### IAM

IAM es el dominio donde más candidatos pierden puntos, y con razón: la lógica de evaluación de políticas tiene varias capas que es fácil confundir bajo la presión del examen.

El orden de evaluación importa: un deny explícito siempre gana, independientemente de cualquier allow. Después, AWS comprueba si hay un allow en las políticas aplicables (basadas en identidad, basadas en recursos, SCPs, políticas de sesión). Si no se encuentra ningún allow, el resultado es un deny implícito.

Áreas clave que revisé:

- **Políticas**: condition keys (`aws:SourceIp`, `aws:PrincipalOrgID`, `aws:RequestedRegion`), denies explícitos y la diferencia entre políticas basadas en identidad y basadas en recursos
- **Roles y acceso cross-account**: las trust policies definen *quién* puede asumir un rol; las políticas de permisos definen *qué* puede hacer ese rol. Para `AssumeRole` entre cuentas, tanto la trust policy del rol como la política IAM del principal que llama deben permitir la acción.
- **AWS IAM Access Analyzer**: identifica recursos compartidos con principales externos analizando políticas basadas en recursos. Genera findings para buckets de S3, roles de IAM, claves de KMS y otros recursos accesibles desde fuera de la cuenta u organización.
- **AWS IAM Identity Center (anteriormente AWS Single Sign-On)**: los permission sets son políticas IAM asociadas a una asignación de usuario/grupo a una cuenta. Entender cómo se propagan los permission sets entre cuentas en AWS Organizations es un tema habitual en el examen.

### Data Protection

- **AWS Key Management Service (KMS)**: la distinción más importante es entre la key policy y las políticas IAM. La key policy es el mecanismo principal de control de acceso para una clave KMS. Aunque una política IAM conceda `kms:Decrypt`, si la key policy no lo permite, la llamada será denegada. Los grants de clave se usan para delegación temporal y programática del uso de la clave. La rotación automática (anual) aplica solo a claves gestionadas por AWS y a claves gestionadas por el cliente con rotación habilitada.
- **AWS Secrets Manager**: la rotación automática usa una función AWS Lambda que llama a la API del servicio de destino. La política de recursos de un secreto controla el acceso entre cuentas. Entender la diferencia entre `secretsmanager:GetSecretValue` (leer el secreto) y `secretsmanager:DescribeSecret` (leer metadatos) es relevante para diseños de mínimo privilegio.
- **Amazon S3**: la configuración de Block Public Access opera a nivel de cuenta y de bucket y anula cualquier ACL de bucket u objeto que de otro modo concedería acceso público. Las políticas de bucket pueden imponer condiciones como `aws:SecureTransport` (requerir HTTPS), `aws:SourceVpc` (restringir a una VPC) o `aws:PrincipalOrgID` (restringir a la organización). Opciones de cifrado del lado del servidor: SSE-S3 (claves gestionadas por AWS, sin coste adicional), SSE-KMS (claves gestionadas por el cliente, las llamadas a la API de KMS se registran en AWS CloudTrail, coste adicional) y SSE-C (claves proporcionadas por el cliente).

### Detection

Aquí es donde aparecen más servicios y donde importa entender el flujo de datos entre ellos.

- **AWS CloudTrail y AWS CloudTrail Lake**: CloudTrail registra la actividad de la API en toda la cuenta. CloudTrail Lake permite ejecutar consultas SQL directamente sobre los datos de eventos de CloudTrail sin necesidad de exportarlos a S3 primero. Los management events (plano de control) se registran por defecto; los data events (operaciones a nivel de objeto en S3, invocaciones de Lambda) deben habilitarse explícitamente.
- **AWS Config**: evalúa las configuraciones de recursos frente a reglas (gestionadas o personalizadas basadas en Lambda). Los conformance packs agrupan múltiples reglas y acciones de remediación. Config no impide cambios; detecta drift y puede desencadenar remediación automatizada mediante AWS Systems Manager Automation.
- **AWS Security Hub**: agrega findings de múltiples servicios de AWS (Amazon GuardDuty, Amazon Inspector, AWS Config, Amazon Macie, AWS IAM Access Analyzer) y herramientas de terceros usando el AWS Security Finding Format (ASFF). Los estándares de seguridad (CIS AWS Foundations Benchmark, AWS Foundational Security Best Practices) ejecutan comprobaciones automáticas y generan findings con puntuaciones de severidad.
- **Amazon GuardDuty**: servicio de detección de amenazas que analiza los management events de AWS CloudTrail, los Amazon VPC Flow Logs y los registros de consultas DNS para identificar comportamientos maliciosos o no autorizados. Los tipos de finding se organizan por propósito de amenaza (Backdoor, CryptoCurrency, Trojan, UnauthorizedAccess, etc.), tipo de recurso y detector. GuardDuty no requiere agentes y no tiene impacto en el rendimiento de las cargas de trabajo.
- **Amazon Inspector**: evaluación automatizada de vulnerabilidades para instancias Amazon EC2, imágenes de contenedor en Amazon Elastic Container Registry (ECR) y funciones AWS Lambda. Usa el Common Vulnerability Scoring System (CVSS) para priorizar los findings e integra con AWS Security Hub.
- **Amazon Detective**: usa machine learning y análisis de grafos para ayudar a investigar findings de seguridad. Ingiere datos de Amazon GuardDuty, AWS CloudTrail y Amazon VPC Flow Logs para construir un grafo de comportamiento. Útil para pivotar desde un finding de GuardDuty y entender el alcance completo de un incidente.
- **Amazon Macie**: usa machine learning para descubrir y clasificar datos sensibles en Amazon S3. Identifica información de identificación personal (PII), datos financieros y credenciales. Los findings se integran con AWS Security Hub.
- **Amazon Security Lake**: centraliza datos de seguridad de servicios de AWS y fuentes de terceros en un data lake dedicado basado en S3. Normaliza los datos usando el Open Cybersecurity Schema Framework (OCSF), facilitando las consultas entre fuentes con herramientas como Amazon Athena.

### Incident Response

- **AWS Systems Manager**: AWS Systems Manager Session Manager proporciona acceso shell desde el navegador a instancias EC2 sin abrir puertos de entrada ni gestionar claves SSH. AWS Systems Manager Run Command permite ejecutar scripts en una flota de instancias. Ambos son herramientas clave de contención: puedes aislar una instancia modificando su security group y luego usar Session Manager para investigar sin necesitar un bastion host.
- **Amazon Detective**: investigación y pivote de señales a partir de findings de GuardDuty
- **Amazon EventBridge y Amazon Simple Notification Service (SNS)**: patrones básicos de automatización de respuesta. Un patrón habitual es: finding de GuardDuty → regla de EventBridge → función Lambda → acción de remediación (por ejemplo, aislar instancia, revocar credenciales). SNS se usa para la distribución de notificaciones.

### Infrastructure Security

- **Amazon VPC endpoints**: los interface endpoints (basados en AWS PrivateLink) y los gateway endpoints (para Amazon S3 y Amazon DynamoDB) permiten conectividad privada a servicios de AWS sin atravesar la internet pública. Las políticas de VPC endpoint controlan qué acciones y recursos son accesibles a través del endpoint.
- **Security Groups y Network Access Control Lists (NACLs)**: los Security Groups son stateful (el tráfico de retorno se permite automáticamente), operan a nivel de instancia y solo admiten reglas de allow. Las NACLs son stateless (el tráfico de retorno debe permitirse explícitamente), operan a nivel de subred y admiten tanto reglas de allow como de deny. Las NACLs se evalúan en orden de número de regla; se aplica la primera regla que coincide.
- **AWS Network Firewall**: firewall de red stateful y gestionado, desplegado dentro de una VPC. Admite reglas compatibles con Suricata para inspección profunda de paquetes. Se posiciona entre el internet gateway y las subredes de aplicación para inspección de tráfico norte-sur, o entre subredes para tráfico este-oeste.
- **AWS WAF (Web Application Firewall)**: protege Amazon CloudFront, Application Load Balancer, Amazon API Gateway y AWS AppSync. Las Web ACLs contienen reglas y grupos de reglas (gestionados por AWS o por terceros). Las reglas basadas en tasa limitan las peticiones por IP. El logging puede enviarse a Amazon Kinesis Data Firehose, Amazon S3 o Amazon CloudWatch Logs.
- **AWS Shield**: AWS Shield Standard se habilita automáticamente para todos los clientes de AWS sin coste adicional y protege contra ataques DDoS comunes de capa de red y transporte. AWS Shield Advanced proporciona detección mejorada, acceso 24/7 al AWS DDoS Response Team (DRT) y protección de costes durante ataques de escalado.

## Conclusiones

Si estás renovando, mi resumen sería este:

- **IAM es la prioridad**. Es el tema donde más fácil es equivocarse por matices, y donde más preguntas vas a tener.
- La consola es una forma excelente de refrescar rápido, y sirve para complementar la experiencia real y aterrizar conceptos.
- En mi caso, el "miedo a IA" fue más grande que la realidad del examen: solo me cayó 1 pregunta y era de permisos en Amazon Q Developer.

Si empiezas desde cero, mi recomendación es añadir un curso y práctica de preguntas. Y si estás renovando con experiencia, una sesión intensa de repaso en consola (bien enfocada) te puede dar muchísima velocidad.

> Si tuviera que elegir solo un recurso de seguridad para revisar, sería el **Pilar de seguridad del AWS Well-Architected Framework** (no para el examen, sino para obtener conocimiento general).
{: .prompt-tip }

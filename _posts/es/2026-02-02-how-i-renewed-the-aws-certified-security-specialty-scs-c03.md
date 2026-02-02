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

> Para mí, esta es la **segunda certificación más importante** después de la **Architect Professional**.
{: .prompt-tip }

No porque "te haga más seguro" por arte de magia, sino <kbd>porque te obliga a repasar best practices de seguridad</kbd> que luego aplicas en cualquier arquitectura: identidad, permisos, cifrado, trazabilidad, detección y respuesta. Y cuando interiorizas eso, **diseñas mejor, operas mejor y cometes menos errores**.

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
- SageMaker AI
- CodeGuru Security

Yo lo preparé como "seguridad aplicada" a estos servicios, sobre todo desde el ángulo de:

- permisos y control de acceso (IAM)
- protección y uso de datos
- trazabilidad y auditoría (qué se registra y dónde)

Y ahora el dato importante, por si estás renovando y te está pasando lo mismo que a mí:  
**en mi examen solo tuve 1 pregunta relacionada con IA**, y fue sobre **permisos en Amazon Q Developer**. Nada más. El resto del examen fue muy similar a versiones anteriores.

> Mi conclusión: no ignores IA, pero tampoco te obsesiones. Si tienes clara la base de IAM y cómo se modela el acceso, vas bien encaminado.
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

## Cómo me preparé

Mi preparación fue muy directa y muy práctica, pero no fue solo consola.

Lo que hice:

1. **Consola AWS para refrescar servicios y opciones** (mi parte favorita, porque me permite aterrizar muy bien la teoría)
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

- **IAM fue la estrella del examen**, sin ninguna duda. Y es el tema con más matices y donde más fácil es fallar por un detalle.
- Data Protection va muy pegado a IAM (KMS, S3, Secrets) y también tiene muchas trampas.
- **Detection** e **Incident Response** las repasé seguidas, porque mentalmente van unidas: primero detectas y entiendes, luego respondes. Y aquí entran prácticamente todos los servicios de seguridad de AWS.
- Infra y Governance las dejé para el final como repaso más general.

## Qué revisé en la consola (mi checklist)

No es una guía paso a paso. Es la lista de "entrar y revisar lo importante" que a mí me sirvió para refrescar.

### Foundations and Governance

- Pilar de Seguridad en el AWS Well-Architected Framework
- Organizations: gobierno a escala
- Artifact/Audit Manager: auditoría y evidencias

### IAM

- Policies: condiciones típicas, denies explícitos, prioridades
- Roles: trust policies, cross-account, AssumeRole y patrones comunes
- IAM Access Analyzer: exposiciones por policies
- IAM Identity Center: permission sets y asignación a cuentas

### Data Protection

- KMS: key policy vs IAM policy, grants, rotación, permisos de uso vs administración
- Secrets Manager: rotación, resource policy, permisos de lectura
- S3: Block Public Access, bucket policy, condiciones (TLS, org, endpoints), SSE-S3 vs SSE-KMS

### Detection

- CloudTrail y CloudTrail Lake: eventos críticos y trazabilidad
- AWS Config: rules, conformance packs, drift
- Security Hub: centralizar findings de seguridad (standards, controles y findings)
- GuardDuty: detección de amenazas a partir de señales como CloudTrail, VPC Flow Logs y DNS logs
- Inspector: evaluaciones automáticas (por ejemplo en EC2, ECR y Lambda)
- Detective: investigación y correlación a partir de señales
- Macie: hallazgos sobre datos sensibles
- Security Lake: concepto, OCSF y cómo encaja en detección

### Incident Response

- Systems Manager: Session Manager y Run Command como herramientas de contención
- Detective: investigación y pivote de señales
- EventBridge/SNS: patrones básicos de automatización de respuesta

### Infrastructure Security

- VPC endpoints: conectividad privada a servicios
- Security Groups y NACLs: diferencias y casos típicos
- Network Firewall: dónde encaja y qué resuelve
- WAF: managed rules, rate-based, logging
- Shield: cuándo tiene sentido

## Conclusiones

Si estás renovando, mi resumen sería este:

- **IAM es la prioridad**. Es el tema donde más fácil es equivocarse por matices, y donde más preguntas vas a tener.
- La consola es una forma excelente de refrescar rápido, y sirve para complementar la experiencia real, y aterrizar conceptos.
- En mi caso, el "miedo a IA" fue más grande que la realidad del examen: solo me cayó 1 pregunta y era de permisos en Amazon Q Developer.

Si empiezas desde cero, mi recomendación es añadir un curso y práctica de preguntas. Y si estás renovando con experiencia, una sesión intensa de repaso en consola (bien enfocada) te puede dar muchísima velocidad.

> Si tuviera que elegir solo un recurso de seguridad para revisar, sería el **Pilar de seguridad del AWS Well-Architected Framework** (no para el examen, sino para obtener conocimiento general).
{: .prompt-tip }

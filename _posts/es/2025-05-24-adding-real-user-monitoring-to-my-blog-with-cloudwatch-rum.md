---
layout: post
title: Añadiendo CloudWatch RUM (monitorización de usuarios reales) en mi blog
date: 2025-05-20 08:07 +0200
last_modified_at:
lang: es
lang-exclusive: ['en','es']
description: Amazon CloudWatch RUM proporciona información en tiempo real sobre el rendimiento de las aplicaciones web, las interacciones de los usuarios y los errores. En esta guía se explican sus funciones, configuración y prácticas recomendadas para optimizar la monitorización.
category: Observabilidad
tags:
- level-200
- monitorizacion
- devops
published: true
level: 200
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2025-05-24-adding-real-user-monitoring-to-my-blog-with-cloudwatch-rum/
image:
  path: home-overview.png
  header_post: false
---
---

## 1. Introducción

Hace tiempo que quería probar este servicio y ahora tengo la excusa perfecta: `para integrarlo en mi blog` (un sitio web estático creado con Jekyll e implementado en Amazon S3 y CloudFront -> Más información [aquí](/posts/the-technology-behind-this-blog/)).

En este artículo, analizaremos Amazon CloudWatch RUM (Real User Monitoring = monitorización de usuarios reales): **qué es, cómo funciona y cómo puedes configurarlo para mejorar el rendimiento de tus aplicaciones web**.

## 2. Amazon CloudWatch RUM (Real User Monitoring = monitorización de usuarios reales)

### 2.1. ¿Qué es?

`Amazon CloudWatch RUM (Real User Monitoring)` está diseñado para ayudar a `rastrear y optimizar` tus aplicaciones web al proporcionar información en tiempo real sobre las interacciones de los usuarios, los problemas de rendimiento y los errores, que puedes utilizar para identificar y depurar los problemas de rendimiento del lado del cliente.

### 2.2. ¿Qué hace?

CloudWatch RUM proporciona una serie de métricas e información, entre las que se incluyen las siguientes:

- **Monitorización del rendimiento**: mide los tiempos de carga de las páginas, los tiempos de renderizado y otros indicadores clave de rendimiento.
- **Seguimiento de errores**: captura los errores de JavaScript, los errores de HTTP y los problemas de compatibilidad de los navegadores.
- **Análisis del comportamiento de los usuarios**: analiza la forma en que los usuarios navegan por tu sitio e identifica los cuellos de botella.
- **Análisis de sesiones**: hace un seguimiento del comportamiento de los usuarios en las sesiones para ofrecer una visión más profunda de la experiencia general.
- **Análisis geográfico**: monitoriza el rendimiento en diferentes regiones.
- **Análisis de navegadores y dispositivos**: Realiza un seguimiento del rendimiento en varios navegadores y dispositivos.

### 2.3. ¿Cómo funciona?

CloudWatch RUM recopila datos de las interacciones reales de los usuarios casi en tiempo real. Cuando un usuario visita tu sitio web, un ligero agente de JavaScript envía los datos de telemetría a Amazon CloudWatch, que luego se procesan y visualizan en los dashboards, lo que te permite supervisar el rendimiento, detectar anomalías y solucionar problemas de forma eficiente.

> Recuerda que CloudWatch RUM añadirá un pequeño agente de JavaScript a tus páginas, lo que puede `provocar un impacto (mínimo) en el rendimiento`. Ten esto en cuenta, especialmente en los sitios web que dependen del rendimiento.
{: .prompt-warning }

## 3. Configurar CloudWatch RUM

Para empezar a usar CloudWatch RUM, sigue estos pasos:

![aws console rum](aws-console-rum.jpg){:class="border"}

- Paso 1: Crear una aplicación RUM de CloudWatch
  - Configura tu aplicación y obtén el código JavaScript que añadir en tu web: [enlace con más información](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM-get-started-create-app-monitor.html){:target="_blank"}.
- Paso 2: Añadir el fragmento de JavaScript de CloudWatch RUM
  - Añade el fragmento de código JavaScript en la sección `cabecera` de tu aplicación.
- Paso 3: Ver y analizar los datos
  - Supervisa el rendimiento, la velocidad de carga de la página y los errores en las sesiones de usuario.

### 3.1. Paso 1: Crear una aplicación RUM de CloudWatch

Para configurar tu aplicación RUM de CloudWatch de forma eficaz, tenen cuenta lo siguiente:

1. Define los dominios de la aplicación: especifica de 1 a 5 dominios sobre los que RUM recopilará datos.
2. **Configurar la recopilación de datos RUM**: Decide qué tipo de telemetría quieres capturar. Puedes habilitar:
   - `Telemetría del rendimiento`: captura los tiempos de carga de las páginas, los tiempos de renderizado y los datos básicos de la web.
   - `Errores de JavaScript`: registra las excepciones no controladas que se producen en tu aplicación web.
   - `Errores HTTP`: monitoriza las llamadas a la API fallidas o los problemas con las solicitudes HTTP.
3. **Configurar las preferencias de registro de datos**:
   - Si tu aplicación es pública, habilita una política basada en recursos públicos para aceptar eventos de RUM no autenticados.
   - Si necesitas una seguridad más estricta, configura la autorización mediante las agrupaciones de identidades de Amazon Cognito o la autenticación privada.
4. **Personaliza las preferencias de registro**: Puedes incluir o excluir páginas específicas del seguimiento de RUM.
5. Generar el fragmento de código: esta es la parte clave. CloudWatch ofrece diferentes formas de integrar el agente RUM en tu sitio web:
   - Integrar `TypeScript` para casos de uso avanzados.
   - Integrar `JavaScript` para aplicaciones dinámicas.
   - Añadir código `HTML` para sitios estáticos sencillos (`ideal para mi blog de Jekyll`).

### 3.2. Paso 2: Añadir el fragmento de JavaScript RUM de CloudWatch

Tras seleccionar tu configuración, CloudWatch genera un fragmento de JavaScript. Esto debe añadirse en la cabecera (<head></head>) de tu sitio web para empezar a rastrear las interacciones reales de los usuarios.

Cuando tengas tu código y hayas seleccionado la opción de integración, tendrás que actualizar tu sitio web para incluirlo.

En mi caso, para mi blog, tuve que incluir el siguiente código:

```html
    <!-- Real User Monitoring with CloudWatch RUM -->
    <script>
        (function(n,i,v,r,s,c,x,z){x=window.AwsRumClient={q:[],n:n,i:i,v:v,r:r,c:c};window[n]=function(c,p){x.q.push({c:c,p:p});};z=document.createElement('script');z.async=true;z.src=s;document.head.insertBefore(z,document.head.getElementsByTagName('script')[0]);})(
        'cwr',
        '98537d86-ca5e-4a41-a8f8-a11631692ef5',
        '1.0.0',
        'eu-west-1',
        "{{ '/assets/js/cwr.min.js' | relative_url }}",
        {
            identityPoolId: "eu-west-1:e24933c6-470e-45cf-892d-b1d88cb8e9de",
            sessionSampleRate: 1,
            endpoint: "https://dataplane.rum.eu-west-1.amazonaws.com",
            telemetries: ["performance","errors","http"],
            allowCookies: true,
            enableXRay: false
        }
        );
    </script>
```

### 3.3. Paso 3: Ver y analizar los datos

Una vez recopilados los datos, puedes analizarlos para `obtener información sobre el rendimiento de las aplicaciones`.

CloudWatch RUM ofrece dos vistas en la página de inicio:

- **Información general**: vista de todos los monitores de tu aplicación juntos. También puedes descargar un reporte en pdf.
  - ![home overview image](home-overview.png){:class="border"}
  - ![download pdf report](download-report.png){:class="border"}
- **Vista de lista**: lista con tus monitores de aplicaciones específicos
  - ![home list app monitors image](home-list-view.jpg){:class="border"}

Y luego, en cada monitor de aplicaciones, puedes acceder a la información sobre:

- **Rendimiento**
  - ![image of performance page views metrics](performance-1-page-views.jpg){:class="border"}
  - ![image of performance average load time metrics](performance-2-average-load-time.jpg){:class="border"}
  - ![image of performance web vitals metrics](performance-3-web-vitals.jpg){:class="border"}
  - ![image of performance page loads metrics](performance-4-page-loads.jpg){:class="border"}
- **Errores**
  - ![image of errors metrics](errors-metrics.jpg){:class="border"}
- **Solicitudes Http**
  - ![image of http requests metrics](http-requests-metrics.jpg){:class="border"}
- **Sesiones**
  - ![image of sessions metrics](sessions.jpg){:class="border"}
  - ![image of specific session metrics](sessions-example-specific-session.jpg){:class="border"}
- **Eventos**
  - ![image of events metrics](events.jpg){:class="border"}
- **Navegadores y dispositivos**
  - ![image of browser and devices metrics 1](browser-and-devices-1.jpg){:class="border"}
  - ![image of browser and devices metrics 2](browser-and-devices-2.jpg){:class="border"}
- **Trayectoria del usuario**
  - ![image of users journey](users-journey.jpg){:class="border"}
- **Configuración**

## 4. Mejores prácticas para CloudWatch RUM

- **Minimiza los costes de recopilación de datos**: Usa las frecuencias de muestreo para controlar la cantidad de datos que se recopilan y se envían a CloudWatch.
- **Combínalo con otras herramientas de monitorización de AWS**: utiliza en CloudWatch Metrics, Logs y trazas con X-Ray para obtener una solución completa de observabilidad. Considera la posibilidad de integrarte con CloudWatch Application Signals para obtener una visión más completa del rendimiento de tu aplicación.
- **Configurar alertas**: configurar las alarmas de CloudWatch para recibir notificaciones sobre problemas de rendimiento importantes.
- **Optimiza el rendimiento de la frontend**: soluciona los problemas de alta latencia identificados en los informes de RUM para mejorar la velocidad de la página.
- **Configura eventos personalizados** para las interacciones específicas de los usuarios de las que quieras rastrear

## 5. Precios de CloudWatch RUM

Los precios de Amazon CloudWatch RUM se basan `en el número de eventos registrados por sesión`. Un evento puede ser la carga de una página, la interacción del usuario (como un clic), un error o una solicitud HTTP.

Lo siguiente afectará al precio:

- **Sesiones**: Una sesión representa la interacción de un usuario con tu aplicación durante un período definido (predeterminado: 30 minutos).
- **Eventos por sesión**: cada sesión puede generar varios eventos (cargas de página, solicitudes de API, errores, etc.).
- **Modelo de precios**: Se te cobra por 1100 000 eventos de RUM, con variaciones regionales en los precios.
- **Retención de datos**: CloudWatch almacena los datos durante un período de retención específico y el almacenamiento adicional de datos puede conllevar costes adicionales.
- `Capa gratuita: AWS ofrece 1 millón de eventos RUM gratuitos al mes.`

> Ejemplo de precios extraído del sitio web de AWS:
>
> Si tu aplicación recibe `500.000 visitas en un mes` y recopilas los eventos de CloudWatch RUM con un muestreo del 100% del rendimiento de carga de páginas y los errores, `con 20 eventos de datos` - incluidos un evento de inicio, un evento de visualización de página y 10 eventos de rendimiento y ocho errores por visita, tus cargos serían los siguientes:
>
> Número total de eventos de datos RUM = 20 eventos de datos/visita * 500.000 visitas = 10.000.000 de eventos de datos
>
> Cargos por `10.000.000 eventos de datos RUM a 1 dólar` por cada 100.000 eventos de datos = 10.000.000 * $1/100.000 = `100 dólares`
>
> Cargos mensuales por eventos de datos RUM de CloudWatch = `100 dólares al mes`
{: .prompt-info }

`Para mi blog, **el coste ha sido de 0 dólares durante los 3 meses que lleva habilitado** (menos de 1 millón de peticiones)`.

[Link](https://aws.amazon.com/cloudwatch/pricing/){:target="_blank"} a la página de precios de Amazon CloudWatch.

> **Consejo de optimización de costes**: Ajusta la frecuencia de muestreo para rastrear solo un porcentaje de los usuarios en lugar de todo el tráfico.
{: .prompt-tip }

## 6. Conclusión

Amazon CloudWatch RUM proporciona información en tiempo real sobre la forma en que los usuarios utilizan tu aplicación web. Al hacer un seguimiento de las métricas de rendimiento, los errores y las interacciones de los usuarios, puedes identificar los problemas con antelación y mejorar la capacidad de respuesta de tu sitio.

Configurar CloudWatch RUM es sencillo y, si se combina con otras herramientas de monitorización de AWS, proporciona una visión completa del estado de la aplicación.

> Si aún no has probado CloudWatch RUM, ahora es el momento perfecto para integrarlo en tu estrategia de monitorización y garantizar una experiencia de usuario perfecta.
{: .prompt-tip }

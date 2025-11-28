---
layout: post
title: Cómo comprar un dominio y migrarlo a AWS Route 53
date: 2025-11-27 09:30 +0200
last_modified_at:
lang: es
lang-exclusive:
- en
- es
description: Aprende cómo comprar un dominio donde quieras y gestionarlo en AWS con Route 53 paso a paso.
category:
- General
tags:
- level-300
- how-to
level: 300
published: true
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2025-11-27-how-to-buy-a-domain-and-migrate-it-to-aws-route-53/
image:
  path: 3-acm-request-public-certificate-b.png
  header_post: false
---
---

Si quieres usar tu propio dominio con servicios de AWS (webs, APIs, aplicaciones internas), tienes tres opciones principales:

1. Comprarlo en AWS con **Route 53 Registered Domains**
2. Comprarlo en un proveedor externo y **migrarlo a AWS** para gestionarlo desde allí
3. Comprarlo en un proveedor externo y **mantener la gestión DNS fuera de AWS**, apuntando desde el proveedor a tus recursos de AWS

En este artículo nos centraremos en la segunda opción, que suele ser muy útil cuando encuentras una buena oferta de dominio fuera de AWS pero quieres seguir gestionando DNS, certificados y servicios desde AWS.

En mi caso, mostraré el ejemplo de mi web [https://playingpadel.es](https://playingpadel.es){:target="_blank"}. Compré el dominio en `Hostalia` y lo migré a AWS.

**¿Qué vas a conseguir al final del tutorial?**

- Tu dominio apuntando a Route 53
- Un certificado TLS válido en ACM
- Tu dominio funcionando con HTTPS en un servicio de AWS (en mi caso, CloudFront + S3)

Vamos paso a paso 🚀

---

## 1. Comprar un dominio

Lo primero es registrar el dominio en el proveedor que prefieras.

En mi caso compré el dominio `playingpadel.es` en **Hostalia** porque encontré una buena oferta, pero tú puedes hacer lo mismo en cualquier otro proveedor (GoDaddy, Namecheap, Google Domains, etc.).

El precio que yo pagué:

- 0 € / primer año
- después, 6,99 € / año

Después de comprar el dominio, podrás gestionarlo desde la página de administración:

![hostalia gestion de dominios.png](1-hostalia-gestion-dominios.png)

> Consejo: busca ofertas, normalmente hay dominios bastante baratos en el primer año. En mi caso `GRATIS`!
{: .prompt-tip }

---

## 2. Crear la Hosted Zone en Route 53

Una vez que tengas el dominio, toca configurarlo en AWS:

1. Ve a la consola de **Route 53** → *Hosted zones*.
2. Crea una **Public hosted zone** con el nombre de tu dominio, por ejemplo:

   ```code
   playingpadel.es
   ```

3. Route 53 te dará **4 servidores de nombres (NS)**. Estos son los que usarás más adelante en tu proveedor de dominios.

![2-aws-route53-dns.png](2-aws-route53-dns.png)

---

## 3. Solicitar un certificado en ACM

Para usar HTTPS necesitas un certificado TLS:

1. Abre la consola de **AWS Certificate Manager (ACM)**.
2. Solicita un certificado público.
3. Añade los dos nombres de dominio:
   - `playingpadel.es`
   - `*.playingpadel.es` (comodín para subdominios, por ejemplo `www.playingpadel.es`, `app.playingpadel.es`, `api.playingpadel.es`, etc.)
4. Elige validación por **DNS**.

> Nota: si vas a usar el certificado con **CloudFront**, el certificado de ACM tiene que estar creado en la región **us-east-1 (N. Virginia)**.
>
> Para otros servicios como ALB o API Gateway regional, puedes usar otras regiones.
{: .prompt-info }

![3-acm-request-public-certificate-a.png](3-acm-request-public-certificate-a.png){: width="500" }

![3-acm-request-public-certificate-b.png](3-acm-request-public-certificate-b.png){: width="500" }

ACM te generará un registro **CNAME** que tendrás que añadir en tu Hosted Zone de Route 53. Una vez validado, tu certificado quedará disponible.

---

## 4. Cambiar los servidores DNS en tu registrador

Este es el paso clave.

1. Entra al panel de administración de tu dominio (Hostalia en mi caso).
2. Busca la opción para cambiar los **Servidores DNS (Name Servers)**.
3. Sustituye los valores que aparecen por los **4 NS de Route 53**.

![4-hostalia-cambiar-dns-a.png](4-hostalia-cambiar-dns-a.png)

> Importante: no intentes añadirlos como registros en la zona DNS de Hostalia. Hay que hacerlo en la configuración del dominio, donde pone “Servidores DNS”.
{: .prompt-warning }

![4-hostalia-cambiar-dns-b.png](4-hostalia-cambiar-dns-b.png){: width="500" }

![4-hostalia-dns-cambiado.png](4-hostalia-dns-cambiado.png){: width="600" }

⏳ La propagación puede tardar **entre unos minutos y hasta 24 a 48 horas** según el proveedor y los TTL de los registros. En la práctica, suele estar listo bastante antes.

```bash
dig NS playingpadel.es
```

Lo importante es que los NS que devuelve el comando coincidan con los que ves en la Hosted Zone de Route 53. Si todavía ves los NS antiguos de tu proveedor, es que la propagación no ha terminado.

![4-validar-dns.png](4-validar-dns.png){: width="600" }

---

## 5. Asociar el dominio a tu servicio en AWS

Una vez que la propagación esté completa, tu dominio ya apunta a AWS 🎉.

Para que todo funcione, necesitas dos cosas:

- La distribución de CloudFront configurada con tu dominio y tu certificado.
- El registro DNS en Route 53 apuntando a esa distribución.

En mi caso lo asocié con:

- **S3** → para servir una web estática
- **CloudFront** → como CDN y punto de entrada HTTPS

### 5.1 Configurar el dominio en CloudFront

En la distribución de CloudFront simplemente:

1. Seleccionas el certificado que creaste en ACM.
2. Añades el dominio como *Alternate domain name (CNAME)*.

![5-asociar-dominio-cloudfront-1.png](5-asociar-dominio-cloudfront-1.png){: width="650" }

![5-asociar-dominio-cloudfront-2.png](5-asociar-dominio-cloudfront-2.png){: width="650" }

![5-asociar-dominio-cloudfront-3.png](5-asociar-dominio-cloudfront-3.png){: width="650" }

![5-asociar-dominio-cloudfront-4.png](5-asociar-dominio-cloudfront-4.png){: width="650" }

### 5.2 Crear el registro DNS en Route 53

En la **Hosted Zone** de Route 53 crea un registro:

- Tipo: `A`
- Nombre: `playingpadel.es`
- Alias: `Yes`
- Target: tu distribución de CloudFront

Si también quieres usar `www.playingpadel.es`, crea otro registro:

- Tipo: `CNAME` (o `A` alias)
- Nombre: `www`
- Target: la misma distribución de CloudFront

![6-crear-registro-route53.png](6-crear-registro-route53.png)

---

## 6. Probar el dominio

Por último, accede a tu dominio desde el navegador:

[https://playingpadel.es](https://playingpadel.es){:target="_blank"}

Si todo está bien, verás tu web cargando con HTTPS.

![7-probar-web.png](7-probar-web.png)

---

## Conclusión

Una vez que tienes el dominio gestionado desde Route 53 y el certificado en ACM, conectar servicios de AWS a tu dominio se vuelve muy sencillo.

Hoy lo hemos visto con una web estática en S3 y CloudFront, pero a partir de aquí puedes reutilizar el mismo dominio y el mismo certificado para:

- APIs en API Gateway
- Aplicaciones detrás de un Application Load Balancer
- Microservicios y aplicaciones internas

Lo importante es que ahora el control del dominio lo tienes tú en AWS.

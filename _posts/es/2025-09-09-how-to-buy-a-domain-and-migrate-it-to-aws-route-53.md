---
layout: post
title: How to Buy a Domain and Migrate it to AWS Route 53
date: 2025-09-09 09:30 +0200
last_modified_at:
lang: es
lang-exclusive:
- en
- es
description: Aprende cómo comprar un dominio donde quieras y gestionarlo en AWS con Route 53 paso a paso.
category:
tags:
published: true
level:
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath:
image:
  path:
  header_post: false
---

En este artículo te voy a enseñar el proceso completo para comprar un dominio en un proveedor externo y migrarlo a **Amazon Route 53** para gestionarlo desde AWS.

El objetivo es sencillo:

- Tener el control total de tu dominio desde AWS.
- Emitir certificados TLS con **AWS Certificate Manager (ACM)**.
- Y asociar el dominio a cualquier servicio, como por ejemplo un **CloudFront** con una web estática en S3.

Vamos paso a paso 🚀

---

## 1. Comprar un dominio

Lo primero es registrar el dominio en el proveedor que prefieras. En mi caso usé **Hostalia** porque encontré un precio competitivo, pero puede ser GoDaddy, Namecheap, Google Domains, etc.

👉 Consejo: busca ofertas, normalmente hay dominios bastante baratos en el primer año.

---

## 2. Crear la Hosted Zone en Route 53

Una vez que tengas el dominio, toca configurarlo en AWS:

1. Ve a la consola de **Route 53** → *Hosted zones*.
2. Crea una **Public hosted zone** con el nombre de tu dominio, por ejemplo:

   ```code
   playingpadel.es
   ```

3. Route 53 te dará **4 servidores de nombres (NS)**. Estos son los que usarás más adelante en tu proveedor de dominios.

---

## 3. Solicitar un certificado en ACM

Para usar HTTPS necesitas un certificado TLS:

1. Abre la consola de **AWS Certificate Manager (ACM)**.
2. Solicita un certificado público.
3. Añade los dos nombres de dominio:
   - `playingpadel.es`
   - `*.playingpadel.es` (comodín para subdominios).
4. Elige validación por **DNS**.

ACM te generará un registro **CNAME** que tendrás que añadir en tu Hosted Zone de Route 53. Una vez validado, tu certificado quedará disponible.

---

## 4. Cambiar los servidores DNS en tu registrador

Este es el paso clave.

1. Entra al panel de administración de tu dominio (Hostalia en mi caso).
2. Busca la opción para cambiar los **Servidores DNS (Name Servers)**.
3. Sustituye los valores que aparecen por los **4 NS de Route 53**.

⚠️ Importante: no intentes añadirlos como registros en la zona DNS de Hostalia. Hay que hacerlo en la configuración del dominio, donde pone “Servidores DNS”.

⏳ La propagación suele tardar entre **24 y 48 horas**. Puedes comprobar el estado con:

```bash
dig NS playingpadel.es
```

---

## 5. Asociar el dominio a tu servicio en AWS

Una vez que la propagación esté completa, tu dominio ya apunta a AWS 🎉.

En mi caso lo asocié con:

- **S3** → para servir una web estática.
- **CloudFront** → como CDN y punto de entrada HTTPS.

En la distribución de CloudFront simplemente seleccionas el certificado que creaste en ACM y añades el dominio como *Alternate domain name (CNAME)*.

---

## 6. Probar el dominio

Por último, accede a tu dominio desde el navegador:

```code
https://playingpadel.es
```

Si todo está bien, verás tu web cargando con HTTPS.

---

## Conclusión

El proceso no es complicado, pero tiene varias piezas que hay que encajar:

- Comprar el dominio en cualquier registrador.
- Configurar Route 53 y ACM en AWS.
- Delegar los NS al proveedor de AWS.
- Asociar el dominio a un servicio como CloudFront.

A partir de aquí ya puedes usar tu dominio para lo que quieras dentro de AWS: APIs, aplicaciones web, microservicios… lo que necesites.

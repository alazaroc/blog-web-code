---
layout: post
title: How to Buy a Domain and Migrate it to Amazon Route 53
date: 2025-11-27 09:30 +0200
last_modified_at:
lang: en
lang-exclusive:
  - en
  - es
description: Learn how to buy a domain anywhere and manage it in AWS with Amazon Route 53 step by step.
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
media_subpath: /assets/img/posts/2025-11-27-how-to-buy-a-domain-and-migrate-it-to-amazon-route-53/
image:
  path: 3-acm-request-public-certificate-b.png
  header_post: false
---

---

If you want to use your own domain with AWS services (websites, APIs, internal applications), you have three main options:

1. Buy it directly from AWS using **Amazon Route 53 Registered Domains**
2. Buy it from an external provider and **migrate it to AWS** to manage it from there
3. Buy it from an external provider and **keep DNS management outside AWS**, pointing records from the provider to your AWS resources

In this article we will focus on the second option, which is very useful when you find a good domain offer outside AWS but still want to manage DNS, certificates, and services from AWS.

In my case, I will use my own website [https://playingpadel.es](https://playingpadel.es){:target="\_blank"} as an example. I purchased the domain at `Hostalia` and then migrated it to AWS.

**What will you achieve by the end of this tutorial?**

- Your domain hosted in Amazon Route 53
- A valid TLS certificate in ACM
- Your domain working with HTTPS on an AWS service (in my case, CloudFront + S3)

Let’s go step by step 🚀

---

## 1. Buy a domain

First, register your domain with the provider of your choice.

I purchased `playingpadel.es` from **Hostalia** because I found a good offer, but you can do the same with any other provider (GoDaddy, Namecheap, Google Domains, etc.).

The price I paid:

- 0 EUR for the first year
- then 6.99 EUR per year

Once you buy the domain, you’ll be able to manage it from the provider’s administration page:

![hostalia gestion de dominios.png](1-hostalia-gestion-dominios.png)

> Tip: look for offers. Many domains are very cheap during the first year. In my case it was `FREE`!
> {: .prompt-tip }

---

## 2. Create the Hosted Zone in Amazon Route 53

Once you have your domain, it’s time to configure it in AWS:

1. Go to the Route **53 console** → _Hosted zones_.
2. Create a P**ublic hosted zone** with your domain name, for example:

   ```code
   playingpadel.es
   ```

3. Amazon Route 53 will give you **4 name servers (NS)**. You’ll use these later in your domain registrar.

![2-amazon-route53-dns.png](2-amazon-route53-dns.png)

---

## 3. Request a certificate in ACM

To use HTTPS you need a TLS certificate:

1. Open the **AWS Certificate Manager (ACM)** console.
2. Request a public certificate.
3. Add your two domain names:
   - `playingpadel.es`
   - `*.playingpadel.es` (wildcard for subdomains such as `www.playingpadel.es`, `app.playingpadel.es`, `api.playingpadel.es`, etc.)
4. Choose **DNS** validation.

> Note: if you’re going to use this certificate with **CloudFront**, you must request the ACM certificate in the **us-east-1 (N. Virginia) region.**
>
> For other services like ALB or Regional API Gateway, you can use different regions.
> {: .prompt-info }

![3-acm-request-public-certificate-a.png](3-acm-request-public-certificate-a.png){: width="500" }

![3-acm-request-public-certificate-b.png](3-acm-request-public-certificate-b.png){: width="500" }

ACM will generate a **CNAME** record that you must add to your Amazon Route 53 Hosted Zone. Once validated, your certificate will be ready.

---

## 4. Update the DNS servers in your registrar

This is the key step.

1. Open the administration panel of your domain (Hostalia, in my case).
2. Look for the option to update the **DNS servers (Name Servers)**.
3. Replace the existing values with the **4 NS from Amazon Route 53**.

![4-hostalia-cambiar-dns-a.png](4-hostalia-cambiar-dns-a.png)

> Important: don’t try to add these as DNS records inside your registrar’s DNS zone. You must update them in the domain configuration section called “Name Servers”.
> {: .prompt-warning }

![4-hostalia-cambiar-dns-b.png](4-hostalia-cambiar-dns-b.png){: width="500" }

![4-hostalia-dns-cambiado.png](4-hostalia-dns-cambiado.png){: width="600" }

⏳ Propagation may take **from a few minutes up to 24 to 48 hours**, depending on the provider and TTL values. In practice, it’s usually ready much sooner.

```bash
dig NS playingpadel.es
```

What matters is that the NS returned by the command match the ones in your Amazon Route 53 Hosted Zone. If you still see your provider’s NS, propagation hasn’t finished yet.

![4-validar-dns.png](4-validar-dns.png){: width="600" }

---

## 5. Associate the domain with your AWS service

Once propagation is complete, your domain now points to AWS 🎉.

To make everything work, you need two things:

- A CloudFront distribution configured with your domain and certificate.
- A Amazon Route 53 DNS record pointing to that distribution.

In my case, I used:

- **S3** → to host a static website
- **CloudFront** → as CDN and HTTPS entry point

### 5.1 Configure the domain in CloudFront

Inside your CloudFront distribution:

1. Select the ACM certificate you created earlier.
2. Add your domain as an Alternate domain name (CNAME).

![5-asociar-dominio-cloudfront-1.png](5-asociar-dominio-cloudfront-1.png){: width="650" }

![5-asociar-dominio-cloudfront-2.png](5-asociar-dominio-cloudfront-2.png){: width="650" }

![5-asociar-dominio-cloudfront-3.png](5-asociar-dominio-cloudfront-3.png){: width="650" }

![5-asociar-dominio-cloudfront-4.png](5-asociar-dominio-cloudfront-4.png){: width="650" }

### 5.2 Create the DNS record in Amazon Route 53

In your **Amazon Route 53 Hosted Zone**, create a record:

- Type: `A`
- Name: `playingpadel.es`
- Alias: `Yes`
- Target: your CloudFront distribution

If you also want to use www.playingpadel.es, create another record:

- Type: `CNAME` (or `A` alias)
- Name: `www`
- Target: the same CloudFront distribution

![6-crear-registro-route53.png](6-crear-registro-route53.png)

---

## 6. Test your domain

Finally, access your domain from a browser:

[https://playingpadel.es](https://playingpadel.es){:target="\_blank"}

If everything is correct, your site should load over HTTPS.

![7-probar-web.png](7-probar-web.png)

---

## Conclusion

Once you have your domain managed in Amazon Route 53 and a valid ACM certificate, connecting AWS services to your custom domain becomes very straightforward.

In this guide we used a static site in S3 and a CloudFront distribution, but you can reuse the same domain and certificate for many other services:

- APIs in API Gateway
- Applications behind an Application Load Balancer
- Internal microservices or private applications

The key point is that you now control the domain from AWS.

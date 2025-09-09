---
layout: post
title: How to Buy a Domain and Migrate it to AWS Route 53
date: 2025-09-09 09:30 +0200
last_modified_at:
lang: en
lang-exclusive:
- en
- es
description: Learn how to buy a domain anywhere and manage it in AWS with Route 53 step by step.
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

In this article, I’ll walk you through the full process of buying a domain from an external provider and migrating it to **Amazon Route 53** to manage it from AWS.

The goal is simple:

- Have full control of your domain from AWS.
- Issue TLS certificates with **AWS Certificate Manager (ACM)**.
- Associate the domain with any service, like a **CloudFront** in front of a static website hosted in S3.

Let’s go step by step 🚀

---

## 1. Buy a domain

The first step is to register your domain with the provider you prefer. In my case, I used **Hostalia** because I found a good price, but it could be GoDaddy, Namecheap, Google Domains, etc.

👉 Tip: look for offers, you can usually get the first year very cheap.

---

## 2. Create a Hosted Zone in Route 53

Once you own the domain, configure it in AWS:

1. Go to the **Route 53** console → *Hosted zones*.
2. Create a **Public hosted zone** with the name of your domain, for example:

    ```code
    playingpadel.es
    ```

3. Route 53 will give you **4 name servers (NS)**. You’ll use these later in your domain registrar.

---

## 3. Request a certificate in ACM

To use HTTPS you’ll need a TLS certificate:

1. Open the **AWS Certificate Manager (ACM)** console.
2. Request a public certificate.
3. Add two domain names:
   - `playingpadel.es`
   - `*.playingpadel.es` (wildcard for subdomains).
4. Choose validation via **DNS**.

ACM will generate a **CNAME record** that you must add to your Route 53 Hosted Zone. Once validated, your certificate will be ready to use.

---

## 4. Update the name servers in your registrar

This is the key step.

1. Go to your domain administration panel (Hostalia in my case).
2. Find the option to change **Name Servers (DNS servers)**.
3. Replace the existing values with the **4 NS from Route 53**.

⚠️ Important: don’t try to add them as records inside Hostalia’s DNS zone. You need to update the actual **domain name servers**.

⏳ Propagation usually takes between **24 and 48 hours**. You can check the status with:

```bash
dig NS playingpadel.es
```

---

## 5. Associate the domain with your AWS service

Once propagation is complete, your domain is pointing to AWS 🎉.

In my case I associated it with:

- **S3** → to host a static website.
- **CloudFront** → as CDN and HTTPS entry point.

In the CloudFront distribution, simply select the ACM certificate you created and add your domain as an *Alternate domain name (CNAME)*.

---

## 6. Test the domain

Finally, open your domain in a browser:

```code
https://playingpadel.es
```

If everything is configured correctly, your site should load over HTTPS.

---

## Conclusion

The process isn’t complex, but there are a few pieces to align:

- Buy the domain at any registrar.
- Configure Route 53 and ACM in AWS.
- Delegate the NS to AWS.
- Associate the domain with a service like CloudFront.

From here, you can use your domain for anything you want in AWS: APIs, web apps, microservices… you name it.

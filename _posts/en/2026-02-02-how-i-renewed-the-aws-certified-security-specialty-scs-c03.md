---
layout: post
title: How I renewed the AWS Certified Security Specialty (SCS-C03)
date: 2026-02-02 09:17 +0100
last_modified_at:
lang: en
lang-exclusive:
  - en
  - es
description: "I passed the AWS Certified Security Specialty (SCS-C03) and share how I renewed it: what changed (AI/GenAI), what I reviewed in the AWS Console, and why IAM is still the key to this exam."
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

I'm writing this post after passing the **AWS Certified Security Specialty (SCS-C03)**. I wanted to document what I did to prepare and why, in my opinion, it's one of the most useful AWS certifications.

![AWS Certified Security Specialty (SCS-C03)](security_certification.png)

I had already passed a previous version (SCS-C01) more than three years ago. Even though it had expired, you can still consider this a renewal. In practice, it doesn't really matter: it's the same exam, and the real goal is to get up to speed with the current exam content.

When I prepared it the first time, I wrote several AWS security posts, and for this renewal they were a great foundation and a great refresher. Some of them will be updated soon. I'm linking them here in case you want to go deeper on specific topics.

**Foundations and approach**:

- [Getting Started with AWS Security](https://www.playingaws.com/posts/getting-started-with-aws-security/){:target="_blank"}
- [How to Improve Your AWS Account Security](https://www.playingaws.com/posts/how-to-improve-your-account-security/){:target="_blank"}
- [Multi-Account Approach on AWS](https://www.playingaws.com/posts/multi-account-approach/){:target="_blank"}
- [AWS Control Tower: Deep Dive](https://www.playingaws.com/posts/aws-control-tower-deep-dive/){:target="_blank"}

**Services (deep dives)**:

- [AWS Security Hub: Deep Dive](https://www.playingaws.com/posts/aws-security-hub-deep-dive/){:target="_blank"}
- [Amazon GuardDuty: Deep Dive](https://www.playingaws.com/posts/amazon-guardduty-deep-dive/){:target="_blank"}
- [AWS WAF (Web Application Firewall): Deep Dive](https://www.playingaws.com/posts/aws-waf-web-application-firewall-deep-dive/){:target="_blank"}

**Open source for security reviews**:

- [AWS Open Source Tools for Security Assessments (Environment)](https://www.playingaws.com/posts/aws-open-source-tools-environment/){:target="_blank"}
- [Static Analysis of IaC on AWS (Checkov, KICS, etc.)](https://www.playingaws.com/posts/aws-open-source-tools-code/#3-analyze-iac-code-static-analysis){:target="_blank"}

And if you're interested in the method I follow to study for an AWS certification, I wrote about it here:

- [10 Steps to Prepare Any AWS Certification](https://www.playingaws.com/posts/10-steps-to-prepare-any-aws-certification/){:target="_blank"}

## Why this certification is worth it

> For me, this is the **second most important certification** after **Architect Professional**.
{: .prompt-tip }

Not because it magically "makes you more secure," but <kbd>because it forces you to review security best practices</kbd> that you'll apply in any architecture: identity, permissions, encryption, traceability, detection, and response. Once you internalize those, you **design better, operate better, and make fewer mistakes**.

In security, failures are often small details. This certification trains you on those details.

## The exam in 2 minutes

The basics:

- Duration: **170 minutes**
- Questions: **65**
- Type: multiple choice and multiple response (long, scenario-heavy questions)
- Price: **300 USD**
- Validity: **3 years**

Official page:

- [AWS Certified Security - Specialty](https://aws.amazon.com/certification/certified-security-specialty/){:target="_blank"}

About scoring:

- The score ranges from 100 to 1000, and the passing score is 750.
- **AWS includes 15 unscored questions** (they're not identified as such).

> Take the time seriously. This isn't an exam you can rush. The questions are long and sometimes complex.
{: .prompt-tip }

## SCS-C03: the new version of the exam

When I saw the new **SCS-C03** version, what worried me the most was the inclusion of **AI and GenAI** topics. Not because it doesn't make sense (it was inevitable), but because this part was new to me.

The official exam guide lists these services in scope:

- Amazon Bedrock
- Amazon Q (Business and Developer)
- SageMaker AI
- CodeGuru Security

I treated it as "security for AI services," mainly from the angle of:

- permissions and access control (IAM)
- data protection and data access
- traceability and auditing (what gets logged and where)

And now the key data point, in case you're renewing and feeling the same way I did:  
**in my exam I only got 1 AI-related question**, and it was about **permissions in Amazon Q Developer**. Nothing else. The rest of the exam felt very similar to previous versions.

> My takeaway: don't ignore AI, but don't obsess over it either. IAM is still the headline, and it shows up everywhere.
{: .prompt-tip }

### Domain changes

Structurally, SCS-C03 clearly separates **Detection** and **Incident Response** (they were more mixed before). And the old "Security Logging and Monitoring" domain no longer appears as a standalone block: it's now integrated into Detection and connected to response.

Official domain weights (as shown in the Exam Guide):

| Domain                              | Weight |
| ----------------------------------- | ------ |
| Detection                           | 16%    |
| Incident Response                   | 14%    |
| Infrastructure Security             | 18%    |
| Identity and Access Management      | 20%    |
| Data Protection                     | 18%    |
| Security Foundations and Governance | 14%    |

## How I prepared

My preparation was very direct and very hands-on, but it wasn't only the console.

What I did:

1. **Used the AWS Console to refresh key services and options** (my favorite part, because it helps me ground the theory)
2. **A Udemy course** (I only reviewed the PDF/course summary)
3. **I didn't do practice exam questions**. This isn't the usual approach and I wouldn't recommend it in general, but in my case I knew the material well and relied on real experience.

It worked for me, but be careful about copying this strategy without context: what makes the difference here is practice and experience, because the questions are scenario-based and full of nuances.

## My review path (and why this order)

This was the order I followed:

1. **Foundations and Governance**
2. **IAM**
3. **Data Protection**
4. **Detection**
5. **Incident Response**
6. **Infrastructure Security**

Why:

- I started with the basics: the Security Pillar of the AWS Well-Architected Framework.
- **IAM was the star of the exam**, without a doubt. It's the area with the most nuances, and where it's easiest to fail because of a small detail.
- Data Protection is tightly linked to IAM (KMS, S3, Secrets) and also has plenty of traps.
- I reviewed **Detection** and **Incident Response** back-to-back, because mentally they're connected: you detect and understand first, then you respond. This is where most AWS security services show up.
- I left **Infrastructure Security** for the end as a more general review.

## What I reviewed in the AWS Console (my checklist)

This is not a step-by-step guide. It's my "open the service and review the key parts" list that helped me refresh.

### Foundations and Governance

- The Security Pillar in the AWS Well-Architected Framework
- Organizations: governance at scale
- Artifact/Audit Manager: audits and evidence

### IAM

- Policies: common conditions, explicit denies, evaluation order
- Roles: trust policies, cross-account, AssumeRole patterns
- IAM Access Analyzer: unintended exposures caused by policies
- IAM Identity Center: permission sets and account assignments

### Data Protection

- KMS: key policy vs IAM policy, grants, rotation, usage vs admin permissions
- Secrets Manager: rotation, resource policy, read permissions
- S3: Block Public Access, bucket policy, conditions (TLS, org, endpoints), SSE-S3 vs SSE-KMS

### Detection

- CloudTrail and CloudTrail Lake: critical events and traceability
- AWS Config: rules, conformance packs, drift
- Security Hub: centralize security findings (standards, controls, findings)
- GuardDuty: threat detection from signals like CloudTrail, VPC Flow Logs, and DNS logs
- Inspector: automated assessments (for example, EC2, ECR, and Lambda)
- Detective: investigation and correlation based on signals
- Macie: sensitive data findings
- Security Lake: concept, OCSF, and how it fits into detection

### Incident Response

- Systems Manager: Session Manager and Run Command as containment tools
- Detective: investigation and signal pivoting
- EventBridge/SNS: basic response automation patterns

### Infrastructure Security

- VPC endpoints: private connectivity to services
- Security Groups and NACLs: differences and typical use cases
- Network Firewall: where it fits and what it solves
- WAF: managed rules, rate-based, logging
- Shield: when it makes sense

## Conclusions

If you're renewing, my summary would be:

- **IAM is the priority**. It's the area where it's easiest to make mistakes due to nuances, and where you'll see the most questions.
- The console is an excellent way to refresh quickly, and it helps complement real experience and ground concepts.
- In my case, the "AI fear" was bigger than the exam reality: I only got 1 question, and it was about permissions in Amazon Q Developer.

If you're starting from zero, I recommend adding a course and practice questions. And if you're renewing with experience, a focused and intense console review session can give you a lot of speed.

> If I had to pick just one security resource to review, it would be the **Security Pillar of the AWS Well-Architected Framework** (not for the exam, but for general knowledge).
{: .prompt-tip }

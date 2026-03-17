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

> For me, this is the **second most important certification** after **AWS Certified Solutions Architect - Professional**.
{: .prompt-tip }

Not because it magically "makes you more secure," but because it forces you to review security best practices that you'll apply in any architecture: identity, permissions, encryption, traceability, detection, and response. Once you internalize those, you **design better, operate better, and make fewer mistakes**.

The **SCS-C03** exam covers six domains that together represent the full security lifecycle on AWS: from governance and identity, through data protection and infrastructure hardening, to detection and incident response. What makes this certification genuinely useful is that these domains are not isolated: a misconfigured AWS Identity and Access Management (IAM) policy can affect data protection, detection, and incident response all at once. The exam trains you to think in that connected way.

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

When I saw the new **SCS-C03** version, what worried me the most was the inclusion of **AI and Generative AI** topics. Not because it doesn't make sense (it was inevitable), but because this part was new to me.

The official exam guide lists these services in scope:

- Amazon Bedrock
- Amazon Q (Business and Developer)
- Amazon SageMaker AI
- Amazon CodeGuru Security

I treated it as "security for AI services," mainly from the angle of:

- permissions and access control (IAM)
- data protection and data access
- traceability and auditing (what gets logged and where)

For **Amazon Bedrock** specifically, the key security considerations are: which IAM principals can invoke foundation models, how to use resource-based policies to restrict model access, and how AWS CloudTrail logs API calls to Bedrock for auditability. For Amazon Q Developer, the main concern is permission scoping: what data sources it can access and under which IAM role context.

> **Amazon Q Developer vs. Kiro**: Amazon Q Developer as a service is still active. What changed is that the **Amazon Q Developer CLI** was rebranded to **Kiro CLI** in November 2025, and AWS separately launched **Kiro**, a new agentic IDE (currently in preview), built on VS Code. Kiro the IDE is a distinct product, not a replacement for Amazon Q Developer the service. So when the SCS-C03 exam guide lists "Amazon Q Developer," it refers to the AI assistant service, not the CLI or the IDE.
{: .prompt-info }

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

**IAM** being the heaviest domain at 20% is not a coincidence. Almost every security scenario on AWS starts or ends with a permissions question.

## How I prepared

My preparation was very direct and very hands-on, but it wasn't only the console.

What I did:

1. **Used the AWS Management Console to refresh key services and options** (my favorite part, because it helps me ground the theory)
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

- I started with the basics: the <kbd>Security Pillar of the AWS Well-Architected Framework</kbd>.
- **IAM was the star of the exam**, without a doubt. It's the area with the most nuances, and where it's easiest to fail because of a small detail.
- Data Protection is tightly linked to IAM (AWS Key Management Service (KMS), Amazon S3, AWS Secrets Manager) and also has plenty of traps.
- I reviewed **Detection** and **Incident Response** back-to-back, because mentally they're connected: you detect and understand first, then you respond. This is where most AWS security services show up.
- I left **Infrastructure Security** for the end as a more general review.

## What I reviewed in the AWS Console (my checklist)

This is not a step-by-step guide. It's my "open the service and review the key parts" list that helped me refresh.

### Foundations and Governance

- The Security Pillar in the AWS Well-Architected Framework
- AWS Organizations: governance at scale, Service Control Policies (SCPs), and how they interact with IAM policies. SCPs act as guardrails: they define the maximum permissions available to accounts in an organizational unit, but they don't grant permissions by themselves. An action requires both an SCP allow and an IAM allow to succeed.
- AWS Artifact and AWS Audit Manager: compliance reports, evidence collection, and audit automation

### IAM

IAM is the domain where most candidates lose points, and for good reason: the policy evaluation logic has several layers that are easy to confuse under exam pressure.

The evaluation order matters: an explicit deny always wins, regardless of any allow. After that, AWS checks for an allow in the applicable policies (identity-based, resource-based, SCPs, session policies). If no allow is found, the result is an implicit deny.

Key areas I reviewed:

- **Policies**: condition keys (`aws:SourceIp`, `aws:PrincipalOrgID`, `aws:RequestedRegion`), explicit denies, and the difference between identity-based and resource-based policies
- **Roles and cross-account access**: trust policies define *who* can assume a role; permission policies define *what* that role can do. For cross-account `AssumeRole`, both the trust policy on the role and the IAM policy on the calling principal must allow the action.
- **AWS IAM Access Analyzer**: identifies resources shared with external principals by analyzing resource-based policies. It generates findings for S3 buckets, IAM roles, KMS keys, and other resources that are accessible outside the account or organization.
- **AWS IAM Identity Center (formerly AWS Single Sign-On)**: permission sets are IAM policies attached to an assignment of a user/group to an account. Understanding how permission sets propagate across accounts in AWS Organizations is a common exam topic.

### Data Protection

- **AWS Key Management Service (KMS)**: the most important distinction here is between the key policy and IAM policies. The key policy is the primary access control mechanism for a KMS key. Even if an IAM policy grants `kms:Decrypt`, if the key policy doesn't allow it, the call will be denied. Key grants are used for temporary, programmatic delegation of key usage. Key rotation (automatic, annual) applies only to AWS-managed keys and customer-managed keys with rotation enabled.
- **AWS Secrets Manager**: automatic rotation uses an AWS Lambda function that calls the target service API. The resource policy on a secret controls cross-account access. Understanding the difference between `secretsmanager:GetSecretValue` (read the secret) and `secretsmanager:DescribeSecret` (read metadata) is relevant for least-privilege designs.
- **Amazon S3**: Block Public Access settings operate at the account and bucket level and override any bucket or object ACL that would otherwise grant public access. Bucket policies can enforce conditions like `aws:SecureTransport` (require HTTPS), `aws:SourceVpc` (restrict to a VPC), or `aws:PrincipalOrgID` (restrict to the organization). Server-side encryption options: SSE-S3 (AWS-managed keys, no additional cost), SSE-KMS (customer-managed keys, KMS API calls are logged in AWS CloudTrail, additional cost), and SSE-C (customer-provided keys).

### Detection

This is where the most services appear, and where understanding the data flow between them matters.

- **AWS CloudTrail and AWS CloudTrail Lake**: CloudTrail records API activity across the account. CloudTrail Lake allows you to run SQL-based queries directly on CloudTrail event data without exporting to S3 first. Management events (control plane) are logged by default; data events (S3 object-level, Lambda invocations) must be explicitly enabled.
- **AWS Config**: evaluates resource configurations against rules (managed or custom Lambda-based). Conformance packs bundle multiple rules and remediation actions. Config does not prevent changes; it detects drift and can trigger automated remediation via AWS Systems Manager Automation.
- **AWS Security Hub**: aggregates findings from multiple AWS services (Amazon GuardDuty, Amazon Inspector, AWS Config, Amazon Macie, AWS IAM Access Analyzer) and third-party tools using the AWS Security Finding Format (ASFF). Security standards (CIS AWS Foundations Benchmark, AWS Foundational Security Best Practices) run automated checks and generate findings with severity scores.
- **Amazon GuardDuty**: threat detection service that analyzes AWS CloudTrail management events, Amazon VPC Flow Logs, and DNS query logs to identify malicious or unauthorized behavior. Finding types are organized by threat purpose (Backdoor, CryptoCurrency, Trojan, UnauthorizedAccess, etc.), resource type, and detector. GuardDuty does not require agents and has no impact on workload performance.
- **Amazon Inspector**: automated vulnerability assessment for Amazon EC2 instances, container images in Amazon Elastic Container Registry (ECR), and AWS Lambda functions. It uses the Common Vulnerability Scoring System (CVSS) to prioritize findings and integrates with AWS Security Hub.
- **Amazon Detective**: uses machine learning and graph analysis to help investigate security findings. It ingests data from Amazon GuardDuty, AWS CloudTrail, and Amazon VPC Flow Logs to build a behavior graph. Useful for pivoting from a GuardDuty finding to understand the full scope of an incident.
- **Amazon Macie**: uses machine learning to discover and classify sensitive data in Amazon S3. It identifies personally identifiable information (PII), financial data, and credentials. Findings integrate with AWS Security Hub.
- **Amazon Security Lake**: centralizes security data from AWS services and third-party sources into a dedicated S3-based data lake. It normalizes data using the Open Cybersecurity Schema Framework (OCSF), making it easier to query across sources with tools like Amazon Athena.

### Incident Response

- **AWS Systems Manager**: AWS Systems Manager Session Manager provides browser-based shell access to EC2 instances without opening inbound ports or managing SSH keys. AWS Systems Manager Run Command allows executing scripts across a fleet of instances. Both are key containment tools: you can isolate an instance by modifying its security group and then use Session Manager to investigate without needing a bastion host.
- **Amazon Detective**: investigation and signal pivoting from GuardDuty findings
- **Amazon EventBridge and Amazon Simple Notification Service (SNS)**: basic response automation patterns. A common pattern is: GuardDuty finding → EventBridge rule → Lambda function → remediation action (e.g., isolate instance, revoke credentials). SNS is used for notification fanout.

### Infrastructure Security

- **Amazon VPC endpoints**: interface endpoints (powered by AWS PrivateLink) and gateway endpoints (for Amazon S3 and Amazon DynamoDB) allow private connectivity to AWS services without traversing the public internet. VPC endpoint policies control which actions and resources are accessible through the endpoint.
- **Security Groups and Network Access Control Lists (NACLs)**: Security Groups are stateful (return traffic is automatically allowed), operate at the instance level, and support allow rules only. NACLs are stateless (return traffic must be explicitly allowed), operate at the subnet level, and support both allow and deny rules. NACLs are evaluated in rule number order; the first matching rule applies.
- **AWS Network Firewall**: stateful, managed network firewall deployed within a VPC. Supports Suricata-compatible rules for deep packet inspection. Positioned between the internet gateway and application subnets for north-south traffic inspection, or between subnets for east-west.
- **AWS WAF (Web Application Firewall)**: protects Amazon CloudFront, Application Load Balancer, Amazon API Gateway, and AWS AppSync. Web ACLs contain rules and rule groups (managed by AWS or third parties). Rate-based rules limit requests per IP. Logging can be sent to Amazon Kinesis Data Firehose, Amazon S3, or Amazon CloudWatch Logs.
- **AWS Shield**: AWS Shield Standard is automatically enabled for all AWS customers at no cost and protects against common network and transport layer DDoS attacks. AWS Shield Advanced provides enhanced detection, 24/7 access to the AWS DDoS Response Team (DRT), and cost protection for scaling during attacks.

## Conclusions

If you're renewing, my summary would be:

- **IAM is the priority**. It's the area where it's easiest to make mistakes due to nuances, and where you'll see the most questions.
- The console is an excellent way to refresh quickly, and it helps complement real experience and ground concepts.
- In my case, the "AI fear" was bigger than the exam reality: I only got 1 question, and it was about permissions in Amazon Q Developer.

If you're starting from zero, I recommend adding a course and practice questions. And if you're renewing with experience, a focused and intense console review session can give you a lot of speed.

> If I had to pick just one security resource to review, it would be the **Security Pillar of the AWS Well-Architected Framework** (not for the exam, but for general knowledge).
{: .prompt-tip }

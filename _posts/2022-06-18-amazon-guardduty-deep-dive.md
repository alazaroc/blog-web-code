---
layout: post
title: 'Amazon GuardDuty: Deep dive'
date: 2022-06-19 15:30 +0200
last_modified_at:
description: Amazon GuardDuty is one of the most important security services on AWS. This post contains everything you need to know about the service.
category:
- Security
tags:
- security
- guardduty
- deep-dive
- level-300
level: 300
published: true
pin: false
featured_post: false
comments: true
sitemap: true
img_path: /assets/img/posts/2022-06-18-amazon-guardduty-deep-dive/
---
---

## Introduction

Amazon GuardDuty is a **continuous security monitoring service** that analyzes and processes the following data sources:

- AWS CloudTrail management event logs,
- AWS CloudTrail data events for S3,
- DNS logs,
- EKS audit logs,
- and VPC flow logs.

It uses **threat intelligence** feeds, such as lists of malicious IP addresses and domains, and machine learning to identify unexpected and potentially unauthorized and malicious activity within your AWS environment.

> Enabling this service is a MUST and a quick win to improve your security posture. With one-click Amazon GuardDuty reduces risk using intelligent and continuous threat detection of your AWS accounts, data, and workloads.
{: .prompt-tip }

### Getting started

> GuardDuty is a Regional service, meaning any of the configuration procedures you follow must be repeated in each region that you want to monitor with GuardDuty.
**AWS highly recommend that you enable GuardDuty in all supported AWS Regions**. This enables GuardDuty to generate findings about unauthorized or unusual activity even in Regions that you are not actively using.
{: .prompt-info }

The first step to using GuardDuty is to enable it in your account. Once enabled, GuardDuty will immediately begin to monitor for security threats in the current region.

### Multi-account environment

When you use GuardDuty with <kbd>AWS Organizations</kbd>, you can designate any account within the organization to be the GuardDuty delegated administrator. Only the organization management account can designate GuardDuty delegated administrators.

An account that is designated as a delegated administrator becomes a GuardDuty administrator account has GuardDuty automatically enabled in the designated Region and is granted permission to enable and manage GuardDuty for all accounts in the organization within that Region.

[More information](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html){:target="_blank"}

### Standalone account environment

Enable GuardDuty is a one-click action:

![enable-guardduty](guardduty-enable-service.png){:class="border"}

### Estimating costs

Pricing (USD), Per account, per month, per Region

| AWS CloudTrail Management Event Analysis     |  |
| --- | --- |
| Per one million events / month  | $4.00 per one million events |

| AWS CloudTrail S3 Data Event Analysis  |  |
| --- | --- |
| First 500 million events / month  | $0.80 per one million events |
| Next 4,500 million events / month | $0.40 per one million events |
| Over 5,500 million events / month | $0.20 per one million events |

| Amazon EKS Audit Logs  |  |
| --- | --- |
| There is no data in the official page | There is no data in the official page |

| VPC Flow Log and DNS Query Log Analysis   |  |
| --- | --- |
| First 500 GB / month  | $1.00 per GB |
| Next 2,000 GB / month | $0.50 per GB |
| Next 7,500 GB / month | $0.25 per GB |
| Over 10,000 GB / month | $0.15 per GB |

You can use the GuardDuty console and API operations to estimate how much GuardDuty will cost you. During the 30-day free trial period, the cost estimation projects what your estimated costs will be after the free trial period.

![cost-estimation](guardduty-usage.png){:class="border"}

[More information](https://aws.amazon.com/guardduty/pricing/){:target="_blank"}

---

## Hands-on with Amazon GuardDuty

### Sample findings

GuardDuty supports generating sample findings with placeholder values, which can be used **to test GuardDuty functionality** and familiarize yourself with findings before needing to respond to a real security issue discovered by GuardDuty.

![enable-guardduty-sample-findings](guardduty-sample-findings-1.png){:class="border"}

These are the generated GuardDuty findings:

![guardduty-findings](guardduty-sample-findings-2.png){:class="border"}

### Filtering findings

We can filter the results by many criteria using the filter bar or we can filter using the colored buttons in the upper right section.

![guardduty-filter](guardduty-filter.png){:class="border"}

You could also save your custom filters and using later.

### Suppression rules

If you are receiving findings for expected behavior in your environment, you can **automatically archive findings** based on criteria you define with suppression rules. Suppression rules are rules that automatically send matched findings to `archive`.

![guardduty-suppression-filter](guardduty-suppression-filter.png){:class="border"}

There are some cases where it is desirable to use suppression rules, to facilitate the recognition of security threats with the greatest impact on your environment:

- low-value findings
- false-positive findings
- threats you do not intend to act on

> **Suppressed findings are not sent** to AWS Security Hub, Amazon S3, Detective, or CloudWatch, reducing finding noise level if you consume GuardDuty findings via Security Hub, a third-party SIEM, or other alerting and ticketing applications.
{: .prompt-warning }

[More information about suppression rules](https://docs.aws.amazon.com/guardduty/latest/ug/findings_suppression-rule.html){:target="_blank"}

### Finding information

Select a finding from the table to view its details. In the finding details pane you can see all the information associated with the finding:

![guardduty-finding-information](guardduty-finding-information.png){:class="border"}

It contains the information related to the finding: overview section, resource affected, action, actor and additional information.

Amazon GuardDuty integrates with Amazon Detective and if you click on the `Investigate with Detective` link you can view more information and the links to the Detective service to investigate it.

![guardduty-investigate-detective](guardduty-investigate-detective.png){:class="border"}

[More information about finding details](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings-summary.html?icmpid=docs_gd_help_panel){:target="_blank"}

### Custom responses with EventBridge

GuardDuty creates an event for EventBridge when any change in findings takes place (newly generated findings or newly aggregated findings).

By using EventBridge events with GuardDuty, you can automate tasks to help you respond to security issues revealed by GuardDuty findings.

[More information](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_cloudwatch.html){:target="_blank"}

### Subscribing to Amazon SNS GuardDuty announcements

An Amazon SNS topic is created by GuardDuty (you cannot view it from the SNS console) and you can subscribe to receive notifications about newly released finding types, updates to the existing finding types, and other functionality changes.

[More information about how to do it](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_sns.html?icmpid=docs_console_unmapped){:target="_blank"}

### Remediating security issues

These are the recommended actions to remediate these scenarios.

#### Remediating a compromised EC2 instance

This is the information found in the official AWS documentation:

1. Investigate the potentially compromised instance for malware and remove any discovered malware
2. If you are unable to identify and stop unauthorized activity on your EC2 instance, AWS recommends that you terminate the compromised EC2 instance and replace it with a new instance as needed

However, I think that this is more appropriate for dealing with compromised EC2 instances:

1. Lock the instance down
2. Take the EBS snapshot
3. Perform a memory dump
4. Perform Forensic Analysis
5. Terminate the instance

#### Remediating a compromised S3 Bucket

1. Identify the affected S3 resource
2. Identify the source of the suspicious activity and the API call used
3. Determine whether the call source was authorized to access the identified resource. If the access was authorized, you can ignore the finding

#### Remediating compromised AWS credentials

1. Identify the affected IAM entity and the API call used
2. Review permissions for the IAM entity
3. Determine whether the IAM entity credentials were used legitimately. If you confirm that the activity is a legitimate use of the AWS credentials, you can ignore the GuardDuty finding

#### Remediating Kubernetes security issues discovered by GuardDuty

[More information](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html){:target="_blank"}

---

## Good to know

- Regional service
- **30 days free trial** when you enable it the first time, and during the free trial GuardDuty provides an estimate of what the spend would be, so you can assess your spending beyond the free trial.
- All findings are stored in GuardDuty for **90 days**. GuardDuty recommends setting up findings export, which allows you to export your findings to an S3 bucket for indefinite storage.
- The events are delivered to EventBridge in near-real-time and on a best-effort basis.
- Amazon GuardDuty consumes CloudTrail management and S3 data events directly from CloudTrail through an independent and duplicative stream of events (no additional cost)
- **Global events** in CloudTrail (IAM, AWS Security Token Service, Amazon S3, Amazon CloudFront, and Route 53) are delivered to any trail that includes global services and are **logged as occurring in the US East (N. Virginia) Region**.
- When you enable GuardDuty, it immediately starts analyzing your VPC flow logs data. It consumes VPC flow log events directly from the VPC flow logs feature through an independent and duplicative stream of flow logs, so Flow logs for VPCs do not need to be turned on to generate findings.
- All findings are dynamic, meaning that, if GuardDuty detects new activity related to the same security issue it will update the original finding with the new information, instead of generating a new finding
- Finding types (4): EC2, IAM, S3 and Kubernetes. The official documentation has a full explanation about each category and each finding inside, you can find it [here](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-active.html){:target="_blank"}
- GuardDuty lists allow you to customize the publicly routable IP addresses that GuardDuty generates findings for. You can create a `Trusted IP list` and a `Threat list`.

---

## More information about GuardDuty

- [Official documentation](https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html){:target>>="_blank"}
- [Amazon GuardDuty Workshop](https://hands-on-guardduty.awssecworkshops.com/){:target>>="_blank"}

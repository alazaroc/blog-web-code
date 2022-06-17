---
layout: post
title: 'AWS Security Hub: Deep dive'
date: 2022-06-17 23:20 +0200
last_modified_at:
description: AWS Security Hub is one of the most important security services on AWS. This post contains everything you need to know about the service.
category:
- Security
tags:
- security
- security hub
- deep dive
published: true
pin: false
featured_post: false
comments: false
sitemap: true
---
---

## Introduction

AWS Security Hub is a cloud security posture management service that performs **automated continuous security best practice checks** against your AWS resources, aggregates your security alerts (i.e. findings), and enables automated remediation.

Security Hub enables you to understand your overall security posture via a **consolidated security score** across all of your AWS accounts, and automatically assesses the security of your AWS accounts resources via the security standards available:

- AWS Foundational Security Best Practices
- CIS AWS Foundations Benchmark
- PCI DSS

> Enable this service is a MUST and a quick win to improve your security posture. Just for enabling some Security standards you will receive security alerts (findings).
{: .prompt-tip }

---

### How it works

To maintain a **complete view** of your security posture in AWS, you need to **integrate multiple tools and services** including

- Threat detections from <kbd>Amazon GuardDuty</kbd>,
- vulnerabilities scan from <kbd>Amazon Inspector</kbd>,
- publicly accessible and cross-account resources from <kbd>IAM Access Analyzer</kbd>,
- sensitive data classifications from <kbd>Amazon Macie</kbd>,
- resources lacking WAF coverage from <kbd>AWS Firewall Manager</kbd>,
- resource configuration issues from <kbd>AWS Config</kbd>,
- and <kbd>AWS Partner Network Products</kbd>.

![how-it-works](/assets/img/posts/2022-06-04-aws-security-hub-deep-dive/security-Hub_How-it-works.png){:class="border"}

[More information](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-get-started.html){:target="_blank"}

---

### Getting started

Getting started with Security Hub requires just a few clicks from the Management Console to begin aggregating findings and conducting security checks.

![security-hub-1](/assets/img/posts/2022-06-04-aws-security-hub-deep-dive/security-hub-1.png){:class="border"}

As you can view in the image, you have to enable AWS Config. You could download

![security-hub-2](/assets/img/posts/2022-06-04-aws-security-hub-deep-dive/security-hub-2.png){:class="border"}

After you enable a security standard, AWS Security Hub begins to run all checks within two hours.

![security-hub-3](/assets/img/posts/2022-06-04-aws-security-hub-deep-dive/security-hub-3.png){:class="border"}

> It can take up to 24 hours for the Security standards pane to populate when you turn on the service. If you don't see scores yet, check back later.
{: .prompt-info }

---

### Price

Pricing (USD), Per account, per month, per Region

#### Security checks

| First 100,000     | $0.0010/check |
| 100,001 – 500,000 | $0.0008/check |
| 500,001 +         | $0.0005/check |

#### Finding ingestion events

Includes ingestion of updates to existing findings.

Finding ingestions for Security Hub security checks is free.

| First 10,000 | Free             |
| 10,001 +     | $0.00003/finding |

Inside the Security Hub service, in the usage tab of Settings, you can find your monthly estimation:

![cost-estimation](/assets/img/posts/2022-06-04-aws-security-hub-deep-dive/security-hub-cost-estimation.png){:class="border"}

---

### Good to know

- Regional service
- **30 days free trial** when you enable it the first time, and during the free trial Security Hub provides an estimate of what the spend would be, so you can assess your spending beyond the free trial.
- All findings are stored in Security Hub for **90 days** after the last update date
- **Periodic checks run automatically within 12 hours** after the most recent run. You cannot change the periodicity.
- **Change-triggered checks run when the associated resource changes state**. Even if the resource does not change state, the updated time for change-triggered checks is refreshed **every 18 hours**.
- After control statuses are generated for the first time, Security Hub **updates the control status every 24 hours** based on the findings from the previous 24 hours
- Security Hub processes the findings using a standard findings format called the **AWS Security Finding Format** (ASFF), which eliminates the need for time-consuming data conversion efforts. With the ASFF, **all of Security Hub’s integration partners** (including both AWS services and external partners) **send their findings to Security Hub in a well-typed JSON format** consisting of over 1,000 available fields. This means that all of your security findings are normalized before they are ingested into Security Hub, and you don’t need to do any parsing and normalization yourself. The findings identify resources, severities, and timestamps consistently so that you can more easily search and take action on them.
- The events are delivered to EventBridge in near-real-time and on a guaranteed basis
- When you enabled a security standard, AWS Config rules are created automatically (and you cannot delete them)
- You can create Custom Findings with AWS Config Rules and send them to Security Hub with EventBridge

---

## Cross-Account and Region aggregation

- You can **connect multiple AWS accounts** and consolidate findings across those accounts with a few clicks in the AWS Security Hub console.
- You can also **designate an aggregator Region** and link some or all Regions to that aggregator Region to give you a centralized view of all your findings across all your accounts and all your linked Regions.

Interesting article in AWS Security Blog: [Best practices for cross-Region aggregation of security findings](https://aws.amazon.com/blogs/security/best-practices-for-cross-region-aggregation-of-security-findings/){:target="_blank"}. Best practices mentioned:

- Enable cross-Region aggregation
- Consolidating downstream SIEM and ticketing integrations
- Auto-archive GuardDuty findings associated with global resources
- Reduce AWS Config cost by recording global resources in one Region
- Disable AWS Security Hub AWS Foundational Best Practices periodic controls associated with global resources
- Implement automatic remediation from a central Region

You also can show your AWS Security Hub findings in a view of data to enable decision-makers to assess the health and status of an organization's IT infrastructure at a glance. This article contains [how to do it](https://aws.amazon.com/blogs/security/how-to-build-a-multi-region-aws-security-hub-analytic-pipeline/){:target="_blank"}.

---

## Disable controls

> When you enable a standard, all the controls for that standard are enabled by default. You can then disable and enable specific controls within an enabled standard.
{: .prompt-info }

However, there are several reasons you may choose to disable controls:

- Controls for unused services
- Controls using global resources
- Controls with compensating controls

It can be useful to turn off security checks for controls that are not relevant to your environment. Disabling irrelevant controls reduces the number of irrelevant findings. It also removes the failed check from the security score for the associated standard.

When you disable a control, the following occurs:

- The check for the control is no longer performed.
- No additional findings are generated for that control.
- Existing findings are archived automatically after three to five days (note that this is the best effort and not guaranteed).
- The related AWS Config rules that Security Hub created are removed.

> Remember that Security Hub is Regional. When you disable or enable a control, it is disabled only in the current Region or in the Region that you specify in the API request.
{: .prompt-warning }

This is the fastest way to disable one control, with the CLI:

```console
aws securityhub update-standards-control --standards-control-arn "arn:aws:securityhub:eu-west-1:1234567890:control/aws-foundational-security-best-practices/v/1.0.0/GuardDuty.1" --control-status "DISABLED" --disabled-reason "testing functionality"
```

In the following links you will have more information about how to do it deeply, how to do it in a multi-account environment (several options), and more information relevant!

- [How to disable controls](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-enable-disable-controls.html){:target="_blank"}
- [How to disable in a multi account environment](https://aws.amazon.com/blogs/security/disabling-security-hub-controls-in-a-multi-account-environment/){:target="_blank"}
- [AWS Foundational Best Practices controls that you might want to disable](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-fsbp-to-disable.html){:target="_blank"}
- [how to Create Auto-Suppression Rules in AWS Security Hub](https://github.com/aws-samples/aws-security-hub-automatic-suppression-rules){:target="_blank"}

---

## Integrations

Security Hub provides the ability to integrate security findings from AWS services and third-party products.

> For AWS services Security Hub automatically enables the integration, and you can optionally disable each integration. For third-party products Security Hub gives you the ability to selectively enable the integrations and provides a link to the configuration instructions related to the third-party product.
{: .prompt-info }

Some examples about custom integrations:

- [Integrate with Jira Service Management](https://aws.amazon.com/blogs/security/how-to-set-up-a-two-way-integration-between-aws-security-hub-and-jira-service-management/){:target="_blank"}.
- [Code Security Hub to Slack](https://github.com/aws-samples/aws-securityhub-to-slack){:target="_blank"}.
- [Summary email](https://github.com/aws-samples/aws-security-hub-summary-email){:target="_blank"}.

---

## Automated response, remediation, and enrichment actions

You can create custom automated response, remediation, and enrichment workflows using Security Hub’s integration with Amazon EventBridge. All Security Hub findings are automatically sent to EventBridge, and you can create EventBridge rules that have AWS Lambda functions, AWS Step Function functions, or AWS Systems Manager Automation runbooks as their targets.

Security Hub also supports [sending findings to EventBridge on-demand via custom actions](https://aws.amazon.$$com/blogs/apn/how-to-enable-custom-actions-in-aws-security-hub/){:target="_blank"}, so that you can have an analyst decide when to trigger an automated response or remediation action.

The Security Hub [Automated Response and Remediation (SHARR) solution](https://aws.amazon.com/solutions/implementations/aws-security-hub-automated-response-and-remediation/?did=sl_card&trk=sl_card){:target="_blank"} provides you with pre-packaged EventBridge rules for you to deploy via AWS CloudFormation.

![Sharr](/assets/img/posts/2022-06-04-aws-security-hub-deep-dive/sharr.png){:class="border"}

More info about automated response and remediation [here](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cloudwatch-events.html){:target="_blank"}

---

## Next Steps

- [Security Hub Workshop](https://catalog.us-east-1.prod.workshops.aws/workshops/adccbda9-ceaf-47a8-843b-cf231281b635/en-US/#overview){:target>>="_blank"}
- [Automatically resolve findings for resources that no longer exists](https://aws.amazon.com/blogs/security/automatically-resolve-security-hub-findings-for-resources-that-no-longer-exist/){:target="_blank"}
- [Enrich findings with account metadata](https://aws.amazon.com/blogs/security/how-to-enrich-aws-security-hub-findings-with-account-metadata/){:target="_blank"}
- [Correlate findings](https://aws.amazon.com/blogs/security/correlate-security-findings-with-aws-security-hub-and-amazon-eventbridge/){:target="_blank"}

---

## Comment this post

> I have temporarily added the comments section to the post here. In the future, I will add it in a better way and include all the validated comments (I guess that I will have to make a filter to avoid spam)
{: .prompt-info }

{% include comment-form.html %}
{% include comment-form.js %}
{% include forms.css %}

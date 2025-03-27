---
layout: post
title: 'AWS Security Hub: Deep dive'
date: 2022-06-17 23:20 +0200
last_modified_at:
lang: en
lang-exclusive: ['en']
description: AWS Security Hub is one of the most important security services on AWS. This post contains everything you need to know about the service.
category:
- Security
tags:
- security
- security-hub
- deep-dive
- level-300
level: 300
published: true
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2022-06-04-aws-security-hub-deep-dive/
image:
  path: security-hub-icon.png
  header_post: false
---
---

## Introduction

AWS Security Hub is a cloud security posture management service that:

- reduces effort to collect and prioritize findings
- performs **automatic security checks** against best practices and standards
- **aggregates your security alerts** in a consolidated view of findings across accounts and providers
- **enables automated remediation**

Security Hub enables you to understand your overall security posture via a **consolidated security score** across all of your AWS accounts, and automatically assesses the security of your AWS account's resources via the security standards available:

- AWS Foundational Security Best Practices
- CIS AWS Foundations Benchmark
- PCI DSS

> Enabling this service **is a must** and a quick win to improve your security posture: just by enabling some security standard you will receive security alerts (findings), and the service will aggregate your security alerts automatically.
{: .prompt-tip }

> Before you can enable Security Hub standards and controls, you must first enable resource recording in AWS Config. You must enable resource recording for all of the accounts and in all Regions where you plan to do it.
{: .prompt-warning }

### How it works

To maintain a **complete view** of your security posture on AWS, you need to **integrate multiple tools and services** including

- Threat detections from <kbd>Amazon GuardDuty</kbd>,
- vulnerabilities scan from <kbd>Amazon Inspector</kbd>,
- publicly accessible and cross-account resources from <kbd>IAM Access Analyzer</kbd>,
- sensitive data classifications from <kbd>Amazon Macie</kbd>,
- resources lacking WAF coverage from <kbd>AWS Firewall Manager</kbd>,
- resource configuration issues from <kbd>AWS Config</kbd>,
- and <kbd>AWS Partner Network Products</kbd>.

![how-it-works](security-Hub_How-it-works.png){:class="border"}

[More information](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-get-started.html){:target="_blank"}

### Getting started

Whether an account needs to enable AWS Security Hub manually depends on how the accounts are managed.

#### Multi-account environment

If you use the integration with <kbd>AWS Organizations</kbd>:

- The organization management account chooses a Security Hub administrator account. Security Hub is enabled automatically for the chosen account. See Designating a Security Hub **administrator account**.
- The Security Hub administrator account enables organization accounts as **member accounts**. Those organization accounts also have Security Hub enabled automatically. See Managing member accounts that belong to an organization.
- The only organization account for which Security Hub is not enabled automatically is the **organization management account**. The organization management account does not need to enable Security Hub before it designates the Security Hub administrator account. The organization management account must enable Security Hub before it is enabled as a member account.

#### Standalone account environment

> Accounts that are not managed using the AWS Organizations integration must enable Security Hub **manually**.
{: .prompt-info }

To start using AWS Security Hub, it only takes a few clicks from the Management Console to start adding findings and performing security checks.

![security-hub-1](security-hub-1.png){:class="border"}

As you can see in the image, you only need to check the Security Standard you want to enable and then enable de service. Additionally, you can download a CloudFormation template to deploy it as StackSet.

![security-hub-2](security-hub-2.png){:class="border"}

> After you enable a security standard, AWS Security Hub begins to run all checks within two hours but it can take up to 24 hours for the Security standards pane to populate
{: .prompt-info }
---

### Estimating costs

Pricing (USD), Per account, per month, per Region

| Security checks  |  |
| --- | --- |
| First 100,000     | $0.0010/check |
| 100,001 – 500,000 | $0.0008/check |
| 500,001 +         | $0.0005/check |

| Finding ingestion events |  |
| --- | --- |
| First 10,000 | Free             |
| 10,001 +     | $0.00003/finding |

It includes ingestion of updates to existing findings. Finding ingestions for Security Hub security checks is free.

Within the Security Hub service, under the <kbd>Settings Usage tab</kbd>, you can find your monthly estimate:

![cost-estimation](security-hub-cost-estimation.png){:class="border"}

---

## Hands-on with AWS Security Hub

### Summary

On the Summary page:

- Security standards show you your security score (total and by standard), and the resources with the most failed security checks
- Findings by Region summarize the number of active findings for each severity across Regions. The counts only include findings that have a workflow status of NEW or NOTIFIED.
- Insights: An AWS Security Hub insight is a collection of related findings. It identifies a security area that requires attention and intervention.

![security-hub-3](security-hub-3.png){:class="border"}

### Security Standards

This page shows you the 3 security standards and whether you have them enabled (with their security score) or not (you can enable them with a one-click action).

If you access one of them, you will be able to see more details about how many security controls are enabled, failed, passed, disabled... and a table with information about compliance status, severity, ID, title and Failed checks:

![security-standard-1](security-hub-security-standard-1.png){:class="border"}

### Findings

This page shows all the findings, the ones generated by AWS Security Hub with Security Standards and all the rest of the other tools and services.

In the following image, you can view Security Hub and GuardDuty findings:

![findings](security-hub-findings.png){:class="border"}

### Finding aggregation (cross-account & cross-region)

With finding aggregation, you can use a single aggregation account & Region to view and update findings from multiple linked accounts & Regions. Administrator accounts configure the aggregation. Security Hub replicates `findings` and finds updates for all of the member accounts in the linked Regions.

- You can **connect multiple AWS accounts** and consolidate findings across those accounts
  ![accounts-aggregation](security-hub-accounts-aggregation.png){:class="border"}
- You can also **designate an aggregator Region** and link some or all Regions to that aggregator Region to give you a centralized view of all your findings across all your accounts and all your linked Regions
  ![region-aggregation](security-hub-region-aggregation.png){:class="border"}

Interesting article in AWS Security Blog: [Best practices for cross-region aggregation of security findings](https://aws.amazon.com/blogs/security/best-practices-for-cross-region-aggregation-of-security-findings/){:target="_blank"}. Best practices mentioned:

- Enable cross-Region aggregation
- Consolidating downstream SIEM and ticketing integrations
- Auto-archive GuardDuty findings associated with global resources
- Reduce AWS Config cost by recording global resources in one Region
- Disable AWS Security Hub AWS Foundational Best Practices periodic controls associated with global resources
- Implement automatic remediation from a central Region

You also can show your AWS Security Hub findings in a view of data to enable decision-makers to assess the health and status of an organization's IT infrastructure at a glance. This article contains [how to do it](https://aws.amazon.com/blogs/security/how-to-build-a-multi-region-aws-security-hub-analytic-pipeline/){:target="_blank"}.

### Disable controls

> When you enable a standard, all the controls for that standard are enabled by default. You can then disable and enable specific controls within an enabled standard.
{: .prompt-info }

There are several reasons why you may choose to disable the controls:

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

With the AWS Console, you can easily disable a control. Access to a security standard:

![security-hub-disable-control-1](security-hub-disable-control-1.png){:class="border"}

And then:

![security-hub-disable-control-2](security-hub-disable-control-2.png){:class="border"}

In the following links, you will find more information on how to do it in depth, how to do it in a multi-account environment (several options), and more relevant information!

- [How to disable controls](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-enable-disable-controls.html){:target="_blank"}
- [How to disable in a multi-account environment](https://aws.amazon.com/blogs/security/disabling-security-hub-controls-in-a-multi-account-environment/){:target="_blank"}
- [AWS Foundational Best Practices controls that you might want to disable](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-fsbp-to-disable.html){:target="_blank"}
- [how to Create Auto-Suppression Rules in AWS Security Hub](https://github.com/aws-samples/aws-security-hub-automatic-suppression-rules){:target="_blank"}

### Integrations

Security Hub provides the ability to integrate security findings from AWS services and third-party products.

> For AWS services Security Hub automatically enables the integration, and you can optionally disable each integration. For third-party products Security Hub gives you the ability to selectively enable the integrations and provides a link to the configuration instructions related to the third-party product.
{: .prompt-info }

Some examples of custom integrations:

- [Integrate with Jira Service Management](https://aws.amazon.com/blogs/security/how-to-set-up-a-two-way-integration-between-aws-security-hub-and-jira-service-management/){:target="_blank"}
  - ![jira](integration-jira.png){:class="border"}
- [Integrate with Slack](https://github.com/aws-samples/aws-securityhub-to-slack){:target="_blank"}
  - ![slack](integration-slack.png){:class="border"}
- [Summary email](https://github.com/aws-samples/aws-security-hub-summary-email){:target="_blank"}

### Automated response, remediation, and enrichment actions

You can create custom automated response, remediation, and enrichment workflows using Security Hub's integration with Amazon EventBridge. All Security Hub findings are automatically sent to EventBridge, and you can create EventBridge rules that have AWS Lambda functions, AWS Step Function functions, or AWS Systems Manager Automation runbooks as their targets.

Security Hub also supports [sending findings to EventBridge on-demand via custom actions](https://aws.amazon.$$com/blogs/apn/how-to-enable-custom-actions-in-aws-security-hub/){:target="_blank"}, so that you can have an analyst decide when to trigger an automated response or remediation action.

The Security Hub [Automated Response and Remediation (SHARR) solution](https://aws.amazon.com/solutions/implementations/aws-security-hub-automated-response-and-remediation/?did=sl_card&trk=sl_card){:target="_blank"} provides you with pre-packaged EventBridge rules for you to deploy via AWS CloudFormation.

![Sharr](sharr.png){:class="border"}

More info about automated response and remediation [here](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cloudwatch-events.html){:target="_blank"}

---

## Good to know

- Regional service. You must enable it in all the regions you want to review.
- **30 days free trial** when you enable it the first time, and during the free trial Security Hub provides an estimate of what the spend would be, so you can assess your spending beyond the free trial.
- All findings are stored in the Security Hub for **90 days** after the last update date
- **Periodic checks run automatically within 12 hours** after the most recent run. You cannot change the periodicity.
- **Change-triggered checks run when the associated resource changes state**. Even if the resource does not change state, the updated time for change-triggered checks is refreshed **every 18 hours**.
- After control statuses are generated for the first time, Security Hub **updates the control status every 24 hours** based on the findings from the previous 24 hours
- Security Hub processes the findings using a standard findings format called the **AWS Security Finding Format** (ASFF), which eliminates the need for time-consuming data conversion efforts. With the ASFF, **all of Security Hub's integration partners** (including both AWS services and external partners) **send their findings to Security Hub in a well-typed JSON format** consisting of over 1,000 available fields. This means that all of your security findings are normalized before they are ingested into Security Hub, and you don't need to do any parsing and normalization yourself. The findings identify resources, severities, and timestamps consistently so that you can more easily search and take action on them.
- The events are delivered to EventBridge in near-real-time and on a guaranteed basis
- When you enable a security standard, AWS Config rules are created automatically (and you cannot delete them)
- You can create Custom Findings with AWS Config Rules and send them to Security Hub with EventBridge

---

## More information about Security Hub

- [AWS official documentation](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html){:target="_blank"}
- [Security Hub Workshop](https://catalog.us-east-1.prod.workshops.aws/workshops/adccbda9-ceaf-47a8-843b-cf231281b635/en-US/#overview){:target="_blank"}
- [Automatically resolve findings for resources that no longer exist](https://aws.amazon.com/blogs/security/automatically-resolve-security-hub-findings-for-resources-that-no-longer-exist/){:target="_blank"}
- [Enrich findings with account metadata](https://aws.amazon.com/blogs/security/how-to-enrich-aws-security-hub-findings-with-account-metadata/){:target="_blank"}
- [Correlate findings](https://aws.amazon.com/blogs/security/correlate-security-findings-with-aws-security-hub-and-amazon-eventbridge/){:target="_blank"}

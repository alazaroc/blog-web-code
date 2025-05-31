---
layout: post
title: AWS Control Tower Deep Dive (2/2)
date: 2022-10-09 00:30 +0200
last_modified_at:
lang: en
lang-exclusive: ['en']
description: Second article about the multi-account approach and specifically about AWS Control Tower where we will review all options.
category:
- Multi-account
tags:
- multi-account
- deep-dive
- control-tower
- level-300
level: 300
published: true
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2022-10-09-aws-control-tower-deep-dive/
image:
  path: control-tower-icon.png
  header_post: false
---
---

> This article is part of a series about `AWS multi-account`.
>
> 1/2: [Getting started with AWS Multi-account approach](/posts/multi-account-approach/)
>
> 2/2: **AWS Control Tower Deep Dive**
>
{: .prompt-tip }

## 1. Introduction

In this article, we will continue adding new AWS accounts to our multi-account approach and review all options in the AWS Control Tower service.

Once the creation of the landing zone by the AWS Control Tower is completed, it has the following organizational structure:

![organization.png](organization.png){:class="border"}

Now, we will review all the options available in AWS Control Tower.

## 2. Single Sign-On

We have more than one account and need/want a central place to access all accounts. Fortunately, AWS Control Tower provides us with a default configuration of the AWS Single Sign-On solution (**IAM Identity Center**, previously named AWS SSO).

> IAM Identity Center expands the capabilities of AWS Identity and Access Management (IAM) to provide a central place that brings together the administration of users and their access to AWS accounts and cloud applications.

The default configuration used as `identity source` is _Identity Center directory_, that is, an internal directory where we can add users directly to give them access to the organization.

### 2.1. Settings

This is the default configuration:

![identity-center-settings](identity-center-settings.png){:class="border"}

> You can update the identity source of the **IAM Identity Center** configuration to use your Active Directory or an external identity provider.
{: .prompt-tip }

### 2.2. Users

By default, only the email used for the root account is included as a user, but you need to confirm it and set a new password. This is a new user different from the root user of the AWS management account.

![identity-center-users](identity-center-users.png){:class="border"}

To add a new user with this configuration the following information is mandatory:

- Username (required for this user to sign in to the AWS access portal. The username can't be changed later.)
- Email address
- First name
- Last name
- Display name (typically the full name of the workforce user, is searchable, and appears in the user's list)

### 2.3. Groups

By default, the following groups are created:

- AWSAccountFactory: Read-only access to account factory in AWS Service Catalog for end users
- AWSSecurityAuditors: Read-only access to all accounts for security audits
- AWSSecurityAuditPowerUsers: Power user access to all accounts for security audits
- AWSServiceCatalogAdmins: Admin rights to account factory in AWS Service Catalog
- AWSControlTowerAdmins: Admin rights to AWS Control Tower core and provisioned accounts
- AWSLogArchiveAdmins: Admin rights to log archive account
- AWSAuditAccountAdmins: Admin rights to cross-account audit account
- AWSLogArchiveViewers: Read-only access to log archive account

### 2.4. Using SSO

You will access through one link similar to this "<https://xxxxxxxxxxxxx.awsapps.com/start>" and you will access to this portal:

![sso-1](sso-1.png){:class="border"}

When you successfully log in, you will see the following:

![sso-2](sso-2.png){:class="border"}

Clicking on the AWS account menu (number) will display information about these accounts:

![sso-3](sso-3.png){:class="border"}

## 3. New Organizational Units (OUs)

Creating a new Organizational Unit (OU) is very easy from the AWS Control Tower or AWS Organizations.

- From AWS Control Tower: automatically will be registered in Control Tower service
    ![new-ou-control-tower-1](new-ou-control-tower-1.png){:class="border"}
    ![new-ou-control-tower-2](new-ou-control-tower-2.png){:class="border"}

- From AWS Organizations: you need to register the OU in Control Tower
    ![new-ou-organizations-1](new-ou-organizations-1.png){:class="border"}
    ![new-ou-organizations-2](new-ou-organizations-2.png){:class="border"}
    ![new-ou-organizations-3](new-ou-organizations-3.png){:class="border"}
    ![new-ou-organizations-4](new-ou-organizations-4.png){:class="border"}
    ![new-ou-organizations-5](new-ou-organizations-5.png){:class="border"}

> So, if you are using AWS Control Tower, better use it instead of AWS Organizations to create new OUs (Organizational Units) or AWS accounts.
{: .prompt-tip }

## 4. Account Factory

> With the account factory you can provision new accounts and enrols existing accounts, and you can standardize your account and network configurations for creating multiple accounts.

You can update the AWS Control Tower service to the Network configuration to define how VPCs will be created. When you save the changes, the defined configurations will be published to **AWS Service Catalog** as a product.

To deploy new AWS accounts with Account Factory you have 2 options:

1. Use the product in the AWS Service Catalog:

    ![service-catalog-1](service-catalog-1.png){:class="border"}
    ![service-catalog-2](service-catalog-2.png){:class="border"}

2. Use <kbd>Create accounts</kbd> in the Account Factory feature of AWS Control Tower

    ![factory-account-new-account](factory-account-new-account.png){:class="border"}

In both cases, the mandatory fields are:

- Account email
- Display Name
- Identity Center user email
- IAM Identity Center user name
- Organizational unit

Also, in both cases, the Service Catalog is used behind the scenes.

More information:

- [Automate the creation of multiple accounts with Control Tower](https://aws.amazon.com/blogs/mt/how-to-automate-the-creation-of-multiple-accounts-in-aws-control-tower/){:target="_blank"}

## 5. Guardrails (Controls)

AWS Control Tower applies high-level rules, called guardrails, that help enforce your policies using service control policies (SCPs), and detect policy violations using AWS Config rules.

> 07 May 2023: AWS Control Tower has updated recently the controls.
{: .prompt-warning }

AWS Control Tower has now 358 controls (governance rules for your AWS environment) in 3 different categories of `guidance`.

- **Mandatory**: always enforced
  - **20 preventive** guardrails to enforce policies
  - **3 detective** to detect configuration violations
- **Strongly recommended**: designed to enforce some common best practices for well-architected, multi-account environments.
  - Example: _Detect whether public write access to Amazon S3 buckets is allowed_
- **Elective**: enables you to track or lock down actions that are commonly restricted in an AWS enterprise environment.

Now, is also important distinct the controls by `behaviour`:

- Proactive
  - These controls only are available if you deploy `CloudFormation templates` in the accounts and Regions where the control has been activated.
  - It is implemented through AWS CloudFormation hooks and guard rules, and enforced through the deployment of a CloudFormation template. A guard rule is a policy-as-code rule that expresses the compliance requirements for an AWS resource. Hooks proactively inspects these resource configurations by comparing AWS resources against the guard rule, before the resources are provisioned.
- Detective
  - These controls are owned by `AWS Security Hub` or `AWS Control Tower` and implemented using `AWS Config rules`
  - Controls owned by AWS Security Hub are not aggregated in the compliance status of accounts and OUs in AWS Control Tower
- Preventive
  - These controls are implemented with `Service control policy (SCP)`.
  - When activated, preventive controls are enforced at the OU level.

> I recommend to enable these controls in all the OUs:
> All: [Disallow actions as a root user](https://us-east-1.console.aws.amazon.com/controltower/home/controls/AWS-GR_RESTRICT_ROOT_USER?region=us-east-1){:target="_blank"}
>
> - Control objective: Enforce least privilege
> - Guidance: Strongly recommended
> - Behaviour: Preventive
>
> All: [Disallow creation of access keys for the root user](https://us-east-1.console.aws.amazon.com/controltower/home/controls/AWS-GR_RESTRICT_ROOT_USER_ACCESS_KEYS?region=us-east-1){:target="_blank"}
>
> - Control objective: Enforce least privilege
> - Guidance: Strongly recommended
> - Behaviour: Preventive
>
> If possible: [Deny access to AWS based on the requested AWS Region](https://us-east-1.console.aws.amazon.com/controltower/home/controls/AWS-GR_REGION_DENY?region=us-east-1){:target="_blank"}
>
> - Control objective: Protect configurations
> - Guidance: Elective
> - Behaviour: Preventive
{: .prompt-info }

So, there are 23 mandatory guardrails, but there many others that you can enable. To enable one of them you select, click on <kbd>Enable control on OU</kbd> and then select one of them.

![controls-enable](controls-enable.png){:class="border"}

![controls-status](controls-status.png){:class="border"}

![controls-dashboard](controls-dashboard.png){:class="border"}

## 6. Infrastructure as Code (IaC)

There are at least 2 solutions to define using `Infrastructure as Code` (IaC) your AWS resources or SCPs and deploy it on each account (new or existing).

- Customizations for Control Tower (CfCT): use CloudFormation
- Use the Terraform module of Control Tower Account Factory for Terraform

### 6.1. Customizations for Control Tower (CfCT)

> [Here](<https://docs.aws.amazon.com/controltower/latest/userguide/cfct-overview.html>){:target="_blank"} is the official documentation about CfCT and [here](https://github.com/aws-solutions/aws-control-tower-customizations/blob/main/customizations-for-aws-control-tower.template){:target="_blank"} is the public template that you need to install in the CloudFormation service.
{: .prompt-info }

Customizations for AWS Control Tower (CfCT) helps you customize your AWS Control Tower landing zone and stay aligned with AWS best practices. Customizations are implemented with AWS CloudFormation templates and service control policies (SCPs).

Deploying CfCT builds the following environment in the AWS Cloud:

![cfct-architecture-diagram](customizations-for-aws-control-tower-architecture-diagram.png){:class="border"}

CfCT deploys two workflows:

- an AWS CodePipeline workflow (executed when changes appear)
- an AWS Control Tower lifecycle event workflow (executed when a new account is launched)

The `customizations-for-aws-control-tower.template` deploys the following:

- An AWS CodeBuild project
- An AWS CodePipeline project
- An Amazon EventBridge rule
- AWS Lambda functions
- An Amazon Simple Queue Service queue
- An Amazon Simple Storage Service bucket with a sample configuration package
- AWS Step Functions

To deploy CfCT:

- Step 1: Launch the stack in CloudFormation [here](https://github.com/aws-solutions/aws-control-tower-customizations/blob/main/customizations-for-aws-control-tower.template){:target="_blank"}. You can choose S3 or CodeCommit as the source
- Step 2: connect to the source and perform some changes (CodePipeline will be deployed automatically when you upload the new changes)
  - ![cfct-1](cfct-1.png){:class="border"}
  - ![cfct-2](cfct-2.png){:class="border"}
  - ![cfct-3](cfct-3.png){:class="border"}

### 6.2. Manage AWS Accounts Using Control Tower Account Factory for Terraform

There is a Terraform solution that makes it easy to create and customize new accounts that comply with your organization's security guidelines.

[Here](https://learn.hashicorp.com/tutorials/terraform/aws-control-tower-aft){:target="_blank"} is the official link that explains how to do it step by step.

There are 5 repositories, one with the `AFT module deployment` and 4 additional required to define your account specifications. You will only run Terraform commands within the first repository, and AFT will execute the configuration in the account specification repositories:

1. `Account requests` – This repository handles placing or updating account requests.
2. `AFT account provisioning customizations` – This repository manages customizations that are applied to all accounts created by and managed with AFT, before beginning the global customizations stage.
3. `Global customizations` – This repository manages customizations that are applied to all accounts created by and managed with AFT.
4. `Account customizations` – This repository manages customizations that are applied only to specific accounts created by and managed with AFT.

AFT expects that each of these repositories follows a specific directory structure.

This is the architecture of the solution:

![aws-control-tower-aft](aws-control-tower-aft.png){:class="border"}
![high-level-aft-diagram](high-level-aft-diagram.png){:class="border"}

This is how it works:

1. Account requests are created and submitted to the pipeline. You can create and submit more than one account request at a time. Account Factory processes requests in a first-in-first-out order. For more information, see Submit multiple account requests.
2. Each account is provisioned. This stage runs in the AWS Control Tower management account.
3. Global customizations run in the pipelines that are created for each vended account.
4. If customizations are specified in the initial account provisioning requests, the customizations run only on targeted accounts. If you have an account that's already provisioned, you must initiate further customizations manually in the account's pipeline.

Related to the `cost``, there are no additional charges for AFT. You pay only for the resources deployed by AFT, the AWS services enabled by AFT, and the resources you deploy in your AFT environment.

> However, `be careful` if you want to use this option for your personal accounts. It is not a free option because the solution uses VPC endpoints and additional components for which you have to pay! I start using it to test purposes and at the end of the month `I had to pay more than $70` (just for have it deployed on my account...)
{: .prompt-warning }

### 6.3. Comparative of Customizations for Control Tower (CfCT) with Control Tower Account Factory for Terraform

| Feature / Aspect                         | Customizations for AWS Control Tower (CfCT)                                         | Control Tower Account Factory for Terraform (AFT)                                    |
|------------------------------------------|-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| **Purpose**                              | Customize AWS Control Tower's landing zone with additional policies and configurations. | Automate provisioning and management of AWS accounts using Terraform.               |
| **Flexibility**                          | High flexibility for AWS-specific customizations.                                   | High degree of automation and repeatability with Terraform.                         |
| **Integration with AWS Services**        | Tightly integrated with AWS native tools.                                           | Integrates with AWS, but relies on Terraform for setup and configuration.           |
| **Primary Use Case**                     | Ideal for organizations preferring AWS-native tools for cloud management.            | Suited for organizations using Terraform for infrastructure management.             |
| **Maintenance and Updates**              | Managed by AWS, ensuring up-to-date features and security practices.                | Requires maintenance of Terraform configurations in line with AWS updates.          |
| **Ease of Use**                          | More straightforward for teams familiar with AWS services.                          | Better for teams experienced with Terraform.                                        |
| **Tooling Requirement**                  | Relies on AWS-native tools and services.                                            | Requires understanding and use of Terraform.                                        |
| **Ideal for Organizations**              | Heavily invested in AWS ecosystem and prefer AWS tools for management.             | Already using Terraform and seeking to extend its capabilities to AWS management.   |

## 7. Top 5 customizations

These are the top 5 customizations in a multi-account approach:

1. Identity
   1. Identity providers
   2. IAM role and policy
   3. Service Control Policy
2. Security and Compliance
   1. Security Tooling
   2. Encryption
3. Networking
   1. AWS Transit Gateway
   2. IP allocation
   3. Routing
   4. Security groups
4. Logging
   1. AWS CloudTrail (data events)
   2. VPC Flow logs
   3. Firewall logs
   4. Amazon CloudWatch logs
5. Control
   1. AWS Config rules
   2. Resource policy (Amazon S3, Amazon SNS, AWS KMS)
   3. Preconfigured conducts

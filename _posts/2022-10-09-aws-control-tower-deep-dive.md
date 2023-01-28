---
layout: post
title: AWS Control Tower Deep Dive
date: 2022-10-09 00:30 +0200
last_modified_at:
description: Second article about multi-account approach and specifically about AWS Control Tower where we will review all options.
category:
- Security
tags:
- multi-account
- deep dive
- security
published: true
pin: false
featured_post: false
comments: true
sitemap: true
img_path: /assets/img/posts/2022-10-09-aws-control-tower-deep-dive/
---
---

## Introduction

> This is the second article of AWS Control Tower and the AWS multi-account approach. [In the first article](/posts/multi-account-approach/){:target="_blank"} I had explained why you need a multi-account approach, what are the best practices and recommendations and how to create the landing zone using AWS Control Tower.
{: .prompt-warning }

In this article, we will continue to add new AWS accounts to our multi-account approach and review all options in the AWS Control Tower service.

Once the creation of the landing zone by the AWS control tower is completed, it will have the following organizational structure:

![organization.png](organization.png){:class="border"}

Now, we will review all the options available in AWS Control Tower.

## Single Sign-On

We have more than one account and need/want a central place to access all accounts. Fortunately, AWS Control Tower provides us with a default configuration of the AWS Single Sign-On solution (**IAM Identity Center**, previously named AWS SSO).

> IAM Identity Center expands the capabilities of AWS Identity and Access Management (IAM) to provide a central place that brings together administration of users and their access to AWS accounts and cloud applications.

The default configuration used as identity source is _Identity Center directory_, that is, an internal directory where we can add users directly to give them access to the organization.

### Settings

This is the default configuration:

![identity-center-settings](identity-center-settings.png){:class="border"}

> You can update the identity source of the **IAM Identity Center** configuration to use your Active Directory or an external identity provider.
{: .prompt-tip }

### Users

By default, only the email used for the root account is included as a user, but you need to confirm it and set a new password. This is a new user different from the root user of the AWS management account.

![identity-center-users](identity-center-users.png){:class="border"}

To add a new user with this configuration the following information is mandatory:

- Username (required for this user to sign in to the AWS access portal. The username can't be changed later.)
- Email address
- First name
- Last name
- Display name (typically the full name of the workforce user, is searchable, and appears in the user's list)

### Groups

By default, the following groups are created:

- AWSAccountFactory: Read-only access to account factory in AWS Service Catalog for end users
- AWSSecurityAuditors: Read-only access to all accounts for security audits
- AWSSecurityAuditPowerUsers: Power user access to all accounts for security audits
- AWSServiceCatalogAdmins: Admin rights to account factory in AWS Service Catalog
- AWSControlTowerAdmins: Admin rights to AWS Control Tower core and provisioned accounts
- AWSLogArchiveAdmins: Admin rights to log archive account
- AWSAuditAccountAdmins: Admin rights to cross-account audit account
- AWSLogArchiveViewers: Read-only access to log archive account

### Use of SSO

You will access through one link similar to this "https://xxxxxxxxxxxxx.awsapps.com/start" y you will access to this portal:

![sso-1](sso-1.png){:class="border"}

When you successfully log in, you will see the following:

![sso-2](sso-2.png){:class="border"}

Clicking on the AWS account menu (number) will display information about these accounts:

![sso-3](sso-3.png){:class="border"}

## New Organizational Units (OUs)

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

## Account Factory

> With the account factory you can provision new accounts and enroll existing accounts, and you can standardize your account and network configurations for creating multiple accounts.

You can update the AWS Control Tower service to the Network configuration to define how VPCs will be created. When you save the changes, the defined configurations will be published to **AWS Service Catalog** as a product.

To deploy new AWS accounts with Account Factory you have 2 options:

1. Use the product in AWS Service Catalog:

    ![service-catalog-1](service-catalog-1.png){:class="border"}
    ![service-catalog-2](service-catalog-2.png){:class="border"}

2. Use <kbd>Create accounts</kbd> in the Account Factory feature of AWS Control Tower

    ![factory-account-new-account](factory-account-new-account.png){:class="border"}

In both cases, the mandatory fields are:

- Account email
- Display name
- Identity Center user email
- IAM Identity Center user name
- Organizational unit

Also, in both cases, the Service Catalog is used behind the scenes.

More information:

- [Automate the creation of multiple accounts with Control Tower](https://aws.amazon.com/blogs/mt/how-to-automate-the-creation-of-multiple-accounts-in-aws-control-tower/){:target="_blank"}

## Guardrails

AWS Control Tower applies high-level rules, called guardrails, that help enforce your policies using service control policies (SCPs), and detect policy violations using AWS Config rules.

AWS Control Tower has 64 controls (governance rules for your AWS environment) in 3 different categories of guidance.

- **Mandatory**: always enforced
  - **20 preventive** guardrails to enforce policies
  - **3 detective** to detect configuration violations
- **Strongly recommended**: designed to enforce some common best practices for well-architected, multi-account environments.
  - Example: _Detect whether public write access to Amazon S3 buckets is allowed_
- **Elective**: enable you to track or lock down actions that are commonly restricted in an AWS enterprise environment.

### Enable controls

So, there are 23 mandatory guardrails, but there are 41 others that you can enable. To enable one of them you select, click on <kbd>Enable control on OU</kbd> and then select one of them.

![controls-enable](controls-enable.png){:class="border"}

![controls-status](controls-status.png){:class="border"}

![controls-dashboard](controls-dashboard.png){:class="border"}

## Infrastructure as Code (IaC)

There are at least 2 solutions to define as Infrastructure as Code (IaC) your AWS resources or SCPs and deploy it on each account (new or existing).

- Customizations for Control Tower (CfCT): use CloudFormation
- Use the Terraform module of Control Tower Account Factory for Terraform

### Customizations for Control Tower (CfCT)

> [Here](<https://docs.aws.amazon.com/controltower/latest/userguide/cfct-overview.html>){:target="_blank"} is the official documentation about CfCT and [here](https://github.com/aws-solutions/aws-control-tower-customizations/blob/main/customizations-for-aws-control-tower.template){:target="_blank"} is the public template that you need to install in the CloudFormation service.
{: .prompt-info }

Customizations for AWS Control Tower (CfCT) helps you customize your AWS Control Tower landing zone and stay aligned with AWS best practices. Customizations are implemented with AWS CloudFormation templates and service control policies (SCPs).

Deploying CfCT builds the following environment in the AWS Cloud.

![cfct-architecture-diagram](customizations-for-aws-control-tower-architecture-diagram.png){:class="border"}

CfCT deploys two workflows:

- an AWS CodePipeline workflow (executed when changes appear)
- an AWS Control Tower lifecycle event workflow (executed when a new account is launched)

To deploy CfCT:

- Step 1: Launch the stack in CloudFormation [here](https://github.com/aws-solutions/aws-control-tower-customizations/blob/main/customizations-for-aws-control-tower.template){:target="_blank"}. You can choose S3 or CodeCommit as source
- Step 2: connect to the source and perform some changes (CodePipeline will be deployed automatically when you upload the new changes)
  - ![cfct-1](cfct-1.png){:class="border"}
  - ![cfct-2](cfct-2.png){:class="border"}
  - ![cfct-3](cfct-3.png){:class="border"}

### Manage AWS Accounts Using Control Tower Account Factory for Terraform

There is a Terraform module that makes it easy to create and customize new accounts that comply with your organization's security guidelines.

[Here](https://learn.hashicorp.com/tutorials/terraform/aws-control-tower-aft){:target="_blank"} is the official link that explains how to do it step by step.

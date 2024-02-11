---
layout: post
title: Getting started with AWS Multi-account approach (1/2)
date: 2022-09-17 19:22 +0200
last_modified_at:
description: This is the first article related to the multi-account approach, and the first thing to review is to know when and why I need a multi-account solution.
category:
- Multi-account
tags:
- getting-started
- multi-account
- level-200
level: 200
published: true
pin: false
featured_post: false
comments: true
sitemap: true
img_path: /assets/img/posts/2022-07-18-multi-account-approach/
---
---

> This article is part of a series about `AWS multi-account`.
>
> 1/2: **Getting started with AWS Multi-account approach**
> 
> 2/2: [AWS Control Tower Deep Dive](/posts/aws-control-tower-deep-dive/){:target="_blank"}
> 
{: .prompt-tip }

## Introduction

This is the first article related to the multi-account approach, and the first thing to review is to know `when and why I need a multi-account solution`.

### When do you need a multi-account solution?

If you are using AWS for your personal projects and you have a simple solution without many resources, it is not worth it. Or maybe your solution is not so simple but you don't want to worry about the additional operational overhead to manage it. I understand it. This was exactly my case but in this article, I want to show you when, why and how to deploy a multi-account solution.

However, `in enterprise solutions, you should have a multi-account solution`, without a doubt, so you need to know about it.

Then, for me, it is very simple:

- Personal account with simple solution - not necessary multi-account solution
- Personal account with no simple solution or many workloads - depends on you
- Small enterprise solution - depends on you, but even if your company is small is a good idea to take advantage of the multi-account approach
- Medium/Big enterprise solution - mandatory

What AWS says?
> While you may begin your AWS journey with a single account, AWS recommends that you "*set up multiple accounts, as your workloads grow in size and complexity*". Extracted from [here](https://aws.amazon.com/organizations/getting-started/best-practices/?org_console){:target="_blank"}
>
> Also, "*If you have a single account today and either have production workloads in place or are considering deploying production workloads, we recommend that you transition to the use of multiple accounts so that you can gain the Benefits of using multiple AWS accounts.*" Extracted from [here](https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/single-aws-account.html){:target="_blank"}
{: .prompt-info }

### Why do you need a multi-account solution?

The main reason to do it is **isolation**. An AWS account serves as a resource container and the easiest way to isolate resources is by using different accounts.

There are many reasons to use isolations:

- Environment isolation (testing/production): Apply distinct security controls by environment
- Business units/workloads/applications/products isolation: Group workloads based on business purpose and ownership
- Functional team isolation
- Data isolation: Constrain access to sensitive data. This category includes data stores, which may be necessary because of legal restrictions

Some other advantages of a multi-account solution are:

- **to manage security** by using policy-based controls
- **to simplify billing** - You can use a tagging strategy and cost allocation tags to track your AWS costs on a detailed level in the same account but is much better to use multiple accounts to do the same.
- Promote innovation and agility

### The disadvantage of a multi-account solution

The main disadvantage if you want a multi-account solution is the `management` of all accounts (do it in the same way, create new accounts, duplicate efforts,... this is, mismanagement).

## Multi-account approach: AWS Organizations

AWS provides a resource to help you centrally manage and govern your environment: [AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html){:target="_blank"}

### Core concepts

- **Organization**: an entity to administer accounts as a single unit
- **Account**: standard AWS account that contains your AWS resources
- **Organizational Units (OUs)**: a container that helps you to organize your accounts into a hierarchy and makes it easier to apply management controls
- **Secure Control Policies (SCPs)**: policies are used to limit what the principals in member accounts can do

![aws-organizations-summary](aws-organizations-summary.png){:class="border"}

### Features / Advantages

- Free to use
- Centralized management of your AWS accounts
- Hierarchical grouping of your accounts (in Organizational Units - OUs)
- Access control (IAM Identity Center, successor to AWS Single Sign-On)
- Permission Management (apply Service Control Policies - SCPs)
- Consolidated billing for all member accounts
- Configure supported AWS services to perform actions in your organization.

### AWS Services integration

This is the full list of supported service integration with AWS Organizations service. I have included all the services because is important to know that AWS Organizations can help with many integrations and automatization in the new accounts.

- Amazon **Detective** (makes it easy to analyze, investigate, and quickly identify the root cause of potential security issues or suspicious activities)
- Amazon **DevOps Guru** (analyze operational data and identify behaviors that deviate from normal operating patterns)
- Amazon **GuardDuty** (help to identify unexpected and potentially unauthorized or malicious activity in your AWS environment)
- Amazon **Inspector** (automated vulnerability management service that continually scans Amazon EC2 and container workloads for software vulnerabilities and unintended network exposure)
- Amazon **Macie** (discover, classify, and help you protect your sensitive data in Amazon S3)
- Amazon **VPC IP Address Manager** (makes it easier for you to plan, track, and monitor IP addresses for your AWS workloads)
- Artifact (provides on-demand downloads of AWS security reports)
- AWS **Account Management** (allows you to programmatically modify your account information and metadata)
- AWS **Audit Manager** (helps you continuously audit your AWS usage)
- AWS **Backup** (set policies to enforce automatic backups)
- AWS **Control Tower** (straightforward way to set up and govern an AWS multi-account environment, following prescriptive best practices)
- AWS **Health** (visibility into your resource performance and the availability of your AWS services and accounts)
- AWS **Marketplace** - License Management
- AWS **Network Manager** (centrally manage your AWS Cloud WAN core network and your AWS Transit Gateway network)
- AWS **Trusted Advisor** (inspects your AWS environment and makes recommendations)
- **CloudFormation StackSets** (enables you to create, update, or delete stacks across multiple accounts and regions with a single operation)
- **CloudTrail** (enable governance, compliance, and operational and risk auditing of your AWS account)
- **Compute Optimizer** (recommends optimal AWS compute resources based on an analysis of the historical utilization metrics of your resources)
- **Config** (enables you to assess, audit, and evaluate the configurations of your AWS resources)
- **Directory Service** (share your AWS Managed Microsoft AD directories between other trusted AWS accounts in your organization)
- **Firewall Manager** (simplify AWS WAF administration and maintenance)
- **IAM Access Analyzer** (helps you set, verify, and refine permissions to grant the right fine-grained permissions)
- **License Manager** (brings software vendor licenses to the cloud)
- **RAM** (share AWS resources)
- **S3 Storage Lens** (aggregates your usage and activity metrics and displays the information in an interactive dashboard on the Amazon S3 console)
- **Security Hub** (provides you with a comprehensive view of the security state of your AWS resources)
- **Service Catalog** (enables you to create and manage catalogs of IT services that are approved for use on AWS)
- **Service Quotas** (enables you to view and manage your quotas from a central location)
- **Single Sign-On** (centrally provide and manage single sign-on access to all your AWS accounts)
- **Systems Manager** (enables visibility and control of your AWS resources)
- **Tag policies** (help you standardize tags across resources)
{: .prompt-info }

### Recommended organization structure (best practices)

> The following recommendations need to be adapted to each Organization. Each case is different and you have to think about how grouping accounts and how many OUs you need.
{: .prompt-warning }

AWS recommends that you start with the central services in mind:

- **Security**: Used for centralized security tooling and audit resources. Usually with at least 2 accounts (one for each of the mentioned purposes)
- **Infrastructure**: You can use this level to share infrastructure with the other accounts: i.e. networking and IT services

Once you have your foundational Organizational Units, is time to think about the environments, and separate SDLC (non-production) from production because usually have different requirements and you want each of them isolated. Although it can be a new OU categorization, is common to use it as a sub-categorization inside another OU level (for example Security and Infrastructure would have another 2 levels: SDLC and Prod).

> EDIT: **SDLC** (Software Development Life Cycle) is used here because this article is based in the AWS recommendations and they use it for the name of one OU to include all the non-productive environments, for example [here](https://aws.amazon.com/blogs/mt/best-practices-for-organizational-units-with-aws-organizations){:target="_blank"} and [here](https://aws.amazon.com/organizations/getting-started/best-practices){:target="_blank"}. Btw, I "introduce" the concept of SDLC when I explain how to add CI/CD to my CDK project in [this other article](/posts/how-to-add-ci-cd-to-my-cdk-project/){:target="_blank"}. Please, if you found some error there, please let me know!
{: .prompt-danger }

Now, we have to think about all the additional OUs that you need. AWS recommends creating OUs that directly relate to building or running your products or services:

- Sandbox
- Workloads
- Deployments
- Suspended
- Transitional
- Exceptions
- ...

![recommended-ous](aws-recommended-ous-best-practices.png){:class="border"}

More information in the official AWS links:

- <https://aws.amazon.com/organizations/getting-started/best-practices/?org_console>{:target="_blank"}
- <https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/recommended-ous-and-accounts.html>{:target="_blank"}
- [Best practices for management account and for member accounts](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_best-practices.html){:target="_blank"}
- [Basic organization](https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/basic-organization.html){:target="_blank"}

## Get Started with AWS Organizations

<kbd>AWS Organizations</kbd> is the service to helps us with central management for multiple AWS accounts.

To start you only need an AWS account, access to the AWS Organizations and then click "Create an organization":

![aws-organizations-step1.png](aws-organizations-step1.png){:class="border"}

When you do it, you can view the Organizational Structure of your Organization, and you will have in the left section of the screen the available options: send Invitations, configure supported services, enable policies, the Organization settings and a Get started option.

![aws-organizations-step2.png](aws-organizations-step2.png){:class="border"}

The `Get started` option is interesting as you can view the 4 steps to "Build your organization":

1. Create accounts or invite existing accounts
2. Organize your organization’s member accounts into OUs
3. Create policies
4. Enable AWS services that support AWS Organizations

Also, a simplified recommended organizational structure

![recommended-organization-structure](recommended-organization-structure.png){:class="border"}

So perfect, now we know how to create an AWS Organization, we can create the different OUs we need, we can create new Accounts and send them an invitation to join our organization, and then configure the enabled services and apply the policies.

Easy? Not really... you can do it all manually if you need heavy customization, but it seems necessary to apply automation for efficient governance and management, and probably we need help to set up our landing zone.

> A landing zone is a well-architected, multi-account AWS environment that is a starting point from which you can deploy workloads and applications.

Fortunately, AWS has another service to help us: <kbd>AWS Control Tower</kbd>.

## AWS Control Tower

> AWS Control Tower offers the easiest way to set up and govern a new, secure, compliant, multi-account AWS environment. It establishes a **landing zone**, which is a well-architected, multi-account environment based on best-practice blueprints, and enables governance using **guardrails** you can choose. Guardrails are SCPs and AWS Config rules that implement governance for security, compliance, and operations.
>
> **Q: What is the difference between AWS Control Tower and AWS Organizations?**
>
> AWS Control Tower offers an abstracted, automated, and prescriptive experience on top of AWS Organizations. It automatically sets up AWS Organizations as the underlying AWS service to organize accounts and implements preventive guardrails using SCPs. Control Tower and Organizations work well together. You can use Control Tower to set up your environment and set guardrails, then using AWS Organizations, you can further create custom policies (such as tag, backup or SCPs) that centrally control the use of AWS services and resources across multiple AWS accounts.
>
> [Extracted from the FAQS of AWS Organizations](https://aws.amazon.com/organizations/faqs/){:target="_blank"}
{: .prompt-info }

Now, we are going to create our Landing Zone using AWS Control Tower.

First, access the service and click on `Set up landing Zone`:

![aws-control-tower-1](aws-control-tower-1.png){:class="border"}

Then, review the first step, set the Home region, if you want to deny access to any Region in which AWS Control Tower is not available and your additional Region for governance:

![aws-control-tower-2](aws-control-tower-2.png){:class="border"}
![aws-control-tower-3](aws-control-tower-3.png){:class="border"}

Now set a name for the Foundational Organizational Unit (Security, with 2 accounts: log archive account and security audit account) and the Additional OU (Sandbox):

![aws-control-tower-4](aws-control-tower-4.png){:class="border"}

Then configure the shared accounts (Foundational OU - security), set an email associated with the new accounts and a name for these 2 accounts:

- Log archive: *The log archive account is a repository of immutable logs of API activities and resource configurations from all accounts.*
- Security audit: *The audit account is a restricted account. It allows your security and compliance teams to gain access to all accounts in the organization.*

![aws-control-tower-5](aws-control-tower-5.png){:class="border"}

Step 4 is to configure the CloudTrail and the encryption (disabled by default)
![aws-control-tower-6](aws-control-tower-6.png){:class="border"}

Finally, you need to review all the information and confirm. Next, a new screen will be shown with the progress of the creation of the landing zone. The estimated time is 60 minutes.

> This is the summary of what is being set up:
>
> - **2 organizational units**, one for your shared accounts and one for accounts that will be provisioned by your users
> - **2 new accounts**, for log archive and security audit
> - **A native cloud directory** with preconfigured groups and single sign-on access
> - **20 preventive guardrails** to enforce policies
>  **3 detective guardrails** to detect configuration violations
{: .prompt-info }

![aws-control-tower-7](aws-control-tower-7.png){:class="border"}

With a little patience, you will receive the confirmation that everything was ok, and the setup of the landing zone will be complete:

![aws-control-tower-8](aws-control-tower-8.png){:class="border"}

The new structure created is very simple:

![aws-control-tower-9](aws-control-tower-9.png){:class="border"}

And a new AWS Identity Center configuration (previously AWS SSO) has been configured for you and now you can access this portal to access all your AWS accounts:

![aws-control-tower-10](aws-control-tower-10.png){:class="border"}

### Clean up

To clean up the AWS Control Tower you need to decommission it and then wait until 2 hours to remove all resources.

![aws-control-tower-11](aws-control-tower-11.png){:class="border"}

## Next steps

- Next post: [AWS Control Tower Deep Dive](/posts/aws-control-tower-deep-dive/){:target="_blank"}
- Comment this post
- More information
  - [Practice: Workshop of multi-account security governance workshop](https://catalog.us-east-1.prod.workshops.aws/workshops/d3f60827-89f2-46a8-9be7-6e7185bd7665/en-US){:target>="_blank"}
  - [Practice: AWS Control Tower Immersion day](https://controltower.aws-management.tools/immersionday/){:target>="_blank"}
  - [Example of SCPs](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples.html#examples_general){:target>="_blank"}
  - [AWS blog article: migrate AWS Accounts to AWS Control Tower](https://aws.amazon.com/blogs/architecture/lets-architect-architecting-for-governance-and-management/){:target="_blank"}
  - [AWS blog article: Migrate resources between accounts](https://aws.amazon.com/blogs/architecture/migrate-resources-between-aws-accounts/){:target>="_blank"}
  - [Landing Zone accelerator on AWS](https://aws.amazon.com/solutions/implementations/landing-zone-accelerator-on-aws/){:target>="_blank"}
  - [Dependency checker to migrate between AWS Organizations](https://github.com/aws-samples/check-aws-resources-for-org-conditions){:target>="_blank"}

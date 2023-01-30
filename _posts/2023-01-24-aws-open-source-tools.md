---
layout: post
title: Getting started with AWS open-source tools
date: 2023-01-24 21:15 +0200
last_modified_at:
description: First article about the open-source tools that can help you to manage your AWS accounts.
category:
- General
tags:
- getting-started
- open-source
- github
published: true
pin: false
featured_post: true
comments: true
sitemap: true
img_path: /assets/img/posts/2023-01-24-aws-open-source-tools/

---
---

## Introduction

This is the first part of a series of articles about open source software and AWS, in which I will share those tools that I have tested and that I think you may find useful.

The complete series contains the following:

1. **Getting started**: main open source tools and extend AWS CLI (this article)
2. **Analyze your AWS environment**: focus on the inventory, analysis and security assessment of the AWS environment - [here](/posts/aws-open-source-tools-environment/):target="_blank"}
3. **How to help you with your code**: to generate it (IaC), validate it (policy as code and compliance) and analyze it (static analysis/credentials)

**What is open-source?**

The `Open Source Initiative` defines [here](https://opensource.org/osd){:target="_blank"} the following criteria for considering software as open source:

1. Free Redistribution
2. Source code must be accessible
3. The license must allow modifications and derived works
4. Integrity of The Author's Source Code
5. No Discrimination Against Persons or Groups
6. No Discrimination Against Fields of Endeavour
7. Distribution of License
8. License Must Not Be Specific to a Product
9. License Must Not Restrict Other Software
10. License Must Be Technology-Neutral

> <kbd>Open source</kbd> software is code designed to be accessible to the public: `anyone can view, modify and distribute the code` as they wish.
{: .prompt-info }

By the way, both terms are correct: open source and open-source. I could use them interchangeably in this article.

**What is the relationship with AWS?**

I'm sure you already know that there are many open-source projects related to AWS, too many. This is because AWS is very popular, but also because AWS is very committed to the open source community.

AWS claims that open source is good for everyone and regularly develops open source software and contributes to thousands of open-source communities on GitHub, Apache, and the Linux Foundation. More information can be found [here](https://aws.amazon.com/what-is/open-source/){:target="_blank"}

In this post, I will try to show you some open source projects, since you probably don't know all of them and you can surely start using some of them.

> So, let's start sharing public code!
{: .prompt-info }

## Main AWS open-source tools

Let's start with the most popular AWS open source projects.

You are probably already using some of them and did not realize they are open source. However, I am not going to explain them or give more information, I will just name them here:

- <kbd>AWS CLI</kbd>: Amazon Web Services Command Line Interface
  - [https://github.com/aws/aws-cli](https://github.com/aws/aws-cli){:target="_blank"}
- <kbd>CDK</kbd> (Cloud Development Kit): Define cloud infrastructure using familiar programming languages
  - [https://github.com/aws/aws-cdk](https://github.com/aws/aws-cdk){:target="_blank"}
- <kbd>SAM</kbd> (Serverless Application Model): Framework for building serverless applications
  - [https://github.com/aws/aws-sam-cli](https://github.com/aws/aws-sam-cli){:target="_blank"}
- <kbd>AWS Amplify</kbd>: framework and tools for developing mobile and web applications
  - [https://github.com/aws-amplify](https://github.com/aws-amplify){:target="_blank"}
- <kbd>EKS distro</kbd>: Certified Kubernetes distribution based on and used by Amazon Elastic Kubernetes Service (EKS) to create reliable and secure Kubernetes clusters
  -[https://github.com/aws/eks-distro](https://github.com/aws/eks-distro){:target="_blank"}
- <kbd>Karpenter</kbd>: node provisioning project built for Kubernetes
  - [https://github.com/aws/karpenter](https://github.com/aws/karpenter){:target="_blank"}
- <kbd>OpenSearch</kbd>: A community-driven, search and analytics suite derived from Apache 2.0 licensed Elasticsearch 7.10.2 & Kibana 7.10.2
  - [https://github.com/opensearch-project](https://github.com/opensearch-project){:target="_blank"}
- <kbd>Bottlerocket</kbd>: Linux-based operating system meant for hosting containers
  - [https://github.com/bottlerocket-os/bottlerocket](https://github.com/bottlerocket-os/bottlerocket){:target="_blank"}
- <kbd>Firecracker</kbd>: Virtual machine monitor (VMM) to create and manage microVMs. Firecracker powers the AWS Lambda service.
  - [https://firecracker-microvm.github.io/](https://firecracker-microvm.github.io/){:target="_blank"}

## Extend AWS CLI

My first idea was named this section `CLI tools` but all the open source tools listed here are CLI (Command Line Interface) tools, so this section is for the tools that you can use to improve/extend/replace your AWS CLI tool.

- Security
  - <kbd>aws-vault</kbd>: tool to `securely store and access AWS credentials` in a development environment
- Extend AWS CLI
  - <kbd>aws-shell</kbd>: interactive `productivity booster` for the AWS CLI
  - <kbd>awsls</kbd>: a `list command` for AWS resources
  - <kbd>steampipe</kbd>: Use `SQL to query cloud infrastructure`, SaaS, code, logs, and more
  - <kbd>ohmyzsh with the aws plugin</kbd>: provides completion support for AWS CLI and a few utilities to `manage AWS profiles and display them in the prompt`
- Logs
  - <kbd>awslogs</kbd>: a simple command line tool for `querying` groups, streams and events `from Amazon CloudWatch logs`

### aws-vault

`aws-vault` securely store and access AWS credentials in a development environment.

AWS Vault stores IAM credentials in your operating system's secure keystore and then generates temporary credentials from those to expose to your shell and applications. It's designed to be complementary to the AWS CLI tools, and is aware of your profiles and configuration in ~/.aws/config.

> **Why use it**: Complementary tool for AWS CLI tools, for secure your connections protecting your credentials.
>
> ![aws-vault](aws-vault.png){:class="border"}
>
> With the last command, the AWS Console will be open and you will be logged!
{: .prompt-info }

**Is it popular?** Yes, GitHub statistics: Watch 119; Fork 725; Stars 7.1k

**Recently updated?** Yes, 1096 commits, last 2 weeks ago

**URL**: [https://github.com/99designs/aws-vault](https://github.com/99designs/aws-vault){:target="_blank"}

> In my opinion, this tool is a must-have for securing your credentials.
{: .prompt-tip }

### aws-shell

The interactive productivity booster for the AWS CLI

> **Why use it**: AWS CLI is awesome but maybe you don't know the commands. With aws-shell, you have a helper and as you type you can visually see the available options:
>
> ![aws-shell](aws-shell.png){:class="border"}
{: .prompt-info }

**Is it popular?** Yes, GitHub statistics: Watch 230; Fork 755; Stars 6.8k

**Recently updated?** No, the project seems abandoned (last commit Oct 7, 2020). Total commits 235

**URL**: [https://github.com/awslabs/aws-shell](https://github.com/awslabs/aws-shell){:target="_blank"}

> The tool is not working with AWS CLI v2 ([here](https://github.com/awslabs/aws-shell/issues/238){:target="_blank"} is the official `Issue` in github), and the project seems to have been abandoned (last commit July 10, 2020).
>
> However, if you use v1, the tool is worth it because it contains all the core AWS services.
{: .prompt-warning }

### awsls

A list command for AWS resources. More than 100 AWS resource supported. The goal is to code-generate a list function for every AWS resource that is covered by the Terraform AWS Provider (currently over 500)

> **Why use it**: If you want to search for resources across multiple regions and/or accounts and filter by any value using `GREP`, this is the tool for you!
>
> ![awsls](awsls.png){:class="border"}
{: .prompt-info }

**Is it popular?** Yes, GitHub statistics: Watch 10; Fork 51; Stars 763

**Recently updated?** No, one year from the last update (Feb 13, 2022), with 91 commits in total.

**URL**: [https://github.com/jckuester/awsls](https://github.com/jckuester/awsls){:target="_blank"}

> Although it has not been updated recently, it is worth using for its ability to search multiple accounts and filter using the GREP command.
{: .prompt-warning }

### steampipe

Steampipe is the universal interface to APIs. Use SQL to query cloud infrastructure, SaaS, code, logs, and more.

> **Why use it**: Using SQL you can query AWS resources, perform join queries (same account, several accounts, between different sources), and you have a helper to perform the queries. All in one!
>
> ![steampipe-1](steampipe-1.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On github: Watch 32; Fork 171; Stars 4.6k

**Recently updated?** Yes, last commit 2 days ago. Total commits 2007

**URL**: [https://github.com/turbot/steampipe](https://github.com/turbot/steampipe){:target="_blank"}

More information (querying aws resources):

- [https://steampipe.io/docs/query/overview](https://steampipe.io/docs/query/overview){:target="_blank"}
- [https://aws.amazon.com/blogs/opensource/querying-aws-at-scale-across-apis-regions-and-accounts/](https://aws.amazon.com/blogs/opensource/querying-aws-at-scale-across-apis-regions-and-accounts/){:target="_blank"}

> I like this tool! If I want to get specific information in AWS using a CLI tool this is my first choice to do so, I recommend you to try it!
{: .prompt-tip }

### awslogs

awslogs is a simple command line tool for querying groups, streams and events from Amazon CloudWatch logs.

> **Why use it**: If you want to review your logs with console this is your tool. You can filter start/end and also using GREP! An example:
>
> ![awslogs](awslogs.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On github: Watch 61; Fork 326; Stars 4.5k

**Recently updated?** No, the project seems to have been abandoned. The last commit was July 10, 2020. Total commits 326

**URL**: [https://github.com/jorgebastida/awslogs](https://github.com/jorgebastida/awslogs){:target="_blank"}

> The tool is not updated but if you want to query the CloudWatch logs, this is your tool!
{: .prompt-warning }

### ohmyzsh with the aws plugin

If you are using ohmyzsh (framework for managing your zsh configuration), you can add this `aws` plugin to extend your CLI.

This plugin provides completion support for AWS CLI and a few utilities to manage AWS profiles and display them in the prompt.

> **Why use it**: Useful if you are using different profiles and ohmyzsh.
>
> ![ohmyzsh-aws](ohmyzsh-aws.png){:class="border"}

**Is it popular?**: `ohmyzsh` is a very popular framework for `zsh` (155k stars), and the `AWS plugin` is part of this framework.

**Recently updated?** Yes. The aws plugin was updated 2 weeks ago

**URL**: [https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/aws](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/aws){:target="_blank"}

## Next steps

As I said in the introduction, there are 2 more articles in this series of open source tools:

- **Analyze your AWS environment**: focus on the inventory, analysis and security assessment of the AWS environment - [here](/posts/aws-open-source-tools-environment/):target="_blank"}
- **How to help you with your code**: to generate it (IaC), validate it (policy as code and compliance) and analyze it (static analysis/credentials)

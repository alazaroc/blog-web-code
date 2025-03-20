---
layout: post
title: 'How open-source tools help you with your code (3/3)'
date: 2023-02-11 15:41 +0100
last_modified_at:
lang: en
lang-exclusive: ['en']
description: This final article in a series explores open-source tools for AWS, covering IaC generation, code analysis, policy compliance, and cost estimation, offering a toolkit for developers.
category:
- General
tags:
- open-source
- security
- github
- level-200
level: 200
published: true
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2023-02-04-aws-open-source-tools-code/
image:
  path: 3_article.jpg
  header_post: false
---
---

> This article is part of a series about `open-source` tools and AWS, in which I will share those tools that I have tested and that I think you may find useful.
>
> 1/3: [Getting Started with AWS open-source tools](/posts/aws-open-source-tools/){:target="_blank"}: main open-source tools and extend AWS CLI (this article).
> 
> 2/3: [Analyze your AWS environment](/posts/aws-open-source-tools-environment/){:target="_blank"}: focus on the inventory, analysis and security assessment of the AWS environment.
> 
> 3/3: **How to help you with your code**: to generate it (IaC), validate it (policy as code and compliance) and analyze it (static analysis/credentials).
{: .prompt-tip }

## Introduction

This is the last article of a series of 3 about open-source tools and AWS. The current article is about `how open-source tools can help you with your code`: to generate it (IaC), validate it (policy as code and compliance) and analyze it (static analysis/credentials)

I have created the following sections:

- IaC tools
- Analysis code: credentials and static analysis
- Policy as Code
- Compliance

## Generate IaC

This section is about open-source tools that will help you to generate Infrastructure as Code directly from your existing resources.

- <kbd>former2</kbd>: generate IaC `in many different languages (CloudFormation, CDK, Terraform, ...)`
- <kbd>terracognita</kbd>: generates your infrastructure as code `on Terraform configuration`
- <kbd>AirIAM</kbd>: scans existing IAM usage patterns and provides a simple method to `migrate IAM configurations into a right-sized Terraform plan`

### former2

Former2 allows you to generate Infrastructure-as-Code outputs from your existing resources within your AWS account. By making the relevant calls using the AWS JavaScript SDK, Former2 will scan across your infrastructure and present you with a list of resources for you to choose which to generate outputs.

Supported IaC output:

- CloudFormation
- Terraform
- Troposphere
- CDK v1
- CDK v2
- CDK (Terraform)
- Pulumi
- Diagram
- Raw Output (Debug)

> **Why use it**: Generate IaC from AWS account resources created manually using an extension for your browser. You will configure it through the former2.com website.
> ![former2-1](former2-1.png){:class="border"}
> ![former2-2](former2-2.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On Github: Watch 36; Fork 190; Stars 1.6K

**Recently updated?**: Yes, two months ago (on Dec 5, 2022)

**URL**: [https://github.com/iann0036/former2](https://github.com/iann0036/former2){:target="_blank"}

**More information**: [https://former2.com/#section-dashboard](https://former2.com/#section-dashboard){:target="_blank"}

### terracognita

Reads from existing public and private cloud providers (reverse Terraform) and `generates your infrastructure as code on Terraform configuration`.

Terracognita currently imports AWS, GCP, AzureRM and VMware vSphere cloud providers as Terraform (v1.1.9) resource/state.

> **Why use it**: yo are able to create the terraform templates of all your AWS infrastructure with zero effort and this is something wonderful, isn't it?
> ![terracognita-1](terracognita-1.png){:class="border"}
> ![terracognita-2](terracognita-2.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On Github: Watch 33; Fork 119; Stars 1.5k

**Recently updated?** No. Last commit on Aug 25, 2022. In total, 625 commits

**URL**: [https://github.com/cycloidio/terracognita/](https://github.com/cycloidio/terracognita/){:target="_blank"}

### AirIAM

AirIAM scans existing IAM usage patterns and provides a simple method to `migrate IAM configurations into a right-sized Terraform plan`. It identifies unused users, roles, groups, policies and policy attachments and replaces them with a Least Privileges Terraform code modelled to manage AWS IAM.

AirIAM was created to promote immutable and version-controlled IAM management to replace today's manual and error-prone methods.

> **Why use it**: IAM scan tool to detect unused resources (based on Amazon Access Advisor APIs) and the creation of terraform templates of your IAM resources.
>
> ![airiam-terraform](airiam-terraform.png){:class="border"}
> ![airiam-terraform-code](airiam-terraform-code.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On Github: Watch 15; Fork 68; Stars 677

**Recently updated?** No. Last commit the Aug 2, 2022. In total, 426 commits

**URL**: [https://github.com/bridgecrewio/AirIAM](https://github.com/bridgecrewio/AirIAM){:target="_blank"}

> First time I used this tool the terraform template generation functionality works fine, now now I receive an error and I was not able to use it. However, I think that this tool is useful to find this iam unused resources
{: .prompt-warning }

### Summary: Which tool should I use to generate IaC?

- CDK, CloudFormation, Troposphere, Pulumi: **former2**
- Terraform IaC: **former2 or terracognita**
- Specific IAM resources: former2, terracognita or **AirIAM**

## Analyze IaC code: static analysis

> Static Code Analysis commonly refers to the running of Static Code Analysis tools that attempt to `highlight possible vulnerabilities` within ‘static' (non-running) source code. Information extracted from [OWASP website](https://owasp.org/www-community/controls/Static_Code_Analysis){:target="_blank"}
{: .prompt-tip }

- <kbd>checkov</kbd>: Scans cloud infrastructure provisioned to `detect security and compliance misconfigurations` using graph-based scanning.
- <kbd>KICS</kbd>: Find `security vulnerabilities, compliance issues, and infrastructure misconfigurations` early in the development cycle of your infrastructure-as-code
- <kbd>terrascan</kbd>: static code analyzer for Infrastructure as Code to `scan infrastructure as code for misconfigurations, detect security vulnerabilities and compliance violations`
- <kbd>tfsec</kbd>: static analysis code for `Terraform`
- <kbd>cfn-nag</kbd>: looks for patterns in `CloudFormation templates` that may indicate insecure infrastructure.

All the tools in this section allow you to create custom rules

### checkov

Checkov is a `static code analysis tool for infrastructure as code` (IaC) and also a software composition analysis (SCA) tool for images and open-source packages.

It scans cloud infrastructure provisioned to detect `security and compliance misconfigurations` using graph-based scanning.

Checkov scans these IaC file types:

- **Terraform** (for **AWS**, GCP, Azure and OCI)
- **CloudFormation (including AWS SAM)**
- Azure Resource Manager (ARM)
- Serverless framework
- Helm charts
- Kubernetes
- Docker

Some Features:

- Over 1000 built-in policies cover security and compliance best practices for AWS, Azure and Google Cloud.
  - In AWS there are 177 controls in the framework `CKV_AWS`. Checkov scans for compliance with common industry standards such as
    - the Center for Internet Security (CIS)
    - and Amazon Web Services (AWS) Foundations Benchmark.
- Detects AWS credentials in EC2 user-data, Lambda environment variables and Terraform providers.
- Identifies secrets using regular expressions, keywords, and entropy-based detection.
- Plugins for popular IDEs are available (JetBrains, VSCode and Vim). However, activating the extension requires the submission of a one-time Bridgecrew API Token that can be obtained by creating a new Bridgecrew platform account.

You can create custom policies [here for more information](https://www.checkov.io/3.Custom%20Policies/Custom%20Policies%20Overview.html){:target="_blank"} using Python or YAML.

> **Why use it**: Includes 177 AWS controls including the `Center for Internet Security (CIS) and Amazon Web Services (AWS) Foundations Benchmark`, and is able to detect secrets and AWS credentials in the code.
> ![checkov-1](checkov-1.png){:class="border"}
> ![checkov-2](checkov-2.png){:class="border"}
>
> You also can visualize checkov scan output using Bridgecrew platform (free to use with the `Community plan` - up to 50 resources and small projects - [here](https://bridgecrew.io/pricing/){:target="_blank"})
{: .prompt-info }

**Is it popular?**: On Github: Watch: 55; Fork: 799; Stars: 5.2k

**Recently updated?**: Today (at the time I am writing this post)

**URL**: [https://github.com/bridgecrewio/checkov](https://github.com/bridgecrewio/checkov){:target="_blank"}

**More information**: [https://www.checkov.io/1.Welcome/Quick%20Start.html](https://www.checkov.io/1.Welcome/Quick%20Start.html){:target="_blank"}

### KICS

Find security vulnerabilities, compliance issues, and infrastructure misconfigurations early in the development cycle of your infrastructure-as-code.

KICS stands for `Keeping Infrastructure as Code Secure` and supports the following IaC solutions: `Terraform, AWS CloudFormation, AWS SAM, AWS CDK`, Kubernetes, Docker, Ansible, Helm, Google Deployment Manager, Microsoft ARM, Microsoft Azure Blueprints, OpenAPI 2.0 and 3.0, Pulumi, Crossplane, Knative and Serverless Framework.

KICS is 100% open-source and is written in Golang using Open Policy Agent (OPA) and it is possible to create custom queries to create custom rules (using REGO language).

> **Why use it**: Evaluate IaC to detect vulnerabilities
>
> ![kics-1](kics-1.png){:class="border"}
> ![kics-2](kics-2.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On github: Watch: 22; Fork: 224; Stars: 1.4k

**URL**: [https://github.com/Checkmarx/kics](https://github.com/Checkmarx/kics){:target="_blank"}

**More information**: [https://www.kics.io/](https://www.kics.io/){:target="_blank"}

### terrascan

Terrascan is a static code analyzer for Infrastructure as Code. Terrascan allows you to:

- Seamlessly scan infrastructure as code for misconfigurations.
- Monitor provisioned cloud infrastructure for configuration changes that introduce posture drift, and enable reverting to a secure posture.
- Detect security vulnerabilities and compliance violations.
- Mitigate risks before provisioning cloud-native infrastructure.
- Offers flexibility to run locally or integrate with your CI\CD.

Key features

- 500+ Policies for Security Best Practices
- Scanning of Terraform (HCL2), AWS CloudFormation Templates (CFT), Azure Resource Manager (ARM), Kubernetes (JSON/YAML), Helm v3, and Kustomize and Dockerfiles
- Integrates with docker image vulnerability scanning for AWS, Azure, GCP, and Harbor container registries.

Terrascan policies are written using the `Rego` policy language, and you can create your [own policies](https://runterrascan.io/docs/policies/policies/){:target="_blank"}

> **Why use it**: More than 300 AWS rules and support CloudFormation and Terraform.
>
> ![terrascan-1](terrascan-1.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On Github: Watch: 70; Fork: 459; Stars: 3.9k

**Recently updated?**: Today (at the time I am writing this post)

**URL**: [https://github.com/tenable/terrascan](https://github.com/tenable/terrascan){:target="_blank"}

**More information**: [https://runterrascan.io/docs/](https://runterrascan.io/docs/){:target="_blank"}

### tfsec

The tfsec open-source tool provides a security analysis of `Terraform code` and detects potential security issues based on AWS best practices.

The tool contains checks for more than 30 AWS resources and can be found here: [https://aquasecurity.github.io/tfsec/v1.28.1/checks/aws/](https://aquasecurity.github.io/tfsec/v1.28.1/checks/aws/){:target="_blank"}

tfsec can apply user-defined Rego policies. This is a useful feature if your organization needs to implement custom security policies on top of avoiding other misconfigurations and enforcing best practice guidelines. More information [here](https://aquasecurity.github.io/tfsec/v1.28.1/guides/rego/rego/){:target="_blank"}.

Some Features:

- Checks for misconfigurations across all major (and some minor) cloud providers
- Hundreds of built-in rules
- Applies (and embellishes) user-defined Rego policies
- Very fast, capable of quickly scanning huge repositories
- Plugins for popular IDEs available (JetBrains, VSCode and Vim)

> **Why use it**: static analysis code for terraform with checks in more than 30 AWS resources.
>
> ![tfsec](tfsec-1.png){:class="border"}
>
> Integration with Github Security alerts:
>
> ![tfsec-github](tfsec-2.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On Github: Watch: 69; Fork: 485; Stars: 5.6k

**Recently updated?**: Yes, last month (1318 commits)

**URL**: [https://github.com/aquasecurity/tfsec](https://github.com/aquasecurity/tfsec){:target="_blank"}

**More information**: [https://aquasecurity.github.io/tfsec/v1.28.1/](https://aquasecurity.github.io/tfsec/v1.28.1/){:target="_blank"}

### cfn-nag

The cfn-nag tool looks for patterns in `CloudFormation templates` that may indicate insecure infrastructure. It will look for:

- IAM rules that are too permissive (wildcards)
- Security group rules that are too permissive (wildcards)
- Access logs that aren't enabled
- Encryption that isn't enabled
- Password literals

The tool contains more than 150 AWS controls.

> **Why use it**: Analyze CloudFormation templates to detect insecure infrastructure
> ![cfn-nag](cfn-nag.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On Github: Watch 35; Fork 199; Stars 1.1k

**Recently updated?** No. Last commit the Jun 7, 2022. In total, 664 commits

**URL**: [https://github.com/stelligent/cfn_nag](https://github.com/stelligent/cfn_nag){:target="_blank"}

### Summary: Which tool should I use to perform a static analysis?

- CloudFormation code: checkov, KICS terrascan, cfn-nag
- Terraform code: checkov, KICS, terrascan or tfsec
- Integrate with IDE: checkov or tfsec
- Allow create custom rules: checkov, KICS, terrascan, tfsec

In my blog-backend-infrastructure code [available here](https://github.com/alazaroc/blog-backend-infrastructure){:target="_blank"} I had the following errors using these tools:

- KICS: 36 (3 high, 20 medium, 13 low)
- terrascan: 9 (1 high, 7 medium, 1 low)
- tfsec: N/A (only Terraform code)
- cfn-nag: 33

## Analyze IaC code: Policy as Code

> Policy-as-code is the use of code to define and manage rules and conditions to assure that your Infrastructure will be compliance with that.
> This is a way to apply `preventative governance and compliance (shift left)`, validating Infrastructure-as-code (IaC) against your organizational best practices for security and compliance.
{: .prompt-tip }

- <kbd>CloudFormation Guard</kbd>: policy-as-code evaluation tool for general purpose
- <kbd>OPA</kbd>: general-purpose policy engine that enables unified, context-aware policy enforcement across the entire stack
- <kbd>Regula</kbd>: evaluates infrastructure as code files for potential security and compliance violations before deployment.

### CloudFormation Guard

AWS CloudFormation Guard is an open-source general-purpose policy-as-code evaluation tool. It provides developers with a `simple-to-use`, yet powerful and expressive domain-specific language (DSL) to define policies and enables developers to validate JSON or YAML formatted structured data with those policies.

Supported: `CloudFormation Templates, CloudFormation ChangeSets, Terraform JSON` configuration files, Kubernetes configurations, and more.

> **Why use it**: Simple to use, compatible with CloudFormation, Terraform and kubernetes configurations.
> ![cloudformation-guard](cloudformation-guard.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On Github: Watch: 30; Fork: 145; Stars: 1.1k

**Recently updated?**: Last week (at the time I am writing this post)

**URL**: [https://github.com/aws-cloudformation/cloudformation-guard#installation](https://github.com/aws-cloudformation/cloudformation-guard#installation){:target="_blank"}

**More information**: [https://docs.aws.amazon.com/cfn-guard/latest/ug/what-is-guard.html](https://docs.aws.amazon.com/cfn-guard/latest/ug/what-is-guard.html){:target="_blank"}

> This is an official aws-cloudformation tool (yet open-source), but you have to create your own rules. I didn't find the "security best practices" included in the control AWS best practices of Security Hub as rules. However, you have here some examples: [https://github.com/aws-cloudformation/cloudformation-guard/tree/main/guard-examples](https://github.com/aws-cloudformation/cloudformation-guard/tree/main/guard-examples){:target="_blank"}
{: .prompt-warning }

### Open Policy Agent (OPA)

Open Policy Agent (OPA) is an open-source, general-purpose policy engine that enables unified, context-aware policy enforcement across the entire stack.

The Open Policy Agent is an open-source, general-purpose policy engine that unifies policy enforcement across the stack. OPA provides a high-level declarative language (`REGO`) that lets you specify policy as code and simple APIs to offload policy decision-making from your software. You can use OPA to enforce policies in microservices, Kubernetes, CI/CD pipelines, API gateways, and more.

OPA ecosystem is huge [here](https://www.openpolicyagent.org/docs/latest/ecosystem/#){:target="_blank"}, but in AWS we can use it to analyze our JSON/YAML file in CloudFormation or our Terraform template by creating custom rules for these languages.

OPA is a project of the Cloud Native Computing Foundation (CNCF) landscape.

> **Why use it**: unify policy enforcement across the stack. This example is using [Terraform](https://developer.hashicorp.com/terraform/cloud-docs/policy-enforcement/opa){:target="_blank"}. You have to convert your output Terraform to JSON file and then analyze it with OPA rules:
>
> ![opa-1](opa-1.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On Github: Watch: 119; Fork: 1.1k; Stars: 7.6k

**Recently updated?**: 4 days ago (at the time I am writing this post)

**URL**: [https://github.com/open-policy-agent/opa](https://github.com/open-policy-agent/opa){:target="_blank"}

**More information**: [https://www.openpolicyagent.org/](https://www.openpolicyagent.org/){:target="_blank"}

> You have to create your own OPA rules with REGO language (easy to learn). You have an online playground to test your REGO policies [here](https://play.openpolicyagent.org/){:target="_blank"}
{: .prompt-warning }

### Regula

Regula is a tool that evaluates infrastructure as code files for potential AWS, Azure, Google Cloud, and Kubernetes security and compliance violations prior to deployment. `Based on Open Policy Agent` (OPA) and written in REGO

Regula supports the following file types:

- CloudFormation JSON/YAML templates
- Terraform source code (.tf or .tf.json format)
- Terraform JSON plans
- Kubernetes YAML manifests
- Azure Resource Manager (ARM) JSON templates (in preview)

This is the list of rules applied (in AWS there are rules for Terraform and CloudFormation): [https://regula.dev/rules.html](https://regula.dev/rules.html#aws-cloudformation){:class="border"}.
> You must to know that at this time **CloudFormation support 23 controls, and Terraform 114**.
{: .prompt-warning }

[Here](https://regula.dev/development/writing-rules.html){:target="_blank"} you can find more information about `Writing custom rules`.

> **Why use it**: Evaluate IaC to detect vulnerabilities
> ![regula](regula.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On github: Watch: 54; Fork: 776; Stars: 5.1k

**URL**: [https://github.com/fugue/regula](https://github.com/fugue/regula){:target="_blank"}

**More information**: [https://regula.dev/](https://regula.dev/){:target="_blank"}

### Summary: Which tool should I use to create my custom Policy as a Code?

- AWS solution: CloudFormation Guard, OPA or regula
- Cross-provider solution: OPA or regula (both using REGO language)

Or you can use any of the tools in the `static analysis` category because all of them allow you to create custom rules.

## Detect credentials in code

These tools can be applied to any git code:

- General for git repository:
  - <kbd>git-secrets</kbd>: Prevents you from committing passwords and other sensitive information to a git repository.
  - <kbd>gitleaks</kbd>: a tool for detecting and preventing hardcoded secrets like passwords, API keys, and tokens in git repos.
- Specific of IaC code:
  - <kbd>checkov</kbd>: a static code analysis tool for infrastructure as code (including secrets)
    - This tool has been already explained a few lines before so you can get the information from there

### git-secrets

Prevents you from committing passwords and other sensitive information to a git repository.

> **Why use it**: Find api keys, passwords, AWS keys in the code.
> ![git-secrets](git-secrets.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On Github: Watch: 198; Fork: 1.1k; Stars: 10.8k

**Recently updated?**: Today (at the time I am writing this post). Commit in total 110

**URL**: [https://github.com/awslabs/git-secrets](https://github.com/awslabs/git-secrets){:target="_blank"}

### gitleaks

Gitleaks is a SAST tool for detecting and preventing hardcoded secrets like passwords, API keys, and tokens in git repos. Gitleaks is an easy-to-use, all-in-one solution for detecting secrets, past or present, in your code.

> **Why use it**: Analyze the code of your IaC infrastructure to detect security and compliance misconfigurations.
> ![gitleaks](gitleaks.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On Github: Watch: 142; Fork: 1.1k; Stars: 11.5k

**Recently updated?**: Today (at the time I am writing this post). Commit in total 896

**URL**: [https://github.com/zricethezav/gitleaks](https://github.com/zricethezav/gitleaks){:target="_blank"}

## Others

- Compliance
  - <kbd>cloud custodian</kbd>: rules engine to define policies to enable a well-managed, secure and cost-optimized cloud infrastructure
- Cost of Terraform templates:
  - <kbd>Infracost</kbd>: estimate cost for Terraform before to deploy

### Cloud custodian

Cloud Custodian is a rules engine to define policies to enable a well-managed, secure and cost-optimized cloud infrastructure in yaml format.

Custodian can be used to manage AWS, Azure, and GCP environments by ensuring `real-time compliance with security policies` (like encryption and access requirements), tag policies, and cost management via garbage collection of unused resources and off-hours resource management.

Custodian policies are written in simple YAML configuration files that enable users to specify policies on a resource type (EC2, ASG, Redshift, CosmosDB, PubSub Topic) and are constructed from a vocabulary of filters and actions.

You can apply to AWS to [here](https://cloudcustodian.io/docs/aws/gettingstarted.html){:target="_blank"}

> **Why use it**: manage your rules with yaml policies
>
> ![cloudcustodian](cloudcustodian.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On Github: Watch 1.3k; Starts 4.6k

**Recently updated?**: Yes. The last commit was 3 days ago (4054 commits in total)

**URL**: [https://github.com/cloud-custodian/cloud-custodian/](https://github.com/cloud-custodian/cloud-custodian/){:target="_blank"}

> Many examples available in [https://www.cloudcustodian.io/docs/aws/examples/index.html](https://www.cloudcustodian.io/docs/aws/examples/index.html){:target="_blank"}
{: .prompt-info }

### Infracost

Infracost shows cloud cost estimates for Terraform. It lets DevOps, SRE and engineers see a cost breakdown and understand costs before making changes, either in the terminal or pull requests.

Infracost also has many CI/CD integrations so you can easily post cost estimates in pull requests. This provides your team with a safety net as people can discuss costs as part of the workflow.

The CDK for Terraform is also supported as it can generate Terraform

> **Why use it**: If you are using Terraform, this tool will estimate the cost before to deploy. Do you want to try? (images taken from github)
> Output of infracost breakdown
> ![infracost](infracost.png){:class="border"}
>
> infracost diff shows diff of monthly costs between current and planned state
> ![infracost-2](infracost-2.png){:class="border"}
>
> Post cost estimates in pull requests
>
> ![infracost-cicd-cost](infracost-cicd-cost.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On Github: Watch: 63; Fork: 418; Stars: 8.5k

**Recently updated?**: Yes. Last commit yesterday (at the time I am writing this post). In total 2196 commits

**URL**: [https://github.com/infracost/infracost](https://github.com/infracost/infracost){:target="_blank"}

**More information**: [https://www.infracost.io/docs/](https://www.infracost.io/docs/){:target="_blank"}

## Next Steps

- **My arsenal of security tools**: [https://github.com/toniblyx/my-arsenal-of-aws-security-tools](https://github.com/toniblyx/my-arsenal-of-aws-security-tools){:target="_blank"}
- **Improve your handsome security skills**: [https://github.com/RhinoSecurityLabs/cloudgoat](https://github.com/RhinoSecurityLabs/cloudgoat){:target="_blank"}
- **AWS Security primer**: [https://cloudonaut.io/aws-security-primer/](https://cloudonaut.io/aws-security-primer/){:target="_blank"}
- **AWS Lambda Power tuning** (optimize Lambda): [https://github.com/alexcasalboni/aws-lambda-power-tuning](https://github.com/alexcasalboni/aws-lambda-power-tuning){:target="_blank"}

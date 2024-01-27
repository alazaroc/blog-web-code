---
layout: post
title: 'Open source tools to analyze your AWS environment'
date: 2023-01-30 18:02 +0100
last_modified_at:
description: This article is the second part of a series on open source tools, focusing on tools for inventory, analysis and security assessment of the AWS environment.
category:
- General
tags:
- open-source
- github
- security
published: true
pin: false
featured_post: false
comments: true
sitemap: true
img_path: /assets/img/posts/2023-01-30-aws-open-source-tools-environment/
---
---

## Introduction

This is the second part of the series `Open source tools`. If this is the first article of this series that you are reading, I recommend you to review the first one `Getting started with AWS open-source tools` [here](/posts/aws-open-source-tools/){:target="_blank"}

> Some open source tool could appear in several categories (in this same article or among the 3 open source tools articles). I thought it was better not to mix information between categories when a tool could be part of several of them.
{: .prompt-warning }

## Inventory and analyze your environment

These open source tools are useful to analyze all your AWS environment:

- General
  - <kbd>cloudmapper</kbd>: `Analyze` your AWS environment
  - <kbd>prowler</kbd>: `Quick analysis` of your AWS environment
- IAM (specific)
  - <kbd>AirIAM</kbd>: Detect `IAM unused resources`: users, access keys, roles, groups, policies and policy attachments

### cloudmapper

CloudMapper helps you analyze your Amazon Web Services (AWS) environments.

Based on Python components.

> **Why use it**: Analyze your AWS environment: review status of the account, resource inventory (all resources in all the regions and region usage), IAM resources (active/inactive), public resources (ec2, elb, elbv2, rds, redshift, ecs, autoscaling, cloudfront and apigateway) and finally findings of security (a few).
>
> List of the commands of this tool:
> ![cloudmapper-commands](cloudmapper-commands.png){:class="border"}
>
> The shortcut is:
>
> 1. Run the `collect` command to get your resources (you can filter the regions that you want using the `--regions 'eu-west-1,eu-west-2'`... us-east-1 will be always added)
>
> 2. Then run the `report` command (an html page will be generated with all the information)
>
> ![cloudmapper-report-1](cloudmapper-report-1.png){:class="border"}
> ![cloudmapper-report-2](cloudmapper-report-2.png){:class="border"}
> ![cloudmapper-report-3](cloudmapper-report-3.png){:class="border"}
>
> A specific command that I like is the `iam_report` because it allows you review unused permissions in your IAM resources:
>
> ![cloudmapper-iam_report](cloudmapper-iam_report.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On github: Watch 135; Fork 759; Stars 5.3K

**Recently updated?** No. The last commit was on Jul 25, 2022 (956 commits). Also, some original functionality of this tools is now deprecated (generation of networking diagrams).

**URL**: [https://github.com/duo-labs/cloudmapper](https://github.com/duo-labs/cloudmapper){:target="_blank"}

> There is a CDK project to run in Fargate service the CloudMapper's collection and audit capabilities nightly, across multiple accounts, sending any audit findings to a Slack channel and keeping a copy of the collected metadata in an S3 bucket. This is the diagram of the solution [https://github.com/duo-labs/cloudmapper/blob/main/auditor/README.md](https://github.com/duo-labs/cloudmapper/blob/main/auditor/README.md){:target="_blank"}
{: .prompt-tip }

### prowler

Prowler is an Open Source security tool... and you will find all this information in the following section (this is for inventory and analysis of the environment).

prowler has a functionality to perform a quick inventory check. It will give you in the console information about the number of each resource that you have, and in json/csv generated files you will find information about what is the specific resource (region, aws service, resource type, resource id and ARN)

> **Why use it**: Perform a quick analysis of your AWS environment (a few seconds).
>
> ![prowler-inventory-1](prowler-inventory-1.png){:class="border"}
> ![prowler-inventory-2](prowler-inventory-2.png){:class="border"}
>
> And this is the CSV file report:
>
> ![prowler-inventory-csv](prowler-inventory-csv.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On github: Watch 122; Fork 1.1k; Stars 7.6K

**Recently updated?** Last commit yesterday (in the time I am writing this post). Total commits 2271

**URL**: [https://github.com/prowler-cloud/prowler](https://github.com/prowler-cloud/prowler){:target="_blank"}

### AirIAM

AirIAM scans existing IAM usage patterns and provides a simple method to migrate IAM configurations into a right-sized Terraform plan. It `identifies unused users, roles, groups, policies and policy attachments` and replaces them with a Least Privileges Terraform code modelled to manage AWS IAM.

AirIAM was created to promote immutable and version-controlled IAM management to replace today's manual and error prone methods.

> **Why use it**: IAM scan tool to detect unused resources (based on Amazon Access Advisor APIs) and the creation of terraform templates of your IAM resources.
>
> ![airiam-image](airiam.png){:class="border"}
>
> This is another example analyzing other AWS account and exporting the results in a txt file:
>
> ![airmiam-file](airmiam-file.png){:class="border"}
>
{: .prompt-info }

**Is it popular?**: On github: Watch 15; Fork 68; Stars 673

**Recently updated?** No. Last commit the Aug 2, 2022. In total, 426 commits

**URL**: [https://github.com/bridgecrewio/AirIAM](https://github.com/bridgecrewio/AirIAM){:target="_blank"}

**Updated**:

> First time I used this tool the terraform template generation functionality works fine, now now I receive an error and I was not able to use it. However, I think that this tool is useful to find this iam unused resources
{: .prompt-warning }

### Summary: Which tool should I use to analyze my environment?

> This is my personal opinion. If you have a different one, let me know in the comments at the end of this article!
{: .prompt-warning }

It depends what you want to do:

- Full analysis of the AWS environment: `cloudmapper`
- Get a quick inventory of the AWS environment: `prowler`
- Fast IAM unused resources analysis: `AirIAM`
- Apply least-privilege to IAM roles (review which permissions you are not using): `cloudmapper`

## Security Assessment

There are many different tools to realize a security assessment of your environment.

- General
  - <kbd>prowler</kbd>: `security best practices assessments`, audits, incident response, continuous monitoring, hardening and forensics readiness
  - <kbd>Scoutsuite</kbd>: multi-cloud `security-auditing tool`, which enables security posture assessment of cloud environments
  - <kbd>cloudsploit</kbd>: Cloud Security Scans to detect `potential misconfigurations and security risks`
  - <kbd>steampipe</kbd> yes, AGAIN. Ensure that cloud resources comply with security benchmarks such as CIS, NIST, and SOC2.
- IAM
  - <kbd>cloudsplaining</kbd>: `IAM Security Assessment tool`

### prowler

This is the second time I mention prowler in this article in two different categories.

Prowler is an Open Source security tool to perform AWS and Azure `security best practices assessments, audits, incident response, continuous monitoring, hardening and forensics readiness`.

It contains `more than 240 controls` covering CIS, PCI-DSS, ISO27001, GDPR, HIPAA, FFIEC, SOC2, AWS FTR, ENS and custom security frameworks.

There are 4 available categories:

- secrets
- trust-boundaries
- internet-exposed
- forensics-ready

There are 3 available Compliance Frameworks:

- cis_1.4_aws
- cis_1.5_aws
- ens_rd2022_aws

severity:

- informational
- low
- medium
- high
- critical

> **Why use it**: Security tool to perform security best practices assessments, audits, incident response, continuous monitoring, hardening and forensics readiness.
>
> By default, prowler will scan all AWS regions. If you want analyze only a few regions you can use the following command  `-f us-east-1 eu-west-1 ...`
>
> ![prowler-1](prowler-1.png){:class="border"}
> ![prowler-2](prowler-2.png){:class="border"}
>
> And this is the HTML file report:
>
> ![prowler-report-1](prowler-report-1.png){:class="border"}
> ![prowler-report-2](prowler-report-2.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On github: Watch 122; Fork 1.1k; Stars 7.6K

**Recently updated?** Last commit yesterday (in the time I am writing this post). Total commits 2271

**URL**: [https://github.com/prowler-cloud/prowler](https://github.com/prowler-cloud/prowler){:target="_blank"}

### Scoutsuite

Scout Suite is an open source `multi-cloud security-auditing tool`, which enables security posture assessment of cloud environments. Using the APIs exposed by cloud providers, Scout Suite gathers configuration data for manual inspection and highlights risk areas. Rather than going through dozens of pages on the web consoles, Scout Suite presents a clear view of the attack surface automatically.

Scout Suite was designed by security consultants/auditors. It is meant to provide a point-in-time security-oriented view of the cloud account it was run in. Once the data has been gathered, all usage may be performed offline.

> **Why use it**: Enable security posture assessment of cloud environments.
>
> By default, scoutsuite will scan all AWS regions. If you want analyze only a few regions you can use the following command  `-r us-east-1 eu-west-1 ...`
>
> ![scoutsuite-1](scoutsuite-1.png){:class="border"}
> ![scoutsuite-2](scoutsuite-2.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On github: Watch 113; Fork 816; Stars 5K

**Recently updated?**: No. Last commit was on Sep 5, 2022 (6101 commits in total)

**URL**: [https://github.com/nccgroup/ScoutSuite](https://github.com/nccgroup/ScoutSuite){:target="_blank"}

> I didn't found information about what security frameworks is using or more information about the security controls. However, the findings in the audit report are useful and you have to review them!
{: .prompt-warning }

### cloudsploit

CloudSploit by Aqua is an open-source project designed to allow detection of security risks in cloud infrastructure accounts, including: Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP), Oracle Cloud Infrastructure (OCI), and GitHub. These scripts are designed to return a series of `potential misconfigurations and security risks`.

Compliance:

- hipaa
- PCI
- CIS (level 1 and 2)

> **Why use it**: detect potential misconfigurations and security risks in your AWS account
>
> ![cloudsploit-1](cloudsploit-1.png){:class="border"}
>
> However, in the console the result is not clear:
>
> ![cloudsploit-2](cloudsploit-2.png){:class="border"}
>
> A better solution is generate the report in a csv file adding the following command `--csv=file.csv`. After convert the csv into a table it will look like this:
>
> ![cloudsploit-3](cloudsploit-3.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On github: Watch 70; Fork 575; Stars 2.5k

**Recently updated?**: Yes. Last commit was 3 weeks ago (3449 commits in total)

**URL**: [https://github.com/aquasecurity/cloudsploit](https://github.com/aquasecurity/cloudsploit){:target="_blank"}

> I didn't found how to scan only a few regions. In the official documentation only is included how to suppress all one region results `./index.js --suppress *:us-east-1:*`. And to exclude more than one region you can use something like this `--suppress "*:ap-*-*:*" --suppress "*:af-*-*:*" ...`
{: .prompt-tip }

### steampipe

I mention this tool in my first article about open source, when I talked about `Extend CLI` capabilities [here](/posts/aws-open-source-tools/#steampipe){:target="_blank"}

Steampipe is the universal interface to APIs, and we can use SQL to query cloud infrastructure, SaaS, code, logs, and more.

Besides, I am going to show you two new capabilities:

- **Check**: `Ensure that cloud resources comply with security benchmarks` such as CIS, NIST, and SOC2.
  - AWS security best practices contains 180 controls
  - CIS v1.50 contains 63 controls
- **Visualize**: View `prebuilt dashboards` or build your own.

> **Why use it**: for me, the benchmark of AWS security best practices with 180 controls and the CIS level 1.5 with 63 are enough to consider use this tool to perform a security analysis.
>
> ![steampipe-2](steampipe-2.png){:class="border"}
> ![steampipe-3](steampipe-3.png){:class="border"}
> ![steampipe-4](steampipe-4.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On github: Watch 32; Fork 171; Stars 4.6k

**Recently updated?** Yes, last commit 2 days ago. Total commits 2007

**URL**: [https://github.com/turbot/steampipe](https://github.com/turbot/steampipe){:target="_blank"}

More information (checks and dashboard):

- [https://steampipe.io/docs/check/overview](https://steampipe.io/docs/check/overview){:target="_blank"}
- [https://steampipe.io/docs/dashboard/overview](https://steampipe.io/docs/dashboard/overview){:target="_blank"}
- [https://aws.amazon.com/blogs/opensource/compliance-auditing-with-steampipe-and-sql/](https://aws.amazon.com/blogs/opensource/compliance-auditing-with-steampipe-and-sql/){:target="_blank"}

### cloudsplaining

Cloudsplaining is an AWS `IAM Security Assessment tool` that identifies violations of least privilege and generates a risk-prioritized HTML report.

The assessment identifies where resource ARN constraints are not used and identifies other risks in IAM policies:

- Privilege Escalation
- Resource Exposure
- Infrastructure Modificationº
- Data Exfiltration

CloudMapper helps you analyze your Amazon Web Services (AWS) environments (using python)

> **Why use it**: The tool provides you a report with some risk in IAM policies (customer/inline/AWS) and the IAM principals (IAM Users, Groups, and Roles).
>
>
> ![cloudsplaining-1](cloudsplaining-1.png){:class="border"}
> ![cloudsplaining-2](cloudsplaining-2.png){:class="border"}
{: .prompt-info }

**Is it popular?**: On github: Watch 29; Fork 143; Stars 1.6K

**Recently updated?** Yes. Last commit 3 days ago (347 commits in total)

**URL**: [https://github.com/salesforce/cloudsplaining](https://github.com/salesforce/cloudsplaining){:target="_blank"}

### Summary: Which tool should I use to perform security assessments on my account?

> This is my personal opinion. If you have a different one, let me know in the comments at the end of this article!
{: .prompt-warning }

- General security assessment: `prowler` or `steampipe`
- Security assessment based on CIS 1.5: `steampipe`, prowler or cloudsploit
- Richer tool security assessment based on frameworks: `steampipe`
- IAM specific security assessment: `cloudsplaining`

## Next steps

The next article related with open source tools will be:

- **How to help you with your code**: to generate it (IaC), validate it (policy as code and compliance) and analyze it (static analysis/credentials) - [here](/posts/aws-open-source-tools-code/){:target="_blank"}

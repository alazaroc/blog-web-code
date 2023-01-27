---
layout: post
title: Getting Started with AWS Security
date: 2022-05-31 19:33 +0200
last_modified_at:
description: In AWS security is TOP priority, but what do you know about security? How you can secure your AWS solutions? What are the basics and best practices that you need to know? Where to start?
category:
- Security
tags:
- security
- getting started
published: true
pin: false
featured_post: true
comments: false
sitemap: true
img_path: /assets/img/posts/2022-05-28-getting-started-with-aws-security/
---
---

## TLDR

You have probably read many times that <kbd>in AWS security is TOP priority</kbd>, and as you know there are many resources on the internet. I want to share with you in this article the **security basics** to improve your AWS solutions by focusing on these 2 resources that you *have to know*:

- Recommendations and best practices: Security Pillar in AWS Well-Architected Framework
- AWS Security checklist

> If you're looking to dive deeper into the broader range of learning materials available on security, including digital courses, blogs, whitepapers, and more, AWS recommends you the [Ramp-Up Guide](https://d1.awsstatic.com/training-and-certification/ramp-up_guides/Ramp-Up_Guide_Security.pdf){:target="_blank"}.
{: .prompt-tip }

---

## Security Pillar in AWS Well-Architected Framework

You should start here. This is the [official link](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html){:target="_blank"}. I am sure you are familiar with the Well-Architected Framework and the Security Pillar... but have you read the whole thing? I will try to compile the main points for you.

> The Security Pillar provides guidance to help you apply best practices, current recommendations in the design, delivery, and maintenance of secure AWS workloads. By adopting this practices you can build architectures that protect your data and systems, control access, and respond automatically to security events.
{: .prompt-info }

Security in the cloud is composed of six areas:

1. Foundations
2. Identity and access management
3. Detection (logging and monitoring)
4. Infrastructure protection
5. Data protection
6. Incident response

![well-architected-tools](well-architected-tools.png){:class="border"}

### 1. Security Foundations

#### 1.1. Design Principles

The security pillar of the Well-Architected Framework captures a set of design principles that turn the security areas into **practical guidance** that can help you strengthen your workload security.

Where the security epics frame the overall security strategy, these Well-Architected principles describe what you should start doing:

> - **Implement a strong identity foundation**
>   - Implement the principle of least privilege
>   - Enforce separation of duties (with appropriate authorization)
>   - Centralize identity management
>   - Aim to eliminate reliance on long-term static credentials
> - **Enable traceability**
>   - Monitor, alert, and audit actions and changes to your environment in real time
>   - Integrate log and metric collection with systems to automatically investigate and take action
> - **Apply security at all layers**
>   - Apply a defense in depth approach with multiple security controls
>   - Apply to all layers (for example, edge of network, VPC, load balancing, every instance and compute service, operating system, application, and code)
> - **Automate security best practices**
>   - Automated software-based security mechanisms (improve your ability to securely scale more rapidly and cost-effectively)
>   - Create secure architectures, including the implementation of controls that are defined and managed as code in version-controlled templates
> - **Protect data in transit and at rest**
>   - Classify your data into sensitivity levels and use mechanisms, such as encryption, tokenization, and access control where appropriate
> - **Keep people away from data**
>   - Use mechanisms and tools to reduce or eliminate the need for direct access or manual processing of data
> - **Prepare for security events**
>   - Prepare for an incident by having incident management and investigation policy and processes that align to your organizational requirements
>   - Run incident response simulations and use tools with automation to increase your speed for detection, investigation, and recovery
{: .prompt-danger }

#### 1.2. Shared Responsibility

> Security and Compliance is a shared responsibility between AWS and the customer.
{: .prompt-info }

![shared-responsibility-model](shared-responsability-model.png){:class="border"}

More detailed information [here](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/shared-responsibility.html){:target="_blank"}.

#### 1.3. AWS Account Management and Separation

Best practices for account management and separation:

- Separate workloads using accounts
- Secure AWS account:
  - not use the root user
  - keep the contact information up to date
- Use <kbd>AWS Organizations</kbd> to:
  - **Manage accounts centrally**: automates AWS account creation and management, and control of those accounts after they are created
  - **Set controls centrally**: allows you to use service control policies (SCPs) to apply permission guardrails at the organization, organizational unit, or account level, which apply to all AWS Identity and Access Management (IAM) users and role
  - **Configure services and resources centrally**: helps you configure AWS services that apply to all of your accounts (CloudTrail, AWS Config)

### 2. Identity and Access Management

> Identity and Access Management (IAM) helps customers integrate AWS into their identity management lifecycle, and sources of authentication and authorization.
{: .prompt-info }

The best practices for these capabilities fall into two main areas.

- Identity Management
- Permissions Management

#### 2.1. Identity Management

There are two types of identities you will need to manage:

- **Human identities**: administrators, developers, operators, and consumers of your applications, ...
- **Machine identities**: workload applications, operational tools, components, ...

The following are the best practices related to the identities:

- **Rely on a centralized identity provider**: This makes it easier to manage access across multiple applications and services, because you are creating, managing, and revoking access from a single location
  - Federation with **individual AWS Account**: you can use centralized identities for AWS with a SAML 2.0-based provider with <kbd>AWS IAM</kbd>
  - For federation to **multiple accounts** in your <kbd>AWS Organization</kbd>, you can configure your identity source in AWS Single Sign-On (<kbd>AWS SSO</kbd>)
  - For managing **end-users or consumers** of your workloads, such as a mobile app, you can use <kbd>Amazon Cognito</kbd>
- **Leverage user groups and attributes**: Place users with common security requirements in groups defined by your identity provider, and put mechanisms in place to ensure that user attributes are correct and updated
- Use strong sign-in mechanisms
- Use temporary credentials
- Audit and rotate credentials periodically
- **Store and use secrets securely**: For credentials that are not IAM-related and cannot take advantage of temporary credentials, such as database logins, use a service that is designed to handle the management of secrets, such as <kbd>AWS Secrets Manager</kbd>

#### 2.2. Permission management

Manage permissions to control access to human and machine identities that require access to AWS and your workloads. Permissions control who can access what, and under what conditions.

How to grant access to different types of resources:

- **Identity-based policies** in <kbd>IAM</kbd> (managed or inline): These policies let you specify what that identity can do (its permissions)
  - In most cases, you should create your own <kbd>customer-managed policies</kbd> following the principle of least privilege
- **Resource-based policies** are attached to a <kbd>resource</kbd>. These policies grant permission to a principal that can be in the same account as the resource or in another account
- **Permissions boundaries**: use a managed policy to set the maximum permissions that an administrator can set
  - This enables you to **delegate the ability to create and manage permissions** to developers, such as the creation of an IAM role, but limit the permissions they can grant so that they cannot escalate their permission using what they have created
- **Attribute-based access control (ABAC)**: enables you to grant permissions **based on tags** (attributes)
  - <kbd>Tags</kbd> can be attached to IAM principals (users or roles) and to AWS resources
  - Using <kbd>IAM policies</kbd>, administrators can **create a reusable policy** that applies permissions based on the attributes of the IAM principal
- **Organizations service control policies (SCP)**: define the maximum permissions for account members of an organization or organizational unit (OU). **Limit permission** but do not grant it
- **Session policies**: advanced policies that you pass as a parameter when you programmatically create a temporary session for a role or federated user. These policies **limit permissions** but do not grant permissions

The following are the best practices related to the permission management:

- **Grant least privilege access**
- **Define permission guardrails for your organization**: You should use <kbd>AWS Organizations</kbd> to establish common permission guardrails that restrict access to all identities in your organization. [Here](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples.html){:target="_blank"} are examples of service control policies (<kbd>SCPs</kbd>) defined by AWS that you can apply to your organization.
- **Analyze public and cross-account access**: In AWS, you can grant access to resources in another account. You grant direct cross-account access using policies attached to resources or by allowing identity to assume an IAM role in another account.
  - <kbd>IAM Access Analyzer</kbd> identify all access paths to a resource from outside of its account. It reviews resource policies continuously, and reports findings of public and cross-account access to make it easy for you to analyze potentially broad access.
- **Share resources securely**: AWS recommends sharing resources using AWS Resource Access Manager (<kbd>AWS RAM</kbd>) because enables you to easily and securely share AWS resources within your AWS Organization and Organizational Units
- **Reduce permissions continuously**: Maybe in the getting started of a project you chose to grant broad access, but later you should evaluate access continuously and restrict access to only the permissions required and achieve **least privilege**
- **Establish emergency access process**: AWS recommends having a process that allows emergency access to your workload, in particular your AWS accounts, in the unlikely event of an automated process or pipeline issue

### 3. Detection

Detective Control provides guidance to help identify potential security incidents within the AWS environment. Detection consists of two parts:

- Configure
- Investigate

#### 3.1. Configure

- **Configure services and application logging**
  - A foundational practice is to establish a set of detection mechanisms **at the account level**. This base set of mechanisms is aimed at **recording and detecting** a wide range of actions on all resources in your account.
    - <kbd>AWS CloudTrail</kbd> provides event history of your AWS account activity
    - <kbd>AWS Config</kbd> monitors and records your AWS resource configurations and allows you to automate the evaluation and remediation against desired configurations
    - <kbd>Amazon GuardDuty</kbd> is a threat detection service that continuously monitors for malicious activity and unauthorized behavior to protect your AWS accounts and workloads
    - <kbd>AWS Security Hub</kbd> provides a single place that aggregates, organizes, and prioritizes your security alerts, or findings, from multiple AWS services and optional third-party products to give you a comprehensive view of security alerts and compliance status.
  - Many core AWS services provide service-level logging features. For example, Amazon VPC provides <kbd>VPC Flow Logs</kbd>
  - <kbd>Amazon CloudWatch Logs</kbd> can be used to store and analyze logs for EC2 instances and application-based logging that doesn’t originate from AWS services (you will need an agent), and use <kbd>CloudWatch Logs Insights</kbd> to process them in real-time or dive into analysis.
- **Analyze logs, findings, and metrics centrally**: A best practice is to deeply integrate the flow of security events and findings into a notification and workflow system.
  - <kbd>GuardDuty</kbd> and <kbd>Security Hub</kbd> provides aggregation, deduplication, and analysis mechanisms for log records that are also made available to you via other AWS services.

#### 3.2. Investigate

- **Implement actionable security events**: For each detective mechanism you have, you should also have a process, in the form of a <kbd>runbook or playbook</kbd>, to investigate
- **Automate response to events**:
  - In AWS, investigating events of interest and information on potentially unexpected changes into an automated workflow can be achieved using <kbd>Amazon EventBridge</kbd>
  - <kbd>Amazon GuardDuty</kbd> also allows you to route events to a workflow system for those building incident response systems (Step Functions), to a central Security Account, or to a bucket for further analysis.
  - Detecting change and routing this information to the correct workflow can also be accomplished using <kbd>AWS Config Rules</kbd> and Conformance Packs.
    - <kbd>Conformance packs</kbd> are a collection of Config Rules and remediation actions you deploy as a single entity authored as a YAML template. A [sample conformance pack template is available for the Well-Architected Security Pillar](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-wa-Security-Pillar.html){:target="_blank"}

### 4. Infrastructure Protection

> Infrastructure protection ensures that systems and resources within your workloads are protected against unintended and unauthorized access, and other potential vulnerabilities.
{: .prompt-info }

> You need to be familiar with Regions, Availability Zones, AWS Local Zones, and AWS Outposts.
{: .prompt-warning }

#### 4.1. Protecting Networks

When you follow the **principle of applying security at all layers**, you employ a [Zero Trust](https://aws.amazon.com/blogs/security/zero-trust-architectures-an-aws-perspective/){:target="_blank"} approach (application components don't trust any other).

- **Create network layers**: Components that share reachability requirements can be segmented into layers formed by subnets.
- **Control traffic at all layers**: You should examine the connectivity requirements of each component. In a VPC (region level), the subnets are in an Availability Zone with Network ACLs and route tables associated, and inside of subnets, you include the use of security groups (stateful inspection firewall).
  - Some AWS services require components to access the internet for making API calls, where AWS API endpoints are located.
  - Other AWS services use <kbd>VPC endpoints</kbd> within your Amazon VPCs.
  - Many AWS services, including Amazon S3 and Amazon DynamoDB, support VPC endpoints, and this technology has been generalized in <kbd>AWS PrivateLink</kbd>. AWS recommends you to use this approach to access AWS services, third-party services, and your own services hosted in other VPCs securely because **all network traffic on AWS PrivateLink stays on the global AWS backbone and never traverses the internet**. Connectivity can only be initiated by the consumer of the service, and not by the provider of the service.
- **Implement inspection and protection**: Inspect and filter your traffic at each layer.
  - You can inspect your VPC configurations for potential unintended access using <kbd>VPC Network Access Analyzer</kbd>.
  - For components transacting over HTTP-based protocols, a web application firewall, <kbd>AWS WAF</kbd>, can help protect from common attacks. AWS WAF lets you monitor and block HTTP(s) requests that match your configurable rules that are forwarded to an Amazon API Gateway API, Amazon CloudFront, or an Application Load Balancer.
  - For managing **AWS WAF, AWS Shield Advanced protection, and Amazon VPC security groups across AWS Organizations**, you can use <kbd>AWS Firewall Manager</kbd>.
    - It allows you to centrally configure and manage firewall rules across your accounts and applications, making it easier to scale enforcement of common rules.
    - It also enables you to rapidly respond to attacks, using <kbd>AWS Shield Advanced</kbd>, or solutions that can automatically block unwanted requests to your web applications.
    - Firewall Manager also works with <kbd>AWS Network Firewall</kbd>, a managed service that uses a rules engine to give you fine-grained control over both stateful and stateless network traffic.
- **Automate network protection**: Automate protection mechanisms to provide a self-defending network based on threat intelligence and anomaly detection.
  - For example, intrusion detection and prevention tools can adapt to current threats and reduce their impact.
  - A web application firewall is an example of where you can automate network protection, for example, by using the <kbd>AWS WAF Security Automations solution</kbd> (<https://github.com/awslabs/aws-waf-security-automations> ) to automatically block requests originating from IP addresses associated with known threat actors.

#### 4.2. Protecting Compute

Compute resources include EC2 instances, containers, AWS Lambda functions, database services, IoT devices, and more. Each of these compute resource types requires different approaches to secure them. However, they do share common strategies that you need to consider:

- **Perform vulnerability management**: Frequently scan and patch for vulnerabilities in your code, dependencies, and in your infrastructure to help protect against new threats.
  - Automate the creation of infrastructure with <kbd>CloudFormation</kbd> and create secure-by-default infrastructure templates verified with <kbd>CloudFormation Guard</kbd>
  - For patch management, use <kbd>AWS System Manager Patch Manager</kbd>
- **Reduce attack surface**: Reduce your exposure to unintended access by hardening operating systems and minimizing the components, libraries, and externally consumable services in use.
  - Reduce unused components
  - In EC2 you can create your own AMIs simplifying the process with <kbd>EC2 Image Builder</kbd>. When using containers implement <kbd>ECR Image Scanning</kbd>
  - Using third-party static code analysis tools, you can identify common security issues. You can use <kbd>Amazon CodeGuru</kbd> for supported languages. Dependency checking tools can also be used to determine whether libraries your code links against are the latest versions, are themselves free of CVEs, and have licensing conditions that meet your software policy requirements.
  - Using <kbd>Amazon Inspector</kbd>, you can perform configuration assessments against your instances for known common vulnerabilities and exposures (CVEs), assess against security benchmarks and automate the notification of defects
- **Enable people to perform actions at a distance**: Removing the ability for interactive access reduces the risk of human error, and the potential for manual configuration or management.
  - For example, use a change management workflow to manage EC2 instances using tools such as <kbd>AWS Systems Manager</kbd> instead of allowing direct access, or via a bastion host.
  - <kbd>AWS CloudFormation</kbd> stacks build from pipelines and can automate your infrastructure deployment and management tasks without using the AWS Management Console or APIs directly.
- **Implement managed services**: Implement services that manage resources, such as Amazon RDS, AWS Lambda, and Amazon ECS, to reduce your security maintenance tasks as part of the shared responsibility model. This means you have more free time to focus on securing your application
- **Validate software integrity**: Implement mechanisms (e.g. code signing) to validate that the software, code, and libraries used in the workload are from trusted sources and have not been tampered with. You can use <kbd>AWS Signer</kbd>
- **Automate compute protection**: Automate your protective compute mechanisms including vulnerability management, reduction in attack surface, and management of resources. The automation will help you invest time in securing other aspects of your workload, and reduce the risk of human error.

### 5. Data protection

> Before architecting any workload, foundational practices that influence security should be in place:
>
> - **data classification** provides a way to categorize organizational data based on criticality and sensitivity in order to help you determine appropriate protection and retention controls
> - **encryption** protects data by way of rendering it unintelligible to unauthorized access
{: .prompt-info }

These methods are important because they support objectives such as preventing mishandling or complying with regulatory obligations.

#### 5.1. Data Classification

- **Identify the data within your workload**: You need to understand the type and classification of data your workload is processing, the associated business processes, data owner, applicable legal and compliance requirements, where it’s stored, and the resulting controls that are needed to be enforced.
- **Define data protection controls**: By using <kbd>resource tags</kbd>, separate AWS accounts per sensitivity, <kbd>IAM policies, Organizations SCPs, AWS KMS, and AWS CloudHSM</kbd>, you can define and implement your policies for data classification and protection with encryption.
- **Define data lifecycle management**: Your defined lifecycle strategy should be based on sensitivity level as well as legal and organizational requirements. Aspects including the duration for which you retain data, data destruction processes, data access management, data transformation, and data sharing should be considered.
- **Automate identification and classification**: Automating the identification and classification of data can help you implement the correct controls. Using automation for this instead of direct access from a person reduces the risk of human error and exposure. You should evaluate using a tool, such as <kbd>Amazon Macie</kbd>, that uses machine learning to automatically discover, classify, and protect sensitive data in AWS.

#### 5.2. Protecting data at rest

Data at rest represents any data that you persist in non-volatile storage for any duration in your workload. This includes block storage, object storage, databases, archives, IoT devices, and any other storage medium on which data is persisted. Protecting your data at rest reduces the risk of unauthorized access when encryption and appropriate access controls are implemented.

Encryption and tokenization are two important but distinct data protection schemes.

- **Tokenization** is a process that allows you to define a token to represent an otherwise sensitive piece of information.
- **Encryption** is a way of transforming content in a manner that makes it unreadable without a secret key necessary to decrypt the content back into plaintext.

Best practices:

- **Implement secure key management**: By defining an encryption approach that includes the storage, rotation, and access control of keys, you can help provide protection for your content against unauthorized users and against unnecessary exposure to authorized users.
  - <kbd>AWS KMS</kbd> helps you manage encryption keys and integrates with many AWS services. This service provides durable, secure, and redundant storage for your AWS KMS keys.
  - <kbd>AWS CloudHSM</kbd> is a cloud-based hardware security module (HSM) that enables you to easily generate and use your own encryption keys in the AWS Cloud.
- **Enforce encryption at rest**: You should ensure that the only way to store data is by using encryption. You can use <kbd>AWS Managed Config Rules</kbd> to check automatically that you are using encryption, for example, for EBS volumes, RDS instances, and S3 buckets.
- **Enforce access control**: Different controls including access (using least privilege), backups (see Reliability whitepaper), isolation, and versioning can all help protect your data at rest.
  - Access to your data should be audited using detective mechanisms like <kbd>CloudTrail</kbd> and service level log
  - You should inventory what data is publicly accessible, and plan for how you can reduce the amount of data available over time. <kbd>Amazon S3 Glacier Vault Lock</kbd> and <kbd>S3 Object Lock</kbd> are capabilities providing mandatory access control—once a vault policy is locked with the compliance option, not even the root user can change it until the lock expires
- **Audit the use of encryption keys**: Ensure that you understand and audit the use of encryption keys to validate that the access control mechanisms on the keys are appropriately implemented. For example, any AWS service using an AWS KMS key logs each use in AWS CloudTrail. You can then query <kbd>AWS CloudTrail</kbd>, by using a tool such as <kbd>Amazon CloudWatch Insights</kbd>, to ensure that all uses of your keys are valid.
- **Use mechanisms to keep people away from data**: Keep all users away from directly accessing sensitive data and systems under normal operational circumstances.
  - For example, use a change management workflow to manage EC2 instances using tools instead of allowing direct access or a bastion host. This can be achieved using <kbd>AWS Systems Manager Automation</kbd>, which uses automation documents that contain steps you use to perform tasks. These documents can be stored in source control, be peer-reviewed before running, and tested thoroughly to minimize risk compared to shell access.
  - Business users could have a dashboard instead of direct access to a data store to run queries.
  - Where CI/CD pipelines are not used, determine which controls and processes are required to adequately provide a normally disabled break-glass access mechanism.
- **Automate data at rest protection**: Use automated tools to validate and enforce data at rest controls continuously, for example, verify that there are only encrypted storage resources.
  - You can automate validation that all EBS volumes are encrypted using <kbd>AWS Config Rules</kbd>.
  - <kbd>AWS Security Hub</kbd> can also verify a number of different controls through automated checks against security standards. Additionally, your AWS Config Rules can automatically remediate non-compliant resources.

#### 5.3. Protecting data in transit

Data in transit is any data that is sent from one system to another. This includes communication between resources within your workload as well as communication between other services and your end-users. By providing the appropriate level of protection for your data in transit, you protect the confidentiality and integrity of your workload’s data.

Best practices:

- **Implement secure key and certificate management**: Store encryption keys and certificates securely and rotate them at appropriate time intervals with strict access control. The best way to accomplish this is to use a managed service, such as <kbd>AWS Certificate Manager (ACM)</kbd>. It lets you easily provision, manage, and deploy public and private Transport Layer Security (TLS) certificates for use with AWS services and your internal connected resources.
- **Enforce encryption in transit**: AWS services provides HTTPS endpoints using TLS for communication, thus providing encryption in transit when communicating with the AWS APIs.
  - Insecure protocols, such as HTTP, can be **audited** and blocked in a VPC through the use of security groups.
  - HTTP requests can also be automatically **redirected** to HTTPS in Amazon CloudFront or on an Application Load Balancer.
  - Additionally, you can use VPN connectivity into your VPC from an external network to facilitate encryption of traffic. Third-party solutions are available in the AWS Marketplace if you have special requirements.
- **Authenticate network communications**: Using network protocols (TLS/IPsec) that support authentication allows for trust to be established between the parties adding encryption to reduce the risk of communications being altered or intercepted.
- **Automate detection of unintended data access**: Use tools such as
  - <kbd>Amazon GuardDuty</kbd> automatically detects suspicious activity or attempts to move data outside of defined boundaries.
  - <kbd>Amazon VPC Flow Logs</kbd> to capture network traffic information can be used with <kbd>Amazon EventBridge</kbd> to trigger the detection of abnormal connections–both successful and denied.
  - <kbd>S3 Access Analyzer</kbd> can help assess what data is accessible to who in your S3 buckets.
- **Secure data from between VPC or on-premises locations**: You can use <kbd>AWS PrivateLink</kbd> to create a secure and private network connection between Amazon Virtual Private Cloud (Amazon VPC) or on-premises connectivity to services hosted in AWS.
  - You can access AWS services, third-party services, and services in other AWS accounts as if they were on your private network.
  - With AWS PrivateLink, you can access services across accounts with overlapping IP CIDRs without needing an Internet Gateway or NAT.
  - You also do not have to configure firewall rules, path definitions, or route tables.
  - Traffic stays on the Amazon backbone and doesn’t traverse the internet, therefore your data is protected.

### 6. Incident response

> Incident Response helps customers define and execute a response to security incidents.
{: .prompt-info }

#### 6.1. Design Goals of Cloud Response

- **Establish response objectives**: Some common goals include containing and mitigating the issue, recovering the affected resources, and preserving data for forensics, and attribution.
- **Document plans**: Create plans to help you respond to, communicate during, and recover from an incident.
- **Respond using the cloud**
- **Know what you have and what you need**: Preserve logs, snapshots, and other evidence by copying them to a centralized security cloud account.
- **Use redeployment mechanisms**: when possible, and make your response mechanisms safe to execute more than once and in environments in an unknown state.
- **Automate where possible**: As you see issues or incidents repeat and build mechanisms that programmatically triage and respond to common situations. Use human responses for unique, new, and sensitive incidents.
- **Choose scalable solutions**: reduce the time between detection and response.
- **Learn and improve your process**: When you identify gaps in your process, tools, or people, and implement plans to fix them. Simulations are safe methods to find gaps and improve processes.

In AWS, there are several different approaches you can use when addressing incident response.

- **Educate** your security operations and incident response staff about cloud technologies and how your organization intends to use them.
  - Development Skills: programming, source control, version control, CI/CD processes
  - AWS Services: security services
  - Application Awareness
  - The best way to learn is hands-on, through running incident response game days
- **Prepare** your incident response team
  - to detect and respond to incidents in the cloud,
  - enable detective capabilities,
  - and ensure appropriate access to the necessary tools and cloud services.
  - Additionally, prepare the necessary runbooks, both manual and automated, to ensure reliable and consistent responses.
  - Work with other teams to establish expected baseline operations, and use that knowledge to identify deviations from those normal operations.
- **Simulate** both expected and unexpected security events within your cloud environment to understand the effectiveness of your preparation.
- **Iterate** on the outcome of your simulation to improve the scale of your response posture, reduce time to value, and further reduce risk.

---

## AWS Security checklist

> This is a whitepaper of AWS that provides customer recommendations that align with the Well-Architected Framework Security Pillar. It is available [here](https://d1.awsstatic.com/whitepapers/Security/AWS_Security_Checklist.pdf?did=wp_card&trk=wp_card){:target="_blank"}.
{: .prompt-info }

### 1. Identity and Access Management

- [ ] **Secure your AWS Account**
  - [ ] Use [AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html#features){:target="_blank"}
  - [ ] Use the [root user with MFA](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa){:target="_blank"}
  - [ ] Configure [account contacts](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts.html){:target="_blank"}
- [ ] **Rely on centralized identity provider**
  - [ ] Centralize identities using either [AWS Single Sign-On](https://aws.amazon.com/single-sign-on/getting-started/){:target="_blank"} or a third-party provider to avoid routinely creating IAM users or using long-term access keys—this approach makes it easier to manage multiple AWS accounts and federated applications
- [ ] **Use multiple AWS accounts**
  - [ ] Use of [Service Control Policies](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples.html){:target="_blank"} to implement guardrails
  - [ ] [AWS Control Tower](https://aws.amazon.com/controltower/?control-blogs.sort-by=item.additionalFields.createdDate&control-blogs.sort-order=desc){:target="_blank"} can help you easily set up and govern a multi-account AWS environment
- [ ] **Store and use secrets securely**
  - [ ] Use AWS Secrets Manager if you cannot use temporary credentials

### 2. Detection

- [ ] **Enable foundational services** for all AWS accounts
  - [ ] [AWS CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-receive-logs-from-multiple-accounts.html){:target="_blank"} to log API activity
  - [ ] [Amazon GuardDuty](https://aws.amazon.com/guardduty/){:target="_blank"} for continuous monitoring
  - [ ] [AWS Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html){:target="_blank"} for a comprehensive view of your security posture
- [ ] **Configure service and application-level logging**
  - [ ] In addition to your application logs, enable logging at the service level, such as Amazon [VPC Flow Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html){:target="_blank"} and [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerLogs.html){:target="_blank"}, CloudTrail, and Elastic Load Balancer access logging, to gain visibility into events
  - [ ] Configure logs to flow to a central account, and protect them from manipulation or deletion
- [ ] **Configure monitoring and alerts, and investigate events**
  - [ ] Enable AWS Config to track the history of resources
  - [ ] Enable Config Managed Rules to automatically alert or remediate undesired changes
  - [ ] Configure alerts for all your sources of logs and events, from AWS CloudTrail to Amazon GuardDuty and your application logs,  for high-priority events and investigate

### 3. Infrastructure protection

- [ ] **Patch your operating system, applications, and code**
  - [ ] Use [AWS Systems Manager Patch Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-patch.html){:target="_blank"} to automate the patching process of all systems and code for which you are responsible, including your OS, applications, and code dependencies
- [ ] **Implement distributed denial-of-service (DDoS) protection for your internet-facing resources**
  - [ ] Use [Amazon Cloudfront](https://aws.amazon.com/cloudfront/){:target="_blank"}, [AWS WAF](https://aws.amazon.com/waf/){:target="_blank"} and [AWS Shield](https://aws.amazon.com/shield/){:target="_blank"} to provide layer 7 and layer 3/layer 4 DDoS protection
- [ ] C**ontrol access using VPC Security Groups and subnet layers**
  - [ ] Use [security groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html){:target="_blank"} for controlling inbound and outbound traffic, and automatically apply rules for both security groups and WAFs using [AWS Firewall Manager](https://aws.amazon.com/firewall-manager/){:target="_blank"}
  - [ ] Group different resources into different subnets to create routing layers, for example, database resources do not need a route to the internet

### 4. Data protection

- [ ] **Protect data at rest**
  - [ ] Use [AWS Key Management Service (KMS)](https://aws.amazon.com/kms/){:target="_blank"} to protect data at rest across a wide range of AWS services and your applications
  - [ ] Enable default encryption for [Amazon EBS volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#encryption-by-default){:target="_blank"}, and [Amazon S3 buckets](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html){:target="_blank"}
- [ ] **Encrypt data in transit**
  - [ ] Enable encryption for all network traffic, including Transport Layer Security (TLS) for web-based network infrastructure you control using [AWS Certificate Manager](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html){:target="_blank"} to manage and provision certificates
- [ ] **Use mechanisms to keep people away from data**
  - [ ] Keep all users away from directly accessing sensitive data and systems. For example, provide an [Amazon QuickSight dashboard](https://aws.amazon.com/quicksight/){:target="_blank"} to business users instead of direct access to a database, and perform actions at a distance using [AWS Systems Manager automation documents](https://aws.amazon.com/systems-manager/){:target="_blank"} and [Run Command](https://docs.aws.amazon.com/systems-manager/latest/userguide/execute-remote-commands.html){:target="_blank"}

### 5. Incident response

- [ ] **Ensure you have an incident response (IR) plan**
  - [ ] Begin your [IR plan](https://docs.aws.amazon.com/whitepapers/latest/aws-security-incident-response-guide/welcome.html){:target="_blank"} by building runbooks to respond to unexpected events in your workload
- [ ] **Make sure that someone is notified to take action on critical findings**
  - [ ] Begin with [GuardDuty findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html){:target="_blank"}. Turn on GuardDuty and ensure that someone with the ability to take action receives the notifications. Automatically creating trouble tickets is the best way to ensure that GuardDuty findings are integrated with your operational processes
- [ ] **Practice responding to events**
  - [ ] Simulate and practice incident response by running regular game days, incorporating the lessons learned into your incident management plans, and continuously improving them

---

{% include comments.md %}

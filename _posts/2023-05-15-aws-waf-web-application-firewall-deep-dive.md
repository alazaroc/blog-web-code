---
layout: post
title: 'AWS WAF (Web Application Firewall): Deep Dive'
date: 2023-05-19 19:41 +0200
last_modified_at:
lang: en
lang-exclusive: ['en']
description: Learn how AWS WAF helps protect your web applications from malicious attacks with its agile protection, ease of deployment and maintenance, cost-effectiveness, and scalability.
category:
- Security
tags:
- security
- waf
- deep-dive
- level-300
level: 300
published: true
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2023-05-15-aws-waf-web-application-firewall-deep-dive/
image:
  path: waf_icon.png
  header_post: false
---
---

## 1. Introduction

A Web Application Firewall (WAF) is a security solution that `protects web applications` from malicious attacks, such as cross-site scripting, SQL injection, and malicious bot traffic. WAF is typically deployed as a reverse proxy, sitting between the internet and the web application, to inspect and filter incoming requests before they reach the web server.

![waf-basic](waf-basic.png){:class="border"}

### 1.1. How WAF Works

WAF works by analyzing incoming `HTTP and HTTPS` requests to a web application and allows or blocks requests based on pre-defined security rules. Security rules can be based on IP addresses, headers, parameters, and other attributes of the request. WAF can also perform Deep Packet Inspection (DPI) to inspect the contents of the request payload and determine if the request contains malicious content.

If a request violates a security rule, the WAF blocks the request and returns an error response to the client.

### 1.2. AWS WAF

AWS WAF is a popular choice for cloud-based WAF solutions, providing a comprehensive set of security rules to protect web applications.

AWS WAF (Web Application Firewall) is a cloud-based service that protects your web applications, defending against common web exploits that could impact availability, compromise security, or consume excessive resources. It enables you to control access to your web content and provides customizable security rules to filter traffic based on IP addresses, HTTP headers, HTTP body content, or URI strings.

Here's a visual representation of the basic architecture of AWS WAF:

![waf-0](waf-0.png){:class="border"}

### 1.3. Protected resources

You can protect the following resource types:

- Amazon CloudFront distribution
- Amazon API Gateway REST API
- Application Load Balancer
- AWS AppSync GraphQL API
- Amazon Cognito user pool
- AWS App Runner service
- AWS Verified Access instance

### 1.4. Main components

The main components of AWS WAF include the following:

- **Rules**: AWS WAF allows you to create rules that define the types of traffic you want to allow or block from reaching your web applications. You can create rules based on various conditions such as IP addresses, HTTP headers, URI strings, and HTTP body content.

- **Managed Rule Groups**: AWS WAF provides pre-built managed rule groups that offer protection against common web attacks such as SQL injection, cross-site scripting (XSS), and more. These rule groups are created and maintained by AWS and updated regularly to ensure they provide up-to-date protection against the latest threats.

- **Web ACLs**: AWS WAF uses web ACLs (Web Access Control Lists) to group together rules that you can then apply to one or more web applications. Web ACLs allow you to apply a set of rules across multiple web applications, making it easier to manage and apply security policies consistently.

### 1.5. Benefits and features

AWS WAF offers a wide range of `benefits and features`, empowering you to secure your web applications effectively. Here are some key advantages of using AWS WAF:

- **Agile protection against web attacks**: AWS WAF rule propagation and updates take just under a minute, enabling you to react faster when you are under an attack or when security issues arise.

- **Ease of deployment and maintenance**: AWS WAF is easy to deploy and protects application(s) deployed on either Amazon CloudFront, the Application Load Balancer, or Amazon API Gateway. There is no additional software to deploy, DNS configuration, or SSL/TLS certificate to manage.

- **Cost-effective**: AWS WAF is a pay-as-you-go service, which means you only pay for the resources you use. This makes it a cost-effective solution for securing your web applications.

- **Improved web traffic visibility**: AWS WAF gives near real-time visibility into your web traffic, which you can use to create new rules or alerts in Amazon CloudWatch.

- **Scalability**: AWS WAF is designed to handle high volumes of traffic and can scale automatically to meet the demands of your web applications.

- **Flexibility**: AWS WAF provides a wide range of options for creating custom rules to filter traffic, giving you greater flexibility in defining your security policies.

## 2. Hands-on with AWS WAF

First of all, you must know that AWS WAF is a regional service. However, it seems a global service when you access it, but you have to change between regions using this option:

![waf-regional](waf-regional.png){:class="border"}

Getting started with WAF is relatively straightforward, simply log in to the AWS Management Console and navigate to the AWS WAF service. From there, you can create a new WAF policy and configure the policy with the desired security rules.

- Step 1: Describe web ACL and associate it to AWS resources
    ![waf-1](waf-1.png){:class="border"}

- Step 2: Add rules and rule groups
    ![waf-2](waf-2.png){:class="border"}

- Step 3:Set rule priority
    ![waf-3](waf-3.png){:class="border"}

- Step 4: Configure metrics
    ![waf-4](waf-4.png){:class="border"}

- Step 5: Review and create web ACL
    ![waf-5](waf-5.png){:class="border"}
    ![waf-6](waf-6.png){:class="border"}

### 2.1. Enabling logs

Logs are disabled by default, so we have to enable it. We have to enter the Web ACL created and access to `Logging and Metrics` tab:
    ![waf-8](waf-8.png){:class="border"}

As you can check in the following image We will have 3 options as `Logging Destination` (CloudWatch Logs Groups, Kinesis Data Firehose stream and S3 bucket):
    ![waf-9](waf-9.png){:class="border"}

After enabling CloudWatch logs, we can access the `CloudWatch Log Insights` tab and execute sample queries or create custom queries to analyze the logs. We can see the results as logs or in a diagram (Visualization):
    ![waf-10](waf-10.png){:class="border"}

### 2.2. Metrics

AWS WAF reports `metrics` to CloudWatch in one-minute intervals by default, and the metrics are retained for 2 weeks.

The metrics monitored are the following:

- AllowedRequests
- BlockedRequests
- CountedRequests
- PassedRequests

These metrics provide a SUM count of web requests that hit a specific Rule or Web ACL.

![waf-metrics](waf-metrics.png){:class="border"}

### 2.3. Create custom alarms

Usually is a good idea to create some alarms to be notified if some block requests appear on our web, so we can configure a `CloudWatch Alarm`.

The easy way to create the alarm is through the AWS WAF Metric for `BlockedRequests`. There we have a direct link to create one alarm with this associated metric if we access `Graphed Metrics`` and select the indicated icon in red color:

![waf-alarm-1](waf-alarm-1.png){:class="border"}

After the creation, we will have something like this:

![waf-alarm-2](waf-alarm-2.png){:class="border"}

### 2.4. Estimating Costs

The cost of AWS WAF can vary depending on the scale of your deployment, ranging `from a few dollars` per month for small deployments `to several thousand dollars per month` for large-scale deployments. AWS WAF pricing is based on the number of web requests processed and the number of security rules that are used.

Example of cost for our example (1 Web ACL with a few managed rules):

- $5.00 per web ACL per month (prorated hourly) * 1 web ACL = $5.00
- $1.00 per rule per month (prorated hourly) * 5 rules = $1.00
- $0.60 per million requests processed * 1 (we will assume 1 million request) = $0.60
- $0.10 per alarm metric * 1 alarm = $0.10

Total: **$6.70 per month**

## 3. More Information about AWS WAF

For more information about AWS WAF, you can visit the following links

- AWS WAF (Developer Guide): [https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html](https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html){:target="_blank"}
- Security Automations for AWS WAF: [https://aws.amazon.com/solutions/implementations/security-automations-for-aws-waf/](https://aws.amazon.com/solutions/implementations/security-automations-for-aws-waf/){:target="_blank"}
- WAF FAQs: [https://aws.amazon.com/waf/faqs/](https://aws.amazon.com/waf/faqs/){:target="_blank"}

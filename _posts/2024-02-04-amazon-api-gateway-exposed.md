---
layout: post
title: 'Amazon API Gateway exposed: choosing the right endpoint strategy for your API'
date: 2024-02-04 13:42 +0100
last_modified_at:
lang: en
lang-exclusive: ['en']
description: This guide explores Amazon API Gateway's endpoint exposure options, detailing their implementation, advantages, use cases, architectural impacts, limitations, troubleshooting, costs and more.
category: Serverless
tags:
- serverless
- api-gateway
- level-300
level: 300
published: true
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2024-02-04-amazon-api-gateway-exposed/
image:
  path: apigateway-default.png
  header_post: false
---
---

## 1. Introduction

You already know what an API (**A**pplication **P**rogramming **I**nterface) is, [what is Amazon API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html){:target="_blank"}, [when choosing between REST and HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html){:target="_blank"}, and have experience and don't need [tutorials or workshops](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-tutorials.html){:target="_blank"}.

I need not remind you of the `advantages` of using Amazon API Gateway (scalability, security, performance, lifecycle management, etc.) or the most common `use cases` (serverless architectures, microservices, data retrieval, etc.).

Then, we can just enter the details of the options for exposing API Gateway.

We will compare the following options:

1. Standard Endpoint URL: ```https://{api-id}.execute-api.{region}.amazonaws.com/{stage}/count```
2. Custom Domain Names: ```https://{subdomain}.{custom-domain}.com/count```
3. Integration with Amazon CloudFront:
   - Using CloudFront autogenerated DNS: `https://{random-name}.cloudfront.net`
   - Using our custom domain: ```https://{custom-domain}.com/{optional-level}/count```
4. Private Endpoints (VPC Integration):
   - Invoking your private API using private DNS names: same as Standard Endpoint URL
   - Accessing your private API using a Route53 alias: ```https://{api-id}-{vpce-id}.execute-api.{region}.amazonaws.com/{stage}/count```
   - Invoking your private API using endpoint-specific public DNS hostnames: ```https://{public-dns-hostname}.execute-api.{region}.vpce.amazonaws.com/{stage}```
   - [Here](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-api-test-invoke-url.html){:target="_blank"} you have more information.

> For the `Integration with CloudFront` option, I will assume we are also using our own domain.
{: .prompt-warning }

## 2. Detailed Overview of Amazon API Gateway Endpoint Exposing Options

1. Standard Endpoint URL
   - Description: This is the `default configuration`. There are 2 API endpoint types related to this option: regional and edge-optimized.
     - When you deploy an edge-optimized API, API Gateway sets up an `Amazon CloudFront distribution` and a DNS record to map the API domain name to the CloudFront distribution domain name. However, you can't configure it.
   - Architectural Impact: Standard endpoints are quick to implement, facilitating agile development. However, they offer limited control over network routing and performance optimizations.
   - Diagram:
     - ![apigateway-default](apigateway-default.png)

2. Custom Domain Names
   - Description: Custom domain names are `simpler and more intuitive URLs` that you can provide to your API users. A domain that is easy to remember and relevant to your API's purpose can significantly enhance user experience and API discoverability. Additionally, it simplifies the process of updating and maintaining APIs, as the endpoint remains constant even if the backend changes.
   - Architectural Impact: Requires additional DNS configuration and SSL/TLS certificates, introducing complexity in domain management but significantly enhancing API discoverability and trustworthiness. It enables a consistent entry point for APIs despite underlying changes.
   - Diagram:
     - ![apigateway-custom-domain](apigateway-custom-domain.png)

3. Integration with CloudFront
   - Description: By integrating API Gateway with CloudFront, `APIs benefit from CDN capabilities`, including improved global distribution and caching.
   - Architectural Impact: This approach enhances API performance and availability by leveraging CloudFront's distributed network of edge locations. It involves a more complex setup but offers robust security features and efficient handling of high-traffic volumes.
   - Diagram:
     - ![apigateway-cloudfront](apigateway-cloudfront.png)

4. Private Endpoints (VPC Integration)
   - Description: Private endpoints `restrict API access within an AWS Virtual Private Cloud` (VPC), enhancing security for internal APIs.
   - Architectural Impact: Requires a VPC endpoint and it is ideal for microservices architecture within a VPC, ensuring that API traffic does not traverse the public internet. This setup supports enhanced security protocols and network isolation but limits accessibility to internal users or services.
   - Diagram:
     - ![apigateway-private](apigateway-private.png)

## 3. Advantages and Disadvantages

1. Standard Endpoint URL
   - Advantages:
     - `Ease of Use`: Quick and straightforward to set up with no additional configurations needed.
     - `Cost-Effective`: Generally lower costs due to the basic API Gateway pricing model.
   - Limitations:
     - `Lacks branding and customization`, not ideal for production-grade APIs.
     - `Endpoint's volatility`; recreating a resource results in a new URL, complicating continuous integration and necessitating updates in client applications or services to reflect the change.

2. Custom Domain Names
   - Advantages:
     - `Branding`: Enhances the professional appearance and memorability of your API.
     - `Consistency`: Keeps the endpoint constant, which simplifies API updates and management.
     - `User Experience`: A memorable and relevant domain improves user interaction with the API.
   - Limitations:
     - `Requires domain registration and SSL certificate management`. Slightly more complex setup process.

3. Integration with CloudFront
   - Advantages:
     - `Same advantages that Custom Domain Names` (because we are using our custom domain with CloudFront):
       - Branding: Enhances the professional appearance and memorability of your API.
       - Consistency: Keeps the endpoint constant, which simplifies API updates and management.
       - User Experience: A memorable and relevant domain improves user interaction with the API.
     - `Global Performance`: Reduces latency significantly, enhancing global user experience.
     - `Advanced Control`: Offers granular control over caching, security policies, and distribution settings.
     - `Security Enhancement`: Improves security posture with CDN benefits.
     - `CORS Mitigation`: Simplifies the handling of CORS issues by managing them through CloudFront, thus avoiding common problems associated with CORS policy enforcement at the API Gateway level.
   - Limitations:
     - `Requires domain registration and SSL certificate management`. Slightly more complex setup process.
     - `More complex setup and management`. Requires understanding of CloudFront configurations.
     - `Higher costs` associated with CloudFront usage

4. Private Endpoints (VPC Integration)
   - Advantages:
     - `Network isolation`: Restricts API access within a specified VPC, increasing data privacy and compliance.
     - `Enhanced security` by keeping traffic within the AWS network.
   - Limitations:
     - `Private`. Not accessible from outside the VPC.
     - Requires `additional setup` for VPC and endpoint configuration

## 4. Use case & real-world scenario

1. Standard Endpoint URL
   - Use Case: Ideal for `quick deployments and testing purposes`.
   - Real-World Scenario: A startup quickly prototyping its API backend using standard endpoints to test various features without needing custom domain setups. This approach allows for rapid iterations and effective stage management.

2. Custom Domain Names
   - Use Case: Essential for `public-facing APIs where branding is important`. Enhances professional appearance and memorability.
   - Real-World Scenario: An e-commerce company uses custom domains for its API to ensure a consistent brand experience across its digital platform, improving customer trust and recognition.

3. Integration with CloudFront
   - Use Case:
     - Public-facing APIs where branding is important.
     - `Performance and fine-grained control over content delivery are crucial`.
     - Avoid [CORS](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html){:target="_blank"}.
   - Real-World Scenario:
     - A technical blog (mine) deployed on Amazon S3 using a SPA approach where the CORS was a problem in the past and I wanted to remove them and also improve the solution.
     - A media streaming service uses CloudFront with API Gateway to distribute content globally, reducing latency and improving viewer experience.

4. Private Endpoints (VPC Integration)
   - Use Case: Ideal for `internal APIs and microservices` that should not be exposed publicly.
   - Real-World Scenario: A financial institution leverages private endpoints for secure internal communication between services, ensuring data privacy and compliance.

## 5. Implementation Details for Exposing Amazon API Gateway Endpoints

In this section, we will review the implementation steps of each option:

1. Standard Endpoint URL
   1. Create API in API Gateway: Choose either HTTP or REST API and configure it according to your requirements.
   2. Deploy API to a Stage: Set up stages like dev, test, or prod. Deploy your API to these stages.
   3. Access the API: Use the provided default URL to access your API.

2. Custom Domain Names
   1. Register a Domain: Use services like AWS Route 53 or any other domain registrar.
   2. Obtain an SSL Certificate: Get a certificate from AWS Certificate Manager (ACM) for HTTPS connections.
   3. Configure Custom Domain in API Gateway: Under the 'Custom Domain Names' section in API Gateway, configure your domain. Associate it with a specific API and stage.
   4. DNS Configuration: Configure the DNS settings in your domain registrar to point to the API Gateway endpoint.
   5. Deployment: Deploy your API to apply these changes.

3. Integration with CloudFront
   1. Create a CloudFront Distribution: In the AWS CloudFront console, create a new distribution.
   2. Set API Gateway as Origin: Use your API Gateway endpoint as the origin. The 'origin path' should be your {stage}.
   3. Create a behavior.
      - Path pattern: '/api/*'. Then, you have to create a first resource in your API with the name 'api' and then include there your other resources. Example: '/api/count', '/api/contact', ...
      - Origin and origin groups: the API Gateway origin defined in the previous step
      - Cache key and origin requests: Cache policy and origin request policy (recommended).
        - Cache policy: CachingDisabled
        - Origin request policy: UserAgentRefererHeaders or AllViewExceptHostHeader.
   4. Deploy Distribution: After configuration, deploy the distribution to make it active.

4. Private Endpoints (VPC Integration)
   1. Create a VPC Endpoint: In the VPC console, create a new VPC endpoint for API Gateway.
   2. Set Up Private API in API Gateway: Configure your API to be private and associate it with your VPC endpoint.
   3. Control Access: Use VPC endpoint policies to manage access to the API within your VPC.

## 6. Cost

1. Standard URL:
   - Generally, the `lowest cost` as it uses the basic API Gateway pricing model.
   - Costs are primarily based on the number of API calls and data transfers.

2. Custom Domain:
   - Involves additional costs for domain registration and SSL certificate (if not using AWS Certificate Manager, which offers free SSL certificates).
   - The API Gateway pricing still applies.

3. CloudFront Integration:
   - Additional costs for CloudFront, are primarily based on data transfer and request numbers. CloudFront can incur higher costs for heavy traffic.
   - Standard API Gateway charges also apply.

4. Private Endpoint (VPC):
   - Costs for VPC endpoint usage.
   - Standard API Gateway charges.
   - Potentially lower data transfer costs within the AWS network but additional costs for VPC endpoints.

## 7. More information

1. Standard Endpoint URL
   - Troubleshooting Tips: Ensure the API is deployed to the stage after any change. If experiencing latency, consider the region of deployment versus user location.
   - Resources: [AWS Documentation on API Gateway Stages](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html){:target="_blank"}.

2. Custom Domain Names
   - Troubleshooting Tips: Verify DNS settings and SSL certificate validity if encountering access issues.
   - Resources: [AWS Documentation on Custom Domain Names](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html?icmpid=apigateway_console_help){:target="_blank"}.

3. Integration with CloudFront
   - Troubleshooting Tips: Check CloudFront distribution settings and origin configurations for any discrepancies. For CORS-related issues, ensure that CloudFront is correctly configured to add the necessary headers to responses.
   - Resources: [AWS Documentation on CloudFront](https://repost.aws/knowledge-center/api-gateway-cloudfront-distribution){:target="_blank"}.

4. Private Endpoints (VPC Integration)
   - Troubleshooting Tips: Confirm VPC endpoint service configurations and network ACLs if facing connectivity issues.
   - Resources: [AWS Documentation on VPC Endpoints](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-apis.html){:target="_blank"}.

## 8. Conclusion

Utilizing Amazon API Gateway, particularly with custom domains and CloudFront, offers a robust framework for deploying and managing APIs. These services not only enhance the performance and security of your APIs but also offer scalability and ease of management. The integration of custom domains provides a branded and professional touch, while CloudFront also ensures global reach and low latency.

Experimenting with these features and following the best practices can significantly optimize your API strategies. AWS provides a flexible and powerful platform, and leveraging its full potential can transform how you manage and deploy APIs. Embrace these tools to take your API solutions to the next level.

Finally, as a conclusion, here you have a comparison table between all the options:

| Feature/Option               | Standard URL | Custom Domain | CloudFront Integration | Private Endpoint (VPC) |
|------------------------------|--------------|---------------|------------------------|------------------------|
| Global Accessibility         | Yes          | Yes           | Yes                    | No                     |
| Custom Branding              | No           | Yes           | Yes                    | No                     |
| Performance Optimization     | Basic        | Basic         | Advanced               | Basic                  |
| Security                     | Standard     | Enhanced with SSL | Enhanced with CDN Security | Enhanced within VPC   |
| Setup Complexity             | Low          | Medium        | High                   | Medium                 |
| Ideal Use Case               | Testing/Development | Public APIs, Branding | High-traffic APIs, Global Users, CORS mitigation | Internal APIs, Secure Environments |
| Cost Implications            | Low          | Medium        | Medium-High            | Medium-High            |

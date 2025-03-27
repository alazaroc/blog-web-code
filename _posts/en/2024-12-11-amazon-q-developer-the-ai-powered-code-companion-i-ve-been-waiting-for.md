---
layout: post
title: 'Amazon Q Developer: The AI-Powered Code Companion You Have Been Waiting For'
date: 2024-12-11 18:27 +0100
last_modified_at:
lang: en
lang-exclusive: ['en','es']
description: Amazon Q Developer is an advanced AI-powered tool designed to assist AWS developers. It offers seamless code suggestions, transformations, testing, and documentation directly in IDEs. This article demonstrates its practical applications while addressing security, privacy, and ease of use.
category: Generative AI
tags:
- level-300
- "q-developer"
- "generative-ai"
published: true
level: 300
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2024-12-11-amazon-q-developer-the-ai-powered-code-companion-i-ve-been-waiting-for/
image:
  path: cover.jpg
  header_post: false
---
---

## 1. Introduction

For months, I tried different generative AI tools in my IDE, but none felt AWS-oriented or fully integrated. I have tested five other generative AI tools in my IDE, but none felt truly AWS-oriented or integrated, `until now`.

In this post, I will show you `how Amazon Q can enhance your productivity`, from chatting about code and inline suggestions to advanced code transformations and automated test generation. I will also tackle the big question: what happens to your code when using a generative AI service like this? And yes, I will show you actual examples using one of my own public GitHub repositories, [appsync-website-mutation](https://github.com/alazaroc/appsync-website-mutation){:target="_blank"}, so you can see how effortless it is to get started.

This post focuses on `Amazon Q Developer`, but first, let me provide some context.

### 1.1. Amazon Q one year ago

Amazon Q was announced one year ago, at re:Invent 2023 (held in the last week of November 2023), as an `AI-powered assistant designed to help developers and IT professionals build, deploy, and manage applications and workloads on AWS`.

While its potential was evident, my initial experience left me feeling that it had been released prematurely. It felt incomplete and not yet suitable for real uses cases of the daily workflows.

Now, one year later, at re:Invent 2024 (held in the first week of December 2024), `AWS presented Amazon Q renewed and ready to be used`. I have tested it, and now I can confidently say it is now a valuable addition to any developer's toolkit. This is the main reason for this post.

### 1.2. Amazon Q: Amazon Q Developer + Amazon Q Business

Built on Amazon Bedrock and leveraging 17 years of AWS expertise, Amazon Q encompasses both Amazon Q Developer for software development tasks and Amazon Q Business for enhancing enterprise productivity. It draws from AWS documentation, best practices, and real-world examples, making it a reliable and comprehensive AI assistant.

#### 1.2.1. Amazon Q Developer

- `Specifically designed for software developers`
- Focuses on coding and development tasks
- Key features include:
  - Code chat and assistance
  - Inline code completions
  - New code generation
  - Security vulnerability scanning
  - Code upgrades and improvements
  - Debugging and optimization suggestions
  - AWS architecture and resource guidance
- Available through IDEs and development environments

#### 1.2.2. Amazon Q Business

- `Designed for enterprise use across organizations`
- Focuses on business operations and productivity
- Key features include:
  - Provides answers based on enterprise data
  - Content summarization
  - Document analysis
  - Task automation
  - Custom application creation (Q Apps)
  - Integration with business tools (40+ integrations)
  - Connectivity to data sources like SharePoint, S3, and Salesforce
- Includes security features like:
  - Role-based access control
  - Data privacy controls
  - Content filtering
  - Integration with existing security permissions

#### 1.2.3. The main differences

| Feature         | Amazon Q Developer        | Amazon Q Business          |
|-----------------|---------------------------|-----------------------------|
| **Purpose** | Development tasks         | Enterprise productivity     |
| **Target Users** | Developers, technical teams | Business employees (various departments) |
| **Data Sources** | Code, AWS documentation    | Enterprise data, documents |

## 2. Amazon Q Developer: Generative AI in Your IDE

On April 30, 2024, `Amazon CodeWhisperer` became part of Amazon Q Developer, bringing its generative AI-powered inline code suggestions, security vulnerability scanning, and remediation capabilities into the new platform.

At re:Invent 2024 (December 2-5, 2024), Amazon Q Developer introduced an expanded feature set, transforming it into much more than just a suggestion tool. It now helps you generate unit tests, review code for best practices, and even produce documentation on demand. This evolution makes Amazon Q Developer feel like a real AI partner, rather than just an autocomplete tool.

### 2.1. Where You Can Use Amazon Q Developer

Amazon Q Developer is available across several environments, making it easy to integrate into your workflow:

- on AWS: [more info](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-on-aws.html){:target="_blank"}
- in your IDE: [more info](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-in-IDE.html){:target="_blank"}
- on your command line: [more info](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/command-line.html){:target="_blank"}
- in GitLab (in preview): [more info](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/gitlab-with-amazon-q.html){:target="_blank"}

### 2.2. Generative AI at Your Fingertips

When integrated with your IDE, Amazon Q Developer acts as a `powerful assistant, offering real-time development guidance`. With its chat-based interface and slash commands, you can interact directly with the model to request suggestions or commands in plain English.

> DISCLAIMER! Amazon Q Developer is not only about helping you with the code. You can ask questions about AWS architecture, your AWS resources, best practices, documentation, support, and more. [Here](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/features.html){:target="_blank"} you have the full list of features of Amazon Q Developer.
{: .prompt-tip }

### 2.3. Is it really free?

Amazon Q Developer offers two plans:

| Tier        | Price                     |
|-------------|---------------------------|
| Free Tier   | `Free` (with limits)        |
| Pro Tier    | $19/month per user        |

> Important: In the Free Tier, when you reach 50 interactions in the IDE, you will receive the following notification:
>
> ![limit](limit.png)
{: .prompt-danger }

More information: [Pricing and plan comparative](https://aws.amazon.com/q/developer/pricing/){:target="_blank"}

### 2.4. What Happens With Your Code?

A common concern is whether Amazon Q Developer uses your private code for model training or sharing. Here is what you need to know:

| Tier        | Data Usage for Model Training          |
|-------------|----------------------------------------|
| Free Tier   | Content may be used (opt-out available) |
| Pro Tier    | Content not used                       |

AWS also clarifies in the documentation:

> *Amazon Q `stores your questions, its responses, and additional context`, such as console metadata and code in your IDE, to generate responses to your questions. Your code is also stored for features like code transformation and software development in the IDE. This data is stored for `up to 90 days to provide the service, and then is permanently deleted`.*

### 2.5. How to Opt Out

If you are using the Free Tier and prefer not to share your content, `you can opt out easily`. Here is how:

![opt-out-1](0-opt out of data sharing 1.jpg)
![opt-out-2](0-opt out of data sharing 2.jpg)

The important one is this "Amazon Q: Share Content". [More information](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/opt-out-IDE.html){:target="_blank"}

## 3. Hands-on with Amazon Q Developer

Before getting started, if you have not installed the plugin in your IDE yet, [follow this guide](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-in-IDE-setup.html){:target="_blank"}.

Then, you have to access to the plugin of AWS / Amazon Q, and you can start writing or just type `/`:

![slash](0-options slash.jpg)

### 3.1. Chatting About Code or Something Else (AWS-related)

You can `use the chat` with Amazon Q in the IDE to ask any AWS-related question. I will had some concerns about Amazon Q sharing my data, so I will ask to Amazon Q directly instead of retrieve it from the documentation (as I did for the previous section):

![q-question](1-ask Amazon Q 1.jpg)
![q-response](1-ask Amazon Q 2.png)

As you can see, you can simply open the AWS Amazon Q chat extension and type your question directly.

### 3.2. Generating Inline Suggestions

As you type, Q Developer `suggests completions` right in your editor. For instance, if you are writing Terraform code and need to add a new DynamoDB table, Amazon Q can suggest completions:

```hcl
resource "aws_dynamodb_table" "feedback" {
  name         = var.dynamodb_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  range_key    = "notificationId"

  a
}
```

Before you finish typing, Q Developer suggests the next part of the code, helping you code faster without breaking your flow.

![inline-suggestions](2-inline-suggestions.png)

### 3.3. Generate documentation (/doc)

> `/doc` to task Amazon Q with `writing` API, technical design, and onboarding `documentation`.
{: .prompt-info }

In my project, I wanted to generate a README file based on my code. To do this, I typed:

```shell
/doc
```

To open `Q-Doc` window. And there you do not have to type anything else, just select the options:

![docs-1](3-docs-1.png)
![docs-2](3-docs-2.png)

Of course, you can customize the message and ask for customized instructions.

> However, I have found a few `limitations` in this `/doc` feature:
>
> - If your workspace contains multiple projects,
>   - selecting the correct one can be unintuitive
>   - if you select a different project than the first one, the README might still be generated in the first project folder
> - If you have a workspace with more than one project:
>   - the selection of the project can be improved (is not very user-friendly)
>   - if you select one project different to the first one, the content is created in the first project in one folder. This is wrong but I am sure they will fix it.
> - This feature only will create README files and only in the root of the project. What about if I want to create the README of only a part of a project? You can do it with custom instructions, but the file will be created in the root folder.
> - The markdown generated does not completely follow the linting styles (markdownlint).
{: .prompt-warning }

### 3.4. Developing Features (/dev)

> `/dev` to task Amazon Q with `generating new code` across your entire project and implement features.
{: .prompt-info }

You can use the /dev to refactor current code:

![refactor-1](4-dev-refactor-code-1.png)
![refactor-2](4-dev-refactor-code-2.png)
![refactor-3](4-dev-refactor-code-3.png)

### 3.5. Generating Unit Tests (/test)

> `/test to generate unit tests` and add them to your project, helping you improve code quality, fast.
{: .prompt-info }

Tired of writing boilerplate unit tests? Just highlight a function or class and run:

```shell
/test create the unit test for main.ts file
```

![test](5-test.png)

> Now, only Java and Python are supported, as you can view in the image. If you try to generate unit tests for other languages, `Amazon Q will likely provide suggestions in the chat instead of generating actual test files`. It will fall back to providing guidance rather than generating the actual test code.
{: .prompt-tip }

### 3.6. Reviewing Code (/review)

> `/review to perform code reviews`, flagging suspicious code patterns and assessing deployment risk.
{: .prompt-info }

Need a second pair of eyes? Q Developer can review your code and highlight potential issues, security concerns, or performance bottlenecks. After highlighting a section and type:

```shell
/review
```

You get back actionable suggestions: maybe you are missing error handling, or you are not using pagination for large DynamoDB queries. It is like having a senior engineer at your side 24/7.

![review](6-review-1.png)

### 3.7. Transforming Code (/transform)

> `/transform to upgrade your Java applications in minutes`, not weeks.
{: .prompt-info }

My code is not a Java code so I can't show you this feature but you can try yourself.

### 3.8. Select code and right-click

You have another option. You can just `select the code you want, right-click and then you can select one of the options`:

![right-click](8-right-click.png)

## 4. Conclusions

Amazon Q Developer `feels like the next generation of coding assistance`, purpose-built for AWS developers. With chat-based guidance, inline suggestions, powerful transformations, automated test generation, code review capabilities, and easy documentation, it streamlines many of the mundane coding tasks that eat away at our productivity.

That being said, `if you plan to rely on Amazon Q Developer extensively, the Free Tier may not be sufficient due to its interaction limits`. If you find yourself needing more, the Pro Tier offers additional features and a higher usage limit.

If you have been on the fence about using a generative AI coding assistant for your AWS projects, `Amazon Q Developer might be the tool you have been looking for`. After trying it out in some personal repositories and seeing the immediate gains in speed and quality, I can say this is one AWS tool you do not want to overlook.

---
layout: post
title: How to create infrastructure with CDK
date: 2022-03-16 19:28 +0100
last_modified_at:
description: Do you want to know how to create infrastructure with CDK and review my CDK project used in this blog?
category:
- IaC
tags:
- how-to
- iac
- cdk
- cloudformation
- github
- level-200
level: 200
published: true
pin: false
featured_post: false
comments: true
sitemap: true
img_path: /assets/img/posts/2022-03-16-how-to-create-infrastructure-with-cdk/
---
---

## TLDR

I will explain the basics of CDK in practice: how CDK works and how to deploy a CDK project from scratch.

In addition, I will share the source code of my CDK project used to create the infrastructure of my blog.

## Introduction

This section contains:

- What is CDK
- How CDK works
- Prerequisites

### What is CDK

[CDK](https://aws.amazon.com/cdk/){:target="_blank"} is an open-source software development framework to define your cloud application resources using familiar programming languages (TypeScript, JavaScript, Python, Java, C#/.Net, and Go).

AWS CDK provisions your resources in a safe, repeatable manner through AWS <kbd>CloudFormation</kbd>.

> To me, with a developer background, CloudFormation is complex and CDK fills the gap because it allows me to use a programming language to create the infrastructure easily, it's wonderful.
{: .prompt-info }

### How CDK works

To interact with CDK apps you will need the AWS CDK Toolkit (command-line tool).

**In a nutshell:**

1. <kbd>Add code</kbd>: Add the desired AWS resources in the `app` code with your preferred programming language.
2. <kbd>Transform the code into a CloudFormation template</kbd>: Run the `cdk synth` command from the AWS CDK Toolkit to generate the `CloudFormation template` from the `app` code.
3. <kbd>Deploy the infrastructure</kbd>: Run the `cdk deploy` command from the AWS CDK Toolkit to `create a new stack on the CloudFormation service`, which will deploy the `AWS resources` to the configured AWS account.

![how-cdk-works](cdk-aws-img.png)

AWS CDK Toolkit commands you need to know:

| Command: Function   |
| ---   |
| `cdk init`: Creates a new CDK project in the current directory from a specified template  |
| `cdk bootstrap`: Deploys the CDK Toolkit stack. It must be executed once per environment (account and region) to allow cdk to create the resources it needs to run |
| `cdk synthesize` / `cdk synth`: Synthesizes and prints the CloudFormation template for the specified stack(s)   |
| `cdk diff`: Compares the specified local stack with the deployed stack  |
| `cdk deploy`: Deploys the specified stack(s)   |
| `cdk destroy`: Destroys the specified stack(s)    |

### Prerequisites

- AWS CLI
  - [how to install it](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html){:target="_blank"}
  - [how configure it](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html){:target="_blank"}
- Node.js
  - [official website](https://nodejs.org/en/){:target="_blank"}
- IDE for your programming language
  - VSCode
  - Others
- AWS CDK Toolkit
  - `npm install -g aws-cdk`
  - `cdk version`
- `cdk bootstrap`
  - You must execute it once per environment (account and region) to allow CDK to create the resources it needs to run

## How to create infrastructure with CDK

This section contains:

- How to create and deploy a basic CDK application
- Clean up
- Make changes to the default CDK application and deploy it

### How to create and deploy a basic CDK application

I have chosen <kbd>TypeScript</kbd> as my programming language.

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

The typescript sources need to be compiled into JavaScript.

**What is the fastest way to create a new CDK project and deploy it in your AWS account?**

```shell
# Create an empty folder
mkdir cdk-basic-example && cd cdk-basic-example

# Creates an example of CDK Application with some constructs
cdk init sample-app --language typescript

# Deploy and generate the resources into your AWS account
cdk deploy --require-approval never
```

And that's all, we have deployed one topic and one queue in our AWS Account...

> NOTE: What about the generation of the CloudFormation template in the `synth` phase? We have executed only the `deploy` command...
>
> When you execute `cdk deploy` behind the scenes also...
>
> - is executed `cdk synth` to generate the CloudFormation template (so you could want to avoid execute `cdk synth` before `cdk deploy`)
> - and our assets code and the CloudFormation template are deployed to the S3 bucket provisioned when `cdk bootstrap` was executed
![cdk-deploy-in-progress](cdk-deploy-in-progress.png)
![cdk-deploy](cdk-deploy.png)
{: .prompt-info }

### Clean up

Let's destroy the stack. I know this section maybe should be at the end, but where's the fun in that? We are playing and we need to try different things.

> If you try to do something different and on your own, you will learn faster!
{: .prompt-tip }

```console
# Delete the CloudFormation stack (so it will delete all resources related)
cdk destroy --force
```

![cdk-destroy](cdk-destroy.png)

You have to know how to destroy a stack, so remember to do it at the end if you are playing with cdk...

### Make changes to the default CDK application and deploy it

Perhaps we want to check what is to be deployed before we deploy it?

It makes sense to me.

```console
# Synthesizes the CloudFormation template for the specified stack(s)
# In the console, the template will be printed in yaml format
# In the "cdk.out" folder, the template will be in json format
cdk synth
```

![cdk-synth-console](cdk-synth-console.png)

![cdk-synth-code](cdk-synth-code.png)

What if we compare the local code with the stack deployed in the AWS account?

```console
cdk diff
```

> NOTE: `cdk diff` needs to connect to the AWS Account to check the CloudFormation stack against your local resources.
{: .prompt-info }

![cdk-diff](cdk-diff.png)

We can see all the new resources that will be created:

- [+] AWS::SQS::Queue
- [+] AWS::SQS::QueuePolicy
- [+] AWS::SNS::Subscription
- [+] AWS::SNS::Topic

> Remember that we have destroyed the stack in the previous step so all resources are detected as new.
{: .prompt-warning }

We deploy it again:

```console
cdk deploy --require-approval never
```

And we run the diff command again to see the differences between the local code and the deployed stack:

```console
cdk diff
```

![cdk-diff-no-changes](cdk-diff-no-changes.png)

Now let's update the CDK code to generate some differences. First of all, we have to open the project with our IDE (you can also do it with a notepad but...)

![cdk-code](cdk-code.png)

This file contains the 2 AWS resources of my example, a queue (red) and a topic (yellow). I could add a new service but for simplicity, I will remove the topic (lines 15 to 17) and run the `cdk diff` again.

![cdk-code-2](cdk-code-2.png)

```console
cdk diff
```

![cdk-diff-delete-topic](cdk-diff-delete-topic.png)

We can see that we have deleted the topic in the code, and when we run the diff command CDK finds the changes and shows them to us.

And that's all, keep practicing and learning!

> Remember to destroy your stack when you are done playing
{: .prompt-danger }

## Bonus: My CDK blog code

The source code is available [here](https://github.com/alazaroc/blog-backend-infrastructure/){:target="_blank"}

If you review it and think it can be improved, please let me know.

## Next steps

Further reading:

- More about CDK: [How to add CI/CD to my CDK project](/posts/how-to-add-ci-cd-to-my-cdk-project/){:target="_blank"}
- SAM + CDK: Interested in how AWS SAM and AWS CDK can work together? I've explored this in another article: [How to create serverless applications with CDK and SAM](/posts/how-to-create-serverless-applications-with-cdk-and-sam/){:target="_blank"}. It's a great next step for those looking to expand their serverless architecture knowledge.
- SAM: [How to create Serverless applications with SAM](/posts/how-to-create-serverless-applications-with-sam/){:target="_blank"}
- Terraform: [How to create Serverless applications with Terraform](/posts/how-to-deploy-serverless-website-with-terraform/){:target="_blank"}

I look forward to hearing your thoughts and experiences with AWS CDK. Feel free to share them in the comments below. Happy coding!

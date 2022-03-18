---
layout: post
title: How to deploy infrastructure with CDK
date: 2022-03-16 19:28 +0100
last_modified_at:
description: I use CDK to deploy the infrastructure of my blog and in this post I will explain how cdk works, a basic example of cdk with TypeScript and also I will share my source code so you can review it if you want
category: How-to
tags:
- cdk
- cloudformation
- github
published: true
pin: false
featured_post: false
comments: false
sitemap: true
---

## TLDR

I will explain the basics of CDK in practice: how cdk works and how to deploy a cdk project.

Also, I will share with you the source code of my cdk project which I use to create the infrastructure of my blog.

## What is CDK

> *[CDK](https://aws.amazon.com/cdk/){:target="_blank"} is an open-source software development framework to define your cloud application resources using familiar programming languages.*
>
> *AWS CDK provisions your resources in a safe, repeatable manner through AWS <kbd>CloudFormation</kbd>, but also is available (in alpha phase) a CDK for **Terraform** [cdktf](https://github.com/hashicorp/terraform-cdk){:target="_blank"} and a CDK for **Kubernetes** [cdk8s](https://cdk8s.io/){:target="_blank"}. To find all of these CDKs in one place, check out [Construct Hub](https://constructs.dev/){:target="_blank"}, a place to discover and share construct libraries published by the open-source community, AWS, and partners.*

> To me, with a developer background, CloudFormation is complex and CDK fills the gap and allows me to use a programming language to create the infrastructure in an easy way, it's wonderful.
{: .prompt-info }

## How CDK works

The CDK `app` generates a `cloudformation template`, which will be deployed as a stack in the `AWS CloudFormation` service and will generate `resources` in the AWS account.

![how-cdk-works](/assets/img/posts/2022-03-16-how-to-deploy-infrastructure-with-cdk/cdk-aws-img.png)

CDK commands you need to know:

| Command: Function   |
| ---   |
| `cdk init`: Creates a new CDK project in the current directory from a specified template  |
| `cdk bootstrap`: Deploys the CDK Toolkit stack. It must be executed once per region to allow cdk to create the resources it needs to run |
| `cdk synthesize` / `cdk synth`: Synthesizes and prints the CloudFormation template for the specified stack(s)   |
| `cdk diff`: Compares the specified local stack with the deployed stack  |
| `cdk deploy`: Deploys the specified stack(s)   |
| `cdk destroy`: Destroys the specified stack(s)    |

## Prerequisites

- AWS CLI
  - [how to install it](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html){:target="_blank"}
  - [how configure it](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html){:target="_blank"}
- Node.js
  - [official website](https://nodejs.org/en/){:target="_blank"}
- IDE for your programming language
  - VSCode
  - ...
- AWS CDK Toolkit
  - `npm install -g aws-cdk`
  - `cdk version`
- `cdk bootstrap`
  - You must execute it once per region to allow cdk to create the resources it needs to run

## How to create and deploy a basic cdk application

I have chosen <kbd>TypeScript</kbd> as my programming language.

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

The typescript sources need to be compiled to JavaScript.

**What is the fastest way to create a new cdk project and deploy it in your AWS account?**

``` console
# Create an empty folder
mkdir cdk-basic-example && cd cdk-basic-example

# Creates an example of CDK Application with some constructs
cdk init sample-app --language typescript

# Deploy and generate the resources into your AWS account
cdk deploy --require-approval never
```

And that's all, we have deployed one topic and one queue in our AWS Account...

> NOTE: When you execute `cdk deploy` also is executed `cdk synth` to generate the CloudFormation template, so you could want to avoid execute `cdk synth` before `cdk deploy`.
![cdk-deploy-in-progress](/assets/img/posts/2022-03-16-how-to-deploy-infrastructure-with-cdk/cdk-deploy-in-progress.png)
![cdk-deploy](/assets/img/posts/2022-03-16-how-to-deploy-infrastructure-with-cdk/cdk-deploy.png)
{: .prompt-info }

## Cleanup

Let's destroy the stack. I know this section maybe should be at the end, but where's the fun in that? We are playing and we need to try different things

``` console
# Delete the cloudformation stack (so it will delete all resources related)
cdk destroy --force
```

![cdk-destroy](/assets/img/posts/2022-03-16-how-to-deploy-infrastructure-with-cdk/cdk-destroy.png)

> You have to know how to destroy a stack... so remember to do it at the end if you are playing with cdk...
{: .prompt-tip }

## Make changes to the default cdk application and deploy it

Maybe we want to check which will be deployed before to do it?

It makes sense to me...

``` console
# It will print to the console (in yaml format) and generate in the `cdk.out` folder (in json format) the cloudformation template of the code
cdk synth
```

![cdk-synth-console](/assets/img/posts/2022-03-16-how-to-deploy-infrastructure-with-cdk/cdk-synth-console.png)

![cdk-synth-code](/assets/img/posts/2022-03-16-how-to-deploy-infrastructure-with-cdk/cdk-synth-code.png)

And what about compare the local code with the deployed stack in the AWS account?

``` console
cdk diff
```

![cdk-diff](/assets/img/posts/2022-03-16-how-to-deploy-infrastructure-with-cdk/cdk-diff.png)

We can see all the new resources which will be created:

- [+] AWS::SQS::Queue
- [+] AWS::SQS::QueuePolicy
- [+] AWS::SNS::Subscription
- [+] AWS::SNS::Topic

> Remember that we have destroyed the stack in the previous step so all resources are detected as new.
{: .prompt-warning }

We deploy it again:

``` console
cdk deploy --require-approval never
```

And we execute again the diff command to view the differences between local code and deployed stack:

``` console
cdk diff
```

![cdk-diff-no-changes](/assets/img/posts/2022-03-16-how-to-deploy-infrastructure-with-cdk/cdk-diff-no-changes.png)

Now we will update the cdk code to generate some differences. First, we need to open the project with our IDE (you can do it with a notepad as well but...)

![cdk-code](/assets/img/posts/2022-03-16-how-to-deploy-infrastructure-with-cdk/cdk-code.png)

This file contains the 2 AWS resources of my example, a queue (red) and a topic (yellow). I could add a new service but for simplicity I will remove the topic (lines 15 to 17) and execute the cdk diff again.

![cdk-code-2](/assets/img/posts/2022-03-16-how-to-deploy-infrastructure-with-cdk/cdk-code-2.png)

``` console
cdk diff
```

![cdk-diff-delete-topic](/assets/img/posts/2022-03-16-how-to-deploy-infrastructure-with-cdk/cdk-diff-delete-topic.png)

We can see that we have deleted the topic in the code, and when we execute the diff command cdk finds the changes and shows them to us.

> And that's all, remember destroy your stack and keep playing!
{: .prompt-warning }

## Bonus: My cdk blog code

I don't know why I put `bonus` on the title... it's just my code and if you think that I could improve something please tell me!

The source code is available [here](https://github.com/alazaroc/blog-infrastructure/){:target="_blank"}

## Comment this post

> I have temporarily added the comments section to the post here. In the future I will add it in a better way and include all the validated comments (I guess that I will have to make a filter to avoid spam)
{: .prompt-info }

{% include comment-form.html %}
{% include comment-form.js %}
{% include forms.css %}

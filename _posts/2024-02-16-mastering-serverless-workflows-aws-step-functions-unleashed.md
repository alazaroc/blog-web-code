---
layout: post
title: 'Mastering Serverless Workflows: AWS Step Functions Unleashed'
date: 2024-02-16 15:24 +0100
last_modified_at:
description: Explore how AWS Step Functions revolutionize cloud architecture, offering insights into creating efficient, scalable serverless workflows.
category:
- Serverless
tags:
- how-to
- cdk
- sam
- iac
- serverless
- comparative
- level-300
level: 300
published: true
pin: false
featured_post: false
comments: true
sitemap: true
img_path:  /assets/img/posts/2024-02-16-mastering-serverless-workflows-aws-step-functions-unleashed/
image:
  path: step-functions.png
  header_post: false
---

## Introduction

In the ever-evolving landscape of cloud computing, AWS Step Functions stand out as a powerful service designed to `simplify the orchestration of complex, multi-step workflows`. Understanding how to leverage Step Functions can significantly enhance our ability to design robust, scalable, and efficient applications. This article dives deep into the world of AWS Step Functions, exploring its features, benefits, and practical applications.

### What is AWS Step Functions

AWS Step Functions is a `serverless orchestration service` that lets you define an application workflow as a series of event-driven steps. Through visual workflows, you can design and run workflows that stitch together services such as AWS Lambda, Amazon SNS, Amazon DynamoDB, and more, creating rich applications without the burden of managing the underlying infrastructure.

This is one of the step functions I used on my blog website:

![Step Functions](step-functions.png)

> [This is the official link to the AWS documentation](https://docs.aws.amazon.com/step-functions/latest/dg/getting-started-with-sfn.html)
{: .prompt-info }

### Key Features

- `Visual Workflow Management`: Step Functions provides a graphical console to visualize the components of your application's architecture and the real-time status of its execution.
- `Serverless Nature`: With no infrastructure to manage, you can focus on building applications rather than managing servers.
- `Error Handling and Retries`: Step Functions offers built-in error handling, retry logic, and catch mechanisms to manage failures gracefully.
- `Integration with AWS Services`: Seamlessly integrates with various AWS services, enabling complex workflows with minimal coding.

### How Do Step Functions Work?

At its core, AWS Step Functions `coordinates` the components of distributed applications and microservices using visual workflows. You define your application's workflow in JSON, specifying each step of the process, including the decisions, parallel tasks, and the sequence of tasks.

### Core Concepts

- `Workflow`: Describes a sequence of steps and often matches a business process. This is also called `state machine`.
- `States`: Represent each step of your workflow. States can perform tasks, make decisions, and more.
- `Tasks`: Define the work performed by a single step in your workflow, such as invoking a Lambda function or publishing to an SNS topic.
- `Transitions`: Control the flow from one state to another, based on the output of the current state.
- `Service Integrations`: Step Functions can directly invoke and coordinate AWS services as part of the workflow.

### Workflow Types

Step Functions has two workflow types:
- `Standard` workflows have exactly-once workflow execution and can run for up to one year.
  - Ideal for long-running, auditable workflows, as they show execution history and visual debugging
- `Express` workflows, however, have at-least-once workflow execution and can run for up to five minutes
  - Ideal for high-event-rate workloads, such as streaming data processing and IoT data ingestion.

Executions are instances where you run your workflow to perform tasks. 

### Use Cases

AWS Step Functions can be applied to a wide range of scenarios, from simple task orchestrations to complex workflows. Here are a few examples:

- Function orchestration
- Branching: With a Choice state you can make decisions
- Error handling (Retry and Catch)
- Human in the loop
- Parallel processing (Parallel State)
- Dynamic parallelism (Map State)

## Creating a New Step Functions Workflow

### Workflow Studio

`Workflow Studio` is integrated into the AWS console, inside the AWS Step Functions service.

> You have a full section talking about Workflow Studio in the official documentation [here](https://docs.aws.amazon.com/step-functions/latest/dg/workflow-studio.html), with many examples and detailed information. In the following lines, I will try to summarize as best as I can.
{: .prompt-info }

It is a `low-code visual workflow designer` that lets you create serverless workflows by orchestrating AWS services. With its drag-and-drop feature, Workflow Studio makes it easy for you to build, edit, and visualize your workflow prototypes. Workflow Studio also offers a built-in code editor for writing and editing your workflow definitions using Amazon States Language (ASL) within the Step Functions console.

You can access Workflow Studio from the Step Functions console when you create or edit a workflow in Step Functions. You can also access Workflow Studio within AWS Application Composer.

We will use the Step Functions console.

### Our first Step Function Workflow using a template

Easily, and without any knowledge, you can create your first workflow using predefined templates.

First, click the `Create state machine` button to see the following screen:

![Step 1](step1-template.png)

If you select one of the templates, you will see the information about the flow that will be generated, and you have 2 options:
- Run a demo
- Build on it

![Step 2](step2-template-example.png)

If you select `Build on it` you will see the `Workflow Studio` with 3 main sections:
- Left: here are located all the tasks you can add to your workflow, just doing drag-and-drop.
- Center: contains the visualization of your workflow
- Right: contains the configuration of the selected task

![Step 3](step3-example-created.png)

In the upper level you will see:
- Name of the workflow
- 3 buttons to change between different modes:
  - Design: this is the current mode
  - Code: you will see the workflow code using the Amazon States Language (ASL)
  - Config: you can configure the type of workflow (standard/express), the permissions, logging and additional configuration (x-ray, versions and tags).

![Upper options](upper-options.png)

This is the code mode:
![Code mode](code_mode.png)

As you can see the code in the ASL (Amazon States Language) has been auto-generated for us!

> I strongly recommend you to use this low-code editor to create your workflows using the `design mode` and then use the `code mode` to copy all the ASL code and paste it in your IaC code (using AWS SAM you can do it very easy!).
{: .prompt-tip }

### Real-world Architectural Example

Let me show you one implementation I did for my blog using AWS Step Functions, maybe the most typical use case:

I was using a Lambda Function to orchestrate a few steps inside:
1. Validate the input data.
2. Add the contact information to a database.
3. Use Amazon SES to send an email
4. If no errors occur, it returns a successful response.
5. If any errors occur, they are caught and a response with an error message is returned.

And this was the handler of my Lambda Function:

![Lambda handler](lambda-handler.png)

However, I wanted to migrate it to AWS Step Functions, and I made a few changes:
- Create a Step Function to orchestrate the flow
- Create a new Lambda Function to only Process the data (validate it and prepare it for the next step)
- Integrate it directly with DynamoDB and SES in the Step Function
- Manage the errors

So now, I am using Step Functions instead of having everything inside a Lambda Function, and I can visualize the status of the execution easily.

![Step Functions execution](step-functions-execution.png)

![Step Functions without errors](step-functions-ok.png)

![Step Functions with errors](step-functions-error.png)

## Deep Dive

### Best Practices

To maximize the effectiveness of AWS Step Functions, consider the following best practices:

- Use Step Functions `Workflow Studio` to create your workflows with the designer and then import them to AWS SAM.
- By default, there are no timeouts for state machines in AWS. `Use timeouts` to avoid stuck executions.
- `Modular Design`: Break down your workflows into reusable components.
- `Error Handling`: Utilize Step Functions' error handling capabilities to manage and mitigate failures.
- `Logging and Monitoring`: Leverage AWS CloudWatch to monitor the execution and performance of your workflows.
- Use `idempotent tasks` (you can use retries to improve reliability).
- If you use Lambda Functions, try to `return Exceptions` so the Step Function can manage the error (don't return a 200 code with a custom field). I did it at the beginning...
- `Choosing Workflow Types`: Select Standard workflows for long-running processes and Express workflows for high-throughput, short-duration tasks to optimize cost and performance.
- `Parallel Processing`: Leverage the Parallel state to execute multiple tasks concurrently, reducing the overall execution time of workflows.
- `State Transition Management`: Minimize the number of state transitions to stay within quotas and reduce costs, focusing on streamlining workflow design.

The following best practices have been extracted from the official documentation [Here](https://docs.aws.amazon.com/step-functions/latest/dg/sfn-best-practices.html). I don't have included all of them because for me many of them are not best practices and others are already included.

- `Avoid reaching the history quota` (25,000 entries in the execution event history)
- `Avoid latency when polling for activity tasks`. AWS says the following:
  - "*The GetActivityTask API is designed to provide a taskToken exactly once. If a taskToken is dropped while communicating with an activity worker, a number of GetActivityTask requests can be blocked for 60 seconds waiting for a response until GetActivityTask times out.*"
  - "*If you only have a small number of polls waiting for a response, it's possible that all requests will queue up behind the blocked request and stop*..."
  - "*For production systems, we recommend at least 100 open polls per activity ARN's at each point in time.*"

### Design Patterns and Architectures

AWS Step Functions support various design patterns and architectures, enabling cloud architects to solve complex design challenges with elegance and efficiency. Key patterns include:

- `State Machine Pattern`: Decompose complex applications into state machines to model application logic in a more manageable, understandable, and scalable way. Step Functions allow you to visually map out the states and transitions of your application, making it easier to design, debug, and maintain.
- `Microservices Orchestration`: Utilize Step Functions to coordinate the operations of loosely coupled microservices, ensuring smooth inter-service communication and workflow execution.
- `Event-Driven Processing`: Implement event-driven architectures that react to AWS CloudWatch Events or Amazon SNS notifications, triggering workflows in Step Functions to process and respond to events.
- `Saga Pattern`: Manage distributed transactions across multiple services, using Step Functions to handle the sequence of local transactions and compensating transactions in case of failures.
- `Batch Processing`: Automate batch processing workflows by coordinating the various stages of data processing, such as extraction, transformation, and loading (ETL) tasks. Step Functions can schedule and execute these tasks in sequence or parallel, handling errors and retries, and ensuring the completion of the entire batch process.
- `Workflow Reusability`: Design reusable workflows for common tasks across different applications or parts of an application. Step Functions' support for nesting workflows allows you to invoke one workflow from another, promoting modularity and reusability of workflow components.

### Comparison with Other AWS Services

While AWS Step Functions is a powerful tool for `workflow orchestration`, understanding its positioning relative to other AWS services like AWS Simple Workflow Service (SWF) and Amazon EventBridge is crucial for architects:

- `AWS SWF vs Step Functions`: SWF offers more granular control over workflow execution and task distribution, making it suitable for legacy applications requiring complex decision-making processes. Step Functions, with its higher-level abstraction, is better suited for serverless applications and integrating multiple AWS services.
- `Amazon EventBridge vs Step Functions`: EventBridge is ideal for event routing and handling, connecting applications with data streams. Step Functions excel in orchestrating these events into coherent, stateful workflows, making them complementary services in event-driven architectures.

### When and why migrate from Lambda Functions to Step Functions

Migrating from AWS Lambda Functions to AWS Step Functions is a strategic decision that depends on the evolving needs of your application's architecture, particularly as it grows in complexity and scale. Here's when and why such a migration becomes beneficial:

#### When to Migrate

1. `Complex Workflows`: When your application logic extends beyond simple, linear executions to complex workflows involving conditional logic, parallel processing, or coordination between multiple AWS services.
1. `State Management Needs`: As your workflows require maintaining state information across multiple steps or need to manage long-running processes that exceed Lambda's execution limits.
1. `Advanced Error Handling`: When you need sophisticated error handling strategies that include retries, catch mechanisms, and fallbacks based on the type of error or failure.
1. `Scalability and Efficiency`: If managing the orchestration logic within Lambda functions becomes cumbersome and you're looking for a more scalable and efficient way to manage workflow executions.
1. `Cost Considerations`: For workflows that trigger a high volume of Lambda functions, where the orchestration logic itself becomes a significant part of the cost.

#### Why Migrate

1. `Simplified Workflow Management` with a visual design and execution: Step Functions provide a visual interface to design, manage, and monitor workflows, making it easier to understand and optimize complex processes.
1. `Enhanced Error Handling and Retry Logic`: Step Functions offer advanced error handling and retry mechanisms, allowing you to define robust workflows that can gracefully handle failures and exceptions without complex custom code.
1. `State Management and Long-running Processes`: Step Functions automatically manage the state of each step in your workflow, facilitating the orchestration of long-running, stateful processes that would be challenging to implement with Lambda alone.
1. `Seamless Service Integration`: With built-in support for direct integration with numerous AWS services, Step Functions can orchestrate complex workflows across the AWS ecosystem more seamlessly than standalone Lambda functions.
1. `Scalable Execution`: Step Functions can scale workflows dynamically, managing thousands of parallel executions, which simplifies the architecture for high-volume applications.
1. `Cost Optimization`: By offloading orchestration logic to Step Functions, you can potentially reduce the number of Lambda invocations and associated costs, especially for complex orchestration logic.
1. `Reduced Complexity`: Migrating to Step Functions can simplify your codebase by removing the orchestration logic from your Lambda functions, making them more focused on their core responsibilities.
1. `Easier Maintenance and Updates`: Updating workflow logic becomes more straightforward with Step Functions, as changes can often be made without modifying the code of individual Lambda functions.

### Pricing

This is a serverless service and `you pay only for what you use`.

If you are going to use it for a few thousand executions is almost free.

- Free Tier: 4,000 STATE TRANSITIONS per month (`FOREVER`! Not only in the 12 first months...)
- State Transitions: $0.025 per 1,000 state transitions

For example:
- If you executed <kbd>one workflow with 9 steps 10,000 times</kbd>, the price will be:
  - State transitions per execution * executions of workflow = total state transitions
  - 9 * 10,000 = 90,000
  - Total state transitions – Free Tier state transitions = billable state transitions
  - 90,000 – 4,000 = 89,600
  - Monthly charges = 89,600 * $0.000025 = <kbd>$2.24</kbd>

[Here](https://aws.amazon.com/step-functions/pricing/) you have the official pricing page with much more detail.

## Conclusion

AWS Step Functions revolutionizes the way we approach cloud-based application development and workflow orchestration. By abstracting the complexities of managing stateful, multi-step processes, it empowers developers and architects to design more robust, scalable, and efficient systems. Through the practical examples and best practices outlined in this article, we've seen how Step Functions facilitate seamless integration, error handling, and workflow management, allowing teams to focus on innovation rather than infrastructure.

Remember, the future of cloud orchestration is not just about connecting services; it's about creating seamless, efficient, and scalable solutions that drive business value. AWS Step Functions is your partner in this journey, providing the foundation you need to build the next generation of cloud-native applications.
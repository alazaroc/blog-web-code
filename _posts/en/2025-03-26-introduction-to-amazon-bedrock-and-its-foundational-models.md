---
layout: post
title: Introduction to Amazon Bedrock and its Foundation Models  
date: 2025-03-26 08:00 +0100  
last_modified_at:
lang: en  
lang-exclusive: ['en', 'es']  
description: Discover how Amazon Bedrock simplifies access to AI foundation models, their use cases, advantages, and how to integrate them into applications to generate content, analyze data, and improve processes.  
category: Generative AI  
tags:
- level-200
- generative-ai
- bedrock
published: true
level: 200
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2025-03-26-introduction-to-amazon-bedrock-and-its-foundational-models/
image:
  path: bedrock-testing-model.jpg
  header_post: false
---
---

> This article is the first of a series on `Amazon Bedrock`:
>
> - 1/2: **Introduction to Amazon Bedrock and its Foundation Models**
> - 2/2: [Prompts I: How to Design Effective Prompts in Amazon Bedrock](/posts/designing-effective-prompts-in-amazon-bedrock/){:target="_blank"}
> - 3/3: [Prompts II: Mastering Prompt Management in Amazon Bedrock (Versioning, Optimization, and Best Practices)](/posts/effective-prompt-management-in-amazon-bedrock/){:target="_blank"}
{: .prompt-tip }

## 1. Introduction

Generative artificial intelligence has transformed the way we interact with technology, and if you're working with AWS, `you must absolutely know everything I'm going to explain in this series of articles`.

Of course, you can make things as complicated as you want. For example, you could train your own models from scratch. But let's be honest, this is very, very expensive, and in 99% of cases, it's NOT what you need.

In this first article, you will learn how to:

- Explore Amazon Bedrock.
- Choose the right model in Amazon Bedrock.
- Use the AWS console and SDK to test models.
- Compare models based on cost, latency, and use cases.

## 2. Amazon Bedrock

> Amazon Bedrock is the most important Generative AI service in AWS.
{: .prompt-info }

Amazon Bedrock `provides access to foundation models` from different providers, `without the need to manage infrastructure`.

You can do many things within Amazon Bedrock, such as:

- Explore and access a wide variety of foundation models.
- Adapt and customize models, whether pre-trained or your own, optimizing their performance according to your needs.
- Experiment and test models in an interactive environment (`playground`), whether with text, images, or videos.
- Create intelligent agents that automate tasks and processes.
- Design generative AI workflows by connecting different resources and services.
- Organize and use knowledge bases to improve response accuracy.
- Manage and optimize prompts to get the best results.
- Implement security measures (Guardrails) to protect your prompts and results.
- Process large volumes of data efficiently with batch inference.
- Take advantage of models available in different AWS regions.

But let's start with the basics: reviewing the available foundation models and learning how to use them, both directly from the AWS console and via code.

![Bedrock Overview image](bedrock-overview.jpg)

## 3. Foundation Models in Amazon Bedrock

Foundation models (FM) are `AI models pre-trained with large amounts of data` and optimized for various tasks such as text generation, image creation, and code generation. These models are designed to provide coherent and relevant responses without the need to train them from scratch.

These models can be used as-is or customized for specific needs, allowing them to be tailored to different use cases without incurring the costs and complexity of developing a proprietary model.

> The availability of models and features in Amazon Bedrock varies by region, so it is important to check which options are available in your area before designing a solution.
{: .prompt-warning }

### 3.1. Available Providers

Right now, there are 8 different providers offering serverless models in Amazon Bedrock. This image may not be up to date, but it will give you a general idea:

| Provider Name | Number of Available Models | Deployment Type | Latest Release |
|--------------|--------------------------|----------------|---------------|
| [AI21 Labs](https://www.ai21.com/) | 3 | Serverless | Thu, 05 Sep 2024 08:00:00 GMT |
| [Amazon](https://aws.amazon.com/) | 13 | Serverless | Tue, 03 Dec 2024 08:00:00 GMT |
| [Anthropic](https://www.anthropic.com/) | 10 | Serverless | Wed, 19 Feb 2025 08:00:00 GMT |
| [Cohere](https://cohere.ai/) | 6 | Serverless | Mon, 29 Apr 2024 08:00:00 GMT |
| [DeepSeek](https://deepseek.com/) | 1 | Serverless | Mon, 03 Mar 2025 08:00:00 GMT |
| [Meta](https://meta.com/) | 9 | Serverless | Wed, 18 Dec 2024 08:00:00 GMT |
| [Mistral AI](https://mistral.ai/) | 4 | Serverless | Tue, 02 Apr 2024 08:00:00 GMT |
| [Stability AI](https://stability.ai/) | 1 | Serverless | Wed, 26 Jul 2023 08:00:00 GMT |

### 3.2. Available Models in Amazon Bedrock

Each provider offers one or more models. You can check the complete list and their regional availability [here](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html){:target="_blank"}.

In the model catalog for the North Virginia region (us-east-1), as of the time of writing this article, there are 188 available models, including serverless models (47) and marketplace models (141).

![Bedrock Model Catalog image](bedrock-model-catalog.jpg)

The image above shows what each model is used for. Depending on your use case, you can choose the most suitable model.

Here are examples of models (there are many more):

| Provider       | Model          | Primary Use Cases                                  |
|---------------|---------------|--------------------------------------------------|
| **Amazon**    | Titan Text     | Text generation, chatbots, summaries            |
| **Amazon**    | Titan Image    | Image generation and modification               |
| **Amazon**    | Nova           | Optimized for efficiency and scalability        |
| **Anthropic** | Claude         | Chatbots, text analysis                         |
| **AI21 Labs** | Jurassic      | Content generation and long-form text          |
| **Cohere**    | Command       | Summarization and text classification          |
| **Meta**      | Llama         | Research and advanced applications             |
| **Mistral**   | Mistral/Mixtral | Task optimization with efficiency             |
| **Stability AI** | Stable Diffusion | Image generation                         |

Each model has different costs and inference times, so choosing the right one for each case is essential.

### 3.3. Comparing Different Models for Your Use Case

When choosing a model, consider the following:

- **Choose based on the task**: Not all models are suitable for the same tasks.
- **Test different options**: Each model responds differently. Try several and select the best one for your needs.
- **Evaluate costs and latency**: More powerful models can be more expensive. Keep that in mind.
- **Leverage customization options**: Some models allow fine-tuning.

## 4. Testing Foundation Models in Bedrock

### 4.1. Enabling Model Access

The first step is to enable the model you want to test from the AWS console.

Follow these steps:

1. Go to the `Model Access` option.
2. Modify model access.
3. Select the models you want to enable.
4. Confirm and wait for them to be ready for testing.

### 4.2. Practical Example: Using Amazon Bedrock in the AWS Console

Access the playground, select your model, and enter your prompts.

![Bedrock Playground image](bedrock-playground.jpg)

![Bedrock Select Model image](bedrock-select-model.jpg)

![Bedrock Testing Model image](bedrock-testing-model.jpg)

### 4.3. Practical Example: Using Amazon Bedrock with AWS SDK

Besides testing from the AWS console, you can integrate it into your code, whether in a Lambda function or elsewhere.

Here's an example of calling a model using Python:

```python
import boto3

# Create Bedrock client
client = boto3.client("bedrock-runtime")

# Request text generation
response = client.invoke_model(
    modelId="anthropic.claude-v2",
    body={"prompt": "Explain the importance of generative AI."}
)

# Display result
print(response["body"].read())
```

## 5. My Recommendations for Model Selection

From my experience, I recommend:

- If you need a chatbot: Use Claude by Anthropic.
- For long-form content generation: AI21 Jurassic is a good choice.
- If you need summarization: Cohere Command is very efficient.
- For image generation: Stability AI’s Stable Diffusion is widely used.
- If efficiency is key: Mistral models are lightweight and fast.
- If you want something cheap or covered by AWS credits: Use Amazon’s models.

## 6. Conclusion

Amazon Bedrock provides a `powerful platform to leverage generative AI without infrastructure concerns`. Choosing the right model depends on your use case, cost, and expected latency.

Check out the rest of this series for more insights.

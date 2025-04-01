---
layout: post
title: "Prompts I: How to Design Effective Prompts in Amazon Bedrock"
date: 2025-03-29 08:21 +0100
last_modified_at:
lang: en
lang-exclusive: ['en', 'es']
description: Discover how to design effective prompts in Amazon Bedrock to improve the quality of AI model responses. Learn how to structure your prompts, apply advanced techniques, and validate their effectiveness.
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
media_subpath: /assets/img/posts/2025-03-29-designing-effective-prompts-in-amazon-bedrock/
image:
  path: playground-1-test-models-en.png
  header_post: false
---
---

> Second article of a series on `Amazon Bedrock`:
>
> - 1/3: [Amazon Bedrock 101: Understanding Its Foundational Models](/posts/introduction-to-amazon-bedrock-and-its-foundational-models/){:target="_blank"}
> - 2/3: **Prompts I: How to Design Effective Prompts in Amazon Bedrock**
> - 3/3: [Prompts II: Mastering Prompt Management in Amazon Bedrock (Versioning, Optimization, and Best Practices)](/posts/effective-prompt-management-in-amazon-bedrock/){:target="_blank"}

{: .prompt-tip }

## 1. Introduction

If you've ever tried generative artificial intelligence models, you've probably encountered inconsistent answers, overly long responses, or out-of-context replies. Why does this happen? **Because prompt design directly influences the quality of the output.**

In this article, you'll learn how to create **effective prompts** in Amazon Bedrock to get more accurate and useful responses. We will cover:

- What a prompt is and why it’s important.
- How to structure a prompt correctly.
- Advanced prompt optimization techniques.
- Methods to test and validate the effectiveness of your prompts.

The goal is that by the end, `you will significantly improve your interaction with AI models in Amazon Bedrock,` reducing the need for manual adjustments and getting responses that are more aligned with your needs.

## 2. What Is a Prompt and How to Structure It

### 2.1. What Is a Prompt

A **prompt** is the **input we provide to a generative AI model to receive a response**.

| Input Prompt | Expected Response |
|--------------|-------------------|
| What is the most important Generative AI service in AWS? | Amazon Bedrock |
| Summarize the concept of Amazon Bedrock in one sentence. | Amazon Bedrock is a service that provides access to foundational generative AI models in AWS. |

The prompt is the foundation of interaction with models and **directly affects the quality and relevance of the result**.

### 2.2. Key Parts of a Prompt

A good prompt is typically structured in several parts to improve the accuracy of the response:

| Component            | Description | Example |
|----------------------|-------------|---------|
| **Context**          | Additional information to guide the model’s response. | You are an AWS solutions architect explaining concepts to non-technical people. |
| **Main Instruction** | Direct request to the model. | Explain in simple terms what generative artificial intelligence is. |
| **Desired Format**   | How you want the response to be structured. | Respond in under 200 words and use bullet points for key points. |
| **Expected Response Example** | Reference model to guide generation. | Serverless is like: <br>- An on-demand service: you only pay for what you use, like electricity at home. <br>- No worries: you don't manage servers, like not fixing the plumbing in the building you live in. <br>- Automatic scalability: adapts to demand, like a taxi that shows up when you need it. <br>In summary, serverless frees you from server management, letting you focus on your app. |
| **Constraints or Rules** | Limits on the response (what to include/exclude). | Don’t mention advanced technical terms like convolutional neural networks. |

Full Example:

```console
Context:
You are an AWS solutions architect explaining concepts to non-technical people.

Main Instruction:
Explain in simple terms what generative artificial intelligence is.

Desired Format:
Respond in under 200 words and use bullet points for key points.

Expected Response Example:
Serverless is like:
- An on-demand service: you only pay for what you use, like electricity at home.
- No worries: you don’t manage servers, like not fixing the plumbing in the building you live in.
- Automatic scalability: adapts to demand, like a taxi that shows up when you need it.
In summary, serverless frees you from server management, letting you focus on your app.

Constraints or Rules:
- Don’t mention advanced technical terms like convolutional neural networks.
- Don’t use equations or formulas.
- Make sure the explanation is accessible to anyone without prior knowledge.
```

Real example testing this prompt in the playground with the "Amazon Titan G1 - Premier" model:

![Bedrock PlayGround example](example_prompt_en.png)

## 3. How to Improve the Quality of Your Prompts

Prompt design directly impacts the quality of responses generated by AI models. By applying advanced strategies, we can achieve more accurate, relevant, and aligned results. Let’s explore the most effective techniques.

### 3.1. Why It’s Important to Design a Good Prompt

A well-designed prompt improves the interaction with AI models like those in Amazon Bedrock. **It's not just about asking questions, but strategically structuring them to get more useful and precise answers**.

| Benefit | Description |
|---------|-------------|
| **Avoids ambiguous or irrelevant answers** | A clear and well-defined prompt guides the model toward more precise answers. |
| **Reduces the need for retries** | Formulating the question correctly from the start reduces unnecessary queries, optimizing computational costs. |
| **Facilitates automation** | Designing efficient prompts allows integrating AI into workflows without manual intervention. |
| **Improves user experience** | A well-structured prompt helps generate more understandable and relevant responses. |
| **Makes better use of the model’s capabilities** | Adjusting the prompt allows obtaining more detailed, structured, and aligned responses with the objective. |

### 3.2. How to Write More Precise Prompts

To improve the quality of responses, apply these key principles when crafting your prompts:

1. **Be specific**: The more detailed the prompt, the more precise the answer will be.
   - Examples:
     - ❌ *Explain Amazon Bedrock.*
     - ✅ *Explain what Amazon Bedrock is in under 150 words, including its main advantages.*

2. **Clarify the context**: Specify the role of the model or the target audience.
   - Example:
     - *You are an AWS solutions architect explaining Amazon Bedrock to a team of junior developers.*

3. **Structure the response**: Use lists, steps, or format restrictions.
   - Example:
     - *List three key benefits of Amazon Bedrock and explain each one in one sentence.*

4. **Test and iterate**: Adjust the prompt based on the results obtained.
   - If the response is too general, add more details.
   - If it's too lengthy, limit the word count or output format.

> These principles can be combined with advanced techniques to get even more precise results.
{: .prompt-tip }

### 3.3. Advanced Techniques for Writing Prompts

Here are some advanced techniques to enhance prompt formulation and obtain better responses from AI models:

| Technique | Description | Example |
|-----------|-------------|---------|
| **Zero-Shot Prompting** | Ask the model for a response without providing previous examples. | *Summarize this text in one sentence: Amazon Bedrock provides access to foundational AI models...* |
| **Few-Shot Prompting** | Include examples to improve response accuracy. | *Question: What is the capital of France? <br>Answer: Paris. <br>Question: What is the capital of Spain? <br>Answer: ...* |
| **Chain-of-Thought (CoT)** | Ask the model to reason step-by-step before answering. | *Calculate how many minutes are in 3 hours. Explain the calculation step by step before giving the answer.* |
| **Prompt with Constraints** | Define specific limits on the model’s response. | *Write a definition of AI in no more than 20 words.* |
| **Incremental Prompting** | Build complex responses in multiple steps. | *First, define Amazon Bedrock in one sentence. Then, explain how it differs from other AI services in AWS.* |
| **Self-Refinement Prompting** | Ask the model to review and improve its own response. | *Write an explanation about Amazon Bedrock. Then, review and improve its clarity and precision.* |
| **Role-Playing Prompting** | Assign a specific role to the model to contextualize the response. | *You are an AWS architect explaining Amazon Bedrock to a team of junior developers.* |

> Experiment by combining these techniques for even better prompts.
{: .prompt-tip }

## 4. Adapt Your Prompt to Your Model

> IMPORTANT! To get a better response, you need to adapt your prompt to the specific model you’re using.
{: .prompt-info }

**The same prompt used across different models will give different responses**, so it's important to review each provider’s guidelines and adjust the prompt for the specific model.

Next, we will test the previously discussed prompt in the "*Amazon Titan Express*" and "*Anthropic Claude 3 Haiku*" models:

![Bedrock PlayGround test models](playground-1-test-models-en.png)

And we see that we get two different responses:

- In the first, the response seems aligned with what we want.
- In the second, the response exceeds 200 words.

![Bedrock Playground compare models](playground-2-compare-models-en.png)

Therefore, to get a good response, `you will need to adjust the prompt for each model`.

Here is a list of the guidelines for each provider, taken from this [link](https://docs.aws.amazon.com/en_us/bedrock/latest/userguide/prompt-engineering-guidelines.html){:target="_blank"} official AWS documentation.

> - Prompt Guide for `Amazon Nova Micro, Lite y Pro`: [https://docs.aws.amazon.com/nova/latest/userguide/prompting.html](https://docs.aws.amazon.com/nova/latest/userguide/prompting.html){:target="_blank"}
> - Prompt Guide for `Amazon Nova Canvas`: [https://docs.aws.amazon.com/nova/latest/userguide/image-generation.html](https://docs.aws.amazon.com/nova/latest/userguide/image-generation.html){:target="_blank"}
> - Prompt Guide for `Amazon Nova Reel`: [https://docs.aws.amazon.com/nova/latest/userguide/video-generation.html](https://docs.aws.amazon.com/nova/latest/userguide/video-generation.html){:target="_blank"}
> - Prompt Guide for `Anthropic Claude`: [https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview){:target="_blank"}
> - Prompt Guide for `Cohere`: [https://cohere.com/blog/how-to-train-your-pet-llm-prompt-engineering](https://cohere.com/blog/how-to-train-your-pet-llm-prompt-engineering){:target="_blank"}
> - Prompt Guide for `AI21 Labs`: [https://docs.ai21.com/docs/prompt-engineering](https://docs.ai21.com/docs/prompt-engineering){:target="_blank"}
> - Prompt Guide for `Meta Llama 2`: [https://ai.meta.com/llama/get-started/#prompting](https://ai.meta.com/llama/get-started/#prompting){:target="_blank"}
> - Prompt Guide for `Stability AI`: [https://platform.stability.ai/docs/getting-started](https://platform.stability.ai/docs/getting-started){:target="_blank"}
> - Prompt Guide for `Mistral AI`: [https://docs.mistral.ai/guides/prompting_capabilities/](https://docs.mistral.ai/guides/prompting_capabilities/){:target="_blank"}

## 5. Testing and Validation of Prompts

**Designing a good prompt is not enough**, you must also ensure it works well in different scenarios. To do this, we need to know how to test and validate it correctly.

### 5.1. Testing Methods

There are several ways to test a prompt to evaluate its quality and behavior:

1. **Manual Testing**
   - Run the prompt multiple times and analyze the consistency of the responses.
   - Evaluate whether the response is **accurate, clear, and relevant**.
   - In Amazon Bedrock, you can do this in the `playground`, both in chat mode and in "Single Prompt" mode:
      - ![Test in Bedrock Playground](bedrock-playground.jpg)
   - You can also compare the same prompt across multiple models:
      - ![Model Comparison in Bedrock Playground](compare_models_playground_en.png)

2. **Variant Comparison**
   - Test different versions of the prompt and compare the results.
   - Use **A/B testing** to identify which provides the best responses.
   - In Amazon Bedrock, you can do this in two ways:
     - Manually modifying the prompt in each iteration within the `playground`.
     - Using the "Variants" option in `Bedrock Prompt Management`, which allows you to test different models or different prompts on the same model:
        - ![Options in Bedrock Prompt Management](prompt-management.png)
        - ![Variant Comparison in Bedrock](compare-variants-models-1-en.png)

    > I explain Amazon Bedrock Prompt Management in more detail in the next article [here](/posts/effective-prompt-management-in-amazon-bedrock/){:target="_blank"}.
    {: .prompt-info }

3. **Automated Validation**
   - You can also automate the validation of new prompts.
   - Some AWS services can help you run prompts and analyze responses automatically:
     - **Amazon Bedrock with Lambda** to generate and analyze responses.
     - **Amazon CloudWatch Logs** to log and audit responses.
     - **AWS Step Functions** to define automated test workflows.

    > So far, I haven’t found a ready-to-use automated solution that facilitates this validation quickly and easily. If you know of one, let me know!
    {: .prompt-warning }

### 5.2. Evaluating the Quality of a Prompt

When designing new versions of a prompt, validate the following aspects:

- **Accuracy**: Is the response correct and relevant to the question?
- **Consistency**: Do you get similar responses on different executions?
- **Coherence**: Does the model correctly follow the prompt instructions?
- **Correct format**: Does the response respect the expected format? (lists, bullet points, structure, etc.)

## 6. Conclusion

Prompt design is key to getting accurate and useful responses in Amazon Bedrock. As we’ve seen, small adjustments can make a big difference in the quality of the result.

How to create a good prompt:

- ✅ Be clear and specific.
- ✅ Use context and examples when necessary.
- ✅ Define the expected response format.
- ✅ Iterate and adjust based on the model.

How to validate a prompt correctly:

- ✅ **Test different variants** and compare results.
- ✅ **Measure the accuracy, coherence, and format** of the responses.
- ✅ **Leverage tools like Bedrock Playground or Bedrock Prompt Management** to fine-tune your prompts.

**The next step?** Apply these techniques to your own use cases and continuously optimize your prompts.

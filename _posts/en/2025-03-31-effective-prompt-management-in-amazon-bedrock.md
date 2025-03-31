---
layout: post
title: "Prompts II - Effective Prompt Management in Amazon Bedrock: Versioning, Optimization, and Best Practices"
date: 2025-03-31 15:38 +0200
last_modified_at:
lang: en  
lang-exclusive: ['en', 'es']  
description: In this article we explore how to effectively manage prompts in Amazon Bedrock, covering key functionalities such as versioning, optimization and collaboration to enhance your AI-based projects.
category: Generative AI
tags:
- level-300
- generative-ai
- bedrock
published: true
level: 300
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2025-03-31-effective-prompt-management-in-amazon-bedrock/
image:
  path: compare-variants-models-1-en.png
  header_post: false
---
---

> Third article in a series on `Amazon Bedrock`:
>
> - 1/3: [Introduction to Amazon Bedrock and its Foundational Models](/posts/introduction-to-amazon-bedrock-and-its-foundational-models/){:target="_blank"}
> - 2/3: [Prompts I - Designing Effective Prompts in Amazon Bedrock](/posts/designing-effective-prompts-in-amazon-bedrock/){:target="_blank"}
> - 3/3: **Prompts II - Effective Prompt Management in Amazon Bedrock: Versioning, Optimization, and Best Practices**
{: .prompt-tip }

## 1. Introduction

Writing a good prompt is just the beginning. Without a management strategy, problems quickly arise:

- What changes have you made?
- Which is the best version?
- How can you collaborate efficiently?

In this article, you will learn how to organize, version, and optimize your prompts with `Amazon Bedrock Prompt Management`, ensuring that you always have full control and can achieve the best results.

## 2. Prompt Management with Bedrock Prompt Management

`Bedrock Prompt Management` allows you to organize, version, and optimize prompts within a structured workflow, making it easier to control, continuously improve, and collaborate on projects using Amazon Bedrock.

![Prompt Management option in Bedrock image](prompt-management.png)

### 2.1. Key Features

Amazon Bedrock offers several features for effective prompt management:

- **Prompt Versioning**: Maintains a detailed history of changes made to prompts. Each new version is saved for future reference, making it easier to track modifications and roll back if needed.
- **Collaboration**: Prompts can be shared with team members, facilitating collaborative work in optimizing content.
- **Performance Analysis**: You can evaluate which prompts generate the best responses, helping you iterate and continuously improve your interactions and results.

### 2.2. Managing Your Prompts

Creating a new prompt is a simple process:

- Step 1: Define a name (and optionally a description)
  - When creating a new prompt, use a name that concisely describes it. You can add a description if necessary to provide more context.
  - ![Create new prompt image](create-prompt.png)
- Step 2: Configure the prompt
  - Add the prompt text (box 1 in the image)
  - Choose the model and configure its parameters (box 2 in the image)
  - Review the model-generated response to ensure it aligns with your expectations and objectives (box 3 in the image)
  - ![Prompt Builder](prompt-builder-en.png)

### 2.3. Comparing Prompt Variants

Bedrock Prompt Management allows you to test new versions of a prompt in several ways:

- Making changes to the prompt itself.
- Changing the model used to generate the response.
- Modifying the model parameter settings (e.g., temperature, max tokens).

Below is an example of how two variants of the same prompt are compared using different models:

![Compare variants configuration](compare-variants-models-1-en.png)

Once the variants are configured, we can analyze the generated responses to evaluate which one best meets our objectives.

![Compare variants response](compare-variants-models-2-en.png)

### 2.4. Optimizing Prompts

Do you want to improve the accuracy of your responses?

AWS Bedrock includes a feature that optimizes generated prompts, improving their performance based on the obtained responses. This functionality is available for some models.

![Optimizing prompts loading](optimizing-prompts.png)

When this optimization is applied, the optimized text appears alongside your original text, allowing you to compare changes and evaluate which version produces better results.

![Optimizing prompts done](optimizing-prompts-en.png)

For more information on how to use prompt optimization, you can check the official AWS documentation [here](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-optimize.html){:target="_blank"}.

> As of the publication date of this article, prompt optimization is in preview mode.
{: .prompt-info }

### 2.5. Versioning

Creating versions of your prompts is an excellent way to manage them effectively, preventing accidental overwrites.

![Generate new version of the prompt](save-prompt-version.png)

It is crucial to develop a well-defined versioning strategy to facilitate prompt management and change tracking.

Below, you can see the available versions of a prompt:

![Prompt version](prompt-versions.png)

> I still miss the option to add a `description` to prompt versions. This would be useful for quickly identifying what changes were made in each version.
>
> I'm sure AWS will include this feature in future updates.
{: .prompt-warning }

### 2.6. Managing My Prompts with CloudFormation

If you prefer to manage your prompts using Infrastructure as Code (IaC), you can do so via CloudFormation or SAM. Below is how you can create a prompt using CloudFormation.

It took me a while to get it working, so I hope this helps you:

```console
  MyExampleBedrockPrompt:
    Type: 'AWS::Bedrock::Prompt'
    Properties:
      Name: 'MyExamplePrompt'
      Description: 'Example prompt generated with CloudFormation'
      Variants:
        - Name: 'titan'
          ModelId: 'amazon.titan-text-express-v1'
          InferenceConfiguration:
            Text:
              Temperature: 0.7 # Adjusted temperature for more creative suggestions
              MaxTokens: 2048
          TemplateType: 'TEXT'
          TemplateConfiguration:
            Text:
              InputVariables:
                - Name: prompt_text
              Text: |
                Summarize my {"{prompt_text}"} ---> remove ""
```

This code snippet shows how to define a prompt that uses the Amazon Titan model.

### 2.7. Retrieving My Prompt from Code

If you want to access prompt details from your code, you can easily do so using the AWS SDK. Below is a Python example to retrieve prompt information via its ARN:

```python
def get_prompt_information(prompt_arn: str) -> tuple[str, float, int]:
    """Retrieve prompt content from Bedrock Prompt Management."""
    try:
        prompt_response = bedrock_agent.get_prompt(
            promptIdentifier=prompt_arn
        )

        variant = prompt_response['variants'][0]
        logger.debug(f"variant: {variant}")
        model_id = variant['modelId']
        prompt_text = variant['templateConfiguration']['text']['text']
        temperature = float(variant['inferenceConfiguration']['text']['temperature'])
        max_tokens = int(variant['inferenceConfiguration']['text']['maxTokens'])
        logger.debug(f"Prompt content retrieved successfully for ARN: {prompt_arn}. Temperature: {temperature}, Max Tokens: {max_tokens}")
        return prompt_text, temperature, max_tokens, model_id

    except Exception as e:
        logger.error(f"Error retrieving prompt content: {e}")
        raise
```

This Python code demonstrates how to retrieve detailed information about a prompt using its ARN, allowing you to integrate it into your applications programmatically.

## 3. Best Practices for Managing Prompts

Efficiently managing prompts is essential to maintaining quality and control as you scale your project in Amazon Bedrock. Here are some best practices:

- **Maintain Clear and Consistent Names**
  - Giving clear and consistent names to your prompts is crucial for quickly identifying their purpose and context.
  - A good name should accurately reflect what the prompt does, such as "SummarizeArticlePrompt" instead of generic names like "Prompt1." This makes searching and managing prompts easier, especially in projects with multiple prompts.
- **Establish a Versioning Strategy**
  - Versioning is crucial for tracking changes and reverting to previous versions when needed.
  - Whenever you make a significant modification to a prompt, ensure you create a new version instead of overwriting the previous one.
  - It is also helpful to assign a short description to each version to quickly identify the changes made, although, as I mentioned earlier, this feature is not yet available in Amazon Bedrock Prompt Management, so you will have to store it elsewhere.
- **Managing Collaboration Among Multiple People**
  - When working in a team, collaboration becomes a challenge.
  - To manage prompts correctly, ensure all team members have access to the same resources and versions.
  - Additionally, encourage the use of task-tracking tools to keep everyone informed about updates and changes, such as tags and comments on each prompt.
  - Proper access control is also essential to avoid accidental modifications.

## 4. Conclusion

If you work with Amazon Bedrock, starting to manage your prompts with Bedrock Prompt Management will save you time and improve the quality of your responses.

Do you already use Bedrock Prompt Management? Share your experience:

- How do you currently manage your prompts?
- What tips or strategies have worked best for you?
- What feature would you like AWS to add?

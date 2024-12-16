---
layout: post
title: 'Exploring Generative AI at AWS re:Invent 2024: My Journey and Thoughts'
date: 2024-12-12 23:58 +0100
last_modified_at:
description: At AWS re:Invent 2024, I explored AWS's generative AI tools, including Amazon Q Developer, Amazon Bedrock, and Amazon SageMaker. These tools offer powerful capabilities like code generation, pre-trained models, and advanced machine learning features, driving productivity and innovation while presenting new challenges and opportunities for integration.
category: AI
tags:
- level-200
published: true
level: 200
pin: false
featured_post: false
comments: true
sitemap: true
img_path: /assets/img/posts/2024-12-16-exploring-generative-ai-at-aws-re-invent-2024-my-journey-and-thoughts/
image:
  path: cover.jpeg
  header_post: false
---

> Disclaimer: Everything in this post reflects my personal opinions about generative AI.
{: .prompt-warning }

As of December 2024, it feels like AWS has finally entered the "generative AI race".

It’s amusing when people claim AWS has always been there. Sure, if you work for AWS, you might say that (whether you believe it or not), but within the broader community, that perception has been quite different.

For the past few years, AWS has been nearly 100% focused on generative AI. While it has been a big effort to be competitive on this field, and probably a lucrative strategy (now there is also a certification for that - [`AWS Certified AI Practitioner Certification`](https://aws.amazon.com/certification/certified-ai-practitioner/){:target="_blank"}), this obsession has also been frustrating for many people in the community, and a frequent topic of discussion among AWS users.

Take AWS events, for example. Generative AI seemed to dominate everything. If a session didn’t mention it, it almost felt out of place. And if you wanted to present without including generative AI, well... good luck!

For me, the most frustrating aspects have been:

- Generative AI is undoubtedly promising, but how do you use it practically? How can it truly improve solutions, enhance productivity, and ensure sensitive data remains secure? It felt like there were significant gaps in addressing these concerns.
- Some "generative AI" content wasn’t really about generative AI. Instead, it was the same old material with a touch of AI, leaving expectations unmet, almost like click-bait.

That said, AI (and especially generative AI) is undeniably a game-changer. It’s transforming lives already and will only continue to do so. The real question is: where are we on the technology adoption lifecycle?

![Technology-Adoption-Lifecycle-wikipedia](Technology-Adoption-Lifecycle-wikipedia.jpg)

After re:Invent 2024, my opinion of AWS's generative AI approach has shifted. Perhaps it’s because I now understand their offerings better, because they feel more mature and refined, or maybe all of these reasons combined.

> What about you? Where are you and what are your thoughts about it?
{: .prompt-info }

## AWS re:Invent and AWS generative AI

We knew that AWS re:Invent this year would be a generative AI-focused, immersive week. Everything was going to revolve around generative AI, so I decided to prepare by achieving the `AWS Certified AI Practitioner Certification`. This gave me a solid theoretical foundation, and I felt ready to learn as much as possible while hopefully changing my perception of generative AI.

![generative AI certification](ai-practitioner-certification.jpeg)

My goal was to understand the offerings better, get hands-on with AWS tools and services, and learn how to use them to boost my productivity and fill a few gaps I had:

- General
  - Explore how to use generative AI to help with the SDLC process (Amazon Q, Amazon Bedrock)
  - Explore how to use generative AI within my IDE (Amazon Q Developer)
  - Explore how agents work: both using simple approaches and creating my own agent from scratch (Amazon Bedrock and Amazon SageMaker)
  - Search within my own documents and databases (knowledge bases): Amazon Q Business, Amazon Bedrock and Amazon SageMaker
- Amazon Bedrock
  - Gain hands-on experience integrating Amazon Bedrock via APIs: API Gateway and AWS AppSync
  - Explore advanced Amazon Bedrock features
- Amazon SageMaker
  - Hands-on experience with SageMaker
  - Learn how to train and customize models using Amazon SageMaker

My two first conclusions was (I am not discovering anything really new):

- Creating custom solutions is complex, expensive, and requires expertise. Examples: Training your own model with SageMaker, customizing a model, navigating the numerous features available in both services...
- I wanted to use the simplest approaches, but I always had an eye on the cost. I wanted solutions that were easy to implement yet affordable

Now, I’m starting to see the light, and I am understanding everything better, but there’s still so much to learn. What I love most about generative AI is how simple it seems on the surface, while underneath, it could be incredibly complex.

### Amazon Q

Let’s start with Amazon Q, AWS’s generative AI assistant.

Last year this service was one of the big announcements, and it was exciting but felt prematurely launched. While its potential was clear, the execution didn’t quite meet expectations. For me it was frustrating.

Now, one year later, things feel different.

#### Amazon Q Developer

At re:Invent 2024, AWS presented many impressive new features for `Amazon Q Developer`:

- generating/refactoring code
- creating documentation with a single command
- creating unit tests
- performing code reviews

The tool integrates seamlessly into your IDE, which makes it perfect for developers, devops engineers, architects... anyone using the IDE! However, Amazon Q Developer is also available through the AWS Console, CLI, and even integrates with GitLab (currently in preview and quite expensive).

What is the best part for me? Amazon Q offers a `free tier` (with some limitations) and you can `disable the option to share data with AWS` so your data is safe.

This IDE integration of Amazon Q Developer is all I was looking for! You will have to check my [specific post about Amazon Q Developer to find why](/posts/amazon-q-developer-the-ai-powered-code-companion-i-ve-been-waiting-for/){:target="_blank"}.

#### What Happened to Amazon CodeWhisperer?

What is this `Amazon Q Developer` if we already had `Amazon CodeWhisperer`?

Amazon CodeWhisperer is gone. As of April 30, 2024, Amazon CodeWhisperer officially became part of Amazon Q Developer, so we could say that Amazon Q Developer is "*the same*", renamed and improved.

#### Amazon Q Business

There is more about Amazon Q: `Amazon Q Business`, which uses generative AI to `provide tailored insights and capabilities by integrating with organizational knowledge bases and resources`.

I tested it in a few workshops and while it feels incredibly promising, I do have concerns about its `potential costs`.

> Careful with the cost: the user price is very clear, but what about the Index pricing? magic. If you want to use it for your company it should be fine, but for personal use you have better options (and cheaper). [Pricing page of Amazon Q Developer](https://aws.amazon.com/q/business/pricing/?nc1=h_ls){:target="_blank"}
{: .prompt-warning }

### Amazon Bedrock and Amazon SageMaker: A Different League

And then we have **Amazon Bedrock** and **Amazon SageMaker**, two services that operate on a completely different level:

- **Amazon Bedrock** simplifies access to foundation models for generative AI tasks. It’s perfect for `developers` who want to use pre-trained models without delving deep into machine learning.
- **Amazon SageMaker**, on the other hand, is a comprehensive platform for building, training, and deploying ML models. It’s aimed at `data scientists and ML engineers` who need full control over the process.

This year, `Amazon Bedrock took the center stage at AWS re:Invent`, as expected, overshadowing SageMaker’s spotlight from last year. Both services are incredibly powerful and feature-rich, but I’ve noticed some overlap in their capabilities. It makes me wonder if AWS might eventually merge them.

The easiest way to integrate generative AI in your application is through an API and connecting it with Amazon Bedrock, and you can do it with a Lambda Function from API Gateway or AWS AppSync. You only have to find your use case, and manage the cost.

I want to mention two announces for Amazon Bedrock I will explore deeply soon (not here):

- **Knowledge Bases for Amazon Bedrock**: Allows creation of custom knowledge bases from your data in an easy way. You can also do it with Amazon Q Business (easy but expensive) and with Amazon SageMaker (complex but 100% customizable).
- **Agents for Amazon Bedrock**: Helps build task-oriented conversational experiences, and can execute multi-step tasks and integrate with external systems. I tested and it's very promising.

## Hands-on (workshops)

Finally, I would like to share with you a "few" workshops about generative AI, so you can explore them by yourself!

- **Generative AI (general)**
  - [Using generative AI on AWS for diverse content types](https://catalog.workshops.aws/genai-on-aws/en-US){:target="_blank"}: In this workshop, you will use generative AI on AWS to work with various types of contents, including documents, PDFs, videos files, audios files, images, business intelligence, SQL database, graph database, application logs, and streaming data. You will learn on how to leverage generative AI for tasks such as engaging in conversations, posing questions, content analysis, generating summaries, and generating images based on these diverse content sources.
- **Amazon Q Developer**
  - [Amazon Q Developer](https://catalog.workshops.aws/q-developer/en-US){:target="_blank"}: In this immersive workshop, you will explore the transformative impact of generative AI on the development activities, allowing you to apply next-generation developer experience  concepts throughout your SDLC. You will gain practical insights into how generative AI can significantly enhances your efficiency.
  - [Amazon Q Developer Workshop - Building the Q-Words App](https://catalog.workshops.aws/qwords/en-US){:target="_blank"}: In this workshop you will use Amazon Q Developer to accelerate your software development process.
- **Amazon Bedrock**
  - [Amazon Bedrock Workshop](https://catalog.workshops.aws/amazon-bedrock/en-US){:target="_blank"}: The goal of this workshop is to give you hands-on experience in leveraging foundation models (FMs) through Amazon Bedrock.
  - [Generative AI at scale: Serverless workflows for enterprise-ready apps](https://catalog.us-east-1.prod.workshops.aws/workshops/67ce9942-58f6-4caa-bf3b-c893f49b4368/en-US): In this workshop, you will gain hands-on experience with building production ready generative AI applications for some common generative AI use cases using Serverless services such as AWS Step Functions, Lambda and Amazon Bedrock.
  - [Create a Serverless Chatbot Using Amazon Bedrock, Amazon Kendra, and Your Own Data](https://catalog.us-east-1.prod.workshops.aws/workshops/27eb3134-4f33-4689-bb73-269e4273947a/en-US){:target="_blank"}: In this workshop, you use general chat and also use Retrieval-Augmented Generation (RAG) technique to build a generative AI-powered chatbot. A Large Language Model (LLM) in Amazon Bedrock is used to answer your chatbot questions through pre-indexed content.
- Cloud Operations
  - [Building operational resilience in workloads using generative AI](https://catalog.us-east-1.prod.workshops.aws/workshops/4696cd09-8385-4f54-9391-a96f69a3f924/en-US){:target="_blank"}: In this workshop, use AWS managed generative AI services in real-world scenarios to learn how to assess readiness, proactively improve your architecture, react quickly to events, troubleshoot issues, and implement effective observability practices.
  - [Intelligently Automating Cloud Operations](https://catalog.workshops.aws/intelligently-automating-cloud-operations/en-US){:target="_blank"}: You can surface insights from best practices, security, fault tolerance, and performance using AWS Trusted Advisor, AWS Health, and Amazon DevOps Guru. Join this workshop to learn how to automate these insights intelligently using AWS services and machine learning tools.
  - [Much more AI workshops here](https://workshops.aws/categories/AI%2FML){:target="_blank"}.

## Final Thoughts

While AWS’s generative AI journey has been frustrating at times, their progress is undeniable, and I look forward to continue exploring how their tools can reshape the way we work.

It's true that now I understand much better the AWS offering about generative AI, but `my general perspective about generative AI hasn’t changed`:

> we should embrace it in our daily workflows to improve productivity.
{: .prompt-tip }

But it’s also important to remember that `not every problem requires generative AI`. As always, `the key is using the right tool for the right job`.

If you’re curious to learn more about AWS’s generative AI offerings, I encourage you to explore tools like Amazon Q, Amazon Bedrock, and Amazon SageMaker. They represent the cutting edge of what’s possible in cloud-based AI today.

Next step?

I have already written about Amazon Q Developer [here](/posts/amazon-q-developer-the-ai-powered-code-companion-i-ve-been-waiting-for/){:target="_blank"}, in case you want to know more about it.

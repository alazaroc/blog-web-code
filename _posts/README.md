# Correcciones y sugerencias para los artículos de _posts/en

Este documento recopila los errores ortográficos, gramaticales y sugerencias de mejora detectados en cada artículo de la carpeta `_posts/en`.

## Tabla de contenido

- [How I decided on the technology behind the blog](#how-i-decided-on-the-technology-behind-the-blog)

---

## How I decided on the technology behind the blog

### 1) Typos y ortografía
- "doing proofs of concept" → "creating proofs of concept"
- "I finally decided on `Jekyll` just because I preferred the theme I used" → "I finally decided on `Jekyll` simply because I preferred the theme I used"
- "I didn't want to have to customize it too much" → "I didn't want to customize it too much"
- "But since I wanted it serverless and simple, in v1 (until March 5, 2023) I used <kbd>AWS Amplify</kbd> to help me with this point." → "But since I wanted it to be serverless and simple, in v1 (until March 5, 2023), I used <kbd>AWS Amplify</kbd> to help me with this."
- "I used **Amplify Hosting** for the following reasons (there are more, but the following are important to me):" → "I used **Amplify Hosting** for the following reasons (there are more, but these are the most important to me):"
- "As you can see, this solution is awesome if you want AWS to manage for you the CI/CD, web, cache, the certificate of your domain..." → "As you can see, this solution is awesome if you want AWS to manage the CI/CD, website, cache, and domain certificate for you..."
- "Version 1, using **Amplify Hosting**, was too 'automagic' for me and I am here to practice/play and show you the results... so **I migrated my website to a custom solution** to have more control and access to a wider range of services, which adds more fun!" → "Version 1, using **Amplify Hosting**, was too 'automagic' for me. Since I am here to practice/play and show you the results, I migrated my website to a custom solution to have more control and access to a wider range of services, which adds more fun!"
- "I created the infrastructure using Terraform with the following AWS services:" → "I created the infrastructure using Terraform, with the following AWS services:"
- "Lambda Edge" → "Lambda@Edge"
- "to use it in CloudFront, to transform all requests (required for Jekyll web)" → "to use it in CloudFront to transform all requests (required for Jekyll websites)"
- "The Infrastructure as Code (IaC) was created with <kbd>Terraform</kbd> and used the <kbd>Developer Tools</kbd> (Amazon CodeBuild and Amazon CodePipeline) to deploy and automate the IaC." → "The Infrastructure as Code (IaC) was created with <kbd>Terraform</kbd> and deployed/automated using <kbd>Developer Tools</kbd> (Amazon CodeBuild and Amazon CodePipeline)."
- "or create your solutions" → "or create your own solutions"
- "I don't want to use external plugins if I can do the same by myself in AWS and practice/play with new services in the process." → "I don't want to use external plugins if I can do the same myself in AWS and practice/play with new services in the process."
- "After creating my empty blog I thought that it would be a good idea to implement the following:" → "After creating my empty blog, I thought it would be a good idea to implement the following:"
- "Add comments to each post (register it and show it)" → "Add comments to each post (store and display them)"
- "Now, I have a basic implementation of these points but I will improve it in the future." → "Now, I have a basic implementation of these features, but I will improve them in the future."
- "I am not interested in doing it that way. I want separation of concerns and manage both independently." → "I am not interested in doing it that way. I want separation of concerns and to manage both independently."
- "Custom AWS solution:" → "Custom AWS solution:"
- "At this moment, I only store the subscription information and if I want to send emails I have to do it manually. However, in the future, I will automate it, and I will add the option to unsubscribe in the email sent." → "At this moment, I only store the subscription information, and if I want to send emails, I have to do it manually. However, in the future, I will automate it and add the option to unsubscribe in the email sent."
- "This solution was a custom AWS solution to use more AWS services and although I received some comments and stored them in the database, I didn't implement the system to display them on the blog." → "This was a custom AWS solution to use more AWS services. Although I received some comments and stored them in the database, I didn't implement a system to display them on the blog."
- "Now, I am using CDK (Cloud Development Kit) and Terraform." → "Now, I am using the CDK (Cloud Development Kit) and Terraform."
- "Initially, in version 1, I used:" → "Initially, in version 1, I used the following:"
- "Honestly, I did not evaluate other options, since I knew which one to choose and I wanted to be as simple as possible." → "Honestly, I did not evaluate other options, since I knew which one to choose and wanted to keep it as simple as possible."
- "To me, with a developer background, AWS CloudFormation is complex and AWS CDK fills the gap because it allows me to use a programming language to create the infrastructure easily, it is wonderful." → "For me, with a developer background, AWS CloudFormation is complex, and AWS CDK fills the gap because it allows me to use a programming language to create the infrastructure easily. It is wonderful."
- "However, I have now migrated the `frontend infrastructure` to `Terraform`. The `backend infrastructure` continues to be `CDK with TypeScript`." → "However, I have now migrated the `frontend infrastructure` to `Terraform`, while the `backend infrastructure` continues to use `CDK with TypeScript`."
- "I have written the following articles to explain it:" → "I have written the following articles to explain this:"
- "Price information by services used:" → "Price information for the services used:"
- "The domain name purchase on Route53 is annual and is paid in the month of purchase, but for simplicity, I have slitted it into each month." → "The domain name purchase on Route53 is annual and is paid in the month of purchase, but for simplicity, I have split it into each month."
- "Also, the invoice category is NOT Route53 but 'Registrar', 'Global Region', and 'Amazon Registrar DomainRegistration'." → "Also, the invoice category is NOT Route53 but 'Registrar', 'Global Region', and 'Amazon Registrar DomainRegistration'."
- "Use **Amazon Route53** for Register Domain is not the cheapest option. I paid $12 instead of around $1 for the first year with GoDaddy, but it is worth it." → "Using **Amazon Route53** to register a domain is not the cheapest option. I paid $12 instead of around $1 for the first year with GoDaddy, but it is worth it."
- "I have many next steps identified, but I will put here the ones related to the content of this post." → "I have identified many next steps, but I will list here the ones related to the content of this post."
- "I have slitted it into each month." → "I have split it into each month."

### 2) Sugerencias de mejora
- **SEO**: El título podría ser más SEO-friendly, por ejemplo: "The Technology Stack Behind My AWS-Powered Blog (Jekyll, Amplify, Terraform, CDK)".
- **Claridad**: En la sección de "Backend", podrías añadir una frase introductoria que explique por qué un blog estático puede necesitar backend (formularios, comentarios, etc.).
- **Consistencia**: Usar siempre "AWS CDK" en vez de solo "CDK" para mayor claridad para lectores menos expertos.
- **Enlaces internos**: Asegúrate de que los enlaces internos (`/posts/...`) funcionan correctamente en el entorno de producción.
- **Tabla de precios**: Considera añadir una nota sobre la fluctuación de precios y la importancia de revisar la calculadora oficial de AWS.
- **Conclusión**: Añadir una breve conclusión/reflexión al final puede ayudar a cerrar el artículo y mejorar la retención del lector.

---

## 2024-10-10-why-the-aws-well-architected-framework-really-matters.md

### Typos & Suggestions

- **Title**: Consider capitalizing "Really" for consistency: `Why the AWS Well-Architected Framework Really Matters (1/5)`
- **Front matter**: There is a duplicated `---` after the YAML block. Remove the extra one.
- **Section 2.1**: "Gain strategic vision: Make more informed decisions and back them up with solid reasoning." → Consider: "Gain a strategic vision: Make more informed decisions and support them with solid reasoning."
- **Section 3.1**: "At its core, it's a guide for making informed decisions about the architecture of your applications and workloads on AWS, helping you reduce risks, optimize costs, and improve reliability and performance." → This sentence is a bit long. Consider splitting for clarity.
- **Section 3.3.1**: "Automate with architectural experimentation in mind" → Consider: "Automate with experimentation in mind" or "Automate to enable experimentation".
- **Section 3.3.2**: "The Six Pillars represent the core areas that guide your focus when building well-architected cloud solutions." → Consider: "The Six Pillars represent the core areas to focus on when building well-architected cloud solutions."
- **Section 3.4**: "The goal isn't to have a perfect architecture, but to improve it continuously." → Consider: "The goal isn't to have a perfect architecture, but to continuously improve it."
- **Section 4**: "It's not just a set of guidelines, it's a powerful tool that can help you design and manage cloud workloads that are secure, reliable, efficient, and cost-effective." → Consider: "It's not just a set of guidelines; it's a powerful tool that can help you design and manage cloud workloads that are secure, reliable, efficient, and cost-effective."
- **General**: The article is well-written and clear. Only minor style and clarity suggestions above.

---

## 2024-10-11-how-to-apply-the-well-architected-framework-depending-on-your-cloud-role.md

### Typos & Suggestions

- **Title**: Consider capitalizing "Depending" for consistency: `How to Apply the Well-Architected Framework Depending on Your Cloud Role (2/5)`
- **Front matter**: Hay un `---` duplicado después del bloque YAML. Eliminar el extra.
- **Section 2.2**: "Operations teams keep the cloud environment stable, efficient, and aligned with business needs by managing daily operations and solving operational challenges." → Consider: "Operations teams keep the cloud environment stable, efficient, and aligned with business needs by managing daily operations and addressing operational challenges."
- **Section 3.2**: "Telationship between roles and the pillars" → Typo: should be "Relationship between roles and the pillars".
- **General**: The article is clear and well-structured. Only minor style and clarity suggestions above.

--- 

---

## Títulos y descripciones: propuestas de mejora

### 2022-03-01-the-technology-behind-this-blog.md
- **Title**: "How I decided on the technology behind the blog" → Sugerencia: "How I Decided on the Technology Behind the Blog" (capitalización)
- **Description**: "Before creating my blog and starting posting I did a lot of research comparing technologies, doing proofs of concept, and it took me weeks to figure out how to do it until I felt comfortable with the solution. Want to know more?"
  - Sugerencia: "Before creating my blog and starting to post, I did a lot of research, compared technologies, and built proofs of concept. It took me weeks to find a solution I felt comfortable with. Want to know more?" (mejorar claridad y gramática)

### 2024-10-10-why-the-aws-well-architected-framework-really-matters.md
- **Title**: "Why the AWS Well-Architected Framework really matters (1/5)" → Sugerencia: "Why the AWS Well-Architected Framework Really Matters (1/5)" (capitalización)
- **Description**: "This article provides a comprehensive introduction to the AWS Well-Architected Framework, explaining its core design principles and the six pillars. It demonstrates how cloud professionals can apply these best practices to build cloud architectures while driving continuous improvement."
  - Sugerencia: "This article provides a comprehensive introduction to the AWS Well-Architected Framework, explaining its core design principles and the six pillars. It demonstrates how cloud professionals can apply these best practices to build robust cloud architectures and drive continuous improvement." (añadir "robust" y simplificar)

### 2024-10-11-how-to-apply-the-well-architected-framework-depending-on-your-cloud-role.md
- **Title**: "How to apply the Well-Architected Framework depending on your cloud role (2/5)" → Sugerencia: "How to Apply the Well-Architected Framework Depending on Your Cloud Role (2/5)" (capitalización)
- **Description**: "Discover how different roles can apply the AWS Well-Architected Framework to improve the quality, reliability, security, and sustainability of cloud solutions."
  - Sugerencia: "Discover how different roles can apply the AWS Well-Architected Framework to improve the quality, reliability, security, and sustainability of cloud solutions." (correcta, sin cambios necesarios)

### 2024-10-12-the-six-pillars-of-aws-well-architected-framework-best-practices-for-cloud-success.md
- **Title**: "The Six Pillars of AWS Well-Architected Framework: Best Practices for Cloud Success (3/5)" → Sugerencia: "The Six Pillars of the AWS Well-Architected Framework: Best Practices for Cloud Success (3/5)" (añadir "the")
- **Description**: "Explore a deep dive into the Six Pillars of the AWS Well-Architected Framework, with best practices, key services, and role-based responsibilities for building secure, resilient, and cost-efficient cloud systems, optimized for performance and sustainability."
  - Sugerencia: "Explore an in-depth look at the Six Pillars of the AWS Well-Architected Framework, including best practices, key services, and role-based responsibilities for building secure, resilient, and cost-efficient cloud systems optimized for performance and sustainability." (mejorar claridad)

### 2024-10-13-immediate-impact-quick-wins-for-each-pillar-of-the-aws-well-architected-framework.md
- **Title**: "Immediate Impact: Quick Wins for Each Pillar of the AWS Well-Architected Framework (4/5)" (correcto)
- **Description**: "Discover actionable quick wins for each AWS Well-Architected Pillar, helping you optimize cloud performance, security, and cost-efficiency."
  - Sugerencia: "Discover actionable quick wins for each AWS Well-Architected Pillar to help you optimize cloud performance, security, and cost-efficiency." (añadir "to help you")

### 2024-10-14-how-the-aws-well-architected-tool-can-transform-your-cloud-architecture.md
- **Title**: "How the AWS Well-Architected Tool Can Transform Your Cloud Architecture (5/5)" (correcto)
- **Description**: "Practical guide to using the AWS Well-Architected Tool, explaining why assessments matter and covering how to assess, refine, and optimize cloud workloads, with detailed steps, recommendations, and tips for continuous improvement."
  - Sugerencia: "A practical guide to using the AWS Well-Architected Tool, explaining why assessments matter and how to assess, refine, and optimize cloud workloads, with detailed steps, recommendations, and tips for continuous improvement." (añadir "A" y simplificar)

### 2024-12-11-amazon-q-developer-the-ai-powered-code-companion-i-ve-been-waiting-for.md
- **Title**: "Amazon Q Developer: The AI-Powered Code Companion You Have Been Waiting For" (correcto)
- **Description**: "Amazon Q Developer is an advanced AI-powered tool designed to assist AWS developers. It offers seamless code suggestions, transformations, testing, and documentation directly in IDEs. This article demonstrates its practical applications while addressing security, privacy, and ease of use."
  - Sugerencia: "Amazon Q Developer is an advanced AI-powered tool designed to assist AWS developers. It offers seamless code suggestions, transformations, testing, and documentation directly in IDEs. This article demonstrates its practical applications and addresses security, privacy, and ease of use." (añadir "and addresses")

### 2024-12-16-exploring-generative-ai-at-aws-re-invent-2024-my-journey-and-thoughts.md
- **Title**: "Exploring Generative AI at AWS re:Invent 2024: My Journey and Thoughts" (correcto)
- **Description**: "Explore AWS's generative AI offerings, including Amazon Q Developer, Amazon Bedrock, and Amazon SageMaker, through hands-on experiences and insights from AWS re:Invent 2024."
  - Sugerencia: "Explore AWS's generative AI offerings-including Amazon Q Developer, Amazon Bedrock, and Amazon SageMaker-through hands-on experiences and insights from AWS re:Invent 2024." (usar em dash para claridad)

### 2025-03-26-introduction-to-amazon-bedrock-and-its-foundational-models.md
- **Title**: "Amazon Bedrock 101: Understanding Its Foundational Models" (correcto)
- **Description**: "Discover how Amazon Bedrock simplifies access to AI foundation models, their use cases, advantages, and how to integrate them into applications to generate content, analyze data, and improve processes."
  - Sugerencia: "Discover how Amazon Bedrock simplifies access to AI foundation models, their use cases and advantages, and how to integrate them into applications to generate content, analyze data, and improve processes." (añadir "and" para claridad)

### 2025-03-29-designing-effective-prompts-in-amazon-bedrock.md
- **Title**: "Prompts I: How to Design Effective Prompts in Amazon Bedrock" (correcto)
- **Description**: "Discover how to design effective prompts in Amazon Bedrock to improve the quality of AI model responses. Learn how to structure your prompts, apply advanced techniques, and validate their effectiveness."
  - Sugerencia: "Discover how to design effective prompts in Amazon Bedrock to improve the quality of AI model responses. Learn how to structure your prompts, apply advanced techniques, and validate their effectiveness." (correcta, sin cambios necesarios)

### 2025-03-31-effective-prompt-management-in-amazon-bedrock.md
- **Title**: "Prompts II - Effective Prompt Management in Amazon Bedrock: Versioning, Optimization, and Best Practices" (correcto)
- **Description**: "In this article we explore how to effectively manage prompts in Amazon Bedrock, covering key functionalities such as versioning, optimization and collaboration to enhance your AI-based projects."
  - Sugerencia: "In this article, we explore how to effectively manage prompts in Amazon Bedrock, covering key functionalities such as versioning, optimization, and collaboration to enhance your AI-based projects." (añadir coma tras "article" y tras "optimization")

### 2025-05-24-adding-real-user-monitoring-to-my-blog-with-cloudwatch-rum.md
- **Title**: "Adding Real User Monitoring to my blog with CloudWatch RUM" → Sugerencia: "Adding Real User Monitoring to My Blog with CloudWatch RUM" (capitalización)
- **Description**: "Amazon CloudWatch RUM provides real-time insights into web application performance, user interactions, and errors. This guide explains its features, setup, and best practices to optimize monitoring."
  - Sugerencia: "Amazon CloudWatch RUM provides real-time insights into web application performance, user interactions, and errors. This guide explains its features, setup, and best practices for optimizing monitoring." (mejorar claridad)

### 2025-06-27-why-step-functions.md
- **Title**: "Getting Started with AWS Step Functions: The Serverless Workflow You Need" (correcto)
- **Description**: "Discover how AWS Step Functions can help you orchestrate serverless workflows effortlessly. In this article, I'll walk you through the basics, real-world examples, and why Step Functions might just be the missing piece in your serverless architecture."
  - Sugerencia: "Discover how AWS Step Functions can help you orchestrate serverless workflows effortlessly. In this article, I'll walk you through the basics, real-world examples, and why Step Functions might be the missing piece in your serverless architecture." (eliminar "just")

--- 
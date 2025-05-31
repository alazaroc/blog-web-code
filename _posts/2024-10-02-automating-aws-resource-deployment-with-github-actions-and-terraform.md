---
layout: post
title: Automating AWS Resource Deployment with GitHub Actions and Terraform
date: 2024-10-02 08:38 +0200
last_modified_at:
lang: en
lang-exclusive: ['en']
description: Learn how to automate the deployment of AWS resources using Terraform and GitHub Actions in this step-by-step guide.
category: 
- DevOps
tags: 
- how-to
- github
- github-actions
- iac
- cicd
- terraform
- level-300
level: 300
published: true
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath:  /assets/img/posts/2024-10-02-automating-aws-resource-deployment-with-github-actions-and-terraform/
image:
  path: 7-deployment-successful.png
  header_post: false
---

## 1. Introduction

In previous articles, we have discussed about `Terraform` and explored various `DevOps strategies for automating deployments on AWS`.

- [How to deploy a serverless website with Terraform](/posts/how-to-deploy-serverless-website-with-terraform/)
- [How to Add CI/CD to my CDK Project](/posts/how-to-add-ci-cd-to-my-cdk-project/)
- [How to Add CI/CD to my SAM Project](/posts/how-to-add-ci-cd-to-my-sam-project/)

Now, we'll automate the `deployment of Terraform projects using GitHub Actions`. Regardless of what you need to deploy, this approach enables efficient, automated Terraform-based infrastructure deployments.

You can find the repository created for this article here [aws-terraform-github-actions-deployment](https://github.com/alazaroc/terraform-aws-cicd-github-actions).

> Feel free to customize the example. You can use this same approach can be used to deploy any AWS resource!
{: .prompt-tip }

### 1.1. What is GitHub Actions?

**GitHub Actions** is an automation tool within GitHub that allows you to create workflows triggered by GitHub events, such as pushes or pull requests. It's commonly used for CI/CD pipelines to automate tasks like testing, building, and deploying applications.

### 1.2. How GitHub Actions works with Terraform

When using GitHub Actions to deploy Terraform resources, the typical workflow involves:

- **Triggering workflows** based on changes in the repository.
- **Setting up AWS credentials** using GitHub Secrets.
- **Running Terraform commands** (e.g., `terraform plan`, `terraform apply`) to manage infrastructure.

### 1.3. Prerequisites

Before getting started, make sure you have:

- **AWS Credentials**: An IAM user with access keys and permissions to deploy Terraform resources in the AWS Account.
- **GitHub Repository**: A GitHub repository to store your Terraform configuration.
  - > I'll use this repository: [aws-terraform-github-actions-deployment](https://github.com/alazaroc/terraform-aws-cicd-github-actions){:target="_blank"}
    {: .prompt-info }
- **Configure remote backend for Terraform State** (Optional): You can use an S3 bucket and DynamoDB table to manage state locking.
- **Terraform Installed Locally** it's recommended for testing locally before committing.

## 2. Step 1: Prepare the Terraform Code

Create your Terraform code. In this example, we will deploy a simple AWS Budget resource, but you can deploy anything using Terraform.

First, create a `main.tf` file with the following code:

```hcl
provider "aws" {
  region = "eu-west-1"
}

# Customize with your own S3 bucket and DynamoDB table if you want to use a Remote Backend for State
terraform {
  backend "s3" {
    bucket         = "terraform-tfstate-playingaws-poc"     # Update it 
    key            = "poc/terraform-github-actions.tfstate" # Update it
    region         = "eu-west-1"                            # Update it
    dynamodb_table = "terraform-lock"                       # Update it
    encrypt        = true
  }
}

resource "aws_budgets_budget" "zero_spend_budget" {
  name         = "ZeroSpendBudget"
  budget_type  = "COST"
  limit_amount = "0.1"
  limit_unit   = "USD"
  time_unit    = "MONTHLY"
  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 0
    threshold_type             = "ABSOLUTE_VALUE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = ["your_email@domain.com"]
  }
}
```

> If you don't include the backend configuration, by default, Terraform state is stored locally in the GitHub runner. This means that in subsequent executions, you could encounter state inconsistencies, so it's recommended to use a remote backend. {: .prompt-warning }
{: .prompt-warning }

> If you include the backend configuration but you have not created the S3 bucket and the DynamoDB table in the first place, you will receive an error in the pipeline execution.
{: .prompt-danger }

## 3. Step 2: Configure GitHub Actions for Terraform Deployment

Now that we have the Terraform code, let's set up `GitHub Actions` to automate its deployment.

Create the workflow file in your GitHub repository at `.github/workflows/terraform-deploy.yml`.

```yaml
name: Deploy Terraform

on:
  push:
    branches:
      - main

jobs:
  terraform:
    name: Deploy Terraform Job
    runs-on: ubuntu-latest

    steps:
      # Pulls the latest version of your code from the GitHub repository
      - name: Checkout code
        uses: actions/checkout@v2

      # Installs Terraform on the GitHub runner
      - name: Set up Terraform
        uses: hashicorp/setup-terraform@v3

      # Configures your AWS access by using the credentials stored in GitHub Secrets
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${ { secrets.AWS_ACCESS_KEY_ID } }
          aws-secret-access-key: ${ { secrets.AWS_SECRET_ACCESS_KEY } }
          aws-region: "eu-west-1"

      # Initialize terraform
      - name: Initialize Terraform
        run: terraform init

      # Execute the terraform plan
      - name: Terraform Plan
        run: terraform plan

      # Deploy terraform changes
      - name: Terraform Apply
        run: terraform apply -auto-approve

      # Destroy terraform resources (uncomment lines below)
      # - name: Terraform Destroy
      #   run: terraform destroy -auto-approve
```

## 4. Step 3: Configuring AWS Credentials in GitHub

To allow GitHub Actions to deploy resources in your AWS account, you need to store your AWS credentials in GitHub Secrets.

- Go to your repository's settings.
  - ![1-access-settings](1-access-settings.png)
- Navigate to Secrets and Variables > Actions.
  - ![2-access-secrets](2-access-secrets.png)
  - ![3-create-new-secret](3-create-new-secret.png)
- Add the following secrets:
  - `AWS_ACCESS_KEY_ID`: Your AWS Access Key ID.
  - `AWS_SECRET_ACCESS_KEY`: Your AWS Secret Access Key.
  - ![4-secrets-created](4-secrets-created.png)

This ensures that your AWS credentials are securely available to the GitHub Actions workflow.

> While your repository might be public, your AWS credentials remain secure by being stored in the encrypted Secrets section.
>
> GitHub also has built-in `Secrets Detection` to prevent accidental exposure. {: .prompt-warning }
{: .prompt-warning }

## 5. Step 4: Testing the Setup

Push your Terraform code and GitHub Actions configuration to the main branch.

![5-commit-code](5-commit-code.png)

GitHub Actions will trigger automatically, and you can monitor the deployment under the Actions tab of your repository.

![6-automatic-deployment](6-automatic-deployment.png)

If the deployment succeeds, your AWS Budget (or whatever Terraform resource you define) will be applied automatically.

![7-deployment-successful](7-deployment-successful.png)

![8-aws-resource-created](8-aws-resource-created.png)

Now, each time you push changes to the repository, the pipeline will be triggered, and if you have no done changes, the pipeline will finish with this message:

![9-new-execution-without-changes](9-new-execution-without-changes.png)

## 6. Conclusion

By using `GitHub Actions` to deploy Terraform resources, `you can fully automate your infrastructure management processes`. The combination of Terraform and GitHub Actions creates a powerful CI/CD pipeline, allowing you to deploy infrastructure changes automatically.

Although we used an AWS Budget resource in this example, you can apply the same process to any other AWS resource supported by Terraform.

## 7. Next steps

- Manual Approval for terraform apply: Add a manual approval step to review the terraform plan output
- Include Security Tools: Integrate tools like tflint and checkov to lint and check for security issues
- Automate Testing: Use unit testing frameworks like terratest to validate your Terraform code before deployment

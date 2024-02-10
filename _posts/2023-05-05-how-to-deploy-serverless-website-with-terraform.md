---
layout: post
title: How to deploy a serverless website with Terraform
date: 2023-05-05 20:53 +0200
last_modified_at:
description: Terraform is the main open-source tool to create infrastructure as code (IaC) in any cloud provider. In this article, we will review how we can use it to deploy a serverless website on AWS.
category:
- IaC
tags:
- how-to
- iac
- terraform
- github
- serverless
- level-200
level: 200
published: true
pin: false
featured_post: false
comments: true
sitemap: true
img_path: /assets/img/posts/2023-05-05-how-to-deploy-serverless-website-with-terraform/
image:
  path: terraform-website.png
  header_post: false
---
---

## Introduction

As you already know, creating and managing infrastructure can be a complex and time-consuming process, and fortunately, tools like **Terraform** can simplify this process by allowing you to define your Infrastructure as Code (IaC). In this article, we will explore the basics of Terraform and walk through how to create infrastructure on AWS using it.

However, this is not my first article about Infrastructure as Code tools.

- If you want to know how to create infrastructure using familiar **programming languages** you can review this article about CDK: [How to create infrastructure with CDK](/posts/how-to-add-ci-cd-to-my-cdk-project/){:target="_blank"}
- If you want to create **serverless applications** on AWS, you can review this other article about SAM: [How to create serverless applications with SAM](/posts/how-to-create-serverless-applications-with-sam/){:target="_blank"}

> I have uploaded the source code used in this article in the following GitHub repository [https://github.com/alazaroc/aws-terraform-serverless-website](https://github.com/alazaroc/aws-terraform-serverless-website){:target="_blank"}
{: .prompt-info }

## What is Terraform?

[Terraform](https://www.terraform.io/){:target="_blank"} is an open-source Infrastructure as Code (IaC) software tool created by HashiCorp. It allows you to define and manage your infrastructure using human-readable configuration files that you can version, reuse, and share. You can then use a consistent workflow to provision and manage all of your infrastructure throughout its lifecycle. Terraform supports a wide range of cloud providers, including AWS, Microsoft Azure, and Google Cloud Platform.

## How Terraform Works

Terraform uses a declarative configuration language called HashiCorp Configuration Language (HCL).

**In a nutshell:**

![how-terraform-works](how-terraform-works.png)

- **Write**: You define your infrastructure in a series of .tf files, which contain the configuration for your resources
- **Plan**: Terraform then uses this configuration to generate an execution plan, which outlines the changes that will be made to your infrastructure.
- **Apply**: Once you have reviewed the execution plan, you can apply it to your infrastructure using the "`terraform apply`" command. Terraform will then provision your resources according to the configuration you defined.

## Getting Started with Terraform

To get started with Terraform, you will need to **install it** on your machine. You can download the latest version of Terraform from the official website [here](https://developer.hashicorp.com/terraform/downloads){:target="_blank"}, and if you want to deploy on AWS, you also need AWS CLI.

Once you have installed Terraform, you can start creating your infrastructure.

In this section, we will review how Terraform works creating a first example to deploy a simple S3 bucket:

- Create a new directory for your Terraform configuration file:

  ```console
  mkdir my-serverless-website
  cd my-serverless-website
  ```

- Create a new file called "main.tf" and there we are going to include the `AWS provider information` with the "us-east-1" region, and one resource of type `aws_s3_bucket` to create an S3 bucket with all the default configuration. Remember that the S3 bucket name must be unique globally.

  ```terraform
  provider "aws" {
    region = "us-east-1"
  }

  resource "aws_s3_bucket" "website_bucket" {
    bucket = "my-unique-bucket-name-12y398y13489148h"
  }
  ```

- **Initialize** your Terraform configuration.

  ```console
  terraform init
  ```

  When you run `terraform init`, Terraform downloads and installs the necessary provider plugins and modules required for your configuration. It also initializes the backend, which is the storage location for your `Terraform state file`. The state file is used to store the current state of your infrastructure, and it is used by Terraform to plan and apply changes to your infrastructure.

- Generate an execution **plan** (optional):

  ```console
  terraform plan
  ```

  This command generates an execution plan based on the configuration in your `main.tf` file, and let you check what is going to be deployed.

- **Apply** the execution plan to deploy on AWS:

  ```console
  terraform apply
  ```

  When you run `terraform apply`, Terraform compares the current state of your infrastructure with the desired state defined in your configuration. It then creates, modifies, or deletes resources as necessary to bring your infrastructure into the desired state. In our example, a new S3 bucket will be deployed.

- Now, the AWS resources have been created. Let's check it accessing the AWS S3 service to access the new resource created by Terraform:

  ![terraform-s3](terraform-s3.png)

> We already know how to deploy AWS resources with Terraform, so in the following section, we will evolve the initial example to deploy three serverless websites using S3 bucket.
{: .prompt-tip }

## How to deploy a serverless website with Terraform

We have an AWS S3 bucket deployed, and now we are going to use it to host a serverless website. There are different ways to do it, and we are going to evolve the S3 bucket to create a serverless static website.

This is what we are going to build:

![terraform-website](terraform-website.png)

- **v1.1**: public S3 bucket
  - **Advantage**: easy to implement
  - **Disadvantages**: no custom domain, no aligned with security best practices (public bucket), no cache for static files
- **v1.2**: public S3 as `Static website hosting`
  - **Advantages**: easy to implement, index document and error page, redirection rules
  - **Disadvantages**: not aligned with security best practices (public bucket), no cache for static files, Amazon S3 website endpoints do not support HTTPS (if you want to use HTTPS, you can use Amazon CloudFront to serve a static website hosted on Amazon S3)
- **v2**: CloudFront distribution + private S3 bucket
  - **Advantage**: easy to implement, private s3 bucket, cache for static files
  - **Disadvantages**: auto-generated domain name
- **v3**: Route53 + ACM + CloudFront Distribution + private S3 bucket + optionally Lambda Edge
  - **Advantages**: custom domain name using AWS managed certificates, private s3 bucket, cache for static files
  - **Disadvantages**: more complex to implement

In these examples, we are going to deploy a static website based on an `index.html` file with this content:

```html
This is my serverless website
```
{: .nolineno }

### v1.1: public S3 bucket

In this version 1.1 we are going to expose the S3 bucket publicly so any person can access the `index.html` file using the public S3 endpoint.

- **Advantage**:
  - easy to implement
- **Disadvantages**:
  - no custom domain
  - no aligned with security best practices (public bucket)
  - no cache for static files

> This solution is not aligned with security best practices because it expose an S3 bucket publicly.
{: .prompt-warning }

Update the file "main.tf" with the following content:

```terraform
provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "website_bucket" {
  bucket = "my-unique-bucket-name-12y398y13489148h"
}

resource "aws_s3_object" "website_bucket" {
  bucket       = aws_s3_bucket.website_bucket.id
  key          = "index.html"
  source       = "index.html"
  content_type = "text/html"
}

resource "aws_s3_account_public_access_block" "website_bucket" {
  block_public_acls   = false
  block_public_policy = false
}

resource "aws_s3_bucket_public_access_block" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid = "PublicReadGetObject"
        Effect = "Allow"
        Principal = "*"
        Action = [
          "s3:GetObject",
          "s3:ListBucket",
        ]
        Resource = [
          "${aws_s3_bucket.website_bucket.arn}",
          "${aws_s3_bucket.website_bucket.arn}/*"
        ]
      }
    ]
  })
}
```

Now, execute the terraform apply command: `terraform apply --auto-approve`

Then, open a private window in your browser and access the `index.html` content using the public endpoint of our S3 bucket. If you have executed the code before, it will be the following URL: [https://my-unique-bucket-name-12y398y13489148h.s3.amazonaws.com/index.html](https://my-unique-bucket-name-12y398y13489148h.s3.amazonaws.com/index.html){:target="_blank"}

![s3-website](terraform-s3-website.png)

### v1.2: Static website hosting using S3

In this version, similar to the previous one, we still have exposed the S3 bucket publicly but we will enable the static website hosting feature of S3.

- **Advantages**:
  - easy to implement
  - static website includes the configuration of an index document, an error page and also redirection rules
- **Disadvantages**:
  - not aligned with security best practices (public bucket)
  - no cache for static files
  - Amazon S3 website endpoints **do not support HTTPS** (if you want to use HTTPS, you can use Amazon CloudFront to serve a static website hosted on Amazon S3)

> This solution is not aligned with security best practices because it expose an S3 bucket publicly.
{: .prompt-warning }

Using the content of the "main.tf" showed in the previous v1.1 example, add at the end of the document the following lines:

```terraform
resource "aws_s3_bucket_website_configuration" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id
  index_document {
    suffix = "index.html"
  }
}
```

Now, execute the terraform apply command: `terraform apply --auto-approve`

Then, open a private window in your browser and access through the static website to the `index.html` content: ```http://my-unique-bucket-name-12y398y13489148h.s3-website-us-east-1.amazonaws.com/```

![s3-static-website](terraform-s3-static-website.png)

> If you didn't realize before, look that we are using HTTP, not HTTPS. S3 static website don't support HTTPS.
{: .prompt-warning }

### v2: CloudFront Distribution + private S3 bucket

In this version, we are going to change the bucket to private again (and also, we are going to enable again the `Block Public Access settings for this account` feature of S3), and we are going to create a CloudFront Distribution connected with the private S3 bucket. So, we are going to access the S3 bucket using the CloudFront distribution.

- **Advantage**:
  - easy to implement
  - private s3 bucket (aligned with the security best practices)
  - includes a cache for static files
- **Disadvantages**:
  - auto-generated domain name (by CloudFront)

Replace the "main.tf" content with the following lines:

```terraform
provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "website_bucket" {
  bucket = "my-unique-bucket-name-12y398y13489148h"
}

resource "aws_s3_account_public_access_block" "website_bucket" {
  block_public_acls   = true
  block_public_policy = true
  ignore_public_acls = true
  restrict_public_buckets = true
}

resource "aws_s3_object" "website_bucket" {
  bucket       = aws_s3_bucket.website_bucket.id
  key          = "index.html"
  source       = "index.html"
  content_type = "text/html"
}

resource "aws_cloudfront_distribution" "cdn_static_site" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  comment             = "my cloudfront in front of the s3 bucket"

  origin {
    domain_name              = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_id                = "my-s3-origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
  }

  default_cache_behavior {
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "my-s3-origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      locations        = []
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true 
  }
}

resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "cloudfront OAC"
  description                       = "description of OAC"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.cdn_static_site.domain_name
}

data "aws_iam_policy_document" "website_bucket" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.website_bucket.arn}/*"]
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "aws:SourceArn"
      values   = [aws_cloudfront_distribution.cdn_static_site.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = data.aws_iam_policy_document.website_bucket.json
}

```

Now, execute the terraform apply command: `terraform apply --auto-approve`

Then, open a private window in your browser and access the `index.html` content using the CloudFront DNS. The execution of the terraform template has as output the URL of the CloudFront Distribution.

![terraform-cloudfront](terraform-cloudfront.png)

> Now, the S3 bucket is private, so if you access to the public endpoint of S3 trying to get the `index.html` file you will receive an error
{: .prompt-info }

### v3: Route53 + ACM + CloudFront Distribution + private S3 bucket

In the last example, we will use our domain (registered in Route53) and we will create a certificate using ACM.

- **Requirement**:
  - Required a custom domain
- **Advantages**:
  - custom domain name using AWS-managed certificates
  - private s3 bucket (aligned with the security best practices)
  - includes a cache for static files
- **Disadvantages**:
  - more complex to implement

> To be able to run this example you need your own domain (example.com) and you have to register it in Route53 service. If you don't have it you can buy a new domain in the Route53 server but it will cost you about 10 dollars per year.
{: .prompt-warning }

These are the changes that you have to make in the previous "main.tf" file:

- Update in your CloudFront Distribution resource `aws_cloudfront_distribution` the following, (where `${var.domain_name_simple}` is for example `example.com`):

  ```terraform
    viewer_certificate {
      cloudfront_default_certificate = true 
    }
  ```

  replacing it for this:

  ```terraform
    viewer_certificate {
      acm_certificate_arn      = aws_acm_certificate.cert.arn
      ssl_support_method       = "sni-only"
      minimum_protocol_version = "TLSv1.2_2021"
    }
    
    aliases = [
      var.domain_name_simple,
      var.domain_name
    ]
  ```

- Next, add the following lines:

  ```terraform
  resource "aws_acm_certificate" "cert" {
    provider                  = aws.use_default_region
    domain_name               = "*.${var.domain_name_simple}"
    validation_method         = "DNS"
    subject_alternative_names = [var.domain_name_simple]

    lifecycle {
      create_before_destroy = true
    }
  }

  data "aws_route53_zone" "zone" {
    provider     = aws.use_default_region
    name         = var.domain_name_simple
    private_zone = false
  }

  resource "aws_route53_record" "cert_validation" {
    provider = aws.use_default_region
    for_each = {
      for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
        name   = dvo.resource_record_name
        record = dvo.resource_record_value
        type   = dvo.resource_record_type
      }
    }

    allow_overwrite = true
    name            = each.value.name
    records         = [each.value.record]
    type            = each.value.type
    zone_id         = data.aws_route53_zone.zone.zone_id
    ttl             = 60
  }

  resource "aws_acm_certificate_validation" "cert" {
    provider                = aws.use_default_region
    certificate_arn         = aws_acm_certificate.cert.arn
    validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
  }

  resource "aws_route53_record" "www" {
    zone_id = data.aws_route53_zone.zone.id
    name    = "www.${var.domain_name_simple}"
    type    = "A"

    alias {
      name                   = aws_cloudfront_distribution.cdn_static_site.domain_name
      zone_id                = aws_cloudfront_distribution.cdn_static_site.hosted_zone_id
      evaluate_target_health = false
    }
  }

  resource "aws_route53_record" "apex" {
    zone_id = data.aws_route53_zone.zone.id
    name    = var.domain_name_simple
    type    = "A"

    alias {
      name                   = aws_cloudfront_distribution.cdn_static_site.domain_name
      zone_id                = aws_cloudfront_distribution.cdn_static_site.hosted_zone_id
      evaluate_target_health = false
    }
  }
  ```

- Now, execute the terraform apply command: `terraform apply --auto-approve`

- Finally, open a private window in your browser and access your registered domain: [https://example.com](https://example.com){:target="_blank"}

## Conclusion

In this article, we have explored the basics of Terraform and walked through how to create infrastructure with different examples. With Terraform, you can define your infrastructure as code and automate the process of creating and updating your resources.

This example is based on the code I have created to deploy my own blog [https://playingaws.com](https://playingaws.com){:target="_blank"} using `Route53 + ACM + CloudFront Distribution + private S3 bucket`.

## Next steps

Further reading (IaC):

- CDK: [How to create Serverless applications with CDK](/posts/how-to-create-infrastructure-with-cdk/){:target="_blank"}
- SAM: [How to create Serverless applications with SAM](/posts/how-to-create-serverless-applications-with-sam/){:target="_blank"}
- SAM + CDK: Interested in how AWS SAM and AWS CDK can work together? I've explored this in another article: [How to create serverless applications with CDK and SAM](/posts/how-to-create-serverless-applications-with-cdk-and-sam/){:target="_blank"}. It's a great next step for those looking to expand their serverless architecture knowledge.

I look forward to hearing your thoughts and experiences with AWS SAM. Feel free to share them in the comments below. Happy coding!

---
layout: post
title: How to create serverless applications with SAM
date: 2022-04-09 15:07 +0200
last_modified_at:
description: SAM (Serverless Application Model) is an open-source framework that you can use to build serverless applications on AWS and I will show you how it works.
category: 
- Serverless
tags: 
- how-to
- sam
- iac
- serverless
- github
published: true
pin: false
featured_post: false
comments: true
sitemap: true
img_path: /assets/img/posts/2022-04-05-how-to-create-serverless-applications-with-sam/
---
---

## Introduction

The AWS Serverless Application Model (AWS SAM) is an [open-source framework](https://github.com/aws/serverless-application-model){:target="_blank"} that you can use to build serverless applications on AWS.

A **serverless application** is more than just a Lambda Function. It is a combination of Lambda functions, event sources, APIs, databases, and other resources that work together to perform tasks.

SAM is an `extension of AWS CloudFormation` but SAM is streamlined and specifically designed for Serverless resources.

> SAM is the specific IaC solution of AWS for defining and deploying Lambda applications without the need to ever touch the AWS Console.
{: .prompt-info }

### Benefits of SAM

- **Local Testing and Debugging**
  - With the `aws sam cli` you can execute and test your serverless applications on your local (by mounting a docker image and running the code)
- **Extension of AWS Cloud Formation**
  - You get reliability on the deployment capabilities
  - You are also able to use in the SAM YAML template all of the resources that are available in CloudFormation
- **Single Deployment Configuration**
  - You can easily manage all your necessary resources in one single place that belongs to the same stack
- **Built-in best practices**
  - You can define and deploy your infrastructure as config
    - you can enforce code reviews
    - you can enable safe deployments through CodeDeploy
    - you can enable tracing by using AWS X-Ray
- **Deep integration with development tools**
  - AWS Serverless Application Repository: discover new applications
  - AWS Cloud9 IDE: For authoring, testing, and debugging
  - CodeBuild, CodeDeploy, and CodePipeline: To build a deployment pipeline
  - AWS CodeStar: To get started with a project structure, code repository, and a CI/CD pipeline that's automatically configured for you

### Basics

To understand the code structure of the SAM projects, five files are particularly important:

- **src/handlers/file.js**: `src` folder contains the code for the application's Lambda Function.
- **__tests\__/unit/handlers/file.test.js**: `test` folder contains the unit tests for the application code.
- **events/file.json**: `events` folder contains the invocation events that you can use to invoke the function.
- **template.yaml**: This file contains the AWS SAM template that defines your application's AWS resources.
- **package.json**: This file of NodeJS contains the application dependencies and is used for the `sam build`. If you are using Python language instead of NodeJS, the file will be **requirements.txt**.

> The location of Lambda Functions or Unit Tests could change! In some examples, a folder with the name of the lambda is created and inside is located the lambda function and the unit tests.
{: .prompt-info }

#### Example of Lambda Function

This is the `template.yaml` content for a Lambda Function:

```yaml
# The AWSTemplateFormatVersion identifies the capabilities of the template
# https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/format-version-structure.html
AWSTemplateFormatVersion: 2010-09-09
Description: >-
  sam-app

# Transform section specifies one or more macros that AWS CloudFormation uses to process your template
# https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html
Transform:
- AWS::Serverless-2016-10-31

# Resources declares the AWS resources that you want to include in the stack
# https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resources-section-structure.html
Resources:
  # Each Lambda function is defined by properties:
  # https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessfunction

  # This is a Lambda function config associated with the source code: hello-from-lambda.js
  helloFromLambdaFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: src/handlers/hello-from-lambda.helloFromLambdaHandler
      Runtime: nodejs14.x
      Architectures:
        - x86_64
      MemorySize: 128
      Timeout: 100
      Description: A Lambda function that returns a static string.
      Policies:
        # Give Lambda basic execution Permission to the helloFromLambda
        - AWSLambdaBasicExecutionRole
```

#### Add an API Gateway

To add an API (Amazon API Gateway) to your Lambda Function you will have to update inside the properties by adding `Events` as follows:

```yaml
Resources:
  HelloWorldFunction:
    Properties:
      ...
      Events:
        HelloWorld:
          Type: Api
          Properties:
            Path: /
            Method: get
```

And you have to create in `events` folder the json definition of the method:

```json
{
    "httpMethod": "GET"
}
```
{: .nolineno }

#### Add an scheduled event

Include a scheduled event is pretty similar to add an API.

```yaml
Resources:
  HelloWorldFunction:
    Properties:
      ...
      Events:
        CloudWatchEvent:
          Type: Schedule
          Properties:
            Schedule: cron(0 * * * ? *)
```

And you have to create in `events` folder the json definition of the rule:

```json
{
  "id": "cdc73f9d-aea9-11e3-9d5a-835b769c0d9c",
  "detail-type": "Scheduled Event",
  "source": "aws.events",
  "account": "",
  "time": "1970-01-01T00:00:00Z",
  "region": "us-west-2",
  "resources": [
    "arn:aws:events:us-west-2:xxxxxxxxxxxx:rule/ExampleRule"
  ],
  "detail": {}
}
```

#### More examples

> I recommend that you run `aws sam init` and ty to create different projects from the templates.
{: .prompt-tip }

More information about template anatomy [here](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html){:target="_blank"}

### Prerequisites

- AWS CLI
  - [how to install it](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html){:target="_blank"}
  - [how configure it](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html){:target="_blank"}
- AWS SAM CLI ([here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html){:target="_blank"})

## SAM application

To keep it simple, we will create a SAM application from a `quick start template` using the `standalone function` but you could try a different template if you wish.

> The code example is available [here](https://github.com/alazaroc/aws-sam-app){:target="_blank"}. If you want to see the step by step you can check the [commit history](https://github.com/alazaroc/aws-sam-app/commits/main){:target="_blank"}, where you can find the evolution of the application through the steps explained in the following lines.
{: .prompt-info }

These are all the steps that I want to show you in this article:

- Step 1: Download a sample SAM application
- Step 2 (Optional): Test your application locally
- Step 3 (Optional): Unit test
- Step 4: Build your application
- Step 5: Deploy manually your application with the CLI
- Step 6 (Optional): AWS SAM Accelerate (Preview) - Sync

### Step 1: Download a sample SAM application

The first step is to create our application through a quick start template: `Standalone function`.

To create a new application from a template we run the `sam init` command.

```shell
> sam init

Which template source would you like to use?
 1 - AWS Quick Start Templates
 2 - Custom Template Location
Choice: > 1

Choose an AWS Quick Start application template
 1 - Hello World Example
 2 - Multi-step workflow
 3 - Serverless API
 4 - Scheduled task
 5 - Standalone function
 6 - Data processing
 7 - Infrastructure event management
 8 - Machine Learning
Template: > 5

Which runtime would you like to use?
 1 - dotnetcore3.1
 2 - nodejs14.x
 3 - nodejs12.x
Runtime: > 2

Based on your selections, the only Package type available is Zip.
We will proceed to selecting the Package type as Zip.

Based on your selections, the only dependency manager available is npm.
We will proceed copying the template using npm.

Project name [sam-app]: > sam-app

Cloning from https://github.com/aws/aws-sam-cli-app-templates (process may take a moment)

    -----------------------
    Generating application:
    -----------------------
    Name: sam-app
    Runtime: nodejs14.x
    Architectures: x86_64
    Dependency Manager: npm
    Application Template: quick-start-from-scratch
    Output Directory: .

    Next steps can be found in the README file at ./sam-app/README.md


    Commands you can use next
    =========================
    [*] Create pipeline: cd sam-app && sam pipeline init --bootstrap
    [*] Test Function in the Cloud: sam sync --stack-name {stack-name} --watch
```

> Note that at the end of the command line messages, `Commands you can use next` appears where other SAM CLI commands are suggested as the next steps to execute.
{: .prompt-info }

This is the basic application that has been created (only with one lambda function for easy understanding):

![sam-code-basic](sam-code-basic.png){:class="border"}

Note that we have 4 of the 5 files that we reviewed before:

- src/handlers/hello-from-lambda.js
- __test\__/unit/handlers/hello-from-lambda.test.js
- template.yaml
- package.json

We don't have the folder `events` because we only create one simple Lambda Function with no event integrations

### Step 2 (Optional): Test your application locally

The AWS SAM CLI provides the `sam local` command to run your application using Docker containers that simulate the execution environment of Lambda.

Invoke your Lambda function running `sam local invoke`:

```shell
> sam local invoke
Invoking src/handlers/hello-from-lambda.helloFromLambdaHandler (nodejs14.x)
Skip pulling image and use local one: public.ecr.aws/sam/emulation-nodejs14.x:rapid-1.43.0-x86_64.

Mounting /Users/alazaroc/Documents/MyProjects/github/aws/sam/sam-app as /var/task:ro,delegated inside runtime container
START RequestId: c8b494ab-a1db-48b7-8f50-f9a93e1305ef Version: $LATEST
2022-04-08T18:55:39.230Z c8b494ab-a1db-48b7-8f50-f9a93e1305ef INFO Hello from Lambda!
END RequestId: c8b494ab-a1db-48b7-8f50-f9a93e1305ef
REPORT RequestId: c8b494ab-a1db-48b7-8f50-f9a93e1305ef Init Duration: 1.55 ms Duration: 363.29 ms Billed Duration: 364 ms Memory Size: 128 MB Max Memory Used: 128 MB
"Hello from Lambda!"
```

We received the response <kbd>"Hello from Lambda!"</kbd> and more useful information (Duration, Billed Duration, Memory Size, or Max Memory Used).

If you have more than one Lambda Function, you must add the name which appears in the `template.yaml` file.

```shell
> sam local invoke "helloFromLambdaFunction"
Invoking src/handlers/hello-from-lambda.helloFromLambdaHandler (nodejs14.x)
Skip pulling image and use local one: public.ecr.aws/sam/emulation-nodejs14.x:rapid-1.43.0-x86_64.

Mounting /Users/alazaroc/Documents/MyProjects/github/aws/sam/sam-app as /var/task:ro,delegated inside runtime container
START RequestId: dc41d97d-0867-4516-94d9-d1830192565e Version: $LATEST
2022-04-08T18:56:44.834Z dc41d97d-0867-4516-94d9-d1830192565e INFO Hello from Lambda!
"Hello from Lambda!"END RequestId: dc41d97d-0867-4516-94d9-d1830192565e
REPORT RequestId: dc41d97d-0867-4516-94d9-d1830192565e Init Duration: 0.49 ms Duration: 224.97 ms Billed Duration: 225 ms Memory Size: 128 MB Max Memory Used: 128 MB
```

> You also can test an API locally if your SAM project includes it.
>
> You should run `sam local start-api` command, which starts up a local endpoint that replicates your REST API endpoint.
{: .prompt-info }

### Step 3 (Optional): Unit test

Tests are defined in the **__tests\__** folder in this project. Use npm to install the **Jest test framework** and run unit tests.

```shell
> npm install
...

> npm run test

replaced-by-user-input@0.0.1 test
jest

jest-haste-map: Haste module naming collision: replaced-by-user-input
  The following files share their name; please adjust your hasteImpl:
    * <rootDir>/package.json
    * <rootDir>/.aws-sam/build/helloFromLambdaFunction/package.json

 PASS  __tests__/unit/handlers/hello-from-lambda.test.js
  ● Console

    console.info
      Hello from Lambda!

      at Object.helloFromLambdaHandler (src/handlers/hello-from-lambda.js:9:13)

 PASS  .aws-sam/build/helloFromLambdaFunction/__tests__/unit/handlers/hello-from-lambda.test.js
  ● Console

    console.info
      Hello from Lambda!

      at Object.helloFromLambdaHandler (.aws-sam/build/helloFromLambdaFunction/src/handlers/hello-from-lambda.js:9:13)


Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.854 s
Ran all test suites.
```

### Step 4: Build your application

The `sam build` command builds any dependencies that your application has, and copies your application source code to folders under `.aws-sam/build` to be zipped and uploaded to Lambda.

```shell
> sam build
Building codeuri: /Users/alazaroc/Documents/MyProjects/github/aws/sam/sam-app runtime: nodejs14.x metadata: {} architecture: x86_64 functions: ['helloFromLambdaFunction']
Running NodejsNpmBuilder:NpmPack
Running NodejsNpmBuilder:CopyNpmrcAndLockfile
Running NodejsNpmBuilder:CopySource
Running NodejsNpmBuilder:NpmInstall
Running NodejsNpmBuilder:CleanUpNpmrc
Running NodejsNpmBuilder:LockfileCleanUp

Build Succeeded

Built Artifacts  : .aws-sam/build
Built Template   : .aws-sam/build/template.yaml

Commands you can use next
=========================
[*] Invoke Function: sam local invoke
[*] Test Function in the Cloud: sam sync --stack-name {stack-name} --watch
[*] Deploy: sam deploy --guided
```

These are the new files of our SAM project:

![sam-build-files](sam-build-files.png){:class="border"}

### Step 5: Deploy manually your application with the CLI

Now we want to deploy our application. We will do it now manually from CLI, although in [this other article](/posts/how-to-add-ci-cd-to-my-sam-project/){:target="_blank"} I will do it with a pipeline (automatically).

> Remember that AWS SAM uses AWS CloudFormation as the underlying deployment mechanism.
{: .prompt-tip }

As we don't have a **configuration file** containing all the values, we are going to create one. We run the `sam deploy -- guided` command which will search as a first step if a <kbd>samconfig.toml</kbd> file exists and if not the AWS SAM CLI will ask us about the necessary information to deploy our application.

> The `sam deploy` command will package and upload the application artifacts to the S3 bucket, and deploys the application using AWS CloudFormation
{: .prompt-info }

```shell
> sam deploy --guided

Configuring SAM deploy
======================

 Looking for config file [samconfig.toml] :  Not found

 Setting default arguments for 'sam deploy'
 =========================================
 Stack Name [sam-app]:
 AWS Region [eu-west-1]:
 #Shows you resources changes to be deployed and require a 'Y' to initiate deploy
 Confirm changes before deploy [y/N]: > Y
 #SAM needs permission to be able to create roles to connect to the resources in your template
 Allow SAM CLI IAM role creation [Y/n]: >
 #Preserves the state of previously provisioned resources when an operation fails
 Disable rollback [y/N]: >
 Save arguments to configuration file [Y/n]: >
 SAM configuration file [samconfig.toml]: >
 SAM configuration environment [default]: >

 Looking for resources needed for deployment:
 Creating the required resources...
 Successfully created!
  Managed S3 bucket: aws-sam-cli-managed-default-samclisourcebucket-bymcog0ibyy0
  A different default S3 bucket can be set in samconfig.toml

 Saved arguments to config file
 Running 'sam deploy' for future deployments will use the parameters saved above.
 The above parameters can be changed by modifying samconfig.toml
 Learn more about samconfig.toml syntax at
 https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-config.html

Uploading to sam-app/c606de95995c9e6d65f310f130ccc787  5777 / 5777  (100.00%)

 Deploying with following values
 ===============================
 Stack name                   : sam-app
 Region                       : eu-west-1
 Confirm changeset            : True
 Disable rollback             : False
 Deployment s3 bucket         : aws-sam-cli-managed-default-samclisourcebucket-bymcog0ibyy0
 Capabilities                 : ["CAPABILITY_IAM"]
 Parameter overrides          : {}
 Signing Profiles             : {}

Initiating deployment
=====================
Uploading to sam-app/c3a5d8cf01d6af391d2863628b67fbbe.template  659 / 659  (100.00%)

Waiting for changeset to be created..

CloudFormation stack changeset
-----------------------------------------------------------------------------------------------------------------------------------------------------
Operation                             LogicalResourceId                     ResourceType                          Replacement
-----------------------------------------------------------------------------------------------------------------------------------------------------
+ Add                                 helloFromLambdaFunctionRole           AWS::IAM::Role                        N/A
+ Add                                 helloFromLambdaFunction               AWS::Lambda::Function                 N/A
-----------------------------------------------------------------------------------------------------------------------------------------------------

Changeset created successfully. arn:aws:cloudformation:eu-west-1:xxxxxxxxxxxx:changeSet/samcli-deploy1649445168/3355bdea-6549-4a2b-b486-94befe703b4d


Previewing CloudFormation changeset before deployment
======================================================
Deploy this changeset? [y/N]: > Y

2022-04-08 21:13:08 - Waiting for stack create/update to complete

CloudFormation events from stack operations
-----------------------------------------------------------------------------------------------------------------------------------------------------
ResourceStatus                        ResourceType                          LogicalResourceId                     ResourceStatusReason
-----------------------------------------------------------------------------------------------------------------------------------------------------
CREATE_IN_PROGRESS                    AWS::IAM::Role                        helloFromLambdaFunctionRole           -
CREATE_IN_PROGRESS                    AWS::IAM::Role                        helloFromLambdaFunctionRole           Resource creation Initiated
CREATE_COMPLETE                       AWS::IAM::Role                        helloFromLambdaFunctionRole           -
CREATE_IN_PROGRESS                    AWS::Lambda::Function                 helloFromLambdaFunction               -
CREATE_IN_PROGRESS                    AWS::Lambda::Function                 helloFromLambdaFunction               Resource creation Initiated
CREATE_COMPLETE                       AWS::Lambda::Function                 helloFromLambdaFunction               -
CREATE_COMPLETE                       AWS::CloudFormation::Stack            sam-app                               -
-----------------------------------------------------------------------------------------------------------------------------------------------------

Successfully created/updated stack - sam-app in eu-west-1
```

Remember that the executed command will create the `samconfig.toml` file in our project to save the deployment configuration and be able to repeat it without configuration.

![sam-deploy-guided-3](sam-deploy-guided-3.png){:class="border"}

From now on, to deploy our SAM project we just need to run the `sam deploy` command, so we run it but if we have no changes, the deployment will fail:

```shell
> sam deploy
File with same data already exists at sam-app/c606de95995c9e6d65f310f130ccc787, skipping upload

 Deploying with following values
 ===============================
 Stack name                   : sam-app
 Region                       : eu-west-1
 Confirm changeset            : True
 Disable rollback             : False
 Deployment s3 bucket         : aws-sam-cli-managed-default-samclisourcebucket-bymcog0ibyy0
 Capabilities                 : ["CAPABILITY_IAM"]
 Parameter overrides          : {}
 Signing Profiles             : {}

Initiating deployment
=====================
File with same data already exists at sam-app/c3a5d8cf01d6af391d2863628b67fbbe.template, skipping upload

Waiting for changeset to be created..
Error: No changes to deploy. Stack sam-app is up to date
```

### Step 6 (Optional): AWS SAM Accelerate (Preview) - Sync

We already have deployed our application in the cloud and you may want to synchronize the changes, i.e. `deploy the changes in real-time when we save the changes` (without running the deploy command).

> The `sync` command deploys your local changes to the AWS Cloud. Use sync to build, package, and deploy changes to your development environment as you iterate on your application. As a best practice, run sam sync after you finish iterating on your application to sync changes to your AWS CloudFormation stack.
{: .prompt-info }

> Be careful if you use this functionality.
>
> First `it is in preview` and also as you will see in the next lines in the console: "The SAM CLI will use the AWS Lambda, Amazon API Gateway, and AWS StepFunctions APIs to `upload your code without performing a CloudFormation deployment. This will cause drift in your CloudFormation stack`."
>
> <kbd>The sync command should only be used against a development stack</kbd>.
{: .prompt-warning }

```shell
> sam sync --stack-name sam-app --watch

Managed S3 bucket: aws-sam-cli-managed-default-samclisourcebucket-bymcog0ibyy0

Default capabilities applied: ('CAPABILITY_NAMED_IAM', 'CAPABILITY_AUTO_EXPAND')
To override with customized capabilities, use --capabilities flag or set it in samconfig.toml

This feature is currently in beta. Visit the docs page to learn more about the AWS Beta terms https://aws.amazon.com/service-terms/.

The SAM CLI will use the AWS Lambda, Amazon API Gateway, and AWS StepFunctions APIs to upload your code without
performing a CloudFormation deployment. This will cause drift in your CloudFormation stack.
**The sync command should only be used against a development stack**.

Confirm that you are synchronizing a development stack and want to turn on beta features.

Enter Y to proceed with the command, or enter N to cancel:
 [y/N]: > Y

Experimental features are enabled for this session.
Visit the docs page to learn more about the AWS Beta terms https://aws.amazon.com/service-terms/.

Queued infra sync. Wating for in progress code syncs to complete...
Starting infra sync.
Manifest file is changed (new hash: c448eb733590e1cea85b58f147c47f01) or dependency folder (.aws-sam/deps/c14e7b11-e157-4aea-a19b-97b33b39cef5) is missing for c14e7b11-e157-4aea-a19b-97b33b39cef5, downloading dependencies and copying/building source
Building codeuri: /Users/alazaroc/Documents/MyProjects/github/aws/sam/sam-app runtime: nodejs14.x metadata: {} architecture: x86_64 functions: ['helloFromLambdaFunction']
Running NodejsNpmBuilder:NpmPack
Running NodejsNpmBuilder:CopyNpmrcAndLockfile
Running NodejsNpmBuilder:CopySource
Running NodejsNpmBuilder:NpmInstall
Running NodejsNpmBuilder:CleanUp
Clean up action: .aws-sam/deps/c14e7b11-e157-4aea-a19b-97b33b39cef5 does not exist and will be skipped.
Running NodejsNpmBuilder:MoveDependencies
Running NodejsNpmBuilder:CleanUpNpmrc
Running NodejsNpmBuilder:LockfileCleanUp
Running NodejsNpmBuilder:LockfileCleanUp

Build Succeeded

Successfully packaged artifacts and wrote output template to file /var/folders/wq/bz6xngtx5h3f5gf8py3kf28c0000gn/T/tmp6076iix4.
Execute the following command to deploy the packaged template
sam deploy --template-file /var/folders/wq/bz6xngtx5h3f5gf8py3kf28c0000gn/T/tmp6076iix4 --stack-name <YOUR STACK NAME>


 Deploying with following values
 ===============================
 Stack name                   : sam-app
 Region                       : eu-west-1
 Disable rollback             : False
 Deployment s3 bucket         : aws-sam-cli-managed-default-samclisourcebucket-bymcog0ibyy0
 Capabilities                 : ["CAPABILITY_NAMED_IAM", "CAPABILITY_AUTO_EXPAND"]
 Parameter overrides          : {}
 Signing Profiles             : null

Initiating deployment
=====================

2022-04-08 21:34:02 - Waiting for stack create/update to complete

CloudFormation events from stack operations
-----------------------------------------------------------------------------------------------------------------------------------------------------
ResourceStatus                        ResourceType                          LogicalResourceId                     ResourceStatusReason
-----------------------------------------------------------------------------------------------------------------------------------------------------
UPDATE_IN_PROGRESS                    AWS::CloudFormation::Stack            sam-app                               Transformation succeeded
CREATE_IN_PROGRESS                    AWS::CloudFormation::Stack            AwsSamAutoDependencyLayerNestedStac   -
CREATE_IN_PROGRESS                    AWS::CloudFormation::Stack            AwsSamAutoDependencyLayerNestedStac   Resource creation Initiated
CREATE_COMPLETE                       AWS::CloudFormation::Stack            AwsSamAutoDependencyLayerNestedStac   -
UPDATE_IN_PROGRESS                    AWS::Lambda::Function                 helloFromLambdaFunction               -
UPDATE_COMPLETE                       AWS::Lambda::Function                 helloFromLambdaFunction               -
UPDATE_COMPLETE_CLEANUP_IN_PROGRESS   AWS::CloudFormation::Stack            sam-app                               -
UPDATE_COMPLETE                       AWS::CloudFormation::Stack            sam-app                               -
-----------------------------------------------------------------------------------------------------------------------------------------------------

Stack update succeeded. Sync infra completed.

{'StackId': 'arn:aws:cloudformation:eu-west-1:xxxxxxxxxxxx:stack/sam-app/e17d9780-b76f-11ec-a123-02591afab591', 'ResponseMetadata': {'RequestId': 'c726d9ed-ba77-473c-9155-9e05cc7ee0c7', 'HTTPStatusCode': 200, 'HTTPHeaders': {'x-amzn-requestid': 'c726d9ed-ba77-473c-9155-9e05cc7ee0c7', 'content-type': 'text/xml', 'content-length': '377', 'date': 'Fri, 08 Apr 2022 19:34:02 GMT'}, 'RetryAttempts': 0}}
Infra sync completed.
```

The console still listens for changes and if we change our lambda code and save it:

![sam-sync-lambda](sam-sync-lambda.png){:class="border"}

The console will be updated automatically as follow:

```shell
Syncing Lambda Function helloFromLambdaFunction...
Manifest is not changed for c14e7b11-e157-4aea-a19b-97b33b39cef5, running incremental build
Building codeuri: /Users/alazaroc/Documents/MyProjects/github/aws/sam/sam-app runtime: nodejs14.x metadata: {} architecture: x86_64 functions: ['helloFromLambdaFunction']
download_dependencies is False and dependencies_dir is None. Copying the source files into the artifacts directory.
Running NodejsNpmBuilder:NpmPack
Running NodejsNpmBuilder:CopyNpmrcAndLockfile
Running NodejsNpmBuilder:CopySource
Running NodejsNpmBuilder:CleanUpNpmrc
Running NodejsNpmBuilder:LockfileCleanUp
Running NodejsNpmBuilder:LockfileCleanUp
Finished syncing Lambda Function helloFromLambdaFunction.
```

When you stop it (`control + C`) in the console it will appear:

```shell
Shutting down sync watch...
Sync watch stopped.
```

> When you executed the sync command, a nested stack associated with your main stack (sam-app) was created:
>
> ![sam-nested-stack](sam-nested-stack.png){:class="border"}
>
> And when the console stops being synchronized, this nested stack is NOT deleted.
{: .prompt-info }

How to **remove the nested stack** created with the sync command?

You have to run the `sam deploy` command again:

```shell
> sam deploy
File with same data already exists at sam-app/c606de95995c9e6d65f310f130ccc787, skipping upload

 Deploying with following values
 ===============================
 Stack name                   : sam-app
 Region                       : eu-west-1
 Confirm changeset            : True
 Disable rollback             : False
 Deployment s3 bucket         : aws-sam-cli-managed-default-samclisourcebucket-bymcog0ibyy0
 Capabilities                 : ["CAPABILITY_IAM"]
 Parameter overrides          : {}
 Signing Profiles             : {}

Initiating deployment
=====================
File with same data already exists at sam-app/c3a5d8cf01d6af391d2863628b67fbbe.template, skipping upload

Waiting for changeset to be created..

CloudFormation stack changeset
-----------------------------------------------------------------------------------------------------------------------------------------------------
Operation                             LogicalResourceId                     ResourceType                          Replacement
-----------------------------------------------------------------------------------------------------------------------------------------------------
* Modify                              helloFromLambdaFunction               AWS::Lambda::Function                 False
- Delete                              AwsSamAutoDependencyLayerNestedStac   AWS::CloudFormation::Stack            N/A
-----------------------------------------------------------------------------------------------------------------------------------------------------

Changeset created successfully. arn:aws:cloudformation:eu-west-1:xxxxxxxxxxxx:changeSet/samcli-deploy1649447607/790db35a-524f-48c5-af5c-1239e1b8fe92


Previewing CloudFormation changeset before deployment
======================================================
Deploy this changeset? [y/N]: > Y

2022-04-08 21:53:42 - Waiting for stack create/update to complete

CloudFormation events from stack operations
-----------------------------------------------------------------------------------------------------------------------------------------------------
ResourceStatus                        ResourceType                          LogicalResourceId                     ResourceStatusReason
-----------------------------------------------------------------------------------------------------------------------------------------------------
UPDATE_IN_PROGRESS                    AWS::Lambda::Function                 helloFromLambdaFunction               -
UPDATE_COMPLETE                       AWS::Lambda::Function                 helloFromLambdaFunction               -
UPDATE_COMPLETE_CLEANUP_IN_PROGRESS   AWS::CloudFormation::Stack            sam-app                               -
DELETE_IN_PROGRESS                    AWS::CloudFormation::Stack            AwsSamAutoDependencyLayerNestedStac   -
DELETE_COMPLETE                       AWS::CloudFormation::Stack            AwsSamAutoDependencyLayerNestedStac   -
UPDATE_COMPLETE                       AWS::CloudFormation::Stack            sam-app                               -
-----------------------------------------------------------------------------------------------------------------------------------------------------

Successfully created/updated stack - sam-app in eu-west-1
```

### Step 7: Clean up

We only have one stack in our AWS Account.

To delete it, you can run the `sam delete` command which deletes the main stack (sam-app).

## Next steps

- If you need more information about SAM I recommend you to visit the AWS documentation [here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html){:target="_blank"}
- Next post: [How to add CI/CD to my SAM project](/posts/how-to-add-ci-cd-to-my-sam-project/){:target="_blank"}
- Comment this post

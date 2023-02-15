---
layout: post
title: How to add CI/CD to my SAM project
date: 2022-04-10 10:53 +0200
last_modified_at:
description: I will show you how you can deploy a SAM project with AWS CodePipeline using the pipeline integration included in the AWS SAM CLI.
category: 
- DevOps
tags: 
- how-to
- sam
- cicd
- codepipeline
- codebuild
- github
published: true
pin: false
featured_post: false
comments: true
sitemap: true
img_path: /assets/img/posts/2022-04-09-how-to-add-ci-cd-to-my-sam-project/
---
---

## Introduction

> This is the second article of SAM. [In this other article](/posts/how-to-create-serverless-applications-with-sam/){:target="_blank"} I had explained how to create serverless applications with SAM, and there I explained all the basic SAM information, so you may need to review it before this.
{: .prompt-warning }

Here we will add CI/CD to our SAM application through the pipeline integration of the AWS SAM CLI.

> As we want **to add automation** to our deployment process and integrate it with the AWS ecosystem, **we will use the AWS Developer tools**.
{: .prompt-info }

This is the SAM project code on [GitHub](https://github.com/alazaroc/aws-sam-app){:target="_blank"} that we will use in the article. In the [commit history](https://github.com/alazaroc/aws-sam-app/commits/main){:target="_blank"} you can find the evolution of the application through the steps explained.

## Add CI/CD to a SAM project

We want to create a CI/CD pipeline to implement continuous deployment (we want that when we push new code, the pipeline deploys our resources automatically).

> From AWS doc: AWS SAM provides a set of `default pipeline templates` for multiple CI/CD systems that encapsulate AWS's deployment best practices. These default pipeline templates use standard JSON/YAML pipeline configuration formats, and the built-in best practices help perform multi-account and multi-region deployments and verify that pipelines cannot make unintended changes to infrastructure.

We want to create a **new pipeline in the AWS CodePipeline resource** using the SAM templates.

To generate a starter pipeline configuration for AWS CodePipeline, we have to perform the following tasks in this order:

1. Create infrastructure resources
2. Generate the pipeline configuration
3. Commit your pipeline configuration to the Git repository
4. Deploy your pipeline
5. Connect your Git repository with your CI/CD system

> After you've generated the starter pipeline configuration and committed it to your Git repository, whenever someone commits a code change to that repository your pipeline will be triggered to run automatically.
{: .prompt-info }

### Step 1: Create infrastructure resources

`Pipelines that use AWS SAM require certain AWS resources`, like an IAM user and roles with necessary permissions, an Amazon S3 bucket, and optionally an Amazon ECR repository. You must have a set of infrastructure resources for each deployment stage of the pipeline.

**For each stage** we need (dev, test, prod...), we have to run `sam pipeline bootstrap`, and it will create a CloudFormation stack with the name `aws-sam-cli-managed-${stage}-pipeline-resources`, which will create the necessary resources that SAM needs.

We are going to create only one stage with a name `test`:

``` console
> sam pipeline bootstrap

sam pipeline bootstrap generates the required AWS infrastructure resources to connect
to your CI/CD system. This step must be run for each deployment stage in your pipeline,
prior to running the sam pipeline init command.

We will ask for [1] stage definition, [2] account details, and
[3] references to existing resources in order to bootstrap these pipeline resources.

[1] Stage definition
Enter a configuration name for this stage. This will be referenced later when you use the sam pipeline init command:
Stage configuration name: > test

[2] Account details
The following AWS credential sources are available to use.
To know more about configuration AWS credentials, visit the link below:
<https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html>
1 - Environment variables (not available)
2 - default (named profile)
3 - localstack (named profile)
q - Quit and configure AWS credentials
Select a credential source to associate with this stage: > 2
Associated account xxxxxxxxxxxx with configuration test.

Enter the region in which you want these resources to be created [eu-west-1]:
Enter the pipeline IAM user ARN if you have previously created one, or we will create one for you []:

[3] Reference application build resources
Enter the pipeline execution role ARN if you have previously created one, or we will create one for you []: >
Enter the CloudFormation execution role ARN if you have previously created one, or we will create one for you []: >
Please enter the artifact bucket ARN for your Lambda function. If you do not have a bucket, we will create one for you []: >
Does your application contain any IMAGE type Lambda functions? [y/N]: >

[4] Summary
Below is the summary of the answers:
1 - Account: xxxxxxxxxxxx
2 - Stage configuration name: test
3 - Region: eu-west-1
4 - Pipeline user: [to be created]
5 - Pipeline execution role: [to be created]
6 - CloudFormation execution role: [to be created]
7 - Artifacts bucket: [to be created]
8 - ECR image repository: [skipped]
Press enter to confirm the values above, or select an item to edit the value: >

This will create the following required resources for the 'test' configuration:
- Pipeline IAM user
- Pipeline execution role
- CloudFormation execution role
- Artifact bucket
Should we proceed with the creation? [y/N]: > Y
Creating the required resources...
Successfully created!
The following resources were created in your account:
- Pipeline IAM user
- Pipeline execution role
- CloudFormation execution role
- Artifact bucket
Pipeline IAM user credential:
AWS_ACCESS_KEY_ID: xxxxxxxxxx
AWS_SECRET_ACCESS_KEY: xxxxxxxxxx
View the definition in .aws-sam/pipeline/pipelineconfig.toml,
run sam pipeline bootstrap to generate another set of resources, or proceed to
sam pipeline init to create your pipeline configuration file.

Before running sam pipeline init, we recommend first setting up AWS credentials
in your CI/CD account. Read more about how to do so with your provider in
<https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-generating-example-ci-cd-others.html>.
```

A new stack is created for our new stage `test`.

![sam-pipeline-bootstrap-test](sam-pipeline-bootstrap-test.png){:class="border"}

> If you want more than 1 stage you should repeat the `sam pipeline bootstrap` for the new stage (prod?). In this example I only want 1 stage to simplify.
{: .prompt-info }

In our SAM project now we have 1 new file containing our stage information:

![sam-pipeline-bootstrap-new-file](sam-pipeline-bootstrap-new-file.png){:class="border"}

### Step 2: Generate the pipeline configuration

To generate the pipeline configuration, run the command `sam pipeline init`:

``` console
> sam pipeline init

sam pipeline init generates a pipeline configuration file that your CI/CD system
can use to deploy serverless applications using AWS SAM.
We will guide you through the process to bootstrap resources for each stage,
then walk through the details necessary for creating the pipeline config file.

Please ensure you are in the root folder of your SAM application before you begin.

Select a pipeline template to get started:
 1 - AWS Quick Start Pipeline Templates
 2 - Custom Pipeline Template Location
Choice: > 1

Cloning from https://github.com/aws/aws-sam-cli-pipeline-init-templates.git (process may take a moment)
Select CI/CD system
 1 - Jenkins
 2 - GitLab CI/CD
 3 - GitHub Actions
 4 - Bitbucket Pipelines
 5 - AWS CodePipeline
Choice: > 5
You are using the 2-stage pipeline template.
 _________    _________
|         |  |         |
| Stage 1 |->| Stage 2 |
|_________|  |_________|

Checking for existing stages...

Only 1 stage(s) were detected, fewer than what the template requires: 2.

To set up stage(s), please quit the process using Ctrl+C and use one of the following commands:
sam pipeline init --bootstrap       To be guided through the stage and config file creation process.
sam pipeline bootstrap              To specify details for an individual stage.

To reference stage resources bootstrapped in a different account, press enter to proceed []:
What is the Git provider?
 1 - Bitbucket
 2 - CodeCommit
 3 - GitHub
 4 - GitHubEnterpriseServer
Choice []: > 3
What is the full repository id (Example: some-user/my-repo)?: alazaroc/aws-sam-app
What is the Git branch used for production deployments? [main]:
What is the template file path? [template.yaml]:
We use the stage configuration name to automatically retrieve the bootstrapped resources created when you ran `sam pipeline bootstrap`.

Here are the stage configuration names detected in .aws-sam/pipeline/pipelineconfig.toml:
 1 - test
Select an index or enter the stage 1's configuration name (as provided during the bootstrapping): > 1
What is the sam application stack name for stage 1? [sam-app]: >
Stage 1 configured successfully, configuring stage 2.

Here are the stage configuration names detected in .aws-sam/pipeline/pipelineconfig.toml:
 1 - test
Select an index or enter the stage 2's configuration name (as provided during the bootstrapping):
```

**I have to stop the execution here.**

In the console log below, the following is displayed:

- _You are using the 2-stage pipeline template_
- _Only 1 stage(s) were detected, fewer than what the template requires: 2._

> In any real project **you should have at least two stages**, so you could use the default AWS template.
{: .prompt-info }

`I don't want to create two stages` in my CI/CD pipeline, I am testing a simple SAM project, and `I only want ONE`.

> Unfortunately, you can't do that with the `AWS Quick Start Pipeline Templates` so I forked the main AWS project and I created a custom template with only ONE stage.
>
> This is my forked project: [https://github.com/alazaroc/aws-sam-cli-pipeline-init-templates.git](https://github.com/alazaroc/aws-sam-cli-pipeline-init-templates.git){:target="_blank"}
>
> I had to put my custom template in the root folder because otherwise, the AWS SAM CLI doesn't work.
{: .prompt-danger }

In the next execution, I will choose option 2 `Custom Pipeline Template Location`, and add it to my updated forked repository to create only one stage in the CodePipeline.

``` console
> sam pipeline init

sam pipeline init generates a pipeline configuration file that your CI/CD system
can use to deploy serverless applications using AWS SAM.
We will guide you through the process to bootstrap resources for each stage,
then walk through the details necessary for creating the pipeline config file.

Please ensure you are in the root folder of your SAM application before you begin.

Select a pipeline template to get started:
 1 - AWS Quick Start Pipeline Templates
 2 - Custom Pipeline Template Location
Choice: > 2
Template Git location: > https://github.com/alazaroc/aws-sam-cli-pipeline-init-templates.git

Cloning from https://github.com/alazaroc/aws-sam-cli-pipeline-init-templates.git (process may take a moment)
You are using the 1-stage pipeline template.
 _________
|         |
| Stage 1 |
|_________|

Checking for existing stages...

What is the Git provider?
 1 - Bitbucket
 2 - CodeCommit
 3 - GitHub
 4 - GitHubEnterpriseServer
Choice []: > 3
What is the full repository id (Example: some-user/my-repo)?: > alazaroc/aws-sam-app
What is the Git branch used for production deployments? [main]: >
What is the template file path? [template.yaml]: >
We use the stage name to automatically retrieve the bootstrapped resources created when you ran `sam pipeline bootstrap`.

Here are the stage configuration names detected in .aws-sam/pipeline/pipelineconfig.toml:
 1 - test
What is the name of stage 1 (as provided during the bootstrapping)?
Select an index or enter the stage name: > 1
What is the sam application stack name for stage 1? [sam-app]: >
Stage 1 configured successfully (you only have one stage).

To deploy this template and connect to the main git branch, run this against the leading account:
`sam deploy -t codepipeline.yaml --stack-name <stack-name> --capabilities=CAPABILITY_IAM`.
SUMMARY
We will generate a pipeline config file based on the following information:
 What is the Git provider?: GitHub
 What is the full repository id (Example: some-user/my-repo)?: alazaroc/aws-sam-app
 What is the Git branch used for production deployments?: main
 What is the template file path?: template.yaml
 What is the name of stage 1 (as provided during the bootstrapping)?
Select an index or enter the stage name: 1
 What is the sam application stack name for stage 1?: sam-app
 What is the pipeline execution role ARN for stage 1?: arn:aws:iam::xxxxxxxxxxxx:role/aws-sam-cli-managed-test-pip-PipelineExecutionRole-1RT9YMZ60U7L8
 What is the CloudFormation execution role ARN for stage 1?: arn:aws:iam::xxxxxxxxxxxx:role/aws-sam-cli-managed-test-CloudFormationExecutionR-FA52519RHRDD
 What is the S3 bucket name for artifacts for stage 1?: aws-sam-cli-managed-test-pipeline-artifactsbucket-jf6hixn3rx29
 What is the ECR repository URI for stage 1?:
 What is the AWS region for stage 1?: eu-west-1
Successfully created the pipeline configuration file(s):
 - codepipeline.yaml
 - assume-role.sh
 - pipeline/buildspec_unit_test.yml
 - pipeline/buildspec_build_package.yml
 - pipeline/buildspec_integration_test.yml
 - pipeline/buildspec_feature.yml
 - pipeline/buildspec_deploy.yml
```

Now we have the new files in our project that CodePipeline will use to deploy our code:

![sam-pipeline-init-one-stage](sam-pipeline-init-one-stage.png){:class="border"}

### Step 3: Commit your pipeline configuration to Git

This step is necessary to ensure your CI/CD system is aware of your pipeline configuration and will run when changes are committed.

![sam-pipeline-init-commit](sam-pipeline-init-commit.png){:class="border"}

### Step 4: Deploy your pipeline

For **AWS CodePipeline** you have to deploy the pipeline running `sam deploy -t codepipeline.yaml --stack-name <pipeline-stack-name> --capabilities=CAPABILITY_IAM --region <region-X>`

> Don't set the same stack name as your SAM application because doing so will overwrite your application's stack (and delete your application resources).
{: .prompt-warning }

``` console
> sam deploy -t codepipeline.yaml --stack-name sam-app-pipeline --capabilities=CAPABILITY_IAM

    Deploying with following values
    ===============================
    Stack name                   : sam-app-pipeline
    Region                       : eu-west-1
    Confirm changeset            : True
    Disable rollback             : False
    Deployment s3 bucket         : aws-sam-cli-managed-default-samclisourcebucket-19wv6mek3hxyw
    Capabilities                 : ["CAPABILITY_IAM"]
    Parameter overrides          : {}
    Signing Profiles             : {}

Initiating deployment
=====================
File with same data already exists at sam-app/f421d3ae8f9c85b69c81f641d104e1eb.template, skipping upload

Waiting for changeset to be created..

CloudFormation stack changeset
-------------------------------------------------------------------------------------------------------------------------
Operation                      LogicalResourceId              ResourceType                   Replacement
-------------------------------------------------------------------------------------------------------------------------
+ Add                          CodeBuildProjectBuildAndPack   AWS::CodeBuild::Project        N/A
+ Add                          CodeBuildProjectDeploy         AWS::CodeBuild::Project        N/A
+ Add                          CodeBuildServiceRole           AWS::IAM::Role                 N/A
+ Add                          CodePipelineExecutionRole      AWS::IAM::Role                 N/A
+ Add                          CodeStarConnection             AWS::CodeStarConnections::Co   N/A
+ Add                          PipelineArtifactsBucketPolic   AWS::S3::BucketPolicy          N/A
+ Add                          PipelineArtifactsBucket        AWS::S3::Bucket                N/A
+ Add                          PipelineArtifactsLoggingBuck   AWS::S3::BucketPolicy          N/A
+ Add                          PipelineArtifactsLoggingBuck   AWS::S3::Bucket                N/A
+ Add                          PipelineStackCloudFormationE   AWS::IAM::Role                 N/A
+ Add                          Pipeline                       AWS::CodePipeline::Pipeline    N/A
-------------------------------------------------------------------------------------------------------------------------

Changeset created successfully. arn:aws:cloudformation:eu-west-1:xxxxxxxxxxxx:changeSet/samcli-deploy1649184605/5c7e3379-74d0-486e-a387-99837b6ab74b


Previewing CloudFormation changeset before deployment
======================================================
Deploy this changeset? [y/N]: > Y

2022-04-05 20:50:13 - Waiting for stack create/update to complete

CloudFormation events from stack operations
-------------------------------------------------------------------------------------------------------------------------
ResourceStatus                 ResourceType                   LogicalResourceId              ResourceStatusReason
-------------------------------------------------------------------------------------------------------------------------
CREATE_IN_PROGRESS             AWS::S3::Bucket                PipelineArtifactsLoggingBuck   -
CREATE_IN_PROGRESS             AWS::IAM::Role                 PipelineStackCloudFormationE   -
CREATE_IN_PROGRESS             AWS::CodeStarConnections::Co   CodeStarConnection             -
CREATE_IN_PROGRESS             AWS::IAM::Role                 PipelineStackCloudFormationE   Resource creation Initiated
CREATE_IN_PROGRESS             AWS::S3::Bucket                PipelineArtifactsLoggingBuck   Resource creation Initiated
CREATE_COMPLETE                AWS::CodeStarConnections::Co   CodeStarConnection             -
CREATE_IN_PROGRESS             AWS::CodeStarConnections::Co   CodeStarConnection             Resource creation Initiated
CREATE_COMPLETE                AWS::IAM::Role                 PipelineStackCloudFormationE   -
CREATE_COMPLETE                AWS::S3::Bucket                PipelineArtifactsLoggingBuck   -
CREATE_IN_PROGRESS             AWS::S3::BucketPolicy          PipelineArtifactsLoggingBuck   -
CREATE_IN_PROGRESS             AWS::S3::Bucket                PipelineArtifactsBucket        -
CREATE_IN_PROGRESS             AWS::S3::Bucket                PipelineArtifactsBucket        Resource creation Initiated
CREATE_COMPLETE                AWS::S3::BucketPolicy          PipelineArtifactsLoggingBuck   -
CREATE_IN_PROGRESS             AWS::S3::BucketPolicy          PipelineArtifactsLoggingBuck   Resource creation Initiated
CREATE_COMPLETE                AWS::S3::Bucket                PipelineArtifactsBucket        -
CREATE_IN_PROGRESS             AWS::IAM::Role                 CodeBuildServiceRole           -
CREATE_IN_PROGRESS             AWS::IAM::Role                 CodeBuildServiceRole           Resource creation Initiated
CREATE_COMPLETE                AWS::IAM::Role                 CodeBuildServiceRole           -
CREATE_IN_PROGRESS             AWS::CodeBuild::Project        CodeBuildProjectBuildAndPack   -
CREATE_IN_PROGRESS             AWS::CodeBuild::Project        CodeBuildProjectDeploy         -
CREATE_IN_PROGRESS             AWS::CodeBuild::Project        CodeBuildProjectDeploy         Resource creation Initiated
CREATE_IN_PROGRESS             AWS::CodeBuild::Project        CodeBuildProjectBuildAndPack   Resource creation Initiated
CREATE_COMPLETE                AWS::CodeBuild::Project        CodeBuildProjectDeploy         -
CREATE_COMPLETE                AWS::CodeBuild::Project        CodeBuildProjectBuildAndPack   -
CREATE_IN_PROGRESS             AWS::IAM::Role                 CodePipelineExecutionRole      -
CREATE_IN_PROGRESS             AWS::IAM::Role                 CodePipelineExecutionRole      Resource creation Initiated
CREATE_COMPLETE                AWS::IAM::Role                 CodePipelineExecutionRole      -
CREATE_IN_PROGRESS             AWS::S3::BucketPolicy          PipelineArtifactsBucketPolic   -
CREATE_IN_PROGRESS             AWS::S3::BucketPolicy          PipelineArtifactsBucketPolic   Resource creation Initiated
CREATE_IN_PROGRESS             AWS::CodePipeline::Pipeline    Pipeline                       -
CREATE_COMPLETE                AWS::S3::BucketPolicy          PipelineArtifactsBucketPolic   -
CREATE_IN_PROGRESS             AWS::CodePipeline::Pipeline    Pipeline                       Resource creation Initiated
CREATE_COMPLETE                AWS::CodePipeline::Pipeline    Pipeline                       -
CREATE_COMPLETE                AWS::CloudFormation::Stack     sam-app-pipeline               -
-------------------------------------------------------------------------------------------------------------------------

CloudFormation outputs from deployed stack
---------------------------------------------------------------------------------------------------------------------------
Outputs
---------------------------------------------------------------------------------------------------------------------------
Key                 CodeStarConnectionArn
Description         The Arn of AWS CodeStar Connection used to connect to external code repositories.
Value               arn:aws:codestar-connections:eu-west-1:xxxxxxxxxxxx:connection/81d48b76-1ae7-4d69-b6eb-11eea6acf94a
---------------------------------------------------------------------------------------------------------------------------

Successfully created/updated stack - sam-app-pipeline in eu-west-1
```

A new stack has been created to deploy our AWS CodePipeline:

![sam-pipeline-stack-cicd](sam-pipeline-stack-cicd.png){:class="border"}

> But the first execution has failed
>
> ![sam-pipeline-error](sam-pipeline-error.png){:class="border"}
{: .prompt-danger }

We can see in the CodePipeline flow all steps created:

- **Source**: integrated with GitHub as we indicated before
- **UpdatePipeline**: the pipeline can update itself
- **BuildAndPackage**: the SAM application is built, packaged, and uploaded (with AWS CodeBuild service)
- **DeployTest**: the SAM application is deployed (with AWS CodeBuild service)

![sam-pipeline-error-execution](sam-pipeline-error-execution.png){:class="border"}

The cause of the error was that the **connection between GitHub and AWS must be confirmed after being created**:

![sam-pipeline-error-detail](sam-pipeline-error-detail.png){:class="border"}

### Step 5: Connect your Git repository with your CI/CD system

> If you are using GitHub or Bitbucket, after running the `sam deploy` command, you need to complete the **pending connection** in the Settings/Connection section of the Developer Tools.
>
> In addition, you could store a copy of the CodeStarConnectionArn from the output of the sam deploy command, because you will need it if you want to use AWS CodePipeline with another branch than main.
{: .prompt-warning }

By accessing the Settings/Connections in the Developer Tools, you can validate that the connection is pending approval:

![sam-pipeline-connection](sam-pipeline-connection.png){:class="border"}

After activating it, we run the pipeline again (by clicking on the <kbd>Release change</kbd> button) and now the pipeline ends correctly.

![sam-pipeline-ok-execution](sam-pipeline-ok-execution.png){:class="border"}

## Update CI/CD steps to the SAM project

Note that now we have a pipeline that first checks for changes in the pipeline itself and then checks the code and deploys the resources.

### Step 1: Update steps in the pipeline automatically

> With this pipeline configuration (with `UpdatePipeline` step) all the changes that we make in the pipeline will be updated automatically.
{: .prompt-info }

We want to test the automatic update of the pipeline if we make some changes.

So, let's change the pipeline steps to:

- delete the `UpdatePipeline` step
- add the `UnitTest` step

To do this, we have to update the <kbd>codepipeline.yaml</kbd> file with the necessary changes:

- comment all the `UpdatePipeline` step code
- uncomment all the `UnitTest` step code

And after that, commit the changes and push them to the repository:

![sam-codepipeline-update-steps](sam-codepipeline-update-steps.png){:class="border"}

When we push the changes, the `UpdatePipeline` step executes an update on the `sam-app-pipeline` stack (in the CloudFormation service) and it will update the pipeline definition.

![sam-app-pipeline-updating](sam-app-pipeline-updating.png){:class="border"}

As we expected, **the pipeline has updated itself** and now we have `UnitTest` step but not `UpdatePipeline`.

![sam-app-pipeline-updated-execution](sam-app-pipeline-updated-execution.png){:class="border"}

### Step 2: Update steps in the pipeline manually

> If you remove the `UpdatePipeline` step, when you push a change to the repository the pipeline won't be updated, so you have to run manually the update of the pipeline.
{: .prompt-info }

To update the pipeline we have to run again the command `sam deploy -t codepipeline.yaml --stack-name sam-app-pipeline --capabilities=CAPABILITY_IAM`

``` console
> sam deploy -t codepipeline.yaml --stack-name sam-app-pipeline --capabilities=CAPABILITY_IAM

 Deploying with following values
 ===============================
 Stack name                   : sam-app-pipeline
 Region                       : eu-west-1
 Confirm changeset            : True
 Disable rollback             : False
 Deployment s3 bucket         : aws-sam-cli-managed-default-samclisourcebucket-bymcog0ibyy0
 Capabilities                 : ["CAPABILITY_IAM"]
 Parameter overrides          : {}
 Signing Profiles             : {}

Initiating deployment
=====================
Uploading to sam-app/23360d9a8d229e9ea24f2e1a53ea8b00.template  15967 / 15967  (100.00%)

Waiting for changeset to be created..

CloudFormation stack changeset
-------------------------------------------------------------------------------------------------
Operation                LogicalResourceId        ResourceType             Replacement
-------------------------------------------------------------------------------------------------
* Modify                 CodeBuildProjectBuildA   AWS::CodeBuild::Projec   Conditional
* Modify                 CodeBuildProjectDeploy   AWS::CodeBuild::Projec   Conditional
* Modify                 CodeBuildServiceRole     AWS::IAM::Role           False
* Modify                 CodePipelineExecutionR   AWS::IAM::Role           False
* Modify                 CodeStarConnection       AWS::CodeStarConnectio   False
* Modify                 PipelineArtifactsBucke   AWS::S3::BucketPolicy    False
* Modify                 PipelineArtifactsBucke   AWS::S3::Bucket          False
* Modify                 PipelineArtifactsLoggi   AWS::S3::BucketPolicy    False
* Modify                 PipelineArtifactsLoggi   AWS::S3::Bucket          False
* Modify                 PipelineStackCloudForm   AWS::IAM::Role           False
* Modify                 Pipeline                 AWS::CodePipeline::Pip   False
- Delete                 CodeBuildProjectUnitTe   AWS::CodeBuild::Projec   N/A
-------------------------------------------------------------------------------------------------

Changeset created successfully. arn:aws:cloudformation:eu-west-1:xxxxxxxxxxxx:changeSet/samcli-deploy1649503303/4d23550d-27da-458d-ba18-f3be6db7ca54


Previewing CloudFormation changeset before deployment
======================================================
Deploy this changeset? [y/N]: > Y

2022-04-09 13:22:01 - Waiting for stack create/update to complete

CloudFormation events from stack operations
-------------------------------------------------------------------------------------------------
ResourceStatus           ResourceType             LogicalResourceId        ResourceStatusReason
-------------------------------------------------------------------------------------------------
UPDATE_COMPLETE          AWS::S3::Bucket          PipelineArtifactsLoggi   -
UPDATE_COMPLETE          AWS::IAM::Role           PipelineStackCloudForm   -
UPDATE_COMPLETE          AWS::CodeStarConnectio   CodeStarConnection       -
UPDATE_COMPLETE          AWS::S3::Bucket          PipelineArtifactsBucke   -
UPDATE_COMPLETE          AWS::S3::BucketPolicy    PipelineArtifactsLoggi   -
UPDATE_COMPLETE          AWS::IAM::Role           CodeBuildServiceRole     -
UPDATE_COMPLETE          AWS::CodeBuild::Projec   CodeBuildProjectBuildA   -
UPDATE_COMPLETE          AWS::CodeBuild::Projec   CodeBuildProjectDeploy   -
UPDATE_IN_PROGRESS       AWS::IAM::Role           CodePipelineExecutionR   -
UPDATE_COMPLETE          AWS::IAM::Role           CodePipelineExecutionR   -
UPDATE_COMPLETE          AWS::S3::BucketPolicy    PipelineArtifactsBucke   -
UPDATE_IN_PROGRESS       AWS::CodePipeline::Pip   Pipeline                 -
UPDATE_COMPLETE          AWS::CodePipeline::Pip   Pipeline                 -
UPDATE_COMPLETE_CLEANU   AWS::CloudFormation::S   sam-app-pipeline         -
DELETE_IN_PROGRESS       AWS::CodeBuild::Projec   CodeBuildProjectUnitTe   -
UPDATE_COMPLETE          AWS::CloudFormation::S   sam-app-pipeline         -
DELETE_COMPLETE          AWS::CodeBuild::Projec   CodeBuildProjectUnitTe   -
-------------------------------------------------------------------------------------------------

CloudFormation outputs from deployed stack
-------------------------------------------------------------------------------------------------
Outputs
-------------------------------------------------------------------------------------------------
Key                 CodeStarConnectionArn
Description         The Arn of AWS CodeStar Connection used to connect to external code
repositories.
Value               arn:aws:codestar-connections:eu-
west-1:xxxxxxxxxxxx:connection/cc4ce462-f77f-43ab-b63c-8012ef6a467e
-------------------------------------------------------------------------------------------------

Successfully created/updated stack - sam-app-pipeline in eu-west-1
```

And the pipeline will be updated:

![sam-pipeline-simplified](sam-pipeline-simplified.png){:class="border"}

### Summary of the current state

After all the changes that we made:

- Now, we have 3 steps in our CodePipeline:
  - **Source**: integrated with GitHub as we indicated before
  - **BuildAndPackage**: the SAM application is built, packaged, and uploaded (with AWS CodeBuild service)
  - **DeployTest**: the SAM application is deployed (with AWS CodeBuild service)
- To summarize the current state:
  - If we change the SAM application and update the code in our GitHub repository, the pipeline will update the resources in our AWS account.
  - If we want to update the pipeline itself, we have to update the specific pipeline files in our SAM application, and then run manually the command `sam deploy -t codepipeline.yaml --stack-name sam-app-pipeline --capabilities=CAPABILITY_IAM`.

## Clean up

We have created 4 stacks in CloudFormation related to SAM:

- **sam-app**: application code
- **sam-app-pipeline**: codepipeline
- **aws-sam-cli-managed-test-pipeline-resources**: test stage resources
- **aws-sam-cli-managed-default**: general SAM resources

> If you want to use SAM in the future you could keep the `aws-sam-cli-managed-default` stack.
{: .prompt-tip }

You have several ways to delete your resources:

- AWS CloudFormation service
- AWS CLI
- WS SAM CLI

> If you execute the command `sam delete`, it only will delete the main stack (sam-app) but not the CI/CD pipeline or the stage resources stack.
{: .prompt-note }

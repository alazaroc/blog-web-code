---
layout: post
title: How to add CI/CD to my CDK project
date: 2022-03-26 02:03 +0100
last_modified_at:
description: I will show you how you can deploy a CDK project using the Developer Tools of AWS, and a different approach to creating it with AWS console and with IaC.
category:
- IaC
- DevOps
tags:
- how-to
- iac
- cdk
- cicd
- codepipeline
- codebuild
published: true
pin: false
featured_post: false
comments: true
sitemap: true
img_path: /assets/img/posts/2022-03-20-how-to-add-ci-cd-to-my-cdk-project/
---
---

## TLDR

I already have a CDK project on GitHub [here](https://github.com/alazaroc/blog-infrastructure/){:target="_blank"}, but to deploy it I have to run the CDK Toolkit command `cdk deploy` from my local machine.

I want **to add automation** to my deployment process and integrate it with the AWS ecosystem... so **I will use the AWS Developer tools** to do it.

I will show you 2 different approaches:

- **Create the pipeline with the AWS Console**: Why? Helps you understand the low level of the solution and how AWS services work
- **Create the pipeline with IaC (CDK)**: Why? You should always try to automate everything. In this case, I will create the pipeline that will allow us to deploy the CDK code automatically.

I want to implement the simplest solution, with the KISS principle in mind, and for this reason, my architecture diagram is as follows:

![solution-1](architecture-diagrams/solution-1.png){:class="border"}

Explanation: In a CDK deployment, I don't need to run the `cdk synth` command and manage the generated artifacts, so the simplest solution is to run the `cdk deploy` command directly.

> If you need more information about it, I wrote a related post: [How to create infrastructure with CDK](/posts/how-to-create-infrastructure-with-cdk/){:target="_blank"}.
{: .prompt-info }

However, upon investigation the AWS recommendation to deploy a CI/CD pipeline of CDK projects is something similar to the following:

![solution-2](architecture-diagrams/solution-2.png){:class="border"}

I will explain it in detail in this post.

> I have preferred to include all of information in the same post, although I could easily split it in 2 or 3, and this post have a lot of content and images.
{: .prompt-info }

## Introduction

Before I start showing you how to add the CI/CD I will introduce you to the basic concepts involved:

SDLC (**Software Development Lifecycle**)
> is a process for planning, creating, testing, and deploying an information system - Wikipedia

Depending on where you look, there will be a different number of phases in the SDLC process.

For this article we will explain what means CI/CD over 4 phases of the software release process: source, build, test and production (deployment):

![software-release-process](software-release-process.png){:class="border"}

**CI/CD** refers to Continuous Integration and Continuous Delivery and it introduces automation and monitoring to the complete SDLC.

**Continuous integration (CI)** is a software development practice where developers regularly merge their code changes into a central repository, after which automated builds and tests are run

- The key goals of CI are
  - to find and address bugs more quickly,
  - improve software quality,
  - and reduce the time it takes to validate and release new software updates
- Continuous integration focuses on smaller commits and smaller code changes to integrate

**Continuous delivery (CD)** is a software development practice where code changes are automatically built, tested, and prepared for production release

- Benefits
  - Automate the software release process
  - Improve developer productivity
  - Improve code quality
  - Deliver updates faster
- The point of continuous delivery is not to apply every change to production immediately but to ensure that every change is ready to go to production

**Continuous deployment (CD)**, revisions are deployed to a production environment automatically without explicit approval from a developer, making the entire software release process automated.

> So yes, the **"CD"** in "CI/CD" means 2 different things:
>
> - Continuos Delivery (prepare deployment to prod)
> - and Continuos Deployment (deploy automatically in prod)
{: .prompt-tip }

## CodePipeline for CDK with AWS Console

First, we will create the solution with the AWS Console because it helps to understand how the services involved work.

As we want to create a new Pipeline, we must access to <kbd>CodePipeline</kbd> service and click on <kbd>Create pipeline</kbd>.

Step 1 in CodePipeline is to choose the pipeline settings. We have to create a new service role (or use an existing one).

![codepipeline1](console/codepipeline-1.png){:class="border" :width="20"}

Step 2 is to add the source of the stage choosing the source provider. I have my code repository on GitHub so I choose GitHub (version 2) but you could choose a different one.

> There are 2 options for GitHub source provider:
>
> - version 1 (not recommended) which uses OAuth apps to access your GitHub repository
> - **version 2 (recommended)** which uses a connection with GitHub Apps to access your repository
{: .prompt-tip }

![codepipeline2](console/codepipeline-2.png){:class="border"}

> If you choose GitHub version 2, the next step is to **create a new connection** to GitHub and if you don't have any GitHub App created you need to create a new one, so you should click on <kbd>Install new app</kbd>.
>
> ![codepipeline3](console/codepipeline-3.png){:class="border"}
>
> You have to choose whether to create the connection for all repositories or only th selected ones, and click <kbd>Install</kbd>.
>
> ![codepipeline4](console/codepipeline-4.png){:class="border"}
>
> The GitHub connection is ready to use and you will be redirected to Step 2 of the creation of the CodePipeline.
{: .prompt-info }

Now you can choose your repository and your branch and click on <kbd>Next</kbd>.

![codepipeline5](console/codepipeline-5.png){:class="border"}

Step 3 is to add the build stage, and you should select <kbd>AWS CodeBuild</kbd> because we want to use this service to add custom commands.

![codepipeline6](console/codepipeline-6-build.png){:class="border"}

After that, select the region, a project name, and a single build and click <kbd>Next</kbd>.

![codepipeline7](console/codepipeline-7-build.png){:class="border"}

> With this specific configuration, it will fail, do you know why?
{: .prompt-danger }

Step 4 is to add the deploy stage. Here are all the available options but we <kbd>skip</kbd> this step because we don't need it.

![codepipeline8](console/codepipeline-8-deploy.png){:class="border"}

Now the CodePipeline is ready to be created and a review page is displayed. Confirm and create the CodePipeline.

![codepipeline9](console/codepipeline-9.png){:class="border"}

It is done. We have created the CodePipeline and added 2 stages:

- Source
- Build

First execution...

![codepipeline10](console/codepipeline-10.png){:class="border"}

As you can see the execution had failed!

Do you know what caused the error? Let's investigate it...

If you click on the `execution ID link`, you will be redirected to the pipeline execution summary and you will see the error message `Project cannot be found` in CodeBuild.

![codepipeline11](console/codepipeline-11.png){:class="border"}

Also, you can click on the <kbd>AWS CodeBuild</kbd> action name and you will be redirected to the CodeBuild service... where you will receive the same error information: "Resource not available".

![codepipeline12](console/codepipeline-12.png){:class="border"}

> Yes, there is no CodeBuild project created in the pipeline, we just add a name of a created CodeBuild resource (and this resource doesn't exist because **nobody has created it**).
{: .prompt-warning }

To fix it, you need to <kbd>edit the Pipeline</kbd> and <kbd>edit the Build stage</kbd> to create a new CodeBuild project.

![codepipeline15](console/codepipeline-15.png){:class="border"}

![codepipeline16](console/codepipeline-16.png){:class="border"}

A new window will be opened, the Build stage will be editable and you need to click on the <kbd>Create project</kbd> button.

![codepipeline17](console/codepipeline-17.png){:class="border"}

You can create the build project by choosing the following:

- Operating System: `Amazon Linux 2`
- Runtime(s): `Standard`
- Image: the more updated image
- New role name
- Buildspec: `Insert build commands` and click to <kbd>Switch to editor</kbd> and add the following:

  ```shell
  version: 0.2
  phases:
    install:
      commands:
        - npm install
        - npm install -g typescript
        - npm install -g aws-cdk
    build:
      commands:
        - npm ci
        - npm run build
        - cdk deploy
  ```

- Add a CloudWatch log, choosing as Group name `/aws/codebuild/blog-infrastructure`

When you have finished filling in all fields, click <kbd>Continue to CodePipeline</kbd>.

![codepipeline18](console/codepipeline-18-create-codebuild.png){:class="border"}

![codepipeline19](console/codepipeline-19.png){:class="border"}

> Again, with this configuration the execution will fail. Do you know why?
{: .prompt-danger }

You can now go back to the CodePipeline and force the execution again by clicking on <kbd>Release change</kbd>.

And, as expected, it fails again.

![codepipeline14-error2](console/codepipeline-14-error.png){:class="border"}

This time we will review the **CloudWatch logs** generated for this run to look for errors.

![codepipeline21](console/codepipeline-21.png){:class="border"}

You can see that the **CodeBuild role** is trying to assume the CDK role to perform the CDK commands, and of course, we didn't specify any permissions to the new role so it can't assume any roles.

> **How CDK deploy works**: Behind the scenes, when the `cdk deploy` command is executed, CDK is using the CDK roles created in the bootstrap process to perform some actions: perform a lookup, upload files and deploy the template uploaded in the S3 into the CloudFormation service.
{: .prompt-tip }

Therefore, you need to update the CodeBuild role to add the assumed permission to CDK roles. To do this, create new permission (new inline policy).

![codepipeline22](console/codepipeline-22-edit-role.png){:class="border"}

You must add the Action `sts:AssumeRole` and the Resources of the 4 CDK roles created in the bootstrap.

![codepipeline23](console/codepipeline-23.png){:class="border"}

![codepipeline24](console/codepipeline-24.png){:class="border"}

When is created, you can review that the new permission has been added to the CodeBuild role.

![codepipeline25](console/codepipeline-25.png){:class="border"}

If you come back to the CodePipeline service and you execute it again, it will succeed!

![codepipeline26](console/codepipeline-26.png){:class="border"}

> Now, if you make any changes in your repository, **the pipeline will be automatically executed** and your infrastructure will be updated executing the `cdk deploy` command of the CDK Toolkit inside of the CodeBuild service.
{: .prompt-note }

If you want, you can check the logs in the **CloudWatch** service to verify that the execution of the `cdk deploy` command went as we expected:

![codepipeline27](console/codepipeline-27.png){:class="border"}

### Improve: Use a Buildspec file inside the code

You have done a lot of manual work, and the first improvement you can **automate** is the definition of the build process itself.

You need to update in the CodeBuild project the buildspec configuration of the project, select `Use a buildspec file` and click to <kbd>Update buildspec</kbd>.

Now **when the pipeline runs it will look for the buildspec file inside the code** (in the root folder). You have configured the CodeBuild service but you don't have the buildspec.yml file added to your code yet.

Next, you must add the buildspec.yml file with the same content you provided in the online editor to update the build commands in the code. [More information about buildspec file](https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref-name-storage){:target="_blank"}

In the following image, you can see the VSCode IDE and the new <kbd>buildspec.yml</kbd> file with the same content as before.

![codepipeline29](console/codepipeline-29.png){:class="border"}

### Test it: automatic execution of the pipeline when a commit is done

If you commit the new file to your repository (buildspec.yml)

![codepipeline30](console/codepipeline-30.png){:class="border"}

The **pipeline runs automatically** as expected

![codepipeline31](console/codepipeline-31.png){:class="border"}

## CodePipeline for CDK with IaC

Now that we have deployed the CodePipeline with the AWS Console, **we will do the same with Infrastructure as Code** with CDK.

To do this, I will add a CodePipeline resource to my CDK project for the blog.

> I am using the GitHub v2 connection because it is the recommended way, and it requires first to use the AWS Console to authenticate to the source control provider, and then use the connection ARN in your pipeline definition.
>
> In other words, **if you use GitHub v2 you need create the connection manually**!
{: .prompt-warning }

### Selfmutation property

> I want to show you first how "selfmutation" works in CDK pipelines because this it is important to know.
{: .prompt-info }

This is the code to add the CodePipeline resource with 2 stages:

- Source with GitHub v2 (with a connection)
- Build phase (`cdk synth`)

> CDK pipelines will generate CodeBuild projects for each **ShellStep** you use
{: .prompt-tip }

```typescript
const codePipelineName = `blog-infrastructure-cdk`;
const pipeline = new CodePipeline(this, codePipelineName, {
  pipelineName: codePipelineName,
  synth: new ShellStep('Synth', {
    // input: CodePipelineSource.gitHub('alazaroc/aws-cdk-pipeline', 'main'),
    input: CodePipelineSource.connection(
      'alazaroc/blog-infrastructure',
      'main',
      {
        connectionArn:
          'arn:aws:codestar-connections:eu-west-1:xxxxxxxx:connection/fb936fb8-a047-43d5-90bd-xxxxxxxxxx', // Created using the AWS console * });',
      },
    ),
    commands: ['npm ci', 'npm run build', 'npx cdk synth'],
  }),
});
```

> You must **deploy the pipeline manually once**. After that, the pipeline will be kept up to date from the source code repository.
{: .prompt-tip }

If you run the `cdk deploy` command, as you can see the pipeline is created and automatically runs.

![cdk-codepipeline-1](iac/cdk-codepipeline-1.png){:class="border"}

![cdk-codepipeline-2](iac/cdk-codepipeline-2.png){:class="border"}

> But wait a minute, we have three stages? A new one `SelfMutate` appears. Well, let's wait to finish...
{: .prompt-warning }

![cdk-codepipeline-3](iac/cdk-codepipeline-3.png){:class="border"}

> PipelineNotFoundException? What happened here? We waited for the pipeline to finish executing and the pipeline no longer exists!
{: .prompt-danger }

Let's do some research on `SelfMutate`. The CDK documentation says:

> Whether the pipeline will update itself
>
> This needs to be set to `true` to allow the pipeline to reconfigure itself when assets or stages are being added to it, and `true` is the recommended setting.
>
> You can temporarily set this to `false` while you are iterating on the pipeline itself and prefer to deploy changes using `cdk deploy`.

We haven't added this property to our code and the default value applied is `true`, so the pipeline has updated itself and, as **the code is NOT committed** in the source code, the pipeline has been removed.

We have previously executed the deploy command but not a previous commit.

> I didn't commit my CodePipeline code to make the result "more dramatic" (pipeline deleted automatically). But i**f you commit the code, nothing will happen**. You will have one more stage to allow the pipeline to autoconfigure if there any changes, and at each run this will be checked.
{: .prompt-info }

I want to show you what will happen if you set the `selfmutate` property to false (and the code is not committed).

This is the change needed in the CDK CodePipeline resource code, adding this line:

```typescript
selfMutation: false,
```

And if you run the `cdk deploy` command again, the pipeline will be updated:

![cdk-codepipeline-4](iac/cdk-codepipeline-4.png){:class="border"}

Now, there are only 2 stages in the CodePipeline, the <kbd>Source</kbd> and the <kbd>Build</kbd>, the 2 that we have configured and work perfectly.

### CDK Deploy

We will change the code of our CodePipeline service so that instead of executing a `cdk synth` command, it will execute the `cdk deploy` command.

Also, to avoid the assumed role error we saw in the AWS Console example (in this same post), we will add the IAM permissions necessary to the CodeDeploy role to run the deploy command.

> **To customize** the CodeBuild project, **change ShellStep by CodeBuildStep**. This class has more properties to customize it:
{: .prompt-tip }

```typescript
const codePipelineName = `blog-infrastructure-cdk`;
  const pipeline = new CodePipeline(scope, codePipelineName, {
    pipelineName: codePipelineName,
    // synth: new ShellStep('Deploy', {
    synth: new CodeBuildStep('Deploy', {
      input: CodePipelineSource.connection(
        'alazaroc/aws-cdk-pipeline',
        'main',
        {
          connectionArn:
            'arn:aws:codestar-connections:eu-west-1:xxxxxx:connection/4d6c1902-bda7-43fb-8508-xxxxxx',
        },
      ),
      commands: ['npm ci', 'npm run build', 'npx cdk deploy --require-approval'],
      rolePolicyStatements: [
        new aws_iam.PolicyStatement({
          actions: ['sts:AssumeRole'],
          resources: ['*'],
          conditions: {
            StringEquals: {
              'iam:ResourceTag/aws-cdk:bootstrap-role': [
                'lookup',
                'image-publishing',
                'file-publishing',
                'deploy',
              ],
            },
          },
        }),
      ],
    }),
    selfMutation: false,
  });
```

When you deploy it will create the CodePipeline project and execute the 2 steps defined:

- Source
- Build (`cdk deploy`)

> We changed the `cdk synth` by `cdk deploy` and also added the necessary permissions.
{: .prompt-info }

And since we have added the appropriate permissions, it doesn't fail.

![cdk-codepipeline-5](iac/cdk-codepipeline-5.png){:class="border"}

### Recommended deployment of CodePipeline to CDK projects

> This approach is a little different.
{: .prompt-warning }

I will use [this other example of CodePipeline for CDK](https://github.com/alazaroc/aws-cdk-pipeline){:target="_blank"}, to make it easier to understand. Also, I will go step by step to understand perfectly how it works.

This is the final diagram of what we will build (with the CDK code):

![cdk-pipeline-diagram](iac/cdk-pipeline-diagram.png){:class="border"}

> If you want to create the Pipeline of the CDK project you will need to include at least two stacks: one for the pipeline and one or more for the infrastructure that will be deployed with the pipeline.
{: .prompt-info }

Application deployment begins by defining **MyPipelineAppStage**, a subclass of `Stage` that contains the stacks that make up a single copy of my stack (MyIaCStack).

```typescript
export class MyPipelineAppStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const iaCStack = new MyIaCStack(this, 'iac-example-stack', {
      description:
        'Stack created with codepipeline in the example aws-cdk-pipeline',
    });
  }
}
```

Now, we define **MyIaCStack**, which contains all the AWS resources that will be created in a different stack than Pipeline:

```typescript
export class MyIaCStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Add resources
    new aws_s3.Bucket(this, 'MyFirstBucket', {
      enforceSSL: false,
    });
  }
}
```

Finally, we create the main stack, **MyPipelineStack**, which will add **MyPipelineAppStage** as a stage within the CodePipeline resource.

```typescript
export class MyPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const codePipelineName = `test-iac-with-cdk`;
    const pipeline = new CodePipeline(this, codePipelineName, {
      pipelineName: codePipelineName,
      synth: new ShellStep('Synth', {
        // input: CodePipelineSource.gitHub('alazaroc/aws-cdk-pipeline', 'main'),
        input: CodePipelineSource.connection(
          'alazaroc/aws-cdk-pipeline',
          'main',
          {
            connectionArn: getMyGitHubConnectionFromSsmParameterStore(this), // Created using the AWS console * });',
          },
        ),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });

    pipeline.addStage(
      new MyPipelineAppStage(this, 'Deploy', {
        // env: { account: "111111111111", region: "eu-west-1" }
      }),
    );
  }
}
```

We have to **commit** all the above changes, **and** after that **deploy** it.

![cdk-codepipeline-7](iac/cdk-codepipeline-7.png){:class="border"}

It will create:

- the main stack with the CodePipeline, **MyPipelineStack**,
- the **Deploy-iacStack**

First, the pipeline stack is created, and then, when the CodePipeline is executed, the second stack which contains all the other resources is created.

![cdk-codepipeline-6](iac/cdk-codepipeline-6.png){:class="border"}

![cdk-codepipeline-8](iac/cdk-codepipeline-8.png){:class="border"}

That is all, we have automation in our deployment process!

So as you can see, using CDK's CodePipeline constructor, the following is created:

![solution-2](architecture-diagrams/solution-2.png){:class="border"}

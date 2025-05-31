---
layout: post
title: 'How to create serverless applications with CDK and SAM'
date: 2022-04-25 20:45 +0200
last_modified_at:
lang: en
lang-exclusive: ['en']
description: CDK and SAM can be used together to create serverless applications. You will use CDK to define and create your AWS resources, and then you will use SAM to test your serverless resources.
category:
- Serverless
tags:
- how-to
- cdk
- sam
- iac
- serverless
- comparative
- level-300
level: 300
published: true
pin: false
featured_post: false 
comments: true
sitemap: true
media_subpath: /assets/img/posts/2022-04-12-how-to-create-serverless-applications-with-cdk-and-sam/
image:
  path: simple-webservice-v1.png
  header_post: false
---
---

## 1. Introduction

> A **serverless application** is more than just a Lambda Function. It is a combination of Lambda functions, event sources, APIs, databases, and other resources that work together to perform tasks.

Creating serverless resources via the AWS Console is quick and easy, but it's advisable to use this approach only for testing purposes during the learning phase. After that, and thinking about **how to use the resources in a real project**, you will need:

- **IaC**: to create your resources in a way that allows you to recreate them easily
- **Version control**: to track all the code modifications
- **CI/CD**: to automate the release process

> Does anyone use CloudFormation or Terraform to manage their serverless resources? Possibly but come on, there is a better way!
{: .prompt-info }

> To manage your serverless resources, the natural way to do it is using the following IaC technologies:
>
> - `SAM (Serverless Application Model) / Serverless Framework`: declarative option with templates. It is a specific framework for Serverless applications.
> - `CDK / Pulumi`: add a level of abstraction and allow you to define the infrastructure with modern programming languages.
{: .prompt-tip }

In this article, we will review the approach to combining both **CDK + SAM**.

> By the way, CDK + SAM is my preferred approach: you get the best of the 2 options! What do you think? You can share your opinion in the comments!
{: .prompt-info }

## 2. CDK vs SAM

In the linked articles below, you will find information about CDK and SAM.

- CDK basics: [How to create infrastructure with CDK](/posts/how-to-create-infrastructure-with-cdk/){:target="_blank"}
- SAM basics: [How to create serverless applications with SAM](/posts/how-to-create-serverless-applications-with-sam/){:target="_blank"}

### 2.1. What CDK and SAM have in common?

Both...

- Are open-source, Apache-licensed software development frameworks
- Provide Infrastructure as Code (IaC)
- Use AWS CloudFormation behind the scenes to deploy resources
- Provide a CLI to build and deploy applications
- Are well integrated with AWS build pipelines
- Support component reuse

### 2.2. What are the main differences between CDK and SAM?

|  | CDK | SAM |
|---|---|---|
| To declare resources | Uses familiar programming languages | Uses JSON or YAML |
| Dynamic references | Native language capabilities | Pseudo parameters and logical functions |
| Testing | Not supported natively (you could use SAM) | Supported (also debug) |
| IaC resources | All | Focus on serverless but you can use CloudFormation to create any AWS resource |
| Complexity | Very low | Medium, based on CloudFormation |
| Maintainability | Higher | Medium |

### 2.3. Why CDK vs SAM? Let's use CDK + SAM

From Jan 6, 2022, [AWS announced](https://aws.amazon.com/about-aws/whats-new/2022/01/aws-serverless-application-model-sam-cli-aws-cloud-development-kit-cdk/){:target="_blank"} the general availability of AWS SAM CLI support for local testing of AWS CDK applications. It means that `you can use SAM over your CDK project to test your resources!`.

- Now, more than 2 years have passed, so this integration is mature!

## 3. Hands-on: CDK + SAM

We will use a new CDK project to show how to work the combination of CDK + SAM.

The source code is available [here](https://github.com/alazaroc/aws-cdk-simple-webservice){:target="_blank"}. This repository has several CDK projects but first, we will use the <kbd>v1-simple</kbd>

![simple-webservice-v1](simple-webservice-v1.png){:class="border"}

### 3.1. Prepare to test

With **CDK**, when you run `cdk synth`, it will synthesize a stack defined in your app into a CloudFormation template in a `json` file in the `cdk.out` folder.

However, **SAM** uses a `yaml` template, `template.yaml` or `template.yml`, in the root folder.
> Also, <kbd>to test locally</kbd>, you will need this file created or you will receive an error
>
> ```shell
> > sam local invoke
> Error: Template file not found at 
> /.../aws-cdk-simple-webservice/template.yml
> ```
>
{: .prompt-danger }

Therefore, we have to run `cdk synth` and store the result in one file with the name `template.yml`.

> You have to use <kbd>--no-staging </kbd> because it is required for SAM CLI to local debug the source files. It will disable the copy of assets which allows local debugging to reference the original source files
{: .prompt-info }

```console
cdk synth --no-staging > template.yml
```

### 3.2. Testing Lambda Functions

Now, you have a `template.yml` file and can run the SAM command to test your Lambda function.

```shell
> sam local invoke
Invoking index.handler (nodejs14.x)
Skip pulling image and use local one: public.ecr.aws/sam/emulation-nodejs14.x:rapid-1.46.0-x86_64.

Mounting /Users/alazaroc/Documents/MyProjects/github/aws/cdk/aws-cdk-simple-webservice/v1-simple/functions/simplest-example as /var/task:ro,delegated inside runtime container
START RequestId: 03d4ef7d-47b4-4ad2-a491-d0e5fc797ece Version: $LATEST
2022-04-22T21:00:38.952Z 03d4ef7d-47b4-4ad2-a491-d0e5fc797ece INFO request: {}
END RequestId: 03d4ef7d-47b4-4ad2-a491-d0e5fc797ece
REPORT RequestId: 03d4ef7d-47b4-4ad2-a491-d0e5fc797ece Init Duration: 0.39 ms Duration: 205.98 ms Billed Duration: 206 ms Memory Size: 512 MB Max Memory Used: 512 MB
{"statusCode":200,"headers":{"Content-Type":"text/html"},"body":"You have connected with the Lambda!"}%
```

The Lambda returns the following body: `You have connected with the Lambda!`

### 3.3. Testing Lambda Functions with input data

If your Lambda Functions need input data, you can generate it from **SAM CLI** with the command `generate-event`

```console
sam local generate-event [OPTIONS] COMMAND [ARGS]...
```

You can use this command to generate sample payloads from different event sources such as S3, API Gateway, SNS, and so on. These payloads contain the information that the event sources send to your Lambda functions.

Alternatively, you can add the input data using the `-e` option with the `invoke` command.

```shell
> sam local invoke -e test/events/simple-event.json
Invoking index.handler (nodejs14.x)
Skip pulling image and use local one: public.ecr.aws/sam/emulation-nodejs14.x:rapid-1.46.0-x86_64.

Mounting /Users/alazaroc/Documents/MyProjects/github/aws/cdk/aws-cdk-simple-webservice/v1-simple/functions/simplest-example as /var/task:ro,delegated inside runtime container
} "rawPath": "/test"706Z 992499c1-83c4-408d-966b-2e13f5955cbc INFO input: {
{"statusCode":200,"headers":{"Content-Type":"text/html"},"body":"You have connected with the Lambda!"}END RequestId: 992499c1-83c4-408d-966b-2e13f5955cbc
REPORT RequestId: 992499c1-83c4-408d-966b-2e13f5955cbc Init Duration: 0.89 ms Duration: 244.32 ms Billed Duration: 245 ms Memory Size: 512 MB Max Memory Used: 512 MB
```

### 3.4. Testing API Gateway

You have to run `sam local start-api`

```shell
> sam local start-api
Mounting simplest-lambda at http://127.0.0.1:3000$default [X-AMAZON-APIGATEWAY-ANY-METHOD]
You can now browse to the above endpoints to invoke your functions. You do not need to restart/reload SAM CLI while working on your functions, changes will be reflected instantly/automatically. You only need to restart SAM CLI if you update your AWS SAM template
2022-04-23 00:03:58  * Running on http://127.0.0.1:3000/ (Press CTRL+C to quit)
```

> You can access `http://127.0.0.1:3000/` to connect with your Lambda Function
{: .prompt-info }

![testing api-gateway-from-web-v1](testing api-gateway-from-web-v1.png){:class="border"}

If you review your previous console, it will be updated when you access your API Gateway:

```shell
> sam local start-api
default [X-AMAZON-APIGATEWAY-ANY-METHOD]
You can now browse to the above endpoints to invoke your functions. You do not need to restart/reload SAM CLI while working on your functions, changes will be reflected instantly/automatically. You only need to restart SAM CLI if you update your AWS SAM template
2022-04-23 00:03:58  * Running on http://127.0.0.1:3000/ (Press CTRL+C to quit)
Invoking index.handler (nodejs14.x)
Skip pulling image and use local one: public.ecr.aws/sam/emulation-nodejs14.x:rapid-1.46.0-x86_64.

Mounting /Users/alazaroc/Documents/MyProjects/github/aws/cdk/aws-cdk-simple-webservice/v1-simple/functions/simplest-example as /var/task:ro,delegated inside runtime container
START RequestId: 8ed4a0a8-18bc-43af-b759-ad0668784351 Version: $LATEST
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Ge    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng} "isBase64Encoded": falsehost"01 +0000",-11ba1c012bf1",
END RequestId: 8ed4a0a8-18bc-43af-b759-ad0668784351
REPORT RequestId: 8ed4a0a8-18bc-43af-b759-ad0668784351 Init Duration: 0.51 ms Duration: 230.55 ms Billed Duration: 231 ms Memory Size: 512 MB Max Memory Used: 512 MB
2022-04-23 00:11:05 127.0.0.1 - - [23/Apr/2022 00:11:05] "GET / HTTP/1.1" 200 -
Invoking index.handler (nodejs14.x)
Skip pulling image and use local one: public.ecr.aws/sam/emulation-nodejs14.x:rapid-1.46.0-x86_64.

Mounting /Users/alazaroc/Documents/MyProjects/github/aws/cdk/aws-cdk-simple-webservice/v1-simple/functions/simplest-example as /var/task:ro,delegated inside runtime container
START RequestId: 5759a74a-40b5-4a7e-8362-eec719ae44a7 Version: $LATEST
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Ge} "isBase64Encoded": falseco"t"01 +0000",-11ba1c012bf1",g+xml,image/*,*/*;q=0.8",
END RequestId: 5759a74a-40b5-4a7e-8362-eec719ae44a7
REPORT RequestId: 5759a74a-40b5-4a7e-8362-eec719ae44a7 Init Duration: 0.50 ms Duration: 238.45 ms Billed Duration: 239 ms Memory Size: 512 MB Max Memory Used: 512 MB
2022-04-23 00:11:06 127.0.0.1 - - [23/Apr/2022 00:11:06] "GET /favicon.ico HTTP/1.1" 200 -
```

### 3.5. Bonus: Testing DynamoDB

Ok, testing a mocked Lambda Function is the "hello world" example and not very useful, but what about a Lambda Function that connects to a DynamoDB table?

We will update our Lambda Function to store the data in a DynamoDB table, so we will use the <kbd>v2-dynamodb</kbd> example in the repository.

> This code is based on the pattern defined in the web [cdkpatterns](https://cdkpatterns.com/patterns/filter/?by=Lambda){:target="_blank"} as the [simple webservice](https://github.com/cdk-patterns/serverless/blob/main/the-simple-webservice/README.md){:target="_blank"}
{: .prompt-info }

![simple-webservice-v2](simple-webservice-v2.png){:class="border"}

#### 3.5.1. Case 1: Testing cloud DynamoDB

When you try to locally test a Lambda Function that stores data in a DynamoDB table, **it will automatically attempt to connect to the DynamoDB service of your AWS Account**.

So, to test your Account DynamoDB tables, you have to do nothing.

```shell
> sam local invoke -e test/events/simple-event.json
Invoking index.handler (nodejs14.x)
Skip pulling image and use local one: public.ecr.aws/sam/emulation-nodejs14.x:rapid-1.46.0-x86_64.

Mounting /Users/alazaroc/Documents/MyProjects/github/aws/cdk/aws-cdk-simple-webservice/v2-dynamodb/functions/dynamodb-example as /var/task:ro,delegated inside runtime container
} "rawPath": "/test"492Z 69d093d2-083c-46e7-a318-636ed94d7e47 INFO request: {
2022-04-23T06:38:56.797Z 69d093d2-083c-46e7-a318-636ed94d7e47 ERROR Invoke Error  {"errorType":"ResourceNotFoundException","errorMessage":"Requested resource not found","code":"ResourceNotFoundException","message":"Requested resource not found","time":"2022-04-23T06:38:56.787Z","requestId":"RCJDUN8DRCPPOS3SR3034ETK8VVV4KQNSO5AEMVJF66Q9ASUAAJG","statusCode":400,"retryable":false,"retryDelay":49.42319019990148,"stack":["ResourceNotFoundException: Requested resource not found","    at Request.extractError (/var/runtime/node_modules/aws-sdk/lib/protocol/json.js:52:27)","    at Request.callListeners (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:106:20)","    at Request.emit (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:78:10)","    at Request.emit (/var/runtime/node_modules/aws-sdk/lib/request.js:686:14)","    at Request.transition (/var/runtime/node_modules/aws-sdk/lib/request.js:22:10)","    at AcceptorStateMachine.runTo (/var/runtime/node_modules/aws-sdk/lib/state_machine.js:14:12)","    at /var/runtime/node_modules/aws-sdk/lib/state_machine.js:26:10","    at Request.<anonymous> (/var/runtime/node_modules/aws-sdk/lib/request.js:38:9)","    at Request.<anonymous> (/var/runtime/node_modules/aws-sdk/lib/request.js:688:12)","    at Request.callListeners (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:116:18)"]}
{"errorType":"ResourceNotFoundException","errorMessage":"Requested resource not found","trace":["ResourceNotFoundException: Requested resource not found","    at Request.extractError (/var/runtime/node_modules/aws-sdk/lib/protocol/json.js:52:27)","    at Request.callListeners (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:106:20)","    at Request.emit (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:78:10)","    at Request.emit (/var/runtime/node_modules/aws-sdk/lib/request.js:686:14)","    at Request.transition (/var/runtime/node_modules/aws-sdk/lib/request.js:22:10)","    at AcceptorStateMachine.runTo (/var/runtime/node_modules/aws-sdk/lib/state_machine.js:14:12)","    at /var/runtime/node_modules/aws-sdk/lib/state_machine.js:26:10","    at Request.<anonymous> (/var/runtime/node_modules/aws-sdk/lib/request.js:38:9)","    at Request.<anonymous> (/var/runtime/node_modules/aws-sdk/lib/request.js:688:12)","    at Request.callListeners (/var/runtime/node_modules/aws-sdk/lib/sequentialEND RequestId: 69d093d2-083c-46e7-a318-636ed94d7e47
REPORT RequestId: 69d093d2-083c-46e7-a318-636ed94d7e47 Init Duration: 0.98 ms Duration: 928.39 ms Billed Duration: 929 ms Memory Size: 512 MB Max Memory Used: 512 MB
_executor.js:116:18)"]}%
```

> If you don't deploy your CDK project before attempting to test it, you will get the following ERROR: `"errorType":"ResourceNotFoundException","errorMessage":"Requested resource not found"`
{: .prompt-warning }

Of course, you can set your AWS account in your SAM CLI using the `profile` command.

``` console
$ sam local invoke -e test/events/simple-event.json profile test
Invoking index.handler (nodejs14.x)
...
```

#### 3.5.2. Case 2: Testing local DynamoDB

You may want to test your Lambda function locally instead of connecting to your DynamoDB account, so we will do the following:

- Download the DynamoDB Docker image
- Run the DynamoDB Docker image locally
- Set up DynamoDB: create tables, insert data, and test it
- Change your Lambda Function code
- Test DynamoDB locally

##### 3.5.2.1. Download the DynamoDB Docker image

First, download the DynamoDB Docker image.

```shell
> docker pull amazon/dynamodb-local
Using default tag: latest
latest: Pulling from amazon/dynamodb-local
3a461b3ae562: Pull complete
14d349bd5978: Pull complete
3e361eec6409: Pull complete
Digest: sha256:07e740ad576acdcfdc48676f9a153a93a8e35436ea36942d4c14939caeca8851
Status: Downloaded newer image for amazon/dynamodb-local:latest
docker.io/amazon/dynamodb-local:latest
```

##### 3.5.2.2. Run the DynamoDB Docker image locally

Next, execute the locally downloaded DynamoDB Docker image.

> This terminal tab will be kept running and you will have to open another one.
{: .prompt-info }

```shell
> docker run -p 8000:8000 amazon/dynamodb-local
Initializing DynamoDB Local with the following configuration:
Port: 8000
InMemory: true
DbPath: null
SharedDb: false
shouldDelayTransientStatuses: false
CorsParams: *
```

> This command will not persist data in the local DynamoDB.
{: .prompt-warning }

##### 3.5.2.3. Create a local DynamoDB table

To create a local <kbd>DynamoDB table</kbd> named `hits` with a `path` partition key, execute the following command:

```shell
> aws dynamodb create-table --table-name hits --attribute-definitions AttributeName=path,AttributeType=S --key-schema AttributeName=path,KeyType=HASH --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 --endpoint-url http://localhost:8000
{
    "TableDescription": {
        "TableArn": "arn:aws:dynamodb:ddblocal:000000000000:table/hits",
        "AttributeDefinitions": [
            {
                "AttributeName": "path",
                "AttributeType": "S"
            }
        ],
        "ProvisionedThroughput": {
            "NumberOfDecreasesToday": 0,
            "WriteCapacityUnits": 1,
            "LastIncreaseDateTime": 0.0,
            "ReadCapacityUnits": 1,
            "LastDecreaseDateTime": 0.0
        },
        "TableSizeBytes": 0,
        "TableName": "hits",
        "TableStatus": "ACTIVE",
        "KeySchema": [
            {
                "KeyType": "HASH",
                "AttributeName": "path"
            }
        ],
        "ItemCount": 0,
        "CreationDateTime": 1650668228.617
    }
}
```

##### 3.5.2.4. Add values to our local DynamoDB table

We will add two elements:

- path: "/test"
- path: "/hello"

```shell
aws dynamodb put-item --table-name hits --item '{ "path": {"S": "/test"} }' --return-consumed-capacity TOTAL --endpoint-url http://localhost:8000
aws dynamodb put-item --table-name hits --item '{ "path": {"S": "/hello"} }' --return-consumed-capacity TOTAL --endpoint-url http://localhost:8000
```
{: .nolineno }

##### 3.5.2.5. Scan your table locally

We check that our table has the created elements:

```shell
> aws dynamodb scan --table-name hits --endpoint-url http://localhost:8000
{
    "Count": 2,
    "Items": [
        {
            "path": {
                "S": "/test"
            }
        },
        {
            "path": {
                "S": "/hello"
            }
        }
    ],
    "ScannedCount": 2,
    "ConsumedCapacity": null
}
```

##### 3.5.2.6. Change Lambda Function code

We need to update our Lambda Function code to tell DynamoDB to read from our local DynamoDB service:

> You have to use your specific Docker endpoint
{: .prompt-info }

```javascript
if (process.env.AWS_SAM_LOCAL) {
  // mac
  dynamo.endpoint = new AWS.Endpoint("http://docker.for.mac.localhost:8000/");
  // windows
  // dynamo.endpoint = new AWS.Endpoint("http://docker.for.windows.localhost:8000/");
  // linux
  // dynamo.endpoint = new AWS.Endpoint("http://127.0.0.1:8000");
}
```

##### 3.5.2.7. Test DynamoDB locally

In summary, we have:

- the DynamoDB service locally running
- a table (hits)
- 2 elements
  - path=/test
  - path=/hello

Now we are going to test our Lambda Function which will insert data into our local DynamoDB table.

```shell
> sam local invoke -e test/events/simple-event.json
Invoking index.handler (nodejs14.x)
Skip pulling image and use local one: public.ecr.aws/sam/emulation-nodejs14.x:rapid-1.46.0-x86_64.

Mounting /Users/alazaroc/Documents/MyProjects/github/aws/cdk/aws-cdk-simple-webservice/v2-dynamodb/functions/dynamodb-example as /var/task:ro,delegated inside runtime container
} "rawPath": "/test"036Z eaf85e61-e9a2-4b49-9953-d247f9794fb8 INFO request: {
2022-04-22T23:54:20.130Z eaf85e61-e9a2-4b49-9953-d247f9794fb8 INFO inserted counter for /test
END RequestId: eaf85e61-e9a2-4b49-9953-d247f9794fb8
REPORT RequestId: eaf85e61-e9a2-4b49-9953-d247f9794fb8 Init Duration: 0.48 ms Duration: 697.40 ms Billed Duration: 698 ms Memory Size: 512 MB Max Memory Used: 512 MB
{"statusCode":200,"headers":{"Content-Type":"text/html"},"body":"You have connected with the Lambda and store the data in the DynamoDB table!"}
```

If we scan the table again, we can review that in the "/test" element will be a new `hits` column and `2` values:

```shell
> aws dynamodb scan --table-name hits --endpoint-url http://localhost:8000
{
    "Count": 2,
    "Items": [
        {
            "path": {
                "S": "/test"
            },
            "hits": {
                "N": "2"
            }
        },
        {
            "path": {
                "S": "/hello"
            }
        }
    ],
    "ScannedCount": 2,
    "ConsumedCapacity": null
}
```

If you run your function more times, the value of `hits` will be updated.

And, of course, you can also test it from **API Gateway**:

```shell
> sam local start-api
Mounting dynamodb-lambda at http://127.0.0.1:3000$default [X-AMAZON-APIGATEWAY-ANY-METHOD]
You can now browse to the above endpoints to invoke your functions. You do not need to restart/reload SAM CLI while working on your functions, changes will be reflected instantly/automatically. You only need to restart SAM CLI if you update your AWS SAM template
2022-04-25 19:53:01  * Running on http://127.0.0.1:3000/ (Press CTRL+C to quit)
```

![testing api-gateway-from-web-v2](testing api-gateway-from-web-v2.png){:class="border"}

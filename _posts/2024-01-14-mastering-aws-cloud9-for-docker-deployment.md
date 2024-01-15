---
layout: post
title: "Using AWS Cloud9 to Test and Deploy Docker Applications: A Step-by-Step Guide"
date: 2024-01-15 01:55 +0100
last_modified_at:
description: The guide provides a step-by-step walkthrough on setting up a Cloud9 environment, integrating with Git, and preparing Docker applications for testing, using two microservices, one in Node.js and the other in Python.
category:
- General
tags:
- cloud9
- docker
- github
published: true
pin: false
featured_post: false
comments: false
sitemap: true
img_path: /assets/img/posts/2024-01-14-mastering-aws-cloud9-for-docker-deployment/
---

## TLDR

- AWS Cloud9 is a cloud-based integrated development environment (IDE) that lets you write, run, and debug your code with just a browser.
- It includes a code editor, debugger, and terminal.
- You already have pre-installed the main tools you will need to download and create your code (including git or docker).

## Introduction to AWS Cloud9

`Have you ever been frustrated by the restrictions of your local development environment?` If so, you're not the only one.

Enter AWS Cloud9, `cloud-based Integrated Development Environment (IDE)` that stands apart with its seamless Docker integration and browser-based accessibility, liberating you from the constraints of traditional setups. Imagine running code, debugging, and integrating Docker applications directly from your browser, without the usual setup headaches. That's the power of Cloud9.

In this article, we delve into how Cloud9 doesn't just offer convenience but brings a new level of power and versatility to your coding experience. Its robust code editor, efficient debugger, and integrated terminal transform coding into a streamlined, hassle-free process. This is especially crucial for projects that demand flexibility, such as serverless applications or containerized apps. With Cloud9, the world of cloud-based development is at your fingertips, allowing you to focus more on creating and less on configuring. Let's explore how Cloud9 can revolutionize your workflow and take your development projects to new heights.

### Advantages and Limitations

To give you a clear picture, here are the foremost strengths and weaknesses.

#### Advantages: 

- `Integrated Development Environment`: Cloud9 offers a comprehensive IDE setup directly in the cloud. This means you can bypass the often tedious process of configuring your local environment, streamlining your development process significantly.
- `Accessibility`: With its cloud-based nature, Cloud9 provides the flexibility to code from anywhere. Whether you're at home, in a café, or halfway across the world, all you need is an internet connection and you're ready to code.
- `AWS Integration`: Cloud9's integration with AWS services is seamless, enhancing your workflow efficiency. This includes direct access to the AWS CLI, easy integration with AWS CodeCommit, and more, making it a breeze to manage AWS-related tasks within the IDE.
- `Collaborative Features`: The platform supports real-time collaboration, allowing multiple developers to work on the same project simultaneously. This feature is invaluable for team projects and paired programming sessions.

#### Limitations:

- `Cost Factor`: While Cloud9 offers an abundant set of features, it's important to note that it's not entirely free. Usage beyond the AWS free tier involves costs, such as running an EC2 instance or a server. For instance, in Ireland, a t2.micro instance costs about $0.0126 per hour.
- `Internet Dependency`: As a cloud-based IDE, Cloud9 requires a stable and continuous internet connection. This could be a drawback in environments with limited or unreliable internet access.
- `Limited Customization`: When compared to some local IDEs, Cloud9 might have limitations in terms of customization options. While it offers a range of functionalities, developers accustomed to highly personalized local environments might find this aspect slightly restrictive.

## Starting with Cloud9

### Initializing Your Cloud9 Environment

Setting up your AWS Cloud9 environment is a straightforward process. Here's how you can do it:

1. `Access AWS Cloud9 Service`: Log in to your AWS account and navigate to the Cloud9 service.
2. `Create a New Environment`: Select the Create a new environment option. Here, you'll need to provide some details:
   - Instance Type: Choose the appropriate EC2 instance type based on your project needs.
   - Timeout Settings: Set the desired idle time after which the instance should shut down to save resources.
   - Network Settings: Configure network settings as per your requirements.
3. `Start the Environment`: Once you've configured these options, AWS will initiate the EC2 instance. To enter the Cloud9 IDE, click the Open button, and a new browser tab will launch with your environment.

![environment](environment.png)

### Managing Your Environment Post-Use

You have to know how to stop the environment if you want to reuse it.

You have different options.

1. `Stopping the Instance in the EC2 console`: If you stop the EC2 instance, the environment will be stopped. However, if you leave the IDE open in the browser, the instance will be initialized again. Be careful.
2. `Closing the IDE in the browser`: Closing the IDE leads to the automatic stopping of the EC2 instance `after the defined timeout`, helping save resources.

> Important Note: If you terminate the EC2 instance via the EC2 console, `the Cloud9 environment remains but becomes inaccessible`, leading to errors when trying to re-access it. Therefore, terminate the instance only if you intend to permanently remove the environment.
error: unable to access
> ![error: unable to access](error_unable_to_access.png)
{: .prompt-info }

### Sharing your environment

Cloud9 also allows for `collaborative work`. You can share your development environment with another IAM user within AWS:
In the IDE, use the Share option to grant access to another user.

These environments will then appear under 'My environments' or 'Shared with me' in the AWS Cloud9 service, facilitating easy collaboration.

## Working with Cloud9

Now that your Cloud9 environment is set up, let's explore some tasks you can perform within this versatile IDE.

### Integration with git repositories

Version control integration is a crucial first step in any development project, and Cloud9 simplifies this with its seamless Git integration.

With Cloud9, you can effortlessly connect with AWS CodeCommit or other Git repositories, streamlining your workflow. Here’s how you can clone a repository:

1. Cloning from `GitHub`:

    I have created [this public repository with 2 microservices](https://github.com/alazaroc/microservices){:target="_blank"}, (one in Node.js and the other in Python). You can use it to follow this tutorial.
    
    Use the command below to clone

    ```shell
    git clone https://github.com/alazaroc/microservices.git
    ```

2. Cloning from AWS `CodeCommit`:

    The integration is straightforward. You don’t have to manage permissions, users, or anything like that. You can directly clone the CodeCommit code:

    The following is an example of how you can clone the CodeCommit repository (you have to use your own repository):

    ```shell
    git clone codecommit::eu-west-1://microservices
    ```

After cloning, your application code is immediately accessible in the IDE, ready for the next steps.

### Prepare the application for Testing

Before diving into testing, there are a couple of essential steps we need to take to ensure our application is ready and accessible.

#### Security Group Configuration

To ensure our application is accessible and secure, we first need to address the `Security Group settings` in our Cloud9 EC2 instance. Initially, it comes with no inbound rules, which means external access is restricted. This is a crucial aspect of AWS's security-first approach, minimizing vulnerabilities.

![sg](sg_inbound_rules.png)

However, to test our application from outside, we'll need to modify these settings by adding specific inbound rules, allowing traffic on necessary ports while keeping our instance secure.

#### Third-party cookies

In your browser settings, ensure that third-party cookies or cross-site tracking is enabled. This step is crucial for certain functionalities within Cloud9 to work seamlessly. Without this setting, you might encounter issues or error messages in the preview phase.

![environment](run_app_block_third_party_cookies.png)

### Testing your application

Now, let's proceed to test two microservices – one built with `Node.js` and the other with `Python`. You can find the sample code for these microservices [here](https://github.com/alazaroc/microservices){:target="_blank"}.


These two applications are prepared to be executed locally directly (after installation of the packages/libraries), but they also contain a Dockerfile, so they are containerized and we can use docker to test them.

> Docker and Cloud9 together create a robust environment for containerized application development. 
> Docker encapsulates the application environment, ensuring consistency across different stages of development. 
> This integration with Cloud9 enhances productivity and `reduces the 'it works on my machine' syndrome`. We'll delve into how Dockerizing our Node.js and Python applications within Cloud9 streamlines the development and deployment processes, making our applications more portable and scalable.
{: .prompt-info }

#### Node.js application

##### Installation

Install the required npm packages:

```shell
npm install
```

##### Running the Application

To start the Node.js microservice, use the command:

```shell
node app.js
```

> Alternatively, you can open the `app.js` file and click on the `Run` button in the Cloud9 IDE.
{: .prompt-info }

The server will start and be available at http://localhost:3000.

##### Accessing the Application

Now that our application is running, the next step is to verify its functionality. AWS Cloud9 offers two primary methods to access your running application:

###### Preview running application

If you try to preview the application running in this port 3000, you will receive a message like this:

![run_app_3000_warning_8080](run_app_3000_warning_8080.png)

AWS says:

> You aren't required run using HTTP over port 8080, 8081, or 8082. `If you don't do this, you can't preview your running application from within the IDE`. For more information, see [Preview a running application](https://docs.aws.amazon.com/cloud9/latest/user-guide/app-preview.html#app-preview-preview-app){:target="_blank"}.

In our case we are using the port 3000, so we can't use the preview functionality.

If you change the application port for 8080, then, you are able to do it:

![run_app_8080_ok](run_app_8080_ok.png)

###### Using the public IP of the instance

If changing the port is not an option or if you prefer external access, you can use the public IP of the EC2 instance. Here’s how to find your instance's public IP and access the application:

![run_app_3000_ok](run_app_3000_ok.png)

##### Dockerization

To build the Docker image of the application, run:

```shell
docker build -t ms-nodejs .
```

To run the application as a Docker container:

```shell
docker run -p 3000:3000 --name ms-nodejs ms-nodejs
```

#### Python application

##### Installation

Install the required Python packages:

```shell
pip install Flask requests
```

#####  Running the Application

To run the microservice, execute the following command:

```shell
python app.py
```

By default, the server starts at http://localhost:5000.

Refer to the Node.js application section to know how to access this URL.

##### Dockerization

To build the Docker image, run:

```shell
docker build -t ms-python .
```

To run the application as a Docker container:

```shell
docker run -p 5000:5000 --name ms-python ms-python
```

### Pushing Docker Images to Amazon ECR

The next step, after building and testing the Docker images of these 2 applications is upload them to `Amazon Elastic Container Registry` (ECR).


#### Create the ECR repositories

```shell
aws ecr create-repository \
    --repository-name ms-nodejs \
    --image-scanning-configuration scanOnPush=true \
    --region eu-west-1
aws ecr create-repository \
    --repository-name ms-python  \
    --image-scanning-configuration scanOnPush=true \
    --region eu-west-1
```

#### Get the local images

```shell
docker images 
```

![docker_images](docker_images.png)

#### Login to ECR

```shell
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin xxxxxxxxxxxx.dkr.ecr.eu-west-1.amazonaws.com
```

> Replace `xxxxxxxxxxxx` by your account_number
{: .prompt-warning }

#### Push images to ECR

```shell
docker tag edSae8fef003 xxxxxxxxxxxx.dkr.ecr.eu-west-1.amazonaws.com/ms-python:latest
docker push xxxxxxxxxxxx.dkr.ecr.eu-west-1.amazonaws.com/ms-python:latest

docker tag fa3757c48c72 xxxxxxxxxxxx.dkr.ecr.eu-west-1.amazonaws.com/ms-nodejs:latest
docker push xxxxxxxxxxxx.dkr.ecr.eu-west-1.amazonaws.com/ms-nodejs:latest
```

> Replace `edSae8fef003` and `fa3757c48c72` by your ms_nodejs and ms_python images ids
{: .prompt-warning }

## Conclusion

We've journeyed through setting up AWS Cloud9, integrating it with Git repositories, testing Docker applications, and finally, pushing Docker images to Amazon ECR. This walkthrough demonstrates the seamless integration and powerful capabilities of AWS Cloud9 in managing Docker-based projects.

Now, as you embark on applying these insights to your development endeavors, remember that each project is a unique mosaic of challenges and learning opportunities. I encourage you to not just use Cloud9, but to experiment with it, mold it into your workflow, and uncover the myriad ways it can amplify your productivity and creativity within the AWS ecosystem.

But don't let the journey end here. Your experiences, insights, and innovations are invaluable – and sharing them creates a rich tapestry of knowledge that benefits the entire development community. `I invite you to use the comments section below` as a platform to share your own stories with Cloud9. How has it transformed your development process? What unique challenges have you overcome using it? Your shared experiences are not just stories; they're the waypoints for others in their journey of cloud-based development.

Together, let's continue to explore, innovate, and elevate the art of development with AWS Cloud9. Dive in, share your story, and let's all grow as a community of forward-thinking developers.

Happy coding!

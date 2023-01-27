---
layout: post
title: DeepRacer - First steps with Machine Learning
date: 2022-12-06 19:33 +0100
last_modified_at:
description: Want to know how AWS DeepRacer works? I tested it at re:Invent 2022 and tell you about my experience with this machine learning service.
category:
- machine learning
tags:
- getting started
- deepracer
- reinforcement learning
- personal
published: true
pin: false
featured_post: false
comments: false
sitemap: true
img_path: /assets/img/posts/2022-12-06-deepracer-first-steps-with-machine-learning/
---
---

## Introduction

Yes! Now that artificial intelligence bots are here to help everyone create content (and much more)... and since I like to do just the opposite, I've written this article from a personal point of view based on my experience with DeepRacer at the last re:Invent 2022.

In short, in DeepRacer you have to train your car to stay on track... and it won't be something you'll achieve quickly.

{% include embed/youtube.html id='q-4Z9A3Nt5I' %}

But eventually, you will be able to complete a lap!

{% include embed/youtube.html id='5Th-D8qE6mY' %}

### Why did I decide to learn how DeepRacer works?

At the AWS Summit Madrid 2022, my first AWS in-person event, I discovered DeepRacer, the service, the car and the track, but I didn't have enough time to try it out or know how it worked, and I told myself I would take the next opportunity to learn more about it.

And this opportunity came early! I had the pleasure of going to re:Invent this very 2022, and I took some time to do a [DeepRacer Level 200 Introductory Workshop](https://catalog.workshops.aws/deepracer-200l/en-US){:target="_blank"}. I created my first model and ran my first race!

Learn, practice and have fun!!

## Concepts

AWS DeepRacer is a fully autonomous 1/18th scale racing car that can be used to learn about **reinforcement learning** (RL) and participate in global racing leagues.

![car](car.png){:class="border"}

> "A fun way to learn machine learning" said AWS in their webpage
{: .prompt-info }

It was announced at AWS re:Invent 2018, as part of a suite of new Amazon Web Services (AWS) **machine learning** (ML) products and services, including Amazon SageMaker, Amazon Lex and Amazon Rekognition.

Machine learning is a field of **artificial intelligence** (AI) that focuses on the **development of algorithms that allow computers to learn and make decisions based on data**, rather than being explicitly programmed. Machine learning algorithms are designed to improve their performance over time as they are exposed to more data.

Exists different types of machine learning:

- **Supervised**: labelled data, where the correct output is provided for each example of the training set (dataset). The model uses this supervision to learn how to make predictions on its own.
- **Unsupervised**: unlabelled data, where the correct output is not provided and the model must find patterns or relationships in the data on its own.
- **Reinforcement**: train an agent (car) to make decisions based on the current state (camera images) to achieve specified goals and maximize a reward in an environment (circuit). The model is trained through trial and error, to learn how to take actions that maximize the reward
  - Reward positive behavior
  - Don't reward negative behavior

> Probably the most important thing in reinforcement learning is to **design the reward function** so that the agent (car) makes better decisions.
{: .prompt-info }

This is the association with the reinforcement learning key terms in AWS DeepRacer:

- Agent: car
- State: camera images
- Environment: circuit
- Action: move at a particular speed and steering angle
- Reward (number, +100) --> CORE of the reinforcement learning
- Episode: journey

## How to train your model?

To get started with AWS DeepRacer, you need an AWS account and access to the DeepRacer service. Once there, you can access the DeepRacer console and begin training your ML model. As always, the AWS console contains a lot of good documentation and direct links to learn much more.

Before starting:

- you have to create your **racer profile** - just complete the forms and choose your avatar.
- then, in the **Garage**, you will create and customize the virtual cars that you will then use to train models.
- finally, you can start to configure a new **model**.

![how-it-works](how-it-works.png){:class="border"}

This image represents the general concept of how the training model works

- Create a model
- Train
- Evaluate
- Model iteration and Upskill

But of course, first of all, you have to learn the basics! The 10-minute course inside the console is highly recommended and very visual! You will learn how reinforcement learning works and you will be ready to start "playing" with the DeepRacer console.

Your **first model** should be the easy one, the one with all the default options. Only with that, you should be able to complete the race. By the way, this is also the first option recommended by AWS.

> If you try to change default options without knowledge it would possibly be worse than leaving the default options.
{: .prompt-warning }

These are the 5 steps to create a new model:

- 1: Specify the model name and environment
- 2: Choose race type and training algorithm
  - race types: Time trial, Object avoidance and Head-to-head racing
- 3: Define action space
- 4: Choose a vehicle
- 5: Customize the reward function
  - The recommended time to complete the training is 1 hour, but in general, more time means that the agent (car) will gain more experience and learn as you have defined in the reward function.
  - The last step will be to define the reward function, but fortunately, there are 4 different options you can use in the console:
    - Time trial - follow the center line (Default)
    - Time trial - stay inside the two borders
    - Time trial - prevent zig-zag
    - Object avoidance and head-to-head - stay on one lane and not crash (default for OA and h2h)

You should test which options are best for your specific circuit, but my recommendation is.... trial and error!

> You have the limitation of training 4 models at the same time:
>
> - create one model with the default options and 3 more with some other changes...
> - then when train ends, analyze the results,
> - finally, use the better model (in graph and in times) to clone it and try again with other 4 different options
{: .prompt-tip }

**How do you know if one model is better than the previous one?**

When a model finishes a training session, it has to be evaluated, and you can do it several times because the lap times are not always the same!

You can also review the training graph. Performance improvement should increase over time:

![graph1](graph1.png){:class="border"}

![graph2](graph2.png){:class="border"}

But sometimes you will see something like this:

![graph3](graph3.png){:class="border"}

It means:

- Over-training: the model does not improve over time
- Or not a good combination of options

In any case, if you see that your graph decreases and the "best model" remains at the beginning, you can stop this training and try a different combination, because this one is not working well!

> Be careful! Costs can rise quickly when you're having fun. I know... but since I get a voucher (credits) it was not a problem.... However, with the free level you have 10 hours and it's enough to test the service.
>
> ![cost](cost.png){:class="border"}
>
> If you want to save money, you should consider train your models in your local environment and then import to the DeepRacer console to evaluate
{: .prompt-warning }

**Some of my tests**

My option 1: The default training model

![evaluate](evaluate-model.png){:class="border"}

My option 2: using "SAC" option (hugh difference)

![evaluate-2](evaluate-model-2.png){:class="border"}

Many more trials and errors...

And the final result, after many hours and different attempts:

![result](deepracer-result.png){:class="border"}

**This is not a big deal, but for me, it was worth it!**

And just for participating, I received this car!

![evaluate](reward-car.png){:class="border"}

## More information and the next steps

- [What is DeepRacer](https://docs.aws.amazon.com/deepracer/latest/developerguide/what-is-deepracer.html){:target="_blank"}.
- [More information about the car device](https://docs.aws.amazon.com/deepracer/latest/developerguide/deepracer-prep-vehicle.html){:target="_blank"}.
- [Wiki with concepts](https://wiki.deepracing.io/Main_Page){:target="_blank"}.
- [AWS DeepRacer Community](https://deepracing.io/){:target="_blank"}.
- [Train models in local](https://github.com/aws-deepracer-community/deepracer-for-cloud){:target="_blank"}.
- [Use logs to do analysis](https://github.com/breadcentric/aws-deepracer-workshops/tree/enhance-log-analysis/log-analysis){:target="_blank"}.

---

{% include comments.md %}

---
layout: post
title: "FinOps on AWS: from theory to practice (with native services, my serverless tool, and a certification as an excuse)"
date: 2026-02-04 18:44 +0100
last_modified_at:
lang: en
lang-exclusive:
  - en
  - es
description: "FinOps applied to AWS: what it is, how it fits into AWS, the services involved, and the serverless tool I built to help me."
category:
  - FinOps
tags:
  - "finops"
  - "well-Architected"
  - "cost-optimization"
  - "certification"
  - "github"
published: true
level: 200
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath: /assets/img/posts/2026-02-04-finops-on-aws/
image:
  path: finops_phases.png
  header_post: false
---
---

I got serious about <kbd>FinOps</kbd> for a simple reason: I wanted to **apply it properly across my AWS accounts and in the way I work**. FinOps has been everywhere (or it was), and I had been meaning to tackle it for a while. This was the right time.

So where should you start?

The [FinOps Foundation](https://www.finops.org/){:target="_blank"} is the best place. They have a lot of material, including courses ([this intro course is free](https://learn.finops.org/introduction-to-finops){:target="_blank"}) and certifications.

> The **FinOps Certified Practitioner (FOCP)** certification was my excuse to focus on what I actually cared about: how FinOps translates to AWS, and how to turn it into something practical.
{: .prompt-info }

![FinOps Certified Practitioner certification](finops_certified.png)

Here’s what I’ll cover in this article:

- what FinOps is (and why it works)
- how it fits into AWS (and what AWS already provides)
- my serverless FinOps tool, available on GitHub
- and finally, what FOCP added for me, and what the certification is about

---

## The real problem: spending without context

In the cloud, spend grows for two reasons: (1) you scale and/or (2) you make mistakes. The first one is great. The second one hurts if you do not catch it early.

The problem is usually not “we spend too much”, but:

- I do not know **what** is driving the spend (drivers)
- I do not know **who owns** that spend (ownership)
- I do not know **what value** I am getting back (impact)
- nobody is reviewing it (operations)

And without ownership, there is no conversation. Just surprises.

---

## What FinOps is

The **FinOps Foundation** defines FinOps as an **operational framework and cultural practice** that maximizes the business value of cloud, enables data-driven decision-making, and creates financial accountability through collaboration between engineering, finance, and business teams.

> For me, FinOps is **bringing structure to cloud spend**: ownership per project, timely data, and a habit of reviewing it.
{: .prompt-info }

It is not just about saving money. It is about knowing:

- what you are paying for
- who is using it
- what value it delivers

and turning that into habits (reviews, alerts, accountability, and decisions).

---

## FinOps under the hood: framework, principles, and domains

If you have time, I recommend checking the [FinOps Foundation](https://www.finops.org){:target="_blank"} website. It has plenty of useful content, plus a free course that covers the fundamentals.

But if you want one image that summarizes what matters most, here it is:

![FinOps Framework (poster)](finops_framework.png)

This is the [FinOps Framework](https://www.finops.org/framework/){:target="_blank"}. It brings together the principles, the core personas (and allies), and the domains.

### The 6 FinOps principles

They are simple, but without them FinOps becomes “just another report”:

1. Teams need to collaborate
2. Business value drives technology decisions
3. Everyone takes ownership of their technology usage
4. FinOps data should be accessible, timely, and accurate
5. FinOps should be enabled centrally (for consistency and scale)
6. Take advantage of the variable cost model of the cloud

If I had to pick the minimum, it would be:

- define **project ownership**
- have **timely data**
- build a **review habit**

You can find them [here](https://www.finops.org/framework/principles/){:target="_blank"}.

### The domains

The framework groups outcomes into 4 domains. These are the results you are aiming for.

- **Understand usage and cost**: collect and normalize usage and spend data, define how it will be allocated (for example by project), and make it accessible to everyone. Capabilities:
	- Data ingestion
	- Allocation
	- Reporting and analytics
	- Anomaly management
- **Quantify business value**: connect spend to outcomes, budgets, forecasts, and KPIs to validate whether it is “worth it”. Capabilities:
	- Planning and estimation
	- Forecasting
	- Budgeting
	- Benchmarking
	- Unit economics
- **Optimize usage and cost**: reduce waste, choose better purchasing options, and design/operate systems efficiently. Capabilities:
	- Cloud architecture
	- Rate optimization
	- Workload optimization
	- Cloud sustainability
	- Licensing and SaaS
- **Operate the FinOps practice**: turn it into a routine that improves over time (people, process, and governance). Capabilities:
	- FinOps practice operations
	- Policy and governance
	- FinOps assessment
	- FinOps tools and services
	- FinOps education and enablement
	- Chargeback and billing
	- Workload onboarding
	- Related disciplines

You can find the domains [here](https://www.finops.org/framework/domains/){:target="_blank"} and the capabilities [here](https://www.finops.org/framework/capabilities/){:target="_blank"}.

### FinOps teams

> FinOps is not a separate team that “does magic”.
{: .prompt-info }

I will not go deep here, but the framework distinguishes between a core team and allies. This image explains it well:

![FinOps personas](finops_personas.png)

If you want more detail, it is [here](https://www.finops.org/framework/personas/){:target="_blank"}.

---

## FinOps on AWS: the quick map (in 1 minute)

Now let’s translate this to AWS, which is what I care about.

The FinOps Foundation describes a three-phase cycle: **Inform, Optimize, and Operate**. These are not one-time steps. They repeat continuously.

![FinOps phases: Inform, Optimize, Operate](finops_phases.png)

### Inform

Goal: understand **what is being spent, by whom, and why**, using consistent data. In other words: visibility and allocation.

On AWS, you can use:

- `Cost Explorer` for analysis
- `tags` and `cost allocation tags` to group spend
- `Cost Categories` to map spend to a team
- `Budgets` and `Anomaly Detection` to get alerts before it is too late
- if you need more detail: CUR (Cost and Usage Report) and analytics (`Athena/QuickSight`)

### Optimize

Goal: reduce cost without losing value. Usually via two levers: **waste less** (usage) and **buy better** (pricing and commitments).

On AWS, you can use:

- `Cost Optimization Hub`, `Trusted Advisor`, and `Compute Optimizer` to get optimization recommendations
- advanced dashboards like **CID (Cloud Intelligence Dashboards)** if you need deeper analysis and richer reporting

> Optimizing is not just “turning things off”. It also includes *rightsizing*, choosing better purchasing options, modernizing, and improving architecture.
{: .prompt-tip }

### Operate

Goal: make sure it is not a one-off effort, but a repeatable routine. In other words: governance, controls, and cadence.

On AWS, you can use:

- `Budgets` + alerts
- tag governance (`Tag Policies`, `Config rules`, controls)
- traceability (`CloudTrail`/`CloudWatch`) if you want to audit changes

---

## My tool to operate FinOps on AWS: aws-finops-toolkit

> AWS already provides most of the building blocks for FinOps. **What I was missing was automation** (and a routine that actually sticks).
{: .prompt-tip }

The project is open source, serverless, and available on GitHub: [https://github.com/alazaroc/aws-finops-toolkit](https://github.com/alazaroc/aws-finops-toolkit){:target="_blank"}

### Why I built it

My context was very common:

- I already had tagging
- I already had budgets
- but I still lacked a **simple, repeatable, low-effort way to understand spend per project**

> I did not want another dashboard. I wanted clear project-level signals delivered automatically, so I would actually act on them.
{: .prompt-info }

So I built **aws-finops-toolkit**: a serverless toolkit to automate visibility, governance, and reporting.

### What it includes

It has 6 main features:

1) Budget creation for spend alerts  
2) **finops-cost-analyzer**: current-month cost analysis, configurable by tag / region / service  
3) **finops-tag-inventory**: resource inventory by region and tags; detects tags that look similar to required ones  
4) **finops-compliance-checker**: required-tag audit (configurable) and a summary of the most common tags  
5) **finops-optimization-insights**: consolidates optimization recommendations into a monthly report  
6) **finops-historical-cost-analyzer**: historical cost analysis and month-over-month comparisons  

For features 2, 3, 4, and 5, an HTML report is sent by email (and stored in S3).

### Architecture

The architecture is simple and built on native AWS services.

It is a serverless design based on `Lambda` + `EventBridge` + `S3` + `SES` + `CloudWatch Logs`.

![aws-finops-toolkit architecture](architecture_diagram.png)

> The project is built with AWS SAM.
{: .prompt-info }

### How my tool maps to the 3 FinOps phases

I put together this table to make it clearer:

| Phase   | Objective             | Component                                | What it delivers                                  | What it does NOT do (by design)        | How to cover it if needed                                 |
| ------- | --------------------- | ----------------------------------------- | ------------------------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| Inform  | Project visibility    | finops-cost-analyzer                      | Top services by project, anomalies, HTML reports   | Advanced BI / full dashboards          | CID (QuickSight) or CUR + Athena                          |
| Inform  | Allocation            | finops-compliance-checker + finops-tag-inventory | Required-tag control + tag inventory/hygiene | Does not “fix tags” automatically      | Internal policy + manual normalization or a dedicated job  |
| Inform  | On-demand history     | finops-historical-cost-analyzer           | On-demand requests                                | Does not generate emails/reports       | Integration into internal portals or pipelines            |
| Optimize| Savings backlog       | finops-optimization-insights              | Consolidated and prioritized recommendations       | Does not apply changes automatically   | Runbooks + tickets (Jira/GitHub Issues)                   |
| Operate | Continuous governance | finops-compliance-checker + EventBridge rules (schedules) | Recurring execution + reports         | Does not block deployments             | AWS Config / SCPs / IaC guardrails                        |

### An MVP in a few hours (if you already have the basics)

If you already have the basics (a tag on your resources, for example `project`, Billing access, and permissions to deploy), you can have it running in a few hours:

1. enable the tag you use (for example `project`) as a `cost allocation tag`
2. deploy aws-finops-toolkit and configure it with your values
3. test it with a manual run to confirm reports arrive (check `docs/operations.md` for (1) SES email verification and (2) how to run the Lambdas manually)
4. start tracking:
   - % of spend allocated to your tag
   - unallocated spend (resources missing the `project` tag) and its main drivers
   - top projects and variation
   - relevant anomalies

Then, in 2 weeks, you turn it into a practice:

- week 1: fix the data (coverage and consistency)
- week 2: build a real backlog (top 5 actions by impact, owner, and due date)

---

## The certification (FinOps Certified Practitioner)

The useful part of the **FinOps Certified Practitioner (FOCP)** certification is that it forces you to structure:

- concepts and vocabulary
- principles, roles, and collaboration
- lifecycle and repeatable practices

The official FOCP description is clear: it covers foundations and key concepts across the three FinOps lifecycle sections (Inform, Optimize, Operate).

[Here is the certification link](https://learn.finops.org/finops-certified-practitioner-certification-exam){:target="_blank"}

The exam is not the important part. What matters is what it pushes you to practice while you prepare. With the references in this article, you have access to everything that matters.

> My recommendation is to do what I did: while you study, review how you are managing cloud costs today, and what you can improve from now on.
{: .prompt-tip }

---

## Conclusion

AWS has powerful tools for FinOps. The problem is not that “a service does not exist” to help you, but that you are missing:

- ownership
- consistent data
- a review and optimization routine
- turning recommendations into work

If I were starting today from scratch in an AWS account, I would:

1. add alerts (Budgets and Anomaly Detection)
2. tag everything with `project`
3. enable `cost allocation tags`
4. define 3 simple metrics and a weekly ritual:
   - % of spend allocated to `project`
   - unallocated spend (without `project`) and its top services
   - top projects by cost and variation (to spot changes)
5. automate reports so it does not depend on “I will check it later”

That is how I put it into practice with my toolkit [aws-finops-toolkit](https://github.com/alazaroc/aws-finops-toolkit){:target="_blank"}. How are you handling it today?

> In my case, if I have to actively look for it, it won’t happen. If it comes to me, I act.
{: .prompt-tip }

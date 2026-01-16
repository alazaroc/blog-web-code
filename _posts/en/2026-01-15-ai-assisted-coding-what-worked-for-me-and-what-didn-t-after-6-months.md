---
layout: post
title: 'AI-assisted coding: what worked for me and what didn’t (after 6 months)'
date: 2026-01-15 07:57 +0100
last_modified_at:
lang: en
lang-exclusive:
- en
- es
description: "Honest lessons learned after six months of AI-assisted coding: what didn’t work, what worked, and the workflow that kept me safe (especially on AWS)."
category:
- General
tags:
- level-300
- ai-assisted-coding
- developer-experience
- engineering-practices
published: true
level:
pin: false
featured_post: false
comments: true
sitemap: true
media_subpath:
image:
  path:
  header_post: false
media_subpath: /assets/img/posts/2026-01-15-ai-assisted-coding-what-worked-for-me-and-what-didn-t-after-6-months/
image:
  path: cover.webp
  header_post: false
---
---

![header](header.webp)

## 1. Introduction

Over the last six months, AI-assisted coding has become a core part of how I build software.

I’ve been using it almost daily on real projects, most of them running on AWS. One of them is my personal project [https://playingpadel.es](https://playingpadel.es){:target="_blank"}, a web app for padel players that keeps evolving. It’s not an experiment or a demo: it’s a real system, with real users.

During this time I’ve tried different tools (Amazon Kiro, Copilot, Antigravity, Cursor, Windsurf). All of them helped me iterate faster. And all of them helped me make mistakes faster when I didn’t put enough control in place.

That’s when I realized something important: **the tool mattered much less than how I was using it**. The same mistakes appeared across all of them whenever I skipped validation or gave them too much freedom.

For an MVP or a PoC, you can use these assistants quickly and with very few rules, and everything seems to work. But when you want to evolve towards something production-ready, the story changes.

You need more discipline: tighter scope, clear constraints, tests, and verification. Otherwise, the same speed that helps you move forward also helps you accumulate bugs.

This article is not about hype or tools. It’s a practical summary of what didn’t work for me, what did, and the workflow that has kept me safe while building and evolving real systems.

## 2. My default working loop

Before getting into what didn’t work, this is the loop I try to follow every day, especially when I’m touching AWS resources or production-like environments:

- Plan a small change
- Implement
- Test
- Review the changes
- Commit
- Repeat

![My-Default-Loop](My-Default-Loop.webp)

## 3. Mapping: from my mistakes to my fixes

Not every mistake I made has a perfect opposite, but most of them map to a small set of habits.

| What didn’t work (section 4)                | What actually helped (section 5)            |
| ------------------------------------------- | ------------------------------------------- |
| Asking for too many things at once          | Keep changes small and scoped (5.1)         |
| Blindly trusting the output                 | Review the plan and the diff first (5.2)    |
| Not asking for validation                   | Ask for verification, not just code (5.5)   |
| Losing control of the code                  | Refactor after correctness (5.7)            |
| Not setting clear constraints               | Define intent and limits clearly (5.3)      |
| Taking shortcuts without thinking long-term | Checklist and continuous validation (5.8)   |
| Not committing frequently                   | Commit small and often (5.6)                |
| Too many tests without strategy             | Treat tests as the contract (5.4)           |
| Using weak models for complex tasks         | Use the right model for the job (5.9)       |
| Constantly switching tools                  | Master one tool and configure it well (5.9) |

---

## 4. What didn’t work for me

This section is intentionally long.

Not because things went particularly wrong, but because most of the problems I ran into kept repeating themselves in different forms.

The important part is that many of them share the same root cause: **once you lose control of the loop (validation, review, and feedback), everything becomes fragile very quickly**.

![No-funciono](No-funciono.webp)

### 4.1. Asking for too many things at once

> The most common mistake I made was asking the AI to implement too many changes in a single request.
{: .prompt-info }

Even when the result looks “correct”, the changes become hard to review and validation slows down. That’s where bugs start to sneak in.

**What I learned**

- Fast generation only helps if the validation loop is also fast.
- If I can’t validate something easily, I shouldn’t generate it in bulk.
- Small changes reduce stress and errors.

---

### 4.2. Blindly trusting generated code

Sometimes the code looks clean and functional. That doesn’t mean it’s correct, safe, or aligned with the system.

In cloud environments, the risk is rarely an obvious bug. It’s usually a behavior change: extra retries, chained timeouts, or logic that under real traffic drives latency or cost.

**What I learned**

- Never assume that “it compiles” means “it’s fine”.
- Review generated code like you would review a teammate’s PR.
- If I can’t explain a piece of code, I don’t want it in production.

---

### 4.3. Not asking the AI to validate its own work

Many assistants make changes and stop. They won’t validate anything unless you explicitly ask.

If you assume the output works, you’ll often end up testing it yourself, watching it fail, and wasting time rebuilding context.

**What I learned**

- Always ask for implementation plus validation.
- “Implement + validate with tests + explain why it works” is a solid default.
- Verification is not an extra phase, it’s part of the work.

---

### 4.4. Losing control of the code

This happens faster than it seems. You keep asking for changes and suddenly you’re no longer sure what you have or how it works.

> The AI can generate working code, but you are still the owner and responsible for maintaining it.
{: .prompt-info }

**What I learned**

- If something isn’t clear, ask for explanations before moving on.
- Prefer simpler code, even if it’s slightly longer.
- Don’t move forward without understanding the current state.

---

### 4.5. Not setting clear constraints

> Without constraints, the assistant will make decisions for you: changing structure, adding dependencies, or “improving” things you didn’t ask for.
{: .prompt-info }

The problem is not that it does this, but that it does it without context.

**What I learned**

- Constraints are not optional.
- Being explicit about what I do NOT want prevents surprises.
- Rules like “minimal diff”, “no new services”, or “don’t touch IAM” save a lot of trouble.

---

### 4.6. Choosing the fast path without thinking long-term

I accepted shortcuts because “it was just a PoC”. Reverting them later was slow and expensive.

What felt like a pragmatic decision turned into hard-to-pay technical debt.

**What I learned**

- Think about trade-offs before accepting shortcuts.
- Document temporary decisions with an exit plan.
- Be especially careful when shortcuts affect security, data, or cost.

---

### 4.7. Not committing frequently

Accumulating working changes without committing is accumulating risk.

Without commits you lose traceability, rollback points, and confidence to keep iterating.

**What I learned**

- Small commits reduce fear.
- Checkpoints make experimentation cheaper.
- Rolling back should always be trivial.

---

### 4.8. Having too many tests without a clear strategy

It’s very easy to generate tests today. It’s also very easy to end up with a slow and redundant test suite.

In one of my projects I ended up with hundreds of E2E tests, many of them duplicated, that almost nobody ran.

**What I learned**

- Tests need a strategy, not just volume.
- Slow tests are deferred cost.
- Not every change needs the same level of testing.

---

### 4.9. Using weaker models for complex tasks

I tried to “save tokens” by using smaller models for tasks that weren’t simple. The result was more time spent fixing and reworking.

**What I learned**

- Use the right model for the complexity of the task.
- Small models for boilerplate.
- Strong models for design, debugging, and risky refactors.

---

### 4.10. Switching tools too often

Jumping between IDEs, chats, and assistants in the middle of a task made me lose context and consistency.

Each tool came with different assumptions and rules.

**What I learned**

- Use one tool per task.
- If I switch tools, explicitly copy the plan and constraints.
- Close the loop before moving on.

---

## 5. What worked for me

If the previous section lists the mistakes, this one is the practical part: the habits that actually worked.

These are not tricks or shortcuts.  
They are repeatable practices that keep the validation loop healthy even when speed increases.

> Most of these practices are boring.  
> That’s exactly why they work.
{: .prompt-info }

![me](me.webp)

### 5.1. Keep control: request a change, validate, continue

> If I had to pick one change that made everything else easier, this would be it.
{: .prompt-tip }

I used to ask for too much in a single request. Now I go one change at a time: request a small change, validate it, move on.

Instead of asking for “refactor the whole module”, I ask for one concrete improvement.

Small changes are easier to review, validation stays fast, and rollbacks stop being scary.

---

### 5.2. Review the plan before implementing

When a change is complex or high-impact, I review **what** will be done before any code is written.

My pattern is simple:

1. First, ask for the plan (options, risks, steps).
2. Once I’m happy, ask to implement only what was agreed.

That avoids surprises and keeps scope under control.

I treat the assistant like a teammate.  
If I can’t review the changes quickly, the problem isn’t the assistant. It’s the size of the change.

Quick rule: if changes are big, split them. I prefer three small changes over one huge one.

---

### 5.3. Define what I want, in as much detail as needed

When the prompt is vague, the output is vague.  
If you’re not clear, the assistant will fill the gaps for you.

I don’t follow a rigid template, but I usually include:

1. what I want
2. what I don’t want (clear limits)
3. how I’ll know it’s done (acceptance criteria)
4. relevant context for this change

It may feel excessive, but it reduces misunderstandings and improves output quality.

> <kbd>Amazon Kiro</kbd> has a spec-driven development mode that forces you to define intent first, validate how it will be built, and only then generate code. It’s uncomfortable at first, but it reduces errors.
{: .prompt-info }

---

### 5.4. Have a clear testing strategy

Tests are not just for correctness.  
They are a control mechanism.

This is the strategy that worked best for me:

- Level 1: Smoke tests
- Level 2: Unit tests
- Level 3: Integration tests
- Level 4: Contract / API tests
- Level 5: E2E tests

Not every project needs all levels, but it does need a conscious decision.

Two important notes:

1. Be careful with E2E tests that trigger real side effects (emails, data writes, AWS events, etc.). If you add E2E tests, add cleanup and isolation.

2. When a generated test fails, the assistant may “fix” it by weakening the test. That can leave the pipeline green while the bug is still there.

A prompt line that helps me:

> Do not change tests just to make them pass. Fix production code first. If you change a test, explain why the original expectation was wrong.
{: .prompt-tip }

---

### 5.5. Ask for verification, not just code

Many times I asked for changes and got code that simply didn’t work.

The good news is that this usually has a simple fix: explicitly ask for verification.

By default, I ask for:

- confirmation that the code works
- a short verification plan
- tests to add or update

> If something fails, my rule is simple: stop, review, and iterate again with smaller scope and more context.
{: .prompt-tip }

For delicate changes, I add a quick risk pass (security, reliability, cost, maintainability). In a minute, obvious issues usually surface.

---

### 5.6. Commit frequently

Small commits give me confidence.

I commit after every working step, before risky changes, and whenever I finish a refactor or test improvement.

If the assistant goes in a weird direction, rolling back is trivial.

Without frequent commits, the speed you gain coding turns into fear of breaking things.

---

### 5.7. Refactor with clean code, after it works

The AI is great at rewriting code, but I want correctness first.

The workflow that works for me:

1. Get correct behavior
2. Automate checks
3. Refactor with clean code principles

> When the output looks messy, I explicitly ask: “apply clean code principles” (small functions, meaningful names, single responsibility) and justify any refactor you propose.
{: .prompt-tip }

---

### 5.8. A lightweight end-of-loop checklist

Before merging (or even before stopping for the day), I go through this checklist:

- Did I review the changes?
- Do tests cover critical paths?
- Did I keep changes scoped?
- Did I commit?
- Did I verify assumptions?

It sounds basic, but it prevents most of tomorrow’s problems.

![AI-Assisted-Coding-Workflow](AI-Assisted-Coding-Workflow.webp)

---

### 5.9. Master one tool and configure it well

Choosing one main tool and configuring it properly completely changed my experience.

Constantly switching tools made me lose context and, more importantly, my rules: style, limits, and how I ask for changes.

Once I left one tool well configured (persistent rules, templates, shortcuts), quality jumped and friction dropped: less re-explaining context, fewer surprises.

I’ll write a dedicated post about <kbd>Amazon Kiro</kbd> and its SPEC mode later, because that’s where this really shines.

> If your IDE supports **persistent rules** (project rules, custom instructions, workspace guidelines), put your defaults there so every request starts from the same baseline.
{: .prompt-tip }

---

### 5.10. Keep the right mental state when working with AI

When things don’t go as expected, it’s easy to get frustrated and respond impulsively. That almost always makes things worse.

I’ve learned that output quality depends heavily on my mental state.  
When I’m tired, frustrated, or in a rush, it shows immediately in my prompts and results.

**What I do now**

- Stop when I notice frustration.
- Rewrite the prompt calmly with more context.
- Treat the assistant as a predictable tool, not something that “understands” me.

It sounds minor, but it breaks many bad loops before they escalate.

---

## 6. Final thoughts

AI-assisted coding changes speed dramatically.

But speed without control only amplifies existing problems.

When you work with real systems, especially in the cloud, small mistakes can quickly turn into reliability, security, or cost issues.

Much of what I share here was refined as I iterated on my personal project [https://playingpadel.es](https://playingpadel.es){:target="_blank"}.

The most important lesson I’ve learned over these months is simple: the tool matters less than the method.

If I had to summarize the whole article in one idea, it would be this: keep the loop healthy. Small changes, constant validation, conscious decisions.

> Developers still build systems.  
> AI changes the speed.
>
> Used well, it doesn’t replace good engineering.  
> It amplifies it.
{: .prompt-info }

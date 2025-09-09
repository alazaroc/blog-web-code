---
layout: post
title: 'From Tasks to Code: Using Kiro to Power Your Development Workflow'
date: 2025-09-07 05:31 +0200
last_modified_at:
lang: en
lang-exclusive:
- en
- es
description:
category:
tags:
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
---
📝 Draft Introduction

When I first explored Amazon Q Developer a few months ago, it felt like the beginning of something new: an AI-powered code companion that could help me write and understand code faster. It was my first glimpse into how AI could support developers beyond just autocomplete — and I wrote about that experience here
.

Since then, I’ve kept looking for tools that go a step further. Not just assistants that suggest snippets, but platforms that can actually take your ideas, structure them, and execute changes directly in your project. That’s exactly what I found with Kiro.

In this article, I’ll show you how Kiro works in practice. We’ll move from a simple list of tasks to a fully powered development workflow, using Specs when we need to plan and break down complex features, and Vibes when we’re ready to implement changes directly in code.


# From Tasks to Code: Using Kiro to Power Your Development Workflow

*How I turn a simple task list into real code changes—without drowning in planning docs.*

## Why Kiro (and how it compares to classic “code companions”)

Earlier this year I wrote about **Amazon Q Developer**, which felt like the first real step toward AI-assisted development. It helped me write and understand code faster. Since then, I’ve been looking for a tool that goes beyond suggestion and into **execution**—a system that can take my tasks, structure them, and actually make the changes in my repo. That’s where **Kiro** comes in.

Kiro combines:
- **Specs** — structure the work you want done (break down, order, and prepare execution).
- **Vibes** — execute changes in your codebase (create, edit, refactor, test).
- **Steering** — persistent project rules Kiro should follow (standards, conventions).
- **Agent Hooks** — automated actions on events (run tests on save, format, small workflows).

The rest of this article shows how I use those pieces together on my web app.

---

## The mental model (TL;DR)

- **Use Specs** when a task is **complex, ambiguous, or multi-step**. You want Kiro to propose a plan you can tweak.
- **Use Vibes** when the task is **simple and obvious** (e.g., add a button, wire a DOM event, tweak a layout).
- **Use Steering** to **codify rules** so Kiro’s proposals and edits align with *your* standards.
- **Use Agent Hooks** to automate repetitive checks (tests, lint/format, docs) so quality keeps up with speed.

---

## First steps: set up once, reap the benefits forever

1) **Connect your repo** and open it in Kiro.  
2) **Create (or extend) Steering files** under `.kiro/steering/`.  
   - Kiro generated `product.md`, `structure.md`, `tech.md` for me.
   - I added:
     - `testing-standards.md` – frameworks, coverage, E2E policy.
     - `code-conventions.md` – naming, folders, selectors.
     - `deployment-workflow.md` – CI/CD, post-deploy smoke, rollback.
3) **Switch to Autopilot** when you want speed (and add **Trusted Commands** to cut confirmation prompts).
4) Optionally add **Agent Hooks** (e.g., manual “Test Suite Orchestrator”: run unit + E2E + improve coverage).

---

## What to put in Steering (the 80/20)

**testing-standards.md**  
- Unit: **Jest** (+ DOM libraries), coverage ≥ **80%** for `src/**/*.js`.  
- E2E: **Playwright** multi-browser, tracing/screenshots on failure.  
- a11y: **@axe-core/playwright**, fail on serious/critical.  
- Perf: **Lighthouse CI** with gradual thresholds.  
- **Test mode**: `?e2e=1` or `localStorage.E2E_TEST="1"` → no real side-effects, entities prefixed with `E2E_`, cleanup after tests.

**code-conventions.md**  
- Folder layout (`/pages`, `/components`, `/lib`, `/styles`, `/tests/e2e`).  
- Naming rules (camelCase, kebab-case files, BEM/utility CSS).  
- **Stable selectors** via `data-testid` for key views and modals:
  - Views: `home-stats`, `home-goals`, `analytics-view`, `profile-view`, `new-match-form`
  - Nav: `nav-home`, `nav-new`, `nav-analytics`, `nav-profile`
  - Modals: `onboarding-modal`, `mode-selector-modal`, `custom-mode-editor-modal`, `defaults-modal`
  - Actions: `save-match`, `delete-match` + `data-name="<matchName>"`

**deployment-workflow.md**  
- PR: unit (coverage gate), optional E2E smoke, artifacts (traces/screenshots).  
- Deploy: atomic release, keep last N artifacts, CDN invalidation.  
- **Post-deploy smoke**: run Playwright against production; if no tests exist, don’t fail the pipeline—log and continue.  
- Rollback in < 5 min by switching the artifact alias.

---

## Running work the Kiro way: my real case

My app (public older version: `padel.playingaws.com`) has:

**Primary windows**  
- **Landing zone** (first-run onboarding; also accessible from **Profile**)  
- **Home** (stats, active goals, achievements, recent achievements, recommendations)  
- **New** (create a match)  
- **Analytics** (analyze a match)  
- **Profile** (account + app configuration)

**Secondary**  
- **Goals**, **Achievements**, **Settings**  
- Modals: `mode-selector-modal`, `custom-mode-editor-modal`, `defaults-modal`, `onboarding-modal`  
- “Level system” note (moving to FAQs/help), FAQs  
- **Suggest feature** & **Report problem** (both pending a new UI)

### Step 1 — Turn a task group into a Spec (Phase 1–2)
I don’t paste a vague idea; I paste **my real tasks**. Example:

> *“I want onboarding to work on first visit and also from Profile. In 4 steps: experience mode, defaults, theme (light/dark), first goals. Add stable selectors and persistence. Then add smoke E2E to validate.”*

Kiro proposes sub-tasks. I edit the list to match my UI, selectors, and data policy from Steering.

### Step 2 — Execute tasks (Phase 3)
In **Phase 3**, I get a **queue of actionable tasks**. I run them one by one or in sequence.  
- For simple ones (add `data-testid`, wire menu links), I can also call **Vibes** directly.  
- For heavier ones (onboarding and Profile modals), I let Specs drive execution.

**Tip:** Use **Autopilot + Trusted Commands** to reduce confirmations. Keep dangerous commands (e.g., `rm -rf`, `git push`) manual.

---

## Example prompts that work

**“Convert task list to a Spec I can execute”**
```
Create a Spec titled “Onboarding & Profile setup” using my steering files.
Break it into tasks I can execute: 
- Landing first-visit onboarding (4 steps: mode, defaults, theme, first goals) with persistence and data-testid selectors
- Open the same onboarding flow from Profile and save
- Add smoke E2E for landing and profile flows (Playwright), with ?e2e=1 test mode and cleanup
- Update Home to reflect new goals after onboarding
Follow testing-standards.md for frameworks and selectors from code-conventions.md.
```

**“Execute the Spec, minimal interruptions”**
```
Switch to Autopilot. Execute all tasks in order.
Use my Trusted Commands. Only stop if a step conflicts with steering or tests fail.
```

---

## Testing strategy (fast to implement, easy to keep)

**Unit (Jest)**  
- Start with utility functions and small DOM interactions.  
- Add coverage gate (80%) and let Kiro propose minimal tests when coverage drops.

**E2E (Playwright)**  
- Begin with **smoke** (3–6 tests) that never change:
  - Landing onboarding completes on first visit and from Profile  
  - Home renders (no console errors), shows stats/goals/achievements/recommendations  
  - Navigation to **New**, **Analytics**, **Profile** works  
  - **New → create match (E2E_*) → appears in Analytics → delete it (UI)**  
- Add **a11y** checks (axe) on landing, home, new, analytics, profile.  
- Later add **visual regression** and **Lighthouse** budgets.

**Data hygiene**  
- In E2E: enable test mode (`?e2e=1` or localStorage flag), prefix entities with `E2E_<timestamp>`, and **cleanup** at the end of each test.  
- If you only have production at first, schedule a daily purge for flagged test entities.

---

## Agent Hooks I actually use

- **Unit + Coverage Maintainer (Manual)**  
  Runs Jest with coverage. If coverage < threshold, propose minimal tests for changed/uncovered functions and re-run only affected tests. Summarize delta and stage test files.

- **E2E Smoke & Cleanup (Manual)**  
  Sets test mode, runs smoke against `BASE_URL`, attaches traces/screenshots, and cleans up any `E2E_*` entities. Proposes stable `data-testid` if selectors are flaky.

*(Both are written in natural language; Kiro creates the `.kiro/hooks/*.md` files for me.)*

---

## Trusted Commands (to keep momentum)

I whitelist exact commands so Specs/Vibes don’t stop every two minutes:
```
npm ci
npm test
npm test -- --coverage
npx playwright test
npx playwright install --with-deps
npm run lh:ci
npx eslint . --fix
npx prettier --write .
git add -A
git commit -m "chore: apply Kiro changes"
```
I keep **`git push` manual** and avoid trusting dangerous commands.

---

## Gotchas & tips

- **Batching execution**: even with Autopilot, I prefer groups of 2–3 tasks. Review, then continue.  
- **Selectors**: add `data-testid` once and your E2E will be stable for months.  
- **Steering is guidance, not a hard block**: enforce gates (coverage, smoke) in CI.  
- **Write once, reuse everywhere**: the same steering + hooks scale to new features.

---

## Conclusion

Kiro shines when you **start with tasks**, give it **rules to follow**, and let it **execute** while your tests keep quality in check. Specs helps you plan just enough; Vibes gets the code done; Steering and Hooks keep the whole thing predictable.

If you’ve been waiting for AI to actually move tickets forward—this workflow is the closest I’ve found to “turn backlog into code” without losing control.

--- 

*PS: In a follow-up I’ll publish my steering files (`testing-standards.md`, `code-conventions.md`, `deployment-workflow.md`) and the two hooks I use most, so you can copy them into your project and adapt in minutes.*

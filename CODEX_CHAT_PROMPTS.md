# Codex Chat Prompts

This file is a quick reference for prompts you can send to Codex in chat.

Important:

- these are chat prompts, not terminal commands
- send them to Codex in chat
- do not paste them into Bash, PowerShell, or CMD

## How To Use This File

Replace the example file names with the real task or file you want Codex to use.

Use these prompts when you want Codex to:

- read a task note from Obsidian
- implement code
- run tests
- explain code
- review code
- update documentation

## How Task Notes Work

In this project, task notes usually live in:

- `docs/obsidian-vault/Tasks/`

A task note is a Markdown file that tells Codex exactly what to build, change, or verify.

The normal workflow is:

1. create or update a task note in `docs/obsidian-vault/Tasks/`
2. write the outcome, acceptance criteria, target files, and validation command
3. send Codex a chat prompt that points to that note
4. Codex reads the note, does the work, runs validation, and updates the note if requested

## Important: These Are Chat Prompts, Not Shell Commands

This is a chat prompt:

```text
Read docs/obsidian-vault/Tasks/002 Local API Health Check.md, implement it, run the listed validation, and update the note with the result.
```

Do not run that in:

- Bash
- Git Bash
- PowerShell
- CMD

Why:

- it is natural-language input for Codex
- placeholders like `<task-file>` are not terminal syntax
- shells may treat characters like `<` specially and fail

## How To Create A Good Task Note

At minimum, a task note should answer:

- What should change?
- Which files are likely involved?
- How do we know the task is done?
- Which validation command should Codex run?

Good sections to include:

- `Outcome`
- `Context`
- `Target Files`
- `Acceptance Criteria`
- `Validation`
- `Notes For The Agent`
- `Result`

## How To Start Codex

There are several ways to activate Codex:

### 1. In This Chat

Send a prompt here directly.

Example:

```text
Read docs/obsidian-vault/Tasks/002 Local API Health Check.md, implement it, run the listed validation, and update the note with the result.
```

Use this when:

- you want to supervise the work live
- you want a simple workflow

### 2. In Codex Inside Your IDE

Open the repo, open Codex in the IDE, and send the same prompt there.

Use this when:

- you want Codex close to the code
- you want one workspace for coding and review

### 3. In The Codex App

Open the project in the Codex app and paste the task prompt there.

Use this when:

- you want an agent-focused workspace
- you want to use automations later

### 4. With A Codex Automation

Create a scheduled automation in the Codex app and give it a prompt.

Use this when:

- you want a recurring daily regression
- you want Codex to run without you manually starting it each time

## Best Default Workflow

If you want the easiest reliable workflow, do this:

1. create a task note in `docs/obsidian-vault/Tasks/`
2. fill in the scope and validation
3. send this prompt to Codex in chat:

```text
Read docs/obsidian-vault/Tasks/<real task file>.md, implement it, run the listed validation, and update the note with the result.
```

## 1. Read A Task Note

```text
Read docs/obsidian-vault/Tasks/001 Vault Bootstrap.md and explain it.
```

What it does:

- reads the task note
- explains the task in plain language

Why use it:

- when you want to confirm the task is clear before implementation

## 2. Implement A Task From Obsidian

```text
Read docs/obsidian-vault/Tasks/002 Local API Health Check.md, implement it, run the listed validation, and update the note with the result.
```

What it does:

- reads the task note
- implements the requested change
- runs the validation command written in the note
- writes the result back into the note

Why use it:

- this is the main workflow for this project
- it keeps the code and the task note aligned

## 3. Implement A Task With Stricter Scope

```text
Read docs/obsidian-vault/Tasks/002 Local API Health Check.md. Follow AGENTS.md. Keep the scope limited to the files listed in the note unless expansion is required. Run the listed validation and update the Result section before finishing.
```

What it does:

- runs the task with stricter boundaries
- uses the task note and `AGENTS.md` together

Why use it:

- when you want tighter control over scope
- when you want to reduce unrelated changes

## 4. Create A New Task Note

```text
Create a new task note in docs/obsidian-vault/Tasks for adding a contact success state.
```

What it does:

- creates a new task note in the Obsidian vault

Why use it:

- when you know the idea but do not want to write the task structure yourself

## 5. Create A Task Note From The Template

```text
Create a task note from the template for a new Playwright test around login failure.
```

What it does:

- uses the vault template
- fills it for a specific task

Why use it:

- when you want consistent task notes
- when you want to keep the vault structured

## 6. Implement A Direct Code Change

```text
Add a success state to the contact form.
```

What it does:

- starts coding directly without needing a task note first

Why use it:

- when the task is small and clear
- when you want speed over process

## 7. Fix A Test

```text
Fix the failing Playwright test in tests/e2e/portfolio-demo.spec.ts.
```

What it does:

- investigates the failing test
- updates the code or test as needed

Why use it:

- when the problem is already known and you want a direct fix

## 8. Run The Full Playwright Suite

```text
Run the Playwright suite.
```

What it does:

- runs the full E2E test suite

Why use it:

- when you want broad validation
- when multiple areas may have changed

## 9. Run One Specific Spec

```text
Run only tests/e2e/portfolio-demo.spec.ts.
```

What it does:

- runs one specific Playwright spec

Why use it:

- when you want faster feedback
- when you changed only one flow

## 10. Explain A File

```text
Explain how public/app.js works.
```

What it does:

- reads the file
- explains structure and behavior

Why use it:

- when you are learning the codebase
- when you want understanding before changing code

## 11. Explain The Test Structure

```text
Explain how the Playwright fixture and page object work together.
```

What it does:

- explains the relationship between fixtures, page objects, and tests

Why use it:

- when you want to understand the automation design

## 12. Review Code Without Changing It

```text
Review this file and do not change anything yet.
```

What it does:

- reviews for bugs, risks, or missing tests
- does not edit files

Why use it:

- when you want analysis before implementation

## 13. Review The Repo

```text
Review the current repo for risks, bugs, and missing tests.
```

What it does:

- scans the project
- reports findings

Why use it:

- when you want a broader technical review

## 14. Update Documentation

```text
Update the Obsidian vault to reflect the new feature.
```

What it does:

- updates notes in the vault
- keeps the documentation aligned with the code

Why use it:

- when a feature already exists and the notes are outdated

## 15. Update README

```text
Update README.md to include the new Local API Health feature.
```

What it does:

- updates the project readme

Why use it:

- when you want project-level documentation to match the current product

## 16. Find The Next Task In The Vault

```text
Read the next planned task from docs/obsidian-vault/Tasks and implement it.
```

What it does:

- looks for the next planned task in the vault
- starts work from there

Why use it:

- when you want the vault to act like a simple backlog

## 17. Summarize Open Tasks

```text
Read the vault, summarize open tasks, and tell me what to do next.
```

What it does:

- reads the task notes
- summarizes what is still open
- suggests the next step

Why use it:

- when you want help prioritizing

## 18. Create Automation Setup

```text
Create an Automation Inbox note in the vault.
```

What it does:

- creates a note you can use as a simple automation queue

Why use it:

- when you want to prepare for scheduled or automatic work later

## 19. Write An Automation Prompt

```text
Write a ready-to-paste Codex automation prompt for this project.
```

What it does:

- creates a prompt for Codex Automations

Why use it:

- when you want scheduled runs without writing the automation prompt yourself

## 20. Add Permanent Agent Rules

```text
Add AGENTS.md rules so you always run the relevant Playwright tests after UI changes.
```

What it does:

- updates repository-level instructions for Codex

Why use it:

- when you want consistent agent behavior across tasks

## 21. Limit The Scope

```text
Do not change code. Only explain.
```

```text
Only update documentation.
```

```text
Only change files under public/.
```

```text
Do not run tests yet.
```

```text
Run tests before you finish.
```

```text
Keep the change small.
```

What they do:

- control how Codex works
- reduce ambiguity

Why use them:

- when you want more predictable output
- when you need to constrain time, risk, or scope

## Best Default Prompt

If you want one prompt to use most of the time, use this:

```text
Read docs/obsidian-vault/Tasks/<real task file>.md, implement it, run the listed validation, and update the note with the result.
```

Example:

```text
Read docs/obsidian-vault/Tasks/002 Local API Health Check.md, implement it, run the listed validation, and update the note with the result.
```

Why this is the best default:

- it uses the vault
- it uses the task note as the source of truth
- it asks for validation
- it keeps the note updated after the work is done

## Final Reminder

Put these prompts in chat to Codex.

Do not run them in the terminal.

Use the terminal only for real shell commands such as:

```bash
npm run test:e2e
```

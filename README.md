# Agentic AI Demo

Agentic AI Demo is a local-first portfolio project that shows how to pair a small Node app with Playwright, Obsidian notes, Docker, Jenkins, and Codex-driven task workflow.

## Purpose

- Demonstrate a clean, local demo app with stable `data-testid` hooks
- Keep task scope and implementation notes in the repo through Obsidian vault files
- Keep the codebase easy to validate locally, in Docker, and in Jenkins
- Stay public-safe so other people can clone it and use their own setup without inheriting yours

## What Is In The Repo

- A zero-framework Node server with lightweight JSON endpoints
- A responsive single-page demo UI
- Playwright E2E coverage for the main flows and one negative validation case
- Obsidian vault notes for task tracking, project mapping, and daily regression automation
- Minimal Docker and Jenkins setup for future CI and merge gating

## Run It Locally

1. Install dependencies:

   ```powershell
   npm.cmd install
   ```

2. Install the Playwright browser:

   ```powershell
   npx.cmd playwright install chromium
   ```

3. Start the app:

   ```powershell
   npm.cmd run start
   ```

4. Open:

   ```text
   http://127.0.0.1:4173
   ```

## Run Tests

- Full suite:

  ```powershell
  npm.cmd run test:e2e
  ```

- Headed browser:

  ```powershell
  npm.cmd run test:e2e:headed
  ```

- Playwright UI mode:

  ```powershell
  npm.cmd run test:e2e:ui
  ```

- Debug mode:

  ```powershell
  npm.cmd run test:e2e:debug
  ```

## Workflow For Codex And Obsidian

- Keep repo rules in `AGENTS.md`
- Keep task scope and acceptance criteria in `docs/obsidian-vault/Tasks/`
- For enterprise or company-scale infrastructure work, start from `docs/obsidian-vault/05 Enterprise Infrastructure Rules.md`
- Use the prompt pattern:

  `Read docs/obsidian-vault/Tasks/<task-file>.md, implement it, run the listed validation, and update the note with the result.`

- Use `docs/obsidian-vault/04 Daily Regression Automation.md` when creating the daily Codex regression automation
- Each user should create their own Codex thread and their own scheduled automation in the app UI

## Merge And CI Rules

- Before a push from a local clone, require:
  - `npm run test:e2e`
  - a local Docker build for this repo
- Before merge, require Jenkins validation on the pushed revision
- In Jenkins, run Docker validation first on merge candidates, then run the matching Playwright validation
- Keep the daily Jenkins schedule as a full regression run
- Use `PLAYWRIGHT_BASE_REF` in Jenkins if your shared branch model differs from `origin/main`

## Standalone Jenkins Job

Create a standalone Jenkins Pipeline job for this repo instead of attaching it to an existing organization folder.

- Job name example: `AI-Agentic-Project`
- Job type: `Pipeline`
- Definition: `Pipeline script from SCM`
- SCM: `Git`
- Repository URL: `https://github.com/asaf-1/AI-Agentic-Project`
- Branch Specifier: `*/main`
- Script Path: `Jenkinsfile`

## Public Safety

- The preview credentials in this repo are fake demo values for the local sample UI and automated tests
- Do not commit real `.env` files, personal Codex config, IDE config, or generated report files
- Keep local-only prompt libraries and personal overrides in ignored files such as `CODEX_CHAT_PROMPTS.md` and `LOCAL_PERSONAL_OVERRIDES.md`
- If you need a personal setup guide, keep it outside the repo

## Local Details That Matter

- `playwright.config.ts`: local Playwright configuration and local web server startup
- `framework/fixtures/baseTest.ts`: shared Playwright fixture layer for the app objects
- `framework/page-objects/PortfolioHomePage.ts`: page object layer outside the spec tree
- `framework/test-data/demoData.ts`: reusable test data for positive and negative flows
- `tests/e2e/portfolio-demo.spec.ts`: main end-to-end scenarios
- `tests/e2e/negative/portfolio-demo-negative.spec.ts`: one validation-focused negative test

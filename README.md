# Agentic AI Demo

Local-only Agentic AI demo platform built to showcase frontend delivery and E2E automation practices.

## What is included

- A responsive one-page platform styled for the Agentic AI project direction
- Functional local workflows for report drafting, compliance scanning, demo booking, contact intake, and preview login
- A zero-framework Node server with lightweight JSON endpoints
- Playwright E2E coverage with positive flows and one negative validation case

## Run locally

1. Install dependencies:

   ```powershell
   npm.cmd install
   ```

2. Install the Playwright browser:

   ```powershell
   npx.cmd playwright install chromium
   ```

3. Start the demo:

   ```powershell
   npm.cmd run start
   ```

4. Open `http://127.0.0.1:4173`

## Run the E2E suite

```powershell
npm.cmd run test:e2e
```

## Phase 1 Workflow

- Open your local clone of the folder that contains this `README.md`, `package.json`, and `AGENTS.md` as the Codex app thread root.
- Keep always-on repository rules in `AGENTS.md`.
- Keep task scope, acceptance criteria, and validation in `docs/obsidian-vault/Tasks/`.
- Use this default Codex prompt for task work:

  `Read docs/obsidian-vault/Tasks/<task-file>.md, implement it, run the listed validation, and update the note with the result.`

- Use `docs/obsidian-vault/04 Daily Regression Automation.md` when creating the daily regression automation in the Codex app.
- No repo-level `.codex/` directory is required for this setup. In this workflow, stable repository rules live in `AGENTS.md` and each user creates their own Codex thread and scheduled automation in the app UI.

## Minimal Git And CI Path

- Keep local day-to-day work on the host machine first. Docker and Jenkins are optional follow-on layers.
- When Git is initialized, use short-lived feature branches or worktrees, open PRs into `main`, and add branch protection to `main` after the remote exists.
- `Dockerfile` is a minimal container baseline for later packaging.
- `Jenkinsfile` is a minimal validation pipeline for a standalone Jenkins Pipeline job. It installs dependencies, installs Playwright Chromium, runs a daily full regression at `08:00`, and uses Playwright `--only-changed=<base ref>` for faster change-based validation when only Playwright spec files changed.
- Jenkins falls back to `npm run test:e2e` whenever app, framework, or config files changed, or when Git diff information is unavailable.
- The default changed-test base ref is `origin/main`. If your Jenkins job or shared branch model is different, set `PLAYWRIGHT_BASE_REF` in the Jenkins job environment.
- For a public GitHub repo, Jenkins usually does not need to be reconnected to GitHub if the standalone job can already clone public repositories over HTTPS. If the first clone fails, add Git credentials in Jenkins for that job or credential store.

## Standalone Jenkins Job

Create this project as its own Jenkins job, not as a sub-project inside an existing organization folder.

- Job name example: `<your-jenkins-job-name>` such as `AI-Agentic-Project`
- Job type: `Pipeline`
- Definition: `Pipeline script from SCM`
- SCM: `Git`
- Repository URL: `https://github.com/asaf-1/AI-Agentic-Project`
- Branch Specifier: `*/<your-default-branch>` such as `*/main`
- Script Path: `Jenkinsfile`
- Phase 1 trigger model: manual runs plus the daily schedule already defined in `Jenkinsfile`

## Public Repo Safety

- This project is intended to be safe to publish as a portfolio demo.
- The preview credentials in this repo are fake demo values for a local-only flow, not real account secrets.
- Do not commit real `.env` files, personal Codex config, IDE config, or generated daily regression reports.
- Each user should configure their own local Codex thread, Jenkins job, and credentials outside the repo.

## Automation structure

- `playwright.config.ts`: test runner configuration and local web server startup
- `framework/fixtures/baseTest.ts`: custom Playwright fixture layer for shared app objects
- `framework/page-objects/PortfolioHomePage.ts`: page object layer outside the spec tree
- `framework/test-data/demoData.ts`: reusable test data for positive and negative flows
- `tests/e2e/portfolio-demo.spec.ts`: executable end-to-end scenarios only

## Obsidian vault

Project notes live in `docs/obsidian-vault`.

Open that folder as an Obsidian vault to get:

- a project dashboard
- a project map
- a test map
- an agent and Obsidian workflow note
- a reusable task template

## Local preview credentials

- Email: `analyst@agenticai.local`
- Password: `Demo123!`

These are fake local demo credentials used only by the sample UI and automated tests.

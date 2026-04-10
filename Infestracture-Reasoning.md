# Infrastructure Reasoning

## Purpose of This Project

This project is a local Agentic AI demo platform. Its purpose is not just to show a UI, but to demonstrate a realistic frontend workflow together with reliable end-to-end automation.

The website simulates a real estate operations product with AI-assisted workflows. It gives the user a realistic one-page product experience and also exposes interactive actions that are useful for automated testing.

In short, the site does four things:

- Presents the product story and visual direction in a clean landing page.
- Simulates business workflows such as report drafting, compliance scanning, contact intake, demo booking, and login preview.
- Uses local API endpoints so the app feels dynamic without depending on external systems.
- Provides stable UI hooks and predictable behavior for Playwright automation.

## What the Website Does

The website is a local-only real estate management demo. It acts like a lightweight product showcase with working interactions.

Main user-facing flows:

- `Refresh portfolio KPI`: updates metrics from a local API response.
- `Generate report draft`: creates a simulated portfolio report for a selected asset and reporting period.
- `Run compliance scan`: returns a local compliance result with pass and monitor states.
- `Book a Demo`: opens a modal form and stores a booking locally.
- `Request local platform access`: validates contact details and shows success or validation errors.
- `Preview login`: simulates a controlled login flow for test automation.
- `Activity feed`: records major actions so tests can verify meaningful user outcomes, not only button clicks.

Why this matters:

- It proves the UI is not static.
- It gives E2E tests real business outcomes to assert.
- It stays fully local, so the demo is stable and easy to run in interviews, demos, and QA discussions.

## Why This Structure Was Chosen

The structure separates application code, automation code, and generated artifacts. That keeps responsibilities clear and makes the project easier to explain, extend, and maintain.

The main design decisions were:

- Keep the app simple: no unnecessary framework for a small local demo.
- Keep tests readable: test files describe behavior, not locator plumbing.
- Keep reusable automation logic outside the spec files.
- Separate positive and negative scenarios so the intent of each suite is obvious.
- Keep generated outputs out of the actual source structure.

This structure is useful because:

- Someone reading the repo can quickly tell what is product code vs test code.
- New tests can be added without duplicating selectors and helper logic.
- Negative scenarios can grow without making the main happy-path suite noisy.
- The project remains small, but still looks like a real QA automation project rather than a single demo script.

## File-By-File Meaning

This section is the shortest way to explain what each important file is for.

| File | What it does | Why it exists |
| --- | --- | --- |
| `README.md` | Gives setup, run, and test instructions. | Quick onboarding for anyone opening the repo. |
| `package.json` | Declares project metadata, scripts, and dependencies. | Standard Node entry file for running the app and tests. |
| `package-lock.json` | Locks exact dependency versions. | Ensures consistent installs across machines. |
| `.gitignore` | Tells Git which files and folders should not be committed. | Keeps generated and local-only files out of version control. |
| `playwright.config.ts` | Configures Playwright runner behavior. | Central control for test execution, browser setup, and local server startup. |
| `server.js` | Serves the website and local API endpoints. | Lightweight backend simulation for a dynamic local demo. |
| `public/index.html` | Defines the full page structure and interactive sections. | Main UI skeleton of the website. |
| `public/styles.css` | Defines layout, branding, responsive behavior, and component styling. | Visual presentation layer of the demo. |
| `public/app.js` | Handles browser-side behavior such as forms, API calls, modals, toasts, and activity feed updates. | Turns the static page into a working interactive app. |
| `framework/fixtures/baseTest.ts` | Extends Playwright with shared fixtures. | Gives all tests a clean reusable setup. |
| `framework/page-objects/PortfolioHomePage.ts` | Encapsulates locators and user actions for the main page. | Keeps specs readable and maintainable through the page object model. |
| `framework/test-data/demoData.ts` | Stores reusable input data for booking, login, and negative validation. | Separates test data from test flow logic. |
| `tests/e2e/portfolio-demo.spec.ts` | Contains the main happy-path user journeys. | Verifies the primary business flows succeed end to end. |
| `tests/e2e/negative/portfolio-demo-negative.spec.ts` | Contains the negative validation case. | Verifies failure handling and form validation behavior. |
| `.vscode/launch.json` | Defines the VS Code launcher for Playwright Inspector. | Makes local debugging easier from the editor. |
| `Infestracture-Reasoning.md` | Documents the structure, reasoning, folder purpose, and test intent. | Interview and handoff explanation document. |

## Quick File Explanation

This section says the same thing in a simple spoken format: file name, what it does, and why it exists.

- `README.md`: explains how to install, run, and test the project. Why: it helps someone understand the repo quickly without reading the code first.
- `package.json`: defines the scripts and dependencies. Why: it is the standard Node entry file used to run the app and the automation.
- `package-lock.json`: locks exact dependency versions. Why: it keeps installations consistent across different machines.
- `.gitignore`: lists files and folders that should not be committed. Why: it keeps generated files and local machine artifacts out of Git.
- `playwright.config.ts`: configures Playwright behavior such as the test directory, web server, viewport, reports, and artifacts. Why: it gives one central place to control how the test suite runs.
- `server.js`: starts the local server and exposes fake API endpoints. Why: it gives the UI realistic dynamic behavior without needing a real backend.
- `public/index.html`: defines the structure of the page and all the interactive sections. Why: it is the base UI skeleton of the website.
- `public/styles.css`: defines layout, spacing, colors, typography, and responsive behavior. Why: it controls how the site looks and fits different screen sizes.
- `public/app.js`: contains the browser-side logic for forms, API calls, toasts, modals, validation, and activity updates. Why: it turns the static markup into a working app.
- `framework/fixtures/baseTest.ts`: adds shared Playwright fixtures like `homePage`. Why: it reduces repeated setup code inside the tests.
- `framework/page-objects/PortfolioHomePage.ts`: stores locators and reusable page actions. Why: it keeps the spec files focused on user behavior instead of selector details.
- `framework/test-data/demoData.ts`: stores reusable positive and negative input data. Why: it separates test data from test logic and keeps the specs cleaner.
- `tests/e2e/portfolio-demo.spec.ts`: contains the main successful user journeys. Why: it verifies the most important business flows end to end.
- `tests/e2e/negative/portfolio-demo-negative.spec.ts`: contains the invalid-input scenario. Why: it verifies that the system fails correctly and shows proper validation.
- `.vscode/launch.json`: defines the VS Code launcher for Playwright Inspector. Why: it makes local debugging easier without building commands manually.
- `Infestracture-Reasoning.md`: explains the structure of the repo and the reasoning behind it. Why: it helps during interviews, demos, and handoff discussions.

## Which Files Are Source Code vs Generated

### Source files I wrote or organized

- `README.md`
- `package.json`
- `playwright.config.ts`
- `server.js`
- `public/index.html`
- `public/styles.css`
- `public/app.js`
- `framework/fixtures/baseTest.ts`
- `framework/page-objects/PortfolioHomePage.ts`
- `framework/test-data/demoData.ts`
- `tests/e2e/portfolio-demo.spec.ts`
- `tests/e2e/negative/portfolio-demo-negative.spec.ts`
- `.vscode/launch.json`
- `Infestracture-Reasoning.md`

### Files or folders that are generated or installed

- `node_modules/`
- `.artifacts/`
- `test-results/`
- `package-lock.json`

Why this distinction matters:

- Source files explain the design.
- Generated files explain test output and environment state.
- Installed files are dependencies, not business logic.

## Folder Meaning

### `public/`

This is the frontend of the demo website.

- `index.html`: defines the page structure and the main test surface. Why: it contains the sections, forms, buttons, and markup the user and tests interact with.
- `styles.css`: defines visual design, layout, responsive behavior, and modal/toast layering. Why: it controls how the interface looks and behaves across screen sizes.
- `app.js`: handles client-side interactions, API calls, modal logic, validation handling, toast behavior, and activity updates. Why: it makes the page interactive and gives the tests real behavior to validate.

Why it exists:

- It keeps the UI layer isolated from server logic and test logic.
- It makes the app easy to run as a static-like frontend backed by a local server.

### `server.js`

This is the local Node server and fake backend.

What it does:

- Serves the files in `public/`
- Exposes local API endpoints
- Stores temporary in-memory state for bookings, contacts, reports, scans, and metric refreshes

Why it exists:

- It gives the site realistic behavior without a database or external API.
- It lets the tests validate dynamic flows, not just hardcoded text.

### `tests/`

This contains executable test specifications.

Why it exists:

- Test files should live separately from framework helpers.
- It keeps the test entry points easy to find.

### `tests/e2e/`

This is the main end-to-end test suite folder.

Why it exists:

- It clearly communicates that these are browser-level, user-journey tests.
- It leaves room for future categories such as smoke, regression, or API tests if needed later.

### `tests/e2e/portfolio-demo.spec.ts`

This is the main positive-flow spec.

Why it exists:

- It contains the core business scenarios a normal user would succeed in.
- It is the best file to demo during interviews because it shows the primary happy paths.

### `tests/e2e/negative/`

This folder holds negative or validation-focused test cases.

Why it was created:

- Negative tests serve a different purpose than happy-path tests.
- Keeping them separate makes the main suite cleaner and easier to read.
- It also scales better if more validation, authorization, or failure cases are added later.

### `tests/e2e/negative/portfolio-demo-negative.spec.ts`

This file contains the invalid contact email scenario.

Why it was moved:

- The test checks validation and rejection behavior, not successful user completion.
- Grouping it under `negative` makes its intent explicit and helps interviewers see that both success and failure paths were considered.

### `framework/`

This folder contains reusable test support code.

Why it exists:

- Specs should express business behavior.
- Framework code should hide repetitive setup and page interaction details.

### `framework/fixtures/`

This holds custom Playwright fixture setup.

- `baseTest.ts`: extends Playwright's `test` object and injects shared helpers like `homePage`. Why: it gives every test the same reusable setup and avoids repeating initialization logic.

Why it exists:

- It gives all tests a consistent starting point.
- It avoids repeating object creation in every file.

### `framework/page-objects/`

This holds page object models.

- `PortfolioHomePage.ts`: centralizes locators and reusable page actions for the main screen. Why: it keeps selectors and actions in one place so the specs stay readable and maintainable.

Why it exists:

- It reduces locator duplication.
- It keeps specs readable and focused on user intent.
- If the UI changes, updates can often be made in one place.

### `framework/test-data/`

This holds reusable input data.

- `demoData.ts`: stores booking data, login credentials, and invalid contact data. Why: it separates input values from the test logic and makes future data changes easier.

Why it exists:

- Test inputs should be separated from test flow where practical.
- It improves readability and makes data updates easier.

### `playwright.config.ts`

This is the central Playwright runner configuration.

What it controls:

- Test directory
- Reporter output
- Local web server startup
- Base URL
- Browser viewport
- Video, screenshot, and trace behavior

Why it exists:

- It gives one source of truth for how the test suite runs.

### `.vscode/`

This contains editor-specific helper configuration.

- `launch.json`: defines the debug launcher used to open Playwright Inspector for the main spec. Why: it improves the local debugging experience and avoids manual debug commands.

Why it exists:

- It improves the local developer experience.
- It lets the test be demonstrated interactively in VS Code.

### `.artifacts/` and `test-results/`

These are generated outputs from Playwright runs.

What they contain:

- Reports
- Traces
- Error snapshots
- Test result files

Why they are separate:

- Generated output should not be mixed with source code.
- They are useful for debugging but not part of the product implementation.

### `node_modules/`

This contains installed dependencies.

Why it exists:

- Standard Node project dependency folder.
- Not authored business logic.

## What Each Test Does

### Positive suite: `tests/e2e/portfolio-demo.spec.ts`

#### `loads the local platform and refreshes portfolio metrics`

What it verifies:

- The page loads correctly.
- The main navigation is visible.
- The workspace area is visible.
- Clicking refresh changes KPI values.
- A toast appears.
- The activity feed records the action.

Why this test matters:

- It proves the app loads and that dynamic metric updates work end to end.

#### `books a local demo and records the activity`

What it verifies:

- The booking modal opens.
- The form can be completed with valid data.
- Submission succeeds.
- A success toast appears.
- The activity feed logs the booking action.

Why this test matters:

- It validates a complete business action, not only a UI interaction.

#### `creates a report draft and runs a compliance scan`

What it verifies:

- A portfolio report can be generated from selected inputs.
- The returned report is shown in the result panel.
- A compliance scan can be executed.
- Monitor/pass states appear in the compliance results.
- The activity feed records the scan.

Why this test matters:

- It covers the most product-like workflows on the page.
- It proves the site supports meaningful data-driven behavior.

#### `authenticates with the preview credentials`

What it verifies:

- The login modal opens.
- Valid preview credentials are accepted.
- A success toast appears.
- The login result updates.

Why this test matters:

- It covers a simple authentication-style path that is common in demos and automation examples.

### Negative suite: `tests/e2e/negative/portfolio-demo-negative.spec.ts`

#### `shows validation feedback for an invalid contact email`

What it verifies:

- Invalid contact input is rejected.
- The correct validation error is shown.
- The generic failure feedback appears.
- The activity feed does not log a successful request.

Why this test matters:

- Good automation should verify failures as well as successes.
- It shows that validation is handled intentionally, not accidentally.

## Why Use Fixtures, Page Objects, and Test Data

### Why fixtures

Fixtures provide a clean shared setup for all tests. In this project, `baseTest.ts` creates a `homePage` object so every spec can start from the same abstraction.

Benefit:

- Less repeated setup code
- Cleaner test files
- Easier future expansion

### Why page objects

The page object model keeps locators and actions in one place.

Benefit:

- Specs read like user behavior
- UI changes are easier to update
- Test code is more maintainable

### Fixture vs Page Object

- `PortfolioHomePage` defines how to interact with the page.
- `baseTest.ts` fixture gives that page object to each test automatically.
- The page object is the model.
- The fixture is the shared setup and injection layer.

### Why test data files

Reusable data makes tests easier to scan and avoids mixing scenario logic with raw input values.

Benefit:

- Cleaner specs
- Easy data changes
- Better reuse across multiple test files

## Why Separate Positive and Negative Tests

This was an intentional structure decision.

Positive tests answer:

- Can the normal business flow succeed?

Negative tests answer:

- Does the system fail correctly and give the user the right feedback?

Keeping them separate improves:

- Readability
- Test maintenance
- Interview explanation
- Future scalability

## How to Explain This in an Interview

A simple explanation:

> I structured the project so the UI, local backend, and automation layers are clearly separated. The `public` folder contains the website, `server.js` provides lightweight local APIs, `framework` contains reusable Playwright support like fixtures and page objects, and `tests/e2e` contains the actual scenarios. I also separated negative tests into their own folder so the main spec stays focused on happy paths while still showing that I covered validation and failure behavior. The site itself is a local real-estate operations demo with workflows like report generation, compliance scanning, booking, contact requests, and preview login, so the automation demonstrates real user outcomes instead of just clicking around the page.

## Summary

This project is structured to show three things clearly:

- Product thinking: the website simulates useful business workflows.
- Test design discipline: positive and negative paths are both covered.
- Automation maintainability: fixtures, page objects, and test data are separated from executable specs.

That is why these folders exist and why the current structure is stronger than putting everything into one file.

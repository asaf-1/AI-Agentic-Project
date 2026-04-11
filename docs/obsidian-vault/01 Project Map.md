# Project Map

## Stack

- Runtime: Node.js 20+
- App style: static frontend served by a custom Node HTTP server
- Testing: Playwright E2E with page objects and shared fixtures

## Important Paths

- `server.js`: static file server and local JSON API
- `public/index.html`: page shell
- `public/app.js`: frontend behavior
- `public/styles.css`: page styling
- `playwright.config.ts`: Playwright config and local web server bootstrap
- `framework/fixtures/baseTest.ts`: shared Playwright fixture setup
- `framework/page-objects/PortfolioHomePage.ts`: page object layer
- `framework/test-data/demoData.ts`: reusable test data
- `tests/e2e/portfolio-demo.spec.ts`: main happy-path coverage
- `tests/e2e/negative/portfolio-demo-negative.spec.ts`: negative validation coverage

## Backend Routes In `server.js`

- `GET /api/health`
- `GET /api/portfolio-summary`
- `POST /api/report-drafts`
- `POST /api/compliance-scan`
- `POST /api/demo-bookings`
- `POST /api/contact-requests`
- `POST /api/login-preview`

## Current Product Flows

- Refresh portfolio metrics
- Book a local demo
- Generate a portfolio report
- Run a compliance scan
- Verify local API health
- Submit a contact request
- Log in with preview credentials

## Current Constraints

- Data is in-memory only
- The demo is local-only
- The test suite depends on the local server started by Playwright

## Governance

- [[05 Enterprise Infrastructure Rules]] is the reusable baseline for enterprise-style infrastructure, QA, and automation work
- Local-only personal overrides should stay in ignored files outside GitHub

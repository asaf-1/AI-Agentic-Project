# Test Map

## Main Commands

- Full suite: `npm run test:e2e`
- Headed run: `npm run test:e2e:headed`
- UI mode: `npm run test:e2e:ui`
- Single spec: `npx playwright test tests/e2e/portfolio-demo.spec.ts`
- Negative spec: `npx playwright test tests/e2e/negative/portfolio-demo-negative.spec.ts`

## What Is Covered

### `tests/e2e/portfolio-demo.spec.ts`

- page load and metric refresh
- demo booking flow
- report generation flow
- compliance scan flow
- local API health flow
- preview login flow

### `tests/e2e/negative/portfolio-demo-negative.spec.ts`

- invalid contact email validation

## Execution Notes

- Base URL: `http://127.0.0.1:4173`
- The Playwright config starts `node server.js 4173`
- Test artifacts are written to `.artifacts/test-results`
- HTML reports are written to `.artifacts/playwright-report`
- The default Jenkins base ref for changed-test detection is `origin/main`, but a standalone job can override that with `PLAYWRIGHT_BASE_REF`

## When To Run What

- UI or API behavior changed: run `npm run test:e2e`
- Only Playwright spec files changed: Jenkins can use `npx playwright test --only-changed=<base ref>` and fall back to the full suite if shared code changed
- One specific scenario changed: run the matching spec first
- Investigating flaky behavior: use `npm run test:e2e:headed` or `npm run test:e2e:ui`

## CI Split

- Daily Codex automation: run the full suite and write a report into `docs/obsidian-vault/Reports/`
- Daily Jenkins pipeline: run the full suite on a schedule for CI visibility
- Normal Jenkins validation: build the repo in Docker first, then use Playwright `--only-changed=<base ref>` for test-only diffs, otherwise run the full suite
- Local pre-push rule: block push unless `npm run test:e2e` and a local Docker build both pass
- Pre-merge Jenkins rule: for code pushed to GitHub and intended for merge, Jenkins should validate the pushed revision in Docker and then run the matching Playwright validation before merge
- Generated daily report files are local automation output and are not meant to be committed to Git

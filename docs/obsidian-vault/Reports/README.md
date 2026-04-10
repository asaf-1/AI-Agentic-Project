# Daily Regression Reports

This folder stores the Markdown reports written by the daily Codex regression automation.

Only this `README.md` is intended to stay tracked in Git. Generated daily report files are local automation output and are ignored by default so each user can keep their own run history outside the shared repo.

## Expected Naming

Create one file per run, for example:

- `2026-04-10 Daily Regression Report.md`
- `2026-04-11 Daily Regression Report.md`

## What Each Report Should Include

- date and time of the run
- markdown files that were read for context
- commands that were executed
- test summary
- failures and likely causes
- artifact locations
- next steps

## Default Validation Command

- `npm run test:e2e`

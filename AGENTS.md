# Repository Workflow

## Obsidian Task Flow

- The project vault lives in `docs/obsidian-vault`.
- When the user points to a task note under `docs/obsidian-vault/Tasks`, treat that note as the source of truth for scope, acceptance criteria, and validation.
- Prefer updating the task note `Result` section before finishing substantial implementation work.

## Validation Rules

- If changes touch `public/`, `server.js`, `framework/`, or `tests/`, run relevant Playwright coverage before finishing.
- Prefer the smallest relevant command first, then expand if needed.
- Report the exact validation command you ran and whether it passed.

## Editing Rules

- Keep the demo local-only.
- Preserve existing `data-testid` hooks unless the task explicitly changes them.
- Keep the Obsidian vault content aligned with the current codebase when adding or changing product flows.
- Keep the project Obsidian vault project-specific only. Personal Codex usage notes and personal workflow guides should stay outside the vault.

## Automation Rules

- Automation runs must stay inside this repository only.
- Do not inspect, modify, validate, or report on any other repository or folder unless the user explicitly asks for it.
- Treat the scheduled daily automation as the daily regression run for this repository.
- For the daily regression run, default to reading the key Markdown context files, running the full project test suite, and writing a report.
- For the daily regression run, do not modify product code unless a task note explicitly requests a code change.
- The default full-suite validation command for this repo is `npm run test:e2e`.
- Write daily automation reports under `docs/obsidian-vault/Reports/`.

# Agent and Obsidian Workflow

## The Real Integration Model

Obsidian and the agent work together through plain files.

- Obsidian is the note-taking and navigation layer.
- The agent reads and writes Markdown files in this vault because the vault lives inside the repo.
- There is no special Obsidian API bridge in this setup. The shared layer is the filesystem.

## The Clean Split Of Responsibility

- `AGENTS.md`: stable repository rules the agent should follow every time
- Obsidian vault: task notes, decisions, architecture notes, backlog, and session memory
- The agent: code changes, test runs, summaries, and technical updates

## Recommended Process

1. Create a task note from [[Templates/Task Note]].
2. Write the goal, acceptance criteria, target files, and validation command.
3. Ask the agent to read that note and execute the task.
4. The agent updates code, runs the requested checks, and can update the note with results.
5. You review the task in Obsidian, follow backlinks, and keep decision history.

## CI And Daily Regression

- Obsidian task notes stay the source of truth for scoped agent work.
- Jenkins can use Playwright `--only-changed=<base ref>` for faster feedback when a diff only changes Playwright spec files.
- The daily Codex automation and the daily Jenkins schedule should still run the full `npm run test:e2e` regression.
- Each user should connect their own Codex thread, daily automation, and standalone Jenkins job. Those machine-specific settings should live outside the repo.

## Pre-Merge Rule

- Before push from a local clone, the local pre-push gate should pass: `npm run test:e2e` and a Docker build for the current repo.
- For code pushed to GitHub and intended for merge, Jenkins is the validation gate before merge.
- Jenkins should validate the pushed revision before merge.
- Merge only after all three checks are green: local Playwright, local Docker build, and Jenkins validation.
- Obsidian task notes should record the local validation command, the Docker result, the Jenkins result, and the final merge decision.

## Why This Vault Lives Inside The Repo

- The agent can access it without extra setup
- Notes can be versioned with the project
- File paths stay stable and easy to reference in prompts
- The shared notes stay reusable because personal local paths and Jenkins setup details should not be committed here

## Best Prompt Pattern

Use a direct file-based prompt such as:

`Read docs/obsidian-vault/Tasks/<task-file>.md, implement it, run the listed validation, and update the note with the result.`

## Limits To Be Aware Of

- Obsidian does not automatically trigger the agent
- The agent does not automatically read every note unless you tell it to
- If you want the agent to follow rules on every task, put those rules in `AGENTS.md`, not only in Obsidian

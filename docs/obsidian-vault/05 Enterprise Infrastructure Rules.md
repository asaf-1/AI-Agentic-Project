# Enterprise Infrastructure Rules

Use this note as the reusable operating contract for infrastructure, platform, QA, and automation work.

## Core Principles

- Ask before changing versions, ports, deployment topology, credentials, or branch strategy
- Keep personal paths, secrets, tokens, screenshots with sensitive data, and private machine details out of GitHub
- Preserve existing test behavior and `data-testid` hooks unless the task explicitly changes them
- Keep changes small, reversible, and well documented
- Prefer reusable configuration over one-off fixes
- Validate in layers: local first, Docker second, Jenkins third, then merge only after approval

## Enterprise-Level Standards

- Think like a senior QA lead, architecture lead, and organizational leader
- Treat scope, risk, rollback, and auditability as first-class concerns
- Separate shared project rules from local-only overrides
- Write decisions in Obsidian so the vault stays the project memory
- If a change affects security, release flow, infrastructure, or user data, pause and ask before committing

## Operating Sequence

1. Define the goal and the constraint
2. Identify the impacted layers
3. Check whether the change can stay local
4. Validate the change locally
5. Validate the change in Docker
6. Validate the pushed revision in Jenkins before merge
7. Record the result in the relevant Obsidian task note

## Collaboration Rules

- Do not change versions or environments without explicit approval
- Do not push, merge, or alter remote settings without approval
- Do not introduce secrets, personal notes, or machine-specific config into shared docs
- Ask first for important decisions and highlight tradeoffs clearly


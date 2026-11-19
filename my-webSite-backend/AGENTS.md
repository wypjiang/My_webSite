## Agent skills

### Issue tracker

Local markdown files under `.scratch/<feature-slug>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical role strings: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at this package root. See `docs/agents/domain.md`.

## Clarification boundary

This package keeps its own skills, glossary, ADRs, and `.scratch` tickets. A requirement is clarified once at the monorepo root. Do not run `/grill-with-docs` or `/grill-me` here to open a separate clarification. After that single clarification, record only the terms, ADRs, and tickets that belong to this package.

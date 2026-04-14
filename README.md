# Consular Prep

A bilingual, source-backed prep tool for immigrant visa interviews, starting with **family-based cases at Ciudad Juárez**.

The product goal is simple:

> Help families know exactly what to print, pack, and bring so they do not get delayed or turned away for avoidable reasons.

This repository is a **repo seed**: product direction, information architecture, technical architecture, content governance, seed data structures, and an implementation roadmap.

## Initial wedge

- **Post:** Ciudad Juárez
- **Case family:** Family-based immigrant visa interviews
- **Languages:** English and Spanish
- **Core experience:** Personalized checklist + interview-week prep + practical mistake prevention

## What this repo includes

- Product strategy and scope
- Information architecture and page map
- Technical architecture and data model
- Rules-engine seed structures
- Bilingual content strategy
- Trust, update, and governance model
- 90-day roadmap
- Starter issue templates

## What to build first

1. Read `docs/product/PRD.md`
2. Read `docs/architecture/SYSTEM_OVERVIEW.md`
3. Read `docs/content/CONTENT_MODEL.md`
4. Read `docs/ops/ROADMAP.md`
5. Use `data/seed/` to scaffold the first implementation

## Suggested stack

- Next.js
- TypeScript
- Tailwind CSS
- Postgres
- Deterministic rules engine for checklist generation
- Internal admin/CMS for source-backed content maintenance

## Local development

Requirements:
- Node.js 20+
- npm 10+

Commands:

```bash
npm install
npm run dev
```

Validation:

```bash
npm run validate:seed
npm run lint
npm run typecheck
npm run build
```

Current state:
- The repository now includes a runnable Next.js App Router scaffold.
- Locale-aware routes, the first deterministic checklist flow, and a dedicated print view are now wired.
- A repeatable content-loading scaffold now powers bilingual placeholder guide pages.
- The initial queued foundation work is complete; follow-on tasks should be added to `docs/TASK_QUEUE.md` before the next autonomous cycle.

## Non-negotiables

- Official-source anchored
- Bilingual by design
- Mobile-first
- Printable outputs
- Conservative wording
- Visible review dates and source references
- No freeform AI logic for requirements until source discipline exists

## Repository map

```text
.
├── README.md
├── docs/
│   ├── product/
│   ├── architecture/
│   ├── content/
│   └── ops/
├── data/
│   ├── seed/
│   └── sources/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   │   ├── content/
│   │   ├── rules/
│   │   └── types/
│   └── admin/
└── .github/
    └── ISSUE_TEMPLATE/
```

## Product posture

This project should act as a **plain-language, practical wrapper around official guidance**, not a replacement for official instructions or legal advice.


## Licensing and governance

This repository uses a split-license, public-interest model:

- **Code and repo infrastructure:** Apache 2.0 (`LICENSE`)
- **Editorial and structured guidance content:** CC BY-SA 4.0 (`CONTENT_LICENSE.md`)
- **Project name, logo, and brand identifiers:** reserved (`TRADEMARKS.md`)

Supporting governance docs:
- `DISCLAIMER.md`
- `MAINTAINED_SOURCE_POLICY.md`
- `CONTRIBUTING.md`

This structure is designed to keep the project open, reusable, and durable while making it clear which version is the maintained canonical source.


## Autonomous build loop

This repository includes a file-driven autonomous work loop for Codex-style agents.

Start here:
- `docs/AGENT_LOOP.md`

Supporting project-state files:
- `docs/MASTER_PLAN.md`
- `docs/TASK_QUEUE.md`
- `docs/WORK_LOG.md`
- `docs/DEFINITION_OF_DONE.md`

Recommended operator prompt:

```text
Read `docs/AGENT_LOOP.md` and follow it exactly.

Start by reading the required project documents in the order specified there.
Then choose the highest-priority ready task from `docs/TASK_QUEUE.md`.
Implement it fully, validate your changes, update both `docs/WORK_LOG.md` and `docs/TASK_QUEUE.md`, then commit and push the completed work before continuing.

After updating those files, return to `docs/AGENT_LOOP.md` and continue the loop.
If a task hits a stop condition or true blocker, document it, contain it, update the queue, and continue with the next highest-priority actionable task.
Only treat the repository as blocked if no meaningful safe progress remains anywhere in the queue.
Do not skip documentation updates.
Do not skip the per-cycle commit and push unless push is unsafe or impossible; in that case record the issue clearly in `docs/WORK_LOG.md`.
Do not invent requirements beyond the repo docs.
Prefer small, coherent, shippable increments.
```

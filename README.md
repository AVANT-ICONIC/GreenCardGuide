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
npm run validate:checklist
npm run validate:sources
npm run validate:routes
npm run lint
npm run typecheck
npm run build
```

Current state:
- The repository now includes a runnable Next.js App Router scaffold.
- Locale-aware routes, the first deterministic checklist flow, and a dedicated print view are now wired.
- A repeatable content-loading scaffold now powers bilingual placeholder guide pages.
- A post-specific Ciudad Juarez hub route now links the checklist and guide surfaces from one bilingual entry point.
- FAQ and glossary route scaffolds now exist for both locales using the same placeholder-vs-verified content model.
- A typed source-registry stub now supports consistent placeholder source attachment across content surfaces.
- A bilingual documents overview route now exposes the seeded document set through the same trust-aware content layer.
- A bilingual feedback route now defines the public feedback surface, while making its non-persistent placeholder state explicit.
- An `/admin` landing scaffold now maps the planned internal maintenance surface without claiming unfinished tooling is functional.
- `/admin/content`, `/admin/sources`, `/admin/rules`, and `/admin/reviews` now exist as truthful subsection scaffolds.
- A deterministic `validate:routes` script now checks that the expected route files and route patterns exist.
- `/admin/sources` now exposes the current typed source registry through a truthful review-dashboard scaffold.
- `/admin/rules` now exposes the current seeded checklist questions and requirement rules through a read-only audit scaffold.
- `/admin/reviews` now summarizes current placeholder content surfaces in a queue-shaped review scaffold.
- `/admin/content` now summarizes the current guide, FAQ, glossary, documents, and hub surfaces through a read-only content inventory and structural diff scaffold.
- FAQ and glossary content now use stable bilingual identifiers so admin diffing can compare locale structures cleanly.
- `/admin/content` now also exposes a truthful publish-readiness scaffold based on review status, source references, and last-reviewed tracking gates.
- Current guide, FAQ, glossary, documents, and Ciudad Juarez hub pages now expose explicit last-reviewed dates through a shared review-metadata scaffold.
- `/admin/sources` now includes a deterministic source-change review task watchlist that maps registered sources to affected content surfaces.
- The checklist seed now surfaces the base sponsor financial packet through the existing `i-864` document for family-based Ciudad Juarez cases.
- The checklist now surfaces a deterministic risk flag when the applicant does not have a current passport ready.
- The checklist now routes arrest or court-record scenarios into a conservative `verify with official instructions` output instead of leaving that answer unused.
- The checklist flow, results, and print views now show localized human-readable answer labels instead of raw internal slugs.
- The checklist results and print views now add role-aware framing for principal applicants, derivative applicants, and sponsor/helpers.
- The checklist flow now resumes at the first unanswered step, and incomplete results or print requests are redirected back into the guided question flow.
- Checklist answer parsing and question-route canonicalization now drop unsupported URL values so only seeded answers survive into deterministic flow state and checklist output.
- `npm run validate:checklist` now exercises checklist parsing, resume logic, completion guards, and seeded result assembly as a repeatable smoke check.

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
If `docs/TASK_QUEUE.md` has fewer than 3 ready tasks, inspect the codebase, docs, placeholders, TODOs, incomplete flows, trust gaps, and recent work, then add specific ready tasks before implementing.
Then choose the highest-priority ready task from `docs/TASK_QUEUE.md`.
Implement it fully, validate your changes, update both `docs/WORK_LOG.md` and `docs/TASK_QUEUE.md`, then commit and push the completed work before continuing.

After updating those files, return to `docs/AGENT_LOOP.md` and continue the loop.
If a task hits a stop condition or true blocker, document it, contain it, update the queue, and continue with the next highest-priority actionable task.
Only treat the repository as blocked if no meaningful safe progress remains anywhere in the queue.
Do not stop just because the queue is thin; refill it and continue in the same run.
Do not skip documentation updates.
Do not skip the per-cycle commit and push unless push is unsafe or impossible; in that case record the issue clearly in `docs/WORK_LOG.md`.
Do not invent requirements beyond the repo docs.
Prefer small, coherent, shippable increments.
```

# TASK_QUEUE

Use this file as the current prioritized backlog for autonomous work.

Status values:
- Ready
- In Progress
- Blocked
- Done

Priority values:
- P0 = critical foundation
- P1 = core value path
- P2 = important but not blocking
- P3 = later polish

## Ready

### TASK-023 — Add publish controls scaffold
Status: Ready
Priority: P2
Depends on: TASK-021

Summary:
Add a truthful admin scaffold for publish controls that explains planned publish states, review gates, and current non-functional boundaries without implying live publishing exists.

### TASK-024 — Normalize stable bilingual content keys
Status: Ready
Priority: P2
Depends on: TASK-022

Summary:
Normalize the FAQ and glossary locale keys so bilingual content diffs and future editorial workflows can compare stable identifiers instead of language-specific keys.

## Blocked

None currently.

## Done

### TASK-001 — Create runnable web app scaffold
Status: Done
Priority: P0
Depends on: none

Summary:
Added a runnable Next.js App Router scaffold with strict TypeScript and ESLint config, a minimal landing shell, a basic `.gitignore`, and README run/validation instructions.

### TASK-003 — Normalize seed domain data and validators
Status: Done
Priority: P0
Depends on: none

Summary:
Added typed seed entities, path-aware validation helpers, JSON-backed loaders for questions/documents/rules, a runnable `validate:seed` script, and documented assumptions for the current seed structure.

### TASK-002 — Add locale-aware routing shell
Status: Done
Priority: P0
Depends on: TASK-001

Summary:
Added `/en` and `/es` route scaffolding with a shared localized layout, language switcher, bilingual home placeholders, and a root language entry page.

### TASK-005 — Build checklist result assembler
Status: Done
Priority: P1
Depends on: TASK-003

Summary:
Added grouped checklist result assembly over the seeded rules, including stable section types, conservative confidence labels, and document metadata joins for rule outputs.

### TASK-004 — Build checklist question flow
Status: Done
Priority: P1
Depends on: TASK-001, TASK-002, TASK-003

Summary:
Added localized checklist start, questions, and results routes with a deterministic multi-step question renderer, URL-backed answer state, and a progress indicator structured for future branching.

### TASK-006 — Add print-view checklist scaffold
Status: Done
Priority: P2
Depends on: TASK-004, TASK-005

Summary:
Added a dedicated `/[lang]/checklist/print` route with compact grouped checklist output, print-focused controls, and print media styles for night-before packing review.

### TASK-007 — Add content-loading scaffold for product pages
Status: Done
Priority: P2
Depends on: TASK-001, TASK-002

Summary:
Added a typed bilingual guide-content loader, placeholder-vs-verified review metadata, and routed guide stubs for the key public guide pages under `/[lang]/guides/[slug]`.

### TASK-010 — Add Ciudad Juárez hub route scaffold
Status: Done
Priority: P1
Depends on: TASK-002, TASK-007

Summary:
Added `/[lang]/ciudad-juarez` with bilingual placeholder hub content, trust-status framing, and deterministic links into the current checklist and guide routes.

### TASK-011 — Add FAQ and glossary route scaffolds
Status: Done
Priority: P2
Depends on: TASK-007

Summary:
Added bilingual `/[lang]/faq` and `/[lang]/glossary` routes backed by typed placeholder content loaders and explicit placeholder-vs-verified trust states.

### TASK-012 — Add source registry stub data surface
Status: Done
Priority: P2
Depends on: TASK-003, TASK-007

Summary:
Added a typed source registry stub, validation for source entries, and consistent placeholder source-reference attachment across current content loaders.

### TASK-013 — Add documents overview route scaffold
Status: Done
Priority: P1
Depends on: TASK-003, TASK-007

Summary:
Added bilingual `/[lang]/documents` backed by a typed documents overview loader that groups the seeded document set and frames it as placeholder, trust-aware content.

### TASK-014 — Add feedback route scaffold
Status: Done
Priority: P2
Depends on: TASK-002

Summary:
Added bilingual `/[lang]/feedback` with explicit feedback guidance, a placeholder submission form, and a clear non-persistent state message.

### TASK-015 — Add admin route scaffold
Status: Done
Priority: P2
Depends on: TASK-012

Summary:
Added `/admin` as a truthful landing scaffold for content, sources, rules, and review surfaces without implying unfinished tools already work.

### TASK-016 — Add admin subsection route scaffolds
Status: Done
Priority: P2
Depends on: TASK-015

Summary:
Added `/admin/content`, `/admin/sources`, `/admin/rules`, and `/admin/reviews` as truthful subsection placeholders linked from the admin landing surface.

### TASK-017 — Add route smoke verification script
Status: Done
Priority: P2
Depends on: TASK-001, TASK-002, TASK-015

Summary:
Added `npm run validate:routes`, a deterministic route smoke check that verifies the expected route files and documented route patterns currently present in the app.

### TASK-018 — Add source review dashboard scaffold
Status: Done
Priority: P2
Depends on: TASK-012, TASK-016

Summary:
Upgraded `/admin/sources` into a source-oriented dashboard scaffold that displays the current typed source registry and preserves an explicit read-only trust posture.

### TASK-019 — Add rules audit view scaffold
Status: Done
Priority: P2
Depends on: TASK-003, TASK-005, TASK-016

Summary:
Upgraded `/admin/rules` into a read-only audit scaffold that exposes the current seeded checklist questions, rule counts, output types, and rule inventory.

### TASK-020 — Add review queue scaffold
Status: Done
Priority: P2
Depends on: TASK-007, TASK-012, TASK-016

Summary:
Upgraded `/admin/reviews` into a review-oriented scaffold that summarizes current placeholder content surfaces, their trust labels, and the remaining review work shape.

### TASK-021 — Add admin content inventory dashboard
Status: Done
Priority: P2
Depends on: TASK-007, TASK-013, TASK-016, TASK-020

Summary:
Upgraded `/admin/content` into a read-only content inventory dashboard that summarizes the current guide, FAQ, glossary, documents, and hub surfaces with trust-aware metadata.

### TASK-022 — Add content diffs scaffold
Status: Done
Priority: P2
Depends on: TASK-021

Summary:
Extended `/admin/content` with a deterministic structural diff scaffold that compares current bilingual content shapes and flags FAQ/glossary key mismatches for future cleanup.

### TASK-009 — Require per-cycle commit and push
Status: Done
Priority: P0
Depends on: none

Summary:
Updated the autonomous loop and README prompt so each completed work cycle now requires a small task-scoped commit and a push of the current branch.

### TASK-008 — Make autonomous loop blocker-resilient
Status: Done
Priority: P0
Depends on: none

Summary:
Updated `docs/AGENT_LOOP.md` and the README operator prompt so blocked tasks are documented, contained, and bypassed instead of stopping the whole autonomous loop.

### TASK-000 — Add autonomous repo loop docs
Status: Done
Priority: P0
Depends on: none

Summary:
Created `docs/AGENT_LOOP.md`, `docs/MASTER_PLAN.md`, `docs/TASK_QUEUE.md`, `docs/WORK_LOG.md`, and `docs/DEFINITION_OF_DONE.md` to support autonomous work cycles.

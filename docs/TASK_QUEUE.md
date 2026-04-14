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

### TASK-006 — Add print-view checklist scaffold
Status: Ready
Priority: P2
Depends on: TASK-004, TASK-005

Objective:
Create a print-friendly structure for checklist outputs.

Deliverables:
- print route or print mode scaffold
- compact grouped checklist presentation

Acceptance Criteria:
- output is clearly printable
- structure is optimized for night-before packing review

### TASK-007 — Add content-loading scaffold for product pages
Status: Ready
Priority: P2
Depends on: TASK-001, TASK-002

Objective:
Create a simple content-loading pattern for bilingual informational pages.

Deliverables:
- content folder conventions or loader utilities
- page stubs for key product sections

Acceptance Criteria:
- informational pages can be populated through a repeatable content mechanism
- placeholder vs verified content can later be distinguished cleanly

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

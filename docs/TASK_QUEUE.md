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

### TASK-001 — Create runnable web app scaffold
Status: Ready
Priority: P0
Depends on: none

Objective:
Create the initial runnable application scaffold for the repository, aligned with the documented architecture.

Deliverables:
- package manifest
- tsconfig
- next config or equivalent app scaffold
- base app entry structure
- lint/typecheck script placeholders where practical

Acceptance Criteria:
- repository has a clear runnable app skeleton
- app structure matches documented product direction
- README includes basic local run instructions or clearly labels remaining gaps

### TASK-002 — Add locale-aware routing shell
Status: Ready
Priority: P0
Depends on: TASK-001

Objective:
Establish English and Spanish route scaffolding for the public app.

Deliverables:
- locale route structure
- base layout with language-aware navigation placeholder
- home route placeholders for both locales

Acceptance Criteria:
- route structure supports `/en` and `/es` style paths or equivalent
- shared layout exists
- bilingual expansion path is obvious in code

### TASK-003 — Normalize seed domain data and validators
Status: Ready
Priority: P0
Depends on: none

Objective:
Define typed loaders and basic validation for the existing seed JSON data.

Deliverables:
- typed seed loaders
- validation helpers
- documented assumptions for the current seed structure

Acceptance Criteria:
- existing seed files can be loaded through typed helpers
- invalid seed shapes fail clearly
- domain types remain aligned with docs

### TASK-004 — Build checklist question flow
Status: Ready
Priority: P1
Depends on: TASK-001, TASK-002, TASK-003

Objective:
Implement the first deterministic multi-step checklist flow for Ciudad Juárez family-based prep.

Deliverables:
- checklist page scaffold
- question renderer
- answer state handling
- progress indicator

Acceptance Criteria:
- user can move through the seeded questions
- flow is structured for conditional branching
- implementation remains locale-ready

### TASK-005 — Build checklist result assembler
Status: Ready
Priority: P1
Depends on: TASK-003

Objective:
Expand rule evaluation so the app can output grouped checklist results.

Deliverables:
- enriched rules evaluator
- output grouping types
- confidence labels and section grouping

Acceptance Criteria:
- deterministic checklist output can be generated from seeded inputs
- result sections map to documented product needs

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

### TASK-000 — Add autonomous repo loop docs
Status: Done
Priority: P0
Depends on: none

Summary:
Created `docs/AGENT_LOOP.md`, `docs/MASTER_PLAN.md`, `docs/TASK_QUEUE.md`, `docs/WORK_LOG.md`, and `docs/DEFINITION_OF_DONE.md` to support autonomous work cycles.

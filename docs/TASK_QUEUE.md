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

## Queue Maintenance Rules

- Keep at least 3 specific `Ready` tasks in the queue whenever safe to do so.
- If `Ready` has fewer than 3 tasks, inspect the current codebase, docs, placeholders, TODOs, incomplete flows, trust gaps, and recent work, then add more tasks before implementing.
- Prefer extending the deepest unfinished deterministic flow over creating new top-level surfaces.
- Split oversized work into small, implementation-ready tasks with explicit validation.
- Do not invent immigration guidance to manufacture tasks. If guidance is not source-backed yet, queue infrastructure, validation, source-mapping, persistence, or admin-review work instead.

## Task Format

Use this format for every active task:

### TASK-XXX — Short title
Status: Ready
Priority: P1
Depends on: TASK-000, TASK-000 or none
Objective:
- one concrete outcome
Deliverables:
- specific code or doc artifacts to change
Acceptance Criteria:
- observable completion conditions
Validation:
- exact commands or direct checks
Notes:
- trust constraints, scope limits, or useful implementation context

## Task Discovery Heuristics

- Prefer depth over breadth.
- Turn placeholders, stubs, and manual-only summaries into real deterministic flows.
- Strengthen deterministic logic, persistence, validation, admin usefulness, and trust/source integrity before adding polish.
- Use recent work to pick the next seam instead of jumping to unrelated areas.
- If a surface exposes placeholder source references, stale review metadata, missing persistence, or weak validation, convert that gap into a concrete task.
- Do not invent immigration guidance, legal interpretations, or unsupported case rules.

## Ready

### TASK-038 — Expose source-to-surface coverage in admin sources
Status: Ready
Priority: P2
Depends on: TASK-035
Objective:
- Make the source dashboard show which public surfaces each registered source currently supports.
Deliverables:
- a deterministic source-coverage summary derived from the current source mapping layer
- `/admin/sources` updates that show mapped surface count and linked routes per source alongside the existing watchlist tasks
- validation that the new coverage summary stays consistent with the source mapping registry
Acceptance Criteria:
- each registered source shows its mapped public surfaces without relying on manual notes
- the admin sources surface distinguishes direct mapped coverage from the separate change-watchlist tasks
- the coverage summary stays truthful for placeholder governance references and does not imply verified immigration guidance
Validation:
- `npm run validate:sources`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
Notes:
- Reuse the `TASK-035` source mapping registry as the single source of truth instead of creating a second attachment list.

### TASK-039 — Add deterministic review-queue validation coverage
Status: Ready
Priority: P2
Depends on: TASK-036
Objective:
- Add a repeatable validation check for review-queue ordering and metadata assembly.
Deliverables:
- a validation script that exercises the review queue summary and entry ordering
- assertions covering priority sorting, required metadata fields, and current under-sourced counts
- package wiring and docs updates if a new validation command is added
Acceptance Criteria:
- review-queue regressions can be caught without manually opening `/admin/reviews`
- the validation proves entries remain sorted by deterministic priority score
- the checks stay aligned with the current placeholder trust posture and do not require browser automation
Validation:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- the new review-queue validation command
Notes:
- Prefer the lightweight script pattern already used for other repo validation commands.

### TASK-040 — Add deterministic feedback inbox validation coverage
Status: Ready
Priority: P2
Depends on: TASK-037
Objective:
- Add a repeatable validation check for feedback submission validation, persistence, and inbox loading.
Deliverables:
- a lightweight validation script that exercises one valid and one invalid feedback submission against the shared storage helpers
- assertions covering stored field shape, newest-first inbox ordering, and validation-error handling
- package wiring and docs updates if a new validation command is added
Acceptance Criteria:
- feedback inbox regressions can be caught without manual browser submission
- the validation does not require network access or a running Next.js server
- the check stays isolated from real local inbox data by using a temporary storage path or fixture
Validation:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- the new feedback validation command
Notes:
- Reuse the shared feedback storage helpers instead of duplicating validation logic in the script.

## Blocked

None currently.

## Done

Recent completed tasks:

### TASK-037 — Persist public feedback submissions into a deterministic review inbox
Status: Done
Priority: P1
Depends on: TASK-014, TASK-020
Objective:
- Replace the current non-persistent feedback placeholder with validated local persistence that feeds the review workflow.
Deliverables:
- a typed feedback submission schema and storage path for local submissions
- feedback route handling that validates and persists submissions instead of only showing placeholder success text
- admin review integration so stored feedback appears as actionable maintenance input rather than disappearing after submit
Acceptance Criteria:
- valid feedback submissions are stored deterministically and survive refreshes
- invalid feedback is rejected safely with clear user-facing errors
- admin review tooling can see stored feedback items without implying moderation or publishing tooling already exists
Validation:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- direct submission smoke check covering one valid and one invalid payload
Notes:
- Completed 2026-04-14. Feedback storage remains local repo data only; no moderation or publishing workflow is implied.

### TASK-036 — Turn the review scaffold into a prioritized deterministic review queue
Status: Done
Priority: P1
Depends on: TASK-020, TASK-025, TASK-035
Objective:
- Upgrade the current review summary into an actionable queue sorted by deterministic review priority.
Deliverables:
- a shared review-task assembler that derives queue entries from review status, source coverage, and review recency
- explicit queue metadata such as priority, blocker reason, recommended next action, and stale-review flags
- an `/admin/reviews` update that presents the queue in priority order instead of as an unsorted scaffold list
Acceptance Criteria:
- review entries are ordered by explicit deterministic priority rather than route declaration order
- each entry explains why it needs review and what action is expected next
- stale or under-sourced surfaces are visibly distinguishable from lower-risk placeholder work
Validation:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- direct route check of `/admin/reviews`
Notes:
- Completed 2026-04-14. The queue remains operational only; it prioritizes review work without implying automated editorial approval.

### TASK-035 — Replace blanket placeholder source attachments with surface-specific mappings
Status: Done
Priority: P1
Depends on: TASK-012, TASK-018, TASK-020, TASK-025
Objective:
- Replace the current “attach every placeholder source to every surface” behavior with deterministic per-surface source mappings.
Deliverables:
- a typed source-mapping layer that assigns only relevant source keys to each public content surface
- updates to the current content loaders and admin review queue so they use those mapped source keys instead of the blanket placeholder list
- validation that fails if a surface references an unknown source key or is missing required mapping data
Acceptance Criteria:
- current guide, FAQ, glossary, documents, and Ciudad Juárez hub surfaces no longer default to the full placeholder source list
- `/admin/reviews` and any affected public surfaces show the mapped source keys consistently
- the change does not present placeholder references as official immigration guidance
Validation:
- `npm run validate:sources`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
Notes:
- Completed 2026-04-14. Governance references remain placeholder-only where applicable, but they are now intentionally mapped per surface instead of attached globally.

### TASK-034 — Add checklist behavior smoke validation script
Status: Done
Priority: P2
Depends on: TASK-032, TASK-033
Objective:
- Add a repeatable deterministic checklist behavior smoke test.
Deliverables:
- `npm run validate:checklist`
- checklist parsing, progress, completion, and result-assembly coverage
Acceptance Criteria:
- checklist behavior can be validated without ad hoc shell commands or browser automation
Validation:
- `npm run validate:checklist`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
Notes:
- Completed 2026-04-14. See `docs/WORK_LOG.md` for implementation details.

### TASK-033 — Canonicalize checklist answers and strip unsupported values
Status: Done
Priority: P1
Depends on: TASK-032
Objective:
- Ensure only seeded answer values survive URL-backed checklist state.
Deliverables:
- stricter answer parsing and route canonicalization
Acceptance Criteria:
- malformed or unsupported values are removed instead of influencing results
Validation:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
Notes:
- Completed 2026-04-14. See `docs/WORK_LOG.md` for implementation details.

### TASK-032 — Resume checklist flow and guard incomplete results
Status: Done
Priority: P1
Depends on: TASK-004
Objective:
- Resume users at the first unanswered step and prevent partial results rendering.
Deliverables:
- shared progress helper and route guards for results and print views
Acceptance Criteria:
- incomplete sessions redirect back into the guided flow
Validation:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
Notes:
- Completed 2026-04-14. See `docs/WORK_LOG.md` for implementation details.

Archived:
- TASK-001 through TASK-031 are complete and remain documented in git history and `docs/WORK_LOG.md`.

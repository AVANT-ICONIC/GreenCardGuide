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

### TASK-044 — Add deterministic rules audit validation coverage
Status: Done
Priority: P2
Depends on: TASK-041
Objective:
- Add a repeatable validation check for the admin rules audit data and rendered markers.
Deliverables:
- a lightweight validation script that exercises checklist-question counts, rule-output inventory, and key admin-rules UI markers
- assertions covering the current seeded question count, rule count, and output-type coverage
- package wiring and docs updates if a new validation command is added
Acceptance Criteria:
- admin rules regressions can be caught without manually opening `/admin/rules`
- the validation remains aligned with the current seeded deterministic rules posture
- the check avoids browser automation and reuses existing loaders where possible
Validation:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- the new rules validation command
Notes:
- Completed 2026-04-14. `npm run validate:rules` now checks the seeded rules audit baseline, output-type counts, active-rule posture, and required `/admin/rules` markers through a shared audit summary loader.

### TASK-045 — Add feedback summary validation coverage
Status: Done
Priority: P2
Depends on: TASK-042
Objective:
- Add a repeatable validation check for the new feedback summary counts and route aggregation logic.
Deliverables:
- a lightweight validation script that exercises feedback summary totals, per-type counts, and most-reported route ordering
- assertions covering the current stored-shape contract and aggregation output using fixture submissions
- package wiring and docs updates if a new validation command is added
Acceptance Criteria:
- feedback summary regressions can be caught without manually opening `/admin/reviews`
- the validation stays isolated from the real ignored inbox file
- the check remains truthful about the current local-maintainer-only posture
Validation:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- the new feedback summary validation command
Notes:
- Completed 2026-04-14. `npm run validate:feedback-summary` now checks shared feedback-summary totals, per-type counts, most-reported route ordering, and required `/admin/reviews` summary markers without touching the real inbox file.

### TASK-046 — Add publish-readiness validation coverage
Status: Done
Priority: P2
Depends on: TASK-041
Objective:
- Add a repeatable validation check for the admin content publish-readiness summary and blocker assembly.
Deliverables:
- a lightweight validation script that exercises publish-ready counts, blocked counts, and blocker generation
- assertions covering alignment with the current content inventory and placeholder trust posture
- package wiring and docs updates if a new validation command is added
Acceptance Criteria:
- publish-readiness regressions can be caught without manually opening `/admin/content`
- the validation remains aligned with the current read-only planning scaffold
- the check avoids browser automation and reuses existing admin loaders
Validation:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- the new publish validation command
Notes:
- Completed 2026-04-14. `npm run validate:publish` now checks publish-readiness counts, required gates, blocked-route posture, and required `/admin/content` publish markers against the current read-only scaffold.

### TASK-047 — Add content diff validation coverage
Status: Done
Priority: P2
Depends on: TASK-041
Objective:
- Add a repeatable validation check for the admin content diff summary and locale-shape alignment posture.
Deliverables:
- a lightweight validation script that exercises aligned versus flagged diff counts and key per-surface diff details
- assertions covering the current guide, FAQ, glossary, documents, and Ciudad Juarez hub diff summary output
- package wiring and docs updates if a new validation command is added
Acceptance Criteria:
- content diff regressions can be caught without manually opening `/admin/content`
- the validation remains aligned with the current structural-diff scaffold and does not imply editorial text diffing already exists
- the check reuses the existing diff-summary loader rather than duplicating locale-comparison logic
Validation:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- the new content-diff validation command
Notes:
- Completed 2026-04-14. `npm run validate:content-diff` now checks aligned versus flagged diff counts, current locale-shape details, and required `/admin/content` diff markers against the structural-diff scaffold.

### TASK-048 — Add content inventory validation coverage
Status: Ready
Priority: P2
Depends on: TASK-041
Objective:
- Add a repeatable validation check for the admin content inventory summary and tracked-surface metadata.
Deliverables:
- a lightweight validation script that exercises total surface counts, localized-surface counts, and key route metadata in the content inventory
- assertions covering the current guide, FAQ, glossary, documents, and Ciudad Juarez hub inventory entries
- package wiring and docs updates if a new validation command is added
Acceptance Criteria:
- content inventory regressions can be caught without manually opening `/admin/content`
- the validation remains truthful about the current placeholder posture and tracked review metadata
- the check reuses the shared content-inventory loader instead of duplicating route inventory assembly
Validation:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- the new content-inventory validation command
Notes:
- Keep the assertions anchored to the current deterministic content registry and bilingual route posture.

### TASK-049 — Add rules-to-document integrity validation coverage
Status: Ready
Priority: P2
Depends on: TASK-044
Objective:
- Add a repeatable validation check that seeded requirement rules, document definitions, and checklist-result assembly remain structurally aligned.
Deliverables:
- a lightweight validation script that exercises document-slug references used by rules and the current checklist-result section distribution for a seeded complete answer set
- assertions covering unknown-document protection, expected matched-rule output sections, and the current conservative verify-with-official posture
- package wiring and docs updates if a new validation command is added
Acceptance Criteria:
- regressions between requirement rules and seeded document definitions can be caught without manually running the checklist flow
- the validation remains deterministic and reuses the shared checklist assembly path instead of duplicating rule-evaluation behavior
- the check does not invent new immigration requirements or case branches
Validation:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- the new rule-integrity validation command
Notes:
- Focus on structural integrity and current output posture, not on expanding the seeded requirement set.

## Blocked

None currently.

## Done

Recent completed tasks:

### TASK-043 — Add deterministic source dashboard validation coverage
Status: Done
Priority: P2
Depends on: TASK-038
Objective:
- Add a repeatable validation check for the source coverage summary and watchlist task assembly.
Deliverables:
- a lightweight validation script that exercises source coverage counts, mapped routes, and watchlist task relationships
- assertions covering current mapped-source counts and affected-route linkage
- package wiring and docs updates if a new validation command is added
Acceptance Criteria:
- source dashboard regressions can be caught without manually opening `/admin/sources`
- the validation proves direct mapped coverage and change-watchlist tasks stay consistent with the current source registry
- the check remains aligned with the current placeholder governance-reference posture
Validation:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- the new source-dashboard validation command
Notes:
- Completed 2026-04-14. `npm run validate:source-dashboard` now checks mapped source counts, linked routes, and watchlist alignment.

### TASK-042 — Surface feedback summary counts in admin reviews
Status: Done
Priority: P2
Depends on: TASK-037
Objective:
- Make the admin reviews inbox easier to scan by summarizing stored feedback counts by type and route.
Deliverables:
- a deterministic feedback-summary helper derived from stored submissions
- `/admin/reviews` updates that show counts by report type and most-reported routes ahead of the inbox list
- truthful copy that keeps the feature framed as local maintainer input, not moderation tooling
Acceptance Criteria:
- maintainers can see whether feedback skews toward confusion, missing content, or route bugs without reading every entry
- the summary is derived from the stored inbox data instead of hardcoded labels
- the page does not imply triage, assignment, or moderation workflows already exist
Validation:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- direct route check of `/admin/reviews`
Notes:
- Completed 2026-04-14. The reviews page now shows lightweight feedback totals, type counts, and top reported routes ahead of the inbox detail list.

### TASK-041 — Add admin operations route smoke validation
Status: Done
Priority: P2
Depends on: TASK-036, TASK-037, TASK-038
Objective:
- Add a repeatable smoke check for the current admin operations routes and their key rendered markers.
Deliverables:
- a lightweight validation script or route-check extension that verifies `/admin/content`, `/admin/sources`, `/admin/rules`, and `/admin/reviews`
- assertions covering the latest deterministic metadata now exposed on the sources and reviews pages
- package wiring and docs updates if a new validation command is added
Acceptance Criteria:
- admin surface regressions can be caught without manual browser checks
- the smoke check confirms the presence of the latest review-queue, feedback-inbox, and source-coverage markers
- the validation remains lightweight and truthful about the current scaffold state
Validation:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- the new admin route smoke validation command
Notes:
- Completed 2026-04-14. `npm run validate:admin` now checks admin route files, loader outputs, and key sources/reviews markers without requiring a dev server.

### TASK-040 — Add deterministic feedback inbox validation coverage
Status: Done
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
- Completed 2026-04-14. `npm run validate:feedback` now exercises invalid payload handling plus deterministic inbox persistence and ordering on a temporary storage file.

### TASK-039 — Add deterministic review-queue validation coverage
Status: Done
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
- Completed 2026-04-14. `npm run validate:reviews` now checks review-queue ordering, required metadata, and current placeholder posture counts.

### TASK-038 — Expose source-to-surface coverage in admin sources
Status: Done
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
- Completed 2026-04-14. The sources page now separates direct mapped coverage from change-watchlist tasks without claiming automated source monitoring exists.

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

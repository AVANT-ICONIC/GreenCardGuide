# TASK_QUEUE

Use this file as the live frontier for autonomous work.

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

- Keep the `Ready` section short, current, and easy to scan.
- Keep at least 3 specific `Ready` tasks whenever safe to do so.
- Do not leave `Done` tasks in the `Ready` section.
- If `Ready` has fewer than 3 tasks, or if the frontier is shallow or validator-heavy, repair the queue before implementing.
- Prefer extending the deepest unfinished deterministic flow over opening new disconnected surface area.
- Split oversized work into implementation-ready tasks with explicit validation.
- Do not invent immigration guidance to manufacture tasks. If guidance is not source-backed yet, queue deterministic infrastructure or conservative product-surface work that reuses existing seeds and constraints.
- Do not let validation-only tasks dominate the frontier while meaningful product-advancing work remains safe and discoverable.

## Frontier Quality Rules

- The visible `Ready` frontier should contain real next steps for the product, not pages of history.
- Keep at least one `Ready` task focused on advancing a user-facing or core deterministic seam.
- Keep validation tasks attached to feature work or real reliability risk; do not chain them as default refill behavior.
- Prefer turning placeholders and read-only scaffolds into useful deterministic flows before adding more marker or audit coverage around them.
- Prefer work that makes the Ciudad Juárez spouse/family preparation path more real, more persistent, more source-backed, and more printable.
- Avoid new validation-only work unless it directly unlocks, protects, or verifies that path.

## Good Next Tasks

- Turn an existing placeholder route into a deterministic, navigable surface using current seeds and rules.
- Link an existing user-facing flow into a newly built route so users are not stranded on dead-end output.
- Reuse current structured data to deepen guides, documents, checklist results, or trust surfaces without inventing new requirements.

## Bad Next Tasks

- Add the next adjacent validator for a placeholder surface that still does not help the user do anything new.
- Add component-marker or metadata checks for a route whose underlying product seam is still a scaffold.
- Keep historical completed tasks in the active frontier instead of promoting a new high-value task.

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

## Ready

### TASK-082 — Link checklist document items to seeded document detail routes
Status: Ready
Priority: P1
Depends on: TASK-081
Objective:
- Let checklist result and print surfaces drill into the new document-detail route whenever an item represents a seeded document.
Deliverables:
- checklist result updates so document-backed items link to `/${lang}/documents/[slug]`
- print-view updates that preserve readable document references while still pointing back to the same seeded detail surface
- any small loader or component cleanup needed to avoid duplicating route construction logic
Acceptance Criteria:
- document-backed checklist items no longer strand users on label-only output when a seeded detail page exists
- non-document checklist items such as risk flags or verify-with-official items remain plain text and do not get misleading links
- the change stays within the current deterministic product scope and does not imply verified editorial copy beyond the seeded scaffolds
Validation:
- `npm run validate:checklist`
- `npm run validate:documents`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
Notes:
- Keep the scope on navigation and deterministic document context, not broader checklist redesign.

### TASK-083 — Turn the bring-list guide into a seeded packet guide
Status: Ready
Priority: P1
Depends on: TASK-081
Objective:
- Replace the current placeholder `what-to-bring` guide with a deterministic packet guide assembled from the existing document library and active rule references.
Deliverables:
- a shared loader or guide-content path that groups the current seeded documents into clear packet sections for the bring-list guide
- updates to the `what-to-bring` guide so it shows deterministic packet structure and links into seeded document detail routes where useful
- docs and guide/documents validation updates if the route surface materially changes
Acceptance Criteria:
- the `what-to-bring` guide becomes a useful bilingual orientation surface instead of pure placeholder prose
- the page stays conservative by reusing current document and rule seeds rather than inventing new interview guidance
- users can move from the guide into the seeded document library without hitting another dead end
Validation:
- `npm run validate:guides`
- `npm run validate:documents`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
Notes:
- Keep the scope on deterministic packet structure and navigation, not new editorial requirements or unsupported case branches.

### TASK-084 — Promote the document library from the Ciudad Juarez hub
Status: Ready
Priority: P1
Depends on: TASK-081
Objective:
- Turn the Ciudad Juarez hub into stronger wayfinding by surfacing the document library and current bring-list path alongside the existing checklist shortcuts.
Deliverables:
- hub updates that add or strengthen links into the documents overview and seeded packet-planning surfaces
- copy updates that explain when to use the checklist versus the document library without claiming verified editorial guidance
- any small route or component cleanup needed to keep the hub aligned with the current deterministic product scope
Acceptance Criteria:
- the hub no longer acts as a mostly placeholder orientation page once the document library exists
- users can move from the post hub into checklist, documents, and packet-planning surfaces through explicit navigation
- the route remains truthful about placeholder trust posture and does not invent new Ciudad Juarez process claims
Validation:
- `npm run validate:ciudad-juarez`
- `npm run validate:documents`
- `npm run validate:guides`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
Notes:
- Keep the scope on deterministic navigation and framing, not new content claims or broader hub redesign.

## Blocked

None currently.

## Done

Recent completed tasks:

### TASK-081 — Add bilingual document detail routes from seeded data
Status: Done
Priority: P1
Depends on: none
Objective:
- Add a deterministic document-detail surface so users can drill into each seeded document from the existing documents overview.
Deliverables:
- a new `/[lang]/documents/[slug]` route for the current seeded document set
- a shared loader that combines seeded document metadata with the current deterministic rule references for that document
- document overview updates that link each seeded document into its detail route
- docs and route-validation updates for the new surface
Acceptance Criteria:
- every seeded document renders a bilingual detail page without inventing new immigration requirements beyond the current structured seeds
- each detail page clearly shows the current placeholder trust posture plus the checklist rules that reference the document today
- the documents overview becomes a useful navigation layer instead of a dead-end grouped list
Validation:
- `npm run validate:documents`
- `npm run validate:routes`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
Notes:
- Completed 2026-04-15. The app now serves bilingual `/[lang]/documents/[slug]` routes for every seeded document, links into them from the documents overview, and validates both covered and currently-uncovered document detail states through `npm run validate:documents`.

- Older completed-task history remains in `docs/WORK_LOG.md` and git history. This file is intentionally the live frontier, not the full project chronicle.

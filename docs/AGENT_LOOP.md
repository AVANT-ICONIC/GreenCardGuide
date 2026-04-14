# AGENT_LOOP

This file is the canonical entry point for autonomous work in this repository.

## Mission

Build **Guía Green Card**, a bilingual, source-backed preparation system for family-based immigrant visa applicants, starting with Ciudad Juárez. The product must help applicants and sponsors understand what documents to prepare, what to bring, what to print, what to expect, and what commonly causes delays or turn-aways.

The product is not legal advice. It is an operational preparation tool built on public sources, careful review, and conservative wording.

## Core principles

1. **Source-backed before expansive**  
   Do not add factual immigration guidance unless it is grounded in the project's source-backed content model or clearly marked as placeholder content.

2. **Deterministic before AI**  
   Implement explicit rules, schemas, and UI flows before adding any assistant-like features.

3. **Bilingual by design**  
   English and Spanish should be supported in structure and copy patterns from the start.

4. **Mobile-first and stress-proof**  
   Optimize for anxious users on phones, not ideal desktop-only workflows.

5. **Trust over cleverness**  
   Use calm, clear, conservative UX and wording. Avoid speculative claims.

6. **Small coherent increments**  
   Prefer shippable, testable slices over sprawling unfinished work.

7. **Keep docs and code aligned**  
   If code changes architecture, product scope, or workflow expectations, update the relevant docs in the same work cycle.

## Read these files first, in order

1. `README.md`
2. `docs/product/PRD.md`
3. `docs/product/INFORMATION_ARCHITECTURE.md`
4. `docs/architecture/SYSTEM_OVERVIEW.md`
5. `docs/architecture/DATA_MODEL.md`
6. `docs/content/CONTENT_MODEL.md`
7. `docs/content/BILINGUAL_STRATEGY.md`
8. `docs/ops/TRUST_AND_SAFETY.md`
9. `docs/ops/ROADMAP.md`
10. `docs/MASTER_PLAN.md`
11. `docs/DEFINITION_OF_DONE.md`
12. `docs/TASK_QUEUE.md`
13. `docs/WORK_LOG.md`

## Work loop

Repeat the following loop until you hit a documented stop condition.

1. Read this file and the current project state files listed above.
2. Open `docs/TASK_QUEUE.md`.
3. Select the highest-priority task with `Status: Ready` and no unmet dependencies.
4. Implement that task fully in a small, coherent increment.
5. Validate your changes.
6. Update `docs/WORK_LOG.md` with what you changed, decisions made, validations run, blockers, and the recommended next task.
7. Update `docs/TASK_QUEUE.md` to reflect completed work, newly unblocked tasks, status changes, or follow-on tasks.
8. Return to this file and begin the next cycle.

## Task selection rules

- Prefer foundation before polish.
- Prefer deterministic checklist and content infrastructure before advanced UX.
- Do not build AI assistant features until the deterministic data and rules layers are in place.
- Do not add new case complexity until the core Ciudad Juárez family-based flow works end-to-end.
- Prefer tasks that unblock multiple downstream tasks.
- If a task is too large, split it in `docs/TASK_QUEUE.md` before implementation and complete the highest-value subtask first.

## Execution rules

- Make the minimum coherent set of changes required to complete the task.
- Keep naming, folder structure, and data shapes consistent with the docs.
- Do not invent immigration requirements, exceptions, or legal interpretations.
- If content is not yet source-backed, mark it clearly as placeholder scaffolding.
- Keep bilingual support in mind even when only one locale is scaffolded in code.
- Avoid placeholder code that obscures architecture; leave clear TODOs only when necessary.
- Favor typed, deterministic code paths.
- Add or update tests whenever the repository has the surrounding test harness available.

## Validation rules

Run the strongest available checks relevant to the task. Examples:

- TypeScript typecheck
- lint
- tests
- route-level smoke verification
- schema validation for seed data
- manual sanity checks for generated structures

If the repository is not yet wired with a runnable app, validate changed files as directly as possible and record what was and was not verifiable in `docs/WORK_LOG.md`.

## Documentation update rules

After every work cycle, update both:

- `docs/WORK_LOG.md`
- `docs/TASK_QUEUE.md`

Also update any affected source-of-truth docs, such as:

- `docs/product/PRD.md`
- `docs/product/INFORMATION_ARCHITECTURE.md`
- `docs/architecture/SYSTEM_OVERVIEW.md`
- `docs/architecture/DATA_MODEL.md`
- `docs/content/CONTENT_MODEL.md`
- `README.md`

## Stop conditions

Stop and report clearly if any of the following are true:

1. A required product decision is missing and cannot be reasonably inferred from the repository.
2. A source-backed immigration requirement is ambiguous or conflicts with existing project guidance.
3. The next task requires external credentials, paid services, or environment secrets not present in the repository.
4. The repository enters a broken state that cannot be repaired within the current work cycle.
5. The remaining work depends on human review of trust-sensitive content.

## Output expectations for each cycle

At the end of each cycle:

- code and docs should be committed-ready
- task state should be current
- the work log should explain what happened
- the next recommended task should be identified

## Hard constraints

- Do not remove licensing, disclaimer, trademark, or maintained-source policy files.
- Do not change the product into a generic immigration advice site.
- Do not collapse structured rules into ad hoc page copy.
- Do not present placeholder guidance as verified public guidance.

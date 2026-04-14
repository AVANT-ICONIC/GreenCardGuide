# DEFINITION_OF_DONE

A task is only done when all relevant conditions below are satisfied.

## Universal requirements

- The implementation matches the task objective and acceptance criteria.
- The code, docs, and data changes are internally consistent.
- Naming and structure match the repository's existing conventions.
- No undocumented scope expansion was introduced.
- The work leaves the repository in a better, clearer state than before.

## Documentation requirements

- `docs/WORK_LOG.md` has a fresh entry for the work cycle.
- `docs/TASK_QUEUE.md` reflects the current task state.
- Any source-of-truth docs affected by the change have been updated.
- `README.md` is updated when developer-facing setup or repo structure materially changes.

## Quality requirements

- The strongest available validation checks were run.
- Any unvalidated areas are explicitly recorded in `docs/WORK_LOG.md`.
- Errors, warnings, or known limitations are documented when relevant.

## Product requirements

- The change respects the project mission: bilingual, source-backed, practical preparation for family-based immigrant visa interview readiness.
- Trust-sensitive content is conservative and does not masquerade as verified guidance unless it is actually backed by the repo's source-backed model.
- Deterministic structure is favored over speculative intelligence.

## For code tasks

- New code is typed where the surrounding codebase expects typed code.
- The code is placed in the correct architectural layer.
- The change does not create avoidable duplication.
- Follow-on TODOs, if any, are specific and minimal.

## For content or schema tasks

- Structured data remains machine-readable and consistently shaped.
- Locale implications are considered.
- Placeholder content is clearly labeled when present.

## Not done if

A task is not done if any of the following are true:

- the code compiles only in theory but was not validated where validation was possible
- docs were not updated
- task status was not updated
- the result introduced ambiguous trust-sensitive guidance
- the work leaves blockers undocumented

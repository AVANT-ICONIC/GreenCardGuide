# Seed Data Assumptions

These files provide the current deterministic seed inputs for the Ciudad Juarez family-based MVP path.

## Current files

- `checklist-questions.json`
- `documents.json`
- `requirement-rules.json`

## Shape assumptions

- Checklist question `key` values must map to known `ChecklistAnswers` fields in `src/lib/types/domain.ts`.
- Checklist question `input_type` is currently limited to `select` or `boolean`.
- `select` questions must include a non-empty `options` array.
- Document records currently require only `slug`, bilingual labels, and `category`.
- Requirement rule `conditions` currently support known checklist answer keys only.
- Requirement rule condition values are limited to `string` and `boolean`.
- Requirement rule `output_payload` is intentionally permissive, but each value must currently be a scalar string or number so deterministic consumers can fail early on unexpected nested structures.

## Scope note

These assumptions are intentionally narrow for the current seed set. If later tasks need richer structures, expand the typed loaders and this document in the same cycle.

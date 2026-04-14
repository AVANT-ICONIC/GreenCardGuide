# MASTER_PLAN

This document translates the product strategy into a build sequence for autonomous execution.

## North star

Ship a bilingual, source-backed preparation tool for family-based immigrant visa applicants using Ciudad Juárez as the initial wedge. The first complete product loop should let a user:

- understand the scope of the service
- answer checklist questions
- receive a deterministic preparation checklist
- review major prep phases
- access print-friendly output scaffolding

## Build phases

### Phase 0 — Repo foundations

Goal: make the repository self-describing and safe to iterate on.

Outcomes:
- repo docs organized
- governance and licensing in place
- autonomous work loop in place
- issue and task structure established

### Phase 1 — App skeleton

Goal: establish a working Next.js-style foundation for the app.

Outcomes:
- package configuration
- app shell
- locale-aware routing scaffold
- base layout
- design tokens and shared UI primitives
- placeholder pages wired to docs-informed sections

### Phase 2 — Domain and rules core

Goal: turn the content strategy into structured data and deterministic logic.

Outcomes:
- normalized domain types
- seed question sets
- document definitions
- rule evaluator expansion
- checklist assembly output types
- validation helpers

### Phase 3 — Checklist experience

Goal: implement the primary user value loop.

Outcomes:
- checklist question flow
- session state handling
- branching conditions
- output page with grouped sections
- warnings and confidence labels
- print view scaffolding

### Phase 4 — Content system and bilingual experience

Goal: make informational pages and checklist copy manageable and scalable.

Outcomes:
- structured content loading
- locale dictionaries
- bilingual page routes
- glossary/data content patterns
- placeholder source citation surfaces

### Phase 5 — Trust and admin scaffolding

Goal: support responsible maintenance.

Outcomes:
- source registry stubs
- review status fields
- admin/readme scaffolding expansion
- content change workflow documentation
- visible verified vs placeholder states

### Phase 6 — Quality hardening

Goal: make the repository easy to validate and extend.

Outcomes:
- lint/typecheck/test scripts
- seed data validation tests
- route smoke checks
- stronger definition of done adherence

## Milestone map

### Milestone A
Working repository foundation with autonomous loop and initial task queue.

### Milestone B
Minimal runnable app shell with locale routing and home/checklist placeholders.

### Milestone C
Deterministic checklist question flow wired to seed data.

### Milestone D
Checklist output grouped by required, conditional, backup, and warning sections.

### Milestone E
Bilingual content scaffolding with clear placeholder and verified content boundaries.

## Scope guardrails

Stay focused on:
- family-based immigrant visa prep
- Ciudad Juárez first
- deterministic logic
- practical readiness

Do not expand yet into:
- legal strategy features
- community forum features
- generalized AI advice
- all consulates everywhere
- attorney marketplace functionality

## Planning assumptions

- Existing docs in this repository are the current source of truth.
- Public guidance content may remain partially scaffolded while engineering foundations are built.
- The first meaningful build target is a credible end-to-end skeleton, not production completeness.

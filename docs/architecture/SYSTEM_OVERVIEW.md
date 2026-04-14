# System Overview

## Architecture goals
- Fast public pages for search and sharing
- Deterministic checklist generation
- Structured bilingual content
- Strong traceability from rule to source
- Internal admin for updates and reviews

## Proposed stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Postgres
- Prisma or Drizzle
- Markdown/MDX or structured rich text for editorial pages

## Application layers

### 1. Public content layer
Static and semi-static pages for guides, FAQs, glossary, and post-specific hubs.

### 2. Guided prep layer
Question flow + deterministic rules engine that outputs personalized checklist sections.

### 3. Trust/update layer
Source registry, content review records, last-reviewed dates, change log, review states.

### 4. Internal operations layer
Admin tools for content editing, source mapping, rule management, and review queues.

## Rendering strategy
- Static rendering for public guides and glossary where possible
- Server rendering for personalized checklist results
- Print-friendly dedicated routes for checklist output

## Rules engine posture
Use explicit deterministic rules.

Do not use an LLM to decide what is required.

The LLM, if later added, should only explain approved requirements and help users navigate existing source-backed content.

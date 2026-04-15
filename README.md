# Consular Prep

A bilingual, source-backed prep tool for immigrant visa interviews, starting with **family-based cases at Ciudad Juárez**.

The product goal is simple:

> Help families know exactly what to print, pack, and bring so they do not get delayed or turned away for avoidable reasons.

This repository is a **repo seed**: product direction, information architecture, technical architecture, content governance, seed data structures, and an implementation roadmap.

## Initial wedge

- **Post:** Ciudad Juárez
- **Case family:** Family-based immigrant visa interviews
- **Languages:** English and Spanish
- **Core experience:** Personalized checklist + interview-week prep + practical mistake prevention

## What this repo includes

- Product strategy and scope
- Information architecture and page map
- Technical architecture and data model
- Rules-engine seed structures
- Bilingual content strategy
- Trust, update, and governance model
- 90-day roadmap
- Starter issue templates

## What to build first

1. Read `docs/product/PRD.md`
2. Read `docs/architecture/SYSTEM_OVERVIEW.md`
3. Read `docs/content/CONTENT_MODEL.md`
4. Read `docs/ops/ROADMAP.md`
5. Use `data/seed/` to scaffold the first implementation

## Suggested stack

- Next.js
- TypeScript
- Tailwind CSS
- Postgres
- Deterministic rules engine for checklist generation
- Internal admin/CMS for source-backed content maintenance

## Local development

Requirements:
- Node.js 20+
- npm 10+

Commands:

```bash
npm install
npm run dev
```

## Cloudflare deployment

This repository is configured for **Cloudflare Workers** via `@opennextjs/cloudflare`.
For this SSR Next.js app, that is the correct Cloudflare target instead of a plain static Pages deploy.

Local Cloudflare commands:

```bash
npm run preview
npm run deploy
```

Automatic deploys:

- The repository includes `.github/workflows/deploy-cloudflare-workers.yml`.
- Add `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` as GitHub Actions secrets.
- Pushes to `main` will lint, typecheck, and deploy automatically.
- If you want a different worker name, update `name` in `wrangler.jsonc` before the first production deploy.

If you prefer Cloudflare-hosted Git integration instead of GitHub Actions, import the repo into **Workers Builds** and use the same repo config already checked in here.

Validation:

```bash
npm run validate:seed
npm run validate:admin
npm run validate:admin-home-markers
npm run validate:admin-section-registry
npm run validate:admin-subsections
npm run validate:cloudflare
npm run validate:generated-artifacts
npm run validate:checklist
npm run validate:ciudad-juarez
npm run validate:content-diff
npm run validate:content-inventory-markers
npm run validate:content-inventory
npm run validate:content-review-metadata
npm run validate:content-surfaces
npm run validate:documents
npm run validate:feedback
npm run validate:feedback-summary
npm run validate:faq-glossary
npm run validate:guides
npm run validate:language-entry
npm run validate:locale-layout
npm run validate:locale
npm run validate:source-mappings
npm run validate:source-registry-order
npm run validate:source-references
npm run validate:publish
npm run validate:rules-audit-markers
npm run validate:rule-integrity
npm run validate:rules
npm run validate:review-queue-markers
npm run validate:reviews
npm run validate:source-dashboard
npm run validate:source-dashboard-markers
npm run validate:sources
npm run validate:routes
npm run lint
npm run typecheck
npm run build
```

Current state:
- The repository now includes a runnable Next.js App Router scaffold.
- Locale-aware routes, the first deterministic checklist flow, and a dedicated print view are now wired.
- A repeatable content-loading scaffold now powers bilingual guide pages, and the `what-to-bring` guide now groups the seeded packet into checklist-first, core, conditional, and uncovered-library sections.
- A post-specific Ciudad Juarez hub route now separates checklist, documents, and guide paths so users can choose between answer-driven output and browse-first packet planning from one bilingual entry point.
- FAQ and glossary route scaffolds now exist for both locales using the same placeholder-vs-verified content model.
- A typed source-registry stub now supports consistent placeholder source attachment across content surfaces.
- A bilingual documents overview route now exposes the seeded document set through the same trust-aware content layer.
- Bilingual document detail routes now let each seeded document explain its current deterministic checklist coverage without inventing new guidance.
- The documents overview now distinguishes seeded documents already covered by active checklist rules from those still uncovered.
- The `what-to-bring` guide now links directly into seeded document detail routes so users can move from packet planning into the current document library without hitting a dead end.
- A bilingual feedback route now defines the public feedback surface, while making its non-persistent placeholder state explicit.
- An `/admin` landing scaffold now maps the planned internal maintenance surface without claiming unfinished tooling is functional.
- `/admin/content`, `/admin/sources`, `/admin/rules`, and `/admin/reviews` now exist as truthful subsection scaffolds.
- A deterministic `validate:routes` script now checks that the expected route files and route patterns exist.
- `npm run validate:admin-home-markers` now checks the `/admin` component markers, navigation-only posture, and section-link framing without duplicating the broader admin route validation.
- `npm run validate:admin-section-registry` now checks the shared admin section registry, its exported static params and slug guard, and the current route/home consumers without duplicating the broader admin route validation.
- `npm run validate:admin-subsections` now checks that `/admin/[section]` only serves the four documented admin surfaces, keeps the final `notFound()` fallback, and does not reintroduce the removed generic subsection component.
- `npm run validate:cloudflare` now checks the intentional Cloudflare Workers integration structure across package scripts, OpenNext/Wrangler config, deployment workflow trigger, runtime, install, checkout, permission, and secret markers, and README deployment framing.
- `npm run validate:generated-artifacts` now checks that `.open-next`, `.wrangler`, `cloudflare-env.d.ts`, and the local `.dev.vars` secret file stay ignored in the repo’s checked-in hygiene posture.
- `/admin/sources` now exposes the current typed source registry through a truthful review-dashboard scaffold.
- `/admin/rules` now exposes the current seeded checklist questions and requirement rules through a read-only audit scaffold.
- `/admin/reviews` now summarizes current placeholder content surfaces in a queue-shaped review scaffold.
- `/admin/content` now summarizes the current guide, FAQ, glossary, documents, and hub surfaces through a read-only content inventory and structural diff scaffold.
- FAQ and glossary content now use stable bilingual identifiers so admin diffing can compare locale structures cleanly.
- `/admin/content` now also exposes a truthful publish-readiness scaffold based on review status, source references, and last-reviewed tracking gates.
- Current guide, FAQ, glossary, documents, and Ciudad Juarez hub pages now expose explicit last-reviewed dates through a shared review-metadata scaffold.
- `/admin/sources` now includes a deterministic source-change review task watchlist that maps registered sources to affected content surfaces.
- Public content surfaces and `/admin/reviews` now use deterministic per-surface source mappings instead of attaching the full placeholder source registry everywhere.
- `/admin/reviews` now assembles a deterministic priority queue with explicit blocker reasons, source-coverage state, and recommended next actions for each tracked surface.
- `npm run validate:reviews` now exercises review-queue ordering and metadata assembly as a repeatable smoke check.
- `npm run validate:admin` now smoke-checks the admin operations routes by validating their backing data loaders and key rendered markers.
- `npm run validate:ciudad-juarez` now checks the Ciudad Juarez hub trust metadata, review date, and mapped source posture in both locales.
- `npm run validate:content-diff` now checks content diff counts, per-surface alignment posture, and key `/admin/content` diff markers.
- `npm run validate:content-inventory-markers` now checks the `/admin/content` component markers, read-only planning posture, and publish gate framing without duplicating the broader inventory, diff, or publish loader validations.
- `npm run validate:content-inventory` now checks tracked-surface counts, bilingual inventory metadata, and key `/admin/content` inventory markers.
- `npm run validate:content-review-metadata` now checks the shared content review-date registry across all current public surfaces in both locales.
- `npm run validate:content-surfaces` now checks the shared content surface registry and its alignment with guide slugs plus source-mapping order.
- `npm run validate:documents` now checks bilingual documents overview copy, seeded category grouping, review metadata, and source mapping.
- `npm run validate:rules-audit-markers` now checks the `/admin/rules` component markers, read-only audit posture, question-key framing, and rule-output inventory markers without duplicating the broader rules audit validation.
- `npm run validate:rules` now checks the admin rules audit baseline, including seeded question counts, rule counts, output-type coverage, and key `/admin/rules` markers.
- `npm run validate:feedback` now exercises feedback validation, local persistence, and inbox ordering without touching the real local inbox file.
- `npm run validate:feedback-summary` now checks feedback summary totals, report-type counts, route aggregation ordering, and key `/admin/reviews` summary markers.
- `npm run validate:faq-glossary` now checks bilingual FAQ and glossary keys, review metadata, and mapped source posture through the shared loaders.
- `npm run validate:guides` now checks guide slugs, bilingual guide structure, packet-guide document-link coverage, shared review metadata, and mapped source posture across the current guide routes.
- `npm run validate:language-entry` now checks the language-entry surface markers and the rendered `English` / `Español` labels.
- `npm run validate:locale-layout` now checks the shared `[lang]` layout markers, bilingual navigation labels, and locale-switcher framing without duplicating route behavior.
- `npm run validate:locale` now checks the shared locale helper for the current bilingual `en` and `es` product posture.
- `npm run validate:source-mappings` now checks the shared source-mapping registry, including per-surface key assignments and mapping order.
- `npm run validate:source-registry-order` now checks source registry ordering, titles, reviewed dates, and governance-reference-only posture through the typed loader.
- `npm run validate:source-references` now checks the typed source-reference loader, governance-reference-only posture, and current repository URL metadata.
- `npm run validate:source-dashboard-markers` now checks the `/admin/sources` component markers, mapped-coverage framing, and governance-reference-only posture without duplicating the broader source dashboard loader validation.
- `npm run validate:publish` now checks publish-readiness counts, required gates, blocker assembly, and key `/admin/content` publish markers.
- `npm run validate:rule-integrity` now checks that seeded rule document references resolve and that the assembled checklist output still lands in the expected deterministic sections.
- `npm run validate:review-queue-markers` now checks the `/admin/reviews` component markers, deterministic queue framing, and local-feedback-only posture without duplicating the broader review-queue loader validation.
- `npm run validate:source-dashboard` now validates source coverage counts and watchlist route linkage for the admin sources surface.
- The public feedback route now validates and persists local submissions into a repo-backed review inbox, and `/admin/reviews` exposes those stored reports as actionable maintenance input.
- `/admin/reviews` now summarizes stored feedback by report type and most-reported routes before the detailed inbox list.
- `/admin/sources` now shows direct source-to-surface coverage counts and routes alongside the separate change-watchlist tasks.
- The checklist seed now surfaces the base sponsor financial packet through the existing `i-864` document for family-based Ciudad Juarez cases.
- The checklist now surfaces a deterministic risk flag when the applicant does not have a current passport ready.
- The checklist now routes arrest or court-record scenarios into a conservative `verify with official instructions` output instead of leaving that answer unused.
- The checklist flow, results, and print views now show localized human-readable answer labels instead of raw internal slugs.
- The checklist results and print views now add role-aware framing for principal applicants, derivative applicants, and sponsor/helpers.
- Checklist results and print now link document-backed items into the seeded bilingual document detail routes.
- The checklist flow now resumes at the first unanswered step, and incomplete results or print requests are redirected back into the guided question flow.
- Checklist answer parsing and question-route canonicalization now drop unsupported URL values so only seeded answers survive into deterministic flow state and checklist output.
- `npm run validate:checklist` now exercises checklist parsing, resume logic, completion guards, and seeded result assembly as a repeatable smoke check.

## Non-negotiables

- Official-source anchored
- Bilingual by design
- Mobile-first
- Printable outputs
- Conservative wording
- Visible review dates and source references
- No freeform AI logic for requirements until source discipline exists

## Repository map

```text
.
├── README.md
├── docs/
│   ├── product/
│   ├── architecture/
│   ├── content/
│   └── ops/
├── data/
│   ├── feedback/
│   ├── seed/
│   └── sources/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   │   ├── content/
│   │   ├── rules/
│   │   └── types/
│   └── admin/
└── .github/
    └── ISSUE_TEMPLATE/
```

## Product posture

This project should act as a **plain-language, practical wrapper around official guidance**, not a replacement for official instructions or legal advice.


## Licensing and governance

This repository uses a split-license, public-interest model:

- **Code and repo infrastructure:** Apache 2.0 (`LICENSE`)
- **Editorial and structured guidance content:** CC BY-SA 4.0 (`CONTENT_LICENSE.md`)
- **Project name, logo, and brand identifiers:** reserved (`TRADEMARKS.md`)

Supporting governance docs:
- `DISCLAIMER.md`
- `MAINTAINED_SOURCE_POLICY.md`
- `CONTRIBUTING.md`

This structure is designed to keep the project open, reusable, and durable while making it clear which version is the maintained canonical source.


## Autonomous build loop

This repository includes a file-driven autonomous work loop for Codex-style agents.

Start here:
- `docs/AGENT_LOOP.md`

Supporting project-state files:
- `docs/MASTER_PLAN.md`
- `docs/TASK_QUEUE.md`
- `docs/WORK_LOG.md`
- `docs/DEFINITION_OF_DONE.md`

Recommended operator prompt:

```text
Use `$repo-work-loop`.

Read `docs/AGENT_LOOP.md` and follow it exactly.
Treat `docs/AGENT_LOOP.md` as the repository's source of truth for workflow, queue refill, blocker handling, validation, documentation updates, and git expectations.
Do not invent requirements beyond the repo docs.
```

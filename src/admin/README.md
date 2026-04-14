# Admin surface

Suggested first admin capabilities:
- edit content pages
- attach source references
- review/update last-reviewed dates
- edit deterministic rules
- publish/unpublish content

Current scaffold:
- `/admin` landing page exists as a truthful orientation surface only
- `/admin/content` now provides a read-only content inventory and structural diff scaffold over the current guide, FAQ, glossary, documents, and hub surfaces
- `/admin/sources`, `/admin/rules`, and `/admin/reviews` now expose read-only source, rules, and review dashboards
- content, sources, rules, and reviews are still not implemented as editing or publish tools yet

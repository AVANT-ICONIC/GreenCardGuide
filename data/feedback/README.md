# Feedback storage

This directory stores local feedback submissions for the public `/[lang]/feedback`
route.

- `submissions.json` is created automatically at runtime when the first valid
  feedback report is saved.
- The file is intentionally ignored in git because it is local operational
  inbox data, not seed content.
- `/admin/reviews` reads the stored submissions as a maintenance inbox only. No
  moderation or publishing workflow is implied by this storage layer.

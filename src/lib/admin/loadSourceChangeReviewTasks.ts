import { loadReviewQueueEntries } from '@/lib/admin/loadReviewQueue';
import { loadSourceReferences } from '@/lib/content/loadSourceReferences';

export interface SourceChangeReviewTask {
  task_key: string;
  source_key: string;
  source_title: string;
  status: 'watching' | 'needs_baseline_review';
  trigger: string;
  affected_routes: string[];
  note: string;
}

export function loadSourceChangeReviewTasks(): SourceChangeReviewTask[] {
  const reviewEntries = loadReviewQueueEntries();

  return loadSourceReferences().map((reference) => {
    const affectedRoutes = reviewEntries
      .filter((entry) => entry.source_references.includes(reference.source_key))
      .map((entry) => entry.route);

    const status = reference.reviewed_at ? 'watching' : 'needs_baseline_review';

    return {
      task_key: `source-change:${reference.source_key}`,
      source_key: reference.source_key,
      source_title: reference.title,
      status,
      trigger: reference.reviewed_at
        ? 'If this source changes, open a follow-up review task for every affected surface.'
        : 'No baseline review date is recorded yet; establish one before source-change monitoring can be trusted.',
      affected_routes: affectedRoutes,
      note: reference.reviewed_at
        ? 'This is a deterministic watchlist task only. Change detection is not implemented yet.'
        : 'This source still needs a baseline review checkpoint before future source-change tasks can be reliable.',
    } satisfies SourceChangeReviewTask;
  });
}

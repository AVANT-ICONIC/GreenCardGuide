import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadFeedbackSummary } from './loadFeedbackSummary';
import { loadReviewQueueSummary } from './loadReviewQueue';
import { loadStoredFeedbackSubmissions } from '@/lib/feedback/storage';

const requiredMarkers = [
  'Admin reviews',
  'Deterministic review queue.',
  'Tracked surfaces:',
  'Placeholder surfaces:',
  'High priority:',
  'Medium priority:',
  'Low priority:',
  'Under-sourced surfaces:',
  'Stale reviews:',
  'Stored feedback reports:',
  'Review recency:',
  'Blocker reason:',
  'Recommended next action:',
  'Feedback inbox posture:',
  'Local review input only',
  'Current limitation:',
  'No moderation or publish tooling exists yet.',
  'Feedback summary',
  'Total reports:',
  'By type:',
  'Most reported routes:',
  'Feedback inbox',
  'No stored feedback submissions yet.',
  'Submission ID:',
  'Back to admin home',
] as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

async function main() {
  const reviewSummary = loadReviewQueueSummary();
  const feedbackItems = await loadStoredFeedbackSubmissions();
  const feedbackSummary = loadFeedbackSummary(feedbackItems);
  const placeholderCount = reviewSummary.entries.filter(
    (entry) => entry.review_status === 'placeholder',
  ).length;

  assert(reviewSummary.entries.length > 0, 'Expected review queue entries');
  assert(
    reviewSummary.highPriorityCount +
      reviewSummary.mediumPriorityCount +
      reviewSummary.lowPriorityCount ===
      reviewSummary.entries.length,
    'Expected review priority counts to add up to the total tracked surfaces',
  );
  assert(
    reviewSummary.underSourcedCount <= reviewSummary.entries.length,
    'Expected under-sourced surface count to stay within the tracked review surfaces',
  );
  assert(
    placeholderCount > 0,
    'Expected at least one placeholder review surface in the current queue posture',
  );
  assert(
    reviewSummary.entries.every((entry) => entry.blocker_reason.length > 0),
    'Expected every review queue entry to retain a blocker reason',
  );
  assert(
    reviewSummary.entries.every((entry) => entry.recommended_next_action.length > 0),
    'Expected every review queue entry to retain a recommended next action',
  );
  assert(
    feedbackSummary.total === feedbackItems.length,
    'Expected feedback summary total to match stored feedback item count',
  );

  const componentPath = resolve(process.cwd(), 'src/components/admin-reviews-page.tsx');
  assert(existsSync(componentPath), 'Expected admin reviews page component to exist');

  const componentSource = readFileSync(componentPath, 'utf8');
  for (const marker of requiredMarkers) {
    assert(
      componentSource.includes(marker),
      `Expected marker "${marker}" in src/components/admin-reviews-page.tsx`,
    );
  }

  assert(
    componentSource.includes("{summary.entries.map((entry) => ("),
    'Expected admin reviews page to iterate over review queue entries',
  );
  assert(
    componentSource.includes("{feedbackItems.length === 0 ? ("),
    'Expected admin reviews page to keep the empty-state branch for the feedback inbox',
  );
  assert(
    componentSource.includes('feedbackItems.map((item) => ('),
    'Expected admin reviews page to iterate over stored feedback items',
  );
  assert(
    componentSource.includes('{feedbackSummary.total}'),
    'Expected admin reviews page to render the feedback summary total',
  );
  assert(
    componentSource.includes('feedbackSummary.routeCounts'),
    'Expected admin reviews page to render most-reported route summary data',
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        trackedSurfaces: reviewSummary.entries.length,
        placeholderSurfaces: placeholderCount,
        underSourcedSurfaces: reviewSummary.underSourcedCount,
        storedFeedbackReports: feedbackItems.length,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

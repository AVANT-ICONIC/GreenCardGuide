import { loadReviewQueueSummary } from './loadReviewQueue';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const summary = loadReviewQueueSummary();
  const entries = summary.entries;

  assert(entries.length > 0, 'Expected at least one review queue entry');
  assert(
    summary.highPriorityCount + summary.mediumPriorityCount + summary.lowPriorityCount ===
      entries.length,
    'Expected priority counts to add up to the entry count',
  );
  assert(
    summary.underSourcedCount ===
      entries.filter(
        (entry) =>
          entry.source_coverage === 'missing' ||
          entry.source_coverage === 'governance_only',
      ).length,
    'Expected under-sourced count to match queue entries',
  );
  assert(
    summary.highPriorityCount === 2,
    `Expected 2 high-priority review entries, received ${summary.highPriorityCount}`,
  );
  assert(
    summary.underSourcedCount === entries.length,
    'Expected all current review surfaces to remain under-sourced in the placeholder posture',
  );

  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    const nextEntry = entries[index + 1];

    assert(entry.surface.length > 0, `Expected a surface label for entry ${index}`);
    assert(entry.route.startsWith('/'), `Expected route to start with "/" for ${entry.surface}`);
    assert(
      entry.priority_score >= 0,
      `Expected non-negative priority score for ${entry.surface}`,
    );
    assert(
      entry.blocker_reason.length > 0,
      `Expected blocker reason for ${entry.surface}`,
    );
    assert(
      entry.recommended_next_action.length > 0,
      `Expected recommended next action for ${entry.surface}`,
    );

    if (nextEntry) {
      assert(
        entry.priority_score >= nextEntry.priority_score,
        `Expected queue sorting by descending priority score between ${entry.surface} and ${nextEntry.surface}`,
      );
    }
  }

  assert(
    entries[0]?.surface === 'Ciudad Juarez hub',
    `Expected Ciudad Juarez hub to remain first in the review queue, received "${entries[0]?.surface}"`,
  );
  assert(
    entries[1]?.surface === 'Documents overview',
    `Expected Documents overview to remain second in the review queue, received "${entries[1]?.surface}"`,
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        trackedSurfaces: entries.length,
        highPriorityCount: summary.highPriorityCount,
        mediumPriorityCount: summary.mediumPriorityCount,
        lowPriorityCount: summary.lowPriorityCount,
        underSourcedCount: summary.underSourcedCount,
        staleCount: summary.staleCount,
        orderedSurfaces: entries.map((entry) => ({
          surface: entry.surface,
          priority: entry.review_priority,
          priorityScore: entry.priority_score,
        })),
      },
      null,
      2,
    ),
  );
}

main();

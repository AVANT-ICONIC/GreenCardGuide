import { contentSurfaceKeys, loadContentReviewMetadata } from './loadContentReviewMetadata';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  assert(
    contentSurfaceKeys.join(',') ===
      'ciudad-juarez,documents,faq,glossary,what-to-bring,originals-vs-copies,interview-week-plan,common-mistakes',
    `Unexpected content surface key order: ${contentSurfaceKeys.join(',')}`,
  );

  const englishDates = contentSurfaceKeys.map((surface) => ({
    surface,
    last_reviewed_at: loadContentReviewMetadata('en', surface).last_reviewed_at,
  }));
  const spanishDates = contentSurfaceKeys.map((surface) => ({
    surface,
    last_reviewed_at: loadContentReviewMetadata('es', surface).last_reviewed_at,
  }));

  for (const entry of [...englishDates, ...spanishDates]) {
    assert(
      entry.last_reviewed_at === '2026-04-14',
      `Expected 2026-04-14 review date for ${entry.surface}, received ${entry.last_reviewed_at}`,
    );
  }

  assert(
    englishDates.map((entry) => entry.last_reviewed_at).join(',') ===
      spanishDates.map((entry) => entry.last_reviewed_at).join(','),
    'Expected English and Spanish review metadata to stay aligned across all surfaces',
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        surfaceCount: contentSurfaceKeys.length,
        surfaces: englishDates,
      },
      null,
      2,
    ),
  );
}

main();

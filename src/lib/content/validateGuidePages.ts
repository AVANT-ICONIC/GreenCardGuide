import { listGuideSlugs, loadGuidePage } from './loadGuidePage';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const slugs = listGuideSlugs();

  assert(
    slugs.join(',') ===
      'what-to-bring,originals-vs-copies,interview-week-plan,common-mistakes',
    `Unexpected guide slug order: ${slugs.join(',')}`,
  );

  const englishGuides = slugs.map((slug) => loadGuidePage('en', slug));
  const spanishGuides = slugs.map((slug) => loadGuidePage('es', slug));

  for (const guide of [...englishGuides, ...spanishGuides]) {
    assert(guide.review_status === 'placeholder', `Expected placeholder review status for ${guide.slug}/${guide.language}`);
    assert(
      guide.confidence_label === 'verify_with_official',
      `Expected verify_with_official confidence for ${guide.slug}/${guide.language}`,
    );
    assert(
      guide.last_reviewed_at === '2026-04-14',
      `Expected 2026-04-14 review date for ${guide.slug}/${guide.language}, received ${guide.last_reviewed_at ?? 'missing'}`,
    );
    assert(
      guide.source_references.join(',') ===
        'maintained-source-policy,trust-and-safety-policy',
      `Unexpected source references for ${guide.slug}/${guide.language}: ${guide.source_references.join(',')}`,
    );
    assert(
      guide.sections.length === 2,
      `Expected 2 sections for ${guide.slug}/${guide.language}, received ${guide.sections.length}`,
    );
  }

  const englishTitles = Object.fromEntries(
    englishGuides.map((guide) => [guide.slug, guide.title]),
  );
  const spanishTitles = Object.fromEntries(
    spanishGuides.map((guide) => [guide.slug, guide.title]),
  );

  assert(englishTitles['what-to-bring'] === 'What to bring', 'Unexpected English title for what-to-bring');
  assert(spanishTitles['what-to-bring'] === 'Que llevar', 'Unexpected Spanish title for what-to-bring');
  assert(
    englishTitles['originals-vs-copies'] === 'Originals vs copies',
    'Unexpected English title for originals-vs-copies',
  );
  assert(
    spanishTitles['originals-vs-copies'] === 'Originales y copias',
    'Unexpected Spanish title for originals-vs-copies',
  );
  assert(
    englishTitles['interview-week-plan'] === 'Interview week plan',
    'Unexpected English title for interview-week-plan',
  );
  assert(
    spanishTitles['interview-week-plan'] === 'Plan de la semana de entrevista',
    'Unexpected Spanish title for interview-week-plan',
  );
  assert(
    englishTitles['common-mistakes'] === 'Common mistakes',
    'Unexpected English title for common-mistakes',
  );
  assert(
    spanishTitles['common-mistakes'] === 'Errores comunes',
    'Unexpected Spanish title for common-mistakes',
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        guideSlugs: slugs,
        guides: slugs.map((slug, index) => ({
          slug,
          title_en: englishGuides[index]?.title,
          title_es: spanishGuides[index]?.title,
          sections_en: englishGuides[index]?.sections.length,
          sections_es: spanishGuides[index]?.sections.length,
          lastReviewedAt: englishGuides[index]?.last_reviewed_at,
        })),
      },
      null,
      2,
    ),
  );
}

main();

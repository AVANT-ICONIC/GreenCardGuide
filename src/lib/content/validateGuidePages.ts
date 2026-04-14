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
      guide.sections.length ===
        (guide.slug === 'what-to-bring' ? 4 : 2),
      `Unexpected section count for ${guide.slug}/${guide.language}: ${guide.sections.length}`,
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

  const englishBringGuide = englishGuides.find((guide) => guide.slug === 'what-to-bring');
  const spanishBringGuide = spanishGuides.find((guide) => guide.slug === 'what-to-bring');

  assert(englishBringGuide, 'Expected English what-to-bring guide');
  assert(spanishBringGuide, 'Expected Spanish what-to-bring guide');
  assert(
    englishBringGuide.sections[0]?.links?.length === 2,
    `Expected 2 checklist links in English what-to-bring guide, received ${englishBringGuide.sections[0]?.links?.length ?? 0}`,
  );
  assert(
    englishBringGuide.sections[1]?.links?.length === 2,
    `Expected 2 core packet links in English what-to-bring guide, received ${englishBringGuide.sections[1]?.links?.length ?? 0}`,
  );
  assert(
    englishBringGuide.sections[2]?.links?.length === 3,
    `Expected 3 conditional packet links in English what-to-bring guide, received ${englishBringGuide.sections[2]?.links?.length ?? 0}`,
  );
  assert(
    englishBringGuide.sections[3]?.links?.length === 4,
    `Expected 4 uncovered library links in English what-to-bring guide, received ${englishBringGuide.sections[3]?.links?.length ?? 0}`,
  );
  assert(
    englishBringGuide.sections[1]?.links?.[0]?.href === '/en/documents/passport',
    `Unexpected first English core packet href: ${englishBringGuide.sections[1]?.links?.[0]?.href ?? 'missing'}`,
  );
  assert(
    englishBringGuide.sections[1]?.links?.[1]?.href === '/en/documents/i-864',
    `Unexpected second English core packet href: ${englishBringGuide.sections[1]?.links?.[1]?.href ?? 'missing'}`,
  );
  assert(
    spanishBringGuide.sections[1]?.links?.[0]?.href === '/es/documents/passport',
    `Unexpected first Spanish core packet href: ${spanishBringGuide.sections[1]?.links?.[0]?.href ?? 'missing'}`,
  );
  assert(
    spanishBringGuide.sections[1]?.links?.[1]?.href === '/es/documents/i-864',
    `Unexpected second Spanish core packet href: ${spanishBringGuide.sections[1]?.links?.[1]?.href ?? 'missing'}`,
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

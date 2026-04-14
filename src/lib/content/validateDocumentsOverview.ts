import { loadDocumentsOverview } from './loadDocumentsOverview';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const english = loadDocumentsOverview('en');
  const spanish = loadDocumentsOverview('es');

  assert(english.language === 'en', `Expected English documents overview language "en", received "${english.language}"`);
  assert(spanish.language === 'es', `Expected Spanish documents overview language "es", received "${spanish.language}"`);
  assert(
    english.review_status === 'placeholder' && spanish.review_status === 'placeholder',
    'Expected both documents overview locales to remain placeholder',
  );
  assert(
    english.confidence_label === 'verify_with_official' &&
      spanish.confidence_label === 'verify_with_official',
    'Expected both documents overview locales to remain verify_with_official',
  );
  assert(
    english.last_reviewed_at === '2026-04-14' &&
      spanish.last_reviewed_at === '2026-04-14',
    'Expected documents overview review date to remain 2026-04-14 in both locales',
  );
  assert(
    english.source_references.join(',') === 'maintained-source-policy,trust-and-safety-policy',
    `Unexpected English documents overview sources: ${english.source_references.join(',')}`,
  );
  assert(
    spanish.source_references.join(',') === 'maintained-source-policy,trust-and-safety-policy',
    `Unexpected Spanish documents overview sources: ${spanish.source_references.join(',')}`,
  );

  const expectedCategories = ['identity', 'appointment', 'civil', 'financial'];
  assert(
    english.sections.map((section) => section.category).join(',') === expectedCategories.join(','),
    `Unexpected English documents categories: ${english.sections.map((section) => section.category).join(',')}`,
  );
  assert(
    spanish.sections.map((section) => section.category).join(',') === expectedCategories.join(','),
    `Unexpected Spanish documents categories: ${spanish.sections.map((section) => section.category).join(',')}`,
  );

  const englishCategoryTitles = english.sections.map((section) => section.title);
  const spanishCategoryTitles = spanish.sections.map((section) => section.title);
  assert(
    englishCategoryTitles.join(',') ===
      'Identity documents,Appointment and confirmation documents,Civil documents,Financial support documents',
    `Unexpected English documents category titles: ${englishCategoryTitles.join(',')}`,
  );
  assert(
    spanishCategoryTitles.join(',') ===
      'Documentos de identidad,Documentos de cita y confirmacion,Documentos civiles,Documentos de patrocinio economico',
    `Unexpected Spanish documents category titles: ${spanishCategoryTitles.join(',')}`,
  );

  const englishDocumentCounts = english.sections.map((section) => section.documents.length);
  const spanishDocumentCounts = spanish.sections.map((section) => section.documents.length);
  assert(
    englishDocumentCounts.join(',') === '1,2,4,2',
    `Unexpected English documents section counts: ${englishDocumentCounts.join(',')}`,
  );
  assert(
    spanishDocumentCounts.join(',') === '1,2,4,2',
    `Unexpected Spanish documents section counts: ${spanishDocumentCounts.join(',')}`,
  );

  const englishSlugs = english.sections.flatMap((section) =>
    section.documents.map((document) => document.slug),
  );
  const spanishSlugs = spanish.sections.flatMap((section) =>
    section.documents.map((document) => document.slug),
  );
  assert(
    englishSlugs.join(',') === spanishSlugs.join(','),
    'Expected English and Spanish documents overview to expose the same document slugs',
  );
  assert(
    englishSlugs.join(',') ===
      'passport,appointment-letter,ds-260-confirmation,birth-certificate,marriage-certificate,marriage-termination-records,child-birth-certificates,i-864,joint-sponsor-financial-packet',
    `Unexpected documents overview slug order: ${englishSlugs.join(',')}`,
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        languages: [english.language, spanish.language],
        reviewDate: english.last_reviewed_at,
        categories: english.sections.map((section) => ({
          category: section.category,
          title_en: section.title,
          title_es:
            spanish.sections.find((candidate) => candidate.category === section.category)
              ?.title ?? null,
          count: section.documents.length,
        })),
        documentSlugs: englishSlugs,
      },
      null,
      2,
    ),
  );
}

main();

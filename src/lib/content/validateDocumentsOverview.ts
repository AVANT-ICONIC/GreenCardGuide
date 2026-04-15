import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadDocumentsOverview } from './loadDocumentsOverview';
import { loadDocumentDetailPage } from './loadDocumentDetailPage';

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
    section.documents.map((entry) => entry.document.slug),
  );
  const spanishSlugs = spanish.sections.flatMap((section) =>
    section.documents.map((entry) => entry.document.slug),
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

  const englishPassport = loadDocumentDetailPage('en', 'passport');
  const spanishPassport = loadDocumentDetailPage('es', 'passport');
  const englishAppointmentLetter = loadDocumentDetailPage('en', 'appointment-letter');
  const englishPassportOverview = english.sections[0]?.documents[0];
  const englishAppointmentOverview = english.sections[1]?.documents[0];

  assert(
    englishPassport.document.slug === 'passport' && spanishPassport.document.slug === 'passport',
    'Expected the passport detail loader to resolve the passport document in both locales',
  );
  assert(
    englishPassport.category_title === 'Identity documents' &&
      spanishPassport.category_title === 'Documentos de identidad',
    'Expected localized category titles for the passport detail page',
  );
  assert(
    englishPassport.review_status === 'placeholder' &&
      spanishPassport.review_status === 'placeholder',
    'Expected document detail pages to keep the placeholder trust posture',
  );
  assert(
    englishPassport.source_references.join(',') === english.source_references.join(',') &&
      spanishPassport.source_references.join(',') === spanish.source_references.join(','),
    'Expected document detail pages to inherit the documents surface source references',
  );
  assert(
    englishPassport.references.length === 1 &&
      englishPassport.references[0]?.rule_key === 'base-cdj-family-documents',
    `Expected passport detail coverage from the base required-document rule, received ${englishPassport.references.map((reference) => reference.rule_key).join(',')}`,
  );
  assert(
    englishPassport.references[0]?.conditions
      .map((condition) => `${condition.label}:${condition.value}`)
      .join(',') ===
      'Where is the interview?:Ciudad Juarez,What kind of immigrant visa case is this?:Family-based immigrant visa',
    `Unexpected localized passport conditions: ${englishPassport.references[0]?.conditions.map((condition) => `${condition.label}:${condition.value}`).join(',')}`,
  );
  assert(
    englishAppointmentLetter.references.length === 0,
    `Expected appointment-letter detail coverage to remain empty, received ${englishAppointmentLetter.references.length}`,
  );
  assert(
    englishPassportOverview?.document.slug === 'passport' &&
      englishPassportOverview.reference_count === 1 &&
      englishPassportOverview.output_types.join(',') === 'required_document' &&
      englishPassportOverview.is_covered === true,
    `Unexpected passport overview coverage: ${JSON.stringify(englishPassportOverview)}`,
  );
  assert(
    englishAppointmentOverview?.document.slug === 'appointment-letter' &&
      englishAppointmentOverview.reference_count === 0 &&
      englishAppointmentOverview.output_types.length === 0 &&
      englishAppointmentOverview.is_covered === false,
    `Unexpected appointment-letter overview coverage: ${JSON.stringify(englishAppointmentOverview)}`,
  );

  const componentPath = resolve(process.cwd(), 'src/components/document-detail-page.tsx');
  assert(existsSync(componentPath), 'Expected document detail component to exist');

  const componentSource = readFileSync(componentPath, 'utf8');
  for (const marker of [
    'Back to documents overview',
    'Open packet guide',
    'Start checklist',
    'Use this document in the prep flow',
  ]) {
    assert(
      componentSource.includes(marker),
      `Expected marker "${marker}" in src/components/document-detail-page.tsx`,
    );
  }

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
        detailCoverage: {
          passportRuleKeys: englishPassport.references.map((reference) => reference.rule_key),
          uncoveredDocument: englishAppointmentLetter.document.slug,
          uncoveredReferenceCount: englishAppointmentLetter.references.length,
        },
        overviewCoverage: {
          coveredDocument: englishPassportOverview?.document.slug ?? null,
          coveredRuleCount: englishPassportOverview?.reference_count ?? null,
          uncoveredDocument: englishAppointmentOverview?.document.slug ?? null,
          uncoveredRuleCount: englishAppointmentOverview?.reference_count ?? null,
        },
      },
      null,
      2,
    ),
  );
}

main();

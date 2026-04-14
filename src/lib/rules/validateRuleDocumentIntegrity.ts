import { parseChecklistAnswers } from '@/lib/checklist/answers';
import { loadChecklistQuestions, loadDocuments, loadRequirementRules } from '@/lib/seed/loadSeedData';
import { assembleChecklistResults } from './assembleChecklistResults';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const questions = loadChecklistQuestions();
  const documents = loadDocuments();
  const rules = loadRequirementRules();
  const documentsBySlug = new Map(documents.map((document) => [document.slug, document]));

  const referencedDocumentSlugs = rules
    .map((rule) =>
      typeof rule.output_payload.document_slug === 'string'
        ? rule.output_payload.document_slug
        : null,
    )
    .filter((slug): slug is string => slug !== null);

  for (const slug of referencedDocumentSlugs) {
    assert(
      documentsBySlug.has(slug),
      `Expected seeded rule document slug "${slug}" to exist in documents.json`,
    );
  }

  const completeAnswers = parseChecklistAnswers(
    {
      post: 'ciudad-juarez',
      case_family: 'family-based',
      applicant_role: 'principal-applicant',
      joint_sponsor: 'true',
      has_prior_marriage: 'true',
      children_immigrating: 'true',
      needs_court_records: 'true',
      passport_ready: 'false',
    },
    questions,
  );
  const result = assembleChecklistResults(completeAnswers, rules, documents);

  assert(
    result.matched_rules.length === 8,
    `Expected 8 matched rules for the seeded complete answer set, received ${result.matched_rules.length}`,
  );

  const requiredDocuments =
    result.sections
      .find((section) => section.key === 'required_documents')
      ?.items.map((item) => item.document_slug) ?? [];
  const conditionalDocuments =
    result.sections
      .find((section) => section.key === 'conditional_documents')
      ?.items.map((item) => item.document_slug) ?? [];
  const printItems =
    result.sections
      .find((section) => section.key === 'print_items')
      ?.items.map((item) => item.item_key) ?? [];
  const riskFlags =
    result.sections
      .find((section) => section.key === 'risk_flags')
      ?.items.map((item) => item.item_key) ?? [];
  const verifyItems =
    result.sections
      .find((section) => section.key === 'verify_with_official')
      ?.items.map((item) => item.item_key) ?? [];

  assert(
    requiredDocuments.join(',') === 'passport,i-864',
    `Expected required document slugs passport and i-864, received ${requiredDocuments.join(',')}`,
  );
  assert(
    conditionalDocuments.join(',') ===
      'marriage-termination-records,child-birth-certificates,joint-sponsor-financial-packet',
    `Unexpected conditional document slugs: ${conditionalDocuments.join(',')}`,
  );
  assert(
    printItems.join(',') === 'confirmations-and-letters',
    `Expected print item confirmations-and-letters, received ${printItems.join(',')}`,
  );
  assert(
    riskFlags.join(',') === 'passport-not-ready',
    `Expected risk flag passport-not-ready, received ${riskFlags.join(',')}`,
  );
  assert(
    verifyItems.join(',') === 'court-record-review',
    `Expected verify-with-official item court-record-review, received ${verifyItems.join(',')}`,
  );

  const emptySections = result.sections
    .filter((section) => section.items.length === 0)
    .map((section) => section.key);
  assert(
    emptySections.includes('backup_documents') &&
      emptySections.includes('prep_steps') &&
      emptySections.includes('do_not_bring'),
    `Expected backup_documents, prep_steps, and do_not_bring sections to remain empty, received ${emptySections.join(',')}`,
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        documents: documents.length,
        referencedDocumentSlugs,
        matchedRules: result.matched_rules.map((rule) => rule.rule_key),
        sectionItems: {
          requiredDocuments,
          conditionalDocuments,
          printItems,
          riskFlags,
          verifyItems,
          emptySections,
        },
      },
      null,
      2,
    ),
  );
}

main();

import { loadFaqPage } from './loadFaq';
import { loadGlossaryPage } from './loadGlossary';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const faqEn = loadFaqPage('en');
  const faqEs = loadFaqPage('es');
  const glossaryEn = loadGlossaryPage('en');
  const glossaryEs = loadGlossaryPage('es');

  for (const page of [faqEn, faqEs, glossaryEn, glossaryEs]) {
    assert(page.review_status === 'placeholder', `Expected placeholder review status for ${page.language}`);
    assert(
      page.confidence_label === 'verify_with_official',
      `Expected verify_with_official confidence for ${page.language}`,
    );
    assert(
      page.last_reviewed_at === '2026-04-14',
      `Expected 2026-04-14 review date for ${page.language}, received ${page.last_reviewed_at}`,
    );
  }

  assert(
    faqEn.source_references.join(',') === 'repo-disclaimer,trust-and-safety-policy',
    `Unexpected English FAQ sources: ${faqEn.source_references.join(',')}`,
  );
  assert(
    faqEs.source_references.join(',') === 'repo-disclaimer,trust-and-safety-policy',
    `Unexpected Spanish FAQ sources: ${faqEs.source_references.join(',')}`,
  );
  assert(
    glossaryEn.source_references.join(',') === 'maintained-source-policy',
    `Unexpected English glossary sources: ${glossaryEn.source_references.join(',')}`,
  );
  assert(
    glossaryEs.source_references.join(',') === 'maintained-source-policy',
    `Unexpected Spanish glossary sources: ${glossaryEs.source_references.join(',')}`,
  );

  const faqKeysEn = faqEn.items.map((item) => item.key);
  const faqKeysEs = faqEs.items.map((item) => item.key);
  assert(
    faqKeysEn.join(',') === 'what-is-this-site,is-this-legal-advice',
    `Unexpected English FAQ keys: ${faqKeysEn.join(',')}`,
  );
  assert(
    faqKeysEs.join(',') === faqKeysEn.join(','),
    `Expected Spanish FAQ keys to match English keys, received ${faqKeysEs.join(',')}`,
  );

  const glossaryKeysEn = glossaryEn.terms.map((term) => term.term_key);
  const glossaryKeysEs = glossaryEs.terms.map((term) => term.term_key);
  assert(
    glossaryKeysEn.join(',') === 'petitioner,beneficiary',
    `Unexpected English glossary term keys: ${glossaryKeysEn.join(',')}`,
  );
  assert(
    glossaryKeysEs.join(',') === glossaryKeysEn.join(','),
    `Expected Spanish glossary term keys to match English keys, received ${glossaryKeysEs.join(',')}`,
  );

  for (const item of [...faqEn.items, ...faqEs.items]) {
    assert(
      item.source_references.join(',') === 'repo-disclaimer,trust-and-safety-policy',
      `Unexpected FAQ item sources for ${item.language}/${item.key}: ${item.source_references.join(',')}`,
    );
  }

  for (const term of [...glossaryEn.terms, ...glossaryEs.terms]) {
    assert(
      term.source_references.join(',') === 'maintained-source-policy',
      `Unexpected glossary term sources for ${term.language}/${term.term_key}: ${term.source_references.join(',')}`,
    );
  }

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        faq: {
          reviewDate: faqEn.last_reviewed_at,
          keys: faqKeysEn,
          sources: faqEn.source_references,
        },
        glossary: {
          reviewDate: glossaryEn.last_reviewed_at,
          termKeys: glossaryKeysEn,
          sources: glossaryEn.source_references,
        },
      },
      null,
      2,
    ),
  );
}

main();

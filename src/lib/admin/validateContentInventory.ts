import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadContentInventory } from './loadContentInventory';

const requiredMarkers = [
  'Tracked surfaces:',
  'Placeholder surfaces:',
  'Verified surfaces:',
  'Bilingual surfaces:',
] as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const summary = loadContentInventory();

  assert(summary.totalSurfaces === 8, `Expected 8 tracked surfaces, received ${summary.totalSurfaces}`);
  assert(
    summary.placeholderSurfaces === 8,
    `Expected 8 placeholder surfaces, received ${summary.placeholderSurfaces}`,
  );
  assert(
    summary.verifiedSurfaces === 0,
    `Expected 0 verified surfaces, received ${summary.verifiedSurfaces}`,
  );
  assert(
    summary.localizedSurfaces === 8,
    `Expected 8 bilingual surfaces, received ${summary.localizedSurfaces}`,
  );

  for (const item of summary.items) {
    assert(item.locales.join(',') === 'en,es', `Expected bilingual locales for ${item.route}`);
    assert(
      item.review_status === 'placeholder',
      `Expected placeholder review status for ${item.route}, received ${item.review_status}`,
    );
    assert(
      item.confidence_label === 'verify_with_official',
      `Expected verify_with_official confidence for ${item.route}, received ${item.confidence_label}`,
    );
    assert(
      item.last_reviewed_at === '2026-04-14',
      `Expected 2026-04-14 last reviewed date for ${item.route}, received ${item.last_reviewed_at ?? 'missing'}`,
    );
  }

  const documentsItem = summary.items.find((item) => item.route === '/[lang]/documents');
  assert(documentsItem, 'Expected documents overview inventory entry');
  assert(
    documentsItem.entry_count === 18,
    `Expected documents overview entry count 18, received ${documentsItem.entry_count}`,
  );

  const glossaryItem = summary.items.find((item) => item.route === '/[lang]/glossary');
  assert(glossaryItem, 'Expected glossary inventory entry');
  assert(
    glossaryItem.source_references.length === 1 &&
      glossaryItem.source_references[0] === 'maintained-source-policy',
    `Expected glossary source posture to remain maintained-source-policy only, received ${glossaryItem.source_references.join(', ')}`,
  );

  const faqItem = summary.items.find((item) => item.route === '/[lang]/faq');
  assert(faqItem, 'Expected FAQ inventory entry');
  assert(
    faqItem.source_references.join(', ') === 'repo-disclaimer, trust-and-safety-policy',
    `Expected FAQ source posture to remain repo-disclaimer plus trust-and-safety-policy, received ${faqItem.source_references.join(', ')}`,
  );

  const componentPath = resolve(process.cwd(), 'src/components/admin-content-page.tsx');
  assert(existsSync(componentPath), 'Expected admin content page component to exist');

  const componentSource = readFileSync(componentPath, 'utf8');
  for (const marker of requiredMarkers) {
    assert(
      componentSource.includes(marker),
      `Expected marker "${marker}" in src/components/admin-content-page.tsx`,
    );
  }

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        totalSurfaces: summary.totalSurfaces,
        placeholderSurfaces: summary.placeholderSurfaces,
        verifiedSurfaces: summary.verifiedSurfaces,
        localizedSurfaces: summary.localizedSurfaces,
        routes: summary.items.map((item) => ({
          route: item.route,
          entryCount: item.entry_count,
          sources: item.source_references,
        })),
      },
      null,
      2,
    ),
  );
}

main();

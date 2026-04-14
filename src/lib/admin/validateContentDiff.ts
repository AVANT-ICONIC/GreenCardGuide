import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadContentDiffSummary } from './loadContentDiffScaffold';

const requiredMarkers = [
  'Aligned diff entries:',
  'Flagged diff entries:',
  'Diff posture:',
] as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const summary = loadContentDiffSummary();

  assert(summary.entries.length === 8, `Expected 8 content diff entries, received ${summary.entries.length}`);
  assert(
    summary.alignedEntries === 8,
    `Expected 8 aligned content diff entries, received ${summary.alignedEntries}`,
  );
  assert(
    summary.flaggedEntries === 0,
    `Expected 0 flagged content diff entries, received ${summary.flaggedEntries}`,
  );

  for (const entry of summary.entries) {
    assert(
      entry.status === 'aligned',
      `Expected aligned diff status for ${entry.route}, received ${entry.status}`,
    );
    assert(entry.details.length >= 3, `Expected detail rows for ${entry.route}`);
  }

  const faqEntry = summary.entries.find((entry) => entry.route === '/[lang]/faq');
  assert(faqEntry, 'Expected FAQ diff entry');
  assert(
    faqEntry.details.includes('EN keys: is-this-legal-advice, what-is-this-site'),
    'Expected FAQ diff entry to include the current English key set',
  );
  assert(
    faqEntry.details.includes('ES keys: is-this-legal-advice, what-is-this-site'),
    'Expected FAQ diff entry to include the current Spanish key set',
  );

  const glossaryEntry = summary.entries.find((entry) => entry.route === '/[lang]/glossary');
  assert(glossaryEntry, 'Expected glossary diff entry');
  assert(
    glossaryEntry.details.includes('EN term keys: beneficiary, petitioner'),
    'Expected glossary diff entry to include the current English term keys',
  );
  assert(
    glossaryEntry.details.includes('ES term keys: beneficiary, petitioner'),
    'Expected glossary diff entry to include the current Spanish term keys',
  );

  const documentsEntry = summary.entries.find(
    (entry) => entry.route === '/[lang]/documents',
  );
  assert(documentsEntry, 'Expected documents diff entry');
  assert(
    documentsEntry.details.includes('EN categories: appointment, civil, financial, identity'),
    'Expected documents diff entry to include the current English categories',
  );
  assert(
    documentsEntry.details.includes('ES categories: appointment, civil, financial, identity'),
    'Expected documents diff entry to include the current Spanish categories',
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
        alignedEntries: summary.alignedEntries,
        flaggedEntries: summary.flaggedEntries,
        routes: summary.entries.map((entry) => ({
          route: entry.route,
          status: entry.status,
        })),
      },
      null,
      2,
    ),
  );
}

main();

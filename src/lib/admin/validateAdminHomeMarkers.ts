import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { adminSections } from './sections';

const requiredMarkers = [
  'Admin',
  'Internal maintenance surface scaffold.',
  'Status:',
  'Navigation scaffold only',
  'Current scope:',
  'Open ',
] as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  assert(adminSections.length === 4, `Expected 4 admin sections, received ${adminSections.length}`);

  const slugs = adminSections.map((section) => section.slug);
  const titles = adminSections.map((section) => section.title);
  const statuses = adminSections.map((section) => section.status);
  assert(
    slugs.join(',') === 'content,sources,rules,reviews',
    `Unexpected admin section order: ${slugs.join(', ')}`,
  );
  assert(
    titles.join(',') === 'Content,Sources,Rules,Reviews',
    `Unexpected admin section titles: ${titles.join(', ')}`,
  );
  assert(
    statuses.join(',') === 'Read-only inventory,Planned surface,Planned surface,Planned surface',
    `Unexpected admin section statuses: ${statuses.join(', ')}`,
  );

  const componentPath = resolve(process.cwd(), 'src/components/admin-home.tsx');
  assert(existsSync(componentPath), 'Expected admin home component to exist');

  const componentSource = readFileSync(componentPath, 'utf8');
  for (const marker of requiredMarkers) {
    assert(
      componentSource.includes(marker),
      `Expected marker "${marker}" in src/components/admin-home.tsx`,
    );
  }

  for (const section of adminSections) {
    assert(
      section.body.length > 0,
      `Expected admin section "${section.slug}" to include descriptive body copy`,
    );
  }

  assert(
    componentSource.includes('{adminSections.map((section) => ('),
    'Expected admin home component to iterate over the shared admin section registry',
  );
  assert(
    componentSource.includes('href={`/admin/${section.slug}`}'),
    'Expected admin home component to derive section links from the shared admin section slug',
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        sectionCount: adminSections.length,
        slugs,
        titles,
        statuses,
      },
      null,
      2,
    ),
  );
}

main();

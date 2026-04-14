import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  adminSectionSlugs,
  adminSections,
  getAdminSectionStaticParams,
  isAdminSectionSlug,
} from './sections';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  assert(adminSections.length === 4, `Expected 4 admin sections, received ${adminSections.length}`);
  assert(
    adminSectionSlugs.join(',') === 'content,sources,rules,reviews',
    `Unexpected admin section slug order: ${adminSectionSlugs.join(', ')}`,
  );

  const staticParams = getAdminSectionStaticParams();
  assert(
    staticParams.length === adminSectionSlugs.length,
    'Expected static params to cover every admin section slug exactly once',
  );
  assert(
    staticParams.map((entry) => entry.section).join(',') === adminSectionSlugs.join(','),
    `Unexpected admin static params: ${staticParams.map((entry) => entry.section).join(', ')}`,
  );

  for (const slug of adminSectionSlugs) {
    assert(isAdminSectionSlug(slug), `Expected "${slug}" to be accepted as an admin section slug`);
  }

  assert(!isAdminSectionSlug('overview'), 'Did not expect "overview" to be accepted as an admin section slug');
  assert(!isAdminSectionSlug('publish'), 'Did not expect "publish" to be accepted as an admin section slug');

  const homePath = resolve(process.cwd(), 'src/components/admin-home.tsx');
  const routePath = resolve(process.cwd(), 'src/app/admin/[section]/page.tsx');

  assert(existsSync(homePath), 'Expected admin home component to exist');
  assert(existsSync(routePath), 'Expected admin subsection route to exist');

  const homeSource = readFileSync(homePath, 'utf8');
  const routeSource = readFileSync(routePath, 'utf8');

  assert(
    homeSource.includes("{adminSections.map((section) => ("),
    'Expected admin home component to render sections from the shared admin registry',
  );
  assert(
    homeSource.includes('href={`/admin/${section.slug}`}'),
    'Expected admin home component to derive links from the shared admin section slug',
  );
  assert(
    routeSource.includes('return getAdminSectionStaticParams();'),
    'Expected admin subsection route to derive static params from the shared admin section registry',
  );
  assert(
    routeSource.includes('if (!isAdminSectionSlug(section)) {'),
    'Expected admin subsection route to guard unsupported slugs with the shared admin section validator',
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        sectionCount: adminSections.length,
        slugs: adminSectionSlugs,
        staticParams,
      },
      null,
      2,
    ),
  );
}

main();

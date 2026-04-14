import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  adminSectionSlugs,
  getAdminSectionStaticParams,
  isAdminSectionSlug,
} from './sections';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function extractSectionBranches(routeSource: string): string[] {
  return Array.from(routeSource.matchAll(/if \(section === '([^']+)'\) \{/g), (match) => match[1]);
}

function main() {
  const routePath = resolve(process.cwd(), 'src/app/admin/[section]/page.tsx');
  const removedComponentPath = resolve(process.cwd(), 'src/components/admin-section-page.tsx');

  assert(existsSync(routePath), 'Expected admin subsection route to exist');
  assert(
    !existsSync(removedComponentPath),
    'Did not expect the removed generic admin subsection component to exist',
  );

  const routeSource = readFileSync(routePath, 'utf8');
  const staticParams = getAdminSectionStaticParams();
  const branchSlugs = extractSectionBranches(routeSource);
  const uniqueBranchSlugs = Array.from(new Set(branchSlugs));
  const notFoundCalls = routeSource.match(/\bnotFound\(\);/g) ?? [];

  assert(
    staticParams.map((entry) => entry.section).join(',') === adminSectionSlugs.join(','),
    'Expected admin static params to stay aligned with the shared admin section slugs',
  );
  assert(
    uniqueBranchSlugs.length === adminSectionSlugs.length,
    `Expected one explicit route branch per admin section slug, received ${uniqueBranchSlugs.length}`,
  );
  assert(
    uniqueBranchSlugs.join(',') === adminSectionSlugs.join(','),
    `Unexpected admin subsection branch order: ${uniqueBranchSlugs.join(', ')}`,
  );

  for (const slug of adminSectionSlugs) {
    assert(
      isAdminSectionSlug(slug),
      `Expected "${slug}" to remain a supported admin subsection slug`,
    );
    assert(
      routeSource.includes(`if (section === '${slug}') {`),
      `Expected src/app/admin/[section]/page.tsx to include an explicit "${slug}" branch`,
    );
  }

  assert(
    routeSource.includes('if (!isAdminSectionSlug(section)) {'),
    'Expected admin subsection route to guard unsupported slugs with isAdminSectionSlug',
  );
  assert(
    routeSource.includes("const { section } = await params;"),
    'Expected admin subsection route to resolve the dynamic section param before branching',
  );
  assert(
    notFoundCalls.length === 2,
    `Expected admin subsection route to call notFound() twice, received ${notFoundCalls.length}`,
  );
  assert(
    routeSource.includes('\n\n  notFound();\n}'),
    'Expected admin subsection route to end with a final notFound() fallback after explicit section branches',
  );
  assert(
    !routeSource.includes('AdminSectionPage'),
    'Did not expect the removed generic AdminSectionPage fallback to be referenced in the admin subsection route',
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        supportedSlugs: adminSectionSlugs,
        staticParams,
        explicitBranches: uniqueBranchSlugs,
        notFoundCalls: notFoundCalls.length,
        genericFallbackPresent: false,
      },
      null,
      2,
    ),
  );
}

main();

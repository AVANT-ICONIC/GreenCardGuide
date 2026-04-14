import { guideSlugs } from '@/content/guides';
import { contentSurfaceKeys } from './loadContentReviewMetadata';
import { listSourceReferenceMappings } from './sourceMappings';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const mappings = listSourceReferenceMappings();
  const expectedSharedSurfaces = [
    'ciudad-juarez',
    'documents',
    'faq',
    'glossary',
  ] as const;
  const expectedSurfaces = [...expectedSharedSurfaces, ...guideSlugs];

  assert(
    contentSurfaceKeys.join(',') === expectedSurfaces.join(','),
    `Unexpected content surface key order: ${contentSurfaceKeys.join(',')}`,
  );
  assert(
    mappings.length === contentSurfaceKeys.length,
    `Expected ${contentSurfaceKeys.length} source-mapping entries, received ${mappings.length}`,
  );

  for (const surface of expectedSharedSurfaces) {
    assert(
      contentSurfaceKeys.includes(surface),
      `Expected shared surface "${surface}" in content surface registry`,
    );
  }

  for (const slug of guideSlugs) {
    assert(
      contentSurfaceKeys.includes(slug),
      `Expected guide slug "${slug}" in content surface registry`,
    );
  }

  const mappingSurfaces = mappings.map((entry) => entry.surface);
  assert(
    mappingSurfaces.join(',') === contentSurfaceKeys.join(','),
    'Expected source mapping registry order to match content surface registry order',
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        surfaceCount: contentSurfaceKeys.length,
        sharedSurfaces: expectedSharedSurfaces,
        guideSlugs,
        mappings: mappingSurfaces,
      },
      null,
      2,
    ),
  );
}

main();

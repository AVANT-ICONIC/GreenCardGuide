import { contentSurfaceKeys } from './loadContentReviewMetadata';
import {
  listSourceReferenceMappings,
  loadSourceReferenceKeysForSurface,
} from './sourceMappings';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const mappings = listSourceReferenceMappings();

  assert(
    mappings.length === contentSurfaceKeys.length,
    `Expected ${contentSurfaceKeys.length} source-mapping entries, received ${mappings.length}`,
  );

  const expectedMappings = {
    'ciudad-juarez': 'maintained-source-policy,trust-and-safety-policy',
    documents: 'maintained-source-policy,trust-and-safety-policy',
    faq: 'repo-disclaimer,trust-and-safety-policy',
    glossary: 'maintained-source-policy',
    'what-to-bring': 'maintained-source-policy,trust-and-safety-policy',
    'originals-vs-copies': 'maintained-source-policy,trust-and-safety-policy',
    'interview-week-plan': 'maintained-source-policy,trust-and-safety-policy',
    'common-mistakes': 'maintained-source-policy,trust-and-safety-policy',
  } as const;

  for (const surface of contentSurfaceKeys) {
    const directKeys = loadSourceReferenceKeysForSurface(surface).join(',');
    assert(
      directKeys === expectedMappings[surface],
      `Unexpected source mapping for ${surface}: ${directKeys}`,
    );

    const listed = mappings.find((entry) => entry.surface === surface);
    assert(listed, `Expected listed source mapping for ${surface}`);
    assert(
      listed.source_keys.join(',') === directKeys,
      `Expected listed and direct mappings to match for ${surface}`,
    );
  }

  const faqMapping = mappings.find((entry) => entry.surface === 'faq');
  assert(
    faqMapping?.source_keys.join(',') === 'repo-disclaimer,trust-and-safety-policy',
    `Expected FAQ mapping to remain repo-disclaimer plus trust-and-safety-policy, received ${faqMapping?.source_keys.join(',') ?? 'missing'}`,
  );

  const glossaryMapping = mappings.find((entry) => entry.surface === 'glossary');
  assert(
    glossaryMapping?.source_keys.join(',') === 'maintained-source-policy',
    `Expected glossary mapping to remain maintained-source-policy only, received ${glossaryMapping?.source_keys.join(',') ?? 'missing'}`,
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        mappingCount: mappings.length,
        mappings,
      },
      null,
      2,
    ),
  );
}

main();

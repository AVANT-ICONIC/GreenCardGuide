import { loadSourceReferences } from './loadSourceReferences';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const references = loadSourceReferences();

  assert(references.length === 3, `Expected 3 source references, received ${references.length}`);

  const sourceKeys = references.map((reference) => reference.source_key);
  assert(
    sourceKeys.join(',') ===
      'trust-and-safety-policy,maintained-source-policy,repo-disclaimer',
    `Unexpected source reference key order: ${sourceKeys.join(',')}`,
  );

  for (const reference of references) {
    assert(
      reference.publisher === 'GreenCardGuide repository',
      `Expected repository publisher for ${reference.source_key}, received ${reference.publisher}`,
    );
    assert(
      reference.language === 'en',
      `Expected English language for ${reference.source_key}, received ${reference.language}`,
    );
    assert(
      reference.reviewed_at === '2026-04-14',
      `Expected 2026-04-14 reviewed_at for ${reference.source_key}, received ${reference.reviewed_at ?? 'missing'}`,
    );
    assert(
      reference.url.startsWith('https://github.com/NovaRagnarok/GreenCardGuide/blob/main/'),
      `Expected repository blob URL for ${reference.source_key}, received ${reference.url}`,
    );
    assert(
      typeof reference.note === 'string' && reference.note.length > 0,
      `Expected note text for ${reference.source_key}`,
    );
  }

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        count: references.length,
        sourceKeys,
        references: references.map((reference) => ({
          source_key: reference.source_key,
          publisher: reference.publisher,
          reviewed_at: reference.reviewed_at,
          url: reference.url,
        })),
      },
      null,
      2,
    ),
  );
}

main();

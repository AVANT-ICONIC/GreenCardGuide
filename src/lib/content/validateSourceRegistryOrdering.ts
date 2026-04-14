import { loadSourceReferences } from './loadSourceReferences';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const references = loadSourceReferences();

  const sourceKeys = references.map((reference) => reference.source_key);
  assert(
    sourceKeys.join(',') ===
      'trust-and-safety-policy,maintained-source-policy,repo-disclaimer',
    `Unexpected source registry order: ${sourceKeys.join(',')}`,
  );

  const titles = references.map((reference) => reference.title);
  assert(
    titles.join(',') ===
      'Trust and Safety Policy,Maintained Source Policy,Repository Disclaimer',
    `Unexpected source registry titles: ${titles.join(',')}`,
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
  }

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        count: references.length,
        sourceKeys,
        titles,
      },
      null,
      2,
    ),
  );
}

main();

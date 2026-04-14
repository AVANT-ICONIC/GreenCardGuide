import { loadSourceReferences } from './loadSourceReferences';

function main() {
  const references = loadSourceReferences();

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        sourceReferences: references.length,
        sourceKeys: references.map((reference) => reference.source_key),
      },
      null,
      2,
    ),
  );
}

main();

import { loadSourceReferences } from './loadSourceReferences';
import {
  listSourceReferenceMappings,
  validateSourceReferenceMappings,
} from './sourceMappings';

function main() {
  const references = loadSourceReferences();
  validateSourceReferenceMappings(references.map((reference) => reference.source_key));

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        sourceReferences: references.length,
        sourceKeys: references.map((reference) => reference.source_key),
        mappedSurfaces: listSourceReferenceMappings(),
      },
      null,
      2,
    ),
  );
}

main();

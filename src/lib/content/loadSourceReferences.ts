import sourceReferencesSeed from '../../../data/sources/source-references.json';
import type { SourceReference } from '@/lib/types/domain';
import {
  SeedValidationError,
  expectArray,
  expectObject,
  expectOptionalString,
  expectString,
} from '@/lib/seed/validators';
import { isSupportedLanguage } from './locale';

function parseSourceReference(value: unknown, index: number): SourceReference {
  const path = `source-references[${index}]`;
  const source = expectObject(value, path);
  const language = expectString(source.language, `${path}.language`);

  if (!isSupportedLanguage(language)) {
    throw new SeedValidationError(`${path}.language: unsupported language "${language}"`);
  }

  return {
    source_key: expectString(source.source_key, `${path}.source_key`),
    title: expectString(source.title, `${path}.title`),
    url: expectString(source.url, `${path}.url`),
    publisher: expectString(source.publisher, `${path}.publisher`),
    language,
    reviewed_at: expectOptionalString(source.reviewed_at, `${path}.reviewed_at`),
    note: expectOptionalString(source.note, `${path}.note`),
  };
}

function assertUniqueSourceKeys(references: SourceReference[]): SourceReference[] {
  const seen = new Set<string>();

  for (const reference of references) {
    if (seen.has(reference.source_key)) {
      throw new SeedValidationError(
        `source-references: duplicate key "${reference.source_key}"`,
      );
    }
    seen.add(reference.source_key);
  }

  return references;
}

export function loadSourceReferences(): SourceReference[] {
  return assertUniqueSourceKeys(
    expectArray(sourceReferencesSeed, 'source-references').map(parseSourceReference),
  );
}

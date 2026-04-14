import { getGlossaryTerms } from '@/content/glossary';
import type { GlossaryTermContent } from './types';
import type { Language } from '@/lib/types/domain';
import { getPlaceholderSourceReferenceKeys } from './loadSourceReferences';

export function loadGlossaryTerms(language: Language): GlossaryTermContent[] {
  return getGlossaryTerms(language).map((term) => ({
    ...term,
    source_references: getPlaceholderSourceReferenceKeys(),
  }));
}

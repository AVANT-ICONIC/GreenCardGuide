import { getGlossaryTerms } from '@/content/glossary';
import type { GlossaryTermContent } from './types';
import type { Language } from '@/lib/types/domain';

export function loadGlossaryTerms(language: Language): GlossaryTermContent[] {
  return getGlossaryTerms(language);
}

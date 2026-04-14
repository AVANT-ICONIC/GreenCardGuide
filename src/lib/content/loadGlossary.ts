import { getGlossaryTerms } from '@/content/glossary';
import type { GlossaryPageContent, GlossaryTermContent } from './types';
import type { Language } from '@/lib/types/domain';
import { loadContentReviewMetadata } from './loadContentReviewMetadata';
import { getPlaceholderSourceReferenceKeys } from './loadSourceReferences';

export function loadGlossaryTerms(language: Language): GlossaryTermContent[] {
  return getGlossaryTerms(language).map((term) => ({
    ...term,
    source_references: getPlaceholderSourceReferenceKeys(),
  }));
}

export function loadGlossaryPage(language: Language): GlossaryPageContent {
  const terms = loadGlossaryTerms(language);

  return {
    language,
    review_status: terms[0]?.review_status ?? 'placeholder',
    confidence_label: terms[0]?.confidence_label ?? 'verify_with_official',
    last_reviewed_at: loadContentReviewMetadata(language, 'glossary').last_reviewed_at,
    source_references: terms[0]?.source_references ?? [],
    terms,
  };
}

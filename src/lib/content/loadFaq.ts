import { getFaqItems } from '@/content/faq';
import type { FaqItemContent, FaqPageContent } from './types';
import type { Language } from '@/lib/types/domain';
import { loadContentReviewMetadata } from './loadContentReviewMetadata';
import { getPlaceholderSourceReferenceKeys } from './loadSourceReferences';

export function loadFaqItems(language: Language): FaqItemContent[] {
  return getFaqItems(language).map((item) => ({
    ...item,
    source_references: getPlaceholderSourceReferenceKeys(),
  }));
}

export function loadFaqPage(language: Language): FaqPageContent {
  const items = loadFaqItems(language);

  return {
    language,
    review_status: items[0]?.review_status ?? 'placeholder',
    confidence_label: items[0]?.confidence_label ?? 'verify_with_official',
    last_reviewed_at: loadContentReviewMetadata(language, 'faq').last_reviewed_at,
    source_references: items[0]?.source_references ?? [],
    items,
  };
}

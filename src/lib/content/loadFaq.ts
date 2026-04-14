import { getFaqItems } from '@/content/faq';
import type { FaqItemContent } from './types';
import type { Language } from '@/lib/types/domain';
import { getPlaceholderSourceReferenceKeys } from './loadSourceReferences';

export function loadFaqItems(language: Language): FaqItemContent[] {
  return getFaqItems(language).map((item) => ({
    ...item,
    source_references: getPlaceholderSourceReferenceKeys(),
  }));
}

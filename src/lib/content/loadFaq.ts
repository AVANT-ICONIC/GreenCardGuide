import { getFaqItems } from '@/content/faq';
import type { FaqItemContent } from './types';
import type { Language } from '@/lib/types/domain';

export function loadFaqItems(language: Language): FaqItemContent[] {
  return getFaqItems(language);
}

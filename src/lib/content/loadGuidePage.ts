import { getGuideContent, guideSlugs, type GuideSlug } from '@/content/guides';
import type { GuidePageContent } from './types';
import type { Language } from '@/lib/types/domain';

export function isGuideSlug(value: string): value is GuideSlug {
  return guideSlugs.includes(value as GuideSlug);
}

export function loadGuidePage(
  language: Language,
  slug: GuideSlug,
): GuidePageContent {
  return getGuideContent(language, slug);
}

export function listGuideSlugs(): GuideSlug[] {
  return guideSlugs;
}

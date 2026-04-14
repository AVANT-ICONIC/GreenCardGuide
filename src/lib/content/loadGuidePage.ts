import { getGuideContent, guideSlugs, type GuideSlug } from '@/content/guides';
import type { GuidePageContent } from './types';
import type { Language } from '@/lib/types/domain';
import { loadContentReviewMetadata } from './loadContentReviewMetadata';
import { getPlaceholderSourceReferenceKeys } from './loadSourceReferences';

export function isGuideSlug(value: string): value is GuideSlug {
  return guideSlugs.includes(value as GuideSlug);
}

export function loadGuidePage(
  language: Language,
  slug: GuideSlug,
): GuidePageContent {
  return {
    ...getGuideContent(language, slug),
    last_reviewed_at: loadContentReviewMetadata(language, slug).last_reviewed_at,
    source_references: getPlaceholderSourceReferenceKeys(),
  };
}

export function listGuideSlugs(): GuideSlug[] {
  return guideSlugs;
}

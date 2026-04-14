import type { Language } from '@/lib/types/domain';

export type ContentSurfaceKey =
  | 'ciudad-juarez'
  | 'documents'
  | 'faq'
  | 'glossary'
  | 'what-to-bring'
  | 'originals-vs-copies'
  | 'interview-week-plan'
  | 'common-mistakes';

interface ContentReviewMetadata {
  last_reviewed_at: string;
}

const reviewDateBySurface: Record<ContentSurfaceKey, string> = {
  'ciudad-juarez': '2026-04-14',
  documents: '2026-04-14',
  faq: '2026-04-14',
  glossary: '2026-04-14',
  'what-to-bring': '2026-04-14',
  'originals-vs-copies': '2026-04-14',
  'interview-week-plan': '2026-04-14',
  'common-mistakes': '2026-04-14',
};

export function loadContentReviewMetadata(
  _language: Language,
  surface: ContentSurfaceKey,
): ContentReviewMetadata {
  return {
    last_reviewed_at: reviewDateBySurface[surface],
  };
}

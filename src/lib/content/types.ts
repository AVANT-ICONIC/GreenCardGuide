import type { ConfidenceLabel, Language } from '@/lib/types/domain';

export type ContentReviewStatus = 'placeholder' | 'verified';

export interface GuideSectionContent {
  heading: string;
  body: string;
}

export interface GuidePageContent {
  slug: string;
  language: Language;
  title: string;
  summary: string;
  sections: GuideSectionContent[];
  confidence_label: ConfidenceLabel;
  review_status: ContentReviewStatus;
  last_reviewed_at?: string;
  source_references: string[];
}

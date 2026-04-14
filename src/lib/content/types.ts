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

export interface FaqItemContent {
  key: string;
  language: Language;
  question: string;
  answer: string;
  tags: string[];
  confidence_label: ConfidenceLabel;
  review_status: ContentReviewStatus;
  source_references: string[];
}

export interface GlossaryTermContent {
  term_key: string;
  language: Language;
  term: string;
  definition: string;
  related_terms: string[];
  confidence_label: ConfidenceLabel;
  review_status: ContentReviewStatus;
  source_references: string[];
}

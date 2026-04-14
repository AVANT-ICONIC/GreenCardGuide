import type { ConfidenceLabel, Language } from '@/lib/types/domain';

export type ContentReviewStatus = 'placeholder' | 'verified';

export interface GuideSectionContent {
  heading: string;
  body: string;
  links?: GuideSectionLink[];
}

export interface GuideSectionLink {
  label: string;
  href: string;
  description?: string;
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

export interface FaqPageContent {
  language: Language;
  review_status: ContentReviewStatus;
  confidence_label: ConfidenceLabel;
  last_reviewed_at: string;
  source_references: string[];
  items: FaqItemContent[];
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

export interface GlossaryPageContent {
  language: Language;
  review_status: ContentReviewStatus;
  confidence_label: ConfidenceLabel;
  last_reviewed_at: string;
  source_references: string[];
  terms: GlossaryTermContent[];
}

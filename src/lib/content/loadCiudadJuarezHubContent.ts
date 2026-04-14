import type { ConfidenceLabel, Language } from '@/lib/types/domain';
import { getPlaceholderSourceReferenceKeys } from './loadSourceReferences';
import { loadContentReviewMetadata } from './loadContentReviewMetadata';

export interface CiudadJuarezHubContent {
  language: Language;
  review_status: 'placeholder';
  confidence_label: ConfidenceLabel;
  last_reviewed_at: string;
  source_references: string[];
}

export function loadCiudadJuarezHubContent(
  language: Language,
): CiudadJuarezHubContent {
  return {
    language,
    review_status: 'placeholder',
    confidence_label: 'verify_with_official',
    last_reviewed_at: loadContentReviewMetadata(language, 'ciudad-juarez').last_reviewed_at,
    source_references: getPlaceholderSourceReferenceKeys(),
  };
}

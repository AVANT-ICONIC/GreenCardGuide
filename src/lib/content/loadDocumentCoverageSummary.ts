import { loadDocuments, loadRequirementRules } from '@/lib/seed/loadSeedData';
import type { RequirementOutputType } from '@/lib/types/domain';

export interface DocumentCoverageSummary {
  document_slug: string;
  reference_count: number;
  output_types: RequirementOutputType[];
  rule_keys: string[];
  is_covered: boolean;
}

export function loadDocumentCoverageSummary(): DocumentCoverageSummary[] {
  const rules = loadRequirementRules().filter((rule) => rule.is_active);

  return loadDocuments().map((document) => {
    const matchingRules = rules.filter(
      (rule) =>
        typeof rule.output_payload.document_slug === 'string' &&
        rule.output_payload.document_slug === document.slug,
    );
    const outputTypes = Array.from(
      new Set(matchingRules.map((rule) => rule.output_type)),
    );

    return {
      document_slug: document.slug,
      reference_count: matchingRules.length,
      output_types: outputTypes,
      rule_keys: matchingRules.map((rule) => rule.rule_key),
      is_covered: matchingRules.length > 0,
    };
  });
}

import { loadDocuments, loadRequirementRules } from '@/lib/seed/loadSeedData';
import type {
  ChecklistAnswers,
  ChecklistResult,
  ChecklistResultItem,
  ChecklistResultSection,
  ChecklistResultSectionKey,
  ConfidenceLabel,
  DocumentDefinition,
  RequirementOutputType,
  RequirementRule,
} from '@/lib/types/domain';
import { evaluateRules } from './evaluateRules';

interface SectionDefinition {
  key: ChecklistResultSectionKey;
  outputTypes: RequirementOutputType[];
  title_en: string;
  title_es: string;
  confidence_label: ConfidenceLabel;
}

const sectionDefinitions: SectionDefinition[] = [
  {
    key: 'required_documents',
    outputTypes: ['required_document'],
    title_en: 'Required documents',
    title_es: 'Documentos requeridos',
    confidence_label: 'official_requirement',
  },
  {
    key: 'conditional_documents',
    outputTypes: ['conditional_document'],
    title_en: 'Conditional documents',
    title_es: 'Documentos condicionales',
    confidence_label: 'official_requirement',
  },
  {
    key: 'backup_documents',
    outputTypes: ['backup_document'],
    title_en: 'Backup documents',
    title_es: 'Documentos de respaldo',
    confidence_label: 'common_practical_advice',
  },
  {
    key: 'print_items',
    outputTypes: ['print_item'],
    title_en: 'Print before travel',
    title_es: 'Imprima antes de viajar',
    confidence_label: 'official_recommendation',
  },
  {
    key: 'risk_flags',
    outputTypes: ['risk_flag'],
    title_en: 'Risk flags',
    title_es: 'Alertas de riesgo',
    confidence_label: 'verify_with_official',
  },
  {
    key: 'prep_steps',
    outputTypes: ['prep_step'],
    title_en: 'Prep steps',
    title_es: 'Pasos de preparacion',
    confidence_label: 'official_recommendation',
  },
  {
    key: 'do_not_bring',
    outputTypes: ['do_not_bring'],
    title_en: 'Do not bring',
    title_es: 'No llevar',
    confidence_label: 'official_recommendation',
  },
  {
    key: 'verify_with_official',
    outputTypes: ['verify_with_official'],
    title_en: 'Verify with official instructions',
    title_es: 'Verifique con instrucciones oficiales',
    confidence_label: 'verify_with_official',
  },
];

function indexDocumentsBySlug(
  documents: DocumentDefinition[],
): Map<string, DocumentDefinition> {
  return new Map(documents.map((document) => [document.slug, document]));
}

function buildResultItem(
  rule: RequirementRule,
  documentsBySlug: Map<string, DocumentDefinition>,
  confidenceLabel: ConfidenceLabel,
): ChecklistResultItem {
  const documentSlug =
    typeof rule.output_payload.document_slug === 'string'
      ? rule.output_payload.document_slug
      : undefined;

  if (documentSlug && !documentsBySlug.has(documentSlug)) {
    throw new Error(
      `Rule "${rule.rule_key}" references unknown document slug "${documentSlug}"`,
    );
  }

  return {
    rule_key: rule.rule_key,
    output_type: rule.output_type,
    confidence_label: confidenceLabel,
    document: documentSlug ? documentsBySlug.get(documentSlug) : undefined,
    document_slug: documentSlug,
    item_key:
      typeof rule.output_payload.item_key === 'string'
        ? rule.output_payload.item_key
        : undefined,
    strength:
      typeof rule.output_payload.strength === 'string'
        ? rule.output_payload.strength
        : undefined,
    notes_en:
      typeof rule.output_payload.notes_en === 'string'
        ? rule.output_payload.notes_en
        : undefined,
    notes_es:
      typeof rule.output_payload.notes_es === 'string'
        ? rule.output_payload.notes_es
        : undefined,
  };
}

function buildSection(
  definition: SectionDefinition,
  matchedRules: RequirementRule[],
  documentsBySlug: Map<string, DocumentDefinition>,
): ChecklistResultSection {
  return {
    key: definition.key,
    title_en: definition.title_en,
    title_es: definition.title_es,
    confidence_label: definition.confidence_label,
    items: matchedRules
      .filter((rule) => definition.outputTypes.includes(rule.output_type))
      .map((rule) =>
        buildResultItem(rule, documentsBySlug, definition.confidence_label),
      ),
  };
}

export function assembleChecklistResults(
  answers: ChecklistAnswers,
  rules: RequirementRule[] = loadRequirementRules(),
  documents: DocumentDefinition[] = loadDocuments(),
): ChecklistResult {
  const matchedRules = evaluateRules(rules, answers);
  const documentsBySlug = indexDocumentsBySlug(documents);

  return {
    answers,
    matched_rules: matchedRules,
    sections: sectionDefinitions.map((definition) =>
      buildSection(definition, matchedRules, documentsBySlug),
    ),
  };
}

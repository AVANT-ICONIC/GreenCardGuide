import {
  getChecklistAnswerLabel,
  getChecklistQuestionLabel,
} from '@/lib/checklist/labels';
import { loadChecklistQuestions, loadDocuments, loadRequirementRules } from '@/lib/seed/loadSeedData';
import type {
  ChecklistQuestion,
  DocumentDefinition,
  Language,
  RequirementOutputType,
  RequirementRule,
} from '@/lib/types/domain';
import { loadContentReviewMetadata } from './loadContentReviewMetadata';
import { loadSourceReferenceKeysForSurface } from './sourceMappings';

export interface DocumentRuleCondition {
  key: string;
  label: string;
  value: string;
}

export interface DocumentRuleReference {
  rule_key: string;
  output_type: RequirementOutputType;
  output_type_label: string;
  notes: string | undefined;
  conditions: DocumentRuleCondition[];
}

export interface DocumentDetailContent {
  language: Language;
  document: DocumentDefinition;
  title: string;
  summary: string;
  category_title: string;
  review_status: 'placeholder';
  confidence_label: 'verify_with_official';
  last_reviewed_at: string;
  source_references: string[];
  references: DocumentRuleReference[];
}

const categoryTitles = {
  en: {
    identity: 'Identity documents',
    appointment: 'Appointment and confirmation documents',
    civil: 'Civil documents',
    financial: 'Financial support documents',
  },
  es: {
    identity: 'Documentos de identidad',
    appointment: 'Documentos de cita y confirmacion',
    civil: 'Documentos civiles',
    financial: 'Documentos de patrocinio economico',
  },
} as const;

const outputTypeLabels = {
  en: {
    required_document: 'Required document',
    conditional_document: 'Conditional document',
    backup_document: 'Backup document',
    print_item: 'Print item',
    risk_flag: 'Risk flag',
    prep_step: 'Prep step',
    do_not_bring: 'Do not bring',
    verify_with_official: 'Verify with official instructions',
  },
  es: {
    required_document: 'Documento requerido',
    conditional_document: 'Documento condicional',
    backup_document: 'Documento de respaldo',
    print_item: 'Elemento para imprimir',
    risk_flag: 'Alerta de riesgo',
    prep_step: 'Paso de preparacion',
    do_not_bring: 'No llevar',
    verify_with_official: 'Verifique con instrucciones oficiales',
  },
} as const;

const summaryCopy = {
  en: {
    withRules:
      'This seeded document is currently referenced by the deterministic checklist rules below. Treat this page as a structured explainer scaffold, not final verified guidance.',
    withoutRules:
      'This seeded document exists in the shared library, but no active checklist rule points to it yet. Treat this page as a placeholder explainer scaffold until more deterministic coverage is added.',
  },
  es: {
    withRules:
      'Este documento semilla aparece actualmente en las reglas deterministas de la lista mostradas abajo. Tome esta pagina como una base estructurada, no como orientacion final verificada.',
    withoutRules:
      'Este documento semilla existe en la biblioteca compartida, pero ninguna regla activa de la lista lo usa todavia. Tome esta pagina como una base provisional hasta agregar mas cobertura determinista.',
  },
} as const;

function getCategoryTitle(language: Language, category: string): string {
  return (
    categoryTitles[language][category as keyof (typeof categoryTitles)[typeof language]] ??
    category
  );
}

function buildRuleConditions(
  language: Language,
  questionsByKey: Map<string, ChecklistQuestion>,
  rule: RequirementRule,
): DocumentRuleCondition[] {
  return Object.entries(rule.conditions).map(([key, value]) => {
    const question = questionsByKey.get(key);
    const typedValue = typeof value === 'boolean' || typeof value === 'string'
      ? value
      : String(value);

    if (!question) {
      return {
        key,
        label: key,
        value: String(typedValue),
      };
    }

    return {
      key,
      label: getChecklistQuestionLabel(question, language),
      value: getChecklistAnswerLabel(question, typedValue, language),
    };
  });
}

function buildRuleReference(
  language: Language,
  questionsByKey: Map<string, ChecklistQuestion>,
  rule: RequirementRule,
): DocumentRuleReference {
  return {
    rule_key: rule.rule_key,
    output_type: rule.output_type,
    output_type_label: outputTypeLabels[language][rule.output_type],
    notes:
      language === 'en'
        ? typeof rule.output_payload.notes_en === 'string'
          ? rule.output_payload.notes_en
          : undefined
        : typeof rule.output_payload.notes_es === 'string'
          ? rule.output_payload.notes_es
          : undefined,
    conditions: buildRuleConditions(language, questionsByKey, rule),
  };
}

export function listDocumentSlugs(): string[] {
  return loadDocuments().map((document) => document.slug);
}

export function isDocumentSlug(value: string): boolean {
  return listDocumentSlugs().includes(value);
}

export function loadDocumentDetailPage(
  language: Language,
  slug: string,
): DocumentDetailContent {
  const document = loadDocuments().find((candidate) => candidate.slug === slug);

  if (!document) {
    throw new Error(`Unknown document slug "${slug}"`);
  }

  const questionsByKey = new Map(
    loadChecklistQuestions().map((question) => [question.key, question]),
  );
  const references = loadRequirementRules()
    .filter(
      (rule) =>
        typeof rule.output_payload.document_slug === 'string' &&
        rule.output_payload.document_slug === slug,
    )
    .map((rule) => buildRuleReference(language, questionsByKey, rule));

  return {
    language,
    document,
    title: language === 'en' ? document.label_en : document.label_es,
    summary:
      references.length > 0
        ? summaryCopy[language].withRules
        : summaryCopy[language].withoutRules,
    category_title: getCategoryTitle(language, document.category),
    review_status: 'placeholder',
    confidence_label: 'verify_with_official',
    last_reviewed_at: loadContentReviewMetadata(language, 'documents').last_reviewed_at,
    source_references: loadSourceReferenceKeysForSurface('documents'),
    references,
  };
}

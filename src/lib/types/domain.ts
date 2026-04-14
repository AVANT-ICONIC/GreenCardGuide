export type Language = 'en' | 'es';

export type ChecklistQuestionInputType = 'select' | 'boolean';

export type ConfidenceLabel =
  | 'official_requirement'
  | 'official_recommendation'
  | 'common_practical_advice'
  | 'verify_with_official';

export type RequirementOutputType =
  | 'required_document'
  | 'conditional_document'
  | 'backup_document'
  | 'print_item'
  | 'risk_flag'
  | 'prep_step'
  | 'do_not_bring'
  | 'verify_with_official';

export type ChecklistResultSectionKey =
  | 'required_documents'
  | 'conditional_documents'
  | 'backup_documents'
  | 'print_items'
  | 'risk_flags'
  | 'prep_steps'
  | 'do_not_bring'
  | 'verify_with_official';

export interface ChecklistAnswers {
  post?: string;
  case_family?: string;
  applicant_role?: string;
  joint_sponsor?: boolean;
  has_prior_marriage?: boolean;
  children_immigrating?: boolean;
  needs_court_records?: boolean;
  passport_ready?: boolean;
}

export interface ChecklistQuestion {
  key: keyof ChecklistAnswers;
  label_en: string;
  label_es: string;
  input_type: ChecklistQuestionInputType;
  options?: string[];
  step_order: number;
}

export interface DocumentDefinition {
  slug: string;
  label_en: string;
  label_es: string;
  category: string;
  description_en?: string;
  description_es?: string;
}

export type RuleConditionValue = string | boolean;

export type RequirementConditions = Partial<
  Record<keyof ChecklistAnswers, RuleConditionValue>
>;

export interface RequirementOutputPayload extends Record<string, unknown> {
  document_slug?: string;
  item_key?: string;
  strength?: string;
  notes_en?: string;
  notes_es?: string;
}

export interface RequirementRule {
  rule_key: string;
  conditions: RequirementConditions;
  output_type: RequirementOutputType;
  output_payload: RequirementOutputPayload;
  priority: number;
  is_active: boolean;
}

export interface SourceReference {
  source_key: string;
  title: string;
  url: string;
  publisher: string;
  language: Language;
  reviewed_at?: string;
  note?: string;
}

export interface ChecklistResultItem {
  rule_key: string;
  output_type: RequirementOutputType;
  confidence_label: ConfidenceLabel;
  document?: DocumentDefinition;
  document_slug?: string;
  item_key?: string;
  strength?: string;
  notes_en?: string;
  notes_es?: string;
}

export interface ChecklistResultSection {
  key: ChecklistResultSectionKey;
  title_en: string;
  title_es: string;
  confidence_label: ConfidenceLabel;
  items: ChecklistResultItem[];
}

export interface ChecklistResult {
  answers: ChecklistAnswers;
  matched_rules: RequirementRule[];
  sections: ChecklistResultSection[];
}

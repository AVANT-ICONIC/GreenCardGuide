export type Language = 'en' | 'es';

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

export interface RequirementRule {
  rule_key: string;
  conditions: Record<string, unknown>;
  output_type: RequirementOutputType;
  output_payload: Record<string, unknown>;
  priority: number;
  is_active: boolean;
}

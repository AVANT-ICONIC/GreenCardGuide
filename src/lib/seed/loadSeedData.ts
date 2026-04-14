import checklistQuestionsSeed from '../../../data/seed/checklist-questions.json';
import documentsSeed from '../../../data/seed/documents.json';
import requirementRulesSeed from '../../../data/seed/requirement-rules.json';
import type {
  ChecklistAnswers,
  ChecklistQuestion,
  ChecklistQuestionInputType,
  DocumentDefinition,
  RequirementConditions,
  RequirementOutputPayload,
  RequirementOutputType,
  RequirementRule,
} from '../types/domain';
import {
  SeedValidationError,
  expectArray,
  expectBoolean,
  expectNumber,
  expectObject,
  expectOptionalString,
  expectString,
  expectStringArray,
} from './validators';

const checklistAnswerKeys: ReadonlySet<keyof ChecklistAnswers> = new Set([
  'post',
  'case_family',
  'applicant_role',
  'joint_sponsor',
  'has_prior_marriage',
  'children_immigrating',
  'needs_court_records',
  'passport_ready',
]);

const checklistInputTypes: ReadonlySet<ChecklistQuestionInputType> = new Set([
  'select',
  'boolean',
]);

const requirementOutputTypes: ReadonlySet<RequirementOutputType> = new Set([
  'required_document',
  'conditional_document',
  'backup_document',
  'print_item',
  'risk_flag',
  'prep_step',
  'do_not_bring',
  'verify_with_official',
]);

function expectChecklistKey(value: unknown, path: string): keyof ChecklistAnswers {
  const key = expectString(value, path);

  if (!checklistAnswerKeys.has(key as keyof ChecklistAnswers)) {
    throw new SeedValidationError(
      `${path}: unsupported checklist answer key "${key}"`,
    );
  }

  return key as keyof ChecklistAnswers;
}

function expectChecklistInputType(
  value: unknown,
  path: string,
): ChecklistQuestionInputType {
  const inputType = expectString(value, path);

  if (!checklistInputTypes.has(inputType as ChecklistQuestionInputType)) {
    throw new SeedValidationError(`${path}: unsupported input type "${inputType}"`);
  }

  return inputType as ChecklistQuestionInputType;
}

function expectRequirementOutputType(
  value: unknown,
  path: string,
): RequirementOutputType {
  const outputType = expectString(value, path);

  if (!requirementOutputTypes.has(outputType as RequirementOutputType)) {
    throw new SeedValidationError(
      `${path}: unsupported output type "${outputType}"`,
    );
  }

  return outputType as RequirementOutputType;
}

function parseChecklistQuestion(value: unknown, index: number): ChecklistQuestion {
  const path = `checklist-questions[${index}]`;
  const question = expectObject(value, path);
  const inputType = expectChecklistInputType(
    question.input_type,
    `${path}.input_type`,
  );
  const parsed: ChecklistQuestion = {
    key: expectChecklistKey(question.key, `${path}.key`),
    label_en: expectString(question.label_en, `${path}.label_en`),
    label_es: expectString(question.label_es, `${path}.label_es`),
    input_type: inputType,
    step_order: expectNumber(question.step_order, `${path}.step_order`),
  };

  if (inputType === 'select') {
    parsed.options = expectStringArray(question.options, `${path}.options`);
  }

  return parsed;
}

function parseDocument(value: unknown, index: number): DocumentDefinition {
  const path = `documents[${index}]`;
  const document = expectObject(value, path);

  return {
    slug: expectString(document.slug, `${path}.slug`),
    label_en: expectString(document.label_en, `${path}.label_en`),
    label_es: expectString(document.label_es, `${path}.label_es`),
    category: expectString(document.category, `${path}.category`),
    description_en: expectOptionalString(
      document.description_en,
      `${path}.description_en`,
    ),
    description_es: expectOptionalString(
      document.description_es,
      `${path}.description_es`,
    ),
  };
}

function parseConditions(
  value: unknown,
  path: string,
): RequirementConditions {
  const conditionsObject = expectObject(value, path);
  const conditions: RequirementConditions = {};

  for (const [key, rawValue] of Object.entries(conditionsObject)) {
    const typedKey = expectChecklistKey(key, `${path}.${key}`);
    if (typeof rawValue !== 'string' && typeof rawValue !== 'boolean') {
      throw new SeedValidationError(
        `${path}.${key}: expected a string or boolean`,
      );
    }

    conditions[typedKey] = rawValue;
  }

  return conditions;
}

function parseOutputPayload(
  value: unknown,
  path: string,
): RequirementOutputPayload {
  const payload = expectObject(value, path);
  const parsedPayload: RequirementOutputPayload = {};

  for (const [key, rawValue] of Object.entries(payload)) {
    if (typeof rawValue === 'string' || typeof rawValue === 'number') {
      parsedPayload[key] = rawValue;
      continue;
    }

    throw new SeedValidationError(`${path}.${key}: expected a string or number`);
  }

  return parsedPayload;
}

function parseRequirementRule(value: unknown, index: number): RequirementRule {
  const path = `requirement-rules[${index}]`;
  const rule = expectObject(value, path);

  return {
    rule_key: expectString(rule.rule_key, `${path}.rule_key`),
    conditions: parseConditions(rule.conditions, `${path}.conditions`),
    output_type: expectRequirementOutputType(
      rule.output_type,
      `${path}.output_type`,
    ),
    output_payload: parseOutputPayload(
      rule.output_payload,
      `${path}.output_payload`,
    ),
    priority: expectNumber(rule.priority, `${path}.priority`),
    is_active: expectBoolean(rule.is_active, `${path}.is_active`),
  };
}

function assertUniqueBy<T>(
  entries: T[],
  getKey: (entry: T) => string,
  path: string,
): T[] {
  const seen = new Set<string>();

  for (const entry of entries) {
    const key = getKey(entry);
    if (seen.has(key)) {
      throw new SeedValidationError(`${path}: duplicate key "${key}"`);
    }
    seen.add(key);
  }

  return entries;
}

export function loadChecklistQuestions(): ChecklistQuestion[] {
  return assertUniqueBy(
    expectArray(checklistQuestionsSeed, 'checklist-questions')
    .map(parseChecklistQuestion)
    .sort((a, b) => a.step_order - b.step_order),
    (question) => question.key,
    'checklist-questions',
  );
}

export function loadDocuments(): DocumentDefinition[] {
  return assertUniqueBy(
    expectArray(documentsSeed, 'documents').map(parseDocument),
    (document) => document.slug,
    'documents',
  );
}

export function loadRequirementRules(): RequirementRule[] {
  return assertUniqueBy(
    expectArray(requirementRulesSeed, 'requirement-rules')
    .map(parseRequirementRule)
    .sort((a, b) => a.priority - b.priority),
    (rule) => rule.rule_key,
    'requirement-rules',
  );
}

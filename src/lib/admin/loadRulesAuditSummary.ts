import type {
  ChecklistQuestion,
  RequirementOutputType,
  RequirementRule,
} from '@/lib/types/domain';
import { loadChecklistQuestions, loadRequirementRules } from '@/lib/seed/loadSeedData';

export interface RulesAuditOutputTypeCount {
  outputType: RequirementOutputType;
  count: number;
}

export interface RulesAuditSummary {
  questions: ChecklistQuestion[];
  rules: RequirementRule[];
  checklistQuestionCount: number;
  requirementRuleCount: number;
  outputTypeCounts: RulesAuditOutputTypeCount[];
}

function countByOutputType(
  rules: RequirementRule[],
): RulesAuditOutputTypeCount[] {
  const counts = new Map<RequirementOutputType, number>();

  for (const rule of rules) {
    counts.set(rule.output_type, (counts.get(rule.output_type) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([outputType, count]) => ({ outputType, count }))
    .sort((left, right) => left.outputType.localeCompare(right.outputType));
}

export function loadRulesAuditSummary(): RulesAuditSummary {
  const questions = loadChecklistQuestions();
  const rules = loadRequirementRules();

  return {
    questions,
    rules,
    checklistQuestionCount: questions.length,
    requirementRuleCount: rules.length,
    outputTypeCounts: countByOutputType(rules),
  };
}

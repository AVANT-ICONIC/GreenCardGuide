import type {
  ChecklistAnswers,
  RequirementConditions,
  RequirementRule,
} from '../types/domain';

function matchesConditions(
  conditions: RequirementConditions,
  answers: ChecklistAnswers,
): boolean {
  return Object.entries(conditions).every(([key, value]) => {
    return (answers as Record<string, unknown>)[key] === value;
  });
}

export function evaluateRules(
  rules: RequirementRule[],
  answers: ChecklistAnswers,
): RequirementRule[] {
  return rules
    .filter((rule) => rule.is_active)
    .filter((rule) => matchesConditions(rule.conditions, answers))
    .sort((a, b) => a.priority - b.priority);
}

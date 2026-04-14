import type { ChecklistAnswers, ChecklistQuestion } from '@/lib/types/domain';

function parseBoolean(value: string | null): boolean | undefined {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  return undefined;
}

export function parseChecklistAnswers(
  searchParams: Record<string, string | string[] | undefined>,
  questions: ChecklistQuestion[],
): ChecklistAnswers {
  const answers: ChecklistAnswers = {};
  const mutableAnswers = answers as Record<string, string | boolean | undefined>;

  for (const question of questions) {
    const rawValue = searchParams[question.key];
    const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;

    if (typeof value !== 'string') {
      continue;
    }

    if (question.input_type === 'boolean') {
      const parsedBoolean = parseBoolean(value);
      if (parsedBoolean !== undefined) {
        mutableAnswers[question.key] = parsedBoolean;
      }
      continue;
    }

    mutableAnswers[question.key] = value;
  }

  return answers;
}

export function serializeChecklistAnswers(
  answers: ChecklistAnswers,
): URLSearchParams {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(answers)) {
    if (typeof value === 'string') {
      params.set(key, value);
      continue;
    }

    if (typeof value === 'boolean') {
      params.set(key, String(value));
    }
  }

  return params;
}

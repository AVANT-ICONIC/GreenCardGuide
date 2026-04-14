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

function parseSelectValue(
  question: ChecklistQuestion,
  value: string,
): string | undefined {
  if (!question.options?.includes(value)) {
    return undefined;
  }

  return value;
}

function getSingleSearchParamValue(
  value: string | string[] | undefined,
): string | undefined {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value) && value.length === 1 && typeof value[0] === 'string') {
    return value[0];
  }

  return undefined;
}

function parseQuestionAnswer(
  question: ChecklistQuestion,
  value: string | undefined,
): string | boolean | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  if (question.input_type === 'boolean') {
    return parseBoolean(value);
  }

  return parseSelectValue(question, value);
}

export function parseChecklistAnswers(
  searchParams: Record<string, string | string[] | undefined>,
  questions: ChecklistQuestion[],
): ChecklistAnswers {
  const answers: ChecklistAnswers = {};
  const mutableAnswers = answers as Record<string, string | boolean | undefined>;

  for (const question of questions) {
    const parsedValue = parseQuestionAnswer(
      question,
      getSingleSearchParamValue(searchParams[question.key]),
    );

    if (parsedValue !== undefined) {
      mutableAnswers[question.key] = parsedValue;
    }
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

export function hasCanonicalChecklistSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
  questions: ChecklistQuestion[],
): boolean {
  for (const question of questions) {
    const rawValue = searchParams[question.key];
    const singleValue = getSingleSearchParamValue(rawValue);
    const parsedValue = parseQuestionAnswer(question, singleValue);
    const canonicalValue =
      typeof parsedValue === 'boolean' ? String(parsedValue) : parsedValue;

    if (Array.isArray(rawValue) && rawValue.length !== 1) {
      return false;
    }

    if (singleValue !== canonicalValue) {
      return false;
    }
  }

  return true;
}

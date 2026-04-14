import type { ChecklistAnswers, ChecklistQuestion } from '@/lib/types/domain';

export function findFirstUnansweredQuestionIndex(
  questions: ChecklistQuestion[],
  answers: ChecklistAnswers,
): number | null {
  const firstUnansweredIndex = questions.findIndex(
    (question) => answers[question.key] === undefined,
  );

  return firstUnansweredIndex === -1 ? null : firstUnansweredIndex;
}

export function getResumeQuestionIndex(
  questions: ChecklistQuestion[],
  answers: ChecklistAnswers,
): number {
  const firstUnansweredIndex = findFirstUnansweredQuestionIndex(questions, answers);

  if (firstUnansweredIndex !== null) {
    return firstUnansweredIndex;
  }

  return Math.max(questions.length - 1, 0);
}

export function hasCompleteChecklistAnswers(
  questions: ChecklistQuestion[],
  answers: ChecklistAnswers,
): boolean {
  return findFirstUnansweredQuestionIndex(questions, answers) === null;
}

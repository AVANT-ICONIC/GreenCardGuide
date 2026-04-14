import type { ChecklistAnswers, ChecklistQuestion } from '@/lib/types/domain';

export function getNextQuestionIndex(
  currentIndex: number,
  _answers: ChecklistAnswers,
  questions: ChecklistQuestion[],
): number | null {
  const nextIndex = currentIndex + 1;

  if (nextIndex >= questions.length) {
    return null;
  }

  return nextIndex;
}

export function getPreviousQuestionIndex(currentIndex: number): number | null {
  if (currentIndex <= 0) {
    return null;
  }

  return currentIndex - 1;
}

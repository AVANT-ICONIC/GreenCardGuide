import { notFound, redirect } from 'next/navigation';
import { ChecklistResults } from '@/components/checklist-results';
import {
  hasCanonicalChecklistSearchParams,
  parseChecklistAnswers,
  serializeChecklistAnswers,
} from '@/lib/checklist/answers';
import { hasCompleteChecklistAnswers } from '@/lib/checklist/progress';
import { isSupportedLanguage } from '@/lib/content/locale';
import { loadChecklistQuestions } from '@/lib/seed/loadSeedData';
import { assembleChecklistResults } from '@/lib/rules/assembleChecklistResults';

export default async function ChecklistResultsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ lang }, resolvedSearchParams] = await Promise.all([params, searchParams]);

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const questions = loadChecklistQuestions();
  const answers = parseChecklistAnswers(resolvedSearchParams, questions);
  const serializedAnswers = serializeChecklistAnswers(answers).toString();
  const canonicalResultsHref = serializedAnswers
    ? `/${lang}/checklist/results?${serializedAnswers}`
    : `/${lang}/checklist/results`;

  if (!hasCompleteChecklistAnswers(questions, answers)) {
    redirect(`/${lang}/checklist/questions?${serializedAnswers}`);
  }

  if (!hasCanonicalChecklistSearchParams(resolvedSearchParams, questions)) {
    redirect(canonicalResultsHref);
  }

  const result = assembleChecklistResults(answers);
  const editHref = `/${lang}/checklist/questions?${serializedAnswers}`;
  const printHref = `/${lang}/checklist/print?${serializedAnswers}`;

  return (
    <ChecklistResults
      editHref={editHref}
      language={lang}
      printHref={printHref}
      questions={questions}
      result={result}
    />
  );
}

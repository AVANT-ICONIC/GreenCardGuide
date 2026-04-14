import { notFound, redirect } from 'next/navigation';
import { ChecklistResults } from '@/components/checklist-results';
import { parseChecklistAnswers, serializeChecklistAnswers } from '@/lib/checklist/answers';
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

  if (!hasCompleteChecklistAnswers(questions, answers)) {
    redirect(`/${lang}/checklist/questions?${serializedAnswers}`);
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

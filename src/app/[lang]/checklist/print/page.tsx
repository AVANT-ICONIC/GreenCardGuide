import { notFound, redirect } from 'next/navigation';
import { PrintChecklist } from '@/components/print-checklist';
import {
  hasCanonicalChecklistSearchParams,
  parseChecklistAnswers,
  serializeChecklistAnswers,
} from '@/lib/checklist/answers';
import { hasCompleteChecklistAnswers } from '@/lib/checklist/progress';
import { isSupportedLanguage } from '@/lib/content/locale';
import { assembleChecklistResults } from '@/lib/rules/assembleChecklistResults';
import { loadChecklistQuestions } from '@/lib/seed/loadSeedData';

export default async function ChecklistPrintPage({
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
  const canonicalPrintHref = serializedAnswers
    ? `/${lang}/checklist/print?${serializedAnswers}`
    : `/${lang}/checklist/print`;

  if (!hasCompleteChecklistAnswers(questions, answers)) {
    redirect(`/${lang}/checklist/questions?${serializedAnswers}`);
  }

  if (!hasCanonicalChecklistSearchParams(resolvedSearchParams, questions)) {
    redirect(canonicalPrintHref);
  }

  const result = assembleChecklistResults(answers);
  const resultsHref = `/${lang}/checklist/results?${serializedAnswers}`;

  return (
    <PrintChecklist
      language={lang}
      questions={questions}
      result={result}
      resultsHref={resultsHref}
    />
  );
}

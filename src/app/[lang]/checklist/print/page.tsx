import { notFound } from 'next/navigation';
import { PrintChecklist } from '@/components/print-checklist';
import { parseChecklistAnswers, serializeChecklistAnswers } from '@/lib/checklist/answers';
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
  const result = assembleChecklistResults(answers);
  const resultsHref = `/${lang}/checklist/results?${serializeChecklistAnswers(answers).toString()}`;

  return (
    <PrintChecklist
      language={lang}
      questions={questions}
      result={result}
      resultsHref={resultsHref}
    />
  );
}

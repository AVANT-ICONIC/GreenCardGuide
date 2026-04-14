import { notFound } from 'next/navigation';
import { ChecklistResults } from '@/components/checklist-results';
import { parseChecklistAnswers, serializeChecklistAnswers } from '@/lib/checklist/answers';
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
  const result = assembleChecklistResults(answers);
  const editHref = `/${lang}/checklist/questions?${serializeChecklistAnswers(answers).toString()}`;

  return <ChecklistResults editHref={editHref} language={lang} result={result} />;
}

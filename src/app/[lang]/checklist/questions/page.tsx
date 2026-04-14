import { notFound } from 'next/navigation';
import { ChecklistFlow } from '@/components/checklist-flow';
import { isSupportedLanguage } from '@/lib/content/locale';
import { loadChecklistQuestions } from '@/lib/seed/loadSeedData';

export default async function ChecklistQuestionsPage({
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

  return (
    <ChecklistFlow
      initialSearchParams={resolvedSearchParams}
      language={lang}
      questions={loadChecklistQuestions()}
    />
  );
}

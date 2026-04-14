import { notFound } from 'next/navigation';
import { GlossaryPage } from '@/components/glossary-page';
import { isSupportedLanguage } from '@/lib/content/locale';
import { loadGlossaryTerms } from '@/lib/content/loadGlossary';

export default async function GlossaryRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  return <GlossaryPage language={lang} terms={loadGlossaryTerms(lang)} />;
}

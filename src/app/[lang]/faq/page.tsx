import { notFound } from 'next/navigation';
import { FaqPage } from '@/components/faq-page';
import { isSupportedLanguage } from '@/lib/content/locale';
import { loadFaqPage } from '@/lib/content/loadFaq';

export default async function FaqRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  return <FaqPage page={loadFaqPage(lang)} />;
}

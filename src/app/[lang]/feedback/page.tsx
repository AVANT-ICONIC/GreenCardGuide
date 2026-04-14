import { notFound } from 'next/navigation';
import { FeedbackPage } from '@/components/feedback-page';
import { isSupportedLanguage } from '@/lib/content/locale';

export default async function FeedbackRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  return <FeedbackPage language={lang} />;
}

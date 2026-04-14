import { notFound } from 'next/navigation';
import { LocalizedHome } from '@/components/localized-home';
import { isSupportedLanguage } from '@/lib/content/locale';

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  return <LocalizedHome language={lang} />;
}

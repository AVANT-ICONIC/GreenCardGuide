import { notFound } from 'next/navigation';
import { GuidePage } from '@/components/guide-page';
import { isSupportedLanguage, supportedLanguages } from '@/lib/content/locale';
import { isGuideSlug, listGuideSlugs, loadGuidePage } from '@/lib/content/loadGuidePage';

export function generateStaticParams() {
  return supportedLanguages.flatMap((lang) =>
    listGuideSlugs().map((slug) => ({ lang, slug })),
  );
}

export default async function GuidePageRoute({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!isSupportedLanguage(lang) || !isGuideSlug(slug)) {
    notFound();
  }

  const page = loadGuidePage(lang, slug);

  return <GuidePage page={page} />;
}

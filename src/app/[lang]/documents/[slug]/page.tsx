import { notFound } from 'next/navigation';
import { DocumentDetailPage } from '@/components/document-detail-page';
import { isSupportedLanguage, supportedLanguages } from '@/lib/content/locale';
import {
  isDocumentSlug,
  listDocumentSlugs,
  loadDocumentDetailPage,
} from '@/lib/content/loadDocumentDetailPage';

export function generateStaticParams() {
  return supportedLanguages.flatMap((lang) =>
    listDocumentSlugs().map((slug) => ({ lang, slug })),
  );
}

export default async function DocumentDetailRoute({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!isSupportedLanguage(lang) || !isDocumentSlug(slug)) {
    notFound();
  }

  return <DocumentDetailPage content={loadDocumentDetailPage(lang, slug)} />;
}

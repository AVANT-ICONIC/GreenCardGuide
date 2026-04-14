import { notFound } from 'next/navigation';
import { DocumentsOverviewPage } from '@/components/documents-overview-page';
import { isSupportedLanguage } from '@/lib/content/locale';
import { loadDocumentsOverview } from '@/lib/content/loadDocumentsOverview';

export default async function DocumentsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  return <DocumentsOverviewPage content={loadDocumentsOverview(lang)} />;
}

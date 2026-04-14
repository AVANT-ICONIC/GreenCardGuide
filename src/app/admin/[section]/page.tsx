import { notFound } from 'next/navigation';
import { AdminSourcesPage } from '@/components/admin-sources-page';
import { AdminSectionPage } from '@/components/admin-section-page';
import { isAdminSectionSlug } from '@/lib/admin/sections';
import { loadSourceReferences } from '@/lib/content/loadSourceReferences';

export function generateStaticParams() {
  return ['content', 'sources', 'rules', 'reviews'].map((section) => ({
    section,
  }));
}

export default async function AdminSubsectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!isAdminSectionSlug(section)) {
    notFound();
  }

  if (section === 'sources') {
    return <AdminSourcesPage references={loadSourceReferences()} />;
  }

  return <AdminSectionPage slug={section} />;
}

import { notFound } from 'next/navigation';
import { AdminSectionPage } from '@/components/admin-section-page';
import { isAdminSectionSlug } from '@/lib/admin/sections';

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

  return <AdminSectionPage slug={section} />;
}

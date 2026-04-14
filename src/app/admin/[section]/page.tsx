import { notFound } from 'next/navigation';
import { AdminContentPage } from '@/components/admin-content-page';
import { AdminRulesPage } from '@/components/admin-rules-page';
import { AdminReviewsPage } from '@/components/admin-reviews-page';
import { AdminSourcesPage } from '@/components/admin-sources-page';
import { loadContentDiffSummary } from '@/lib/admin/loadContentDiffScaffold';
import { AdminSectionPage } from '@/components/admin-section-page';
import { loadContentInventory } from '@/lib/admin/loadContentInventory';
import { loadPublishControlsSummary } from '@/lib/admin/loadPublishControlsScaffold';
import { loadReviewQueueSummary } from '@/lib/admin/loadReviewQueue';
import { loadSourceChangeReviewTasks } from '@/lib/admin/loadSourceChangeReviewTasks';
import { loadSourceCoverageSummary } from '@/lib/admin/loadSourceCoverageSummary';
import { isAdminSectionSlug } from '@/lib/admin/sections';
import { loadSourceReferences } from '@/lib/content/loadSourceReferences';
import { loadStoredFeedbackSubmissions } from '@/lib/feedback/storage';
import { loadChecklistQuestions, loadRequirementRules } from '@/lib/seed/loadSeedData';

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

  if (section === 'content') {
    return (
      <AdminContentPage
        summary={loadContentInventory()}
        diffSummary={loadContentDiffSummary()}
        publishSummary={loadPublishControlsSummary()}
      />
    );
  }

  if (section === 'sources') {
    return (
      <AdminSourcesPage
        coverageSummary={loadSourceCoverageSummary()}
        references={loadSourceReferences()}
        tasks={loadSourceChangeReviewTasks()}
      />
    );
  }

  if (section === 'rules') {
    return (
      <AdminRulesPage
        questions={loadChecklistQuestions()}
        rules={loadRequirementRules()}
      />
    );
  }

  if (section === 'reviews') {
    return (
      <AdminReviewsPage
        summary={loadReviewQueueSummary()}
        feedbackItems={await loadStoredFeedbackSubmissions()}
      />
    );
  }

  return <AdminSectionPage slug={section} />;
}

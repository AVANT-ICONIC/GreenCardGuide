import { guideSlugs, getGuideContent } from '@/content/guides';
import { getFaqItems } from '@/content/faq';
import { getGlossaryTerms } from '@/content/glossary';
import { getPlaceholderSourceReferenceKeys } from '@/lib/content/loadSourceReferences';
import { loadDocumentsOverview } from '@/lib/content/loadDocumentsOverview';

export interface ReviewQueueEntry {
  surface: string;
  route: string;
  review_status: 'placeholder' | 'verified';
  confidence_label: string;
  source_references: string[];
  note: string;
}

export function loadReviewQueueEntries(): ReviewQueueEntry[] {
  const placeholderSourceKeys = getPlaceholderSourceReferenceKeys();
  const guideEntries = guideSlugs.map((slug) => {
    const page = getGuideContent('en', slug);

    return {
      surface: `Guide: ${slug}`,
      route: `/[lang]/guides/${slug}`,
      review_status: page.review_status,
      confidence_label: page.confidence_label,
      source_references: placeholderSourceKeys,
      note: 'Localized guide scaffold still needs source-backed editorial review.',
    } satisfies ReviewQueueEntry;
  });

  const faqEntries = [
    {
      surface: 'FAQ',
      route: '/[lang]/faq',
      review_status: getFaqItems('en')[0]?.review_status ?? 'placeholder',
      confidence_label: getFaqItems('en')[0]?.confidence_label ?? 'verify_with_official',
      source_references: placeholderSourceKeys,
      note: 'FAQ surface exists, but entries remain placeholder scaffolding.',
    },
  ] satisfies ReviewQueueEntry[];

  const glossaryEntries = [
    {
      surface: 'Glossary',
      route: '/[lang]/glossary',
      review_status: getGlossaryTerms('en')[0]?.review_status ?? 'placeholder',
      confidence_label:
        getGlossaryTerms('en')[0]?.confidence_label ?? 'verify_with_official',
      source_references: placeholderSourceKeys,
      note: 'Glossary terms exist, but definitions are not source-backed yet.',
    },
  ] satisfies ReviewQueueEntry[];

  const documents = loadDocumentsOverview('en');
  const documentEntries = [
    {
      surface: 'Documents overview',
      route: '/[lang]/documents',
      review_status: documents.review_status,
      confidence_label: documents.confidence_label,
      source_references: documents.source_references,
      note: 'Seeded document overview is visible, but still framed as placeholder content.',
    },
  ] satisfies ReviewQueueEntry[];

  const hubEntries = [
    {
      surface: 'Ciudad Juarez hub',
      route: '/[lang]/ciudad-juarez',
      review_status: 'placeholder',
      confidence_label: 'verify_with_official',
      source_references: placeholderSourceKeys,
      note: 'Post hub links existing surfaces but still needs source-backed step summaries.',
    },
  ] satisfies ReviewQueueEntry[];

  return [
    ...guideEntries,
    ...faqEntries,
    ...glossaryEntries,
    ...documentEntries,
    ...hubEntries,
  ];
}

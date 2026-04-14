import { guideSlugs } from '@/content/guides';
import { loadCiudadJuarezHubContent } from '@/lib/content/loadCiudadJuarezHubContent';
import { loadFaqPage } from '@/lib/content/loadFaq';
import { loadGlossaryPage } from '@/lib/content/loadGlossary';
import { loadDocumentsOverview } from '@/lib/content/loadDocumentsOverview';
import { loadGuidePage } from '@/lib/content/loadGuidePage';

export interface ReviewQueueEntry {
  surface: string;
  route: string;
  review_status: 'placeholder' | 'verified';
  confidence_label: string;
  source_references: string[];
  note: string;
}

export function loadReviewQueueEntries(): ReviewQueueEntry[] {
  const guideEntries = guideSlugs.map((slug) => {
    const page = loadGuidePage('en', slug);

    return {
      surface: `Guide: ${slug}`,
      route: `/[lang]/guides/${slug}`,
      review_status: page.review_status,
      confidence_label: page.confidence_label,
      source_references: page.source_references,
      note: 'Localized guide scaffold still needs source-backed editorial review.',
    } satisfies ReviewQueueEntry;
  });

  const faqPage = loadFaqPage('en');
  const faqEntries = [
    {
      surface: 'FAQ',
      route: '/[lang]/faq',
      review_status: faqPage.review_status,
      confidence_label: faqPage.confidence_label,
      source_references: faqPage.source_references,
      note: 'FAQ surface exists, but entries remain placeholder scaffolding.',
    },
  ] satisfies ReviewQueueEntry[];

  const glossaryPage = loadGlossaryPage('en');
  const glossaryEntries = [
    {
      surface: 'Glossary',
      route: '/[lang]/glossary',
      review_status: glossaryPage.review_status,
      confidence_label: glossaryPage.confidence_label,
      source_references: glossaryPage.source_references,
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

  const hub = loadCiudadJuarezHubContent('en');
  const hubEntries = [
    {
      surface: 'Ciudad Juarez hub',
      route: '/[lang]/ciudad-juarez',
      review_status: hub.review_status,
      confidence_label: hub.confidence_label,
      source_references: hub.source_references,
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

import { guideSlugs } from '@/content/guides';
import { loadDocumentsOverview } from '@/lib/content/loadDocumentsOverview';
import { loadFaqItems } from '@/lib/content/loadFaq';
import { loadGlossaryTerms } from '@/lib/content/loadGlossary';
import { loadGuidePage } from '@/lib/content/loadGuidePage';
import type { ConfidenceLabel, Language } from '@/lib/types/domain';

export interface ContentInventoryItem {
  surface: string;
  route: string;
  content_type: 'guide' | 'faq' | 'glossary' | 'documents' | 'hub';
  locales: Language[];
  review_status: 'placeholder' | 'verified';
  confidence_label: ConfidenceLabel;
  source_references: string[];
  entry_count: number;
  note: string;
}

export interface ContentInventorySummary {
  items: ContentInventoryItem[];
  totalSurfaces: number;
  placeholderSurfaces: number;
  verifiedSurfaces: number;
  localizedSurfaces: number;
}

function mergeLocales(
  ...localeSets: Language[][]
): Language[] {
  return [...new Set(localeSets.flat())];
}

export function loadContentInventory(): ContentInventorySummary {
  const guideItems = guideSlugs.map((slug) => {
    const english = loadGuidePage('en', slug);
    const spanish = loadGuidePage('es', slug);

    return {
      surface: `Guide: ${slug}`,
      route: `/[lang]/guides/${slug}`,
      content_type: 'guide',
      locales: mergeLocales([english.language], [spanish.language]),
      review_status: english.review_status,
      confidence_label: english.confidence_label,
      source_references: english.source_references,
      entry_count: english.sections.length + spanish.sections.length,
      note: 'Guide route is live in both locales, but editorial copy is still placeholder-only.',
    } satisfies ContentInventoryItem;
  });

  const faqEn = loadFaqItems('en');
  const faqEs = loadFaqItems('es');
  const glossaryEn = loadGlossaryTerms('en');
  const glossaryEs = loadGlossaryTerms('es');
  const documentsEn = loadDocumentsOverview('en');
  const documentsEs = loadDocumentsOverview('es');

  const sharedItems = [
    {
      surface: 'FAQ',
      route: '/[lang]/faq',
      content_type: 'faq',
      locales: mergeLocales(
        faqEn.map((item) => item.language),
        faqEs.map((item) => item.language),
      ),
      review_status: faqEn[0]?.review_status ?? 'placeholder',
      confidence_label: faqEn[0]?.confidence_label ?? 'verify_with_official',
      source_references: faqEn[0]?.source_references ?? [],
      entry_count: faqEn.length + faqEs.length,
      note: 'FAQ entries exist in both locales, but they are still trust-boundary placeholder copy.',
    },
    {
      surface: 'Glossary',
      route: '/[lang]/glossary',
      content_type: 'glossary',
      locales: mergeLocales(
        glossaryEn.map((term) => term.language),
        glossaryEs.map((term) => term.language),
      ),
      review_status: glossaryEn[0]?.review_status ?? 'placeholder',
      confidence_label:
        glossaryEn[0]?.confidence_label ?? 'verify_with_official',
      source_references: glossaryEn[0]?.source_references ?? [],
      entry_count: glossaryEn.length + glossaryEs.length,
      note: 'Glossary terms are typed and bilingual, but still need reviewed definitions and source mapping.',
    },
    {
      surface: 'Documents overview',
      route: '/[lang]/documents',
      content_type: 'documents',
      locales: mergeLocales([documentsEn.language], [documentsEs.language]),
      review_status: documentsEn.review_status,
      confidence_label: documentsEn.confidence_label,
      source_references: documentsEn.source_references,
      entry_count:
        documentsEn.sections.reduce(
          (count, section) => count + section.documents.length,
          0,
        ) +
        documentsEs.sections.reduce(
          (count, section) => count + section.documents.length,
          0,
        ),
      note: 'Documents overview is fed by the deterministic seed set, but the page copy remains intentionally placeholder.',
    },
    {
      surface: 'Ciudad Juarez hub',
      route: '/[lang]/ciudad-juarez',
      content_type: 'hub',
      locales: ['en', 'es'],
      review_status: 'placeholder',
      confidence_label: 'verify_with_official',
      source_references: documentsEn.source_references,
      entry_count: 2,
      note: 'Post hub exists for both locales, but its step framing and practical guidance still need source-backed editorial work.',
    },
  ] satisfies ContentInventoryItem[];

  const items = [...guideItems, ...sharedItems];

  return {
    items,
    totalSurfaces: items.length,
    placeholderSurfaces: items.filter((item) => item.review_status === 'placeholder')
      .length,
    verifiedSurfaces: items.filter((item) => item.review_status === 'verified').length,
    localizedSurfaces: items.filter((item) => item.locales.length > 1).length,
  };
}

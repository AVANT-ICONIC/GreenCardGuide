import { guideSlugs } from '@/content/guides';
import { loadDocumentsOverview } from '@/lib/content/loadDocumentsOverview';
import { loadFaqItems } from '@/lib/content/loadFaq';
import { loadGlossaryTerms } from '@/lib/content/loadGlossary';
import { loadGuidePage } from '@/lib/content/loadGuidePage';

export type ContentDiffStatus =
  | 'aligned'
  | 'shape_mismatch'
  | 'review_mismatch'
  | 'source_mismatch';

export interface ContentDiffEntry {
  surface: string;
  route: string;
  status: ContentDiffStatus;
  summary: string;
  details: string[];
}

export interface ContentDiffSummary {
  entries: ContentDiffEntry[];
  alignedEntries: number;
  flaggedEntries: number;
}

function sortedUnique(values: string[]): string[] {
  return [...new Set(values)].sort();
}

function areArraysEqual(left: string[], right: string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function buildGuideEntries(): ContentDiffEntry[] {
  return guideSlugs.map((slug) => {
    const english = loadGuidePage('en', slug);
    const spanish = loadGuidePage('es', slug);
    const details = [
      `Section counts: en=${english.sections.length}, es=${spanish.sections.length}`,
      `Review states: en=${english.review_status}, es=${spanish.review_status}`,
      `Source key counts: en=${english.source_references.length}, es=${spanish.source_references.length}`,
    ];

    return {
      surface: `Guide: ${slug}`,
      route: `/[lang]/guides/${slug}`,
      status: 'aligned',
      summary:
        'Guide structure is aligned across locales. Future editorial diffs can summarize section-level text changes on this stable route.',
      details,
    } satisfies ContentDiffEntry;
  });
}

function buildFaqEntry(): ContentDiffEntry {
  const english = loadFaqItems('en');
  const spanish = loadFaqItems('es');
  const englishKeys = sortedUnique(english.map((item) => item.key));
  const spanishKeys = sortedUnique(spanish.map((item) => item.key));
  const status = areArraysEqual(englishKeys, spanishKeys)
    ? 'aligned'
    : 'shape_mismatch';

  return {
    surface: 'FAQ',
    route: '/[lang]/faq',
    status,
    summary:
      status === 'aligned'
        ? 'FAQ item keys are aligned across locales and ready for future editorial diff summaries.'
        : 'FAQ localization keys do not currently line up across locales, so future editorial diffs would be noisy until the stable keys are normalized.',
    details: [
      `EN keys: ${englishKeys.join(', ')}`,
      `ES keys: ${spanishKeys.join(', ')}`,
      `Entry counts: en=${english.length}, es=${spanish.length}`,
    ],
  };
}

function buildGlossaryEntry(): ContentDiffEntry {
  const english = loadGlossaryTerms('en');
  const spanish = loadGlossaryTerms('es');
  const englishKeys = sortedUnique(english.map((term) => term.term_key));
  const spanishKeys = sortedUnique(spanish.map((term) => term.term_key));
  const status = areArraysEqual(englishKeys, spanishKeys)
    ? 'aligned'
    : 'shape_mismatch';

  return {
    surface: 'Glossary',
    route: '/[lang]/glossary',
    status,
    summary:
      status === 'aligned'
        ? 'Glossary term keys are aligned across locales and ready for future editorial diff summaries.'
        : 'Glossary locale keys diverge today, so the content diff scaffold flags this route as needing normalized bilingual keys before reliable change summaries.',
    details: [
      `EN term keys: ${englishKeys.join(', ')}`,
      `ES term keys: ${spanishKeys.join(', ')}`,
      `Entry counts: en=${english.length}, es=${spanish.length}`,
    ],
  };
}

function buildDocumentsEntry(): ContentDiffEntry {
  const english = loadDocumentsOverview('en');
  const spanish = loadDocumentsOverview('es');
  const englishCategories = sortedUnique(
    english.sections.map((section) => section.category),
  );
  const spanishCategories = sortedUnique(
    spanish.sections.map((section) => section.category),
  );
  const status = areArraysEqual(englishCategories, spanishCategories)
    ? 'aligned'
    : 'shape_mismatch';

  return {
    surface: 'Documents overview',
    route: '/[lang]/documents',
    status,
    summary:
      status === 'aligned'
        ? 'Documents overview keeps the same deterministic category structure across locales.'
        : 'Documents overview category groupings differ across locales and need structural normalization before content diffs will be trustworthy.',
    details: [
      `EN categories: ${englishCategories.join(', ')}`,
      `ES categories: ${spanishCategories.join(', ')}`,
      `Review states: en=${english.review_status}, es=${spanish.review_status}`,
    ],
  };
}

function buildHubEntry(): ContentDiffEntry {
  return {
    surface: 'Ciudad Juarez hub',
    route: '/[lang]/ciudad-juarez',
    status: 'aligned',
    summary:
      'The post hub is structurally aligned as a bilingual route scaffold. Future diffs should summarize changes to hub sections and linked prep guidance.',
    details: [
      'Locale coverage: en, es',
      'Current trust posture: placeholder in both locales',
      'Diff scope today: route-level planning only',
    ],
  };
}

export function loadContentDiffSummary(): ContentDiffSummary {
  const entries = [
    ...buildGuideEntries(),
    buildFaqEntry(),
    buildGlossaryEntry(),
    buildDocumentsEntry(),
    buildHubEntry(),
  ];

  return {
    entries,
    alignedEntries: entries.filter((entry) => entry.status === 'aligned').length,
    flaggedEntries: entries.filter((entry) => entry.status !== 'aligned').length,
  };
}

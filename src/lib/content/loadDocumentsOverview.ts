import { loadDocuments } from '@/lib/seed/loadSeedData';
import { loadContentReviewMetadata } from './loadContentReviewMetadata';
import { getPlaceholderSourceReferenceKeys } from './loadSourceReferences';
import type { DocumentDefinition, Language } from '@/lib/types/domain';

export interface DocumentsOverviewSection {
  category: string;
  title: string;
  documents: DocumentDefinition[];
}

export interface DocumentsOverviewContent {
  language: Language;
  title: string;
  summary: string;
  review_status: 'placeholder';
  confidence_label: 'verify_with_official';
  last_reviewed_at: string;
  source_references: string[];
  sections: DocumentsOverviewSection[];
}

const categoryTitles = {
  en: {
    identity: 'Identity documents',
    appointment: 'Appointment and confirmation documents',
    civil: 'Civil documents',
    financial: 'Financial support documents',
  },
  es: {
    identity: 'Documentos de identidad',
    appointment: 'Documentos de cita y confirmacion',
    civil: 'Documentos civiles',
    financial: 'Documentos de patrocinio economico',
  },
} as const;

const pageCopy = {
  en: {
    title: 'Documents overview',
    summary:
      'Seeded document definitions grouped into a bilingual placeholder overview. This page organizes the current document set without claiming that every listed item is verified final guidance for every case.',
  },
  es: {
    title: 'Resumen de documentos',
    summary:
      'Definiciones semilla de documentos agrupadas en un resumen bilingue provisional. Esta pagina organiza el conjunto actual de documentos sin afirmar que cada elemento sea orientacion final verificada para todos los casos.',
  },
} as const;

function groupDocumentsByCategory(
  language: Language,
  documents: DocumentDefinition[],
): DocumentsOverviewSection[] {
  const grouped = new Map<string, DocumentDefinition[]>();

  for (const document of documents) {
    const existing = grouped.get(document.category) ?? [];
    existing.push(document);
    grouped.set(document.category, existing);
  }

  return [...grouped.entries()].map(([category, categoryDocuments]) => ({
    category,
    title:
      categoryTitles[language][category as keyof (typeof categoryTitles)[typeof language]] ??
      category,
    documents: categoryDocuments,
  }));
}

export function loadDocumentsOverview(
  language: Language,
): DocumentsOverviewContent {
  return {
    language,
    title: pageCopy[language].title,
    summary: pageCopy[language].summary,
    review_status: 'placeholder',
    confidence_label: 'verify_with_official',
    last_reviewed_at: loadContentReviewMetadata(language, 'documents').last_reviewed_at,
    source_references: getPlaceholderSourceReferenceKeys(),
    sections: groupDocumentsByCategory(language, loadDocuments()),
  };
}

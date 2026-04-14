import { getGuideContent, guideSlugs, type GuideSlug } from '@/content/guides';
import type { GuidePageContent } from './types';
import type { Language } from '@/lib/types/domain';
import { loadContentReviewMetadata } from './loadContentReviewMetadata';
import { loadDocumentCoverageSummary } from './loadDocumentCoverageSummary';
import { getDocumentDetailHref } from './loadDocumentDetailPage';
import { loadSourceReferenceKeysForSurface } from './sourceMappings';
import { loadDocuments } from '@/lib/seed/loadSeedData';

const packetGuideCopy = {
  en: {
    title: 'What to bring',
    summary:
      'Deterministic packet guide built from the current seeded document library and active checklist rule coverage. Use the checklist for case-specific triggers, then use this guide to review the seeded packet surfaces in one place.',
    sections: {
      checklist: {
        heading: 'Use this guide with the checklist',
        body:
          'Start with the seeded checklist to surface the current required, conditional, print, and risk outputs for your answers. Then use the packet sections below to open the seeded document detail pages and review the current library structure.',
        links: [
          {
            label: 'Start checklist',
            href: '/en/checklist/start',
            description:
              'Answer the current seeded questions and surface the packet items tied to your case facts.',
          },
          {
            label: 'Open documents overview',
            href: '/en/documents',
            description:
              'Browse the full seeded document library when you need a broader inventory view.',
          },
        ],
      },
      core: {
        heading: 'Core packet surfaced by active rules',
        body:
          'These seeded documents are already surfaced by current required-document rules for the Ciudad Juarez family-based path.',
      },
      conditional: {
        heading: 'Conditional packet branches already modeled',
        body:
          'These seeded documents appear only when the current answers trigger the matching branch. Review them when your case includes those conditions.',
      },
      library: {
        heading: 'Seeded library still outside active checklist coverage',
        body:
          'These document detail pages already exist in the shared library, but the current active rules do not surface them yet. Keep them as reference pages, not universal requirements.',
      },
      required: 'Currently surfaced as a required document in the seeded checklist.',
      conditionalRequired:
        'Surfaced only when the seeded checklist hits the matching conditional branch.',
      uncovered:
        'Available in the seeded document library, but not yet referenced by an active checklist rule.',
    },
  },
  es: {
    title: 'Que llevar',
    summary:
      'Guia determinista del paquete construida con la biblioteca semilla actual de documentos y la cobertura activa de reglas de la lista. Use la lista para activar condiciones del caso y luego esta guia para revisar en un solo lugar las superficies documentales ya sembradas.',
    sections: {
      checklist: {
        heading: 'Use esta guia junto con la lista',
        body:
          'Empiece con la lista semilla para mostrar las salidas actuales de requeridos, condicionales, impresion y riesgo segun sus respuestas. Luego use las secciones de abajo para abrir los detalles de documentos sembrados y revisar la estructura actual de la biblioteca.',
        links: [
          {
            label: 'Empezar lista',
            href: '/es/checklist/start',
            description:
              'Responda las preguntas semilla actuales y vea los elementos del paquete ligados a los datos de su caso.',
          },
          {
            label: 'Abrir resumen de documentos',
            href: '/es/documents',
            description:
              'Revise la biblioteca completa de documentos cuando necesite una vista mas amplia del inventario.',
          },
        ],
      },
      core: {
        heading: 'Paquete base ya cubierto por reglas activas',
        body:
          'Estos documentos semilla ya aparecen en las reglas actuales de documentos requeridos para la ruta familiar en Ciudad Juarez.',
      },
      conditional: {
        heading: 'Ramas condicionales del paquete ya modeladas',
        body:
          'Estos documentos semilla solo aparecen cuando las respuestas activan la rama correspondiente. Reviselos cuando su caso incluya esas condiciones.',
      },
      library: {
        heading: 'Biblioteca semilla fuera de la cobertura activa de la lista',
        body:
          'Estas paginas de detalle ya existen en la biblioteca compartida, pero las reglas activas actuales todavia no las muestran. Mantengalas como referencia, no como requisitos universales.',
      },
      required: 'Actualmente aparece como documento requerido en la lista semilla.',
      conditionalRequired:
        'Solo aparece cuando la lista semilla activa la rama condicional correspondiente.',
      uncovered:
        'Disponible en la biblioteca semilla de documentos, pero todavia no esta referenciado por una regla activa de la lista.',
    },
  },
} as const;

function buildPacketGuide(language: Language): GuidePageContent {
  const documents = loadDocuments();
  const coverageBySlug = new Map(
    loadDocumentCoverageSummary().map((entry) => [entry.document_slug, entry]),
  );
  const copy = packetGuideCopy[language];

  const requiredDocuments = documents.filter((document) =>
    coverageBySlug.get(document.slug)?.output_types.includes('required_document'),
  );
  const conditionalDocuments = documents.filter((document) =>
    coverageBySlug.get(document.slug)?.output_types.includes('conditional_document'),
  );
  const uncoveredDocuments = documents.filter(
    (document) => !coverageBySlug.get(document.slug)?.is_covered,
  );

  return {
    slug: 'what-to-bring',
    language,
    title: copy.title,
    summary: copy.summary,
    sections: [
      {
        heading: copy.sections.checklist.heading,
        body: copy.sections.checklist.body,
        links: copy.sections.checklist.links.map((link) => ({
          label: link.label,
          href: link.href,
          description: link.description,
        })),
      },
      {
        heading: copy.sections.core.heading,
        body: copy.sections.core.body,
        links: requiredDocuments.map((document) => ({
          label: language === 'en' ? document.label_en : document.label_es,
          href: getDocumentDetailHref(language, document.slug),
          description: copy.sections.required,
        })),
      },
      {
        heading: copy.sections.conditional.heading,
        body: copy.sections.conditional.body,
        links: conditionalDocuments.map((document) => ({
          label: language === 'en' ? document.label_en : document.label_es,
          href: getDocumentDetailHref(language, document.slug),
          description: copy.sections.conditionalRequired,
        })),
      },
      {
        heading: copy.sections.library.heading,
        body: copy.sections.library.body,
        links: uncoveredDocuments.map((document) => ({
          label: language === 'en' ? document.label_en : document.label_es,
          href: getDocumentDetailHref(language, document.slug),
          description: copy.sections.uncovered,
        })),
      },
    ],
    confidence_label: 'verify_with_official',
    review_status: 'placeholder',
    last_reviewed_at: loadContentReviewMetadata(language, 'what-to-bring').last_reviewed_at,
    source_references: loadSourceReferenceKeysForSurface('what-to-bring'),
  };
}

export function isGuideSlug(value: string): value is GuideSlug {
  return guideSlugs.includes(value as GuideSlug);
}

export function loadGuidePage(
  language: Language,
  slug: GuideSlug,
): GuidePageContent {
  if (slug === 'what-to-bring') {
    return buildPacketGuide(language);
  }

  return {
    ...getGuideContent(language, slug),
    last_reviewed_at: loadContentReviewMetadata(language, slug).last_reviewed_at,
    source_references: loadSourceReferenceKeysForSurface(slug),
  };
}

export function listGuideSlugs(): GuideSlug[] {
  return guideSlugs;
}

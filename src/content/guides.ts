import type { GuidePageContent } from '@/lib/content/types';
import type { Language } from '@/lib/types/domain';

const guideContent = {
  en: {
    'what-to-bring': {
      title: 'What to bring',
      summary:
        'Placeholder scaffold for the core Ciudad Juarez bring-list guide.',
      sections: [
        {
          heading: 'Required packet categories',
          body:
            'This placeholder page will later separate required documents, conditional items, and backup documents using source-backed editorial content.',
        },
        {
          heading: 'How to use this guide',
          body:
            'For now, use the checklist flow for seeded deterministic output. This guide route exists so long-form bilingual content can plug into a stable loader pattern.',
        },
      ],
      confidence_label: 'verify_with_official',
    },
    'originals-vs-copies': {
      title: 'Originals vs copies',
      summary:
        'Placeholder scaffold for distinguishing originals, copies, and printouts.',
      sections: [
        {
          heading: 'Document format rules',
          body:
            'This page will eventually explain where originals, copies, and printed confirmations differ, but the current copy is intentionally non-authoritative until source mapping is added.',
        },
        {
          heading: 'Trust note',
          body:
            'Do not treat this placeholder as final guidance. It exists to prove the route, loader, and review-state structure only.',
        },
      ],
      confidence_label: 'verify_with_official',
    },
    'interview-week-plan': {
      title: 'Interview week plan',
      summary:
        'Placeholder scaffold for the medical, ASC, and interview-week sequence.',
      sections: [
        {
          heading: 'Sequence planning',
          body:
            'This route will later hold the practical interview-week timeline for Ciudad Juarez, with source-backed steps and operational preparation notes.',
        },
        {
          heading: 'Current scope',
          body:
            'The current content is intentionally generic so the content-loading mechanism can be validated without publishing unreviewed procedural guidance.',
        },
      ],
      confidence_label: 'verify_with_official',
    },
    'common-mistakes': {
      title: 'Common mistakes',
      summary:
        'Placeholder scaffold for turn-away and delay-prevention guidance.',
      sections: [
        {
          heading: 'Future structure',
          body:
            'This guide will later group avoidable mistakes by printing, packing, arrival, and missing-document scenarios using conservative editorial review.',
        },
        {
          heading: 'Placeholder boundary',
          body:
            'Until source-backed content is added, this page should be treated as product scaffolding rather than verified interview guidance.',
        },
      ],
      confidence_label: 'verify_with_official',
    },
  },
  es: {
    'what-to-bring': {
      title: 'Que llevar',
      summary:
        'Base provisional para la guia principal de que llevar a Ciudad Juarez.',
      sections: [
        {
          heading: 'Categorias del paquete requerido',
          body:
            'Esta pagina provisional separara despues los documentos requeridos, condicionales y de respaldo con contenido editorial respaldado por fuentes.',
        },
        {
          heading: 'Como usar esta guia',
          body:
            'Por ahora, use el flujo de la lista para obtener la salida determinista semilla. Esta ruta existe para conectar contenido bilingue largo a un patron estable de carga.',
        },
      ],
      confidence_label: 'verify_with_official',
    },
    'originals-vs-copies': {
      title: 'Originales y copias',
      summary:
        'Base provisional para distinguir entre originales, copias e impresiones.',
      sections: [
        {
          heading: 'Reglas del formato documental',
          body:
            'Esta pagina explicara despues donde cambian originales, copias y confirmaciones impresas, pero el texto actual no es autoritativo hasta agregar el mapeo de fuentes.',
        },
        {
          heading: 'Nota de confianza',
          body:
            'No trate esta base provisional como orientacion final. Existe solo para demostrar la ruta, el cargador y la estructura del estado de revision.',
        },
      ],
      confidence_label: 'verify_with_official',
    },
    'interview-week-plan': {
      title: 'Plan de la semana de entrevista',
      summary:
        'Base provisional para la secuencia de examen medico, ASC y semana de entrevista.',
      sections: [
        {
          heading: 'Planificacion de la secuencia',
          body:
            'Esta ruta contendra despues la linea de tiempo practica para Ciudad Juarez, con pasos respaldados por fuentes y notas operativas de preparacion.',
        },
        {
          heading: 'Alcance actual',
          body:
            'El contenido actual es intencionalmente generico para validar el mecanismo de carga sin publicar orientacion procesal no revisada.',
        },
      ],
      confidence_label: 'verify_with_official',
    },
    'common-mistakes': {
      title: 'Errores comunes',
      summary:
        'Base provisional para la guia de errores que causan retrasos o rechazos.',
      sections: [
        {
          heading: 'Estructura futura',
          body:
            'Esta guia agrupara despues los errores evitables por impresion, empaque, llegada y documentos faltantes con revision editorial conservadora.',
        },
        {
          heading: 'Limite provisional',
          body:
            'Hasta agregar contenido respaldado por fuentes, esta pagina debe tratarse como estructura del producto y no como orientacion verificada.',
        },
      ],
      confidence_label: 'verify_with_official',
    },
  },
} as const;

export type GuideSlug = keyof typeof guideContent.en;

export const guideSlugs = Object.keys(guideContent.en) as GuideSlug[];

export function getGuideContent(
  language: Language,
  slug: GuideSlug,
): GuidePageContent {
  const entry = guideContent[language][slug];

  return {
    slug,
    language,
    title: entry.title,
    summary: entry.summary,
    sections: entry.sections.map((section) => ({
      heading: section.heading,
      body: section.body,
    })),
    confidence_label: entry.confidence_label,
    review_status: 'placeholder',
    source_references: [],
  };
}

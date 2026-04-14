import type { GlossaryPageContent } from '@/lib/content/types';

const pageCopy = {
  en: {
    eyebrow: 'Glossary',
    title: 'Plain-language glossary',
    lede:
      'Placeholder glossary terms for the bilingual prep shell. Definitions are route scaffolding until source-backed editorial review is added.',
    reviewStatus: 'Review status',
    lastReviewed: 'Last reviewed',
    confidence: 'Confidence',
    sources: 'Sources',
  },
  es: {
    eyebrow: 'Glosario',
    title: 'Glosario en lenguaje claro',
    lede:
      'Terminos provisionales del glosario para la base bilingue. Las definiciones son estructura de ruta hasta agregar revision editorial respaldada por fuentes.',
    reviewStatus: 'Estado de revision',
    lastReviewed: 'Ultima revision',
    confidence: 'Confianza',
    sources: 'Fuentes',
  },
} as const;

export function GlossaryPage({ page }: { page: GlossaryPageContent }) {
  const copy = pageCopy[page.language];

  return (
    <section className="hero">
      <p className="hero__eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="hero__lede">{copy.lede}</p>

      <article className="hero__card content-meta">
        <p>
          <strong>{copy.reviewStatus}:</strong> {page.review_status}
        </p>
        <p>
          <strong>{copy.lastReviewed}:</strong> {page.last_reviewed_at}
        </p>
        <p>
          <strong>{copy.confidence}:</strong> {page.confidence_label}
        </p>
        <p>
          <strong>{copy.sources}:</strong> {page.source_references.join(', ')}
        </p>
      </article>

      <div className="guide-sections">
        {page.terms.map((term) => (
          <article key={term.term_key} className="hero__card">
            <h2>{term.term}</h2>
            <p>{term.definition}</p>
            {term.related_terms.length > 0 ? (
              <p className="results-section__confidence">
                {term.related_terms.join(', ')}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

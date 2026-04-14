import type { FaqPageContent } from '@/lib/content/types';

const pageCopy = {
  en: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    lede:
      'Placeholder FAQ content for the current bilingual prep shell. Entries remain explicitly unverified until source references are attached.',
    reviewStatus: 'Review status',
    lastReviewed: 'Last reviewed',
    confidence: 'Confidence',
    sources: 'Sources',
  },
  es: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Preguntas frecuentes',
    lede:
      'Contenido provisional de preguntas frecuentes para la base bilingue actual. Las entradas siguen sin verificarse hasta adjuntar referencias de fuentes.',
    reviewStatus: 'Estado de revision',
    lastReviewed: 'Ultima revision',
    confidence: 'Confianza',
    sources: 'Fuentes',
  },
} as const;

export function FaqPage({ page }: { page: FaqPageContent }) {
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
        {page.items.map((item) => (
          <article key={item.key} className="hero__card">
            <h2>{item.question}</h2>
            <p>{item.answer}</p>
            <p className="results-section__confidence">{item.confidence_label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

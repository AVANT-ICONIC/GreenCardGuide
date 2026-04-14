import type { FaqItemContent } from '@/lib/content/types';
import type { Language } from '@/lib/types/domain';

const pageCopy = {
  en: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    lede:
      'Placeholder FAQ content for the current bilingual prep shell. Entries remain explicitly unverified until source references are attached.',
    status: 'Placeholder content. Verify with official instructions.',
  },
  es: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Preguntas frecuentes',
    lede:
      'Contenido provisional de preguntas frecuentes para la base bilingue actual. Las entradas siguen sin verificarse hasta adjuntar referencias de fuentes.',
    status: 'Contenido provisional. Verifique con instrucciones oficiales.',
  },
} as const;

export function FaqPage({
  items,
  language,
}: {
  items: FaqItemContent[];
  language: Language;
}) {
  const copy = pageCopy[language];

  return (
    <section className="hero">
      <p className="hero__eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="hero__lede">{copy.lede}</p>

      <article className="hero__card content-meta">
        <p>{copy.status}</p>
      </article>

      <div className="guide-sections">
        {items.map((item) => (
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

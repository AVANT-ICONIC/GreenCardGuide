import type { GlossaryTermContent } from '@/lib/content/types';
import type { Language } from '@/lib/types/domain';

const pageCopy = {
  en: {
    eyebrow: 'Glossary',
    title: 'Plain-language glossary',
    lede:
      'Placeholder glossary terms for the bilingual prep shell. Definitions are route scaffolding until source-backed editorial review is added.',
    status: 'Placeholder definitions. Verify with official instructions.',
  },
  es: {
    eyebrow: 'Glosario',
    title: 'Glosario en lenguaje claro',
    lede:
      'Terminos provisionales del glosario para la base bilingue. Las definiciones son estructura de ruta hasta agregar revision editorial respaldada por fuentes.',
    status: 'Definiciones provisionales. Verifique con instrucciones oficiales.',
  },
} as const;

export function GlossaryPage({
  terms,
  language,
}: {
  terms: GlossaryTermContent[];
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
        {terms.map((term) => (
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

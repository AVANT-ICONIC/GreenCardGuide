import type { Language } from '@/lib/types/domain';

const homeContent = {
  en: {
    eyebrow: 'Ciudad Juarez family-based prep',
    title: 'Know what to print, pack, and bring.',
    lede:
      'This English route is the public home placeholder for the bilingual app shell. It establishes the structure for future checklist, guide, and trust surfaces without presenting unverified guidance as final content.',
    cards: [
      {
        title: 'Checklist path',
        body: 'Question flow, result assembly, and print mode are separate tasks layered on top of this route shell.',
      },
      {
        title: 'Trust posture',
        body: 'Official-source backing, review dates, and confidence labels will remain visible product primitives as the content system expands.',
      },
      {
        title: 'Bilingual structure',
        body: 'English and Spanish routes now exist in parallel so shared navigation and future content can evolve symmetrically.',
      },
    ],
  },
  es: {
    eyebrow: 'Preparacion familiar en Ciudad Juarez',
    title: 'Sepa que imprimir, guardar y llevar.',
    lede:
      'Esta ruta en espanol es el inicio provisional de la experiencia bilingue. Define la estructura para futuras listas, guias y superficies de confianza sin presentar contenido no verificado como orientacion final.',
    cards: [
      {
        title: 'Ruta de lista',
        body: 'El flujo de preguntas, el ensamblado de resultados y la vista imprimible siguen como tareas separadas sobre esta base.',
      },
      {
        title: 'Postura de confianza',
        body: 'Las fuentes oficiales, las fechas de revision y las etiquetas de confianza seguiran siendo elementos visibles del producto.',
      },
      {
        title: 'Estructura bilingue',
        body: 'Las rutas en ingles y espanol ahora existen en paralelo para que la navegacion compartida y el contenido crezcan con simetria.',
      },
    ],
  },
} satisfies Record<
  Language,
  {
    eyebrow: string;
    title: string;
    lede: string;
    cards: Array<{ title: string; body: string }>;
  }
>;

export function LocalizedHome({ language }: { language: Language }) {
  const content = homeContent[language];

  return (
    <section className="hero">
      <p className="hero__eyebrow">{content.eyebrow}</p>
      <h1>{content.title}</h1>
      <p className="hero__lede">{content.lede}</p>

      <div className="hero__grid">
        {content.cards.map((card) => (
          <article key={card.title} className="hero__card">
            <h2>{card.title}</h2>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

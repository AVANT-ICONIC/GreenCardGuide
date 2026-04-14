import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isSupportedLanguage } from '@/lib/content/locale';

const startCopy = {
  en: {
    eyebrow: 'Start checklist',
    title: 'Start the Ciudad Juarez family-based checklist.',
    lede:
      'Answer the current seed-backed questions to generate a grouped preparation checklist. This is operational prep scaffolding, not legal advice.',
    primary: 'Begin questions',
  },
  es: {
    eyebrow: 'Empezar lista',
    title: 'Empiece la lista familiar para Ciudad Juarez.',
    lede:
      'Responda las preguntas actuales basadas en semillas para generar una lista de preparacion agrupada. Esta es una base operativa de preparacion, no asesoria legal.',
    primary: 'Empezar preguntas',
  },
} as const;

export default async function ChecklistStartPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const copy = startCopy[lang];

  return (
    <section className="hero">
      <p className="hero__eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="hero__lede">{copy.lede}</p>
      <div className="hero__actions">
        <Link className="hero__button hero__button--primary" href={`/${lang}/checklist/questions`}>
          {copy.primary}
        </Link>
      </div>
    </section>
  );
}

import Link from 'next/link';
import type { Language } from '@/lib/types/domain';

const hubContent = {
  en: {
    eyebrow: 'Ciudad Juarez hub',
    title: 'Start your Ciudad Juarez prep from one place.',
    lede:
      'This post hub gathers the current deterministic checklist path and bilingual guide scaffolds for family-based interview prep. It is an orientation layer, not final verified guidance.',
    statusTitle: 'Current trust status',
    statusBody:
      'This hub is placeholder scaffolding. It points to current product surfaces while source-backed editorial content and review dates are still being attached.',
    sections: [
      {
        title: 'Checklist path',
        body: 'Start the seeded checklist flow, review grouped results, and open the print-friendly packing view.',
        links: [
          { label: 'Start checklist', href: '/checklist/start' },
          { label: 'View checklist results', href: '/checklist/results' },
          { label: 'Open print view', href: '/checklist/print' },
        ],
      },
      {
        title: 'Guide scaffolds',
        body: 'Open the current placeholder guides for what to bring, originals vs copies, interview-week planning, and common mistakes.',
        links: [
          { label: 'What to bring', href: '/guides/what-to-bring' },
          { label: 'Originals vs copies', href: '/guides/originals-vs-copies' },
          { label: 'Interview week plan', href: '/guides/interview-week-plan' },
          { label: 'Common mistakes', href: '/guides/common-mistakes' },
        ],
      },
      {
        title: 'What this page will become',
        body: 'As source-backed content is added, this hub will summarize the Ciudad Juarez step sequence, document priorities, and practical prep warnings in one place.',
        links: [],
      },
    ],
  },
  es: {
    eyebrow: 'Centro Ciudad Juarez',
    title: 'Empiece su preparacion para Ciudad Juarez desde un solo lugar.',
    lede:
      'Este centro del consulado reune la ruta determinista actual de la lista y las guias bilingues provisionales para la preparacion familiar. Es una capa de orientacion, no una guia final verificada.',
    statusTitle: 'Estado actual de confianza',
    statusBody:
      'Este centro es estructura provisional. Apunta a las superficies actuales del producto mientras se agregan contenido editorial respaldado por fuentes y fechas de revision.',
    sections: [
      {
        title: 'Ruta de la lista',
        body: 'Empiece el flujo semilla de la lista, revise los resultados agrupados y abra la vista imprimible para el paquete de viaje.',
        links: [
          { label: 'Empezar lista', href: '/checklist/start' },
          { label: 'Ver resultados', href: '/checklist/results' },
          { label: 'Abrir vista imprimible', href: '/checklist/print' },
        ],
      },
      {
        title: 'Guias provisionales',
        body: 'Abra las guias provisionales actuales para que llevar, originales y copias, plan de la semana de entrevista y errores comunes.',
        links: [
          { label: 'Que llevar', href: '/guides/what-to-bring' },
          { label: 'Originales y copias', href: '/guides/originals-vs-copies' },
          { label: 'Plan de la semana', href: '/guides/interview-week-plan' },
          { label: 'Errores comunes', href: '/guides/common-mistakes' },
        ],
      },
      {
        title: 'En que se convertira esta pagina',
        body: 'Cuando se agregue contenido respaldado por fuentes, este centro resumira en un solo lugar la secuencia de pasos en Ciudad Juarez, las prioridades documentales y las advertencias practicas.',
        links: [],
      },
    ],
  },
} as const;

export function CiudadJuarezHub({ language }: { language: Language }) {
  const content = hubContent[language];

  return (
    <section className="hero">
      <p className="hero__eyebrow">{content.eyebrow}</p>
      <h1>{content.title}</h1>
      <p className="hero__lede">{content.lede}</p>

      <article className="hero__card content-meta">
        <h2>{content.statusTitle}</h2>
        <p>{content.statusBody}</p>
      </article>

      <div className="guide-sections">
        {content.sections.map((section) => (
          <article key={section.title} className="hero__card">
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            {section.links.length > 0 ? (
              <div className="hub-links">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    className="hero__button hero__button--secondary"
                    href={`/${language}${link.href}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

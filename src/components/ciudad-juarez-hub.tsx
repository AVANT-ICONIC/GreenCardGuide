import Link from 'next/link';
import type { CiudadJuarezHubContent } from '@/lib/content/loadCiudadJuarezHubContent';

const hubContent = {
  en: {
    eyebrow: 'Ciudad Juarez hub',
    title: 'Start your Ciudad Juarez prep from one place.',
    lede:
      'This post hub gathers the current deterministic checklist path, seeded document library, and prep guides for family-based interview prep. It is an orientation layer, not final verified guidance.',
    statusTitle: 'Current trust status',
    reviewStatus: 'Review status',
    lastReviewed: 'Last reviewed',
    confidence: 'Confidence',
    sources: 'Sources',
    statusBody:
      'This hub is placeholder scaffolding. It points to current product surfaces while source-backed editorial content and review dates are still being attached.',
    sections: [
      {
        title: 'Checklist path',
        body: 'Use the checklist when you want answer-driven packet output, grouped results, and a print-friendly packing view tied to your current case facts.',
        links: [
          { label: 'Start checklist', href: '/checklist/start' },
          { label: 'View checklist results', href: '/checklist/results' },
          { label: 'Open print view', href: '/checklist/print' },
        ],
      },
      {
        title: 'Document library',
        body: 'Use the documents overview when you want to browse the seeded library directly, then open the packet guide to group those seeded detail pages into a checklist-first planning path.',
        links: [
          { label: 'Documents overview', href: '/documents' },
          { label: 'What to bring guide', href: '/guides/what-to-bring' },
        ],
      },
      {
        title: 'Prep guides',
        body: 'Continue into the adjacent guide surfaces when you need format reminders, interview-week planning scaffolds, or common-mistake review after checking your packet.',
        links: [
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
      'Este centro del consulado reune la ruta determinista actual de la lista, la biblioteca semilla de documentos y las guias de preparacion para casos familiares. Es una capa de orientacion, no una guia final verificada.',
    statusTitle: 'Estado actual de confianza',
    reviewStatus: 'Estado de revision',
    lastReviewed: 'Ultima revision',
    confidence: 'Confianza',
    sources: 'Fuentes',
    statusBody:
      'Este centro es estructura provisional. Apunta a las superficies actuales del producto mientras se agregan contenido editorial respaldado por fuentes y fechas de revision.',
    sections: [
      {
        title: 'Ruta de la lista',
        body: 'Use la lista cuando quiera una salida del paquete guiada por respuestas, resultados agrupados y una vista imprimible ligada a los datos actuales de su caso.',
        links: [
          { label: 'Empezar lista', href: '/checklist/start' },
          { label: 'Ver resultados', href: '/checklist/results' },
          { label: 'Abrir vista imprimible', href: '/checklist/print' },
        ],
      },
      {
        title: 'Biblioteca de documentos',
        body: 'Use el resumen de documentos cuando quiera recorrer directamente la biblioteca semilla y luego abra la guia de que llevar para agrupar esas paginas de detalle dentro de una ruta de planificacion basada en la lista.',
        links: [
          { label: 'Resumen de documentos', href: '/documents' },
          { label: 'Guia de que llevar', href: '/guides/what-to-bring' },
        ],
      },
      {
        title: 'Guias de preparacion',
        body: 'Continue hacia las guias relacionadas cuando necesite recordatorios sobre formatos, una base para la semana de entrevista o una revision de errores comunes despues de revisar su paquete.',
        links: [
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

export function CiudadJuarezHub({
  content,
}: {
  content: CiudadJuarezHubContent;
}) {
  const copy = hubContent[content.language];

  return (
    <section className="hero">
      <p className="hero__eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="hero__lede">{copy.lede}</p>

      <article className="hero__card content-meta">
        <h2>{copy.statusTitle}</h2>
        <p>{copy.statusBody}</p>
        <p>
          <strong>{copy.reviewStatus}:</strong> {content.review_status}
        </p>
        <p>
          <strong>{copy.lastReviewed}:</strong> {content.last_reviewed_at}
        </p>
        <p>
          <strong>{copy.confidence}:</strong> {content.confidence_label}
        </p>
        <p>
          <strong>{copy.sources}:</strong> {content.source_references.join(', ')}
        </p>
      </article>

      <div className="guide-sections">
        {copy.sections.map((section) => (
          <article key={section.title} className="hero__card">
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            {section.links.length > 0 ? (
              <div className="hub-links">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    className="hero__button hero__button--secondary"
                    href={`/${content.language}${link.href}`}
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

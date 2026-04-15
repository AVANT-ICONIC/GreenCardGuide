import Link from 'next/link';
import type { DocumentDetailContent } from '@/lib/content/loadDocumentDetailPage';
import { getGuideHref } from '@/lib/content/loadGuidePage';

const detailCopy = {
  en: {
    eyebrow: 'document detail',
    back: 'Back to documents overview',
    packetGuide: 'Open packet guide',
    checklistStart: 'Start checklist',
    reviewStatus: 'Review status',
    lastReviewed: 'Last reviewed',
    confidence: 'Confidence',
    sources: 'Sources',
    category: 'Category',
    currentCoverage: 'Current deterministic coverage',
    nextSteps: 'Use this document in the prep flow',
    noReferences:
      'No active checklist rule references this document yet. Keep it in the shared seed set without presenting it as universally required.',
    shownWhen: 'Shown when',
    placeholderNote:
      'This surface reflects the current structured seeds and rule references only. Verify case-specific document expectations with official instructions.',
    nextStepsBody:
      'Return to the packet guide to see how this document fits into the current seeded packet, or restart the checklist when you need answer-driven guidance for the rest of the case.',
  },
  es: {
    eyebrow: 'detalle del documento',
    back: 'Volver al resumen de documentos',
    packetGuide: 'Abrir guia de que llevar',
    checklistStart: 'Empezar lista',
    reviewStatus: 'Estado de revision',
    lastReviewed: 'Ultima revision',
    confidence: 'Confianza',
    sources: 'Fuentes',
    category: 'Categoria',
    currentCoverage: 'Cobertura determinista actual',
    nextSteps: 'Use este documento dentro del flujo de preparacion',
    noReferences:
      'Ninguna regla activa de la lista usa este documento todavia. Mantengalo en el conjunto compartido sin presentarlo como universalmente requerido.',
    shownWhen: 'Se muestra cuando',
    placeholderNote:
      'Esta superficie refleja solo las semillas estructuradas actuales y las referencias de reglas. Verifique las expectativas de documentos de su caso con instrucciones oficiales.',
    nextStepsBody:
      'Vuelva a la guia del paquete para ver como encaja este documento en el paquete semilla actual, o reinicie la lista cuando necesite orientacion guiada por respuestas para el resto del caso.',
  },
} as const;

export function DocumentDetailPage({
  content,
}: {
  content: DocumentDetailContent;
}) {
  const copy = detailCopy[content.language];

  return (
    <section className="hero">
      <p className="hero__eyebrow">{copy.eyebrow}</p>
      <h1>{content.title}</h1>
      <p className="hero__lede">{content.summary}</p>

      <div className="hero__actions">
        <Link
          className="hero__button hero__button--secondary"
          href={`/${content.language}/documents`}
        >
          {copy.back}
        </Link>
        <Link
          className="hero__button hero__button--secondary"
          href={getGuideHref(content.language, 'what-to-bring')}
        >
          {copy.packetGuide}
        </Link>
        <Link
          className="hero__button hero__button--primary"
          href={`/${content.language}/checklist/start`}
        >
          {copy.checklistStart}
        </Link>
      </div>

      <article className="hero__card content-meta">
        <p>
          <strong>{copy.category}:</strong> {content.category_title}
        </p>
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
        <p>{copy.placeholderNote}</p>
      </article>

      <div className="guide-sections">
        <article className="hero__card">
          <h2>{copy.nextSteps}</h2>
          <p>{copy.nextStepsBody}</p>
        </article>
        <article className="hero__card">
          <h2>{copy.currentCoverage}</h2>
          {content.references.length === 0 ? (
            <p>{copy.noReferences}</p>
          ) : (
            <ul className="document-reference-list">
              {content.references.map((reference) => (
                <li key={reference.rule_key}>
                  <strong>{reference.output_type_label}</strong>
                  {reference.notes ? <p>{reference.notes}</p> : null}
                  {reference.conditions.length > 0 ? (
                    <p>
                      <strong>{copy.shownWhen}:</strong>{' '}
                      {reference.conditions
                        .map((condition) => `${condition.label}: ${condition.value}`)
                        .join(' · ')}
                    </p>
                  ) : null}
                  <p className="results-section__confidence">{reference.rule_key}</p>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { getDocumentDetailHref } from '@/lib/content/loadDocumentDetailPage';
import type { DocumentsOverviewContent } from '@/lib/content/loadDocumentsOverview';

const metaCopy = {
  en: {
    reviewStatus: 'Review status',
    lastReviewed: 'Last reviewed',
    confidence: 'Confidence',
    sources: 'Sources',
    coverage: 'Current checklist coverage',
    covered: 'Covered by active rules',
    uncovered: 'Not yet referenced by active rules',
    rule: 'rule',
    rules: 'rules',
    openDetail: 'Open detail',
    placeholderNote:
      'This page reflects seeded document structure and placeholder trust framing. Verify case-specific requirements with official instructions.',
  },
  es: {
    reviewStatus: 'Estado de revision',
    lastReviewed: 'Ultima revision',
    confidence: 'Confianza',
    sources: 'Fuentes',
    coverage: 'Cobertura actual en la lista',
    covered: 'Cubierto por reglas activas',
    uncovered: 'Todavia no referenciado por reglas activas',
    rule: 'regla',
    rules: 'reglas',
    openDetail: 'Ver detalle',
    placeholderNote:
      'Esta pagina refleja la estructura semilla de documentos y una capa provisional de confianza. Verifique los requisitos de su caso con instrucciones oficiales.',
  },
} as const;

const outputTypeLabels = {
  en: {
    required_document: 'required document',
    conditional_document: 'conditional document',
    backup_document: 'backup document',
    print_item: 'print item',
    risk_flag: 'risk flag',
    prep_step: 'prep step',
    do_not_bring: 'do not bring',
    verify_with_official: 'verify with official instructions',
  },
  es: {
    required_document: 'documento requerido',
    conditional_document: 'documento condicional',
    backup_document: 'documento de respaldo',
    print_item: 'elemento para imprimir',
    risk_flag: 'alerta de riesgo',
    prep_step: 'paso de preparacion',
    do_not_bring: 'no llevar',
    verify_with_official: 'verifique con instrucciones oficiales',
  },
} as const;

function getCoverageSummary(
  language: DocumentsOverviewContent['language'],
  referenceCount: number,
  outputTypes: string[],
) {
  const copy = metaCopy[language];

  if (referenceCount === 0) {
    return copy.uncovered;
  }

  const localizedTypes = outputTypes.map(
    (outputType) =>
      outputTypeLabels[language][outputType as keyof (typeof outputTypeLabels)[typeof language]] ??
      outputType,
  );
  const ruleLabel = referenceCount === 1 ? copy.rule : copy.rules;

  return `${copy.covered}: ${referenceCount} ${ruleLabel} · ${localizedTypes.join(', ')}`;
}

export function DocumentsOverviewPage({
  content,
}: {
  content: DocumentsOverviewContent;
}) {
  const copy = metaCopy[content.language];

  return (
    <section className="hero">
      <p className="hero__eyebrow">documents</p>
      <h1>{content.title}</h1>
      <p className="hero__lede">{content.summary}</p>

      <article className="hero__card content-meta">
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
        {content.sections.map((section) => (
          <article key={section.category} className="hero__card">
            <h2>{section.title}</h2>
            <ul className="results-list">
              {section.documents.map((entry) => (
                <li key={entry.document.slug}>
                  <strong>
                    <Link href={getDocumentDetailHref(content.language, entry.document.slug)}>
                      {content.language === 'en'
                        ? entry.document.label_en
                        : entry.document.label_es}
                    </Link>
                  </strong>
                  <p>{entry.document.slug}</p>
                  <p>
                    <strong>{copy.coverage}:</strong>{' '}
                    {getCoverageSummary(
                      content.language,
                      entry.reference_count,
                      entry.output_types,
                    )}
                  </p>
                  <p>
                    <Link href={getDocumentDetailHref(content.language, entry.document.slug)}>
                      {copy.openDetail}
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

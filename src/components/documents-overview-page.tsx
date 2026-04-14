import Link from 'next/link';
import type { DocumentsOverviewContent } from '@/lib/content/loadDocumentsOverview';

const metaCopy = {
  en: {
    reviewStatus: 'Review status',
    lastReviewed: 'Last reviewed',
    confidence: 'Confidence',
    sources: 'Sources',
    openDetail: 'Open detail',
    placeholderNote:
      'This page reflects seeded document structure and placeholder trust framing. Verify case-specific requirements with official instructions.',
  },
  es: {
    reviewStatus: 'Estado de revision',
    lastReviewed: 'Ultima revision',
    confidence: 'Confianza',
    sources: 'Fuentes',
    openDetail: 'Ver detalle',
    placeholderNote:
      'Esta pagina refleja la estructura semilla de documentos y una capa provisional de confianza. Verifique los requisitos de su caso con instrucciones oficiales.',
  },
} as const;

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
              {section.documents.map((document) => (
                <li key={document.slug}>
                  <strong>
                    <Link href={`/${content.language}/documents/${document.slug}`}>
                      {content.language === 'en'
                        ? document.label_en
                        : document.label_es}
                    </Link>
                  </strong>
                  <p>{document.slug}</p>
                  <p>
                    <Link href={`/${content.language}/documents/${document.slug}`}>
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

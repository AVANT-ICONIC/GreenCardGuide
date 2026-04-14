import Link from 'next/link';
import type { GuidePageContent } from '@/lib/content/types';

const guideMetaCopy = {
  en: {
    reviewStatus: 'Review status',
    lastReviewed: 'Last reviewed',
    confidence: 'Confidence',
    sources: 'Sources',
    placeholderSources: 'Placeholder only. Source references not attached yet.',
  },
  es: {
    reviewStatus: 'Estado de revision',
    lastReviewed: 'Ultima revision',
    confidence: 'Confianza',
    sources: 'Fuentes',
    placeholderSources:
      'Solo provisional. Las referencias de fuentes todavia no estan adjuntas.',
  },
} as const;

export function GuidePage({ page }: { page: GuidePageContent }) {
  const copy = guideMetaCopy[page.language];

  return (
    <section className="hero">
      <p className="hero__eyebrow">{page.slug}</p>
      <h1>{page.title}</h1>
      <p className="hero__lede">{page.summary}</p>

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
          <strong>{copy.sources}:</strong>{' '}
          {page.source_references.length === 0
            ? copy.placeholderSources
            : page.source_references.join(', ')}
        </p>
      </article>

      <div className="guide-sections">
        {page.sections.map((section) => (
          <article key={section.heading} className="hero__card">
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
            {section.links && section.links.length > 0 ? (
              <ul className="results-list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <strong>
                      <Link href={link.href}>{link.label}</Link>
                    </strong>
                    {link.description ? <p>{link.description}</p> : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

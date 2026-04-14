import Link from 'next/link';
import type { ContentDiffSummary } from '@/lib/admin/loadContentDiffScaffold';
import type { ContentInventorySummary } from '@/lib/admin/loadContentInventory';

export function AdminContentPage({
  summary,
  diffSummary,
}: {
  summary: ContentInventorySummary;
  diffSummary: ContentDiffSummary;
}) {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="hero__eyebrow">Admin content</p>
        <h1>Content inventory and diff scaffold.</h1>
        <p className="hero__lede">
          This page summarizes the current structured content surfaces that exist
          in the repository. It is a read-only inventory and diff view, not an
          editor or publish workflow.
        </p>

        <article className="hero__card content-meta">
          <p>
            <strong>Tracked surfaces:</strong> {summary.totalSurfaces}
          </p>
          <p>
            <strong>Placeholder surfaces:</strong> {summary.placeholderSurfaces}
          </p>
          <p>
            <strong>Verified surfaces:</strong> {summary.verifiedSurfaces}
          </p>
          <p>
            <strong>Bilingual surfaces:</strong> {summary.localizedSurfaces}
          </p>
        </article>

        <div className="guide-sections">
          {summary.items.map((item) => (
            <article key={item.route} className="hero__card">
              <h2>{item.surface}</h2>
              <p>{item.note}</p>
              <p className="results-section__confidence">{item.confidence_label}</p>
              <ul className="results-list">
                <li>
                  <strong>Route:</strong> {item.route}
                </li>
                <li>
                  <strong>Content type:</strong> {item.content_type}
                </li>
                <li>
                  <strong>Locales:</strong> {item.locales.join(', ')}
                </li>
                <li>
                  <strong>Review status:</strong> {item.review_status}
                </li>
                <li>
                  <strong>Entries tracked:</strong> {item.entry_count}
                </li>
                <li>
                  <strong>Sources:</strong> {item.source_references.join(', ')}
                </li>
              </ul>
            </article>
          ))}
        </div>

        <article className="hero__card content-meta">
          <p>
            <strong>Aligned diff entries:</strong> {diffSummary.alignedEntries}
          </p>
          <p>
            <strong>Flagged diff entries:</strong> {diffSummary.flaggedEntries}
          </p>
          <p>
            <strong>Diff posture:</strong> Structural comparison only
          </p>
        </article>

        <div className="guide-sections">
          {diffSummary.entries.map((entry) => (
            <article key={`${entry.route}-diff`} className="hero__card">
              <h2>{entry.surface} diff view</h2>
              <p>{entry.summary}</p>
              <p className="results-section__confidence">{entry.status}</p>
              <ul className="results-list">
                <li>
                  <strong>Route:</strong> {entry.route}
                </li>
                {entry.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="hero__actions">
          <Link className="hero__button hero__button--secondary" href="/admin">
            Back to admin home
          </Link>
        </div>
      </section>
    </main>
  );
}

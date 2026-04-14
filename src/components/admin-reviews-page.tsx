import Link from 'next/link';
import type { ReviewQueueEntry } from '@/lib/admin/loadReviewQueue';

export function AdminReviewsPage({
  entries,
}: {
  entries: ReviewQueueEntry[];
}) {
  const placeholderCount = entries.filter(
    (entry) => entry.review_status === 'placeholder',
  ).length;

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="hero__eyebrow">Admin reviews</p>
        <h1>Review queue scaffold.</h1>
        <p className="hero__lede">
          This page summarizes the current content surfaces that still need
          review work. It is a queue-shaped scaffold, not a working review
          workflow system.
        </p>

        <article className="hero__card content-meta">
          <p>
            <strong>Tracked surfaces:</strong> {entries.length}
          </p>
          <p>
            <strong>Placeholder surfaces:</strong> {placeholderCount}
          </p>
          <p>
            <strong>Status:</strong> Manual summary only
          </p>
        </article>

        <div className="guide-sections">
          {entries.map((entry) => (
            <article key={entry.route} className="hero__card">
              <h2>{entry.surface}</h2>
              <p>{entry.note}</p>
              <ul className="results-list">
                <li>
                  <strong>Route:</strong> {entry.route}
                </li>
                <li>
                  <strong>Review status:</strong> {entry.review_status}
                </li>
                <li>
                  <strong>Confidence:</strong> {entry.confidence_label}
                </li>
                <li>
                  <strong>Sources:</strong> {entry.source_references.join(', ')}
                </li>
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

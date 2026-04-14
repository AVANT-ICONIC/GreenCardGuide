import Link from 'next/link';
import type { ReviewQueueSummary } from '@/lib/admin/loadReviewQueue';

export function AdminReviewsPage({
  summary,
}: {
  summary: ReviewQueueSummary;
}) {
  const placeholderCount = summary.entries.filter(
    (entry) => entry.review_status === 'placeholder',
  ).length;

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="hero__eyebrow">Admin reviews</p>
        <h1>Deterministic review queue.</h1>
        <p className="hero__lede">
          This page prioritizes the current content surfaces that still need
          review work. It is an operational queue only, not an automated
          editorial workflow system.
        </p>

        <article className="hero__card content-meta">
          <p>
            <strong>Tracked surfaces:</strong> {summary.entries.length}
          </p>
          <p>
            <strong>Placeholder surfaces:</strong> {placeholderCount}
          </p>
          <p>
            <strong>High priority:</strong> {summary.highPriorityCount}
          </p>
          <p>
            <strong>Medium priority:</strong> {summary.mediumPriorityCount}
          </p>
          <p>
            <strong>Low priority:</strong> {summary.lowPriorityCount}
          </p>
          <p>
            <strong>Under-sourced surfaces:</strong> {summary.underSourcedCount}
          </p>
          <p>
            <strong>Stale reviews:</strong> {summary.staleCount}
          </p>
        </article>

        <div className="guide-sections">
          {summary.entries.map((entry) => (
            <article key={entry.route} className="hero__card">
              <h2>{entry.surface}</h2>
              <p>{entry.note}</p>
              <p className="results-section__confidence">
                {entry.review_priority} priority
              </p>
              <ul className="results-list">
                <li>
                  <strong>Route:</strong> {entry.route}
                </li>
                <li>
                  <strong>Content type:</strong> {entry.content_type}
                </li>
                <li>
                  <strong>Review status:</strong> {entry.review_status}
                </li>
                <li>
                  <strong>Review recency:</strong> {entry.review_recency}
                </li>
                <li>
                  <strong>Last reviewed:</strong>{' '}
                  {entry.last_reviewed_at ?? 'not tracked yet'}
                </li>
                <li>
                  <strong>Confidence:</strong> {entry.confidence_label}
                </li>
                <li>
                  <strong>Source coverage:</strong> {entry.source_coverage}
                </li>
                <li>
                  <strong>Sources:</strong> {entry.source_references.join(', ')}
                </li>
                <li>
                  <strong>Blocker reason:</strong> {entry.blocker_reason}
                </li>
                <li>
                  <strong>Recommended next action:</strong>{' '}
                  {entry.recommended_next_action}
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

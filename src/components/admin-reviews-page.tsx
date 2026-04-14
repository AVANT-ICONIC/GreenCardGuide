import Link from 'next/link';
import type { FeedbackSummary } from '@/lib/admin/loadFeedbackSummary';
import type { StoredFeedbackSubmission } from '@/lib/feedback/storage';
import type { ReviewQueueSummary } from '@/lib/admin/loadReviewQueue';

export function AdminReviewsPage({
  feedbackSummary,
  summary,
  feedbackItems,
}: {
  feedbackSummary: FeedbackSummary;
  summary: ReviewQueueSummary;
  feedbackItems: StoredFeedbackSubmission[];
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
          <p>
            <strong>Stored feedback reports:</strong> {feedbackItems.length}
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

        <article className="hero__card content-meta">
          <p>
            <strong>Feedback inbox posture:</strong> Local review input only
          </p>
          <p>
            <strong>Current limitation:</strong> Submissions are stored locally
            for maintainer review. No moderation or publish tooling exists yet.
          </p>
        </article>

        <div className="guide-sections">
          <article className="hero__card">
            <h2>Feedback summary</h2>
            <ul className="results-list">
              <li>
                <strong>Total reports:</strong> {feedbackSummary.total}
              </li>
              <li>
                <strong>By type:</strong>{' '}
                {feedbackSummary.typeCounts.length > 0
                  ? feedbackSummary.typeCounts
                      .map((entry) => `${entry.report_type}: ${entry.count}`)
                      .join(', ')
                  : 'none'}
              </li>
              <li>
                <strong>Most reported routes:</strong>{' '}
                {feedbackSummary.routeCounts.length > 0
                  ? feedbackSummary.routeCounts
                      .slice(0, 3)
                      .map((entry) => `${entry.page_slug}: ${entry.count}`)
                      .join(', ')
                  : 'none'}
              </li>
            </ul>
          </article>
        </div>

        <div className="guide-sections">
          {feedbackItems.length === 0 ? (
            <article className="hero__card">
              <h2>Feedback inbox</h2>
              <p>No stored feedback submissions yet.</p>
            </article>
          ) : (
            feedbackItems.map((item) => (
              <article key={item.id} className="hero__card">
                <h2>{item.page_slug}</h2>
                <p>{item.message}</p>
                <p className="results-section__confidence">{item.report_type}</p>
                <ul className="results-list">
                  <li>
                    <strong>Submission ID:</strong> {item.id}
                  </li>
                  <li>
                    <strong>Language:</strong> {item.language}
                  </li>
                  <li>
                    <strong>Created:</strong> {item.created_at}
                  </li>
                </ul>
              </article>
            ))
          )}
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

import Link from 'next/link';
import type { SourceCoverageSummary } from '@/lib/admin/loadSourceCoverageSummary';
import type { SourceChangeReviewTask } from '@/lib/admin/loadSourceChangeReviewTasks';
import type { SourceReference } from '@/lib/types/domain';

export function AdminSourcesPage({
  coverageSummary,
  references,
  tasks,
}: {
  coverageSummary: SourceCoverageSummary;
  references: SourceReference[];
  tasks: SourceChangeReviewTask[];
}) {
  const coverageBySourceKey = new Map(
    coverageSummary.entries.map((entry) => [entry.source_key, entry]),
  );

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="hero__eyebrow">Admin sources</p>
        <h1>Source review dashboard scaffold.</h1>
        <p className="hero__lede">
          This page exposes the current typed source registry so future review,
          diff, and monitoring workflows have a concrete surface to grow into.
        </p>

        <article className="hero__card content-meta">
          <p>
            <strong>Registry entries:</strong> {references.length}
          </p>
          <p>
            <strong>Source-change tasks:</strong> {tasks.length}
          </p>
          <p>
            <strong>Sources with mapped coverage:</strong>{' '}
            {coverageSummary.mappedSourceCount}
          </p>
          <p>
            <strong>Mapped surface links:</strong> {coverageSummary.mappedSurfaceLinks}
          </p>
          <p>
            <strong>Current limitation:</strong> Source editing, snapshots,
            alerts, and change monitoring are not implemented yet.
          </p>
        </article>

        <div className="guide-sections">
          {references.map((reference) => {
            const coverage = coverageBySourceKey.get(reference.source_key);

            return (
              <article key={reference.source_key} className="hero__card">
              <h2>{reference.title}</h2>
              <p>{reference.note ?? 'No note provided.'}</p>
              <p className="results-section__confidence">
                {reference.source_key}
              </p>
              <ul className="results-list">
                <li>
                  <strong>Publisher:</strong> {reference.publisher}
                </li>
                <li>
                  <strong>Language:</strong> {reference.language}
                </li>
                <li>
                  <strong>Reviewed:</strong>{' '}
                  {reference.reviewed_at ?? 'Not recorded'}
                </li>
                <li>
                  <strong>Mapped surfaces:</strong>{' '}
                  {coverage?.mapped_surface_count ?? 0}
                </li>
                <li>
                  <strong>Coverage routes:</strong>{' '}
                  {coverage?.mapped_surfaces.map((item) => item.route).join(', ') ??
                    'none'}
                </li>
              </ul>
              <div className="hub-links">
                <a
                  className="hero__button hero__button--secondary"
                  href={reference.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open reference
                </a>
              </div>
              </article>
            );
          })}
        </div>

        <article className="hero__card content-meta">
          <p>
            <strong>Coverage posture:</strong> Direct mapped usage only
          </p>
          <p>
            <strong>Task posture:</strong> Change-watchlist only
          </p>
          <p>
            <strong>Current limitation:</strong> Coverage shows where sources are
            attached today, while separate watchlist tasks show what to review if
            those sources change.
          </p>
        </article>

        <div className="guide-sections">
          {tasks.map((task) => (
            <article key={task.task_key} className="hero__card">
              <h2>{task.source_title}</h2>
              <p>{task.note}</p>
              <p className="results-section__confidence">{task.status}</p>
              <ul className="results-list">
                <li>
                  <strong>Task key:</strong> {task.task_key}
                </li>
                <li>
                  <strong>Source key:</strong> {task.source_key}
                </li>
                <li>
                  <strong>Trigger:</strong> {task.trigger}
                </li>
                <li>
                  <strong>Affected routes:</strong> {task.affected_routes.join(', ')}
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

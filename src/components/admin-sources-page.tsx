import Link from 'next/link';
import type { SourceReference } from '@/lib/types/domain';

export function AdminSourcesPage({
  references,
}: {
  references: SourceReference[];
}) {
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
            <strong>Status:</strong> Read-only scaffold
          </p>
          <p>
            <strong>Current limitation:</strong> Source editing, snapshots,
            alerts, and change monitoring are not implemented yet.
          </p>
        </article>

        <div className="guide-sections">
          {references.map((reference) => (
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

import Link from 'next/link';

const foundationPoints = [
  'Locale-aware routing for English and Spanish public surfaces',
  'Deterministic checklist questions and rules backed by seed data',
  'Trust surfaces for source references, review dates, and confidence labels',
];

export function AppShell() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="hero__eyebrow">Ciudad Juarez family-based prep</p>
        <h1>Know what to print, pack, and bring.</h1>
        <p className="hero__lede">
          This runnable shell establishes the app foundation for a bilingual,
          source-backed preparation workflow. The current surface is intentionally
          narrow while the deterministic checklist and content systems are built.
        </p>

        <div className="hero__actions">
          <Link className="hero__button hero__button--primary" href="/en">
            Locale routes next
          </Link>
          <Link className="hero__button hero__button--secondary" href="/">
            App shell ready
          </Link>
        </div>

        <div className="hero__grid">
          <article className="hero__card">
            <h2>What this cycle adds</h2>
            <p>
              A Next.js App Router scaffold, strict TypeScript configuration, and
              validation scripts so future tasks build on a real app shell.
            </p>
          </article>
          <article className="hero__card">
            <h2>Why it stays minimal</h2>
            <p>
              Locale routing, checklist flow, and typed seed loading are separate
              backlog items and remain isolated for small, shippable increments.
            </p>
          </article>
          <article className="hero__card">
            <h2>Immediate next milestones</h2>
            <ul>
              {foundationPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}

const adminSections = [
  {
    title: 'Content',
    body:
      'Manage guide, FAQ, glossary, and post hub content once structured editing tools exist.',
    status: 'Planned surface',
  },
  {
    title: 'Sources',
    body:
      'Review source references, placeholder trust attachments, and future source-change monitoring.',
    status: 'Planned surface',
  },
  {
    title: 'Rules',
    body:
      'Inspect deterministic checklist rules, question inputs, and grouped output logic as admin tooling expands.',
    status: 'Planned surface',
  },
  {
    title: 'Reviews',
    body:
      'Track last-reviewed dates, review queues, and verified-vs-placeholder state across content surfaces.',
    status: 'Planned surface',
  },
] as const;

export function AdminHome() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="hero__eyebrow">Admin</p>
        <h1>Internal maintenance surface scaffold.</h1>
        <p className="hero__lede">
          This admin landing page exists to orient maintainers to the operations
          areas already described in the repository docs. It does not claim that
          editing, publishing, or review workflows are functional yet.
        </p>

        <article className="hero__card content-meta">
          <p>
            <strong>Status:</strong> Navigation scaffold only
          </p>
          <p>
            <strong>Current scope:</strong> Clarify the planned internal surface
            before building content, source, rules, and review tooling.
          </p>
        </article>

        <div className="guide-sections">
          {adminSections.map((section) => (
            <article key={section.title} className="hero__card">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              <p className="results-section__confidence">{section.status}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

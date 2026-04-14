import Link from 'next/link';
import type { RulesAuditSummary } from '@/lib/admin/loadRulesAuditSummary';

export function AdminRulesPage({
  summary,
}: {
  summary: RulesAuditSummary;
}) {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="hero__eyebrow">Admin rules</p>
        <h1>Rules audit scaffold.</h1>
        <p className="hero__lede">
          This page exposes the current seeded checklist questions and
          deterministic rule inventory so future audit and editor tooling has a
          concrete baseline.
        </p>

        <div className="guide-sections">
          <article className="hero__card">
            <h2>Current assets</h2>
            <ul className="results-list">
              <li>
                <strong>Checklist questions:</strong> {summary.checklistQuestionCount}
              </li>
              <li>
                <strong>Requirement rules:</strong> {summary.requirementRuleCount}
              </li>
              <li>
                <strong>Status:</strong> Read-only audit scaffold
              </li>
            </ul>
            <p className="question-card__hint">
              Rule editing is not implemented yet. This page is for visibility,
              not mutation.
            </p>
          </article>

          <article className="hero__card">
            <h2>Question keys</h2>
            <ul className="results-list">
              {summary.questions.map((question) => (
                <li key={question.key}>
                  <strong>{question.key}</strong>: {question.input_type}
                </li>
              ))}
            </ul>
          </article>

          <article className="hero__card">
            <h2>Rule outputs</h2>
            <ul className="results-list">
              {summary.outputTypeCounts.map((entry) => (
                <li key={entry.outputType}>
                  <strong>{entry.outputType}</strong>: {entry.count}
                </li>
              ))}
            </ul>
          </article>

          <article className="hero__card">
            <h2>Rule inventory</h2>
            <ul className="results-list">
              {summary.rules.map((rule) => (
                <li key={rule.rule_key}>
                  <strong>{rule.rule_key}</strong>: {rule.output_type}
                  <p>
                    Conditions: {Object.keys(rule.conditions).join(', ') || 'none'}
                  </p>
                </li>
              ))}
            </ul>
          </article>
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

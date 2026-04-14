import Link from 'next/link';
import type { ChecklistQuestion, RequirementRule, RequirementOutputType } from '@/lib/types/domain';

function countByOutputType(
  rules: RequirementRule[],
): Array<{ outputType: RequirementOutputType; count: number }> {
  const counts = new Map<RequirementOutputType, number>();

  for (const rule of rules) {
    counts.set(rule.output_type, (counts.get(rule.output_type) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([outputType, count]) => ({ outputType, count }))
    .sort((a, b) => a.outputType.localeCompare(b.outputType));
}

export function AdminRulesPage({
  questions,
  rules,
}: {
  questions: ChecklistQuestion[];
  rules: RequirementRule[];
}) {
  const outputTypeCounts = countByOutputType(rules);

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
                <strong>Checklist questions:</strong> {questions.length}
              </li>
              <li>
                <strong>Requirement rules:</strong> {rules.length}
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
              {questions.map((question) => (
                <li key={question.key}>
                  <strong>{question.key}</strong>: {question.input_type}
                </li>
              ))}
            </ul>
          </article>

          <article className="hero__card">
            <h2>Rule outputs</h2>
            <ul className="results-list">
              {outputTypeCounts.map((entry) => (
                <li key={entry.outputType}>
                  <strong>{entry.outputType}</strong>: {entry.count}
                </li>
              ))}
            </ul>
          </article>

          <article className="hero__card">
            <h2>Rule inventory</h2>
            <ul className="results-list">
              {rules.map((rule) => (
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

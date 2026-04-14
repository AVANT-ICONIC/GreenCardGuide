import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadRulesAuditSummary } from './loadRulesAuditSummary';

const requiredMarkers = [
  'Admin rules',
  'Rules audit scaffold.',
  'Checklist questions:',
  'Requirement rules:',
  'Status:',
  'Read-only audit scaffold',
  'Rule editing is not implemented yet. This page is for visibility,',
  'Question keys',
  'Rule outputs',
  'Rule inventory',
  'Conditions:',
  'Back to admin home',
] as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const summary = loadRulesAuditSummary();

  assert(summary.questions.length > 0, 'Expected seeded checklist questions');
  assert(summary.rules.length > 0, 'Expected seeded requirement rules');
  assert(summary.outputTypeCounts.length > 0, 'Expected seeded rule output type counts');
  assert(
    summary.checklistQuestionCount === summary.questions.length,
    'Expected checklist question count to match question inventory length',
  );
  assert(
    summary.requirementRuleCount === summary.rules.length,
    'Expected requirement rule count to match rule inventory length',
  );

  const questionKeys = summary.questions.map((question) => question.key);
  const outputTypes = summary.outputTypeCounts.map((entry) => entry.outputType);

  assert(
    questionKeys.includes('post'),
    'Expected the seeded rules audit question inventory to include the "post" key',
  );
  assert(
    questionKeys.includes('passport_ready'),
    'Expected the seeded rules audit question inventory to include the "passport_ready" key',
  );
  assert(
    outputTypes.includes('required_document'),
    'Expected the seeded rules audit output inventory to include required documents',
  );
  assert(
    outputTypes.includes('verify_with_official'),
    'Expected the seeded rules audit output inventory to include verify-with-official outputs',
  );

  const componentPath = resolve(process.cwd(), 'src/components/admin-rules-page.tsx');
  assert(existsSync(componentPath), 'Expected admin rules page component to exist');

  const componentSource = readFileSync(componentPath, 'utf8');
  for (const marker of requiredMarkers) {
    assert(
      componentSource.includes(marker),
      `Expected marker "${marker}" in src/components/admin-rules-page.tsx`,
    );
  }

  assert(
    componentSource.includes('{summary.questions.map((question) => ('),
    'Expected admin rules page to iterate over question inventory entries',
  );
  assert(
    componentSource.includes('{summary.outputTypeCounts.map((entry) => ('),
    'Expected admin rules page to iterate over output type inventory entries',
  );
  assert(
    componentSource.includes('{summary.rules.map((rule) => ('),
    'Expected admin rules page to iterate over rule inventory entries',
  );
  assert(
    componentSource.includes("{Object.keys(rule.conditions).join(', ') || 'none'}"),
    'Expected admin rules page to render condition key markers for each rule',
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        checklistQuestions: summary.checklistQuestionCount,
        requirementRules: summary.requirementRuleCount,
        outputTypes,
        firstQuestionKey: questionKeys[0],
        lastQuestionKey: questionKeys.at(-1),
      },
      null,
      2,
    ),
  );
}

main();

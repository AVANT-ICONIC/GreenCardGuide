import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadRulesAuditSummary } from './loadRulesAuditSummary';

const expectedOutputTypeCounts = {
  conditional_document: 3,
  print_item: 1,
  required_document: 2,
  risk_flag: 1,
  verify_with_official: 1,
} as const;

const requiredMarkers = [
  'Rules audit scaffold.',
  'Checklist questions:',
  'Requirement rules:',
  'Rule outputs',
  'Rule inventory',
] as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const summary = loadRulesAuditSummary();

  assert(
    summary.checklistQuestionCount === 8,
    `Expected 8 checklist questions, received ${summary.checklistQuestionCount}`,
  );
  assert(
    summary.requirementRuleCount === 8,
    `Expected 8 requirement rules, received ${summary.requirementRuleCount}`,
  );
  assert(
    summary.outputTypeCounts.length === Object.keys(expectedOutputTypeCounts).length,
    `Expected ${Object.keys(expectedOutputTypeCounts).length} rule output types, received ${summary.outputTypeCounts.length}`,
  );

  const actualOutputTypeCounts = Object.fromEntries(
    summary.outputTypeCounts.map((entry) => [entry.outputType, entry.count]),
  );

  for (const [outputType, expectedCount] of Object.entries(expectedOutputTypeCounts)) {
    assert(
      actualOutputTypeCounts[outputType] === expectedCount,
      `Expected ${outputType} count ${expectedCount}, received ${actualOutputTypeCounts[outputType] ?? 'missing'}`,
    );
  }

  const activeRuleCount = summary.rules.filter((rule) => rule.is_active).length;
  assert(
    activeRuleCount === summary.requirementRuleCount,
    'Expected all current seeded requirement rules to remain active',
  );

  const questionKeys = summary.questions.map((question) => question.key);
  assert(
    questionKeys[0] === 'post',
    `Expected first checklist question key to be "post", received "${questionKeys[0] ?? 'missing'}"`,
  );
  assert(
    questionKeys.at(-1) === 'passport_ready',
    `Expected last checklist question key to be "passport_ready", received "${questionKeys.at(-1) ?? 'missing'}"`,
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

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        checklistQuestions: summary.checklistQuestionCount,
        requirementRules: summary.requirementRuleCount,
        activeRules: activeRuleCount,
        outputTypeCounts: summary.outputTypeCounts,
        questionKeys,
      },
      null,
      2,
    ),
  );
}

main();

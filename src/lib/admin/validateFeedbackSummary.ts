import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadFeedbackSummary } from './loadFeedbackSummary';
import type { StoredFeedbackSubmission } from '@/lib/feedback/storage';

const feedbackFixtures: StoredFeedbackSubmission[] = [
  {
    id: 'feedback-001',
    created_at: '2026-04-14T20:00:00.000Z',
    language: 'en',
    page_slug: '/en/checklist/results',
    report_type: 'missing',
    message: 'The checklist results page needs a clearer print reminder.',
  },
  {
    id: 'feedback-002',
    created_at: '2026-04-14T20:05:00.000Z',
    language: 'es',
    page_slug: '/es/faq',
    report_type: 'confusion',
    message: 'La pregunta frecuente necesita lenguaje mas claro.',
  },
  {
    id: 'feedback-003',
    created_at: '2026-04-14T20:10:00.000Z',
    language: 'en',
    page_slug: '/en/checklist/results',
    report_type: 'bug',
    message: 'The print link label is easy to miss on the results page.',
  },
  {
    id: 'feedback-004',
    created_at: '2026-04-14T20:15:00.000Z',
    language: 'es',
    page_slug: '/es/faq',
    report_type: 'confusion',
    message: 'La respuesta sobre documentos sigue siendo demasiado general.',
  },
  {
    id: 'feedback-005',
    created_at: '2026-04-14T20:20:00.000Z',
    language: 'en',
    page_slug: '/en/feedback',
    report_type: 'missing',
    message: 'The feedback page should explain what happens after submission.',
  },
];

const requiredMarkers = [
  'Feedback summary',
  'Total reports:',
  'By type:',
  'Most reported routes:',
] as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const summary = loadFeedbackSummary(feedbackFixtures);

  assert(summary.total === 5, `Expected 5 total feedback reports, received ${summary.total}`);
  assert(
    summary.typeCounts.length === 3,
    `Expected 3 feedback report types, received ${summary.typeCounts.length}`,
  );

  const typeCounts = Object.fromEntries(
    summary.typeCounts.map((entry) => [entry.report_type, entry.count]),
  );
  assert(typeCounts.bug === 1, `Expected 1 bug report, received ${typeCounts.bug ?? 'missing'}`);
  assert(
    typeCounts.confusion === 2,
    `Expected 2 confusion reports, received ${typeCounts.confusion ?? 'missing'}`,
  );
  assert(
    typeCounts.missing === 2,
    `Expected 2 missing reports, received ${typeCounts.missing ?? 'missing'}`,
  );

  assert(
    summary.routeCounts.length === 3,
    `Expected 3 routed feedback groups, received ${summary.routeCounts.length}`,
  );
  assert(
    summary.routeCounts[0]?.page_slug === '/en/checklist/results' &&
      summary.routeCounts[0]?.count === 2,
    `Expected /en/checklist/results to lead route counts with 2 reports, received ${summary.routeCounts[0]?.page_slug ?? 'missing'}:${summary.routeCounts[0]?.count ?? 'missing'}`,
  );
  assert(
    summary.routeCounts[1]?.page_slug === '/es/faq' &&
      summary.routeCounts[1]?.count === 2,
    `Expected /es/faq to be the second route count with 2 reports, received ${summary.routeCounts[1]?.page_slug ?? 'missing'}:${summary.routeCounts[1]?.count ?? 'missing'}`,
  );
  assert(
    summary.routeCounts[2]?.page_slug === '/en/feedback' &&
      summary.routeCounts[2]?.count === 1,
    `Expected /en/feedback to remain the third route count with 1 report, received ${summary.routeCounts[2]?.page_slug ?? 'missing'}:${summary.routeCounts[2]?.count ?? 'missing'}`,
  );

  const componentPath = resolve(process.cwd(), 'src/components/admin-reviews-page.tsx');
  assert(existsSync(componentPath), 'Expected admin reviews page component to exist');

  const componentSource = readFileSync(componentPath, 'utf8');
  for (const marker of requiredMarkers) {
    assert(
      componentSource.includes(marker),
      `Expected marker "${marker}" in src/components/admin-reviews-page.tsx`,
    );
  }

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        total: summary.total,
        typeCounts: summary.typeCounts,
        routeCounts: summary.routeCounts,
      },
      null,
      2,
    ),
  );
}

main();

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadSourceChangeReviewTasks } from './loadSourceChangeReviewTasks';
import { loadSourceCoverageSummary } from './loadSourceCoverageSummary';
import { loadSourceReferences } from '@/lib/content/loadSourceReferences';

const requiredMarkers = [
  'Admin sources',
  'Source review dashboard scaffold.',
  'Registry entries:',
  'Source-change tasks:',
  'Sources with mapped coverage:',
  'Mapped surface links:',
  'Current limitation:',
  'Coverage posture:',
  'Direct mapped usage only',
  'Task posture:',
  'Change-watchlist only',
  'Coverage routes:',
  'Open reference',
  'Back to admin home',
] as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const references = loadSourceReferences();
  const coverage = loadSourceCoverageSummary();
  const tasks = loadSourceChangeReviewTasks();

  assert(references.length === 3, `Expected 3 source references, received ${references.length}`);
  assert(
    references.every((reference) => reference.publisher === 'GreenCardGuide repository'),
    'Expected all source references to remain repository-published governance references',
  );
  assert(
    references.every((reference) => reference.language === 'en'),
    'Expected source references to remain English governance references',
  );
  assert(
    coverage.mappedSourceCount === references.length,
    `Expected ${references.length} sources with mapped coverage, received ${coverage.mappedSourceCount}`,
  );
  assert(
    coverage.mappedSurfaceLinks === 15,
    `Expected 15 mapped source-to-surface links, received ${coverage.mappedSurfaceLinks}`,
  );
  assert(
    tasks.length === references.length,
    `Expected ${references.length} change-watchlist tasks, received ${tasks.length}`,
  );
  assert(
    tasks.every((task) => task.status === 'watching'),
    'Expected source change tasks to remain in watching status for the current reviewed registry posture',
  );
  assert(
    tasks.every((task) => task.note.includes('Change detection is not implemented yet.')),
    'Expected source change task notes to remain explicit about missing automated monitoring',
  );

  const componentPath = resolve(process.cwd(), 'src/components/admin-sources-page.tsx');
  assert(existsSync(componentPath), 'Expected admin sources page component to exist');

  const componentSource = readFileSync(componentPath, 'utf8');
  for (const marker of requiredMarkers) {
    assert(
      componentSource.includes(marker),
      `Expected marker "${marker}" in src/components/admin-sources-page.tsx`,
    );
  }

  assert(
    componentSource.includes('coverageSummary.entries.map((entry) => [entry.source_key, entry])'),
    'Expected admin sources page to derive a coverage lookup from coverageSummary.entries',
  );
  assert(
    componentSource.includes('{references.map((reference) => {'),
    'Expected admin sources page to iterate over source references',
  );
  assert(
    componentSource.includes('{tasks.map((task) => ('),
    'Expected admin sources page to iterate over source change review tasks',
  );
  assert(
    componentSource.includes('{coverageSummary.mappedSourceCount}'),
    'Expected admin sources page to render the mapped-source count',
  );
  assert(
    componentSource.includes('{coverageSummary.mappedSurfaceLinks}'),
    'Expected admin sources page to render the mapped surface link count',
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        sourceKeys: references.map((reference) => reference.source_key),
        mappedSourceCount: coverage.mappedSourceCount,
        mappedSurfaceLinks: coverage.mappedSurfaceLinks,
        watchlistTasks: tasks.length,
      },
      null,
      2,
    ),
  );
}

main();

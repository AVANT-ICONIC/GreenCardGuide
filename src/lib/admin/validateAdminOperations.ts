import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadChecklistQuestions, loadRequirementRules } from '@/lib/seed/loadSeedData';
import { loadContentDiffSummary } from './loadContentDiffScaffold';
import { loadContentInventory } from './loadContentInventory';
import { loadPublishControlsSummary } from './loadPublishControlsScaffold';
import { loadReviewQueueSummary } from './loadReviewQueue';
import { loadSourceChangeReviewTasks } from './loadSourceChangeReviewTasks';
import { loadSourceCoverageSummary } from './loadSourceCoverageSummary';
import { loadStoredFeedbackSubmissions } from '@/lib/feedback/storage';

const expectedAdminRouteFiles = [
  'src/app/admin/page.tsx',
  'src/app/admin/[section]/page.tsx',
] as const;

const requiredMarkersByFile = {
  'src/components/admin-content-page.tsx': [
    'Tracked surfaces:',
    'Publish-ready surfaces:',
    'Current blockers:',
  ],
  'src/components/admin-sources-page.tsx': [
    'Sources with mapped coverage:',
    'Mapped surface links:',
    'Task posture:',
  ],
  'src/components/admin-rules-page.tsx': [
    'Checklist questions:',
    'Requirement rules:',
    'Rule inventory',
  ],
  'src/components/admin-reviews-page.tsx': [
    'Stored feedback reports:',
    'Under-sourced surfaces:',
    'Recommended next action:',
  ],
} as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

async function main() {
  const missingFiles = expectedAdminRouteFiles.filter(
    (file) => !existsSync(resolve(process.cwd(), file)),
  );

  assert(
    missingFiles.length === 0,
    `Missing expected admin route files: ${missingFiles.join(', ')}`,
  );

  const contentInventory = loadContentInventory();
  const diffSummary = loadContentDiffSummary();
  const publishSummary = loadPublishControlsSummary();
  const sourceCoverage = loadSourceCoverageSummary();
  const sourceTasks = loadSourceChangeReviewTasks();
  const reviewSummary = loadReviewQueueSummary();
  const feedbackItems = await loadStoredFeedbackSubmissions();
  const questions = loadChecklistQuestions();
  const rules = loadRequirementRules();

  assert(contentInventory.totalSurfaces > 0, 'Expected admin content inventory surfaces');
  assert(diffSummary.entries.length > 0, 'Expected admin content diff entries');
  assert(
    publishSummary.entries.length === contentInventory.items.length,
    'Expected publish controls to align with content inventory items',
  );
  assert(sourceCoverage.mappedSourceCount > 0, 'Expected mapped source coverage entries');
  assert(
    sourceTasks.length === sourceCoverage.entries.length,
    'Expected one source change task per registered source',
  );
  assert(reviewSummary.entries.length > 0, 'Expected review queue entries');
  assert(
    Array.isArray(feedbackItems),
    'Expected stored feedback submissions loader to return an array',
  );
  assert(questions.length > 0, 'Expected seeded checklist questions for admin rules');
  assert(rules.length > 0, 'Expected seeded requirement rules for admin rules');

  for (const [file, requiredMarkers] of Object.entries(requiredMarkersByFile)) {
    const content = readFileSync(resolve(process.cwd(), file), 'utf8');

    for (const marker of requiredMarkers) {
      assert(content.includes(marker), `Expected marker "${marker}" in ${file}`);
    }
  }

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        checkedAdminRouteFiles: expectedAdminRouteFiles.length,
        contentSurfaces: contentInventory.totalSurfaces,
        sourceCoverage: {
          mappedSourceCount: sourceCoverage.mappedSourceCount,
          mappedSurfaceLinks: sourceCoverage.mappedSurfaceLinks,
          watchlistTasks: sourceTasks.length,
        },
        reviewQueue: {
          trackedSurfaces: reviewSummary.entries.length,
          storedFeedbackReports: feedbackItems.length,
        },
        rules: {
          checklistQuestions: questions.length,
          requirementRules: rules.length,
        },
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

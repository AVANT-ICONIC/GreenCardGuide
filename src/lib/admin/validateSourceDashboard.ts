import { loadSourceChangeReviewTasks } from './loadSourceChangeReviewTasks';
import { loadSourceCoverageSummary } from './loadSourceCoverageSummary';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const coverage = loadSourceCoverageSummary();
  const tasks = loadSourceChangeReviewTasks();

  assert(coverage.entries.length > 0, 'Expected source coverage entries');
  assert(
    coverage.mappedSourceCount === 3,
    `Expected 3 mapped sources, received ${coverage.mappedSourceCount}`,
  );
  assert(
    coverage.mappedSurfaceLinks === 15,
    `Expected 15 mapped source-to-surface links, received ${coverage.mappedSurfaceLinks}`,
  );
  assert(
    tasks.length === coverage.entries.length,
    'Expected one change-watchlist task per source coverage entry',
  );

  for (const entry of coverage.entries) {
    assert(entry.source_key.length > 0, 'Expected source key on coverage entry');
    assert(
      entry.mapped_surface_count === entry.mapped_surfaces.length,
      `Expected mapped surface count to match route list for ${entry.source_key}`,
    );

    const matchingTask = tasks.find((task) => task.source_key === entry.source_key);
    assert(matchingTask, `Expected change-watchlist task for ${entry.source_key}`);
    assert(
      matchingTask.affected_routes.length === entry.mapped_surfaces.length,
      `Expected watchlist routes to align with mapped surfaces for ${entry.source_key}`,
    );
  }

  const repoDisclaimerCoverage = coverage.entries.find(
    (entry) => entry.source_key === 'repo-disclaimer',
  );
  assert(repoDisclaimerCoverage, 'Expected repo-disclaimer source coverage entry');
  assert(
    repoDisclaimerCoverage.mapped_surface_count === 1,
    `Expected repo-disclaimer to map to 1 surface, received ${repoDisclaimerCoverage.mapped_surface_count}`,
  );
  assert(
    repoDisclaimerCoverage.mapped_surfaces[0]?.route === '/[lang]/faq',
    `Expected repo-disclaimer to map to /[lang]/faq, received "${repoDisclaimerCoverage.mapped_surfaces[0]?.route}"`,
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        mappedSourceCount: coverage.mappedSourceCount,
        mappedSurfaceLinks: coverage.mappedSurfaceLinks,
        sources: coverage.entries.map((entry) => ({
          sourceKey: entry.source_key,
          mappedSurfaceCount: entry.mapped_surface_count,
          affectedRoutes: entry.mapped_surfaces.map((surface) => surface.route),
        })),
        watchlistTasks: tasks.length,
      },
      null,
      2,
    ),
  );
}

main();

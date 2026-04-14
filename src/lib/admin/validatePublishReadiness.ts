import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadContentInventory } from './loadContentInventory';
import { loadPublishControlsSummary } from './loadPublishControlsScaffold';

const requiredMarkers = [
  'Publish-ready surfaces:',
  'Blocked surfaces:',
  'Current posture:',
  'Current blockers:',
] as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const inventory = loadContentInventory();
  const summary = loadPublishControlsSummary();

  assert(
    summary.entries.length === inventory.items.length,
    `Expected publish summary entry count ${inventory.items.length}, received ${summary.entries.length}`,
  );
  assert(
    summary.publishReadyCount === 0,
    `Expected 0 publish-ready surfaces, received ${summary.publishReadyCount}`,
  );
  assert(
    summary.blockedCount === 8,
    `Expected 8 blocked surfaces, received ${summary.blockedCount}`,
  );
  assert(
    summary.requiredGates.length === 3,
    `Expected 3 publish gates, received ${summary.requiredGates.length}`,
  );

  for (const gate of [
    'Review status verified',
    'Last reviewed date recorded',
    'Source references attached',
  ] as const) {
    assert(
      summary.requiredGates.includes(gate),
      `Expected required publish gate "${gate}"`,
    );
  }

  for (const entry of summary.entries) {
    assert(entry.current_state === 'placeholder', `Expected placeholder state for ${entry.route}`);
    assert(entry.publish_ready === false, `Expected ${entry.route} to remain blocked`);
    assert(
      entry.blockers.length === 1,
      `Expected a single blocker for ${entry.route}, received ${entry.blockers.length}`,
    );
    assert(
      entry.blockers[0] === 'Still marked as placeholder',
      `Expected placeholder blocker for ${entry.route}, received "${entry.blockers[0] ?? 'missing'}"`,
    );
  }

  const documentsEntry = summary.entries.find(
    (entry) => entry.route === '/[lang]/documents',
  );
  assert(documentsEntry, 'Expected publish entry for /[lang]/documents');
  assert(
    documentsEntry.surface === 'Documents overview',
    `Expected documents publish entry surface to be "Documents overview", received "${documentsEntry.surface}"`,
  );

  const componentPath = resolve(process.cwd(), 'src/components/admin-content-page.tsx');
  assert(existsSync(componentPath), 'Expected admin content page component to exist');

  const componentSource = readFileSync(componentPath, 'utf8');
  for (const marker of requiredMarkers) {
    assert(
      componentSource.includes(marker),
      `Expected marker "${marker}" in src/components/admin-content-page.tsx`,
    );
  }

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        publishReadyCount: summary.publishReadyCount,
        blockedCount: summary.blockedCount,
        requiredGates: summary.requiredGates,
        blockedRoutes: summary.entries.map((entry) => ({
          route: entry.route,
          blockers: entry.blockers,
        })),
      },
      null,
      2,
    ),
  );
}

main();

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadContentDiffSummary } from './loadContentDiffScaffold';
import { loadContentInventory } from './loadContentInventory';
import { loadPublishControlsSummary } from './loadPublishControlsScaffold';

const requiredMarkers = [
  'Admin content',
  'Content inventory and diff scaffold.',
  'Tracked surfaces:',
  'Placeholder surfaces:',
  'Verified surfaces:',
  'Bilingual surfaces:',
  'Content type:',
  'Locales:',
  'Review status:',
  'Entries tracked:',
  'Sources:',
  'Aligned diff entries:',
  'Flagged diff entries:',
  'Diff posture:',
  'Structural comparison only',
  'Publish-ready surfaces:',
  'Blocked surfaces:',
  'Current posture:',
  'Read-only planning scaffold',
  'Current blockers:',
  'Required gates:',
  'Back to admin home',
  'without exposing any live publish action.',
] as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const inventory = loadContentInventory();
  const diffSummary = loadContentDiffSummary();
  const publishSummary = loadPublishControlsSummary();

  assert(inventory.items.length > 0, 'Expected content inventory items');
  assert(
    inventory.totalSurfaces === inventory.items.length,
    'Expected content inventory total surface count to match item count',
  );
  assert(
    inventory.placeholderSurfaces + inventory.verifiedSurfaces === inventory.totalSurfaces,
    'Expected placeholder and verified counts to add up to total surfaces',
  );
  assert(
    diffSummary.entries.length === inventory.items.length,
    'Expected content diff entries to align with inventory items',
  );
  assert(
    diffSummary.alignedEntries + diffSummary.flaggedEntries === diffSummary.entries.length,
    'Expected aligned and flagged diff counts to add up to diff entry count',
  );
  assert(
    publishSummary.entries.length === inventory.items.length,
    'Expected publish summary entries to align with inventory items',
  );
  assert(
    publishSummary.publishReadyCount + publishSummary.blockedCount ===
      publishSummary.entries.length,
    'Expected publish-ready and blocked counts to add up to publish entry count',
  );
  assert(
    publishSummary.requiredGates.join(',') ===
      'Review status verified,Last reviewed date recorded,Source references attached',
    `Unexpected publish gate order: ${publishSummary.requiredGates.join(', ')}`,
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

  assert(
    componentSource.includes('{summary.items.map((item) => ('),
    'Expected admin content page to iterate over content inventory items',
  );
  assert(
    componentSource.includes('{diffSummary.entries.map((entry) => ('),
    'Expected admin content page to iterate over content diff entries',
  );
  assert(
    componentSource.includes('{entry.details.map((detail) => ('),
    'Expected admin content page to iterate over diff detail markers',
  );
  assert(
    componentSource.includes('{publishSummary.entries.map((entry) => ('),
    'Expected admin content page to iterate over publish summary entries',
  );
  assert(
    componentSource.includes('{publishSummary.requiredGates.join'),
    'Expected admin content page to render publish gate labels from publishSummary.requiredGates',
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        trackedSurfaces: inventory.totalSurfaces,
        diffEntries: diffSummary.entries.length,
        alignedDiffEntries: diffSummary.alignedEntries,
        blockedPublishEntries: publishSummary.blockedCount,
      },
      null,
      2,
    ),
  );
}

main();

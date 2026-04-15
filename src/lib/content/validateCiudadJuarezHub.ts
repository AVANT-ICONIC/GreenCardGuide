import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadCiudadJuarezHubContent } from './loadCiudadJuarezHubContent';

const requiredMarkers = [
  'Current trust status',
  'Review status',
  'Last reviewed',
  'Sources',
  'Document library',
  'Documents overview',
  'What to bring guide',
] as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const english = loadCiudadJuarezHubContent('en');
  const spanish = loadCiudadJuarezHubContent('es');

  for (const entry of [english, spanish]) {
    assert(entry.review_status === 'placeholder', `Expected placeholder hub status for ${entry.language}`);
    assert(
      entry.confidence_label === 'verify_with_official',
      `Expected verify_with_official hub confidence for ${entry.language}`,
    );
    assert(
      entry.last_reviewed_at === '2026-04-14',
      `Expected 2026-04-14 hub review date for ${entry.language}, received ${entry.last_reviewed_at}`,
    );
    assert(
      entry.source_references.join(',') ===
        'maintained-source-policy,trust-and-safety-policy',
      `Unexpected hub source references for ${entry.language}: ${entry.source_references.join(',')}`,
    );
  }

  const componentPath = resolve(process.cwd(), 'src/components/ciudad-juarez-hub.tsx');
  assert(existsSync(componentPath), 'Expected Ciudad Juarez hub component to exist');

  const componentSource = readFileSync(componentPath, 'utf8');
  for (const marker of requiredMarkers) {
    assert(
      componentSource.includes(marker),
      `Expected marker "${marker}" in src/components/ciudad-juarez-hub.tsx`,
    );
  }

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        locales: [english.language, spanish.language],
        reviewStatus: english.review_status,
        confidence: english.confidence_label,
        lastReviewedAt: english.last_reviewed_at,
        sources: english.source_references,
      },
      null,
      2,
    ),
  );
}

main();

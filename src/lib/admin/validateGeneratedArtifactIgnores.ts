import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const requiredGitignoreMarkers = [
  '.open-next/',
  '.wrangler/',
  'cloudflare-env.d.ts',
  '.dev.vars',
] as const;
const requiredEslintMarkers = ['.open-next/**', '.wrangler/**', 'cloudflare-env.d.ts'] as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function readFile(path: string): string {
  const fullPath = resolve(process.cwd(), path);
  assert(existsSync(fullPath), `Expected ${path} to exist`);
  return readFileSync(fullPath, 'utf8');
}

function main() {
  const gitignoreSource = readFile('.gitignore');
  const eslintSource = readFile('eslint.config.mjs');

  for (const marker of requiredGitignoreMarkers) {
    assert(gitignoreSource.includes(marker), `Expected .gitignore to include "${marker}"`);
  }

  for (const marker of requiredEslintMarkers) {
    assert(
      eslintSource.includes(`"${marker}"`),
      `Expected eslint.config.mjs to ignore "${marker}"`,
    );
  }

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        gitignoreMarkers: requiredGitignoreMarkers,
        eslintIgnoreMarkers: requiredEslintMarkers,
        localSecretFile: '.dev.vars',
      },
      null,
      2,
    ),
  );
}

main();

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

interface PackageManifest {
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

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
  const packageSource = readFile('package.json');
  const packageJson = JSON.parse(packageSource) as PackageManifest;
  const readmeSource = readFile('README.md');
  const openNextConfigSource = readFile('open-next.config.ts');
  const wranglerConfigSource = readFile('wrangler.jsonc');
  const workflowSource = readFile('.github/workflows/deploy-cloudflare-workers.yml');

  assert(
    packageJson.dependencies?.['@opennextjs/cloudflare'],
    'Expected package.json to depend on @opennextjs/cloudflare',
  );
  assert(
    packageJson.devDependencies?.wrangler,
    'Expected package.json to include wrangler as a dev dependency',
  );

  const scripts = packageJson.scripts ?? {};
  assert(
    scripts.preview === 'opennextjs-cloudflare build && opennextjs-cloudflare preview',
    `Unexpected preview script: ${scripts.preview ?? 'missing'}`,
  );
  assert(
    scripts.deploy === 'opennextjs-cloudflare build && opennextjs-cloudflare deploy',
    `Unexpected deploy script: ${scripts.deploy ?? 'missing'}`,
  );
  assert(
    scripts['cf-typegen'] ===
      'wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts',
    `Unexpected cf-typegen script: ${scripts['cf-typegen'] ?? 'missing'}`,
  );

  assert(
    openNextConfigSource.includes('defineCloudflareConfig'),
    'Expected open-next.config.ts to use defineCloudflareConfig',
  );
  assert(
    wranglerConfigSource.includes('"main": ".open-next/worker.js"'),
    'Expected wrangler.jsonc to point at the OpenNext worker entrypoint',
  );
  assert(
    wranglerConfigSource.includes('"binding": "ASSETS"'),
    'Expected wrangler.jsonc to define the ASSETS binding',
  );
  assert(
    wranglerConfigSource.includes('"nodejs_compat"'),
    'Expected wrangler.jsonc to keep the nodejs_compat flag',
  );

  assert(
    workflowSource.includes('npm run deploy'),
    'Expected deployment workflow to run npm run deploy',
  );
  assert(
    workflowSource.includes('push:') && workflowSource.includes('- main'),
    'Expected deployment workflow to trigger on pushes to main',
  );
  assert(
    workflowSource.includes('workflow_dispatch:'),
    'Expected deployment workflow to support manual workflow_dispatch runs',
  );
  assert(
    workflowSource.includes('CLOUDFLARE_ACCOUNT_ID'),
    'Expected deployment workflow to reference CLOUDFLARE_ACCOUNT_ID',
  );
  assert(
    workflowSource.includes('CLOUDFLARE_API_TOKEN'),
    'Expected deployment workflow to reference CLOUDFLARE_API_TOKEN',
  );
  assert(
    workflowSource.includes('npm run lint') &&
      workflowSource.includes('npm run typecheck'),
    'Expected deployment workflow to lint and typecheck before deploy',
  );

  assert(
    readmeSource.includes('## Cloudflare deployment'),
    'Expected README to document the Cloudflare deployment posture',
  );
  assert(
    readmeSource.includes('npm run preview') && readmeSource.includes('npm run deploy'),
    'Expected README to document the local Cloudflare preview and deploy commands',
  );
  assert(
    readmeSource.includes('CLOUDFLARE_ACCOUNT_ID') &&
      readmeSource.includes('CLOUDFLARE_API_TOKEN'),
    'Expected README to document the required Cloudflare GitHub Actions secrets',
  );
  assert(
    readmeSource.includes('Pushes to `main` will lint, typecheck, and deploy automatically.'),
    'Expected README to document the main-branch deploy trigger posture',
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        scripts: {
          preview: scripts.preview,
          deploy: scripts.deploy,
          cfTypegen: scripts['cf-typegen'],
        },
        workerEntrypoint: '.open-next/worker.js',
        assetBinding: 'ASSETS',
        workflowTriggers: ['push:main', 'workflow_dispatch'],
        workflowSecrets: ['CLOUDFLARE_ACCOUNT_ID', 'CLOUDFLARE_API_TOKEN'],
      },
      null,
      2,
    ),
  );
}

main();

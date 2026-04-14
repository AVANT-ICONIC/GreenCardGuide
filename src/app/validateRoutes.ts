import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const expectedRouteFiles = [
  'src/app/page.tsx',
  'src/app/[lang]/page.tsx',
  'src/app/[lang]/ciudad-juarez/page.tsx',
  'src/app/[lang]/documents/page.tsx',
  'src/app/[lang]/faq/page.tsx',
  'src/app/[lang]/feedback/page.tsx',
  'src/app/[lang]/glossary/page.tsx',
  'src/app/[lang]/guides/[slug]/page.tsx',
  'src/app/[lang]/checklist/start/page.tsx',
  'src/app/[lang]/checklist/questions/page.tsx',
  'src/app/[lang]/checklist/results/page.tsx',
  'src/app/[lang]/checklist/print/page.tsx',
  'src/app/admin/page.tsx',
  'src/app/admin/[section]/page.tsx',
] as const;

const expectedRoutePatterns = [
  '/',
  '/[lang]',
  '/[lang]/ciudad-juarez',
  '/[lang]/documents',
  '/[lang]/faq',
  '/[lang]/feedback',
  '/[lang]/glossary',
  '/[lang]/guides/[slug]',
  '/[lang]/checklist/start',
  '/[lang]/checklist/questions',
  '/[lang]/checklist/results',
  '/[lang]/checklist/print',
  '/admin',
  '/admin/[section]',
] as const;

function main() {
  const missingFiles = expectedRouteFiles.filter(
    (file) => !existsSync(resolve(process.cwd(), file)),
  );

  if (missingFiles.length > 0) {
    throw new Error(`Missing expected route files: ${missingFiles.join(', ')}`);
  }

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        checkedRouteFiles: expectedRouteFiles.length,
        expectedRoutePatterns,
      },
      null,
      2,
    ),
  );
}

main();

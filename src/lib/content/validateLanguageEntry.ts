import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getLanguageLabel, supportedLanguages } from './locale';

const requiredMarkers = [
  'Bilingual entry point',
  'Select your language to start prep.',
  'Consular Prep is being built with English and Spanish as first-class',
  'routes from the start. Choose a language to enter the current app',
] as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  assert(
    supportedLanguages.join(',') === 'en,es',
    `Unexpected supported language order: ${supportedLanguages.join(',')}`,
  );
  assert(
    supportedLanguages.map((language) => getLanguageLabel(language)).join(',') ===
      'English,Español',
    'Expected language entry labels to remain English and Español',
  );

  const componentPath = resolve(process.cwd(), 'src/components/language-entry.tsx');
  assert(existsSync(componentPath), 'Expected language-entry component to exist');

  const componentSource = readFileSync(componentPath, 'utf8');
  for (const marker of requiredMarkers) {
    assert(
      componentSource.includes(marker),
      `Expected marker "${marker}" in src/components/language-entry.tsx`,
    );
  }

  assert(
    componentSource.includes('{supportedLanguages.map((language) => ('),
    'Expected language-entry component to iterate over supportedLanguages',
  );
  assert(
    componentSource.includes('{getLanguageLabel(language)}'),
    'Expected language-entry component to render locale labels from getLanguageLabel()',
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        supportedLanguages,
        labels: supportedLanguages.map((language) => getLanguageLabel(language)),
      },
      null,
      2,
    ),
  );
}

main();

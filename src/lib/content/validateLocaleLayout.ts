import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getLanguageLabel, supportedLanguages } from './locale';

const requiredMarkers = [
  'Consular Prep',
  'aria-label="Primary"',
  'aria-label="Language switcher"',
  'locale-header__brand',
  'locale-header__nav',
  'locale-switcher',
  'locale-switcher__link--active',
  "label: 'Home'",
  "label: 'Checklist'",
  "label: 'Ciudad Juarez'",
  "label: 'Documents'",
  "label: 'Feedback'",
  "label: 'Inicio'",
  "label: 'Lista'",
  "label: 'Documentos'",
  "label: 'Comentarios'",
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
    'Expected locale layout labels to remain English and Español',
  );

  const layoutPath = resolve(process.cwd(), 'src/app/[lang]/layout.tsx');
  assert(existsSync(layoutPath), 'Expected shared [lang] layout to exist');

  const layoutSource = readFileSync(layoutPath, 'utf8');
  for (const marker of requiredMarkers) {
    assert(
      layoutSource.includes(marker),
      `Expected marker "${marker}" in src/app/[lang]/layout.tsx`,
    );
  }

  assert(
    layoutSource.includes('return supportedLanguages.map((lang) => ({ lang }));'),
    'Expected shared [lang] layout to derive static params from supportedLanguages',
  );
  assert(
    layoutSource.includes('if (!isSupportedLanguage(lang)) {'),
    'Expected shared [lang] layout to guard unsupported locales',
  );
  assert(
    layoutSource.includes('{links.map((link) => ('),
    'Expected shared [lang] layout to iterate over locale-specific nav links',
  );
  assert(
    layoutSource.includes('{supportedLanguages.map((language) => {'),
    'Expected shared [lang] layout to iterate over supportedLanguages in the switcher',
  );
  assert(
    layoutSource.includes('{getLanguageLabel(language)}'),
    'Expected shared [lang] layout to render labels from getLanguageLabel()',
  );
  assert(
    layoutSource.includes('href={`/${language}`}'),
    'Expected shared [lang] layout to link locale switcher entries to language roots',
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

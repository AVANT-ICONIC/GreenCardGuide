import {
  getLanguageLabel,
  isSupportedLanguage,
  supportedLanguages,
} from './locale';

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

  assert(isSupportedLanguage('en') === true, 'Expected "en" to be supported');
  assert(isSupportedLanguage('es') === true, 'Expected "es" to be supported');
  assert(isSupportedLanguage('fr') === false, 'Expected "fr" to remain unsupported');
  assert(isSupportedLanguage('') === false, 'Expected empty locale to remain unsupported');

  assert(
    getLanguageLabel('en') === 'English',
    `Unexpected English label: ${getLanguageLabel('en')}`,
  );
  assert(
    getLanguageLabel('es') === 'Español',
    `Unexpected Spanish label: ${getLanguageLabel('es')}`,
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        supportedLanguages,
        labels: supportedLanguages.map((language) => ({
          language,
          label: getLanguageLabel(language),
        })),
      },
      null,
      2,
    ),
  );
}

main();

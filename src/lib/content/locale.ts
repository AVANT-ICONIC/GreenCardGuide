import type { Language } from '../types/domain';

export const supportedLanguages = ['en', 'es'] as const satisfies readonly Language[];

export function isSupportedLanguage(value: string): value is Language {
  return supportedLanguages.includes(value as Language);
}

export function getLanguageLabel(language: Language): string {
  return language === 'en' ? 'English' : 'Español';
}

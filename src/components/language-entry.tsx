import Link from 'next/link';
import { getLanguageLabel, supportedLanguages } from '@/lib/content/locale';

export function LanguageEntry() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="hero__eyebrow">Bilingual entry point</p>
        <h1>Select your language to start prep.</h1>
        <p className="hero__lede">
          Consular Prep is being built with English and Spanish as first-class
          routes from the start. Choose a language to enter the current app
          shell.
        </p>

        <div className="hero__actions">
          {supportedLanguages.map((language) => (
            <Link
              key={language}
              className="hero__button hero__button--primary"
              href={`/${language}`}
            >
              {getLanguageLabel(language)}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

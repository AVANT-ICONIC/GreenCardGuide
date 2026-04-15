import Link from 'next/link';
import { getLanguageLabel, supportedLanguages } from '@/lib/content/locale';

export function LanguageEntry() {
  return (
    <main className="landing-shell">
      <section className="hero">
        <p className="hero__eyebrow">Bilingual entry point</p>
        <h1>Select your language to start prep.</h1>
        <p className="hero__lede">
          Consular Prep helps families know exactly what to print, pack, and
          bring for immigrant visa interviews. Choose a language to begin.
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

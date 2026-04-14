import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getLanguageLabel,
  isSupportedLanguage,
  supportedLanguages,
} from '@/lib/content/locale';

const navLabels = {
  en: ['Home', 'Checklist', 'Ciudad Juarez'],
  es: ['Inicio', 'Lista', 'Ciudad Juarez'],
} as const;

export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }));
}

export default async function LanguageLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const labels = navLabels[lang];

  return (
    <main className="app-shell">
      <header className="locale-header">
        <div className="locale-header__inner">
          <Link className="locale-header__brand" href={`/${lang}`}>
            Consular Prep
          </Link>
          <nav className="locale-header__nav" aria-label="Primary">
            {labels.map((label) => (
              <span key={label} className="locale-header__nav-item">
                {label}
              </span>
            ))}
          </nav>
          <div className="locale-switcher" aria-label="Language switcher">
            {supportedLanguages.map((language) => {
              const isActive = language === lang;

              return (
                <Link
                  key={language}
                  className={`locale-switcher__link${isActive ? ' locale-switcher__link--active' : ''}`}
                  href={`/${language}`}
                  hrefLang={language}
                  lang={language}
                >
                  {getLanguageLabel(language)}
                </Link>
              );
            })}
          </div>
        </div>
      </header>
      {children}
    </main>
  );
}

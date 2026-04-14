import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getLanguageLabel,
  isSupportedLanguage,
  supportedLanguages,
} from '@/lib/content/locale';

const navLinks = {
  en: [
    { label: 'Home', href: '' },
    { label: 'Checklist', href: '/checklist/start' },
    { label: 'Ciudad Juarez', href: '/ciudad-juarez' },
    { label: 'Documents', href: '/documents' },
    { label: 'Feedback', href: '/feedback' },
  ],
  es: [
    { label: 'Inicio', href: '' },
    { label: 'Lista', href: '/checklist/start' },
    { label: 'Ciudad Juarez', href: '/ciudad-juarez' },
    { label: 'Documentos', href: '/documents' },
    { label: 'Comentarios', href: '/feedback' },
  ],
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

  const links = navLinks[lang];

  return (
    <main className="app-shell">
      <header className="locale-header">
        <div className="locale-header__inner">
          <Link className="locale-header__brand" href={`/${lang}`}>
            Consular Prep
          </Link>
          <nav className="locale-header__nav" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.href || 'home'}
                className="locale-header__nav-item"
                href={`/${lang}${link.href}`}
              >
                {link.label}
              </Link>
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

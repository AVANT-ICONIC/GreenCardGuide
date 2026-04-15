'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Language } from '@/lib/types/domain';

type NavLink = { label: string; href: string };

export function ClientNav({
  links,
  lang,
}: {
  links: readonly NavLink[];
  lang: Language;
}) {
  const pathname = usePathname();

  return (
    <nav className="locale-header__nav" aria-label="Primary">
      {links.map((link) => {
        const href = `/${lang}${link.href}`;
        const isActive =
          link.href === ''
            ? pathname === `/${lang}`
            : pathname.startsWith(href);

        return (
          <Link
            key={link.href || 'home'}
            className={`locale-header__nav-item${isActive ? ' locale-header__nav-item--active' : ''}`}
            href={href}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

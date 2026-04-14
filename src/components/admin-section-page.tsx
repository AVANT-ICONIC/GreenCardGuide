import Link from 'next/link';
import type { AdminSectionSlug } from '@/lib/admin/sections';

const sectionCopy: Record<
  AdminSectionSlug,
  {
    title: string;
    eyebrow: string;
    lede: string;
    bullets: string[];
  }
> = {
  content: {
    title: 'Content maintenance scaffold',
    eyebrow: 'Admin content',
    lede:
      'This page reserves the content-management surface for structured editorial tooling. No editing or publishing actions are implemented yet.',
    bullets: [
      'Guide, FAQ, glossary, and documents content review',
      'Placeholder versus verified state management',
      'Future structured editing and publish controls',
    ],
  },
  sources: {
    title: 'Sources maintenance scaffold',
    eyebrow: 'Admin sources',
    lede:
      'This page reserves the source-management surface for source registry review and future change-detection workflows.',
    bullets: [
      'Source registry inspection',
      'Placeholder source attachments and future official source mapping',
      'Future source-review tasks and diffs',
    ],
  },
  rules: {
    title: 'Rules maintenance scaffold',
    eyebrow: 'Admin rules',
    lede:
      'This page reserves the rules-management surface for deterministic checklist logic review.',
    bullets: [
      'Checklist questions and answer keys',
      'Requirement rules and grouped output behavior',
      'Future audit and editing tools for deterministic logic',
    ],
  },
  reviews: {
    title: 'Review workflow scaffold',
    eyebrow: 'Admin reviews',
    lede:
      'This page reserves the review-management surface for last-reviewed state, trust checks, and editorial queueing.',
    bullets: [
      'Review status tracking across content surfaces',
      'Last-reviewed and trust metadata visibility',
      'Future review queue and handoff workflows',
    ],
  },
};

export function AdminSectionPage({ slug }: { slug: AdminSectionSlug }) {
  const content = sectionCopy[slug];

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="hero__eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p className="hero__lede">{content.lede}</p>

        <article className="hero__card">
          <ul className="results-list">
            {content.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p className="question-card__hint">
            This route is a maintenance placeholder only. Tooling is not active yet.
          </p>
        </article>

        <div className="hero__actions">
          <Link className="hero__button hero__button--secondary" href="/admin">
            Back to admin home
          </Link>
        </div>
      </section>
    </main>
  );
}

export const adminSections = [
  {
    slug: 'content',
    title: 'Content',
    body:
      'Review the current guide, FAQ, glossary, documents, and post hub inventory before structured editing and publishing tools exist.',
    status: 'Read-only inventory',
  },
  {
    slug: 'sources',
    title: 'Sources',
    body:
      'Review source references, placeholder trust attachments, and future source-change monitoring.',
    status: 'Planned surface',
  },
  {
    slug: 'rules',
    title: 'Rules',
    body:
      'Inspect deterministic checklist rules, question inputs, and grouped output logic as admin tooling expands.',
    status: 'Planned surface',
  },
  {
    slug: 'reviews',
    title: 'Reviews',
    body:
      'Track last-reviewed dates, review queues, and verified-vs-placeholder state across content surfaces.',
    status: 'Planned surface',
  },
] as const;

export type AdminSectionSlug = (typeof adminSections)[number]['slug'];

export const adminSectionSlugs: AdminSectionSlug[] = adminSections.map(
  (section) => section.slug,
);

export function getAdminSectionStaticParams(): { section: AdminSectionSlug }[] {
  return adminSectionSlugs.map((section) => ({ section }));
}

export function isAdminSectionSlug(value: string): value is AdminSectionSlug {
  return adminSectionSlugs.includes(value as AdminSectionSlug);
}

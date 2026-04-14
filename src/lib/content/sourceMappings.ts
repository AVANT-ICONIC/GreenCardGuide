import { contentSurfaceKeys, type ContentSurfaceKey } from './loadContentReviewMetadata';

type SurfaceSourceReferenceKeys = readonly [string, ...string[]];

const sourceReferenceKeysBySurface = {
  'ciudad-juarez': ['maintained-source-policy', 'trust-and-safety-policy'],
  documents: ['maintained-source-policy', 'trust-and-safety-policy'],
  faq: ['repo-disclaimer', 'trust-and-safety-policy'],
  glossary: ['maintained-source-policy'],
  'what-to-bring': ['maintained-source-policy', 'trust-and-safety-policy'],
  'originals-vs-copies': ['maintained-source-policy', 'trust-and-safety-policy'],
  'interview-week-plan': ['maintained-source-policy', 'trust-and-safety-policy'],
  'common-mistakes': ['maintained-source-policy', 'trust-and-safety-policy'],
} as const satisfies Record<ContentSurfaceKey, SurfaceSourceReferenceKeys>;

export function loadSourceReferenceKeysForSurface(
  surface: ContentSurfaceKey,
): string[] {
  return [...sourceReferenceKeysBySurface[surface]];
}

export function validateSourceReferenceMappings(knownSourceKeys: Iterable<string>) {
  const knownKeys = new Set(knownSourceKeys);

  for (const surface of contentSurfaceKeys) {
    const mappedKeys = sourceReferenceKeysBySurface[surface];

    for (const sourceKey of mappedKeys) {
      if (!knownKeys.has(sourceKey)) {
        throw new Error(
          `source mappings: surface "${surface}" references unknown source key "${sourceKey}"`,
        );
      }
    }
  }

  return sourceReferenceKeysBySurface;
}

export function listSourceReferenceMappings() {
  return contentSurfaceKeys.map((surface) => ({
    surface,
    source_keys: loadSourceReferenceKeysForSurface(surface),
  }));
}

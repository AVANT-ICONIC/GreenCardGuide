import { loadContentInventory } from './loadContentInventory';
import { loadSourceReferences } from '@/lib/content/loadSourceReferences';

export interface SourceCoverageSurface {
  surface: string;
  route: string;
}

export interface SourceCoverageEntry {
  source_key: string;
  mapped_surface_count: number;
  mapped_surfaces: SourceCoverageSurface[];
}

export interface SourceCoverageSummary {
  entries: SourceCoverageEntry[];
  mappedSourceCount: number;
  mappedSurfaceLinks: number;
}

export function loadSourceCoverageSummary(): SourceCoverageSummary {
  const inventory = loadContentInventory();
  const entries = loadSourceReferences().map((reference) => {
    const mappedSurfaces = inventory.items
      .filter((item) => item.source_references.includes(reference.source_key))
      .map((item) => ({
        surface: item.surface,
        route: item.route,
      }));

    return {
      source_key: reference.source_key,
      mapped_surface_count: mappedSurfaces.length,
      mapped_surfaces: mappedSurfaces,
    } satisfies SourceCoverageEntry;
  });

  return {
    entries,
    mappedSourceCount: entries.filter((entry) => entry.mapped_surface_count > 0).length,
    mappedSurfaceLinks: entries.reduce(
      (count, entry) => count + entry.mapped_surface_count,
      0,
    ),
  };
}

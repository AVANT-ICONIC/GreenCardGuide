import { loadContentInventory } from '@/lib/admin/loadContentInventory';

export interface PublishControlEntry {
  surface: string;
  route: string;
  current_state: 'placeholder' | 'verified';
  publish_ready: boolean;
  blockers: string[];
}

export interface PublishControlsSummary {
  entries: PublishControlEntry[];
  publishReadyCount: number;
  blockedCount: number;
  requiredGates: string[];
}

const requiredGates = [
  'Review status verified',
  'Last reviewed date recorded',
  'Source references attached',
] as const;

export function loadPublishControlsSummary(): PublishControlsSummary {
  const inventory = loadContentInventory();
  const entries = inventory.items.map((item) => {
    const blockers: string[] = [];

    if (item.review_status !== 'verified') {
      blockers.push('Still marked as placeholder');
    }

    if (item.source_references.length === 0) {
      blockers.push('No source references attached');
    }

    if (!item.last_reviewed_at) {
      blockers.push('No last-reviewed date is tracked for this surface yet');
    }

    return {
      surface: item.surface,
      route: item.route,
      current_state: item.review_status,
      publish_ready: blockers.length === 0,
      blockers,
    } satisfies PublishControlEntry;
  });

  return {
    entries,
    publishReadyCount: entries.filter((entry) => entry.publish_ready).length,
    blockedCount: entries.filter((entry) => !entry.publish_ready).length,
    requiredGates: [...requiredGates],
  };
}

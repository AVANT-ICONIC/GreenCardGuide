import { loadSourceReferences } from '@/lib/content/loadSourceReferences';
import type { ConfidenceLabel } from '@/lib/types/domain';
import type { ContentInventoryItem } from './loadContentInventory';
import { loadContentInventory } from './loadContentInventory';

const STALE_REVIEW_DAYS = 45;

const contentTypePriorityWeight = {
  hub: 50,
  documents: 40,
  guide: 30,
  faq: 20,
  glossary: 10,
} as const;

type ReviewPriorityLabel = 'high' | 'medium' | 'low';
type ReviewRecency = 'fresh' | 'stale' | 'missing';
type SourceCoverage = 'missing' | 'governance_only' | 'source_backed';

export interface ReviewQueueEntry {
  surface: string;
  route: string;
  content_type: ContentInventoryItem['content_type'];
  review_status: 'placeholder' | 'verified';
  confidence_label: ConfidenceLabel;
  last_reviewed_at?: string;
  source_references: string[];
  source_coverage: SourceCoverage;
  review_recency: ReviewRecency;
  stale_review: boolean;
  review_priority: ReviewPriorityLabel;
  priority_score: number;
  blocker_reason: string;
  recommended_next_action: string;
  note: string;
}

export interface ReviewQueueSummary {
  entries: ReviewQueueEntry[];
  highPriorityCount: number;
  mediumPriorityCount: number;
  lowPriorityCount: number;
  staleCount: number;
  underSourcedCount: number;
}

function getReviewAgeInDays(lastReviewedAt?: string): number | null {
  if (!lastReviewedAt) {
    return null;
  }

  const parsed = Date.parse(lastReviewedAt);

  if (Number.isNaN(parsed)) {
    return null;
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((Date.now() - parsed) / millisecondsPerDay);
}

function classifyReviewRecency(lastReviewedAt?: string): ReviewRecency {
  const ageInDays = getReviewAgeInDays(lastReviewedAt);

  if (ageInDays === null) {
    return 'missing';
  }

  return ageInDays > STALE_REVIEW_DAYS ? 'stale' : 'fresh';
}

function classifySourceCoverage(sourceReferences: string[]): SourceCoverage {
  if (sourceReferences.length === 0) {
    return 'missing';
  }

  const sourceReferencesByKey = new Map(
    loadSourceReferences().map((reference) => [reference.source_key, reference]),
  );

  const allGovernanceSources = sourceReferences.every((sourceKey) => {
    const reference = sourceReferencesByKey.get(sourceKey);
    return reference?.publisher === 'GreenCardGuide repository';
  });

  return allGovernanceSources ? 'governance_only' : 'source_backed';
}

function getPriorityScore(item: ContentInventoryItem): number {
  const reviewRecency = classifyReviewRecency(item.last_reviewed_at);
  const sourceCoverage = classifySourceCoverage(item.source_references);

  return (
    contentTypePriorityWeight[item.content_type] +
    (item.review_status === 'placeholder' ? 40 : 0) +
    (sourceCoverage === 'missing' ? 60 : 0) +
    (sourceCoverage === 'governance_only' ? 25 : 0) +
    (reviewRecency === 'missing' ? 20 : 0) +
    (reviewRecency === 'stale' ? 10 : 0)
  );
}

function getPriorityLabel(priorityScore: number): ReviewPriorityLabel {
  if (priorityScore >= 100) {
    return 'high';
  }

  if (priorityScore >= 75) {
    return 'medium';
  }

  return 'low';
}

function getBlockerReason(item: ContentInventoryItem): string {
  const reviewRecency = classifyReviewRecency(item.last_reviewed_at);
  const sourceCoverage = classifySourceCoverage(item.source_references);

  if (sourceCoverage === 'missing') {
    return 'No source references are attached to this surface yet.';
  }

  if (sourceCoverage === 'governance_only') {
    return 'Only repository governance references are attached, so source-backed editorial review cannot finish yet.';
  }

  if (item.review_status === 'placeholder') {
    return 'This surface is still marked as placeholder and should not be treated as reviewed guidance.';
  }

  if (reviewRecency === 'missing') {
    return 'No last-reviewed checkpoint is recorded for this surface.';
  }

  if (reviewRecency === 'stale') {
    return 'The recorded review date is stale and needs a fresh checkpoint.';
  }

  return 'Operational review is recommended to confirm this surface still matches the current trust posture.';
}

function getRecommendedNextAction(item: ContentInventoryItem): string {
  const sourceCoverage = classifySourceCoverage(item.source_references);

  if (sourceCoverage === 'missing' || sourceCoverage === 'governance_only') {
    if (item.content_type === 'guide' || item.content_type === 'hub') {
      return 'Attach the source-backed references needed for post-specific prep guidance before editorial verification.';
    }

    if (item.content_type === 'documents') {
      return 'Attach document-specific references before treating this seeded overview as reviewed content.';
    }

    if (item.content_type === 'faq') {
      return 'Replace placeholder answers with reviewed copy and attach the supporting references for each answer set.';
    }

    return 'Replace placeholder definitions with reviewed copy and attach supporting references for the glossary surface.';
  }

  if (item.review_status === 'placeholder') {
    return 'Complete editorial review and move the surface out of placeholder status only after the review gates are satisfied.';
  }

  if (classifyReviewRecency(item.last_reviewed_at) !== 'fresh') {
    return 'Record a fresh review checkpoint after confirming the current copy, sources, and trust labels are still accurate.';
  }

  return 'No urgent blocker remains; keep this in the operational queue for periodic review.';
}

function buildReviewQueueEntry(item: ContentInventoryItem): ReviewQueueEntry {
  const priorityScore = getPriorityScore(item);
  const reviewRecency = classifyReviewRecency(item.last_reviewed_at);
  const sourceCoverage = classifySourceCoverage(item.source_references);

  return {
    surface: item.surface,
    route: item.route,
    content_type: item.content_type,
    review_status: item.review_status,
    confidence_label: item.confidence_label,
    last_reviewed_at: item.last_reviewed_at,
    source_references: item.source_references,
    source_coverage: sourceCoverage,
    review_recency: reviewRecency,
    stale_review: reviewRecency === 'stale',
    review_priority: getPriorityLabel(priorityScore),
    priority_score: priorityScore,
    blocker_reason: getBlockerReason(item),
    recommended_next_action: getRecommendedNextAction(item),
    note: item.note,
  };
}

export function loadReviewQueueEntries(): ReviewQueueEntry[] {
  return loadContentInventory()
    .items.map(buildReviewQueueEntry)
    .sort((left, right) => {
      if (right.priority_score !== left.priority_score) {
        return right.priority_score - left.priority_score;
      }

      return left.surface.localeCompare(right.surface);
    });
}

export function loadReviewQueueSummary(): ReviewQueueSummary {
  const entries = loadReviewQueueEntries();

  return {
    entries,
    highPriorityCount: entries.filter((entry) => entry.review_priority === 'high')
      .length,
    mediumPriorityCount: entries.filter((entry) => entry.review_priority === 'medium')
      .length,
    lowPriorityCount: entries.filter((entry) => entry.review_priority === 'low').length,
    staleCount: entries.filter((entry) => entry.stale_review).length,
    underSourcedCount: entries.filter(
      (entry) => entry.source_coverage === 'missing' || entry.source_coverage === 'governance_only',
    ).length,
  };
}

import type {
  FeedbackReportType,
  StoredFeedbackSubmission,
} from '@/lib/feedback/storage';

export interface FeedbackTypeCount {
  report_type: FeedbackReportType;
  count: number;
}

export interface FeedbackRouteCount {
  page_slug: string;
  count: number;
}

export interface FeedbackSummary {
  total: number;
  typeCounts: FeedbackTypeCount[];
  routeCounts: FeedbackRouteCount[];
}

export function loadFeedbackSummary(
  feedbackItems: StoredFeedbackSubmission[],
): FeedbackSummary {
  const typeCounts = new Map<FeedbackReportType, number>();
  const routeCounts = new Map<string, number>();

  for (const item of feedbackItems) {
    typeCounts.set(item.report_type, (typeCounts.get(item.report_type) ?? 0) + 1);
    routeCounts.set(item.page_slug, (routeCounts.get(item.page_slug) ?? 0) + 1);
  }

  return {
    total: feedbackItems.length,
    typeCounts: [...typeCounts.entries()]
      .map(([report_type, count]) => ({ report_type, count }))
      .sort((left, right) => left.report_type.localeCompare(right.report_type)),
    routeCounts: [...routeCounts.entries()]
      .map(([page_slug, count]) => ({ page_slug, count }))
      .sort((left, right) => {
        if (right.count !== left.count) {
          return right.count - left.count;
        }

        return left.page_slug.localeCompare(right.page_slug);
      }),
  };
}

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Language } from '@/lib/types/domain';

export type FeedbackReportType = 'confusion' | 'missing' | 'bug';

export interface FeedbackSubmissionInput {
  language: Language;
  page_slug: string;
  report_type: FeedbackReportType;
  message: string;
}

export interface FeedbackValidationErrors {
  language?: string;
  page_slug?: string;
  report_type?: string;
  message?: string;
}

export interface StoredFeedbackSubmission extends FeedbackSubmissionInput {
  id: string;
  created_at: string;
}

const feedbackStorageDirectory = path.join(process.cwd(), 'data', 'feedback');
const feedbackStoragePath = path.join(feedbackStorageDirectory, 'submissions.json');

function normalizeString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidReportType(value: string): value is FeedbackReportType {
  return value === 'confusion' || value === 'missing' || value === 'bug';
}

export function validateFeedbackSubmission(
  input: Record<string, unknown>,
): {
  ok: true;
  value: FeedbackSubmissionInput;
} | {
  ok: false;
  errors: FeedbackValidationErrors;
} {
  const language = normalizeString(input.language);
  const pageSlug = normalizeString(input.page_slug);
  const reportType = normalizeString(input.report_type);
  const message = normalizeString(input.message);
  const errors: FeedbackValidationErrors = {};

  if (language !== 'en' && language !== 'es') {
    errors.language = 'Unsupported language.';
  }

  if (!pageSlug.startsWith('/')) {
    errors.page_slug = 'Enter a route that starts with "/".';
  } else if (pageSlug.length > 200) {
    errors.page_slug = 'Route must be 200 characters or fewer.';
  }

  if (!isValidReportType(reportType)) {
    errors.report_type = 'Choose a valid feedback type.';
  }

  if (message.length < 10) {
    errors.message = 'Enter at least 10 characters so the report is actionable.';
  } else if (message.length > 2000) {
    errors.message = 'Message must be 2000 characters or fewer.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
    };
  }

  return {
    ok: true,
    value: {
      language: language as Language,
      page_slug: pageSlug,
      report_type: reportType as FeedbackReportType,
      message,
    },
  };
}

async function ensureFeedbackStorageDirectory() {
  await mkdir(feedbackStorageDirectory, { recursive: true });
}

export async function loadStoredFeedbackSubmissions(): Promise<StoredFeedbackSubmission[]> {
  try {
    const file = await readFile(feedbackStoragePath, 'utf8');
    const parsed = JSON.parse(file) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item): item is StoredFeedbackSubmission => {
        if (typeof item !== 'object' || item === null) {
          return false;
        }

        const candidate = item as Partial<StoredFeedbackSubmission>;
        return (
          typeof candidate.id === 'string' &&
          typeof candidate.created_at === 'string' &&
          (candidate.language === 'en' || candidate.language === 'es') &&
          typeof candidate.page_slug === 'string' &&
          isValidReportType(candidate.report_type ?? '') &&
          typeof candidate.message === 'string'
        );
      })
      .sort((left, right) => right.created_at.localeCompare(left.created_at));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }

    throw error;
  }
}

export async function persistFeedbackSubmission(
  input: FeedbackSubmissionInput,
): Promise<StoredFeedbackSubmission> {
  await ensureFeedbackStorageDirectory();

  const existing = await loadStoredFeedbackSubmissions();
  const submission: StoredFeedbackSubmission = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    ...input,
  };

  await writeFile(
    feedbackStoragePath,
    `${JSON.stringify([submission, ...existing], null, 2)}\n`,
    'utf8',
  );

  return submission;
}

import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  loadStoredFeedbackSubmissions,
  persistFeedbackSubmission,
  validateFeedbackSubmission,
} from './storage';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

async function main() {
  const tempDirectory = await mkdtemp(path.join(os.tmpdir(), 'consular-prep-feedback-'));
  const storagePath = path.join(tempDirectory, 'submissions.json');

  try {
    const invalid = validateFeedbackSubmission({
      language: 'en',
      page_slug: 'bad-route',
      report_type: 'missing',
      message: 'short',
    });

    assert(invalid.ok === false, 'Expected invalid feedback payload to fail validation');
    assert(
      invalid.errors.page_slug === 'Enter a route that starts with "/".',
      'Expected page slug validation error for invalid feedback payload',
    );
    assert(
      invalid.errors.message === 'Enter at least 10 characters so the report is actionable.',
      'Expected actionable message validation error for invalid feedback payload',
    );

    const first = validateFeedbackSubmission({
      language: 'en',
      page_slug: '/en/checklist/results',
      report_type: 'missing',
      message: 'The checklist results page needs a clearer print reminder.',
    });
    const second = validateFeedbackSubmission({
      language: 'es',
      page_slug: '/es/faq',
      report_type: 'confusion',
      message: 'La pregunta frecuente sobre asesoría legal necesita lenguaje más claro.',
    });

    assert(first.ok === true, 'Expected first feedback payload to pass validation');
    assert(second.ok === true, 'Expected second feedback payload to pass validation');

    const firstStored = await persistFeedbackSubmission(first.value, {
      storagePath,
      createId: () => 'feedback-001',
      now: () => new Date('2026-04-14T21:00:00.000Z'),
    });
    const secondStored = await persistFeedbackSubmission(second.value, {
      storagePath,
      createId: () => 'feedback-002',
      now: () => new Date('2026-04-14T21:05:00.000Z'),
    });
    const stored = await loadStoredFeedbackSubmissions({ storagePath });

    assert(stored.length === 2, `Expected 2 stored feedback submissions, received ${stored.length}`);
    assert(
      stored[0]?.id === secondStored.id && stored[1]?.id === firstStored.id,
      'Expected inbox loading to return newest submissions first',
    );
    assert(
      stored[0]?.report_type === 'confusion' && stored[1]?.report_type === 'missing',
      'Expected stored report types to match the persisted submissions',
    );
    assert(
      stored[0]?.page_slug === '/es/faq' && stored[1]?.page_slug === '/en/checklist/results',
      'Expected stored routes to match the persisted submissions',
    );

    console.log(
      JSON.stringify(
        {
          status: 'ok',
          invalidErrors: invalid.errors,
          storedCount: stored.length,
          orderedSubmissionIds: stored.map((item) => item.id),
          orderedRoutes: stored.map((item) => item.page_slug),
        },
        null,
        2,
      ),
    );
  } finally {
    await rm(tempDirectory, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

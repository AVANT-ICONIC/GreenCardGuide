import { NextResponse } from 'next/server';
import {
  persistFeedbackSubmission,
  validateFeedbackSubmission,
} from '@/lib/feedback/storage';

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          message: 'Submit feedback as valid JSON.',
        },
      },
      { status: 400 },
    );
  }

  const result = validateFeedbackSubmission(
    typeof payload === 'object' && payload !== null
      ? (payload as Record<string, unknown>)
      : {},
  );

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        errors: result.errors,
      },
      { status: 400 },
    );
  }

  const submission = await persistFeedbackSubmission(result.value);

  return NextResponse.json(
    {
      ok: true,
      submission,
    },
    { status: 201 },
  );
}

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  hasCanonicalChecklistSearchParams,
  parseChecklistAnswers,
  serializeChecklistAnswers,
} from './answers';
import {
  findFirstUnansweredQuestionIndex,
  getResumeQuestionIndex,
  hasCompleteChecklistAnswers,
} from './progress';
import { getDocumentDetailHref } from '../content/loadDocumentDetailPage';
import { assembleChecklistResults } from '../rules/assembleChecklistResults';
import { loadChecklistQuestions } from '../seed/loadSeedData';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const questions = loadChecklistQuestions();

  const dirtySearchParams = {
    post: 'bogus-post',
    case_family: ['family-based', 'employment-based'],
    applicant_role: 'principal-applicant',
    joint_sponsor: 'not-a-boolean',
    passport_ready: 'false',
  };
  const sanitizedAnswers = parseChecklistAnswers(dirtySearchParams, questions);
  const sanitizedQuery = serializeChecklistAnswers(sanitizedAnswers).toString();

  assert(
    sanitizedAnswers.applicant_role === 'principal-applicant',
    'Expected valid seeded select answers to survive parsing',
  );
  assert(
    sanitizedAnswers.passport_ready === false,
    'Expected valid boolean answers to survive parsing',
  );
  assert(
    sanitizedAnswers.post === undefined,
    'Expected unsupported select values to be dropped',
  );
  assert(
    sanitizedAnswers.joint_sponsor === undefined,
    'Expected malformed booleans to be dropped',
  );
  assert(
    sanitizedAnswers.case_family === undefined,
    'Expected duplicate query values to be dropped as ambiguous',
  );
  assert(
    sanitizedQuery === 'applicant_role=principal-applicant&passport_ready=false',
    `Unexpected sanitized query string: "${sanitizedQuery}"`,
  );
  assert(
    hasCanonicalChecklistSearchParams(dirtySearchParams, questions) === false,
    'Expected dirty query params to fail canonical validation',
  );

  const partialAnswers = parseChecklistAnswers(
    {
      post: 'ciudad-juarez',
      case_family: 'family-based',
      applicant_role: 'principal-applicant',
    },
    questions,
  );

  assert(
    findFirstUnansweredQuestionIndex(questions, partialAnswers) === 3,
    'Expected the first unanswered step after three answers to be index 3',
  );
  assert(
    getResumeQuestionIndex(questions, partialAnswers) === 3,
    'Expected resume logic to continue at the first unanswered question',
  );
  assert(
    hasCompleteChecklistAnswers(questions, partialAnswers) === false,
    'Expected partial answers to fail completion validation',
  );

  const completeAnswers = parseChecklistAnswers(
    {
      post: 'ciudad-juarez',
      case_family: 'family-based',
      applicant_role: 'principal-applicant',
      joint_sponsor: 'true',
      has_prior_marriage: 'true',
      children_immigrating: 'true',
      needs_court_records: 'true',
      passport_ready: 'false',
    },
    questions,
  );
  const completeResult = assembleChecklistResults(completeAnswers);
  const requiredDocuments =
    completeResult.sections
      .find((section) => section.key === 'required_documents')
      ?.items.map((item) => item.document_slug) ?? [];
  const conditionalDocuments =
    completeResult.sections
      .find((section) => section.key === 'conditional_documents')
      ?.items.map((item) => item.document_slug) ?? [];
  const riskFlags =
    completeResult.sections
      .find((section) => section.key === 'risk_flags')
      ?.items.map((item) => item.item_key) ?? [];
  const verifyItems =
    completeResult.sections
      .find((section) => section.key === 'verify_with_official')
      ?.items.map((item) => item.item_key) ?? [];

  assert(
    hasCompleteChecklistAnswers(questions, completeAnswers) === true,
    'Expected the seeded complete answer set to satisfy completion validation',
  );
  assert(
    getResumeQuestionIndex(questions, completeAnswers) === questions.length - 1,
    'Expected complete answers to resume on the final step',
  );
  assert(
    requiredDocuments.includes('passport') && requiredDocuments.includes('i-864'),
    'Expected required documents to include passport and I-864',
  );
  assert(
    conditionalDocuments.includes('joint-sponsor-financial-packet') &&
      conditionalDocuments.includes('marriage-termination-records') &&
      conditionalDocuments.includes('child-birth-certificates'),
    'Expected conditional documents for joint sponsor, prior marriage, and children',
  );
  assert(
    riskFlags.includes('passport-not-ready'),
    'Expected the passport readiness warning in risk flags',
  );
  assert(
    verifyItems.includes('court-record-review'),
    'Expected the court-record caution in verify-with-official items',
  );

  assert(
    getDocumentDetailHref('en', 'passport') === '/en/documents/passport',
    'Expected the shared document-detail href helper to build the English passport route',
  );
  assert(
    getDocumentDetailHref('es', 'i-864') === '/es/documents/i-864',
    'Expected the shared document-detail href helper to build the Spanish I-864 route',
  );

  const checklistResultsPath = resolve(process.cwd(), 'src/components/checklist-results.tsx');
  const printChecklistPath = resolve(process.cwd(), 'src/components/print-checklist.tsx');
  assert(existsSync(checklistResultsPath), 'Expected checklist results component to exist');
  assert(existsSync(printChecklistPath), 'Expected print checklist component to exist');

  const checklistResultsSource = readFileSync(checklistResultsPath, 'utf8');
  const printChecklistSource = readFileSync(printChecklistPath, 'utf8');

  assert(
    checklistResultsSource.includes("import { getDocumentDetailHref } from '@/lib/content/loadDocumentDetailPage';"),
    'Expected checklist results to use the shared document detail href helper',
  );
  assert(
    checklistResultsSource.includes('href={getDocumentDetailHref(language, item.document.slug)}'),
    'Expected checklist results to link document-backed items into the document detail route',
  );
  assert(
    printChecklistSource.includes("import { getDocumentDetailHref } from '@/lib/content/loadDocumentDetailPage';"),
    'Expected print checklist to use the shared document detail href helper',
  );
  assert(
    printChecklistSource.includes('href={getDocumentDetailHref(language, item.document.slug)}'),
    'Expected print checklist to link document-backed items into the document detail route',
  );

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        checklistQuestions: questions.length,
        parsing: {
          sanitizedQuery,
          retainedAnswerKeys: Object.keys(sanitizedAnswers),
        },
        progress: {
          partialResumeIndex: getResumeQuestionIndex(questions, partialAnswers),
          completeResumeIndex: getResumeQuestionIndex(questions, completeAnswers),
        },
        resultAssembly: {
          matchedRules: completeResult.matched_rules.map((rule) => rule.rule_key),
          requiredDocuments,
          conditionalDocuments,
          riskFlags,
          verifyItems,
        },
        documentDetailLinks: {
          passport: getDocumentDetailHref('en', 'passport'),
          i864: getDocumentDetailHref('es', 'i-864'),
        },
      },
      null,
      2,
    ),
  );
}

main();

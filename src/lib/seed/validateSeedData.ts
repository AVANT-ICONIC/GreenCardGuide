import {
  loadChecklistQuestions,
  loadDocuments,
  loadRequirementRules,
} from './loadSeedData';

function main() {
  const questions = loadChecklistQuestions();
  const documents = loadDocuments();
  const rules = loadRequirementRules();

  console.log(
    JSON.stringify(
      {
        status: 'ok',
        checklistQuestions: questions.length,
        documents: documents.length,
        requirementRules: rules.length,
      },
      null,
      2,
    ),
  );
}

main();

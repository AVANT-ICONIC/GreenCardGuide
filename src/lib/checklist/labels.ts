import type {
  ChecklistAnswers,
  ChecklistQuestion,
  Language,
} from '@/lib/types/domain';

const valueLabels = {
  en: {
    post: {
      'ciudad-juarez': 'Ciudad Juarez',
    },
    case_family: {
      'family-based': 'Family-based immigrant visa',
    },
    applicant_role: {
      'principal-applicant': 'Principal applicant',
      'derivative-applicant': 'Derivative applicant',
      'sponsor-helper': 'Sponsor or family helper',
    },
    boolean: {
      true: 'Yes',
      false: 'No',
    },
  },
  es: {
    post: {
      'ciudad-juarez': 'Ciudad Juarez',
    },
    case_family: {
      'family-based': 'Visa de inmigrante por familia',
    },
    applicant_role: {
      'principal-applicant': 'Solicitante principal',
      'derivative-applicant': 'Solicitante derivado',
      'sponsor-helper': 'Patrocinador o familiar de apoyo',
    },
    boolean: {
      true: 'Si',
      false: 'No',
    },
  },
} as const;

export function getChecklistQuestionLabel(
  question: ChecklistQuestion,
  language: Language,
): string {
  return language === 'en' ? question.label_en : question.label_es;
}

export function getChecklistAnswerLabel(
  question: ChecklistQuestion,
  value: ChecklistAnswers[keyof ChecklistAnswers],
  language: Language,
): string {
  if (typeof value === 'boolean') {
    return valueLabels[language].boolean[String(value) as 'true' | 'false'];
  }

  if (typeof value !== 'string') {
    return '';
  }

  const localizedValues = valueLabels[language][
    question.key as 'post' | 'case_family' | 'applicant_role'
  ];

  if (localizedValues && value in localizedValues) {
    return localizedValues[value as keyof typeof localizedValues];
  }

  return value;
}

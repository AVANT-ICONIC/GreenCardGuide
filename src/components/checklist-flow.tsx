'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  getNextQuestionIndex,
  getPreviousQuestionIndex,
} from '@/lib/checklist/flow';
import {
  parseChecklistAnswers,
  serializeChecklistAnswers,
} from '@/lib/checklist/answers';
import {
  getChecklistAnswerLabel,
  getChecklistQuestionLabel,
} from '@/lib/checklist/labels';
import { getResumeQuestionIndex } from '@/lib/checklist/progress';
import type { ChecklistQuestion, Language } from '@/lib/types/domain';

const flowCopy = {
  en: {
    eyebrow: 'Checklist questions',
    title: 'Build your prep checklist one answer at a time.',
    lede:
      'This flow is deterministic and seed-backed. It is structured so later tasks can add conditional branching without replacing the route contract.',
    stepLabel: 'Step',
    ofLabel: 'of',
    back: 'Back',
    next: 'Next question',
    finish: 'View checklist',
    startOver: 'Start over',
    chooseOne: 'Choose one option to continue.',
    yes: 'Yes',
    no: 'No',
  },
  es: {
    eyebrow: 'Preguntas de la lista',
    title: 'Construya su lista de preparacion una respuesta a la vez.',
    lede:
      'Este flujo es determinista y basado en semillas. Esta estructurado para agregar ramificaciones condicionales mas adelante sin cambiar el contrato de la ruta.',
    stepLabel: 'Paso',
    ofLabel: 'de',
    back: 'Anterior',
    next: 'Siguiente pregunta',
    finish: 'Ver lista',
    startOver: 'Empezar de nuevo',
    chooseOne: 'Elija una opcion para continuar.',
    yes: 'Si',
    no: 'No',
  },
} as const;

function getOptionLabel(
  language: Language,
  question: ChecklistQuestion,
  option: string,
): string {
  const typedValue =
    question.input_type === 'boolean' ? option === 'true' : option;

  const localizedValue = getChecklistAnswerLabel(
    question,
    typedValue,
    language,
  );

  return localizedValue || (question.input_type === 'boolean'
    ? option === 'true'
      ? flowCopy[language].yes
      : flowCopy[language].no
    : option);
}

export function ChecklistFlow({
  language,
  questions,
  initialSearchParams,
}: {
  language: Language;
  questions: ChecklistQuestion[];
  initialSearchParams: Record<string, string | string[] | undefined>;
}) {
  const router = useRouter();
  const copy = flowCopy[language];
  const initialAnswers = useMemo(
    () => parseChecklistAnswers(initialSearchParams, questions),
    [initialSearchParams, questions],
  );
  const [currentIndex, setCurrentIndex] = useState(() =>
    getResumeQuestionIndex(questions, initialAnswers),
  );
  const [answers, setAnswers] = useState(initialAnswers);
  const currentQuestion = questions[currentIndex];
  const currentValue = answers[currentQuestion.key];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const options =
    currentQuestion.input_type === 'boolean'
      ? ['true', 'false']
      : currentQuestion.options ?? [];

  function persistAnswers(nextAnswers: typeof answers) {
    const params = serializeChecklistAnswers(nextAnswers);
    router.replace(`/${language}/checklist/questions?${params.toString()}`, {
      scroll: false,
    });
  }

  function handleSelect(rawValue: string) {
    const nextValue =
      currentQuestion.input_type === 'boolean' ? rawValue === 'true' : rawValue;
    const nextAnswers = {
      ...answers,
      [currentQuestion.key]: nextValue,
    };

    setAnswers(nextAnswers);
    persistAnswers(nextAnswers);
  }

  function handleNext() {
    if (currentValue === undefined) {
      return;
    }

    const nextIndex = getNextQuestionIndex(currentIndex, answers, questions);
    if (nextIndex === null) {
      router.push(
        `/${language}/checklist/results?${serializeChecklistAnswers(answers).toString()}`,
      );
      return;
    }

    setCurrentIndex(nextIndex);
  }

  function handleBack() {
    const previousIndex = getPreviousQuestionIndex(currentIndex);
    if (previousIndex === null) {
      router.push(`/${language}/checklist/start`);
      return;
    }

    setCurrentIndex(previousIndex);
  }

  return (
    <section className="hero">
      <p className="hero__eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="hero__lede">{copy.lede}</p>

      <div className="checklist-progress" aria-label={`${copy.stepLabel} progress`}>
        <div className="checklist-progress__meta">
          <span>
            {copy.stepLabel} {currentIndex + 1} {copy.ofLabel} {totalQuestions}
          </span>
          <span>{progressPercent}%</span>
        </div>
        <div className="checklist-progress__track" aria-hidden="true">
          <div
            className="checklist-progress__fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <article className="question-card">
        <h2>
          {getChecklistQuestionLabel(currentQuestion, language)}
        </h2>

        <div className="question-card__options">
          {options.map((option) => {
            const typedValue =
              currentQuestion.input_type === 'boolean'
                ? option === 'true'
                : option;
            const isSelected = currentValue === typedValue;

            return (
              <button
                key={option}
                className={`question-option${isSelected ? ' question-option--selected' : ''}`}
                onClick={() => handleSelect(option)}
                type="button"
              >
                {getOptionLabel(language, currentQuestion, option)}
              </button>
            );
          })}
        </div>

        {currentValue === undefined ? (
          <p className="question-card__hint">{copy.chooseOne}</p>
        ) : null}

        <div className="question-card__actions">
          <button
            className="hero__button hero__button--secondary"
            onClick={handleBack}
            type="button"
          >
            {copy.back}
          </button>
          <button
            className="hero__button hero__button--primary"
            disabled={currentValue === undefined}
            onClick={handleNext}
            type="button"
          >
            {currentIndex === totalQuestions - 1 ? copy.finish : copy.next}
          </button>
        </div>
      </article>

      <Link className="hero__button hero__button--secondary" href={`/${language}/checklist/start`}>
        {copy.startOver}
      </Link>
    </section>
  );
}

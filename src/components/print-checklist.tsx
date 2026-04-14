import Link from 'next/link';
import {
  getChecklistAnswerLabel,
  getChecklistQuestionLabel,
} from '@/lib/checklist/labels';
import type { ChecklistQuestion, ChecklistResult, Language } from '@/lib/types/domain';

const printCopy = {
  en: {
    eyebrow: 'Print checklist',
    title: 'Night-before packing review',
    lede:
      'Compact checklist output for printing or saving as a focused travel packet.',
    empty: 'No items for this section.',
    back: 'Back to results',
    print: 'Print this page',
    answers: 'Case answers',
  },
  es: {
    eyebrow: 'Lista para imprimir',
    title: 'Revision para la noche anterior',
    lede:
      'Salida compacta de la lista para imprimir o guardar como paquete de viaje enfocado.',
    empty: 'No hay elementos para esta seccion.',
    back: 'Volver a resultados',
    print: 'Imprimir esta pagina',
    answers: 'Respuestas del caso',
  },
} as const;

function getSectionTitle(
  section: ChecklistResult['sections'][number],
  language: Language,
) {
  return language === 'en' ? section.title_en : section.title_es;
}

function getItemTitle(
  item: ChecklistResult['sections'][number]['items'][number],
  language: Language,
) {
  if (item.document) {
    return language === 'en' ? item.document.label_en : item.document.label_es;
  }

  return item.item_key ?? item.rule_key;
}

function getItemNotes(
  item: ChecklistResult['sections'][number]['items'][number],
  language: Language,
) {
  return language === 'en' ? item.notes_en : item.notes_es;
}

export function PrintChecklist({
  language,
  questions,
  result,
  resultsHref,
}: {
  language: Language;
  questions: ChecklistQuestion[];
  result: ChecklistResult;
  resultsHref: string;
}) {
  const copy = printCopy[language];
  const visibleSections = result.sections.filter((section) => section.items.length > 0);

  return (
    <section className="hero print-sheet">
      <div className="print-sheet__controls print-hidden">
        <Link className="hero__button hero__button--secondary" href={resultsHref}>
          {copy.back}
        </Link>
        <button
          className="hero__button hero__button--primary"
          onClick={() => window.print()}
          type="button"
        >
          {copy.print}
        </button>
      </div>

      <p className="hero__eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="hero__lede">{copy.lede}</p>

      <article className="hero__card">
        <h2>{copy.answers}</h2>
        <ul className="results-answers">
          {questions
            .filter((question) => result.answers[question.key] !== undefined)
            .map((question) => (
              <li key={question.key}>
                <strong>{getChecklistQuestionLabel(question, language)}</strong>:{' '}
                {getChecklistAnswerLabel(
                  question,
                  result.answers[question.key],
                  language,
                )}
              </li>
            ))}
        </ul>
      </article>

      <div className="print-sections">
        {visibleSections.map((section) => (
          <article key={section.key} className="print-section">
            <div className="print-section__header">
              <h2>{getSectionTitle(section, language)}</h2>
              <span>{section.confidence_label}</span>
            </div>
            {section.items.length === 0 ? (
              <p>{copy.empty}</p>
            ) : (
              <ul className="print-section__list">
                {section.items.map((item) => (
                  <li key={item.rule_key}>
                    <strong>{getItemTitle(item, language)}</strong>
                    {getItemNotes(item, language) ? (
                      <p>{getItemNotes(item, language)}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

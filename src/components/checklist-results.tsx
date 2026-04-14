import Link from 'next/link';
import {
  getChecklistAnswerLabel,
  getChecklistQuestionLabel,
} from '@/lib/checklist/labels';
import type {
  ChecklistQuestion,
  ChecklistResult,
  ChecklistResultSection,
  Language,
} from '@/lib/types/domain';

const resultsCopy = {
  en: {
    eyebrow: 'Checklist results',
    title: 'Your deterministic prep checklist.',
    lede:
      'This is the first grouped result scaffold generated from the current seed rules. It is intentionally conservative and ready for future print and trust layers.',
    answers: 'Current answers',
    empty: 'No items in this section for the current answers.',
    restart: 'Edit answers',
  },
  es: {
    eyebrow: 'Resultados de la lista',
    title: 'Su lista de preparacion determinista.',
    lede:
      'Este es el primer resultado agrupado generado con las reglas semilla actuales. Es intencionalmente conservador y queda listo para futuras capas de impresion y confianza.',
    answers: 'Respuestas actuales',
    empty: 'No hay elementos en esta seccion para las respuestas actuales.',
    restart: 'Editar respuestas',
  },
} as const;

function getSectionTitle(section: ChecklistResultSection, language: Language): string {
  return language === 'en' ? section.title_en : section.title_es;
}

function getItemLabel(
  section: ChecklistResultSection,
  item: ChecklistResult['sections'][number]['items'][number],
  language: Language,
): string {
  if (item.document) {
    return language === 'en' ? item.document.label_en : item.document.label_es;
  }

  if (item.item_key) {
    return item.item_key;
  }

  return section.key;
}

function getItemNotes(
  item: ChecklistResult['sections'][number]['items'][number],
  language: Language,
): string | undefined {
  return language === 'en' ? item.notes_en : item.notes_es;
}

export function ChecklistResults({
  language,
  questions,
  result,
  editHref,
  printHref,
}: {
  language: Language;
  questions: ChecklistQuestion[];
  result: ChecklistResult;
  editHref: string;
  printHref: string;
}) {
  const copy = resultsCopy[language];

  return (
    <section className="hero">
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

      <div className="results-grid">
        {result.sections.map((section) => (
          <article key={section.key} className="hero__card">
            <h2>{getSectionTitle(section, language)}</h2>
            <p className="results-section__confidence">{section.confidence_label}</p>
            {section.items.length === 0 ? (
              <p>{copy.empty}</p>
            ) : (
              <ul className="results-list">
                {section.items.map((item) => (
                  <li key={item.rule_key}>
                    <strong>{getItemLabel(section, item, language)}</strong>
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

      <div className="hero__actions">
        <Link className="hero__button hero__button--secondary" href={editHref}>
          {copy.restart}
        </Link>
        <Link className="hero__button hero__button--primary" href={printHref}>
          {language === 'en' ? 'Print view' : 'Vista imprimible'}
        </Link>
      </div>
    </section>
  );
}

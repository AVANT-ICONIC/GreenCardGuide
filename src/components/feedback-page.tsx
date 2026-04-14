'use client';

import { useState } from 'react';
import type { Language } from '@/lib/types/domain';

const feedbackCopy = {
  en: {
    eyebrow: 'Feedback',
    title: 'Tell us what is confusing or missing.',
    lede:
      'This route is the first public feedback scaffold. It defines what feedback is for before storage, moderation, or review tooling exists.',
    guidanceTitle: 'What feedback helps most',
    guidance: [
      'Pages or checklist steps that feel unclear on mobile',
      'Missing preparation questions or document categories',
      'Places where placeholder content should be replaced with source-backed guidance',
    ],
    formTitle: 'Feedback form scaffold',
    pageLabel: 'Page or route',
    typeLabel: 'Feedback type',
    messageLabel: 'Message',
    submit: 'Submit feedback',
    pending:
      'Submission storage is not built yet. This button only confirms the intended feedback flow.',
    success:
      'Placeholder state only. Feedback capture is not persisted yet, but this route now defines the public surface and expected inputs.',
    options: {
      confusion: 'Confusing guidance',
      missing: 'Missing content',
      bug: 'Route or UI issue',
    },
  },
  es: {
    eyebrow: 'Comentarios',
    title: 'Cuéntenos qué es confuso o qué falta.',
    lede:
      'Esta ruta es la primera base publica de comentarios. Define para qué sirve el feedback antes de que existan almacenamiento, moderación o herramientas de revisión.',
    guidanceTitle: 'Qué comentarios ayudan más',
    guidance: [
      'Páginas o pasos de la lista que se sientan confusos en móvil',
      'Preguntas de preparación o categorías de documentos que falten',
      'Lugares donde el contenido provisional deba reemplazarse con guía respaldada por fuentes',
    ],
    formTitle: 'Base del formulario',
    pageLabel: 'Página o ruta',
    typeLabel: 'Tipo de comentario',
    messageLabel: 'Mensaje',
    submit: 'Enviar comentario',
    pending:
      'El almacenamiento de envíos todavía no existe. Este botón solo confirma el flujo previsto del feedback.',
    success:
      'Estado provisional solamente. Los comentarios todavía no se guardan, pero esta ruta ya define la superficie pública y los datos esperados.',
    options: {
      confusion: 'Guía confusa',
      missing: 'Contenido faltante',
      bug: 'Problema de ruta o interfaz',
    },
  },
} as const;

export function FeedbackPage({ language }: { language: Language }) {
  const copy = feedbackCopy[language];
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="hero">
      <p className="hero__eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="hero__lede">{copy.lede}</p>

      <div className="guide-sections">
        <article className="hero__card">
          <h2>{copy.guidanceTitle}</h2>
          <ul className="results-list">
            {copy.guidance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="hero__card">
          <h2>{copy.formTitle}</h2>
          <form
            className="feedback-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <label className="feedback-form__field">
              <span>{copy.pageLabel}</span>
              <input defaultValue="" name="page_slug" placeholder="/en/checklist/results" type="text" />
            </label>

            <label className="feedback-form__field">
              <span>{copy.typeLabel}</span>
              <select defaultValue="confusion" name="report_type">
                <option value="confusion">{copy.options.confusion}</option>
                <option value="missing">{copy.options.missing}</option>
                <option value="bug">{copy.options.bug}</option>
              </select>
            </label>

            <label className="feedback-form__field">
              <span>{copy.messageLabel}</span>
              <textarea
                name="message"
                placeholder={language === 'en' ? 'What felt unclear or missing?' : '¿Qué se sintió confuso o faltante?'}
                rows={5}
              />
            </label>

            <button className="hero__button hero__button--primary" type="submit">
              {copy.submit}
            </button>
          </form>

          <p className="question-card__hint">
            {submitted ? copy.success : copy.pending}
          </p>
        </article>
      </div>
    </section>
  );
}

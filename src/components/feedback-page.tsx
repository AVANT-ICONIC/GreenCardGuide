'use client';

import { useState } from 'react';
import type { Language } from '@/lib/types/domain';
import type {
  FeedbackReportType,
  FeedbackValidationErrors,
  StoredFeedbackSubmission,
} from '@/lib/feedback/storage';

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
      'Submissions are stored locally in the repo review inbox. They are not published automatically or sent to an external service.',
    success: 'Feedback saved to the local review inbox.',
    submitError:
      'Feedback could not be saved right now. Check the form and try again.',
    fieldHelp: {
      page_slug: 'Use the route where the issue happened.',
      message: 'Describe what felt unclear, missing, or broken.',
    },
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
      'Los envíos se guardan localmente en la bandeja de revisión del repositorio. No se publican automáticamente ni se envían a un servicio externo.',
    success: 'Comentario guardado en la bandeja local de revisión.',
    submitError:
      'No se pudo guardar el comentario en este momento. Revise el formulario e inténtelo de nuevo.',
    fieldHelp: {
      page_slug: 'Use la ruta donde ocurrió el problema.',
      message: 'Describa qué se sintió confuso, faltante o roto.',
    },
    options: {
      confusion: 'Guía confusa',
      missing: 'Contenido faltante',
      bug: 'Problema de ruta o interfaz',
    },
  },
} as const;

export function FeedbackPage({ language }: { language: Language }) {
  const copy = feedbackCopy[language];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FeedbackValidationErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [savedSubmission, setSavedSubmission] =
    useState<StoredFeedbackSubmission | null>(null);

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
            onSubmit={async (event) => {
              event.preventDefault();
              setIsSubmitting(true);
              setErrors({});
              setSubmitError(null);

              const formData = new FormData(event.currentTarget);
              const payload = {
                language,
                page_slug: String(formData.get('page_slug') ?? ''),
                report_type: String(formData.get('report_type') ?? '') as FeedbackReportType,
                message: String(formData.get('message') ?? ''),
              };

              const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              });

              const result = (await response.json()) as
                | {
                    ok: true;
                    submission: StoredFeedbackSubmission;
                  }
                | {
                    ok: false;
                    errors?: FeedbackValidationErrors;
                  };

              if (!response.ok || !result.ok) {
                setSavedSubmission(null);
                setErrors(result.ok ? {} : result.errors ?? {});
                setSubmitError(copy.submitError);
                setIsSubmitting(false);
                return;
              }

              setSavedSubmission(result.submission);
              setErrors({});
              setSubmitError(null);
              event.currentTarget.reset();
              setIsSubmitting(false);
            }}
          >
            <label className="feedback-form__field">
              <span>{copy.pageLabel}</span>
              <input defaultValue="" name="page_slug" placeholder="/en/checklist/results" type="text" />
              <span className="question-card__hint">
                {errors.page_slug ?? copy.fieldHelp.page_slug}
              </span>
            </label>

            <label className="feedback-form__field">
              <span>{copy.typeLabel}</span>
              <select defaultValue="confusion" name="report_type">
                <option value="confusion">{copy.options.confusion}</option>
                <option value="missing">{copy.options.missing}</option>
                <option value="bug">{copy.options.bug}</option>
              </select>
              {errors.report_type ? (
                <span className="question-card__hint">{errors.report_type}</span>
              ) : null}
            </label>

            <label className="feedback-form__field">
              <span>{copy.messageLabel}</span>
              <textarea
                name="message"
                placeholder={language === 'en' ? 'What felt unclear or missing?' : '¿Qué se sintió confuso o faltante?'}
                rows={5}
              />
              <span className="question-card__hint">
                {errors.message ?? copy.fieldHelp.message}
              </span>
            </label>

            <button className="hero__button hero__button--primary" type="submit">
              {isSubmitting ? `${copy.submit}...` : copy.submit}
            </button>
          </form>

          <p className="question-card__hint">
            {savedSubmission
              ? `${copy.success} ${savedSubmission.id}`
              : submitError ?? copy.pending}
          </p>
        </article>
      </div>
    </section>
  );
}

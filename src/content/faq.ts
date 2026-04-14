import type { FaqItemContent } from '@/lib/content/types';
import type { Language } from '@/lib/types/domain';

const faqContent = {
  en: [
    {
      key: 'what-is-this-site',
      question: 'What is this site for?',
      answer:
        'This placeholder FAQ explains the current product shell for family-based Ciudad Juarez interview prep. It is not yet source-backed editorial guidance.',
      tags: ['scope', 'trust'],
    },
    {
      key: 'is-this-legal-advice',
      question: 'Is this legal advice?',
      answer:
        'No. The product is an operational preparation tool and should not replace official instructions or professional legal help when needed.',
      tags: ['trust', 'legal-advice'],
    },
  ],
  es: [
    {
      key: 'what-is-this-site',
      question: '¿Para qué sirve este sitio?',
      answer:
        'Este FAQ provisional explica la base actual del producto para la preparacion de entrevistas familiares en Ciudad Juarez. Todavia no es orientacion editorial respaldada por fuentes.',
      tags: ['alcance', 'confianza'],
    },
    {
      key: 'is-this-legal-advice',
      question: '¿Esto es asesoría legal?',
      answer:
        'No. El producto es una herramienta operativa de preparacion y no debe reemplazar instrucciones oficiales ni ayuda legal profesional cuando haga falta.',
      tags: ['confianza', 'asesoria-legal'],
    },
  ],
} as const;

export function getFaqItems(language: Language): FaqItemContent[] {
  return faqContent[language].map((item) => ({
    key: item.key,
    question: item.question,
    answer: item.answer,
    tags: [...item.tags],
    language,
    confidence_label: 'verify_with_official',
    review_status: 'placeholder',
    source_references: [],
  }));
}

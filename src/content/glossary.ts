import type { GlossaryTermContent } from '@/lib/content/types';
import type { Language } from '@/lib/types/domain';

const glossaryContent = {
  en: [
    {
      term_key: 'petitioner',
      term: 'Petitioner',
      definition:
        'Placeholder term for the person who filed the immigrant petition in the case.',
      related_terms: ['beneficiary', 'affidavit-of-support'],
    },
    {
      term_key: 'beneficiary',
      term: 'Beneficiary',
      definition:
        'Placeholder term for the person seeking the immigrant visa benefit.',
      related_terms: ['petitioner'],
    },
  ],
  es: [
    {
      term_key: 'peticionario',
      term: 'Peticionario o patrocinador',
      definition:
        'Termino provisional para la persona que presento la peticion de inmigrante en el caso.',
      related_terms: ['beneficiario', 'patrocinio-economico'],
    },
    {
      term_key: 'beneficiario',
      term: 'Beneficiario',
      definition:
        'Termino provisional para la persona que busca recibir el beneficio de la visa de inmigrante.',
      related_terms: ['peticionario'],
    },
  ],
} as const;

export function getGlossaryTerms(language: Language): GlossaryTermContent[] {
  return glossaryContent[language].map((term) => ({
    term_key: term.term_key,
    term: term.term,
    definition: term.definition,
    related_terms: [...term.related_terms],
    language,
    confidence_label: 'verify_with_official',
    review_status: 'placeholder',
    source_references: [],
  }));
}

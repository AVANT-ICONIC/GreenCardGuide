# Data Model

## Core entities

### Post
Represents a consular post.
- id
- slug
- country
- city
- is_active

### VisaCategory
- id
- slug
- label_en
- label_es
- family_group

### Document
- id
- slug
- label_en
- label_es
- description_en
- description_es
- category

### DocumentVariant
Represents variants or conditions of a document.
- id
- document_id
- variant_key
- label_en
- label_es

### CaseQuestion
- id
- key
- label_en
- label_es
- input_type
- options_json
- step_order

### RequirementRule
A deterministic rule that maps case facts to outputs.
- id
- rule_key
- post_id nullable
- visa_category_id nullable
- conditions_json
- output_type
- output_payload_json
- priority
- is_active

### SourceReference
- id
- source_key
- title
- url
- publisher
- language
- reviewed_at
- note

### ContentPage
- id
- slug
- language
- title
- summary
- body
- review_status
- last_reviewed_at

### ContentSourceMap
Join table between content and sources.
- content_page_id
- source_reference_id
- note

### ReviewEvent
- id
- target_type
- target_id
- event_type
- actor
- created_at
- summary

### GlossaryTerm
- id
- term_key
- term_en
- term_es
- definition_en
- definition_es

### FeedbackReport
- id
- page_slug
- language
- report_type
- message
- created_at

## Output types for requirement rules
Suggested enums:
- required_document
- conditional_document
- backup_document
- print_item
- risk_flag
- prep_step
- do_not_bring
- verify_with_official

## Conditions JSON pattern
Use normalized keys based on checklist answers. Example:

```json
{
  "post": "ciudad-juarez",
  "case_family": "family-based",
  "joint_sponsor": true,
  "has_prior_marriage": false
}
```

## Rule output payload example
```json
{
  "document_slug": "i-864",
  "strength": "required",
  "notes_en": "Bring the sponsor financial packet and any joint sponsor packet if applicable.",
  "notes_es": "Lleve el paquete financiero del patrocinador y el del copatrocinador si aplica."
}
```

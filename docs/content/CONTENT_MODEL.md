# Content Model

## Content types

### 1. Guide page
Examples:
- what to bring
- originals vs copies
- interview-week plan
- common mistakes

Fields:
- slug
- language
- title
- summary
- sections
- source references
- last reviewed date
- confidence label

### 2. Document explainer
Examples:
- birth certificate
- marriage certificate
- passport
- I-864
- DS-260 confirmation

Fields:
- document slug
- language
- who needs it
- whether original/copy/translation is needed
- common mistakes
- alternatives/notes
- source references
- initial route scaffold: `/[lang]/documents/[slug]`

### 3. FAQ item
Fields:
- question
- answer
- tags
- language
- source references

### 4. Glossary term
Fields:
- term key
- term in each language
- plain-language definition
- related terms

## Confidence labels
- Official requirement
- Official recommendation
- Common practical advice
- Verify with official instructions

## Editorial rules
- Prefer plain language
- Avoid hidden assumptions
- Separate requirement from suggestion
- Never overstate anecdotal guidance
- Show the safest useful answer first

## Bilingual rules
- Spanish is first-class, not a machine-translated afterthought
- Keep terminology consistent across guides and checklist output
- Use wording people actually recognize in context

# Glossary gaps

Terms you needed that [glossary.md](./glossary.md) does not answer.

Add a row rather than deciding at the keyboard. A term settled once in here and
then added to the source table is a term the next translator does not have to
guess at; a term settled quietly in a paragraph is one the site will disagree
with itself about later.

## How to use this file

- **Missing** — the English term has no approved Arabic anywhere. Write what you
  used so the page can ship, and flag it.
- **Unclear** — the glossary has a rendering but it does not fit this context.
  Say what the context is; the fix is usually a second entry, not a rewrite.
- **Wrong** — the approved rendering is a mistranslation. Say what it should be.

Leave **Resolution** empty. It is filled in when the term is added to the source
table listed in glossary.md and the glossary is rebuilt, at which point the row
moves to Settled.

## Decisions that look like bugs

Things a later reader is likely to "fix". They are not broken.

- **Lung Cancer Surgery has two Arabic readings on purpose.** `taxonomyLabel()`
  returns جراحة سرطان الرئة for facets, filters and breadcrumbs, where the term
  names an operation. `medicalPhrase()` returns
  جراحة سرطان الرئة — التنسيق الإشعاعي on doctor profiles, where the term
  describes what a radiation oncologist contributes to it. Different registers,
  both approved. Do not collapse them into one string.

- **Some procedures are listed under a spelling that is not in the URL.** The
  catalog holds several spellings of the same procedure, so
  `PROCEDURE_TERM_ALIASES` in `src/lib/i18n/term-aliases.ts` redirects each
  variant to the routable name. The variants have no Arabic of their own by
  design; add the alias, not a second translation.

## Open

| English | Context (page, component) | Issue | Arabic used | Raised by | Resolution |
| --- | --- | --- | --- | --- | --- |

## Settled

| English | Arabic | Added to | Date |
| --- | --- | --- | --- |

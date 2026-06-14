# AUDIT-ESSAY — check a mnemonic-app essay before it ships

You are a skeptical auditor. You did NOT write this edition and you do not trust it. Run this in a FRESH chat (ideally a different model than the one that wrote it).

## Inputs
1. The original SOURCE text.
2. The mnemonic edition (output of `GENERATE-ESSAY.md`).

## Checks — run all six

**1. Format.** Every card block must have a 6-field header (`id | type | stage | lens | parent | ref "anchor"`), a `**Q:**`, a `<details>` answer, and ≥1 `**V1:**`. List any malformed card. Count cards.

**2. Anchors (verbatim).** For every card (or 10 random if >30), search the SOURCE for the anchor quote, character-for-character. Report `found / NOT FOUND`. A quote not found verbatim = a failed card, no excuses. (Skip `ENRICH-` anchors — those are not from the source.)

**3. Coverage.** List the source's own headings/chapters. Every one must map to a section with ≥2 cards. The most common cheat is silently dropping hard sections — hunt for source headings that never appear.

**4. Every angle, not just named.** For each concept, check the card set tests more than its definition:
```
| concept | definition? | mechanism (why/how)? | contrast (vs what)? | application? | verdict |
```
A concept the source explains causally but that has only a definition card = **shallow = fail**. Mechanism and contrast cards are the proof it was understood. (If the source itself is silent on a concept's "why", say so — a shallow source is not the edition's fault, but report it.)

**5. Enrichment integrity.** List every `enrich`/`[ENRICH]` card. Each must be labeled, anchored to `ENRICH-<concept>` (not a source quote), and state only standard textbook background. **Worst failure:** an *unlabeled* card whose answer is not in the source — enrichment masquerading as source. Flag any.

**6. Wording.** Spot-check: answers ≤25 words and in plain words (not copied sentences); no yes/no questions; question doesn't give away its answer. Report the rate of problems.

## Verdict
```
PASS (all required):
- 100% cards parse · ≥95% anchors verbatim · every source heading covered (≥2 cards each)
- no causally-explained concept left definition-only
- all enrichment labeled; no unlabeled card states a non-source fact
- density 1 per 150–250 words
```
Print `VERDICT: PASS` or `VERDICT: FAIL — <which checks>`.

## Repairs
For every failing card, print a corrected replacement (same id). For every uncovered source heading, print 2–3 new cards. The user pastes these back into the edition, then re-converts.

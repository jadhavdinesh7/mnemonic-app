# Authoring new essays for the app

This folder is a small, self-contained pipeline for turning **any subject** into an interactive essay in this app — using **any LLM** to do the thinking. It does not depend on the "Track 0" markdown system; it is the app's own way to make content.

## The 4 steps

**1. GENERATE.** Open a chat with a capable LLM. Attach (or paste) `GENERATE-ESSAY.md` and your source material, and say:
```
Follow GENERATE-ESSAY.md exactly.
GOAL: (one line — why you want to learn this)
Here is my source:
(paste the text — a chapter or article works best)
```
Save the **edition** it returns (everything from the `#` title line through `## Glossary`) into `content-src/<your-id>.md`. The inventory/maps/audit it prints are working notes — leave those in the chat.

**2. AUDIT.** Open a **new** chat (a different model is even better). Attach `AUDIT-ESSAY.md`, your source, and the edition. Say `Follow AUDIT-ESSAY.md.` Paste its fixes back into your `.md`.

**3. CONVERT.** Turn the markdown into app content:
```
node tools/md-to-content.mjs content-src/<your-id>.md -o src/content/<your-id>.json
```
Check the self-check line: card and section counts should match, `UNPARSED` should be clean.

**4. REGISTER.** In `src/content/registry.js`, import the JSON and add it to the `essays` array with `essayFromJson(...)` (copy the existing example). Run `npm run dev` — your essay is now live and joins the daily review automatically.

## Which model should I use?

- **Steps 1–2 (generate + audit):** use the **best** model you have — this is where the depth of the questions comes from. If you can use Claude, ChatGPT, or Gemini (even free), you are above the bar; smarter versions write deeper "why" questions.
- **Step 3–4:** mechanical, no AI needed.
- **Daily review (in the app):** needs nothing — the app handles it.

The pipeline is built so a weaker model still produces something usable, and the AUDIT step (done with a strong model) is the safety net that catches shallow or unfaithful cards.

## What "good" looks like

A good essay teaches each concept **from every angle** — not just "what is X" but *why* it works (mechanism) and *what it is not* (contrast) — with every card traceable to a real quote from the source. That depth is the whole point: it is what makes the ideas stick.

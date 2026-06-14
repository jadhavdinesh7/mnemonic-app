#!/usr/bin/env node
/**
 * md-to-content.mjs — deterministic converter
 *
 * Turns a markdown "mnemonic edition" (produced by authoring/GENERATE-ESSAY.md)
 * into the app's content JSON. It emits ONLY the block types the renderer in
 * src/main.js already understands (paragraph, heading, subheading, blockquote,
 * list, red-flag, cards), so no renderer changes are needed. Extra card fields
 * (anchor, stage, lens, parent, variants) are preserved for future use and
 * ignored by the current renderer.
 *
 * Usage:
 *   node tools/md-to-content.mjs <input.md> [-o out.json] [--id ID] [--title T]
 *
 * Prints a self-check to stderr: card/section counts and any UNPARSED lines.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';

// ---------- args ----------
const args = process.argv.slice(2);
let input = null, out = null, idOverride = null, titleOverride = null;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '-o' || a === '--out') out = args[++i];
  else if (a === '--id') idOverride = args[++i];
  else if (a === '--title') titleOverride = args[++i];
  else if (!input) input = a;
}
if (!input) {
  console.error('usage: node tools/md-to-content.mjs <input.md> [-o out.json] [--id ID] [--title T]');
  process.exit(2);
}

const raw = readFileSync(input, 'utf8');
const lines = raw.split(/\r?\n/);
const unparsed = [];

// ---------- inline markdown -> safe HTML ----------
function inline(s) {
  if (s == null) return '';
  let t = String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/`([^`]+?)`/g, '<code>$1</code>');
  t = t.replace(/\*(.+?)\*/g, '<em>$1</em>');
  return t.trim();
}
function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ---------- meta ----------
const meta = { title: '', subtitle: '', author: '', description: '', readingTime: '' };
let id = idOverride || slug(basename(input).replace(/\.md$/i, ''));

// ---------- walk ----------
const sections = [];
let i = 0;

// title + front-matter (everything before the first "## ")
for (; i < lines.length; i++) {
  const l = lines[i];
  if (l.startsWith('## ')) break;
  const mTitle = l.match(/^#\s+(.*)$/);
  if (mTitle) meta.title = mTitle[1].replace(/\s*[—-]\s*mnemonic edition\s*$/i, '').trim();
  const mSrc = l.match(/^>\s*\*\*Source:\*\*\s*(.*)$/i);
  if (mSrc) { meta.subtitle = mSrc[1].trim(); meta.author = mSrc[1].trim(); }
}
if (titleOverride) meta.title = titleOverride;

// helper: collect a contiguous run of lines that start with '>'
function collectQuoteRun(startIdx) {
  const run = [];
  let j = startIdx;
  for (; j < lines.length; j++) {
    if (/^>/.test(lines[j])) run.push(lines[j].replace(/^>\s?/, ''));
    else break;
  }
  return { run, next: j };
}

// helper: parse a single card from a stripped quote-run
function parseCard(run) {
  const head = run[0].replace(/^\[!card\]\s*/, '');
  const fields = head.split('|').map(s => s.trim());
  const [cid, type, stage, lensRaw, parentRaw, refRaw] = fields;
  let ref = '', quote = '';
  if (refRaw) {
    const m = refRaw.match(/^(.*?)\s*"([^"]*)"\s*$/);
    if (m) { ref = m[1].trim(); quote = m[2].trim(); }
    else ref = refRaw.trim();
  }
  let question = '', answer = '', inDetails = false;
  const variants = [];
  for (let k = 1; k < run.length; k++) {
    const ln = run[k];
    const q = ln.match(/^\*\*Q:\*\*\s*(.*)$/);
    if (q) { question = q[1]; continue; }
    if (/<details/.test(ln)) { inDetails = true; continue; }
    if (/<\/details>/.test(ln)) { inDetails = false; continue; }
    const v = ln.match(/^\*\*V\d+:\*\*\s*(.*)$/);
    if (v) { variants.push(inline(v[1])); continue; }
    if (inDetails && ln.trim() && !/<summary>/.test(ln)) {
      answer += (answer ? ' ' : '') + ln.trim();
    }
  }
  const refTag = ref ? ` <span class="card-src">(§${ref})</span>` : '';
  return {
    id: cid,
    question: inline(question),
    answer: inline(answer) + refTag,
    cardType: type || 'fact',
    stage: stage && stage !== '-' ? stage : 'recall',
    lens: lensRaw && lensRaw !== '-' ? lensRaw : null,
    parent: parentRaw && parentRaw !== '-' ? parentRaw : null,
    anchor: { ref, quote },
    variants,
  };
}

// section loop
let cardCount = 0;
while (i < lines.length) {
  const header = lines[i];
  const mH = header.match(/^##\s+(.*)$/);
  if (!mH) { i++; continue; }
  const headingRaw = mH[1].trim();
  i++;

  if (/^how to read/i.test(headingRaw)) { // skip intro section
    while (i < lines.length && !/^##\s/.test(lines[i])) i++;
    continue;
  }
  if (/^audit/i.test(headingRaw)) break; // audit + everything after is dropped

  if (/^glossary/i.test(headingRaw)) {
    const items = [];
    while (i < lines.length && !/^##\s/.test(lines[i])) {
      const row = lines[i].match(/^\|(.+)\|\s*$/);
      if (row) {
        const cells = row[1].split('|').map(c => c.trim());
        if (cells.length >= 2 && !/^-+$/.test(cells[0]) && cells[0].toLowerCase() !== 'term') {
          items.push(`<strong>${inline(cells[0])}</strong> — ${inline(cells[1])}`);
        }
      }
      i++;
    }
    if (items.length) sections.push({ id: 'glossary', heading: 'Glossary', content: [{ type: 'list', items }] });
    continue;
  }

  // normal content section
  const mS = headingRaw.match(/^S(\d+)\.\s*(.*)$/);
  const secId = mS ? `S${mS[1]}` : slug(headingRaw);
  const heading = mS ? mS[2].trim() : headingRaw;
  const content = [];
  let listBuf = null;

  const flushList = () => { if (listBuf) { content.push({ type: 'list', items: listBuf }); listBuf = null; } };
  const pushCard = (card) => {
    let last = content[content.length - 1];
    if (!last || last.type !== 'cards') { last = { type: 'cards', cards: [] }; content.push(last); }
    last.cards.push(card); cardCount++;
  };

  while (i < lines.length && !/^##\s/.test(lines[i])) {
    const l = lines[i];
    if (/^####\s/.test(l)) { i++; continue; }                 // "Try to recall" heading
    if (/^!\[[^\]]*\]\([^)]*\)\s*$/.test(l)) { i++; continue; } // drop standalone image refs (images not rendered yet; captions are separate lines and kept)
    if (l.trim() === '') { flushList(); i++; continue; }
    if (/^###\s/.test(l)) { flushList(); content.push({ type: 'subheading', text: inline(l.replace(/^###\s+/, '')) }); i++; continue; }

    if (/^>/.test(l)) {                                       // a '>' run: card or blockquote
      flushList();
      const { run, next } = collectQuoteRun(i);
      if (run[0] && run[0].startsWith('[!card]')) pushCard(parseCard(run));
      else content.push({ type: 'blockquote', text: inline(run.join(' ')) });
      i = next; continue;
    }

    const mShort = l.match(/^\*\*In short:\*\*\s*(.*)$/i);
    if (mShort) { flushList(); content.push({ type: 'blockquote', text: `<strong>In short:</strong> ${inline(mShort[1])}` }); i++; continue; }
    const mPre = l.match(/^\*Before you read:\*\s*(.*)$/i);
    if (mPre) { flushList(); content.push({ type: 'paragraph', text: `<em>Before you read:</em> ${inline(mPre[1])}` }); i++; continue; }
    const mRef = l.match(/^\*Reflect:\*\s*(.*)$/i);
    if (mRef) { flushList(); content.push({ type: 'paragraph', text: `<em>Reflect:</em> ${inline(mRef[1])}` }); i++; continue; }

    const mLi = l.match(/^[-*]\s+(.*)$/);
    if (mLi) { (listBuf ||= []).push(inline(mLi[1])); i++; continue; }

    if (l.startsWith('#')) { unparsed.push(l); i++; continue; }
    flushList();
    content.push({ type: 'paragraph', text: inline(l) });
    i++;
  }
  flushList();
  if (content.length) sections.push({ id: secId, heading, content });
}

// ---------- derive remaining meta ----------
if (!meta.description) {
  const firstShort = sections.flatMap(s => s.content).find(b => b.type === 'blockquote' && /In short:/.test(b.text));
  meta.description = firstShort ? firstShort.text.replace(/<[^>]+>/g, '').replace(/^In short:\s*/, '') : meta.subtitle;
}
const words = raw.split(/\s+/).length;
meta.readingTime = `${Math.max(3, Math.round(words / 200))} min`;

const result = { id, meta, sections };

// ---------- output + self-check ----------
const json = JSON.stringify(result, null, 2);
if (out) { writeFileSync(out, json); } else { process.stdout.write(json + '\n'); }

const mdCards = (raw.match(/^>\s*\[!card\]/gm) || []).length;
const mdSections = (raw.match(/^##\s+S\d+\./gm) || []).length;
console.error(`\n[self-check] ${input}`);
console.error(`  cards:    markdown ${mdCards}  ·  json ${cardCount}  ${mdCards === cardCount ? 'OK' : 'MISMATCH'}`);
console.error(`  sections: markdown ${mdSections}  ·  json ${sections.filter(s => /^S\d+$/.test(s.id)).length}  ${mdSections === sections.filter(s => /^S\d+$/.test(s.id)).length ? 'OK' : 'MISMATCH'}`);
console.error(`  UNPARSED: ${unparsed.length}${unparsed.length ? '\n    ' + unparsed.join('\n    ') : ' (clean)'}`);
if (out) console.error(`  wrote ${out}`);

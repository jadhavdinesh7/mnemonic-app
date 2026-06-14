/**
 * Essay Registry — Central registry for all mnemonic medium essays.
 * 
 * Each essay is independently tracked by the scheduler (card IDs are globally unique).
 * Adding a new essay is as simple as importing it and adding to the registry.
 */

import {
    essayMeta as philosophyMeta,
    essaySections as philosophySections,
    getAllCardIds as getPhilosophyCardIds,
    getAllCards as getPhilosophyCards,
} from './philosophy-of-software-design.js';

import { aboutEssay } from './about-mnemonic-medium.js';

// Pipeline-generated essays (authoring/ -> tools/md-to-content.mjs -> JSON).
import posdDeep from './philosophy-of-software-design.json';

// ============================================================
// JSON essay adapter
// ============================================================

/**
 * Wrap a converter-produced JSON essay into the same interface the app uses for
 * hand-written essays. Card scan logic mirrors getAllCards/getAllCardIds in
 * philosophy-of-software-design.js so both kinds of essay behave identically.
 */
export function essayFromJson(json) {
    const cardsWithMeta = () => {
        const out = [];
        for (const section of json.sections) {
            for (const block of section.content) {
                if (block.type === 'cards') {
                    for (const card of block.cards) {
                        out.push({ ...card, sectionId: section.id, sectionHeading: section.heading });
                    }
                }
            }
        }
        return out;
    };
    const getCardIds = () => cardsWithMeta().map(c => c.id);
    return {
        id: json.id,
        meta: { ...json.meta, cardCount: getCardIds().length },
        sections: json.sections,
        getCardIds,
        getCards: cardsWithMeta,
    };
}

// ============================================================
// Essay definitions
// ============================================================

export const essays = [
    essayFromJson(posdDeep),
    {
        id: 'philosophy-software-design',
        meta: philosophyMeta,
        sections: philosophySections,
        getCardIds: getPhilosophyCardIds,
        getCards: getPhilosophyCards,
    },
];

/**
 * Get an essay by its ID.
 */
export function getEssay(id) {
    return essays.find(e => e.id === id) || null;
}

/**
 * Get all card IDs across ALL essays (for global review sessions).
 */
export function getAllGlobalCardIds() {
    const ids = [];
    for (const essay of essays) {
        ids.push(...essay.getCardIds());
    }
    return ids;
}

/**
 * Get all cards across ALL essays with essay metadata attached.
 */
export function getAllGlobalCards() {
    const cards = [];
    for (const essay of essays) {
        const essayCards = essay.getCards().map(card => ({
            ...card,
            essayId: essay.id,
            essayTitle: essay.meta.title,
        }));
        cards.push(...essayCards);
    }
    return cards;
}

export { aboutEssay };

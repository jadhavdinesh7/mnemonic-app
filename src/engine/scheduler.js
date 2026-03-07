/**
 * Spaced Repetition Scheduler — adapted from Orbit's spacedRepetitionScheduler.ts
 * Source: https://github.com/andymatuschak/orbit/blob/main/packages/core/src/schedulers/spacedRepetitionScheduler.ts
 * 
 * Orbit's core scheduling algorithm:
 * - Growth factor of 2.3x per successful review
 * - Initial review interval of 5 days  
 * - On forgetting: interval shrinks by dividing by growth factor
 * - Jitter added so cards don't always appear in the same order
 * - 16-hour fuzzy lookahead for "due soon" cards
 */

// --- Orbit-derived constants ---
const INTERVAL_GROWTH_FACTOR = 2.3;
const INITIAL_REVIEW_INTERVAL_MS = 1000 * 60 * 60 * 24 * 5; // 5 days
const FORGOTTEN_RETRY_DELAY_MS = 1000 * 60 * 10; // 10 minutes
const FUZZY_DUE_LOOKAHEAD_MS = 1000 * 60 * 60 * 16; // 16 hours
const MAX_REVIEW_QUEUE_SIZE = 50;

// --- Review outcomes (from Orbit's event.ts) ---
export const ReviewOutcome = Object.freeze({
  Remembered: 'remembered',
  Forgotten: 'forgotten',
  Skipped: 'skipped',
});

// --- Human-readable level descriptions ---
const LEVEL_LABELS = [
  'in-text',     // level 0: just seen while reading
  '5 days',      // level 1: first review
  '~2 weeks',    // level 2
  '~1 month',    // level 3
  '~3 months',   // level 4
  '~6 months',   // level 5
  'long-term',   // level 6+
];

/**
 * Get a human-readable label for a given interval in milliseconds.
 */
export function getLevelLabel(intervalMs) {
  if (intervalMs <= 0) return LEVEL_LABELS[0];
  const days = intervalMs / (1000 * 60 * 60 * 24);
  if (days < 3) return LEVEL_LABELS[0];
  if (days < 10) return LEVEL_LABELS[1];
  if (days < 21) return LEVEL_LABELS[2];
  if (days < 60) return LEVEL_LABELS[3];
  if (days < 150) return LEVEL_LABELS[4];
  if (days < 270) return LEVEL_LABELS[5];
  return LEVEL_LABELS[6];
}

/**
 * Get the level index (0-6) from an interval.
 */
export function getLevelIndex(intervalMs) {
  if (intervalMs <= 0) return 0;
  const days = intervalMs / (1000 * 60 * 60 * 24);
  if (days < 3) return 0;
  if (days < 10) return 1;
  if (days < 21) return 2;
  if (days < 60) return 3;
  if (days < 150) return 4;
  if (days < 270) return 5;
  return 6;
}

export const TOTAL_LEVELS = LEVEL_LABELS.length;

/**
 * Compute the next interval after a review — the heart of Orbit's scheduler.
 * Directly adapted from Orbit's createSpacedRepetitionScheduler.
 * 
 * @param {Object} componentState - { createdAtTimestampMillis, lastRepetitionTimestampMillis, intervalMillis }
 * @param {number} timestampMillis - current time
 * @param {string} outcome - 'remembered', 'forgotten', or 'skipped'
 * @returns {{ dueTimestampMillis: number, intervalMillis: number }}
 */
export function computeNextSchedule(componentState, timestampMillis, outcome) {
  const currentReviewInterval = Math.max(
    0,
    timestampMillis - (componentState.lastRepetitionTimestampMillis ?? componentState.createdAtTimestampMillis),
  );

  let newIntervalMillis;

  if (outcome === ReviewOutcome.Remembered || outcome === ReviewOutcome.Skipped) {
    if (currentReviewInterval < componentState.intervalMillis) {
      // Retrying or practicing early — don't shrink, but allow natural growth
      newIntervalMillis = Math.max(
        componentState.intervalMillis,
        INITIAL_REVIEW_INTERVAL_MS,
        Math.floor(currentReviewInterval * INTERVAL_GROWTH_FACTOR),
      );
    } else {
      newIntervalMillis = Math.max(
        INITIAL_REVIEW_INTERVAL_MS,
        Math.floor(currentReviewInterval * INTERVAL_GROWTH_FACTOR),
      );
    }
  } else {
    // Forgotten
    if (componentState.intervalMillis < INITIAL_REVIEW_INTERVAL_MS) {
      newIntervalMillis = componentState.intervalMillis;
    } else {
      newIntervalMillis = Math.max(
        INITIAL_REVIEW_INTERVAL_MS,
        Math.floor(componentState.intervalMillis / INTERVAL_GROWTH_FACTOR),
      );
    }
  }

  // Add jitter so cards don't always appear in the same order (Orbit pattern)
  const jitter = (timestampMillis % 1000) * (60 * 10);
  const newDueTimestampMillis = timestampMillis + jitter + (
    outcome === ReviewOutcome.Forgotten
      ? FORGOTTEN_RETRY_DELAY_MS
      : newIntervalMillis
  );

  return {
    dueTimestampMillis: newDueTimestampMillis,
    intervalMillis: newIntervalMillis,
  };
}

// ============================================================
// Local Storage Persistence Layer
// ============================================================

const STORAGE_KEY = 'mnemonic_card_states';

function loadAllCardStates() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAllCardStates(states) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
}

/**
 * Get the state of a specific card. Returns null if never reviewed.
 */
export function getCardState(cardId) {
  const all = loadAllCardStates();
  return all[cardId] || null;
}

/**
 * Initialize a card's state when first encountered during reading.
 */
export function initCardState(cardId) {
  const all = loadAllCardStates();
  if (!all[cardId]) {
    const now = Date.now();
    all[cardId] = {
      createdAtTimestampMillis: now,
      lastRepetitionTimestampMillis: null,
      intervalMillis: 0,
      dueTimestampMillis: now, // due immediately (in-text)
      reviewCount: 0,
    };
    saveAllCardStates(all);
  }
  return all[cardId];
}

/**
 * Record a review event for a card — uses Orbit's scheduling algorithm.
 */
export function recordReview(cardId, outcome) {
  const all = loadAllCardStates();
  const now = Date.now();

  if (!all[cardId]) {
    all[cardId] = {
      createdAtTimestampMillis: now,
      lastRepetitionTimestampMillis: null,
      intervalMillis: 0,
      dueTimestampMillis: now,
      reviewCount: 0,
    };
  }

  const state = all[cardId];
  const { dueTimestampMillis, intervalMillis } = computeNextSchedule(state, now, outcome);

  state.lastRepetitionTimestampMillis = now;
  state.dueTimestampMillis = dueTimestampMillis;
  state.intervalMillis = intervalMillis;
  state.reviewCount = (state.reviewCount || 0) + 1;

  all[cardId] = state;
  saveAllCardStates(all);

  return state;
}

/**
 * Get all cards that are due for review now — adapted from Orbit's reviewQueue.ts
 * Uses the 16-hour fuzzy lookahead from Orbit.
 */
export function getDueCards(allCardIds) {
  const all = loadAllCardStates();
  const threshold = Date.now() + FUZZY_DUE_LOOKAHEAD_MS;

  const dueCards = allCardIds
    .filter(id => {
      const state = all[id];
      // Card is due if: it exists in state, has been seen at least once (reviewCount > 0),
      // and its due time is within the fuzzy threshold
      return state && state.reviewCount > 0 && state.dueTimestampMillis <= threshold;
    })
    .map(id => ({ id, state: all[id] }))
    .sort((a, b) => a.state.dueTimestampMillis - b.state.dueTimestampMillis)
    .slice(0, MAX_REVIEW_QUEUE_SIZE);

  return dueCards;
}

/**
 * Get stats across all cards for a given essay.
 */
export function getEssayStats(cardIds) {
  const all = loadAllCardStates();
  let totalCards = cardIds.length;
  let reviewed = 0;
  let mastered = 0; // level 4+
  let dueNow = 0;

  const now = Date.now();

  for (const id of cardIds) {
    const state = all[id];
    if (!state) continue;
    if (state.reviewCount > 0) reviewed++;
    if (getLevelIndex(state.intervalMillis) >= 4) mastered++;
    if (state.dueTimestampMillis <= now + FUZZY_DUE_LOOKAHEAD_MS && state.reviewCount > 0) dueNow++;
  }

  return { totalCards, reviewed, mastered, dueNow };
}

/**
 * Reset progress for a specific essay's cards.
 * Removes all card states for the given IDs — they'll be re-initialized on next read.
 */
export function resetEssayProgress(cardIds) {
  const all = loadAllCardStates();
  for (const id of cardIds) {
    delete all[id];
  }
  saveAllCardStates(all);
}

/**
 * Reset ALL progress across all essays.
 */
export function resetAllProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

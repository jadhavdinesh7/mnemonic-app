/**
 * Mnemonic Medium — Main Application
 * 
 * Hash-based routing:
 *   #/              → Landing page (essay list)
 *   #/essay/:id     → Essay reader
 *   #/review        → Global review session (all due cards)
 *   #/review/:id    → Essay-specific review session
 *   #/about         → About the mnemonic medium
 */

import './style.css';
import { essays, getEssay, getAllGlobalCardIds, getAllGlobalCards, aboutEssay } from './content/registry.js';
import {
  initCardState,
  markCardSeen,
  recordReview,
  getCardState,
  getLevelLabel,
  getLevelIndex,
  TOTAL_LEVELS,
  getDueCards,
  getEssayStats,
  resetEssayProgress,
  resetAllProgress,
  exportProgress,
  importProgress,
  ReviewOutcome,
} from './engine/scheduler.js';

const app = document.getElementById('app');

// Human-friendly "when is my next review" label, e.g. "in 5 days".
function formatRelativeDays(ts) {
  if (!ts) return null;
  const days = Math.round((ts - Date.now()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'soon';
  if (days === 1) return 'tomorrow';
  if (days < 14) return `in ${days} days`;
  if (days < 60) return `in ${Math.round(days / 7)} weeks`;
  return `in ${Math.round(days / 30)} months`;
}

// ============================================================
// Router
// ============================================================

function getRoute() {
  const hash = window.location.hash || '#/';
  return hash;
}

function parseRoute(hash) {
  // #/essay/philosophy-software-design → { page: 'essay', id: 'philosophy-software-design' }
  const parts = hash.replace('#/', '').split('/').filter(Boolean);
  return {
    page: parts[0] || 'home',
    id: parts[1] || null,
  };
}

function navigate(route) {
  window.location.hash = route;
}

function handleRoute() {
  const hash = getRoute();
  const { page, id } = parseRoute(hash);
  app.innerHTML = '';
  window.scrollTo(0, 0);

  switch (page) {
    case 'essay':
      renderEssayPage(id || essays[0]?.id);
      break;
    case 'review':
      renderReviewSession(id);
      break;
    case 'about':
      renderAboutPage();
      break;
    default:
      renderLandingPage();
  }
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);

// ============================================================
// Landing Page
// ============================================================

function renderLandingPage() {
  const globalCardIds = getAllGlobalCardIds();
  const globalStats = getEssayStats(globalCardIds);

  app.innerHTML = `
    <div class="landing animate-fade-in">
      <div class="landing-hero">
        <div class="landing-hero-badge">✦  The Mnemonic Medium</div>
        <h1 class="landing-hero-title">Read it once.<br>Remember it forever.</h1>
        <p class="landing-hero-subtitle">
          An interactive reading experience that embeds spaced-repetition review into the text itself — so remembering what you read becomes a choice, not chance.
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <a href="#/essay/${essays[0]?.id}" class="btn btn-primary">Start Reading →</a>
          <a href="#/about" class="btn btn-secondary">How does this work?</a>
        </div>
      </div>

      <div class="landing-essays">
        <div class="landing-section-title">Essays</div>

        ${essays.map((essay, i) => {
    const stats = getEssayStats(essay.getCardIds());
    return `
            <a href="#/essay/${essay.id}" class="essay-card">
              <div class="essay-card-number">${String(i + 1).padStart(2, '0')}</div>
              <div class="essay-card-content">
                <div class="essay-card-title">${essay.meta.title}</div>
                <div class="essay-card-description">${essay.meta.description}</div>
                <div class="essay-card-meta">
                  <span>📖 ${essay.meta.readingTime} read</span>
                  <span>🧠 ${essay.meta.cardCount} review cards</span>
                  ${stats.reviewed > 0 ? `<span>✅ ${stats.reviewed}/${stats.totalCards} reviewed</span>` : ''}
                  ${stats.dueNow > 0 ? `<span style="color: var(--color-primary); font-weight: 600;">🔔 ${stats.dueNow} due</span>` : ''}
                  ${stats.dueNow === 0 && stats.nextDueTimestampMillis ? `<span>🗓️ next review ${formatRelativeDays(stats.nextDueTimestampMillis)}</span>` : ''}
                </div>
              </div>
              <div class="essay-card-arrow">→</div>
            </a>
          `;
  }).join('')}

        <a href="#/about" class="essay-card">
          <div class="essay-card-number">✦</div>
          <div class="essay-card-content">
            <div class="essay-card-title">${aboutEssay.title}</div>
            <div class="essay-card-description">${aboutEssay.subtitle}</div>
            <div class="essay-card-meta">
              <span>📖 8 min read</span>
              <span>🔬 The science, simplified</span>
            </div>
          </div>
          <div class="essay-card-arrow">→</div>
        </a>

        ${globalStats.dueNow > 0 ? `
          <div style="margin-top: var(--space-2xl);">
            <div class="landing-section-title">Review</div>
            <a href="#/review" class="essay-card" style="border-color: var(--color-primary-glow); background: linear-gradient(135deg, #faf8ff, #f0eeff);">
              <div class="essay-card-number" style="opacity: 0.6;">🧠</div>
              <div class="essay-card-content">
                <div class="essay-card-title">Review Session</div>
                <div class="essay-card-description">${globalStats.dueNow} cards are due for review across all essays. A few minutes now will strengthen your memory for weeks.</div>
              </div>
              <div class="essay-card-arrow">→</div>
            </a>
          </div>
        ` : ''}

        <div style="margin-top: var(--space-2xl); padding-top: var(--space-lg); border-top: 1px solid rgba(0,0,0,0.08);">
          <div class="landing-section-title">Backup &amp; settings</div>
          <p style="font-family: var(--font-sans); font-size: var(--font-size-xs); color: var(--color-text-muted); margin: var(--space-xs) 0 var(--space-md); max-width: 480px;">
            Your review progress is saved only in this browser. Export a backup file to keep it safe — or to move it to another device. Importing merges a backup back in.
          </p>
          <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: var(--space-md);">
            <button class="btn btn-secondary" id="export-btn" style="font-size: var(--font-size-xs);">⬇ Export progress</button>
            <label class="btn btn-secondary" style="font-size: var(--font-size-xs); cursor: pointer;">
              ⬆ Import progress
              <input type="file" id="import-input" accept="application/json,.json" style="display: none;" />
            </label>
            ${globalStats.reviewed > 0 ? `<button class="btn btn-secondary" id="reset-all-btn" style="font-size: var(--font-size-xs); color: var(--color-forgot);">↻ Reset all progress</button>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;

  // Reset all handler
  const resetAllBtn = document.getElementById('reset-all-btn');
  if (resetAllBtn) {
    resetAllBtn.addEventListener('click', () => {
      if (confirm('Reset all progress across every essay? This cannot be undone. Your spaced-repetition schedules will start fresh.')) {
        resetAllProgress();
        handleRoute(); // re-render
      }
    });
  }

  // Export progress → download a JSON backup file
  const exportBtn = document.getElementById('export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const blob = new Blob([exportProgress()], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mnemonic-progress-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }

  // Import progress ← read a JSON backup file and merge it in
  const importInput = document.getElementById('import-input');
  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const result = importProgress(String(reader.result), 'merge');
          alert(`Imported progress for ${result.imported} cards.`);
          handleRoute(); // re-render with restored progress
        } catch (err) {
          alert(`Could not import this file: ${err.message}`);
        }
      };
      reader.readAsText(file);
    });
  }
}

// ============================================================
// Essay Reader Page
// ============================================================

function renderEssayPage(essayId) {
  const essay = getEssay(essayId);
  if (!essay) {
    app.innerHTML = `
      <div class="about-page animate-fade-in">
        <a href="#/" class="about-back-link">← Back to essays</a>
        <h1 class="essay-title">Essay not found</h1>
        <p class="essay-paragraph">The essay "${essayId}" doesn't exist.</p>
      </div>
    `;
    return;
  }

  const allCardIds = essay.getCardIds();
  // Initialize all card states
  allCardIds.forEach(id => initCardState(id));

  app.innerHTML = `
    <div class="app-layout">
      <div class="main-content">
        <div class="essay-container animate-fade-in">
          ${renderEssayHeader(essay)}
          ${essay.sections.map(section => renderSection(section)).join('')}
          ${renderEssayFooter(essay)}
        </div>
      </div>
      ${renderSidebar(essay)}
      <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle sidebar">☰</button>
      <div class="sidebar-overlay" id="sidebar-overlay"></div>
    </div>
  `;

  setupSidebarToggle();
  setupScrollTracking();
  setupCardInteractions(essay);
}

function renderEssayHeader(essay) {
  return `
    <header class="essay-header">
      <a href="#/" class="about-back-link">← Back to essays</a>
      <div class="essay-chapter-label">A Mnemonic Medium Essay</div>
      <h1 class="essay-title">${essay.meta.title}</h1>
      <p class="essay-author">
        ${essay.meta.subtitle}<br>
        <span style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin-top: 4px; display: inline-block;">
          Presented in a <a href="#/about">mnemonic medium</a> which makes it almost effortless to remember what you read
        </span>
      </p>
    </header>
  `;
}

function renderEssayFooter(essay) {
  const stats = getEssayStats(essay.getCardIds());
  return `
    <div style="margin-top: var(--space-4xl); padding-top: var(--space-2xl); border-top: 1px solid rgba(0,0,0,0.08); text-align: center;">
      <h2 style="font-family: var(--font-serif); font-size: var(--font-size-xl); margin-bottom: var(--space-md);">You've read the essay</h2>
      <p style="font-family: var(--font-sans); font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-xl); max-width: 480px; margin-left: auto; margin-right: auto;">
        You've encountered ${essay.meta.cardCount} review cards. The spaced-repetition schedule will begin tracking them.
        Come back for review sessions to lock these ideas into long-term memory.
      </p>
      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        ${stats.dueNow > 0 ? `<a href="#/review/${essay.id}" class="btn btn-primary">Review ${stats.dueNow} due cards</a>` : ''}
        <a href="#/" class="btn btn-secondary">← Back to home</a>
        <button class="btn btn-secondary" id="reset-essay-btn" style="font-size: var(--font-size-xs); color: var(--color-forgot);">
          ↻ Reset progress for this essay
        </button>
      </div>
    </div>
  `;
}

function renderSection(section) {
  return `
    <section class="essay-section" id="section-${section.id}">
      <h2 class="essay-section-heading">${section.heading}</h2>
      ${section.content.map(block => renderContentBlock(block)).join('')}
    </section>
  `;
}

function renderContentBlock(block) {
  switch (block.type) {
    case 'paragraph':
      return `<p class="essay-paragraph">${block.text}</p>`;

    case 'heading':
      return `<h2 class="essay-section-heading">${block.text}</h2>`;

    case 'subheading':
      return `<h3 class="essay-subsection-heading">${block.text}</h3>`;

    case 'blockquote':
      return `<blockquote class="essay-blockquote">${block.text}</blockquote>`;

    case 'list':
      return `<ul class="essay-list">${block.items.map(item => `<li>${item}</li>`).join('')}</ul>`;

    case 'red-flag':
      return `
        <div class="red-flag">
          <div class="red-flag-label">🚩 ${block.label}</div>
          <div class="red-flag-text">${block.text}</div>
        </div>
      `;

    case 'code':
      return block.html; // pre-escaped <pre class="card-code"> from the converter

    // The AI fallback converter (meta-prompts/CONVERT.md) emits these three
    // instead of the shapes md-to-content.mjs produces. Without them the
    // section summaries, reflection prompts and prerequisite primers were
    // silently dropped by the default case below.
    case 'inshort':
      return `<blockquote class="essay-blockquote"><strong>In short:</strong> ${block.text}</blockquote>`;

    case 'salience':
      return `<p class="essay-paragraph"><em>Reflect:</em> ${block.text}</p>`;

    case 'bridge':
      return `
        <div class="bridge-block">
          <div class="bridge-label">🌉 Background — not from the book${block.title ? `: ${block.title}` : ''}</div>
          <div class="bridge-text">${block.text}</div>
        </div>
      `;

    case 'cards':
      return renderCardSet(block.cards);

    default:
      return '';
  }
}

function renderCardSet(cards) {
  return `
    <div class="review-card-set">
      <div class="review-card-header">
        <div class="review-card-header-label">
          <span style="font-size: 1.1em;">🧠</span> Review Cards
        </div>
        <div class="review-card-counter">${cards.length} question${cards.length > 1 ? 's' : ''}</div>
      </div>
      ${cards.map((card, i) => renderCard(card, i, cards.length)).join('')}
    </div>
  `;
}

function renderCard(card, index, total) {
  const state = getCardState(card.id);
  const levelLabel = state ? getLevelLabel(state.intervalMillis) : 'in-text';
  const levelIdx = state ? getLevelIndex(state.intervalMillis) : 0;
  const isReviewed = state && state.reviewCount > 0;

  return `
    <div class="review-card ${isReviewed ? 'reviewed' : ''}" data-card-id="${card.id}">
      <div class="review-card-question">${card.question}</div>
      <div class="review-card-answer-area" data-card-id="${card.id}">
        <div class="review-card-answer-hidden" data-action="reveal">
          Click anywhere to reveal answer
        </div>
      </div>
      <div class="review-card-answer-content" style="display: none;" data-card-id="${card.id}">
        <div class="review-card-answer-text review-card-answer-revealed">${card.answer}</div>
        <div class="review-card-feedback">
          <button class="btn-feedback btn-forgot" data-card-id="${card.id}" data-outcome="forgotten">
            <span class="icon">↻</span> Didn't remember
          </button>
          <button class="btn-feedback btn-remembered" data-card-id="${card.id}" data-outcome="remembered">
            <span class="icon">✓</span> Remembered
          </button>
        </div>
      </div>
      <div class="review-card-level">
        ${renderLevelDots(levelIdx)}
        <span style="margin-left: 4px;">${levelLabel}</span>
      </div>
    </div>
  `;
}

function renderLevelDots(level) {
  let dots = '';
  for (let i = 0; i < TOTAL_LEVELS; i++) {
    dots += `<span class="dot ${i <= level ? 'filled' : 'empty'}"></span>`;
  }
  return dots;
}

// ============================================================
// Sidebar
// ============================================================

function renderSidebar(essay) {
  const stats = getEssayStats(essay.getCardIds());

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <div class="sidebar-brand-icon">M</div>
        <div class="sidebar-brand-text">Mnemonic</div>
      </div>

      <div class="sidebar-essay-title">${essay.meta.title}</div>

      <ul class="sidebar-toc">
        ${essay.sections.map(section => `
          <li class="sidebar-toc-item">
            <a href="#section-${section.id}" class="sidebar-toc-link" data-section="${section.id}">
              ${section.heading}
            </a>
          </li>
        `).join('')}
      </ul>

      <div class="sidebar-retention">
        <div class="sidebar-retention-title">Memory Schedule</div>
        ${renderRetentionCurve(essay)}
      </div>

      <div class="sidebar-stats">
        <div class="stat-row">
          <span class="stat-label">Cards seen</span>
          <span class="stat-value">${stats.reviewed} / ${stats.totalCards}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Mastered</span>
          <span class="stat-value">${stats.mastered}</span>
        </div>
        ${stats.dueNow > 0 ? `
          <div class="stat-row" style="margin-top: var(--space-md);">
            <a href="#/review/${essay.id}" style="color: var(--color-primary-light); text-decoration: none; font-size: var(--font-size-xs); font-weight: 600;">
              🔔 ${stats.dueNow} cards due for review →
            </a>
          </div>
        ` : ''}
      </div>

      ${essays.length > 1 ? `
        <div style="margin-top: var(--space-xl); padding-top: var(--space-lg); border-top: 1px solid rgba(255,255,255,0.08);">
          <div class="sidebar-retention-title">Other Essays</div>
          ${essays.filter(e => e.id !== essay.id).map(e => `
            <a href="#/essay/${e.id}" class="sidebar-toc-link" style="display: block; margin-bottom: 4px;">
              ${e.meta.title}
            </a>
          `).join('')}
        </div>
      ` : ''}
    </aside>
  `;
}

function renderRetentionCurve(essay) {
  const stats = getEssayStats(essay.getCardIds());
  const points = [
    { x: 20, y: 110, label: 'in-text' },
    { x: 60, y: 95, label: '5 days' },
    { x: 110, y: 72, label: '3 weeks' },
    { x: 160, y: 42, label: '3 months' },
    { x: 220, y: 15, label: 'long-term' },
  ];

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  const cardIds = essay.getCardIds();
  let avgLevel = 0;
  let reviewed = 0;
  for (const id of cardIds) {
    const state = getCardState(id);
    if (state && state.reviewCount > 0) {
      avgLevel += getLevelIndex(state.intervalMillis);
      reviewed++;
    }
  }
  avgLevel = reviewed > 0 ? Math.round(avgLevel / reviewed) : 0;
  const activePoint = points[Math.min(avgLevel, points.length - 1)];

  return `
    <svg class="retention-curve-svg" viewBox="0 0 240 130">
      <line x1="20" y1="110" x2="220" y2="110" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
      <line x1="20" y1="72" x2="220" y2="72" stroke="rgba(255,255,255,0.04)" stroke-width="1" stroke-dasharray="4" />
      <line x1="20" y1="42" x2="220" y2="42" stroke="rgba(255,255,255,0.04)" stroke-width="1" stroke-dasharray="4" />
      <path d="${pathD}" fill="none" stroke="rgba(99, 102, 241, 0.4)" stroke-width="2" stroke-linecap="round" />
      <path d="${pathD} L 220 110 L 20 110 Z" fill="rgba(99, 102, 241, 0.06)" />
      ${points.map((p, i) => `
        <circle cx="${p.x}" cy="${p.y}" r="${i === avgLevel ? 6 : 3.5}" 
          class="retention-dot ${i === avgLevel ? 'active' : ''}"
          fill="${i <= avgLevel ? '#818cf8' : 'rgba(255,255,255,0.15)'}" />
      `).join('')}
      ${points.map(p => `
        <text x="${p.x}" y="126" class="retention-label" text-anchor="middle">${p.label}</text>
      `).join('')}
      ${reviewed > 0 ? `
        <text x="${activePoint.x}" y="${activePoint.y - 12}" class="retention-label" text-anchor="middle" fill="#f59e0b" font-weight="600" font-size="8">
          ${stats.reviewed} cards
        </text>
      ` : `
        <text x="120" y="70" class="retention-label" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="10">
          Start reading to begin
        </text>
      `}
    </svg>
  `;
}

// ============================================================
// Review Session Page
// ============================================================

function renderReviewSession(essayId) {
  // Determine which cards to review
  let cardIds, cards, contextTitle;

  if (essayId) {
    const essay = getEssay(essayId);
    if (!essay) { navigate('#/'); return; }
    cardIds = essay.getCardIds();
    cards = essay.getCards().map(c => ({ ...c, essayId: essay.id, essayTitle: essay.meta.title }));
    contextTitle = essay.meta.title;
  } else {
    cardIds = getAllGlobalCardIds();
    cards = getAllGlobalCards();
    contextTitle = 'All Essays';
  }

  const dueCardEntries = getDueCards(cardIds);

  if (dueCardEntries.length === 0) {
    app.innerHTML = `
      <div class="review-session animate-fade-in">
        <div class="review-complete">
          <div class="review-complete-icon">🎉</div>
          <h1 class="review-complete-title">All caught up!</h1>
          <p class="review-complete-stats">No cards are due right now. Come back later to review.</p>
          <a href="#/" class="btn btn-primary">← Back to home</a>
        </div>
      </div>
    `;
    return;
  }

  const reviewCards = dueCardEntries
    .map(dc => cards.find(c => c.id === dc.id))
    .filter(Boolean);

  let currentIndex = 0;
  let results = { remembered: 0, forgotten: 0 };
  // Faithful to Quantum Country: a forgotten card returns later in the SAME
  // session and must be remembered before the session is done. We cap how many
  // times one card can cycle so a persistently hard card can't trap the reader.
  const uniqueTotal = reviewCards.length;
  const MAX_RESHOWS = 2;
  const reshowCounts = {};
  const learned = new Set(); // card ids answered "remembered" this session

  function renderCurrentCard() {
    if (currentIndex >= reviewCards.length) {
      renderReviewComplete(results, uniqueTotal, essayId);
      return;
    }

    const card = reviewCards[currentIndex];
    // Variant rotation: show a different phrasing of the same card on each review
    // so you recall the idea, not the shape of the card. The answer you're graded
    // against is always the canonical one.
    const phrasings = [card.question, ...(card.variants || [])].filter(Boolean);
    const cardState = getCardState(card.id);
    const phraseIdx = phrasings.length > 1 ? ((cardState?.reviewCount || 0) % phrasings.length) : 0;
    const shownQuestion = phrasings[phraseIdx];
    const isReworded = phraseIdx > 0;
    const progress = (learned.size / uniqueTotal) * 100;
    const sourceLabel = card.essayTitle ? `from "${card.sectionHeading}" • ${card.essayTitle}` : `from "${card.sectionHeading}"`;

    const wrapper = document.querySelector('.review-session-card-wrapper');
    const progressFill = document.querySelector('.review-session-progress-fill');
    const subtitle = document.querySelector('.review-session-subtitle');

    if (progressFill) progressFill.style.width = `${progress}%`;
    if (subtitle) subtitle.textContent = `${learned.size} of ${uniqueTotal} learned • ${sourceLabel}`;

    if (wrapper) {
      wrapper.innerHTML = `
        <div class="review-card animate-fade-in" data-card-id="${card.id}">
          <div class="review-card-question">${shownQuestion}${isReworded ? ' <span style="font-size:0.55em;opacity:0.45;text-transform:uppercase;letter-spacing:0.06em;vertical-align:middle;">reworded</span>' : ''}</div>
          <div class="review-card-answer-area review-session-answer" data-card-id="${card.id}">
            <div class="review-card-answer-hidden" data-action="reveal">
              Click anywhere to reveal answer
            </div>
          </div>
          <div class="review-card-answer-content" style="display: none;" data-card-id="${card.id}">
            <div class="review-card-answer-text review-card-answer-revealed">${card.answer}</div>
            <div class="review-card-feedback">
              <button class="btn-feedback btn-forgot review-btn" data-outcome="forgotten">
                <span class="icon">↻</span> Didn't remember
              </button>
              <button class="btn-feedback btn-remembered review-btn" data-outcome="remembered">
                <span class="icon">✓</span> Remembered
              </button>
            </div>
          </div>
        </div>
      `;

      const answerArea = wrapper.querySelector('.review-session-answer');
      const answerContent = wrapper.querySelector('.review-card-answer-content');

      if (answerArea) {
        answerArea.addEventListener('click', () => {
          answerArea.style.display = 'none';
          answerContent.style.display = 'block';
        });
      }

      const buttons = wrapper.querySelectorAll('.review-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const outcome = btn.dataset.outcome;
          recordReview(card.id, outcome);
          if (outcome === ReviewOutcome.Remembered) {
            results.remembered++;
            learned.add(card.id);
          } else {
            results.forgotten++;
            learned.delete(card.id);
            // Re-queue the forgotten card to reappear later this session.
            const shown = reshowCounts[card.id] || 0;
            if (shown < MAX_RESHOWS) {
              reshowCounts[card.id] = shown + 1;
              reviewCards.push(card);
            }
          }
          currentIndex++;
          renderCurrentCard();
        });
      });
    }
  }

  app.innerHTML = `
    <div class="review-session animate-fade-in">
      <div class="review-session-header">
        <a href="#/" class="about-back-link" style="justify-content: center; margin-bottom: var(--space-lg);">← Back to home</a>
        <h1 class="review-session-title">Review Session</h1>
        <p class="review-session-subtitle">Card 1 of ${reviewCards.length}</p>
      </div>
      <div class="review-session-progress">
        <div class="review-session-progress-fill" style="width: 0%"></div>
      </div>
      <div class="review-session-card-wrapper"></div>
    </div>
  `;

  renderCurrentCard();
}

function renderReviewComplete(results, total, essayId) {
  app.innerHTML = `
    <div class="review-session animate-fade-in">
      <div class="review-complete">
        <div class="review-complete-icon">✨</div>
        <h1 class="review-complete-title">Review Complete!</h1>
        <p class="review-complete-stats">
          You reviewed ${total} cards.<br>
          <span style="color: var(--color-remembered);">✓ ${results.remembered} remembered</span>
          ${results.forgotten > 0 ? `<span style="margin-left: 12px; color: var(--color-forgot);">↻ ${results.forgotten} need more practice</span>` : ''}
        </p>
        <p style="font-family: var(--font-sans); font-size: var(--font-size-xs); color: var(--color-text-muted); margin-bottom: var(--space-xl); max-width: 400px;">
          Cards you remembered have been promoted to the next level of the spaced-repetition schedule. 
          They'll come back for review at longer intervals, strengthening your long-term memory.
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          ${essayId ? `<a href="#/essay/${essayId}" class="btn btn-primary">Continue reading</a>` : ''}
          <a href="#/" class="btn btn-secondary">← Home</a>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// About Page
// ============================================================

function renderAboutPage() {
  app.innerHTML = `
    <div class="about-page animate-fade-in">
      <a href="#/" class="about-back-link">← Back to essays</a>
      <header class="essay-header">
        <div class="essay-chapter-label">Understanding the Medium</div>
        <h1 class="essay-title">${aboutEssay.title}</h1>
        <p class="essay-author">${aboutEssay.subtitle}</p>
      </header>
      ${aboutEssay.content.map(block => renderContentBlock(block)).join('')}
      <div style="margin-top: var(--space-3xl); padding-top: var(--space-xl); border-top: 1px solid rgba(0,0,0,0.08); text-align: center;">
        <a href="#/essay/${essays[0]?.id}" class="btn btn-primary">Start reading the essay →</a>
      </div>
    </div>
  `;
}

// ============================================================
// Interactions
// ============================================================

function setupCardInteractions(essay) {
  // Reveal answers
  document.addEventListener('click', function cardHandler(e) {
    const revealBtn = e.target.closest('[data-action="reveal"]');
    if (revealBtn) {
      const answerArea = revealBtn.closest('.review-card-answer-area');
      const cardEl = revealBtn.closest('.review-card');
      const answerContent = cardEl.querySelector('.review-card-answer-content');
      if (answerArea && answerContent) {
        answerArea.style.display = 'none';
        answerContent.style.display = 'block';
      }
      // Encountering a card in-text puts it on the schedule, even if the reader
      // doesn't tap a grade button — so nothing read is ever lost from review.
      if (cardEl && cardEl.dataset.cardId) {
        markCardSeen(cardEl.dataset.cardId);
      }
    }

    // Feedback buttons
    const feedbackBtn = e.target.closest('.btn-feedback[data-card-id]');
    if (feedbackBtn) {
      const cardId = feedbackBtn.dataset.cardId;
      const outcome = feedbackBtn.dataset.outcome;
      const state = recordReview(cardId, outcome);

      const cardEl = feedbackBtn.closest('.review-card');
      if (cardEl) {
        const levelEl = cardEl.querySelector('.review-card-level');
        if (levelEl) {
          const newLevel = getLevelIndex(state.intervalMillis);
          const newLabel = getLevelLabel(state.intervalMillis);
          levelEl.innerHTML = renderLevelDots(newLevel) + `<span style="margin-left: 4px;">${newLabel}</span>`;
        }

        cardEl.style.transition = 'all 0.3s ease';
        if (outcome === ReviewOutcome.Remembered) {
          cardEl.style.borderLeft = '3px solid var(--color-remembered)';
          setTimeout(() => { cardEl.style.opacity = '0.6'; }, 300);
        } else {
          cardEl.style.borderLeft = '3px solid var(--color-forgot)';
        }

        const buttons = cardEl.querySelectorAll('.btn-feedback');
        buttons.forEach(btn => { btn.disabled = true; btn.style.opacity = '0.4'; });
      }

      updateSidebarStats(essay);
    }

    // Reset essay progress button
    const resetBtn = e.target.closest('#reset-essay-btn');
    if (resetBtn && essay) {
      if (confirm(`Reset all progress for "${essay.meta.title}"? This will clear your spaced-repetition schedules for this essay. You'll start over with all ${essay.meta.cardCount} cards.`)) {
        resetEssayProgress(essay.getCardIds());
        handleRoute(); // re-render
      }
    }
  });
}

function updateSidebarStats(essay) {
  const stats = getEssayStats(essay.getCardIds());
  const statsContainer = document.querySelector('.sidebar-stats');
  if (statsContainer) {
    statsContainer.innerHTML = `
      <div class="stat-row">
        <span class="stat-label">Cards seen</span>
        <span class="stat-value">${stats.reviewed} / ${stats.totalCards}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Mastered</span>
        <span class="stat-value">${stats.mastered}</span>
      </div>
      ${stats.dueNow > 0 ? `
        <div class="stat-row" style="margin-top: var(--space-md);">
          <a href="#/review/${essay.id}" style="color: var(--color-primary-light); text-decoration: none; font-size: var(--font-size-xs); font-weight: 600;">
            🔔 ${stats.dueNow} cards due for review →
          </a>
        </div>
      ` : ''}
    `;
  }

  const retentionContainer = document.querySelector('.sidebar-retention');
  if (retentionContainer) {
    retentionContainer.innerHTML = `
      <div class="sidebar-retention-title">Memory Schedule</div>
      ${renderRetentionCurve(essay)}
    `;
  }
}

function setupSidebarToggle() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }
}

function setupScrollTracking() {
  const sections = document.querySelectorAll('.essay-section');
  const links = document.querySelectorAll('.sidebar-toc-link');

  function updateActiveLink() {
    let currentId = '';
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      if (section.offsetTop <= scrollY) {
        currentId = section.id.replace('section-', '');
      }
    });

    links.forEach(link => {
      link.classList.toggle('active', link.dataset.section === currentId);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = document.getElementById(`section-${link.dataset.section}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      document.getElementById('sidebar')?.classList.remove('open');
      document.getElementById('sidebar-overlay')?.classList.remove('active');
    });
  });
}

// Initial render
handleRoute();

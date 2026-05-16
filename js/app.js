/* ===== Diskreetne matemaatika — App ===== */

(function () {
  'use strict';

  const VISITED_KEY = 'dm_visited_v1';
  const ROUTES = Object.keys(window.CONTENT);

  // ---------- Progress tracking ----------
  function getVisited() {
    try { return new Set(JSON.parse(localStorage.getItem(VISITED_KEY)) || []); }
    catch { return new Set(); }
  }
  function markVisited(route) {
    const v = getVisited(); v.add(route);
    localStorage.setItem(VISITED_KEY, JSON.stringify([...v]));
    updateProgress();
  }
  function updateProgress() {
    const v = getVisited();
    const total = ROUTES.length;
    const pct = Math.round((v.size / total) * 100);
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = `${v.size}/${total} läbitud (${pct}%)`;
    document.querySelectorAll('.nav-group a').forEach(a => {
      const r = a.dataset.route;
      a.classList.toggle('done', v.has(r));
    });
  }

  // ---------- Routing ----------
  function getRoute() {
    const hash = location.hash.replace('#', '') || 'avaleht';
    return window.CONTENT[hash] ? hash : 'avaleht';
  }

  function render(route) {
    const view = document.getElementById('view');
    view.innerHTML = window.CONTENT[route];
    // Re-render math
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(view, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true},
          ],
          throwOnError: false,
          errorColor: '#f87171',
        });
      } catch (e) { console.warn('KaTeX error:', e); }
    }

    // Update active nav
    document.querySelectorAll('.nav-group a').forEach(a => {
      a.classList.toggle('active', a.dataset.route === route);
    });

    // Initialise widgets for this route
    if (route === 'truthtable') window.initTruthTable && window.initTruthTable();
    if (route === 'prefikskuju') window.initPrefixWidget && window.initPrefixWidget();
    if (route === 'grapheditor') window.initGraphEditor && window.initGraphEditor();
    if (route === 'kviis') window.initQuiz && window.initQuiz();
    if (route === 'flashcards') window.initFlashcards && window.initFlashcards();
    if (route === 'sonastik') window.initGlossary && window.initGlossary();
    if (route === 'hinnekalkulaator') window.initGradeCalculator && window.initGradeCalculator();
    if (route === 'toesuspuu') window.initTruthTree && window.initTruthTree();
    if (route === 'harjutustoo') window.initExamPractice && window.initExamPractice();
    if (route === 'otsing') window.initStudySearch && window.initStudySearch();
    if (route === 'spikker') window.initCheatSheet && window.initCheatSheet();
    if (route === 'normaalkujud') window.initNormalForms && window.initNormalForms();
    window.initTopicTools && window.initTopicTools(route);

    markVisited(route);
    window.initStreak && window.initStreak();

    // Scroll to top + close sidebar on mobile
    window.scrollTo(0, 0);
    document.getElementById('sidebar').classList.remove('open');
  }

  function navigate() {
    const route = getRoute();
    render(route);
  }

  // ---------- Init ----------
  document.addEventListener('DOMContentLoaded', () => {
    // Hash routing
    window.addEventListener('hashchange', navigate);

    // Mobile menu
    document.getElementById('menuToggle')?.addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('open');
    });

    // Reset progress
    document.getElementById('resetProgress')?.addEventListener('click', () => {
      if (confirm('Lähtesta edenemine? Kõik märkmed kaovad.')) {
        localStorage.removeItem(VISITED_KEY);
        localStorage.removeItem('dm_chapter_notes_v1');
        updateProgress();
      }
    });

    updateProgress();
    window.initStreak && window.initStreak();
    navigate();
  });

  // Expose helpers
  window.DM = { markVisited, updateProgress, render };
})();

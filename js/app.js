/* ===== Diskreetne matemaatika — App ===== */

(function () {
  'use strict';

  const VISITED_KEY = 'dm_visited_v1';
  const TOPIC_CHECK_KEY = 'dm_topic_checks_v1';
  const MOBILE_NAV_QUERY = '(max-width: 900px)';

  function getProgressRoutes() {
    const navRoutes = [...document.querySelectorAll('.nav-group a[data-route]')]
      .map(link => link.dataset.route)
      .filter(route => window.CONTENT[route]);
    return navRoutes.length ? navRoutes : Object.keys(window.CONTENT);
  }

  // ---------- Progress tracking ----------
  function getVisited() {
    try { return new Set(JSON.parse(localStorage.getItem(VISITED_KEY)) || []); }
    catch { return new Set(); }
  }

  function getTopicChecks() {
    try { return JSON.parse(localStorage.getItem(TOPIC_CHECK_KEY)) || {}; }
    catch { return {}; }
  }

  function getMiniCheckRoutes() {
    return Array.isArray(window.DM_MINI_CHECK_ROUTES) ? window.DM_MINI_CHECK_ROUTES : [];
  }

  function isTopicCheckCompleted(result) {
    return Boolean(result?.total)
      && Array.isArray(result.answers)
      && result.answers.length >= result.total
      && result.answers.every(answer => answer !== null && answer !== undefined);
  }

  function isRouteCompleted(route) {
    if (getMiniCheckRoutes().includes(route)) {
      return isTopicCheckCompleted(getTopicChecks()[route]);
    }
    return getVisited().has(route);
  }

  function markVisited(route) {
    const v = getVisited(); v.add(route);
    localStorage.setItem(VISITED_KEY, JSON.stringify([...v]));
    updateProgress();
  }

  function resetAllLocalProgress() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('dm_')) keys.push(key);
    }
    keys.forEach(key => localStorage.removeItem(key));
  }

  function ensureSafeBlankLinks(root = document) {
    root.querySelectorAll('a[target="_blank"]').forEach(link => {
      const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
      rel.add('noopener');
      rel.add('noreferrer');
      link.setAttribute('rel', [...rel].join(' '));
    });
  }

  function wrapScrollableTables(root = document) {
    root.querySelectorAll('table').forEach(table => {
      if (table.closest('.table-scroll, .topic-table-wrap, .grade-table-wrap')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'table-scroll';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  function isMobileNav() {
    return window.matchMedia(MOBILE_NAV_QUERY).matches;
  }

  function setSidebarOpen(open) {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('menuToggle');
    const backdrop = document.getElementById('sidebarBackdrop');
    const main = document.getElementById('main');
    if (!sidebar) return;

    const active = Boolean(open && isMobileNav());
    sidebar.classList.toggle('open', active);
    document.body.classList.toggle('sidebar-open', active);
    if (toggle) toggle.setAttribute('aria-expanded', String(active));
    if (backdrop) backdrop.hidden = !active;

    if (isMobileNav()) {
      sidebar.setAttribute('aria-hidden', String(!active));
      if ('inert' in sidebar) sidebar.inert = !active;
      if (main) {
        main.setAttribute('aria-hidden', String(active));
        if ('inert' in main) main.inert = active;
      }
    } else {
      sidebar.removeAttribute('aria-hidden');
      if ('inert' in sidebar) sidebar.inert = false;
      main?.removeAttribute('aria-hidden');
      if (main && 'inert' in main) main.inert = false;
      if (backdrop) backdrop.hidden = true;
    }
  }

  function closeSidebar({ returnFocus = false } = {}) {
    const wasOpen = document.getElementById('sidebar')?.classList.contains('open');
    setSidebarOpen(false);
    if (returnFocus && wasOpen) document.getElementById('menuToggle')?.focus();
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    setSidebarOpen(!sidebar?.classList.contains('open'));
  }

  function updateProgress() {
    const routes = getProgressRoutes();
    const completed = routes.filter(isRouteCompleted);
    const total = routes.length;
    const pct = Math.round((completed.length / total) * 100);
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = `${completed.length}/${total} tehtud/külastatud (${pct}%)`;
    document.querySelectorAll('.nav-group a').forEach(a => {
      const r = a.dataset.route;
      a.classList.toggle('done', isRouteCompleted(r));
    });
  }

  function initExamVariantsFilter() {
    const buttons = [...document.querySelectorAll('[data-exam-variant-filter]')];
    const sections = [...document.querySelectorAll('[data-exam-variant-section]')];
    if (!buttons.length || !sections.length) return;

    function setFilter(nextFilter) {
      buttons.forEach(button => {
        const active = button.dataset.examVariantFilter === nextFilter;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      sections.forEach(section => {
        const visible = nextFilter === 'all' || section.dataset.examVariantSection === nextFilter;
        section.hidden = !visible;
      });
    }

    buttons.forEach(button => {
      button.addEventListener('click', () => setFilter(button.dataset.examVariantFilter));
    });
    setFilter('all');
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
    if (route === 'kontrolltood') initExamVariantsFilter();
    if (route === 'ulesandegeneraator') window.initProblemGenerator && window.initProblemGenerator();
    if (route === 'oppimine') window.initStudyDashboard && window.initStudyDashboard();
    if (route === 'otsing') window.initStudySearch && window.initStudySearch();
    if (route === 'spikker') window.initCheatSheet && window.initCheatSheet();
    if (route === 'vead') window.initWeaknessJournal && window.initWeaknessJournal();
    if (route === 'normaalkujud') window.initNormalForms && window.initNormalForms();
    window.initTopicTools && window.initTopicTools(route);
    wrapScrollableTables(view);
    ensureSafeBlankLinks(view);

    markVisited(route);
    window.initStreak && window.initStreak();

    // Scroll to top + close sidebar on mobile
    window.scrollTo(0, 0);
    closeSidebar();
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
    document.getElementById('menuToggle')?.addEventListener('click', toggleSidebar);
    document.getElementById('sidebarBackdrop')?.addEventListener('click', () => closeSidebar({ returnFocus: true }));
    document.getElementById('sidebar')?.addEventListener('click', e => {
      if (e.target.closest?.('a')) closeSidebar();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSidebar({ returnFocus: true });
    });
    const mobileNav = window.matchMedia(MOBILE_NAV_QUERY);
    const handleMobileNavChange = () => setSidebarOpen(false);
    if (mobileNav.addEventListener) mobileNav.addEventListener('change', handleMobileNavChange);
    else mobileNav.addListener(handleMobileNavChange);
    setSidebarOpen(false);

    // Reset progress
    document.getElementById('resetProgress')?.addEventListener('click', () => {
      if (confirm('Lähtesta kogu kohalik edenemine? See kustutab selle äpi märkmed, hinde kalkulaatori seisu, kviisitulemused, mõistekaardid, vigade päeviku, õpijada ja ülesannete statistika.')) {
        resetAllLocalProgress();
        updateProgress();
        const streakBox = document.getElementById('streakBox');
        if (streakBox) streakBox.textContent = 'Õpijada: 0 päeva';
      }
    });

    updateProgress();
    window.initStreak && window.initStreak();
    navigate();
  });

  // Expose helpers
  window.DM = { markVisited, updateProgress, render, isRouteCompleted, ensureSafeBlankLinks, wrapScrollableTables };
})();

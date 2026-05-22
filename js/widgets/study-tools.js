/* ===== Search, cheat-sheet and long-term study helpers ===== */

(function () {
  'use strict';

  const STREAK_KEY = 'dm_streak_v1';
  const VISITED_KEY = 'dm_visited_v1';
  const FLASH_SRS_KEY = 'dm_flashcard_srs_v1';
  const GLOSSARY_LEARNED_KEY = 'dm_glossary_learned_v1';
  const CHAPTER_NOTES_KEY = 'dm_chapter_notes_v1';
  const QUIZ_RESULT_KEY = 'dm_quiz_last_v1';
  const WEAKNESS_KEY = 'dm_weakness_log_v1';
  const TOPIC_CHECK_KEY = 'dm_topic_checks_v1';
  const PROBLEM_STATS_KEY = 'dm_problem_generator_stats_v1';

  const STUDY_TOPICS = [
    { route: 'lausearvutus', label: 'Lausearvutus', group: 'Loogika' },
    { route: 'truthtable', label: 'Tõeväärtustabelid', group: 'Loogika' },
    { route: 'normaalkujud', label: 'DNK/KNK', group: 'Loogika' },
    { route: 'toesuspuu', label: 'Tõesuspuu meetod', group: 'Loogika' },
    { route: 'predikaadid', label: 'Predikaadid ja kvantorid', group: 'Loogika' },
    { route: 'signatuur', label: 'Signatuur ja interpretatsioonid', group: 'Loogika' },
    { route: 'samavaarsus', label: 'Samaväärsus', group: 'Loogika' },
    { route: 'prefikskuju', label: 'Prefikskuju', group: 'Loogika' },
    { route: 'aksiomaatika', label: 'Aksiomaatilised teooriad', group: 'Loogika' },
    { route: 'sekvents', label: 'Sekventsiaalne lausearvutus', group: 'Loogika' },
    { route: 'peano', label: 'Peano aritmeetika', group: 'Loogika' },
    { route: 'graafid', label: 'Graafi mõiste', group: 'Graafid' },
    { route: 'grapheditor', label: 'Graafiredaktor', group: 'Graafid' },
    { route: 'tipuastmed', label: 'Tipuastmed', group: 'Graafid' },
    { route: 'ahelad', label: 'Ahelad ja tsüklid', group: 'Graafid' },
    { route: 'sidusus', label: 'Sidusus', group: 'Graafid' },
    { route: 'isomorfism', label: 'Isomorfism', group: 'Graafid' },
    { route: 'eulerhamilton', label: 'Euler ja Hamilton', group: 'Graafid' },
    { route: 'puud', label: 'Puud', group: 'Graafid' },
    { route: 'toespuud', label: 'Toespuud', group: 'Graafid' },
    { route: 'suunatud', label: 'Suunatud graafid', group: 'Graafid' },
    { route: 'luhimtee', label: 'Lühim tee', group: 'Graafid' },
  ];

  const MINI_CHECK_ROUTES = [
    'lausearvutus',
    'toesuspuu',
    'predikaadid',
    'signatuur',
    'samavaarsus',
    'prefikskuju',
    'aksiomaatika',
    'sekvents',
    'peano',
    'graafid',
    'tipuastmed',
    'ahelad',
    'sidusus',
    'isomorfism',
    'eulerhamilton',
    'puud',
    'toespuud',
    'suunatud',
    'luhimtee',
  ];

  const CHEAT_SHEETS = [
    {
      group: 'Matemaatiline loogika',
      title: 'Lausearvutus',
      route: 'lausearvutus',
      items: [
        'Tehted: $\\neg$, $\\&$, $\\lor$, $\\Rightarrow$, $\\Leftrightarrow$; prioriteet samas järjekorras.',
        '$F\\Rightarrow G\\equiv \\neg F\\lor G$; väär ainult juhul $F=1$, $G=0$.',
        'Samaselt tõene: tõene igal väärtustusel. Kehtestatav: tõene vähemalt ühel väärtustusel.',
        '$F_1,\\ldots,F_n\\models G$ parajasti siis, kui $F_1\\&\\cdots\\&F_n\\Rightarrow G$ on tautoloogia.',
      ],
    },
    {
      group: 'Matemaatiline loogika',
      title: 'Tõesuspuu',
      route: 'toesuspuu',
      items: [
        'Kehtestatavus: pane puu juureks $F=1$; avatud haru annab väärtustuse.',
        'Samaselt tõesus: pane juureks $F=0$; kõik harud sulguvad $\\Rightarrow F$ on samaselt tõene.',
        'Järeldumine: pane eeldused väärtusega 1 ja väide väärtusega 0.',
        'Vastuolu harus: sama valem saab samas harus väärtused 1 ja 0.',
      ],
    },
    {
      group: 'Matemaatiline loogika',
      title: 'Predikaadid ja kvantorid',
      route: 'predikaadid',
      items: [
        'Predikaat $P:M^n\\to\\{0,1\\}$. Kvantorid: $\\forall$ ja $\\exists$.',
        '$\\neg\\forall xF\\equiv\\exists x\\neg F$; $\\neg\\exists xF\\equiv\\forall x\\neg F$.',
        'Kvantorite järjekord loeb: $\\forall x\\exists y$ ei tähenda üldiselt sama, mis $\\exists y\\forall x$.',
        'Kontranäite jaoks piisab sageli väikesest 2- või 3-elemendilisest mudelist.',
      ],
    },
    {
      group: 'Matemaatiline loogika',
      title: 'Signatuur ja interpretatsioon',
      route: 'signatuur',
      items: [
        'Signatuur $\\sigma=\\langle C;F;P\\rangle$: konstandid, funktsioonisümbolid, predikaatsümbolid.',
        'Interpretatsioon fikseerib põhihulga ning annab igale sümbolile tähenduse.',
        'Konstant $c$ muutub elemendiks $c^\\alpha$; funktsioonisümbol funktsiooniks; predikaatsümbol predikaadiks.',
        'Valemi mudel on interpretatsioon, kus valem on tõene kõigil vabade muutujate väärtustel.',
      ],
    },
    {
      group: 'Matemaatiline loogika',
      title: 'Samaväärsus ja normaalkujud',
      route: 'samavaarsus',
      items: [
        '$F\\equiv G$ parajasti siis, kui $F\\Leftrightarrow G$ on samaselt tõene.',
        'De Morgan: $\\neg(F\\&G)\\equiv\\neg F\\lor\\neg G$ ja $\\neg(F\\lor G)\\equiv\\neg F\\&\\neg G$.',
        'DNK: lihtkonjunktsioonide disjunktsioon. KNK: lihtdisjunktsioonide konjunktsioon.',
        'Täielik DNK tuleb tõestest tabeliridadest; täielik KNK vääradest tabeliridadest.',
      ],
    },
    {
      group: 'Matemaatiline loogika',
      title: 'Prefikskuju',
      route: 'prefikskuju',
      items: [
        'Prefikskuju: $Q_1x_1\\cdots Q_nx_nM$, kus $M$ on kvantoriteta maatriks.',
        'Sammud: eemalda $\\Rightarrow,\\Leftrightarrow$; vii eitused atomaarsete valemiteni; nimeta muutujad vajadusel ümber; too kvantorid ette.',
        '$\\neg(A\\Rightarrow B)\\equiv A\\&\\neg B$; $A\\Rightarrow B\\equiv\\neg A\\lor B$.',
      ],
    },
    {
      group: 'Matemaatiline loogika',
      title: 'Sekvents ja Peano',
      route: 'sekvents',
      items: [
        'Sekvents: $F_1,\\ldots,F_n\\vdash G$. Valemkuju: $F_1\\&\\cdots\\&F_n\\Rightarrow G$.',
        'Korrektsus: tuletatav $\\Rightarrow$ semantiliselt kehtiv. Täielikkus: semantiliselt kehtiv $\\Rightarrow$ tuletatav.',
        'Peano signatuur: $\\langle0;\\prime,+,\\cdot;=\\rangle$.',
        'Induktsioon: $F(0)\\&\\forall x(F(x)\\Rightarrow F(x\\prime))\\Rightarrow\\forall xF(x)$.',
      ],
    },
    {
      group: 'Graafiteooria',
      title: 'Graafi mõiste ja tipuastmed',
      route: 'graafid',
      items: [
        'Graaf $G=(V,E)$, kus $E$ koosneb $V$ kaheelemendilistest alamhulkadest.',
        'Tipuaste $d(v)$: tipuga intsidentsete servade arv.',
        'Tipuastmete teoreem: $\\sum_{v\\in V}d(v)=2|E|$; paaritu astmega tippe on paarisarv.',
        'Lihtgraafis peab iga aste olema vahemikus $0,\\ldots,n-1$.',
      ],
    },
    {
      group: 'Graafiteooria',
      title: 'Ahelad, sidusus, isomorfism',
      route: 'ahelad',
      items: [
        'Ahel: tippude järjend, kus järjestikused tipud on servaga ühendatud.',
        'Tsükkel: kinnine ahel vähemalt kolme servaga, vahepealsed tipud ei kordu.',
        'Sidus graaf: iga kahe tipu vahel leidub ahel.',
        'Isomorfism säilitab tipuarvu, servaarvu, astmejärjendi, tsüklid ja sidususe.',
      ],
    },
    {
      group: 'Graafiteooria',
      title: 'Euler, Hamilton, puud',
      route: 'eulerhamilton',
      items: [
        'Euleri graaf: sidus ja kõik astmed paarisarvud.',
        'Euleri ahel leidub sidusas graafis, kui paaritu astmega tippe on $0$ või $2$.',
        'Dirac: kui $n\\ge3$ ja iga aste vähemalt $n/2$, siis graaf on Hamiltoni graaf.',
        'Puu: sidus ja tsükliteta; $n$ tipuga puus on $n-1$ serva.',
      ],
    },
    {
      group: 'Graafiteooria',
      title: 'Toespuud ja lühim tee',
      route: 'toespuud',
      items: [
        'Toespuu: sidusa graafi alamgraaf, mis sisaldab kõiki tippe ja on puu.',
        'Kruskal: vali kasvava kaaluga servi, vältides tsükleid.',
        'Prim: kasvata puud ühest tipust, valides odavaima serva puu ja välise tipu vahel.',
        'Dijkstra: mittenegatiivsete kaaludega lühim tee ühest algtipust; Floyd-Warshall: kõik paarid, $O(n^3)$.',
      ],
    },
  ];

  function renderMath(el) {
    if (!window.renderMathInElement || !el) return;
    window.renderMathInElement(el, {
      delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
      throwOnError: false,
    });
  }

  function localDateKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function daysBetween(a, b) {
    const start = new Date(`${a}T00:00:00`);
    const end = new Date(`${b}T00:00:00`);
    return Math.round((end - start) / 86400000);
  }

  window.initStreak = function () {
    const today = localDateKey();
    let data = { streak: 0, last: null, best: 0 };
    try { data = { ...data, ...(JSON.parse(localStorage.getItem(STREAK_KEY)) || {}) }; }
    catch {}

    if (data.last !== today) {
      data.streak = data.last && daysBetween(data.last, today) === 1 ? data.streak + 1 : 1;
      data.last = today;
      data.best = Math.max(data.best || 0, data.streak);
      localStorage.setItem(STREAK_KEY, JSON.stringify(data));
    }

    const box = document.getElementById('streakBox');
    if (box) box.textContent = `Õpijada: ${data.streak} ${data.streak === 1 ? 'päev' : 'päeva'} · rekord ${data.best || data.streak}`;
  };

  function escapeHtml(text) {
    return String(text || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  function readJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  function asSet(value) {
    return new Set(Array.isArray(value) ? value : []);
  }

  function formatDate(value) {
    if (!value) return 'puudub';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'puudub';
    return date.toLocaleString('et-EE', { dateStyle: 'medium', timeStyle: 'short' });
  }

  function topicLabel(route) {
    return STUDY_TOPICS.find(topic => topic.route === route)?.label || route;
  }

  function getMiniCheckRoutes() {
    return Array.isArray(window.DM_MINI_CHECK_ROUTES) && window.DM_MINI_CHECK_ROUTES.length
      ? window.DM_MINI_CHECK_ROUTES
      : MINI_CHECK_ROUTES;
  }

  function hasMiniCheckResult(route, results) {
    const result = results[route];
    return Boolean(result?.total)
      && Array.isArray(result.answers)
      && result.answers.length >= result.total
      && result.answers.every(answer => answer !== null && answer !== undefined);
  }

  function getFlashStats() {
    const cards = window.GLOSSARY || [];
    const schedule = readJson(FLASH_SRS_KEY, {});
    const today = localDateKey();
    const due = cards.filter(card => {
      const state = schedule[card.term];
      return !state || !state.due || state.due <= today;
    }).length;
    const started = cards.filter(card => schedule[card.term]?.reps > 0).length;
    const mature = cards.filter(card => (schedule[card.term]?.interval || 0) >= 7).length;
    return { total: cards.length, due, started, mature };
  }

  function getMiniCheckStats(results = readJson(TOPIC_CHECK_KEY, {})) {
    const routes = getMiniCheckRoutes();
    const completedRoutes = routes.filter(route => hasMiniCheckResult(route, results));
    const totalScore = completedRoutes.reduce((sum, route) => sum + (results[route].score || 0), 0);
    const totalQuestions = completedRoutes.reduce((sum, route) => sum + (results[route].total || 0), 0);
    const nextRoute = routes.find(route => !hasMiniCheckResult(route, results));
    return {
      total: routes.length,
      completed: completedRoutes.length,
      average: totalQuestions ? Math.round(100 * totalScore / totalQuestions) : null,
      nextRoute,
    };
  }

  function normalizeProblemStats(data = {}) {
    return {
      total: Number(data.total) || 0,
      correct: Number(data.correct) || 0,
      wrong: Number(data.wrong) || 0,
      byType: data.byType && typeof data.byType === 'object' ? data.byType : {},
      bySkill: data.bySkill && typeof data.bySkill === 'object' ? data.bySkill : {},
      recent: Array.isArray(data.recent) ? data.recent : [],
      updatedAt: data.updatedAt || null,
    };
  }

  function problemAccuracy(bucket) {
    const attempts = bucket?.attempts ?? bucket?.total ?? 0;
    return attempts ? Math.round(100 * (bucket.correct || 0) / attempts) : null;
  }

  function problemSkillLabel(key) {
    return {
      prefix: 'Prefikskuju',
      havel: 'Havel-Hakimi',
      sequent: 'Sekventsid',
      graph: 'Graafialgoritmid',
      kruskal: 'Kruskal',
      prim: 'Prim',
      dijkstra: 'Dijkstra',
    }[key] || key;
  }

  function getProblemStats() {
    return normalizeProblemStats(readJson(PROBLEM_STATS_KEY, {}));
  }

  function problemFocus(stats) {
    const candidates = Object.entries(stats.bySkill || {})
      .filter(([, bucket]) => bucket.attempts >= 2 && bucket.wrong > 0)
      .map(([key, bucket]) => ({ key, bucket, accuracy: problemAccuracy(bucket) }))
      .sort((a, b) => a.accuracy - b.accuracy || b.bucket.wrong - a.bucket.wrong);
    if (candidates.length) {
      const weak = candidates[0];
      return {
        key: weak.key,
        label: problemSkillLabel(weak.key),
        accuracy: weak.accuracy,
        attempts: weak.bucket.attempts,
        wrong: weak.bucket.wrong,
        title: `Tee 2 ülesannet: ${problemSkillLabel(weak.key)}`,
        meta: `Generaatori täpsus ${weak.accuracy}% (${weak.bucket.correct || 0}/${weak.bucket.attempts})`,
      };
    }
    if (stats.total === 0) {
      return {
        key: 'mixed',
        label: 'Segaring',
        accuracy: null,
        attempts: 0,
        wrong: 0,
        title: 'Tee üks segaring ülesannete generaatoris',
        meta: 'Esimesed vastused aitavad töölaual nõrku kohti leida',
      };
    }
    if (stats.total < 6) {
      return {
        key: 'mixed',
        label: 'Segaring',
        accuracy: problemAccuracy(stats),
        attempts: stats.total,
        wrong: stats.wrong,
        title: 'Tee veel üks segaring ülesannete generaatoris',
        meta: `Praegune täpsus ${problemAccuracy(stats)}%, andmeid on veel vähe`,
      };
    }
    return null;
  }

  function readWeaknesses() {
    const items = readJson(WEAKNESS_KEY, []);
    return Array.isArray(items) ? items : [];
  }

  function saveWeaknesses(items) {
    localStorage.setItem(WEAKNESS_KEY, JSON.stringify(items));
  }

  function weaknessStats(items = readWeaknesses()) {
    const openItems = items.filter(item => item.status !== 'resolved');
    const resolved = items.length - openItems.length;
    const byRoute = openItems.reduce((acc, item) => {
      const key = item.route || 'kogu-kursus';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    const topRoutes = Object.entries(byRoute)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([route, count]) => ({ route, count, label: route === 'kogu-kursus' ? 'Kogu kursus' : topicLabel(route) }));
    return { total: items.length, open: openItems.length, resolved, topRoutes };
  }

  function addWeakness(data) {
    const now = new Date().toISOString();
    const sourceKey = data.sourceKey || `${data.type || 'manual'}:${data.route || 'general'}:${data.title || now}`;
    const items = readWeaknesses();
    const existing = items.find(item => item.sourceKey === sourceKey && item.status !== 'resolved');
    if (existing) {
      existing.count = (existing.count || 1) + 1;
      existing.updatedAt = now;
      existing.note = data.note || existing.note;
      existing.status = 'open';
      saveWeaknesses(items);
      return existing;
    }
    const item = {
      id: `weak_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      sourceKey,
      type: data.type || 'manual',
      title: String(data.title || 'Nõrk koht').trim(),
      topic: data.topic || topicLabel(data.route || ''),
      route: data.route || '',
      note: String(data.note || '').trim(),
      status: 'open',
      count: 1,
      createdAt: now,
      updatedAt: now,
    };
    items.unshift(item);
    saveWeaknesses(items);
    return item;
  }

  function updateWeakness(id, patch) {
    const now = new Date().toISOString();
    const items = readWeaknesses().map(item => item.id === id ? { ...item, ...patch, updatedAt: now } : item);
    saveWeaknesses(items);
    return items.find(item => item.id === id);
  }

  function removeWeakness(id) {
    saveWeaknesses(readWeaknesses().filter(item => item.id !== id));
  }

  window.DMWeaknesses = {
    add: addWeakness,
    list: readWeaknesses,
    stats: weaknessStats,
    update: updateWeakness,
    remove: removeWeakness,
  };

  function getStudyState() {
    const visited = asSet(readJson(VISITED_KEY, []));
    const miniResults = readJson(TOPIC_CHECK_KEY, {});
    const miniCheckRoutes = new Set(getMiniCheckRoutes());
    const notes = readJson(CHAPTER_NOTES_KEY, {});
    const learned = asSet(readJson(GLOSSARY_LEARNED_KEY, []));
    const quiz = readJson(QUIZ_RESULT_KEY, null);
    const streak = readJson(STREAK_KEY, { streak: 0, best: 0, last: null });
    const flash = getFlashStats();
    const miniChecks = getMiniCheckStats(miniResults);
    const problemStats = getProblemStats();
    const generatorFocus = problemFocus(problemStats);
    const weaknesses = readWeaknesses();
    const weakStats = weaknessStats(weaknesses);
    const topicProgress = STUDY_TOPICS.map(topic => {
      const needsMiniCheck = miniCheckRoutes.has(topic.route);
      const routeVisited = visited.has(topic.route);
      return {
        ...topic,
        visited: routeVisited,
        needsMiniCheck,
        done: needsMiniCheck ? hasMiniCheckResult(topic.route, miniResults) : routeVisited,
        hasNote: Boolean(String(notes[topic.route] || '').trim()),
      };
    });
    const visitedTopics = topicProgress.filter(topic => topic.done).length;
    const noteTopics = topicProgress.filter(topic => topic.hasNote);
    const nextTopic = topicProgress.find(topic => !topic.done);
    return {
      visited,
      notes,
      learned,
      quiz,
      streak,
      flash,
      miniChecks,
      problemStats,
      generatorFocus,
      weaknesses,
      weakStats,
      topicProgress,
      visitedTopics,
      noteTopics,
      nextTopic,
      progressPct: Math.round(100 * visitedTopics / Math.max(1, topicProgress.length)),
    };
  }

  function buildStudyPlan(state) {
    const plan = [];
    if (state.flash.due > 0) {
      plan.push({
        title: `Korda ${Math.min(state.flash.due, 12)} mõistekaarti`,
        meta: `${state.flash.due} kaarti on täna tähtajaga`,
        href: '#flashcards',
        time: '6 min',
      });
    }
    if (state.weakStats.open > 0) {
      plan.push({
        title: `Paranda ${Math.min(state.weakStats.open, 3)} nõrka kohta`,
        meta: state.weakStats.topRoutes.length
          ? `Fookus: ${state.weakStats.topRoutes.map(item => item.label).join(', ')}`
          : 'Ava vigade päevik ja vali kordamiseks üks kirje',
        href: '#vead',
        time: '8 min',
      });
    }
    if (state.generatorFocus) {
      plan.push({
        title: state.generatorFocus.title,
        meta: state.generatorFocus.meta,
        href: '#ulesandegeneraator',
        time: state.generatorFocus.wrong > 0 ? '9 min' : '6 min',
      });
    }
    if (state.miniChecks.completed < state.miniChecks.total) {
      plan.push({
        title: 'Tee üks peatüki lõpu mini-kontroll',
        meta: `${state.miniChecks.completed}/${state.miniChecks.total} mini-kontrolli tehtud`,
        href: `#${state.miniChecks.nextRoute || 'lausearvutus'}`,
        time: '5 min',
      });
    }
    if (state.quiz && state.quiz.pct < 70) {
      plan.push({
        title: `Paranda viktoriini teemat: ${state.quiz.topicLabel}`,
        meta: `Viimane tulemus oli ${state.quiz.score}/${state.quiz.total} (${state.quiz.pct}%)`,
        href: '#kviis',
        time: '8 min',
      });
    } else {
      plan.push({
        title: 'Tee üks 5-küsimuseline kiirviktoriin',
        meta: state.quiz ? `Viimane tulemus: ${state.quiz.pct}%` : 'Esimene tulemus annab töölauale võrdluspunkti',
        href: '#kviis',
        time: '5 min',
      });
    }
    if (state.nextTopic) {
      const needsCheck = state.nextTopic.needsMiniCheck && state.nextTopic.visited;
      if (state.miniChecks.nextRoute !== state.nextTopic.route) {
        plan.push({
          title: needsCheck ? `Lõpeta mini-kontroll: "${state.nextTopic.label}"` : `Jätka peatükiga "${state.nextTopic.label}"`,
          meta: needsCheck
            ? 'Peatükk on avatud; tehtuks märgitakse see pärast mini-kontrolli.'
            : `${state.nextTopic.group} osa järgmine lõpetamata teema`,
          href: `#${state.nextTopic.route}`,
          time: '10 min',
        });
      }
    } else {
      plan.push({
        title: 'Koosta üks 32-punktine harjutustöö',
        meta: 'Kõik põhiteemad on lõpetatud',
        href: '#harjutustoo',
        time: '25 min',
      });
    }
    if (state.noteTopics.length > 0) {
      plan.push({
        title: 'Vaata üle oma viimased peatükimärkmed',
        meta: `${state.noteTopics.length} peatükil on märkmed`,
        href: `#${state.noteTopics[0].route}`,
        time: '4 min',
      });
    } else {
      plan.push({
        title: 'Lisa ühele peatükile oma märge',
        meta: 'Märgi üles üks koht, kuhu tahad hiljem tagasi tulla',
        href: state.nextTopic ? `#${state.nextTopic.route}` : '#lausearvutus',
        time: '2 min',
      });
    }
    return plan.slice(0, 4);
  }

  function primaryStudyAction(state) {
    if (state.flash.due > 0) {
      return {
        eyebrow: 'Tänane fookus',
        title: `${state.flash.due} mõistekaarti ootab kordamist`,
        text: 'Alusta lühikesest mõisteringi soojendusest. See annab loogikale ja graafidele kohe parema pidamise.',
        href: '#flashcards',
        cta: 'Ava mõistekaardid',
      };
    }
    if (state.weakStats.open > 0) {
      return {
        eyebrow: 'Nõrgad kohad',
        title: `${state.weakStats.open} kirjet ootab ülevaatamist`,
        text: 'Võta päevikust üks korduv viga ja tee selle kõrvale vastav harjutus. Väike parandusring annab palju tagasi.',
        href: '#vead',
        cta: 'Ava vigade päevik',
      };
    }
    if (state.nextTopic) {
      const needsCheck = state.nextTopic.needsMiniCheck && state.nextTopic.visited;
      return {
        eyebrow: 'Järgmine samm',
        title: needsCheck ? `Tee mini-kontroll: "${state.nextTopic.label}"` : `Võta ette "${state.nextTopic.label}"`,
        text: needsCheck
          ? 'Peatükk on juba avatud; tehtuks märgitakse see pärast mini-kontrolli kontrollimist.'
          : 'Ava peatükk, tee teema juures harjutused ja lõpeta see mini-kontrolliga.',
        href: `#${state.nextTopic.route}`,
        cta: needsCheck ? 'Ava mini-kontroll' : 'Ava peatükk',
      };
    }
    return {
      eyebrow: 'Kordamise režiim',
      title: 'Põhiring on läbi. Nüüd tasub teha segaharjutusi.',
      text: 'Koosta harjutustöö või tee viktoriin, et kontrollida, mis päriselt külge jäi.',
      href: '#harjutustoo',
      cta: 'Koosta harjutustöö',
    };
  }

  window.initStudyDashboard = function () {
    const view = document.getElementById('view');
    if (!view) return;
    const state = getStudyState();
    const primary = primaryStudyAction(state);
    const plan = buildStudyPlan(state);
    const notesPreview = state.noteTopics.slice(0, 5);
    const nextTopics = state.topicProgress.filter(topic => !topic.done).slice(0, 6);
    const streakText = `${state.streak.streak || 0} ${(state.streak.streak || 0) === 1 ? 'päev' : 'päeva'}`;
    const glossaryTotal = (window.GLOSSARY || []).length;
    const learnedPct = Math.round(100 * state.learned.size / Math.max(1, glossaryTotal));
    const generatorAccuracy = problemAccuracy(state.problemStats);
    const noteCountText = `${state.noteTopics.length} ${state.noteTopics.length === 1 ? 'märkus' : 'märkust'}`;
    const pulseItems = [
      {
        href: '#vead',
        value: state.weakStats.open,
        label: 'nõrka kohta',
        meta: `${state.weakStats.resolved} kirjet parandatud`,
      },
      {
        href: `#${state.miniChecks.nextRoute || 'oppimine'}`,
        value: `${state.miniChecks.completed}/${state.miniChecks.total}`,
        label: 'mini-kontrolli',
        meta: state.miniChecks.average === null ? 'keskmine puudub' : `keskmine ${state.miniChecks.average}%`,
      },
      {
        href: '#flashcards',
        value: state.flash.due,
        label: 'mõistekaarti täna',
        meta: `${state.flash.started}/${state.flash.total} kordamist alustatud`,
      },
      {
        href: '#ulesandegeneraator',
        value: generatorAccuracy === null ? '-' : `${generatorAccuracy}%`,
        label: 'generaatori täpsus',
        meta: state.problemStats.total ? `${state.problemStats.correct}/${state.problemStats.total} õige` : 'tee esimene ülesanne',
      },
    ];
    const actionGroups = [
      {
        title: 'Loogika tööriistad',
        links: [
          { href: '#truthtable', label: 'Tõeväärtustabel' },
          { href: '#normaalkujud', label: 'DNK/KNK' },
          { href: '#predikaadid', label: 'Mudeli ehitaja' },
        ],
      },
      {
        title: 'Graafide harjutus',
        links: [
          { href: '#grapheditor', label: 'Graafiredaktor' },
          { href: '#tipuastmed', label: 'Havel-Hakimi' },
          { href: '#luhimtee', label: 'Lühim tee' },
        ],
      },
      {
        title: 'Valmisoleku kontroll',
        links: [
          { href: '#kviis', label: 'Kiirviktoriin' },
          { href: '#harjutustoo', label: 'Harjutustöö' },
          { href: '#hinnekalkulaator', label: 'Hinde kalkulaator' },
        ],
      },
    ];

    view.innerHTML = `
      <h1>Õppimise töölaud</h1>
      <p class="home-lede">Üks õppevoog, mis alustab tänasest fookusest, näitab edenemise seisu ja suunab edasi peatükkide, tööriistade ning kontrollharjutuste vahel.</p>

      <section class="study-flow-top">
        <div class="card study-hero study-hero-flow">
          <div>
            <span class="tag accent">${primary.eyebrow}</span>
            <h2>${primary.title}</h2>
            <p>${primary.text}</p>
          </div>
          <a class="btn" href="${primary.href}">${primary.cta}</a>
        </div>

        <aside class="study-pulse" aria-label="Õppimise seis">
          ${pulseItems.map(item => `
            <a href="${item.href}">
              <strong>${item.value}</strong>
              <span>${item.label}</span>
              <small>${item.meta}</small>
            </a>
          `).join('')}
        </aside>
      </section>

      <section class="card study-flow-card">
        <div class="study-section-head">
          <div>
            <h2>Tänane õppimisvoog</h2>
            <p>Koostatud mõistekaartide, vigade, mini-kontrollide ja generaatori tulemuste järgi.</p>
          </div>
          <span class="tag good">${streakText}</span>
        </div>
        <ol class="study-plan study-plan-flow">
          ${plan.map((item, index) => `
            <li>
              <span class="flow-num">${index + 1}</span>
              <div>
                <strong>${item.title}</strong>
                <span>${item.meta}</span>
              </div>
              <a class="btn small secondary" href="${item.href}">${item.time}</a>
            </li>
          `).join('')}
        </ol>
      </section>

      <div class="study-dashboard-grid study-path-grid">
        <section class="card study-progress-card">
          <div class="study-section-head">
            <div>
              <h2>Peatükkide edenemine</h2>
              <p>Järgmised loogika ja graafiteooria teemad; peatükk saab tehtud pärast mini-kontrolli.</p>
            </div>
            <strong>${state.visitedTopics}/${state.topicProgress.length}</strong>
          </div>
          <div class="progress-bar large"><div class="progress-fill" style="width:${state.progressPct}%"></div></div>
          <div class="study-topic-list">
            ${nextTopics.length ? nextTopics.map(topic => `
              <a href="#${topic.route}">
                <span>${topic.label}</span>
                <small>${topic.needsMiniCheck && topic.visited ? 'mini-kontroll on tegemata' : topic.group}</small>
              </a>
            `).join('') : '<p class="muted">Kõik põhiteemad on lõpetatud. Nüüd on kordamise ja harjutustöö aeg.</p>'}
          </div>
        </section>

        <section class="card study-actions-card">
          <div class="study-section-head">
            <div>
              <h2>Harjutamise rada</h2>
              <p>Vali tööriist selle järgi, kas tahad aru saada, läbi proovida või valmisolekut kontrollida.</p>
            </div>
          </div>
          <div class="study-action-groups">
            ${actionGroups.map(group => `
              <div class="study-action-group">
                <strong>${group.title}</strong>
                ${group.links.map(link => `<a href="${link.href}">${link.label}</a>`).join('')}
              </div>
            `).join('')}
          </div>
        </section>
      </div>

      <section class="card study-notes-card">
        <div class="study-section-head">
          <div>
            <h2>Märkmed ja kontrollpunktid</h2>
            <p>Mida oled märkinud, kui palju sõnastikust selgeks saanud ja milline oli viimane viktoriin.</p>
          </div>
          <span class="tag warn">${noteCountText}</span>
        </div>
        <div class="study-note-flow">
          ${notesPreview.length ? notesPreview.map(topic => `
            <a href="#${topic.route}">
              <strong>${topic.label}</strong>
              <span>${escapeHtml(String(state.notes[topic.route] || '').trim().slice(0, 120))}${String(state.notes[topic.route] || '').trim().length > 120 ? '...' : ''}</span>
            </a>
          `).join('') : '<p class="muted">Märkmeid veel ei ole. Ava mõni peatükk ja kirjuta lehe lõppu, mis vajab hiljem kordamist.</p>'}
          <a href="#sonastik">
            <strong>${state.learned.size} mõistet selgeks märgitud</strong>
            <span>${learnedPct}% Alfred Saidlo sõnastikust</span>
          </a>
          <a href="#kviis">
            <strong>${state.quiz ? `${state.quiz.pct}% viimane viktoriin` : 'Viktoriin tegemata'}</strong>
            <span>${state.quiz ? `${state.quiz.topicLabel}, ${formatDate(state.quiz.date)}` : 'Tee esimene viktoriin, et töölaud saaks võrdluspunkti.'}</span>
          </a>
        </div>
      </section>
    `;
    renderMath(view);
  };

  function weaknessStatusLabel(status) {
    if (status === 'resolved') return 'Parandatud';
    if (status === 'reviewing') return 'Kordamisel';
    return 'Avatud';
  }

  function weaknessTypeLabel(type) {
    if (type === 'quiz') return 'Viktoriin';
    if (type === 'exercise') return 'Lahendusülesanne';
    if (type === 'generator') return 'Ülesannete generaator';
    return 'Käsitsi';
  }

  window.initWeaknessJournal = function () {
    const view = document.getElementById('view');
    if (!view) return;
    let filter = 'active';

    function filteredItems(items) {
      return items
        .filter(item => {
          if (filter === 'all') return true;
          if (filter === 'resolved') return item.status === 'resolved';
          return item.status !== 'resolved';
        })
        .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
    }

    function render() {
      const items = readWeaknesses();
      const stats = weaknessStats(items);
      const visible = filteredItems(items);
      const active = items.filter(item => item.status !== 'resolved');
      const topRoutes = stats.topRoutes.length ? stats.topRoutes : [];

      view.innerHTML = `
        <h1>Vigade päevik / nõrgad kohad</h1>
        <p>Pane siia kirja korduvad vead, segased ülesandetüübid ja teemad, mida tahad hiljem sihilikult parandada.</p>

        <section class="study-stat-grid weakness-stats">
          <div class="study-stat">
            <strong>${stats.open}</strong>
            <span>avatud kirjet</span>
            <small>vajavad veel kordamist</small>
          </div>
          <div class="study-stat">
            <strong>${stats.resolved}</strong>
            <span>parandatud</span>
            <small>märgitud tehtuks</small>
          </div>
          <div class="study-stat">
            <strong>${topRoutes[0]?.count || 0}</strong>
            <span>${topRoutes[0]?.label || 'fookusteemat'}</span>
            <small>${topRoutes.length ? 'kõige sagedasem nõrk koht' : 'lisa esimene kirje'}</small>
          </div>
        </section>

        <section class="card weakness-form">
          <h2>Lisa nõrk koht</h2>
          <div class="topic-tool-grid">
            <label class="grade-field">
              <span>Pealkiri</span>
              <input id="weakTitle" type="text" placeholder="Nt prefikskuju eitustega või Havel-Hakimi samm">
            </label>
            <label class="grade-field">
              <span>Teema</span>
              <select id="weakRoute">
                <option value="">Kogu kursus</option>
                ${STUDY_TOPICS.map(topic => `<option value="${topic.route}">${topic.group}: ${topic.label}</option>`).join('')}
              </select>
            </label>
          </div>
          <label class="grade-field">
            <span>Märkus</span>
            <textarea id="weakNote" rows="3" placeholder="Mis täpselt valesti läks? Millist näidet peaksid uuesti tegema?"></textarea>
          </label>
          <button class="btn small" id="addWeakness" type="button">Lisa päevikusse</button>
          <span class="muted" id="weakFormStatus"></span>
        </section>

        <section class="card">
          <div class="study-section-head">
            <div>
              <h2>Päeviku kirjed</h2>
              <p>${active.length ? 'Alusta ühest avatud kirjest ja tee kohe kõrval üks sama tüüpi harjutus.' : 'Avatud nõrku kohti praegu ei ole.'}</p>
            </div>
            <select id="weakFilter" aria-label="Vigade päeviku filter">
              <option value="active" ${filter === 'active' ? 'selected' : ''}>Avatud ja kordamisel</option>
              <option value="resolved" ${filter === 'resolved' ? 'selected' : ''}>Parandatud</option>
              <option value="all" ${filter === 'all' ? 'selected' : ''}>Kõik kirjed</option>
            </select>
          </div>
          <div class="weakness-list">
            ${visible.length ? visible.map(item => `
              <article class="weakness-item ${item.status === 'resolved' ? 'resolved' : ''}" data-id="${item.id}">
                <div class="weakness-item-head">
                  <div>
                    <span class="tag ${item.status === 'resolved' ? 'good' : item.status === 'reviewing' ? 'warn' : 'bad'}">${weaknessStatusLabel(item.status)}</span>
                    <span class="tag accent">${weaknessTypeLabel(item.type)}</span>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.note || 'Märkus puudub.')}</p>
                  </div>
                  <div class="weakness-meta">
                    <strong>${escapeHtml(item.topic || topicLabel(item.route))}</strong>
                    <span>Kordunud ${item.count || 1}x</span>
                    <small>${formatDate(item.updatedAt || item.createdAt)}</small>
                  </div>
                </div>
                <div class="btn-row">
                  ${item.route ? `<a class="btn small secondary" href="#${item.route}">Ava teema</a>` : ''}
                  ${item.status !== 'reviewing' && item.status !== 'resolved' ? `<button class="btn small secondary" data-weak-status="reviewing" type="button">Märgi kordamiseks</button>` : ''}
                  ${item.status !== 'resolved' ? `<button class="btn small success" data-weak-status="resolved" type="button">Parandatud</button>` : `<button class="btn small secondary" data-weak-status="open" type="button">Ava uuesti</button>`}
                  <button class="btn small danger" data-weak-delete type="button">Kustuta</button>
                </div>
              </article>
            `).join('') : '<p class="muted">Selle filtriga kirjeid ei ole.</p>'}
          </div>
        </section>
      `;

      document.getElementById('addWeakness').addEventListener('click', () => {
        const title = document.getElementById('weakTitle').value.trim();
        const route = document.getElementById('weakRoute').value;
        const note = document.getElementById('weakNote').value.trim();
        const status = document.getElementById('weakFormStatus');
        if (!title) {
          status.textContent = 'Lisa pealkiri.';
          return;
        }
        addWeakness({
          type: 'manual',
          title,
          route,
          topic: route ? topicLabel(route) : 'Kogu kursus',
          note,
          sourceKey: `manual:${route || 'general'}:${title.toLowerCase()}`,
        });
        render();
      });

      document.getElementById('weakFilter').addEventListener('change', event => {
        filter = event.target.value;
        render();
      });

      view.querySelectorAll('[data-weak-status]').forEach(button => {
        button.addEventListener('click', () => {
          const id = button.closest('.weakness-item')?.dataset.id;
          if (id) updateWeakness(id, { status: button.dataset.weakStatus });
          render();
        });
      });
      view.querySelectorAll('[data-weak-delete]').forEach(button => {
        button.addEventListener('click', () => {
          const id = button.closest('.weakness-item')?.dataset.id;
          if (id) removeWeakness(id);
          render();
        });
      });
    }

    render();
  };

  window.initCheatSheet = function () {
    const view = document.getElementById('view');
    if (!view) return;
    const groups = [...new Set(CHEAT_SHEETS.map(item => item.group))];
    view.innerHTML = `
      <h1>Spikker</h1>
      <p>Kompaktne viimase hetke kordamisvaade. Printides jäävad alles ainult põhisisu ja valemid.</p>
      <div class="btn-row no-print">
        <button class="btn" id="printCheatSheet" type="button">Prindi / salvesta PDF-iks</button>
      </div>
      <div class="cheat-sheet">
        ${groups.map(group => `
          <section class="cheat-group">
            <h2>${group}</h2>
            <div class="cheat-grid">
              ${CHEAT_SHEETS.filter(item => item.group === group).map(item => `
                <article class="cheat-card">
                  <h3><a href="#${item.route}">${item.title}</a></h3>
                  <ul>${item.items.map(line => `<li>${line}</li>`).join('')}</ul>
                </article>
              `).join('')}
            </div>
          </section>
        `).join('')}
      </div>
    `;
    document.getElementById('printCheatSheet').addEventListener('click', () => window.print());
    renderMath(view);
  };
})();

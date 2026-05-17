/* ===== Infinite parametrized problem generator ===== */

(function () {
  'use strict';

  const TYPES = [
    { id: 'mixed', label: 'Segamini' },
    { id: 'prefix', label: 'Prefikskuju' },
    { id: 'havel', label: 'Havel-Hakimi' },
    { id: 'graph', label: 'Kaalutud graaf' },
    { id: 'sequent', label: 'Sekvents' },
  ];

  const DIFFICULTIES = [
    { id: 'easy', label: 'Lihtne' },
    { id: 'medium', label: 'Keskmine' },
    { id: 'hard', label: 'Raskem' },
  ];

  const GRAPH_ALGORITHMS = [
    { id: 'mixed', label: 'Segamini' },
    { id: 'kruskal', label: 'Kruskal' },
    { id: 'prim', label: 'Prim' },
    { id: 'dijkstra', label: 'Dijkstra' },
  ];

  const STATS_KEY = 'dm_problem_generator_stats_v1';
  const TYPE_META = {
    prefix: { label: 'Prefikskuju', route: 'prefikskuju' },
    havel: { label: 'Havel-Hakimi', route: 'tipuastmed' },
    graph: { label: 'Kaalutud graaf', route: 'toespuud' },
    sequent: { label: 'Sekvents', route: 'sekvents' },
  };
  const SKILL_META = {
    prefix: { label: 'Prefikskuju', route: 'prefikskuju' },
    havel: { label: 'Havel-Hakimi', route: 'tipuastmed' },
    sequent: { label: 'Sekventsid', route: 'sekvents' },
    kruskal: { label: 'Kruskal', route: 'toespuud' },
    prim: { label: 'Prim', route: 'toespuud' },
    dijkstra: { label: 'Dijkstra', route: 'luhimtee' },
  };

  const LETTERS = ['P', 'Q', 'R', 'S', 'T'];
  const VARIABLES = ['x', 'y', 'z', 'u', 'v'];
  const VERTEX_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  let state = {
    problem: null,
    answerShown: false,
    stepsShown: false,
    feedback: '',
    lastAnswer: '',
    attemptSaved: false,
  };

  function choice(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function randInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[ch]));
  }

  function plainText(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = String(html || '');
    return tmp.textContent.replace(/\s+/g, ' ').trim();
  }

  function hashText(value) {
    let hash = 0;
    const text = String(value || '');
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
    }
    return Math.abs(hash).toString(36);
  }

  function emptyBucket() {
    return { attempts: 0, correct: 0, wrong: 0 };
  }

  function normalizeStats(data = {}) {
    return {
      total: Number(data.total) || 0,
      correct: Number(data.correct) || 0,
      wrong: Number(data.wrong) || 0,
      byType: data.byType && typeof data.byType === 'object' ? data.byType : {},
      bySkill: data.bySkill && typeof data.bySkill === 'object' ? data.bySkill : {},
      recent: Array.isArray(data.recent) ? data.recent.slice(0, 30) : [],
      updatedAt: data.updatedAt || null,
    };
  }

  function readStats() {
    try {
      return normalizeStats(JSON.parse(localStorage.getItem(STATS_KEY)) || {});
    } catch {
      return normalizeStats();
    }
  }

  function saveStats(stats) {
    localStorage.setItem(STATS_KEY, JSON.stringify(normalizeStats(stats)));
  }

  function bumpBucket(collection, key, ok) {
    if (!collection[key]) collection[key] = emptyBucket();
    collection[key].attempts = (collection[key].attempts || 0) + 1;
    if (ok) collection[key].correct = (collection[key].correct || 0) + 1;
    else collection[key].wrong = (collection[key].wrong || 0) + 1;
  }

  function accuracy(bucket) {
    const attempts = bucket?.attempts ?? bucket?.total ?? 0;
    return attempts ? Math.round(100 * (bucket.correct || 0) / attempts) : null;
  }

  function recordAttempt(problem, userAnswer, result) {
    const now = new Date().toISOString();
    const stats = readStats();
    const skill = problem.skill || problem.type;
    stats.total += 1;
    if (result.ok) stats.correct += 1;
    else stats.wrong += 1;
    bumpBucket(stats.byType, problem.type, result.ok);
    bumpBucket(stats.bySkill, skill, result.ok);
    stats.updatedAt = now;
    stats.recent.unshift({
      id: `pg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      date: now,
      type: problem.type,
      skill,
      label: problem.tag,
      title: problem.title,
      route: problem.route,
      correct: result.ok,
      userAnswer: String(userAnswer || '').trim(),
      expected: problem.expectedAnswer || plainText(problem.answerHtml),
    });
    stats.recent = stats.recent.slice(0, 30);
    saveStats(stats);
    return stats;
  }

  function addWrongAttemptToJournal(problem, userAnswer, result) {
    if (result.ok || !window.DMWeaknesses?.add) return false;
    const prompt = plainText(problem.prompt).slice(0, 260);
    const expected = problem.expectedAnswer || plainText(problem.answerHtml).slice(0, 180);
    const route = problem.route || TYPE_META[problem.type]?.route || 'ulesandegeneraator';
    window.DMWeaknesses.add({
      type: 'generator',
      route,
      topic: problem.topic || TYPE_META[problem.type]?.label || problem.tag,
      title: `${problem.tag}: ${problem.title}`,
      note: `Ülesanne: ${prompt}\nMinu vastus: ${String(userAnswer || '').trim() || '(tühi)'}\nÕige vastus: ${expected}`,
      sourceKey: `problem-generator:${problem.type}:${hashText(prompt)}`,
    });
    return true;
  }

  function weakestStatsBucket(stats) {
    const candidates = Object.entries(stats.bySkill || {})
      .filter(([, bucket]) => bucket.attempts >= 2 && bucket.wrong > 0)
      .map(([key, bucket]) => ({ key, bucket, accuracy: accuracy(bucket) }))
      .sort((a, b) => a.accuracy - b.accuracy || b.bucket.wrong - a.bucket.wrong);
    return candidates[0] || null;
  }

  function renderStats() {
    const box = document.getElementById('pgStats');
    if (!box) return;
    const stats = readStats();
    const totalAccuracy = accuracy(stats);
    const weak = weakestStatsBucket(stats);
    const recentWrong = stats.recent.find(item => !item.correct);
    box.innerHTML = `
      <div class="study-stat">
        <strong>${stats.total}</strong>
        <span>ülesannet tehtud</span>
        <small>${stats.correct} õiget, ${stats.wrong} üle vaadata</small>
      </div>
      <div class="study-stat">
        <strong>${totalAccuracy === null ? '-' : `${totalAccuracy}%`}</strong>
        <span>üldine täpsus</span>
        <small>${stats.updatedAt ? `viimati ${new Date(stats.updatedAt).toLocaleString('et-EE', { dateStyle: 'short', timeStyle: 'short' })}` : 'vastuseid veel ei ole'}</small>
      </div>
      <div class="study-stat">
        <strong>${weak ? `${weak.accuracy}%` : '-'}</strong>
        <span>${weak ? `${SKILL_META[weak.key]?.label || weak.key}` : 'nõrk koht puudub'}</span>
        <small>${weak ? `${weak.bucket.wrong}/${weak.bucket.attempts} vajab kordamist` : 'tekib pärast paari katset'}</small>
      </div>
      <div class="study-stat">
        <strong>${recentWrong ? 'Jah' : '-'}</strong>
        <span>vigade päevik</span>
        <small>${recentWrong ? `viimati: ${recentWrong.label}` : 'vale vastus lisatakse automaatselt'}</small>
      </div>
    `;
  }

  function renderMath(el) {
    if (!window.renderMathInElement || !el) return;
    window.renderMathInElement(el, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true },
      ],
      throwOnError: false,
    });
  }

  function normalizeText(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[.,;:]/g, '')
      .replace(/−/g, '-')
      .replace(/→/g, '⇒')
      .replace(/->/g, '⇒')
      .replace(/=>/g, '⇒');
  }

  function normalizeFormula(value) {
    return normalizeText(value)
      .replace(/\\forall|forall/g, '∀')
      .replace(/\\exists|exists/g, '∃')
      .replace(/\\neg|not|!/g, '¬')
      .replace(/\\land|∧/g, '&')
      .replace(/\\lor/g, '∨')
      .replace(/\\to/g, '⇒')
      .replace(/\\rightarrow/g, '⇒');
  }

  function normalizeRule(value) {
    return normalizeText(value)
      .replace(/vdash|⊢/g, '⊢')
      .replace(/\\land|∧/g, '&')
      .replace(/\\lor/g, '∨')
      .replace(/\\rightarrow|->|→/g, '⇒')
      .replace(/\\/g, '');
  }

  function problemTypeFromControls() {
    const type = document.getElementById('pgType')?.value || 'mixed';
    if (type !== 'mixed') return type;
    return choice(['prefix', 'havel', 'graph', 'sequent']);
  }

  function generateProblem() {
    const difficulty = document.getElementById('pgDifficulty')?.value || 'medium';
    const type = problemTypeFromControls();
    if (type === 'prefix') return generatePrefixProblem(difficulty);
    if (type === 'havel') return generateHavelProblem(difficulty);
    if (type === 'graph') return generateGraphProblem(difficulty);
    return generateSequentProblem(difficulty);
  }

  function generatePrefixProblem(difficulty) {
    const preds = shuffle(LETTERS).slice(0, 3);
    const vars = shuffle(VARIABLES).slice(0, 3);
    const [p, q, r] = preds;
    const [x, y, z] = vars;

    const templates = [
      {
        name: 'Implikatsioon kvantori sees',
        formula: `\\neg\\exists ${x}(${p}(${x}) \\Rightarrow \\exists ${y}${q}(${x},${y}))`,
        final: `\\forall ${x}\\forall ${y}(${p}(${x}) \\& \\neg ${q}(${x},${y}))`,
        steps: [
          `Eemalda implikatsioon: $\\neg\\exists ${x}(\\neg ${p}(${x}) \\lor \\exists ${y}${q}(${x},${y}))$.`,
          `Vii esimene eitus kvantorist läbi: $\\forall ${x}\\neg(\\neg ${p}(${x}) \\lor \\exists ${y}${q}(${x},${y}))$.`,
          `Kasuta De Morgani seadust: $\\forall ${x}(${p}(${x}) \\& \\neg\\exists ${y}${q}(${x},${y}))$.`,
          `Eita olemasolukvantor: $\\forall ${x}(${p}(${x}) \\& \\forall ${y}\\neg ${q}(${x},${y}))$.`,
          `Too kvantor välja: $\\forall ${x}\\forall ${y}(${p}(${x}) \\& \\neg ${q}(${x},${y}))$.`,
        ],
      },
      {
        name: 'Eitatud üldisuskvantor',
        formula: `\\neg\\forall ${x}(\\exists ${y}${p}(${x},${y}) \\Rightarrow \\exists ${z}\\neg ${q}(${x},${z}))`,
        final: `\\exists ${x}\\exists ${y}\\forall ${z}(${p}(${x},${y}) \\& ${q}(${x},${z}))`,
        steps: [
          `Eemalda implikatsioon: $\\neg\\forall ${x}(\\neg\\exists ${y}${p}(${x},${y}) \\lor \\exists ${z}\\neg ${q}(${x},${z}))$.`,
          `Vii eitus kvantorist läbi: $\\exists ${x}\\neg(\\neg\\exists ${y}${p}(${x},${y}) \\lor \\exists ${z}\\neg ${q}(${x},${z}))$.`,
          `De Morgan ja topelteitus: $\\exists ${x}(\\exists ${y}${p}(${x},${y}) \\& \\neg\\exists ${z}\\neg ${q}(${x},${z}))$.`,
          `Eita olemasolukvantor: $\\exists ${x}(\\exists ${y}${p}(${x},${y}) \\& \\forall ${z}${q}(${x},${z}))$.`,
          `Too kvantorid ette: $\\exists ${x}\\exists ${y}\\forall ${z}(${p}(${x},${y}) \\& ${q}(${x},${z}))$.`,
        ],
      },
      {
        name: 'Eitatud implikatsioon',
        formula: `\\neg(\\forall ${x}${p}(${x}) \\Rightarrow \\exists ${y}\\forall ${z}${q}(${y},${z}))`,
        final: `\\forall ${x}\\forall ${y}\\exists ${z}(${p}(${x}) \\& \\neg ${q}(${y},${z}))`,
        steps: [
          `Kasuta reeglit $\\neg(A\\Rightarrow B)\\equiv A\\&\\neg B$: $\\forall ${x}${p}(${x}) \\& \\neg\\exists ${y}\\forall ${z}${q}(${y},${z})$.`,
          `Eita olemasolukvantor: $\\forall ${x}${p}(${x}) \\& \\forall ${y}\\neg\\forall ${z}${q}(${y},${z})$.`,
          `Eita üldisuskvantor: $\\forall ${x}${p}(${x}) \\& \\forall ${y}\\exists ${z}\\neg ${q}(${y},${z})$.`,
          `Too kvantorid ette: $\\forall ${x}\\forall ${y}\\exists ${z}(${p}(${x}) \\& \\neg ${q}(${y},${z}))$.`,
        ],
      },
    ];

    const harder = {
      name: 'Kaks haru ja muutuja ümbernimetamine',
      formula: `\\neg\\exists ${x}((\\exists ${y}${p}(${y}) \\& ${q}(${x})) \\Rightarrow \\forall ${y}${r}(${x},${y}))`,
      final: `\\forall ${x}\\exists ${y}\\exists ${z}(${p}(${y}) \\& ${q}(${x}) \\& \\neg ${r}(${x},${z}))`,
      steps: [
        `Eemalda implikatsioon: $\\neg\\exists ${x}(\\neg(\\exists ${y}${p}(${y}) \\& ${q}(${x})) \\lor \\forall ${y}${r}(${x},${y}))$.`,
        `Vii välimine eitus sisse: $\\forall ${x}\\neg(\\neg(\\exists ${y}${p}(${y}) \\& ${q}(${x})) \\lor \\forall ${y}${r}(${x},${y}))$.`,
        `De Morgan ja topelteitus: $\\forall ${x}((\\exists ${y}${p}(${y}) \\& ${q}(${x})) \\& \\neg\\forall ${y}${r}(${x},${y}))$.`,
        `Nimeta teine seotud muutuja ümber, et sama tähis ei segaks: $\\forall ${x}((\\exists ${y}${p}(${y}) \\& ${q}(${x})) \\& \\neg\\forall ${z}${r}(${x},${z}))$.`,
        `Eita üldisuskvantor: $\\forall ${x}((\\exists ${y}${p}(${y}) \\& ${q}(${x})) \\& \\exists ${z}\\neg ${r}(${x},${z}))$.`,
        `Too kvantorid ette: $\\forall ${x}\\exists ${y}\\exists ${z}(${p}(${y}) \\& ${q}(${x}) \\& \\neg ${r}(${x},${z}))$.`,
      ],
    };

    const pool = difficulty === 'hard' ? [...templates, harder] : templates;
    const item = choice(pool);
    return {
      type: 'prefix',
      skill: 'prefix',
      route: 'prefikskuju',
      topic: 'Prefikskuju',
      tag: 'Prefikskuju',
      title: item.name,
      prompt: `
        <p>Vii valem prefikskujule. Eemalda implikatsioonid ja vii eitused atomaarsete valemite ette.</p>
        <div class="formula">$${item.formula}$</div>
      `,
      inputKind: 'text',
      inputLabel: 'Lõppvastus prefikskujul',
      placeholder: `nt ${item.final.replaceAll('\\', '')}`,
      check(value) {
        const expected = normalizeFormula(item.final);
        const actual = normalizeFormula(value);
        return actual === expected
          ? { ok: true, text: 'Õige lõppkuju.' }
          : { ok: false, text: 'Lõppkuju ei lange oodatuga kokku. Vaata sammud üle.' };
      },
      expectedAnswer: item.final,
      answerHtml: `<p><strong>Lõppvastus:</strong> $${item.final}$</p>`,
      steps: item.steps,
    };
  }

  function havelHakimi(sequence) {
    let seq = [...sequence].sort((a, b) => b - a);
    const steps = [];
    while (true) {
      steps.push({
        before: [...seq],
        text: `Järjend on ${formatSequence(seq)}.`,
      });
      if (seq.every(x => x === 0)) {
        return { ok: true, reason: 'Kõik astmed taandusid nulliks.', steps };
      }
      const d = seq.shift();
      if (d < 0 || d > seq.length) {
        steps.push({
          before: [d, ...seq],
          text: `Suurim aste on ${d}, aga alles on ainult ${seq.length} tippu.`,
          fail: true,
        });
        return { ok: false, reason: `Suurimat astet ${d} ei saa jaotada ${seq.length} allesjäänud tipu vahel.`, steps };
      }
      for (let i = 0; i < d; i++) seq[i] -= 1;
      if (seq.some(x => x < 0)) {
        steps.push({
          before: [...seq],
          text: `Pärast järgmise ${d} astme vähendamist tekib negatiivne aste: ${formatSequence(seq)}.`,
          fail: true,
        });
        return { ok: false, reason: 'Taandamisel tekkis negatiivne aste.', steps };
      }
      const afterDecrease = [...seq];
      seq.sort((a, b) => b - a);
      steps.push({
        before: afterDecrease,
        text: `Eemaldame ${d} ja vähendame järgmist ${d} astet: ${formatSequence(afterDecrease)}; sorteeritult ${formatSequence(seq)}.`,
      });
    }
  }

  function randomGraphDegrees(n, density) {
    const degrees = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (Math.random() < density) {
          degrees[i]++;
          degrees[j]++;
        }
      }
    }
    return degrees.sort((a, b) => b - a);
  }

  function generateNonGraphicalSequence(n) {
    for (let tries = 0; tries < 80; tries++) {
      const seq = Array.from({ length: n }, () => randInt(0, n - 1)).sort((a, b) => b - a);
      if (!havelHakimi(seq).ok) return seq;
    }
    const seq = Array.from({ length: n }, (_, i) => Math.max(0, n - 1 - i));
    seq[0] = n;
    return seq;
  }

  function generateHavelProblem(difficulty) {
    const n = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 6 : 7;
    const shouldBeGraphical = Math.random() < 0.65;
    const seq = shouldBeGraphical
      ? randomGraphDegrees(n, difficulty === 'easy' ? 0.38 : difficulty === 'medium' ? 0.46 : 0.52)
      : generateNonGraphicalSequence(n);
    const result = havelHakimi(seq);
    return {
      type: 'havel',
      skill: 'havel',
      route: 'tipuastmed',
      topic: 'Tipuastmed',
      tag: 'Tipuastmed',
      title: 'Havel-Hakimi kontroll',
      prompt: `
        <p>Kas järjend saab olla mõne lihtgraafi tipuastmete järjend?</p>
        <div class="formula">${formatSequence(seq)}</div>
      `,
      inputKind: 'yesno',
      inputLabel: 'Kas järjend on graafiline?',
      check(value) {
        const ok = (value === 'yes') === result.ok;
        return ok
          ? { ok: true, text: 'Õige otsus.' }
          : { ok: false, text: 'Otsus ei ole õige. Tee Havel-Hakimi taandused läbi.' };
      },
      expectedAnswer: result.ok ? 'Jah' : 'Ei',
      answerHtml: `<p><strong>Vastus:</strong> ${result.ok ? 'Jah, järjend on graafiline.' : 'Ei, järjend ei ole graafiline.'}</p><p>${result.reason}</p>`,
      steps: result.steps.map(step => step.text),
    };
  }

  function formatSequence(seq) {
    return `(${seq.join(', ')})`;
  }

  function edgeKey(edge) {
    const a = Math.min(edge.u, edge.v);
    const b = Math.max(edge.u, edge.v);
    return `${a}-${b}`;
  }

  function edgeName(edge, graph) {
    const labels = graph.labels;
    return `${labels[edge.u]}${labels[edge.v]}`;
  }

  function makeWeightedGraph(difficulty) {
    const n = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 6 : 7;
    const labels = VERTEX_LABELS.slice(0, n);
    const edgeMap = new Map();
    function addEdge(u, v) {
      const a = Math.min(u, v);
      const b = Math.max(u, v);
      edgeMap.set(`${a}-${b}`, { u: a, v: b, w: 0 });
    }

    for (let i = 1; i < n; i++) addEdge(i, randInt(0, i - 1));
    const extra = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 7;
    while (edgeMap.size < n - 1 + extra) {
      const u = randInt(0, n - 1);
      const v = randInt(0, n - 1);
      if (u !== v) addEdge(u, v);
    }
    const weights = shuffle(Array.from({ length: 24 }, (_, i) => i + 1));
    const edges = [...edgeMap.values()].map((edge, i) => ({ ...edge, w: weights[i] }));
    edges.sort((a, b) => edgeName(a, { labels }).localeCompare(edgeName(b, { labels })));
    return { labels, edges };
  }

  function dsu(size) {
    const parent = Array.from({ length: size }, (_, i) => i);
    function find(x) {
      while (parent[x] !== x) {
        parent[x] = parent[parent[x]];
        x = parent[x];
      }
      return x;
    }
    return {
      find,
      union(a, b) {
        const ra = find(a);
        const rb = find(b);
        if (ra === rb) return false;
        parent[rb] = ra;
        return true;
      },
    };
  }

  function solveKruskal(graph) {
    const sets = dsu(graph.labels.length);
    const sorted = [...graph.edges].sort((a, b) => a.w - b.w || edgeName(a, graph).localeCompare(edgeName(b, graph)));
    const chosen = [];
    const steps = [];
    for (const edge of sorted) {
      if (sets.union(edge.u, edge.v)) {
        chosen.push(edge);
        steps.push(`Lisa serv ${edgeName(edge, graph)} kaaluga ${edge.w}.`);
      } else {
        steps.push(`Jäta serv ${edgeName(edge, graph)} vahele, sest see tekitaks tsükli.`);
      }
      if (chosen.length === graph.labels.length - 1) break;
    }
    return {
      algorithm: 'Kruskal',
      chosen,
      value: chosen.reduce((sum, edge) => sum + edge.w, 0),
      steps,
      label: 'Minimaalse toespuu kogukaal',
    };
  }

  function solvePrim(graph, start = 0) {
    const inTree = new Set([start]);
    const chosen = [];
    const steps = [`Alusta tipust ${graph.labels[start]}.`];
    while (inTree.size < graph.labels.length) {
      const candidates = graph.edges
        .filter(edge => inTree.has(edge.u) !== inTree.has(edge.v))
        .sort((a, b) => a.w - b.w || edgeName(a, graph).localeCompare(edgeName(b, graph)));
      const edge = candidates[0];
      if (!edge) break;
      const next = inTree.has(edge.u) ? edge.v : edge.u;
      chosen.push(edge);
      inTree.add(next);
      steps.push(`Vali odavaim piirserv ${edgeName(edge, graph)} kaaluga ${edge.w}; lisa tipp ${graph.labels[next]}.`);
    }
    return {
      algorithm: 'Prim',
      chosen,
      value: chosen.reduce((sum, edge) => sum + edge.w, 0),
      steps,
      label: `Primi toespuu kogukaal algtipust ${graph.labels[start]}`,
    };
  }

  function solveDijkstra(graph, start = 0, end = graph.labels.length - 1) {
    const adj = Array.from({ length: graph.labels.length }, () => []);
    graph.edges.forEach(edge => {
      adj[edge.u].push({ to: edge.v, edge });
      adj[edge.v].push({ to: edge.u, edge });
    });
    const dist = Array(graph.labels.length).fill(Infinity);
    const prev = Array(graph.labels.length).fill(null);
    const settled = new Set();
    const steps = [];
    dist[start] = 0;
    while (!settled.has(end)) {
      let u = -1;
      for (let i = 0; i < dist.length; i++) {
        if (!settled.has(i) && (u === -1 || dist[i] < dist[u])) u = i;
      }
      if (u === -1 || dist[u] === Infinity) break;
      settled.add(u);
      const relaxations = [];
      for (const { to, edge } of adj[u]) {
        if (settled.has(to)) continue;
        const candidate = dist[u] + edge.w;
        if (candidate < dist[to]) {
          dist[to] = candidate;
          prev[to] = { from: u, edge };
          relaxations.push(`${graph.labels[to]}=${candidate}`);
        }
      }
      steps.push(`Kinnita tipp ${graph.labels[u]} kaugusega ${dist[u]}${relaxations.length ? `; uuenda ${relaxations.join(', ')}` : ''}.`);
    }
    const pathEdges = [];
    const pathVertices = [];
    let current = end;
    while (current !== null) {
      pathVertices.push(current);
      if (!prev[current]) break;
      pathEdges.push(prev[current].edge);
      current = prev[current].from;
    }
    pathVertices.reverse();
    pathEdges.reverse();
    return {
      algorithm: 'Dijkstra',
      chosen: pathEdges,
      value: dist[end],
      path: pathVertices.map(index => graph.labels[index]).join(' → '),
      steps,
      label: `Lühima tee pikkus ${graph.labels[start]} → ${graph.labels[end]}`,
    };
  }

  function generateGraphProblem(difficulty) {
    const graph = makeWeightedGraph(difficulty);
    let algorithm = document.getElementById('pgGraphAlgorithm')?.value || 'mixed';
    if (algorithm === 'mixed') algorithm = choice(['kruskal', 'prim', 'dijkstra']);
    const solution = algorithm === 'kruskal'
      ? solveKruskal(graph)
      : algorithm === 'prim'
        ? solvePrim(graph, 0)
        : solveDijkstra(graph, 0, graph.labels.length - 1);
    const chosenNames = solution.chosen.map(edge => edgeName(edge, graph)).join(', ');
    const answerDetails = algorithm === 'dijkstra'
      ? `<p><strong>Tee:</strong> ${solution.path}</p><p><strong>Kaugus:</strong> ${solution.value}</p>`
      : `<p><strong>Valitud servad:</strong> ${chosenNames}</p><p><strong>Kogukaal:</strong> ${solution.value}</p>`;

    return {
      type: 'graph',
      skill: algorithm,
      route: algorithm === 'dijkstra' ? 'luhimtee' : 'toespuud',
      topic: solution.algorithm,
      tag: solution.algorithm,
      title: `${solution.algorithm} juhuslikul kaalutud graafil`,
      prompt: `
        <p>${algorithm === 'dijkstra'
          ? `Leia Dijkstra algoritmiga lühim tee tipust ${graph.labels[0]} tippu ${graph.labels[graph.labels.length - 1]}.`
          : `Leia ${solution.algorithm}i algoritmiga minimaalse toespuu kogukaal.`}</p>
        ${renderGraphSvg(graph)}
        <div class="pg-edge-list">${renderEdgeList(graph)}</div>
      `,
      inputKind: 'number',
      inputLabel: solution.label,
      placeholder: 'Sisesta arv',
      check(value) {
        const actual = Number(String(value).replace(',', '.'));
        return Number.isFinite(actual) && actual === solution.value
          ? { ok: true, text: 'Õige arvuline vastus.' }
          : { ok: false, text: `See ei ole õige. Kontrolli algoritmi samme ja servade kaale.` };
      },
      expectedAnswer: String(solution.value),
      answerHtml: `${answerDetails}${renderGraphSvg(graph, new Set(solution.chosen.map(edgeKey)))}`,
      steps: solution.steps,
    };
  }

  function renderEdgeList(graph) {
    const rows = graph.edges
      .map(edge => `<tr><td>${edgeName(edge, graph)}</td><td>${edge.w}</td></tr>`)
      .join('');
    return `<table class="truth-table"><thead><tr><th>Serv</th><th>Kaal</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  function renderGraphSvg(graph, highlights = new Set()) {
    const width = 520;
    const height = 330;
    const cx = width / 2;
    const cy = height / 2;
    const radius = 118;
    const positions = graph.labels.map((_, i) => {
      const angle = -Math.PI / 2 + i * 2 * Math.PI / graph.labels.length;
      return {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      };
    });
    const edgeSvg = graph.edges.map(edge => {
      const a = positions[edge.u];
      const b = positions[edge.v];
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const key = edgeKey(edge);
      const active = highlights.has(key);
      return `
        <g class="${active ? 'active' : ''}">
          <line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"></line>
          <text x="${mx}" y="${my}">${edge.w}</text>
        </g>
      `;
    }).join('');
    const vertexSvg = graph.labels.map((label, i) => `
      <g class="vertex">
        <circle cx="${positions[i].x}" cy="${positions[i].y}" r="18"></circle>
        <text x="${positions[i].x}" y="${positions[i].y + 5}">${label}</text>
      </g>
    `).join('');
    return `<svg class="pg-graph" viewBox="0 0 ${width} ${height}" role="img" aria-label="Kaalutud graaf">${edgeSvg}${vertexSvg}</svg>`;
  }

  function generateSequentProblem(difficulty) {
    const [a, b, c] = shuffle(['P', 'Q', 'R', 'S']).slice(0, 3);
    const templates = [
      {
        title: 'Konjunktsiooni moodustamine paremal',
        sequent: `${a}, ${b} \\vdash ${a}\\&${b}`,
        finalRule: '\\vdash\\&',
        accepted: ['⊢&', '\\vdash&', 'parem&', '&paremal'],
        steps: [
          `$${a}, ${b} \\vdash ${a}$ aksioomiga.`,
          `$${a}, ${b} \\vdash ${b}$ aksioomiga.`,
          `Rakenda reeglit $(\\vdash\\&)$ ja saad $${a}, ${b} \\vdash ${a}\\&${b}$.`,
        ],
      },
      {
        title: 'Implikatsiooni paremale viimine',
        sequent: `${a} \\vdash ${b}\\Rightarrow ${a}`,
        finalRule: '\\vdash\\Rightarrow',
        accepted: ['⊢⇒', '\\vdash⇒', '\\vdash\\rightarrow', 'parem⇒', '⇒paremal'],
        steps: [
          `$${a}, ${b} \\vdash ${a}$ aksioomiga.`,
          `Rakenda reeglit $(\\vdash\\Rightarrow)$ eelduse $${b}$ eemaldamiseks paremalt moodustatavasse implikatsiooni.`,
          `Saad $${a} \\vdash ${b}\\Rightarrow ${a}$.`,
        ],
      },
      {
        title: 'Modus ponens sekventsina',
        sequent: `${a}\\Rightarrow ${b}, ${a} \\vdash ${b}`,
        finalRule: '\\Rightarrow\\vdash',
        accepted: ['⇒⊢', '\\rightarrow⊢', '\\Rightarrow\\vdash', 'vasak⇒', '⇒vasakul'],
        steps: [
          `$${a}\\Rightarrow ${b}, ${a} \\vdash ${a}$ aksioomiga.`,
          `$${a}\\Rightarrow ${b}, ${a} \\vdash ${a}\\Rightarrow ${b}$ aksioomiga.`,
          `Rakenda reeglit $(\\Rightarrow\\vdash)$ ja järelda $${a}\\Rightarrow ${b}, ${a} \\vdash ${b}$.`,
        ],
      },
      {
        title: 'Konjunktsiooni lahtivõtmine vasakul',
        sequent: `${a}\\&${b} \\vdash ${b}\\&${a}`,
        finalRule: '\\vdash\\&',
        accepted: ['⊢&', '\\vdash&', 'parem&', '&paremal'],
        steps: [
          `$${a}, ${b} \\vdash ${b}$ aksioomiga, seega $(\\&\\vdash)$ annab $${a}\\&${b} \\vdash ${b}$.`,
          `$${a}, ${b} \\vdash ${a}$ aksioomiga, seega $(\\&\\vdash)$ annab $${a}\\&${b} \\vdash ${a}$.`,
          `Rakenda reeglit $(\\vdash\\&)$ ja saad $${a}\\&${b} \\vdash ${b}\\&${a}$.`,
        ],
      },
    ];
    const hard = {
      title: 'Kolme eeldusega konjunktsioon',
      sequent: `${a}\\&${b}, ${c} \\vdash ${c}\\&${b}`,
      finalRule: '\\vdash\\&',
      accepted: ['⊢&', '\\vdash&', 'parem&', '&paremal'],
      steps: [
        `$${a}, ${b}, ${c} \\vdash ${c}$ aksioomiga.`,
        `$${a}\\&${b}, ${c} \\vdash ${c}$ reegliga $(\\&\\vdash)$.`,
        `$${a}, ${b}, ${c} \\vdash ${b}$ aksioomiga, seega $${a}\\&${b}, ${c} \\vdash ${b}$ reegliga $(\\&\\vdash)$.`,
        `Rakenda $(\\vdash\\&)$ ja saad $${a}\\&${b}, ${c} \\vdash ${c}\\&${b}$.`,
      ],
    };
    const pool = difficulty === 'hard' ? [...templates, hard] : templates;
    const item = choice(pool);
    return {
      type: 'sequent',
      skill: 'sequent',
      route: 'sekvents',
      topic: 'Sekvents',
      tag: 'Sekvents',
      title: item.title,
      prompt: `
        <p>Tuleta sekvents 3-4 lühikese sammuga. Kontrolliks sisesta, milline reegel on lahenduse viimane sisuline samm.</p>
        <div class="formula">$${item.sequent}$</div>
      `,
      inputKind: 'text',
      inputLabel: 'Viimane reegel',
      placeholder: 'nt ⊢&, &⊢, ⊢⇒ või ⇒⊢',
      check(value) {
        const actual = normalizeRule(value);
        const ok = item.accepted.some(answer => actual === normalizeRule(answer));
        return ok
          ? { ok: true, text: 'Õige reegel.' }
          : { ok: false, text: 'See ei ole selle tuletuse viimane reegel.' };
      },
      expectedAnswer: item.finalRule,
      answerHtml: `<p><strong>Viimane reegel:</strong> $(${item.finalRule})$</p>`,
      steps: item.steps,
    };
  }

  function renderInput(problem, value = '', disabled = false) {
    if (problem.inputKind === 'yesno') {
      return `
        <label class="grade-field">
          <span>${problem.inputLabel}</span>
          <select id="pgAnswer" ${disabled ? 'disabled' : ''}>
            <option value="">Vali vastus</option>
            <option value="yes" ${value === 'yes' ? 'selected' : ''}>Jah</option>
            <option value="no" ${value === 'no' ? 'selected' : ''}>Ei</option>
          </select>
        </label>
      `;
    }
    return `
      <label class="grade-field">
        <span>${problem.inputLabel}</span>
        <input id="pgAnswer" type="${problem.inputKind === 'number' ? 'number' : 'text'}" placeholder="${escapeHtml(problem.placeholder || '')}" value="${escapeHtml(value)}" autocomplete="off" ${disabled ? 'disabled' : ''}>
      </label>
    `;
  }

  function renderProblem() {
    const host = document.getElementById('pgProblem');
    if (!host || !state.problem) return;
    const problem = state.problem;
    host.innerHTML = `
      <div class="card pg-card">
        <div class="pg-head">
          <div>
            <span class="tag accent">${problem.tag}</span>
            <h2>${problem.title}</h2>
          </div>
          <button class="btn small secondary" id="pgNewInline" type="button">Uus ülesanne</button>
        </div>
        <div class="pg-prompt">${problem.prompt}</div>
        <div class="pg-answer-row">
          ${renderInput(problem, state.lastAnswer, state.attemptSaved)}
          <button class="btn" id="pgCheck" type="button" ${state.attemptSaved ? 'disabled' : ''}>${state.attemptSaved ? 'Kontrollitud' : 'Kontrolli'}</button>
        </div>
        ${state.feedback ? `<div class="mini-feedback show ${state.feedback.ok ? 'good' : 'bad'}"><strong>${state.feedback.ok ? 'Õige' : 'Vaata üle'}</strong><span>${state.feedback.text}</span></div>` : ''}
        <div class="btn-row">
          <button class="btn small secondary" id="pgShowAnswer" type="button">${state.answerShown ? 'Peida vastus' : 'Näita vastust'}</button>
          <button class="btn small secondary" id="pgShowSteps" type="button">${state.stepsShown ? 'Peida sammud' : 'Näita sammud'}</button>
        </div>
        ${state.answerShown ? `<div class="formula-output pg-solution">${problem.answerHtml}</div>` : ''}
        ${state.stepsShown ? `<ol class="steps pg-steps">${problem.steps.map(step => `<li>${step}</li>`).join('')}</ol>` : ''}
      </div>
    `;
    renderMath(host);
    document.getElementById('pgNewInline')?.addEventListener('click', newProblem);
    document.getElementById('pgCheck')?.addEventListener('click', () => {
      const value = document.getElementById('pgAnswer')?.value || '';
      const result = problem.check(value);
      state.lastAnswer = value;
      if (!state.attemptSaved) {
        recordAttempt(problem, value, result);
        const added = addWrongAttemptToJournal(problem, value, result);
        if (added) result.text = `${result.text} Lisatud vigade päevikusse.`;
        state.attemptSaved = true;
      }
      state.feedback = result;
      renderStats();
      renderProblem();
    });
    document.getElementById('pgShowAnswer')?.addEventListener('click', () => {
      state.answerShown = !state.answerShown;
      renderProblem();
    });
    document.getElementById('pgShowSteps')?.addEventListener('click', () => {
      state.stepsShown = !state.stepsShown;
      renderProblem();
    });
  }

  function newProblem() {
    state.problem = generateProblem();
    state.answerShown = false;
    state.stepsShown = false;
    state.feedback = '';
    state.lastAnswer = '';
    state.attemptSaved = false;
    renderProblem();
  }

  function updateGraphControls() {
    const type = document.getElementById('pgType')?.value || 'mixed';
    const group = document.getElementById('pgGraphGroup');
    if (group) group.hidden = !(type === 'graph' || type === 'mixed');
  }

  window.initProblemGenerator = function () {
    const view = document.getElementById('view');
    if (!view) return;
    view.innerHTML = `
      <h1>Ülesannete generaator</h1>
      <p>Vali parameetrid ja kliki "Uus ülesanne". Harjutusi genereeritakse juhuslikult nii kaua, kui jaksad teha.</p>

      <div class="card pg-controls">
        <label class="grade-field">
          <span>Tüüp</span>
          <select id="pgType">
            ${TYPES.map(type => `<option value="${type.id}">${type.label}</option>`).join('')}
          </select>
        </label>
        <label class="grade-field">
          <span>Raskus</span>
          <select id="pgDifficulty">
            ${DIFFICULTIES.map(level => `<option value="${level.id}" ${level.id === 'medium' ? 'selected' : ''}>${level.label}</option>`).join('')}
          </select>
        </label>
        <label class="grade-field" id="pgGraphGroup">
          <span>Graafi algoritm</span>
          <select id="pgGraphAlgorithm">
            ${GRAPH_ALGORITHMS.map(item => `<option value="${item.id}">${item.label}</option>`).join('')}
          </select>
        </label>
        <button class="btn" id="pgNew" type="button">Uus ülesanne</button>
      </div>

      <section class="study-stat-grid pg-stats" id="pgStats"></section>

      <div id="pgProblem"></div>
    `;
    document.getElementById('pgType')?.addEventListener('change', () => {
      updateGraphControls();
      newProblem();
    });
    document.getElementById('pgDifficulty')?.addEventListener('change', newProblem);
    document.getElementById('pgGraphAlgorithm')?.addEventListener('change', newProblem);
    document.getElementById('pgNew')?.addEventListener('click', newProblem);
    updateGraphControls();
    renderStats();
    newProblem();
  };

  window.DMProblemGeneratorStats = {
    read: readStats,
    reset() {
      localStorage.removeItem(STATS_KEY);
      renderStats();
    },
  };
})();

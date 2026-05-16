/* ===== Small interactive tools embedded in theory pages ===== */

(function () {
  'use strict';

  const CHAPTER_NOTES_KEY = 'dm_chapter_notes_v1';
  const TOPIC_CHECK_KEY = 'dm_topic_checks_v1';

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[ch]));
  }

  function parseNumberList(text) {
    return String(text || '')
      .split(/[,\s;]+/)
      .map(x => Number.parseInt(x, 10))
      .filter(Number.isFinite);
  }

  function fmtList(arr) {
    return `(${arr.join(', ')})`;
  }

  function routeLabel(route) {
    const labels = {
      lausearvutus: 'Lausearvutus',
      toesuspuu: 'Tõesuspuu',
      predikaadid: 'Predikaadid',
      signatuur: 'Signatuur',
      samavaarsus: 'Samaväärsus',
      prefikskuju: 'Prefikskuju',
      aksiomaatika: 'Aksiomaatika',
      sekvents: 'Sekvents',
      peano: 'Peano',
      graafid: 'Graafid',
      tipuastmed: 'Tipuastmed',
      ahelad: 'Ahelad',
      sidusus: 'Sidusus',
      isomorfism: 'Isomorfism',
      eulerhamilton: 'Euler ja Hamilton',
      puud: 'Puud',
      toespuud: 'Toespuud',
      suunatud: 'Suunatud graafid',
      luhimtee: 'Lühim tee',
    };
    return labels[route] || route;
  }

  function plainText(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent.replace(/\s+/g, ' ').trim();
  }

  function renderMath(el) {
    if (!window.renderMathInElement || !el) return;
    window.renderMathInElement(el, {
      delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
      throwOnError: false,
    });
  }

  // ---------- Propositional formulas for equivalence checker ----------
  function tokenizeFormula(s) {
    const tokens = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if (s.startsWith('<->', i) || s.startsWith('<=>', i)) { tokens.push({ t: 'iff' }); i += 3; continue; }
      if (s.startsWith('->', i) || s.startsWith('=>', i)) { tokens.push({ t: 'imp' }); i += 2; continue; }
      if (c === '⇔' || c === '↔') { tokens.push({ t: 'iff' }); i++; continue; }
      if (c === '⇒' || c === '→') { tokens.push({ t: 'imp' }); i++; continue; }
      if (c === '¬' || c === '!' || c === '~') { tokens.push({ t: 'not' }); i++; continue; }
      if (c === '&' || c === '∧') { tokens.push({ t: 'and' }); i++; continue; }
      if (c === '|' || c === '∨' || c === '+') { tokens.push({ t: 'or' }); i++; continue; }
      if (c === '(') { tokens.push({ t: 'lp' }); i++; continue; }
      if (c === ')') { tokens.push({ t: 'rp' }); i++; continue; }
      if (/[A-Za-z]/.test(c)) {
        let v = '';
        while (i < s.length && /[A-Za-z0-9_]/.test(s[i])) v += s[i++];
        tokens.push({ t: 'var', v });
        continue;
      }
      throw new Error(`Tundmatu sümbol "${c}" positsioonil ${i}.`);
    }
    return tokens;
  }

  function parseFormula(tokens) {
    let pos = 0;
    const peek = () => tokens[pos];
    const eat = () => tokens[pos++];
    function expect(t) {
      const tok = peek();
      if (!tok || tok.t !== t) throw new Error(`Oodati ${t}, sain ${tok ? tok.t : 'lõppu'}.`);
      return eat();
    }
    function parseIff() {
      let left = parseImp();
      while (peek() && peek().t === 'iff') { eat(); left = { op: 'iff', a: left, b: parseImp() }; }
      return left;
    }
    function parseImp() {
      const left = parseOr();
      if (peek() && peek().t === 'imp') { eat(); return { op: 'imp', a: left, b: parseImp() }; }
      return left;
    }
    function parseOr() {
      let left = parseAnd();
      while (peek() && peek().t === 'or') { eat(); left = { op: 'or', a: left, b: parseAnd() }; }
      return left;
    }
    function parseAnd() {
      let left = parseNot();
      while (peek() && peek().t === 'and') { eat(); left = { op: 'and', a: left, b: parseNot() }; }
      return left;
    }
    function parseNot() {
      if (peek() && peek().t === 'not') { eat(); return { op: 'not', a: parseNot() }; }
      return parseAtom();
    }
    function parseAtom() {
      const tok = peek();
      if (!tok) throw new Error('Ootamatu valemilõpp.');
      if (tok.t === 'lp') { eat(); const ast = parseIff(); expect('rp'); return ast; }
      if (tok.t === 'var') { eat(); return { op: 'var', v: tok.v }; }
      throw new Error('Ootamatu sümbol.');
    }
    const ast = parseIff();
    if (pos < tokens.length) throw new Error('Ootamatu sümbol valemi lõpus.');
    return ast;
  }

  function collectVars(ast, out = new Set()) {
    if (!ast) return out;
    if (ast.op === 'var') out.add(ast.v);
    collectVars(ast.a, out);
    collectVars(ast.b, out);
    return out;
  }

  function evalFormula(ast, env) {
    switch (ast.op) {
      case 'var': return Boolean(env[ast.v]);
      case 'not': return !evalFormula(ast.a, env);
      case 'and': return evalFormula(ast.a, env) && evalFormula(ast.b, env);
      case 'or': return evalFormula(ast.a, env) || evalFormula(ast.b, env);
      case 'imp': return !evalFormula(ast.a, env) || evalFormula(ast.b, env);
      case 'iff': return evalFormula(ast.a, env) === evalFormula(ast.b, env);
      default: return false;
    }
  }

  function initEquivalenceTool() {
    const root = document.getElementById('equivalenceTool');
    if (!root) return;
    root.innerHTML = `
      <h3>Samaväärsuse kontrollija</h3>
      <p>Sisesta kaks lausearvutuse valemit. Tööriist võrdleb neid kõigil väärtustustel ja leiab vajadusel vastunäite.</p>
      <div class="topic-tool-grid">
        <label class="grade-field"><span>Valem F</span><input id="equivLeft" type="text" value="!(A & B)"></label>
        <label class="grade-field"><span>Valem G</span><input id="equivRight" type="text" value="!A | !B"></label>
      </div>
      <div class="btn-row">
        <button class="btn small" id="equivCheck" type="button">Kontrolli</button>
        <button class="btn small secondary" data-equiv-example="imp" type="button">Implikatsioon</button>
        <button class="btn small secondary" data-equiv-example="bad" type="button">Vastunäide</button>
      </div>
      <div id="equivResult"></div>
    `;

    const examples = {
      imp: ['A -> B', '!A | B'],
      bad: ['A -> B', 'B -> A'],
    };
    root.querySelectorAll('[data-equiv-example]').forEach(btn => {
      btn.addEventListener('click', () => {
        const [left, right] = examples[btn.dataset.equivExample];
        root.querySelector('#equivLeft').value = left;
        root.querySelector('#equivRight').value = right;
        check();
      });
    });
    root.querySelector('#equivCheck').addEventListener('click', check);
    root.querySelectorAll('input').forEach(input => input.addEventListener('keydown', e => {
      if (e.key === 'Enter') check();
    }));

    function check() {
      const out = root.querySelector('#equivResult');
      try {
        const left = parseFormula(tokenizeFormula(root.querySelector('#equivLeft').value));
        const right = parseFormula(tokenizeFormula(root.querySelector('#equivRight').value));
        const vars = [...new Set([...collectVars(left), ...collectVars(right)])].sort();
        const rows = [];
        let equivalent = true;
        for (let mask = 0; mask < 2 ** vars.length; mask++) {
          const env = {};
          vars.forEach((v, i) => { env[v] = Boolean(mask & (1 << (vars.length - i - 1))); });
          const l = evalFormula(left, env);
          const r = evalFormula(right, env);
          if (l !== r) equivalent = false;
          rows.push({ env, l, r });
        }
        const counter = rows.find(row => row.l !== row.r);
        out.innerHTML = `
          <div class="topic-tool-result ${equivalent ? 'good' : 'warn'}">
            <strong>${equivalent ? 'Valemid on samaväärsed.' : 'Valemid ei ole samaväärsed.'}</strong>
            <span>${counter ? `Vastunäide: ${vars.map(v => `${v}=${counter.env[v] ? 1 : 0}`).join(', ')}` : `Kontrollitud ${rows.length} väärtustust.`}</span>
          </div>
          <div class="topic-table-wrap">
            <table class="truth-table">
              <thead><tr>${vars.map(v => `<th>${v}</th>`).join('')}<th>F</th><th>G</th></tr></thead>
              <tbody>${rows.map(row => `<tr>${vars.map(v => `<td>${row.env[v] ? 1 : 0}</td>`).join('')}<td class="${row.l ? 'val-1' : 'val-0'}">${row.l ? 1 : 0}</td><td class="${row.r ? 'val-1' : 'val-0'}">${row.r ? 1 : 0}</td></tr>`).join('')}</tbody>
            </table>
          </div>
        `;
      } catch (err) {
        out.innerHTML = `<div class="topic-tool-result bad">${err.message}</div>`;
      }
    }
    check();
  }

  // ---------- Quantifier model ----------
  function initQuantifierModelTool() {
    const root = document.getElementById('quantifierModelTool');
    if (!root) return;
    const domain = [0, 1, 2];
    root.innerHTML = `
      <h3>Kvantorite lõplik mudel</h3>
      <p>Vali, milliste elementide korral $P(x)$ kehtib ja millised paarid kuuluvad seosesse $R(x,y)$. Seejärel näed, kuidas kvantorite järjekord tulemust muudab.</p>
      <div class="topic-tool-grid">
        <div>
          <h4>Predikaat P</h4>
          <div class="predicate-picks">
            ${domain.map(x => `<label><input type="checkbox" data-p="${x}" ${x < 2 ? 'checked' : ''}> P(${x})</label>`).join('')}
          </div>
        </div>
        <div>
          <h4>Seos R(x,y)</h4>
          <div class="relation-grid">
            ${domain.map(x => domain.map(y => `<label><input type="checkbox" data-r="${x},${y}" ${(y > x) ? 'checked' : ''}> ${x},${y}</label>`).join('')).join('')}
          </div>
        </div>
      </div>
      <div class="btn-row">
        <button class="btn small secondary" data-model-preset="greater" type="button">R: y &gt; x</button>
        <button class="btn small secondary" data-model-preset="constant" type="button">R: alati y=2</button>
        <button class="btn small secondary" data-model-preset="empty" type="button">Tühi R</button>
      </div>
      <div id="quantifierModelResult"></div>
    `;

    root.querySelectorAll('input').forEach(input => input.addEventListener('change', render));
    root.querySelectorAll('[data-model-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.dataset.modelPreset;
        root.querySelectorAll('[data-r]').forEach(input => {
          const [x, y] = input.dataset.r.split(',').map(Number);
          input.checked = preset === 'greater' ? y > x : preset === 'constant' ? y === 2 : false;
        });
        render();
      });
    });

    function p(x) {
      return root.querySelector(`[data-p="${x}"]`).checked;
    }
    function r(x, y) {
      return root.querySelector(`[data-r="${x},${y}"]`).checked;
    }
    function every(xs, fn) { return xs.every(fn); }
    function some(xs, fn) { return xs.some(fn); }
    function tag(value) {
      return `<span class="tag ${value ? 'good' : 'bad'}">${value ? 'tõene' : 'väär'}</span>`;
    }
    function render() {
      const statements = [
        ['$\\forall x P(x)$', every(domain, p), 'Kõik elemendid peavad olema P sees.'],
        ['$\\exists x P(x)$', some(domain, p), 'Piisab ühest P-elemendist.'],
        ['$\\forall x\\exists y R(x,y)$', every(domain, x => some(domain, y => r(x, y))), 'Iga x jaoks võib y olla erinev.'],
        ['$\\exists y\\forall x R(x,y)$', some(domain, y => every(domain, x => r(x, y))), 'Üks sama y peab sobima kõigi x jaoks.'],
        ['$\\forall x(P(x)\\Rightarrow\\exists y R(x,y))$', every(domain, x => !p(x) || some(domain, y => r(x, y))), 'Nõue rakendub ainult P-elementidele.'],
      ];
      root.querySelector('#quantifierModelResult').innerHTML = `
        <table>
          <thead><tr><th>Valem</th><th>Tulemus</th><th>Märkus</th></tr></thead>
          <tbody>${statements.map(([formula, value, note]) => `<tr><td>${formula}</td><td>${tag(value)}</td><td>${note}</td></tr>`).join('')}</tbody>
        </table>
      `;
      renderMath(root.querySelector('#quantifierModelResult'));
    }
    render();
  }

  function initPredicateModelBuilder() {
    const root = document.getElementById('predicateModelBuilder');
    if (!root) return;
    root.innerHTML = `
      <h3>Predikaadiloogika mudeli ehitaja</h3>
      <p>Ehita väike mudel predikaatidega $P$, $Q$ ja seosega $R$. Vali valem ning kontrolli, kas see on mudelis tõene.</p>
      <div class="topic-tool-grid">
        <label class="grade-field">
          <span>Põhihulga suurus</span>
          <select id="modelSize">
            <option value="3" selected>3 elementi: 0,1,2</option>
            <option value="4">4 elementi: 0,1,2,3</option>
          </select>
        </label>
        <label class="grade-field">
          <span>Valem</span>
          <select id="modelFormula">
            <option value="allPimpQ">∀x(P(x) ⇒ Q(x))</option>
            <option value="counterPnotQ">∃x(P(x) & ¬Q(x))</option>
            <option value="allExistsR">∀x∃yR(x,y)</option>
            <option value="existsAllR">∃y∀xR(x,y)</option>
            <option value="pNeedsRQ">∀x(P(x) ⇒ ∃y(R(x,y) & Q(y)))</option>
          </select>
        </label>
      </div>
      <div id="predicateModelControls"></div>
      <div class="btn-row">
        <button class="btn small" id="modelEvaluate" type="button">Kontrolli valemit</button>
        <button class="btn small secondary" id="modelPresetChain" type="button">Näidis: ahel</button>
        <button class="btn small secondary" id="modelPresetCounter" type="button">Näidis: kontranäide</button>
      </div>
      <div id="predicateModelResult"></div>
    `;

    const state = { size: 3, p: new Set([0, 1]), q: new Set([1, 2]), r: new Set(['0,1', '1,2']) };

    function domain() {
      return Array.from({ length: state.size }, (_, i) => i);
    }
    function key(x, y) { return `${x},${y}`; }
    function p(x) { return state.p.has(x); }
    function q(x) { return state.q.has(x); }
    function r(x, y) { return state.r.has(key(x, y)); }
    function every(fn) { return domain().every(fn); }
    function some(fn) { return domain().some(fn); }

    function formulaValue() {
      const selected = root.querySelector('#modelFormula').value;
      if (selected === 'allPimpQ') return {
        value: every(x => !p(x) || q(x)),
        witness: domain().find(x => p(x) && !q(x)),
        note: 'Vääraks teeb P-element, mis ei ole Q-element.',
      };
      if (selected === 'counterPnotQ') return {
        value: some(x => p(x) && !q(x)),
        witness: domain().find(x => p(x) && !q(x)),
        note: 'Tõeseks teeb element, millel P kehtib ja Q ei kehti.',
      };
      if (selected === 'allExistsR') return {
        value: every(x => some(y => r(x, y))),
        witness: domain().find(x => !some(y => r(x, y))),
        note: 'Igal real peab olema vähemalt üks märgitud R-paar.',
      };
      if (selected === 'existsAllR') return {
        value: some(y => every(x => r(x, y))),
        witness: domain().find(y => every(x => r(x, y))),
        note: 'Üks veerg peab olema täielikult märgitud.',
      };
      return {
        value: every(x => !p(x) || some(y => r(x, y) && q(y))),
        witness: domain().find(x => p(x) && !some(y => r(x, y) && q(y))),
        note: 'Igal P-elemendil peab olema R-seose kaudu mõni Q-element.',
      };
    }

    function renderControls() {
      const xs = domain();
      root.querySelector('#predicateModelControls').innerHTML = `
        <div class="topic-tool-grid">
          <div>
            <h4>Predikaat P</h4>
            <div class="predicate-picks">${xs.map(x => `<label><input type="checkbox" data-model-p="${x}" ${p(x) ? 'checked' : ''}> P(${x})</label>`).join('')}</div>
          </div>
          <div>
            <h4>Predikaat Q</h4>
            <div class="predicate-picks">${xs.map(x => `<label><input type="checkbox" data-model-q="${x}" ${q(x) ? 'checked' : ''}> Q(${x})</label>`).join('')}</div>
          </div>
          <div>
            <h4>Seos R(x,y)</h4>
            <div class="relation-grid model-relation-grid">${xs.map(x => xs.map(y => `<label><input type="checkbox" data-model-r="${x},${y}" ${r(x, y) ? 'checked' : ''}> ${x},${y}</label>`).join('')).join('')}</div>
          </div>
        </div>
      `;
      root.querySelectorAll('[data-model-p]').forEach(input => input.addEventListener('change', () => {
        const x = Number(input.dataset.modelP);
        input.checked ? state.p.add(x) : state.p.delete(x);
        renderResult();
      }));
      root.querySelectorAll('[data-model-q]').forEach(input => input.addEventListener('change', () => {
        const x = Number(input.dataset.modelQ);
        input.checked ? state.q.add(x) : state.q.delete(x);
        renderResult();
      }));
      root.querySelectorAll('[data-model-r]').forEach(input => input.addEventListener('change', () => {
        input.checked ? state.r.add(input.dataset.modelR) : state.r.delete(input.dataset.modelR);
        renderResult();
      }));
      renderResult();
    }

    function renderResult() {
      const result = formulaValue();
      const detail = result.witness === undefined
        ? 'Sobivat vastunäidet/tunnistajat ei ole vaja.'
        : `Tunnistaja või vastunäide: ${result.witness}.`;
      root.querySelector('#predicateModelResult').innerHTML = `
        <div class="topic-tool-result ${result.value ? 'good' : 'bad'}">
          <strong>Valem on selles mudelis ${result.value ? 'tõene' : 'väär'}.</strong>
          <span>${result.note} ${detail}</span>
        </div>
      `;
    }

    root.querySelector('#modelSize').addEventListener('change', e => {
      state.size = Number(e.target.value);
      state.p = new Set([...state.p].filter(x => x < state.size));
      state.q = new Set([...state.q].filter(x => x < state.size));
      state.r = new Set([...state.r].filter(pair => pair.split(',').every(v => Number(v) < state.size)));
      renderControls();
    });
    root.querySelector('#modelFormula').addEventListener('change', renderResult);
    root.querySelector('#modelEvaluate').addEventListener('click', renderResult);
    root.querySelector('#modelPresetChain').addEventListener('click', () => {
      state.p = new Set(domain().slice(0, -1));
      state.q = new Set(domain().slice(1));
      state.r = new Set(domain().slice(0, -1).map(x => key(x, x + 1)));
      renderControls();
    });
    root.querySelector('#modelPresetCounter').addEventListener('click', () => {
      state.p = new Set([0]);
      state.q = new Set([]);
      state.r = new Set([]);
      renderControls();
    });

    renderControls();
    renderMath(root);
  }

  // ---------- Degree sequences ----------
  function havelHakimi(seq) {
    const steps = [];
    let current = [...seq].sort((a, b) => b - a);
    while (current.length && current.some(x => x !== 0)) {
      steps.push([...current]);
      if (current.some(x => x < 0) || current[0] >= current.length) {
        return { ok: false, steps, reason: 'Suurim aste on liiga suur või tekkis negatiivne aste.' };
      }
      const d = current.shift();
      for (let i = 0; i < d; i++) current[i] -= 1;
      current = current.sort((a, b) => b - a);
    }
    steps.push([...current]);
    return { ok: true, steps, reason: 'Järjend taandus nulljärjendiks.' };
  }

  function initDegreeSequenceTool() {
    const root = document.getElementById('degreeSequenceTool');
    if (!root) return;
    let activeStep = 0;
    root.innerHTML = `
      <h3>Havel-Hakimi visualiseering</h3>
      <p>Sisesta astmejärjend ja liigu samm-sammult läbi taandamise. Igas sammus eemaldatakse suurim aste ja lahutatakse 1 järgmistest astmetest.</p>
      <div class="input-row">
        <input id="degreeSequenceInput" type="text" value="4, 3, 3, 2, 2, 1, 1">
        <button class="btn" id="degreeSequenceCheck" type="button">Kontrolli</button>
      </div>
      <div class="btn-row">
        <button class="btn small secondary" id="degreePrev" type="button">Eelmine samm</button>
        <button class="btn small secondary" id="degreeNext" type="button">Järgmine samm</button>
      </div>
      <div id="degreeSequenceResult"></div>
    `;
    root.querySelector('#degreeSequenceCheck').addEventListener('click', () => { activeStep = 0; render(); });
    root.querySelector('#degreeSequenceInput').addEventListener('keydown', e => { if (e.key === 'Enter') { activeStep = 0; render(); } });
    root.querySelector('#degreePrev').addEventListener('click', () => { activeStep = Math.max(0, activeStep - 1); render(); });
    root.querySelector('#degreeNext').addEventListener('click', () => { activeStep += 1; render(); });
    function render() {
      const seq = parseNumberList(root.querySelector('#degreeSequenceInput').value);
      const out = root.querySelector('#degreeSequenceResult');
      if (!seq.length) {
        out.innerHTML = '<div class="topic-tool-result bad">Sisesta vähemalt üks aste.</div>';
        return;
      }
      const n = seq.length;
      const sum = seq.reduce((a, b) => a + b, 0);
      const simpleBounds = seq.every(d => d >= 0 && d < n);
      const even = sum % 2 === 0;
      const hh = simpleBounds && even ? havelHakimi(seq) : { ok: false, steps: [], reason: 'Lihtgraafi jaoks peavad astmed olema vahemikus 0...n-1 ja summa peab olema paaris.' };
      activeStep = Math.min(activeStep, Math.max(0, hh.steps.length - 1));
      const currentStep = hh.steps[activeStep] || [];
      const maxDegree = Math.max(1, ...currentStep);
      out.innerHTML = `
        <div class="topic-tool-result ${hh.ok ? 'good' : 'bad'}">
          <strong>${hh.ok ? 'Jah, see on graafiline järjend.' : 'Ei, see ei saa olla lihtgraafi astmejärjend.'}</strong>
          <span>n=${n}, astmete summa ${sum}, servade arv ${even ? sum / 2 : 'pole täisarv'}.</span>
        </div>
        <div class="hh-visual">
          <div class="hh-visual-head">
            <strong>Samm ${hh.steps.length ? activeStep + 1 : 0} / ${hh.steps.length}</strong>
            <span>${activeStep === 0 ? 'Algjärjend' : 'Pärast taandamist'}</span>
          </div>
          <div class="hh-bars">
            ${currentStep.map((degree, index) => `
              <div class="hh-bar-row">
                <span>v${index + 1}</span>
                <div class="hh-bar-track"><div class="hh-bar" style="width:${Math.round(100 * degree / maxDegree)}%"></div></div>
                <strong>${degree}</strong>
              </div>
            `).join('')}
          </div>
        </div>
        <ol class="topic-steps">
          ${hh.steps.map((step, index) => `<li class="${index === activeStep ? 'active' : ''}">${fmtList(step)}</li>`).join('')}
        </ol>
        <p class="muted">${hh.reason}</p>
      `;
    }
    render();
  }

  function initEulerHamiltonTool() {
    const root = document.getElementById('eulerHamiltonTool');
    if (!root) return;
    root.innerHTML = `
      <h3>Euleri ja Diraci tingimuste kontrollija</h3>
      <p>Sisesta sidusa lihtgraafi astmed. Tööriist eristab Euleri tarvilikku ja piisavat tingimust ning Diraci piisavat Hamiltoni tingimust.</p>
      <div class="topic-tool-grid">
        <label class="grade-field"><span>Astmed</span><input id="eulerDegrees" type="text" value="2, 2, 2, 2, 2"></label>
        <label class="grade-check"><input id="eulerConnected" type="checkbox" checked><span>Graaf on sidus</span></label>
      </div>
      <button class="btn small" id="eulerCheck" type="button">Kontrolli</button>
      <div id="eulerResult"></div>
    `;
    root.querySelector('#eulerCheck').addEventListener('click', render);
    root.querySelector('#eulerConnected').addEventListener('change', render);
    root.querySelector('#eulerDegrees').addEventListener('keydown', e => { if (e.key === 'Enter') render(); });
    function render() {
      const degs = parseNumberList(root.querySelector('#eulerDegrees').value);
      const connected = root.querySelector('#eulerConnected').checked;
      const n = degs.length;
      const odd = degs.filter(d => d % 2 !== 0).length;
      const min = Math.min(...degs);
      const eulerCycle = connected && odd === 0 && n > 0;
      const eulerTrail = connected && (odd === 0 || odd === 2) && n > 0;
      const dirac = n >= 3 && min >= n / 2;
      root.querySelector('#eulerResult').innerHTML = `
        <div class="topic-result-grid">
          <div class="topic-tool-result ${eulerCycle ? 'good' : 'warn'}"><strong>Euleri graaf</strong><span>${eulerCycle ? 'jah, kinnine Euleri ahel leidub' : 'ei saa järeldada / tingimus ei täitu'}</span></div>
          <div class="topic-tool-result ${eulerTrail ? 'good' : 'warn'}"><strong>Euleri ahel</strong><span>${eulerTrail ? 'leidub Euleri ahel' : 'ei leidu Euleri ahelat'}</span></div>
          <div class="topic-tool-result ${dirac ? 'good' : 'warn'}"><strong>Diraci tingimus</strong><span>${dirac ? 'täidetud, graaf on Hamiltoni graaf' : 'ei täitu; Hamiltoni graaf võib siiski olla'}</span></div>
        </div>
        <p class="muted">Paaritu astmega tippe: ${odd}. Minimaalne aste: ${Number.isFinite(min) ? min : '-'}. Diraci piir: n/2 = ${n / 2}.</p>
      `;
    }
    render();
  }

  function initTreePropertyTool() {
    const root = document.getElementById('treePropertyTool');
    if (!root) return;
    root.innerHTML = `
      <h3>Puu omaduste kontrollija</h3>
      <p>Katseta puu karakteriseeringuid arvude peal.</p>
      <div class="topic-tool-grid">
        <label class="grade-field"><span>Tippude arv n</span><input id="treeN" type="number" min="1" value="7"></label>
        <label class="grade-field"><span>Servade arv m</span><input id="treeM" type="number" min="0" value="6"></label>
        <label class="grade-check"><input id="treeConnected" type="checkbox" checked><span>Sidus</span></label>
        <label class="grade-check"><input id="treeAcyclic" type="checkbox" checked><span>Tsükliteta</span></label>
      </div>
      <button class="btn small" id="treeCheck" type="button">Kontrolli</button>
      <div id="treePropertyResult"></div>
    `;
    root.querySelectorAll('input').forEach(input => input.addEventListener('input', render));
    root.querySelector('#treeCheck').addEventListener('click', render);
    function render() {
      const n = Number(root.querySelector('#treeN').value);
      const m = Number(root.querySelector('#treeM').value);
      const connected = root.querySelector('#treeConnected').checked;
      const acyclic = root.querySelector('#treeAcyclic').checked;
      const edgeCountOk = m === n - 1;
      const treeByConnected = connected && edgeCountOk;
      const treeByAcyclic = acyclic && edgeCountOk;
      const definitelyTree = connected && acyclic && edgeCountOk;
      root.querySelector('#treePropertyResult').innerHTML = `
        <div class="topic-result-grid">
          <div class="topic-tool-result ${edgeCountOk ? 'good' : 'warn'}"><strong>m = n - 1</strong><span>${m} ${edgeCountOk ? '=' : '≠'} ${n - 1}</span></div>
          <div class="topic-tool-result ${treeByConnected ? 'good' : 'warn'}"><strong>Sidus + n-1 serva</strong><span>${treeByConnected ? 'järelikult puu' : 'tingimus ei täitu'}</span></div>
          <div class="topic-tool-result ${treeByAcyclic ? 'good' : 'warn'}"><strong>Tsükliteta + n-1 serva</strong><span>${treeByAcyclic ? 'järelikult puu' : 'tingimus ei täitu'}</span></div>
          <div class="topic-tool-result ${definitelyTree ? 'good' : 'bad'}"><strong>Kokkuvõte</strong><span>${definitelyTree ? 'sisestatud info kirjeldab puud' : 'sisestatud info ei kirjelda kindlalt puud'}</span></div>
        </div>
      `;
    }
    render();
  }

  const SEQUENT_EXAMPLES = [
    {
      id: 'swap',
      title: '$P\\&Q \\vdash Q\\&P$',
      goal: 'Konjunktsiooni järjekorra vahetamine.',
      start: '$P\\&Q \\vdash Q\\&P$',
      steps: [
        {
          rule: '&⊢',
          sequent: '$P,Q \\vdash Q\\&P$',
          explanation: 'Vasakul oleva konjunktsiooni võib asendada mõlema komponendiga.',
        },
        {
          rule: '⊢&',
          sequent: '$P,Q \\vdash Q$ ja $P,Q \\vdash P$',
          explanation: 'Paremal konjunktsiooni tõestamiseks tuleb tõestada mõlemad pooled.',
        },
        {
          rule: 'Aksioom',
          sequent: '$Q \\vdash Q$ ja $P \\vdash P$',
          explanation: 'Mõlemad harud lõpevad aksioomiga; lisatingimused eesliikmes on lubatud nõrgestamisega.',
        },
      ],
    },
    {
      id: 'modus',
      title: '$P\\Rightarrow Q, P \\vdash Q$',
      goal: 'Modus ponensi tuletus sekventsireeglitega.',
      start: '$P\\Rightarrow Q, P \\vdash Q$',
      steps: [
        {
          rule: '⇒⊢',
          sequent: '$P \\vdash P$ ja $Q,P \\vdash Q$',
          explanation: 'Implikatsioon vasakul tekitab kaks alamsekventsi: eelduse tõestamine ja järelduse kasutamine.',
        },
        {
          rule: 'Aksioom',
          sequent: '$P \\vdash P$ ning $Q \\vdash Q$',
          explanation: 'Mõlemad alamsekventsid sulguvad aksioomidega.',
        },
      ],
    },
    {
      id: 'demorgan',
      title: '$\\neg(P\\lor Q) \\vdash \\neg P\\&\\neg Q$',
      goal: 'De Morgani suund sekventsiaalselt.',
      start: '$\\neg(P\\lor Q) \\vdash \\neg P\\&\\neg Q$',
      steps: [
        {
          rule: '⊢&',
          sequent: '$\\neg(P\\lor Q) \\vdash \\neg P$ ja $\\neg(P\\lor Q) \\vdash \\neg Q$',
          explanation: 'Paremal konjunktsioon jagab eesmärgi kaheks haruks.',
        },
        {
          rule: '⊢¬',
          sequent: '$\\neg(P\\lor Q),P \\vdash$ ja $\\neg(P\\lor Q),Q \\vdash$',
          explanation: 'Paremal oleva eituse tõestamiseks vii eitatav valem vasakule.',
        },
        {
          rule: '¬⊢',
          sequent: '$P \\vdash P\\lor Q$ ja $Q \\vdash P\\lor Q$',
          explanation: 'Vasakul olev eitus muudab eesmärgi vastuolu näitamiseks.',
        },
        {
          rule: '⊢∨',
          sequent: '$P \\vdash P$ ja $Q \\vdash Q$',
          explanation: 'Paremal disjunktsiooni saamiseks piisab vastavast poolest.',
        },
        {
          rule: 'Aksioom',
          sequent: '$P \\vdash P$ ning $Q \\vdash Q$',
          explanation: 'Lõpuks on mõlemad harud aksioomid.',
        },
      ],
    },
  ];

  function sequentLabel(mathText) {
    return mathText
      .replace(/\$/g, '')
      .replace(/\\&/g, '&')
      .replace(/\\vdash/g, '⊢')
      .replace(/\\Rightarrow/g, '⇒')
      .replace(/\\lor/g, '∨')
      .replace(/\\neg/g, '¬');
  }

  function initSequentHelperTool() {
    const view = document.getElementById('view');
    if (!view || document.getElementById('sequentHelperTool')) return;

    const section = document.createElement('section');
    section.className = 'card topic-tool sequent-helper';
    section.id = 'sequentHelperTool';
    view.appendChild(section);

    let exampleId = SEQUENT_EXAMPLES[0].id;
    let step = 0;
    let feedback = 'Vali reegel ja rakenda seda järgmise sammu jaoks.';
    const rules = ['Aksioom', '&⊢', '⊢&', '⇒⊢', '⊢⇒', '∨⊢', '⊢∨', '¬⊢', '⊢¬'];

    function currentExample() {
      return SEQUENT_EXAMPLES.find(example => example.id === exampleId) || SEQUENT_EXAMPLES[0];
    }

    function render() {
      const example = currentExample();
      const expected = example.steps[step];
      section.innerHTML = `
        <h3>Sekventsiaalse tuletuse abimees</h3>
        <p>Harjuta reegli valimist puuvormis tuletuse järgmise sammu jaoks. Vali näide, siis proovi sammud õiges järjekorras läbi.</p>
        <div class="topic-tool-grid">
          <label class="grade-field">
            <span>Näide</span>
            <select id="seqExample">
              ${SEQUENT_EXAMPLES.map(item => `<option value="${item.id}" ${item.id === example.id ? 'selected' : ''}>${sequentLabel(item.title)}</option>`).join('')}
            </select>
          </label>
          <label class="grade-field">
            <span>Järgmine reegel</span>
            <select id="seqRule">
              ${rules.map(rule => `<option value="${rule}">${rule}</option>`).join('')}
            </select>
          </label>
        </div>
        <div class="sequent-goal">
          <strong>Eesmärk:</strong>
          <span>${example.title}</span>
          <small>${example.goal}</small>
        </div>
        <div class="btn-row">
          <button class="btn small" id="seqApply" type="button" ${expected ? '' : 'disabled'}>Rakenda reegel</button>
          <button class="btn small secondary" id="seqReset" type="button">Lähtesta</button>
        </div>
        <div class="sequent-feedback ${expected ? '' : 'done'}">${escapeHtml(feedback)}</div>
        <ol class="topic-steps sequent-steps">
          <li class="active"><strong>Algus:</strong> ${example.start}</li>
          ${example.steps.map((item, index) => `
            <li class="${index < step ? 'complete' : index === step ? 'active' : ''}">
              <strong>${item.rule}</strong>: ${index < step ? item.sequent : index === step ? 'vali see samm järgmisena' : 'ootab'}
              ${index < step ? `<small>${item.explanation}</small>` : ''}
            </li>
          `).join('')}
        </ol>
        ${expected ? `<p class="muted">Järgmise sammu vihje: ${expected.explanation}</p>` : '<div class="topic-tool-result good"><strong>Tuletus on valmis.</strong><span>Kõik harud jõudsid aksioomideni.</span></div>'}
      `;

      section.querySelector('#seqExample').addEventListener('change', event => {
        exampleId = event.target.value;
        step = 0;
        feedback = 'Uus näide valitud. Alusta esimesest reeglist.';
        render();
      });
      section.querySelector('#seqApply')?.addEventListener('click', () => {
        const selected = section.querySelector('#seqRule').value;
        const next = currentExample().steps[step];
        if (!next) return;
        if (selected === next.rule) {
          step += 1;
          feedback = `Õige: ${next.rule}. ${next.explanation}`;
        } else {
          feedback = `Praegu ei sobi ${selected}. Vaata, milline tehtemärk on sekventsi põhikohal.`;
        }
        render();
      });
      section.querySelector('#seqReset').addEventListener('click', () => {
        step = 0;
        feedback = 'Tuletus lähtestatud.';
        render();
      });
      renderMath(section);
    }

    render();
  }

  const TOPIC_EXERCISES = {
    lausearvutus: [
      {
        title: 'Modus ponens väärtustuste kaudu',
        prompt: 'Näita, et valemitest $A\\Rightarrow B$ ja $A$ järeldub valem $B$.',
        solution: `
          <p>Järeldumise kontrollimiseks vaatame ainult väärtustusi, millel eeldused on tõesed.</p>
          <p>Kui $A\\Rightarrow B$ on tõene ja $A$ on tõene, siis implikatsiooni tõeväärtuse definitsiooni järgi ei saa $B$ olla väär. Järelikult peab $B$ olema tõene.</p>
          <p>Seega $A\\Rightarrow B, A \\models B$.</p>
        `,
      },
    ],
    toesuspuu: [
      {
        title: 'Vastuolu leidmine tõesuspuuga',
        prompt: 'Kontrolli tõesuspuu ideega, kas valemihulk $\\{P\\Rightarrow Q, P, \\neg Q\\}$ on kehtestatav.',
        solution: `
          <p>Kirjuta haru algusesse $P\\Rightarrow Q$, $P$ ja $\\neg Q$.</p>
          <p>Implikatsioon $P\\Rightarrow Q$ hargneb kaheks: $\\neg P$ või $Q$.</p>
          <p>Esimeses harus on korraga $P$ ja $\\neg P$, teises harus $Q$ ja $\\neg Q$. Mõlemad harud sulguvad, seega valemihulk ei ole kehtestatav.</p>
        `,
      },
    ],
    predikaadid: [
      {
        title: 'Kvantorite järjekord lõplikus mudelis',
        prompt: 'Olgu põhihulk $M=\\{0,1\\}$ ja $R(x,y)$ tähendagu $x<y$. Leia valemite $\\forall x\\exists yR(x,y)$ ja $\\exists y\\forall xR(x,y)$ tõeväärtus.',
        solution: `
          <p>$\\forall x\\exists yR(x,y)$ on väär, sest $x=1$ korral ei leidu põhihulgas elementi $y$, mille korral $1<y$.</p>
          <p>$\\exists y\\forall xR(x,y)$ on samuti väär. Kui $y=0$, siis $0<0$ ei kehti; kui $y=1$, siis $1<1$ ei kehti.</p>
          <p>Näide näitab, et kvantorite järjekorda ei saa vabalt vahetada.</p>
        `,
      },
    ],
    signatuur: [
      {
        title: 'Väite väljendamine signatuuris',
        prompt: 'Signatuuris $\\langle 0; +; =, <\\rangle$ üle naturaalarvude väljenda väide: "$x$ on positiivne paarisarv".',
        solution: `
          <p>Positiivsus tähendab $0<x$.</p>
          <p>Paarisus tähendab, et leidub $y$, mille korral $x=y+y$.</p>
          <p>Üks sobiv valem on $0<x\\ \\&\\ \\exists y(x=y+y)$.</p>
        `,
      },
    ],
    samavaarsus: [
      {
        title: 'De Morgani seaduse kontroll',
        prompt: 'Näita tõeväärtuste abil, et $\\neg(A\\&B)\\equiv \\neg A\\lor\\neg B$.',
        solution: `
          <p>Kui $A=1$ ja $B=1$, siis vasak pool on $\\neg1=0$ ning parem pool $0\\lor0=0$.</p>
          <p>Kõigis ülejäänud kolmes väärtustuses on vähemalt üks muutujatest väär, seega $A\\&B=0$ ja vasak pool on tõene. Samal ajal on vähemalt üks valemitest $\\neg A$, $\\neg B$ tõene, seega ka parem pool on tõene.</p>
          <p>Poolte tõeväärtused langevad igal väärtustusel kokku, järelikult on valemid samaväärsed.</p>
        `,
      },
    ],
    prefikskuju: [
      {
        title: 'Lihtne prefikskujule viimine',
        prompt: 'Vii valem $\\neg\\exists x(P(x)\\Rightarrow \\exists yQ(x,y))$ prefikskujule.',
        solution: `
          <p>Kõigepealt $\\neg\\exists xF$ muutub kujule $\\forall x\\neg F$.</p>
          <p>Saame $\\forall x\\neg(P(x)\\Rightarrow \\exists yQ(x,y))$. Kasutame $\\neg(A\\Rightarrow B)\\equiv A\\&\\neg B$.</p>
          <p>Tulemus on $\\forall x(P(x)\\&\\neg\\exists yQ(x,y))$, seega $\\forall x\\forall y(P(x)\\&\\neg Q(x,y))$.</p>
        `,
      },
    ],
    aksiomaatika: [
      {
        title: 'Korrektsus või täielikkus',
        prompt: 'Otsusta, kumba omadust kirjeldab väide: "Kui valem on süsteemis tuletatav, siis on ta igas mudelis tõene."',
        solution: `
          <p>See on korrektsus.</p>
          <p>Korrektsus liigub süntaksist semantikasse: tuletatavus tähendab tõesust.</p>
          <p>Täielikkus oleks vastupidine suund: kui valem on semantiliselt tõene, siis peab ta olema süsteemis tuletatav.</p>
        `,
      },
    ],
    sekvents: [
      {
        title: 'Konjunktsiooni järjekorra vahetamine',
        prompt: 'Tuleta või põhjenda semantiliselt sekventsi $P\\&Q\\vdash Q\\&P$ kehtivus.',
        solution: `
          <p>Kui eesliige $P\\&Q$ on tõene, siis on nii $P$ kui ka $Q$ tõesed.</p>
          <p>Sellest saame paremal kõigepealt $Q$ ja seejärel $P$.</p>
          <p>Paremal konjunktsiooni moodustamisega saame $Q\\&P$. Seega $P\\&Q\\vdash Q\\&P$ on kehtiv.</p>
        `,
      },
    ],
    peano: [
      {
        title: 'Väikese arvutuse vormistamine',
        prompt: 'Näita Peano liitmise rekursiooni abil, et $0\\prime+0\\prime=0\\prime\\prime$.',
        solution: `
          <p>Liitmise rekursioon annab $x+0=x$ ja $x+y\\prime=(x+y)\\prime$.</p>
          <p>Võtame $x=0\\prime$ ja $y=0$. Siis $0\\prime+0\\prime=(0\\prime+0)\\prime$.</p>
          <p>Kuna $0\\prime+0=0\\prime$, siis $0\\prime+0\\prime=(0\\prime)\\prime=0\\prime\\prime$.</p>
        `,
      },
    ],
    graafid: [
      {
        title: 'Tippude ja servade lugemine',
        prompt: 'Olgu $V=\\{a,b,c,d\\}$ ja $E=\\{ab, ac, bd\\}$. Leia tippude astmed ja servade arv.',
        solution: `
          <p>Servi on $3$.</p>
          <p>Tipp $a$ on intsidentne servadega $ab$ ja $ac$, seega $d(a)=2$. Tippudel $b$ ja $c$ on astmed vastavalt $2$ ja $1$; tipul $d$ on aste $1$.</p>
          <p>Astmete summa on $2+2+1+1=6=2|E|$, nagu tipuastmete teoreem ütleb.</p>
        `,
      },
    ],
    tipuastmed: [
      {
        title: 'Kas astmejärjend on võimalik?',
        prompt: 'Otsusta kiiresti, kas $5$-tipulisel lihtgraafil saab olla astmejärjend $(4,4,4,1,1)$.',
        solution: `
          <p>Astmete summa on $4+4+4+1+1=14$, seega paarsuse tingimus üksi ei välista seda.</p>
          <p>Kui kolmel tipul on aste $4$, siis nad on ühendatud kõigi teiste tippudega. Siis ka kahel viimasel tipul oleks vähemalt aste $3$.</p>
          <p>See on vastuolus astmetega $1$ ja $1$, seega sellist lihtgraafi ei leidu.</p>
        `,
      },
    ],
    ahelad: [
      {
        title: 'Ahel, lihtahel või tsükkel',
        prompt: 'Graafis on servad $ab,bc,cd,da,ac$. Liigita tippude järjend $a,b,c,a,d,a$.',
        solution: `
          <p>Iga järjestikune tipupaar on servaga ühendatud: $ab$, $bc$, $ca$, $ad$, $da$. Seega on tegemist ahelaga.</p>
          <p>See ei ole lihtahel, sest tipp $a$ kordub mitu korda.</p>
          <p>See ei ole kursuse definitsiooni järgi tsükkel, sest tsükkel ei läbi ühtegi tippu kaks korda, välja arvatud algus- ja lõpptipu kokkulangevus.</p>
        `,
      },
    ],
    sidusus: [
      {
        title: 'Sidususkomponentide leidmine',
        prompt: 'Graafi servad on $ab,bc,de$. Leia sidususkomponendid.',
        solution: `
          <p>Tippude $a,b,c$ vahel leiduvad ahelad, seega moodustavad nad ühe sidususkomponendi.</p>
          <p>Tippude $d,e$ vahel on serv $de$, seega moodustavad nad teise sidususkomponendi.</p>
          <p>Sidususkomponendid on $\\{a,b,c\\}$ ja $\\{d,e\\}$.</p>
        `,
      },
    ],
    isomorfism: [
      {
        title: 'Isomorfismi kontroll invariandi abil',
        prompt: 'Kas graafid astmejärjenditega $(3,2,2,1)$ ja $(2,2,2,2)$ saavad olla isomorfsed?',
        solution: `
          <p>Ei saa.</p>
          <p>Isomorfism säilitab iga tipu astme ning seega ka kogu astmejärjendi.</p>
          <p>Kuna astmejärjendid erinevad, ei ole graafid isomorfsed.</p>
        `,
      },
    ],
    eulerhamilton: [
      {
        title: 'Euleri ahela olemasolu',
        prompt: 'Sidusal graafil on astmed $(3,3,2,2,2)$. Kas leidub Euleri ahel? Kas graaf on Euleri graaf?',
        solution: `
          <p>Paaritu astmega tippe on kaks.</p>
          <p>Sidusas graafis leidub Euleri ahel parajasti siis, kui paaritu astmega tippe on $0$ või $2$. Seega Euleri ahel leidub.</p>
          <p>Euleri graafiks olemiseks peab leiduma kinnine Euleri ahel ehk kõik astmed peavad olema paarisarvud. Seda siin ei ole.</p>
        `,
      },
    ],
    puud: [
      {
        title: 'Servade arv puus',
        prompt: 'Puus on $12$ tippu. Mitu serva selles on? Mis juhtub ühe serva eemaldamisel?',
        solution: `
          <p>Igas $n$-tipulises puus on $n-1$ serva, seega servi on $11$.</p>
          <p>Puu iga serv on sild: kui eemaldada üks serv, siis graaf ei ole enam sidus.</p>
          <p>Tulemuseks on mets kahe sidususkomponendiga.</p>
        `,
      },
    ],
    toespuud: [
      {
        title: 'Kruskali esimene valik',
        prompt: 'Kaalutud graafil on servade kaalud $ab:1$, $bc:2$, $ac:3$, $cd:4$, $bd:5$. Millised servad valib Kruskali algoritm?',
        solution: `
          <p>Võtame servad kasvava kaalu järjekorras.</p>
          <p>Valime $ab$ ja $bc$. Serv $ac$ tekitaks tsükli $a-b-c-a$, seega jätame selle vahele. Seejärel valime $cd$.</p>
          <p>Toespuu servad on $ab,bc,cd$ ja kogukaal on $1+2+4=7$.</p>
        `,
      },
    ],
    suunatud: [
      {
        title: 'Sisend- ja väljundaste',
        prompt: 'Suunatud graafi kaared on $(a,b)$, $(a,c)$, $(b,c)$, $(c,a)$. Leia tipu $c$ sisendaste ja väljundaste.',
        solution: `
          <p>Tippu $c$ sisenevad kaared $(a,c)$ ja $(b,c)$, seega sisendaste on $2$.</p>
          <p>Tipust $c$ väljub kaar $(c,a)$, seega väljundaste on $1$.</p>
        `,
      },
    ],
    luhimtee: [
      {
        title: 'Üks Dijkstra samm',
        prompt: 'Algustipust $s$ on servad $sa:2$, $sb:5$, $ab:1$, $ac:4$, $bc:1$. Leia lühim kaugus tipuni $c$.',
        solution: `
          <p>Alguses on kaugused $d(a)=2$, $d(b)=5$, $d(c)=\\infty$.</p>
          <p>Valime tipu $a$ ja parandame: $d(b)=\\min(5,2+1)=3$, $d(c)=\\min(\\infty,2+4)=6$.</p>
          <p>Järgmisena valime $b$ ja parandame $c$: $d(c)=\\min(6,3+1)=4$. Lühim kaugus on $4$ teed mööda $s-a-b-c$.</p>
        `,
      },
    ],
  };

  const GRAPH_STEP_TASKS = {
    tipuastmed: [
      {
        title: 'Havel-Hakimi taandamine',
        intro: 'Kontrolli astmejärjendit $(3,3,2,2,2,0)$. Vali igal sammul õige järgmine taandatud järjend.',
        steps: [
          {
            question: 'Millest tuleb alustada?',
            options: [
              'Järjesta mittekasvavalt ja eemalda suurim aste $3$.',
              'Liida kõik astmed ja jaga kohe kahega.',
              'Eemalda kõik nullid ning kuuluta järjend graafiliseks.',
              'Lahuta ühest kõigist kuuest astmest.',
            ],
            correct: 0,
            explanation: 'Havel-Hakimi samm võtab suurima astme $d$ ja vähendab järgmist $d$ astet ühe võrra.',
          },
          {
            question: 'Pärast suurima astme $3$ eemaldamist lahutame ühest kolmest järgmisest astmest. Mis järjend jääb pärast sorteerimist?',
            options: [
              '$(2,1,1,2,0)$',
              '$(2,2,2,0,0)$',
              '$(2,1,1,1,0)$',
              '$(3,2,2,1,0)$',
            ],
            correct: 2,
            explanation: 'Algjärjendist $(3,3,2,2,2,0)$ eemaldame esimese $3$ ja saame $(3,2,2,2,0)$. Lahutades esimesest kolmest: $(2,1,1,2,0)$, sorteerides $(2,1,1,1,0)$.',
          },
          {
            question: 'Nüüd on järjend $(2,1,1,1,0)$. Mis on järgmine taandatud ja sorditud järjend?',
            options: [
              '$(1,1,1,0)$',
              '$(0,0,1,0)$ ehk sorditult $(1,0,0,0)$',
              '$(2,0,0,0)$',
              '$(0,0,0)$',
            ],
            correct: 1,
            explanation: 'Eemaldame $2$ ja lahutame ühest kahest järgmisest arvust: $(1,1,1,0) \\to (0,0,1,0)$, sorteerides $(1,0,0,0)$.',
          },
          {
            question: 'Järjend $(1,0,0,0)$ taandub milleks?',
            options: [
              '$(0,0,0)$, seega algne järjend on graafiline.',
              '$(-1,0,0)$, seega algne järjend ei ole graafiline.',
              '$(1,1,1)$, seega algne järjend on regulaarne.',
              'Taandamine peatub, sest järjendis on nullid.',
            ],
            correct: 0,
            explanation: 'Eemaldame $1$ ja vähendame üht järgmist nullist suuremat elementi: tulemuseks on nulljärjend. Seega järjend on graafiline.',
          },
        ],
      },
    ],
    sidusus: [
      {
        title: 'Silla leidmine komponendi mõttes',
        intro: 'Olgu graafi servad $ab,bc,cd,ce,de$. Otsusta sammhaaval, kas serv $bc$ on sild.',
        steps: [
          {
            question: 'Mis on algse graafi sidususkomponendid?',
            options: [
              '$\\{a,b,c,d,e\\}$ on üks sidususkomponent.',
              '$\\{a,b\\}$ ja $\\{c,d,e\\}$ on kaks komponenti.',
              'Iga tipp on eraldi komponent.',
              '$\\{a,b,c\\}$ ja $\\{d,e\\}$ on kaks komponenti.',
            ],
            correct: 0,
            explanation: 'Ahelad ühendavad kõik tipud: $a-b-c-d$ ja $c-e$, seega graaf on sidus.',
          },
          {
            question: 'Eemaldame serva $bc$. Millised komponendid jäävad?',
            options: [
              'Graaf jääb endiselt üheks komponendiks.',
              '$\\{a,b\\}$ ja $\\{c,d,e\\}$.',
              '$\\{a\\}$ ja $\\{b,c,d,e\\}$.',
              '$\\{a,b,c\\}$ ja $\\{d,e\\}$.',
            ],
            correct: 1,
            explanation: 'Pärast $bc$ eemaldamist ei ole tippudel $a,b$ enam ühendust kolmnurgaga $c,d,e$.',
          },
          {
            question: 'Mis järeldub serva $bc$ kohta?',
            options: [
              '$bc$ on sild, sest komponentide arv suurenes.',
              '$bc$ ei ole sild, sest ta kuulub tsüklisse.',
              '$bc$ on eraldav tipp.',
              '$bc$ on Hamiltoni serv.',
            ],
            correct: 0,
            explanation: 'Sild on serv, mille eemaldamisel sidususkomponentide arv kasvab.',
          },
        ],
      },
    ],
    isomorfism: [
      {
        title: 'Mitteisomorfsuse kiire kontroll',
        intro: 'Võrdle kahte 5-tipulist graafi: $G_1$ astmed on $(3,2,2,2,1)$ ja $G_2$ astmed $(2,2,2,2,2)$.',
        steps: [
          {
            question: 'Millist invarianti on mõistlik esimesena võrrelda?',
            options: [
              'Tipuastmete järjendit.',
              'Tippude värvi joonisel.',
              'Tippude nimetuste tähestikulist järjekorda.',
              'Kas üks graaf on ekraanil vasakul.',
            ],
            correct: 0,
            explanation: 'Isomorfism säilitab tippude astmed ja seega ka astmejärjendi.',
          },
          {
            question: 'Mida astmejärjendite võrdlus näitab?',
            options: [
              'Järjendid erinevad, seega graafid ei saa olla isomorfsed.',
              'Järjendid erinevad, aga graafid on kindlasti isomorfsed.',
              'Järjendid on samad.',
              'Astmejärjend ei ütle isomorfismi kohta midagi.',
            ],
            correct: 0,
            explanation: 'Erinev invariant välistab isomorfismi kohe.',
          },
          {
            question: 'Milline oleks korrektne lõppvastus?',
            options: [
              '$G_1 \\not\\cong G_2$, sest astmejärjendid erinevad.',
              '$G_1 \\cong G_2$, sest mõlemas on 5 tippu.',
              '$G_1 \\cong G_2$, sest mõlemas on paarisarvulise astmega tippe.',
              'Otsustada ei saa, sest astmeid ei tohi kasutada.',
            ],
            correct: 0,
            explanation: 'Sama tipuarv on ainult tarvilik tingimus. Erinev astmejärjend on piisav põhjus mitteisomorfsuseks.',
          },
        ],
      },
    ],
    eulerhamilton: [
      {
        title: 'Euleri ahel või Euleri graaf',
        intro: 'Sidusa graafi astmed on $(4,3,3,2,2)$. Otsusta, kas leidub Euleri ahel ja kas graaf on Euleri graaf.',
        steps: [
          {
            question: 'Mitu paaritu astmega tippu on?',
            options: ['0', '1', '2', '4'],
            correct: 2,
            explanation: 'Paaritud on kaks astet $3$ ja $3$.',
          },
          {
            question: 'Mida ütleb see lahtise Euleri ahela kohta?',
            options: [
              'Sidusas graafis leidub Euleri ahel, sest paarituid tippe on täpselt kaks.',
              'Euleri ahelat ei leidu, sest kõik astmed peavad olema paaritud.',
              'Euleri ahel leidub ainult täisgraafis.',
              'Seda saab otsustada ainult Hamiltoni teoreemiga.',
            ],
            correct: 0,
            explanation: 'Sidusas graafis leidub Euleri ahel parajasti siis, kui paaritu astmega tippe on $0$ või $2$.',
          },
          {
            question: 'Kas see graaf on Euleri graaf ehk kas leidub kinnine Euleri ahel?',
            options: [
              'Ei, sest kinnise Euleri ahela jaoks peavad kõik astmed olema paarisarvud.',
              'Jah, sest kaks paaritut tippu on lubatud.',
              'Jah, sest graaf on sidus.',
              'Ei, sest astmete summa on paaris.',
            ],
            correct: 0,
            explanation: 'Kinnine Euleri ahel algab ja lõpeb samas tipus; selleks peab igasse tippu sisenemisi ja väljumisi olema paarisarv.',
          },
        ],
      },
    ],
    puud: [
      {
        title: 'Puu tunnuse kasutamine',
        intro: 'Graafil on $n=7$ tippu, $m=6$ serva ja graaf on sidus. Otsusta, kas see on puu.',
        steps: [
          {
            question: 'Millist puu tunnust saab kohe kasutada?',
            options: [
              'Sidus graaf $n-1$ servaga on puu.',
              'Iga $n$ tipuga graaf on puu.',
              'Kui $m=n$, siis graaf on puu.',
              'Ainult täisgraaf võib olla puu.',
            ],
            correct: 0,
            explanation: 'Üks puu karakteriseering on: graaf on sidus ja tal on täpselt $n-1$ serva.',
          },
          {
            question: 'Kas servade arv sobib?',
            options: [
              'Jah, sest $m=6=n-1=7-1$.',
              'Ei, sest $m$ peaks olema $7$.',
              'Ei, sest $m$ peaks olema $21$.',
              'Seda ei saa arvutada.',
            ],
            correct: 0,
            explanation: 'Seitsme tipuga puus peab olema $7-1=6$ serva.',
          },
          {
            question: 'Mis on lõppjäreldus?',
            options: [
              'Graaf on puu.',
              'Graaf ei saa olla puu.',
              'Graaf on kindlasti tsükliga.',
              'Graaf on Euleri graaf.',
            ],
            correct: 0,
            explanation: 'Sidusus ja $n-1$ serva koos annavad puu.',
          },
        ],
      },
    ],
    toespuud: [
      {
        title: 'Kruskal kontrollitava valikuna',
        intro: 'Kaalutud graafi servad on $ab:1$, $bc:2$, $ac:3$, $cd:4$, $bd:5$. Leia Kruskali algoritmi servad.',
        steps: [
          {
            question: 'Millise serva valib Kruskal esimesena?',
            options: ['$ab:1$', '$bc:2$', '$ac:3$', '$bd:5$'],
            correct: 0,
            explanation: 'Kruskal alustab väikseima kaaluga servast.',
          },
          {
            question: 'Milline serv lisatakse järgmisena?',
            options: ['$bc:2$', '$ac:3$', '$cd:4$', '$bd:5$'],
            correct: 0,
            explanation: '$bc$ on järgmine odavaim serv ja tsüklit ei teki.',
          },
          {
            question: 'Miks jäetakse serv $ac:3$ vahele?',
            options: [
              'See tekitaks tsükli $a-b-c-a$.',
              'Selle kaal on negatiivne.',
              'Kruskal ei kasuta kolmanda kaaluga servi.',
              'Sest $a$ on juba valitud.',
            ],
            correct: 0,
            explanation: 'Kruskal jätab vahele täpselt need servad, mis moodustaksid juba valitud servadega tsükli.',
          },
          {
            question: 'Milline serv lõpetab toespuu?',
            options: ['$cd:4$', '$bd:5$', '$ac:3$', 'ükski, sest toespuu on juba valmis'],
            correct: 0,
            explanation: 'Nelja tipu korral vajame $n-1=3$ serva. $cd$ ühendab tipu $d$ olemasoleva komponendiga.',
          },
        ],
      },
      {
        title: 'Primi kasvav puu',
        intro: 'Alusta tipust $a$. Kaalud: $ab:2$, $ac:5$, $bc:1$, $bd:4$, $cd:3$.',
        steps: [
          {
            question: 'Millise serva lisab Prim esimesena?',
            options: ['$ab:2$', '$ac:5$', '$bc:1$', '$cd:3$'],
            correct: 0,
            explanation: 'Alguses on puus ainult $a$, seega saab valida ainult $a$-st väljuvate servade vahel. Odavaim on $ab$.',
          },
          {
            question: 'Puu tippude hulk on nüüd $\\{a,b\\}$. Milline lubatud serv on odavaim?',
            options: ['$bc:1$', '$bd:4$', '$ac:5$', '$cd:3$'],
            correct: 0,
            explanation: 'Prim valib odavaima serva, mis ühendab olemasolevat puud välise tipuga. $bc$ lisab tipu $c$.',
          },
          {
            question: 'Puu tippude hulk on $\\{a,b,c\\}$. Millise servaga lisame tipu $d$?',
            options: ['$cd:3$', '$bd:4$', '$ac:5$', '$bc:1$ uuesti'],
            correct: 0,
            explanation: '$cd$ on odavaim serv puust välja tippu $d$.',
          },
        ],
      },
    ],
    suunatud: [
      {
        title: 'Tugeva sidususe kontroll',
        intro: 'Suunatud graafi kaared on $(a,b)$, $(b,c)$, $(c,a)$ ja $(c,d)$. Kontrolli tugevat sidusust.',
        steps: [
          {
            question: 'Millised tipud on omavahel tsüklis?',
            options: [
              '$a,b,c$',
              '$a,d$',
              '$b,d$',
              'ainult $d$',
            ],
            correct: 0,
            explanation: 'Kaared $a\\to b$, $b\\to c$, $c\\to a$ annavad suunatud tsükli.',
          },
          {
            question: 'Kas tipust $d$ leidub suunatud tee tagasi tippu $a$?',
            options: [
              'Ei, sest $d$-st ei välju ühtegi kaart.',
              'Jah, tee on $d\\to c\\to a$.',
              'Jah, sest alusgraaf on sidus.',
              'Seda ei pea tugeva sidususe jaoks kontrollima.',
            ],
            correct: 0,
            explanation: 'Tugev sidusus nõuab suunatud teid mõlemas suunas iga tipupaari vahel.',
          },
          {
            question: 'Mis on lõppjäreldus?',
            options: [
              'Graaf ei ole tugevalt sidus.',
              'Graaf on tugevalt sidus.',
              'Graaf on Euleri graaf.',
              'Graaf on nullgraaf.',
            ],
            correct: 0,
            explanation: 'Tippu $d$ saab jõuda, kuid sealt ei saa tagasi teistesse tippudesse.',
          },
        ],
      },
    ],
    luhimtee: [
      {
        title: 'Dijkstra lõdvendused',
        intro: 'Algustipp on $s$. Kaalud: $sa:2$, $sb:5$, $ab:1$, $ac:4$, $bc:1$. Leia kaugus tippu $c$.',
        steps: [
          {
            question: 'Mis on algsed kaugused pärast $s$ naabrite vaatamist?',
            options: [
              '$d(a)=2$, $d(b)=5$, $d(c)=\\infty$',
              '$d(a)=\\infty$, $d(b)=\\infty$, $d(c)=0$',
              '$d(a)=1$, $d(b)=2$, $d(c)=5$',
              '$d(a)=2$, $d(b)=1$, $d(c)=4$',
            ],
            correct: 0,
            explanation: 'Otse $s$-st saame tippu $a$ kaaluga 2 ja tippu $b$ kaaluga 5; $c$ pole veel teada.',
          },
          {
            question: 'Milline tipp fikseeritakse järgmisena?',
            options: ['$a$', '$b$', '$c$', '$s$ uuesti'],
            correct: 0,
            explanation: 'Valitakse vähima ajutise kaugusega fikseerimata tipp, seega $a$ kaugusega 2.',
          },
          {
            question: 'Mida annab tipu $a$ kaudu lõdvendamine?',
            options: [
              '$d(b)$ paraneb väärtusele $3$ ja $d(c)$ väärtusele $6$.',
              '$d(b)$ jääb $5$ ja $d(c)$ jääb $\\infty$.',
              '$d(a)$ muutub väärtuseks $0$.',
              '$d(c)$ muutub väärtuseks $1$.',
            ],
            correct: 0,
            explanation: '$s-a-b$ pikkus on $2+1=3$ ja $s-a-c$ pikkus on $2+4=6$.',
          },
          {
            question: 'Järgmisena fikseeritakse $b$. Mis saab tipust $c$?',
            options: [
              '$d(c)$ paraneb väärtusele $4$.',
              '$d(c)$ jääb väärtusele $6$.',
              '$d(c)$ muutub lõpmatuseks.',
              '$c$ eemaldatakse graafist.',
            ],
            correct: 0,
            explanation: 'Tee $s-a-b-c$ pikkus on $2+1+1=4$, mis on parem kui senine $6$.',
          },
        ],
      },
      {
        title: 'Floydi-Warshalli üks vahepeatus',
        intro: 'Olgu $D(a,c)=8$, $D(a,b)=3$ ja $D(b,c)=2$. Kontrolli sammu, kus lubatud vahetipp on $b$.',
        steps: [
          {
            question: 'Millist võrdlust Floydi-Warshall teeb?',
            options: [
              '$D(a,c) \\leftarrow \\min(D(a,c), D(a,b)+D(b,c))$',
              '$D(a,c) \\leftarrow D(a,c)+D(a,b)+D(b,c)$',
              '$D(a,b) \\leftarrow D(a,c)-D(b,c)$',
              'Floydi-Warshall ei kasuta vahetippe.',
            ],
            correct: 0,
            explanation: 'Igal sammul võrreldakse vana kaugust teega, mis läheb läbi lubatud vahetipu.',
          },
          {
            question: 'Mis on uus $D(a,c)$ väärtus?',
            options: ['5', '8', '10', '13'],
            correct: 0,
            explanation: '$D(a,b)+D(b,c)=3+2=5$, mis on väiksem kui vana väärtus $8$.',
          },
          {
            question: 'Kuidas seda sõnaliselt tõlgendada?',
            options: [
              'Tee $a\\to b\\to c$ on lühem kui senine otsetee $a\\to c$.',
              'Otsetee $a\\to c$ on endiselt parem.',
              'Vahetipu kasutamine on keelatud.',
              'Kõik kaugused muutuvad nulliks.',
            ],
            correct: 0,
            explanation: 'Floydi-Warshall parandab kaugusmaatriksit, kui vahetipuga tee on lühem.',
          },
        ],
      },
    ],
  };

  const TOPIC_MINI_CHECKS = {
    lausearvutus: [
      {
        q: 'Millal on implikatsioon $F\\Rightarrow G$ väär?',
        options: ['$F=1, G=0$', '$F=0, G=0$', '$F=0, G=1$', 'ainult siis, kui mõlemad on väärad'],
        correct: 0,
        exp: 'Implikatsioon on väär täpselt juhul, kui eeldus on tõene ja järeldus väär.',
      },
      {
        q: 'Mida tähendab, et valem on samaselt tõene?',
        options: ['Valem on tõene vähemalt ühel väärtustusel', 'Valem on tõene igal väärtustusel', 'Valem ei sisalda muutujaid', 'Valemi eitus on kehtestatav'],
        correct: 1,
        exp: 'Samaselt tõene ehk tautoloogiline valem on tõene kõikidel muutujate väärtustustel.',
      },
      {
        q: 'Mitu väärtustust on valemil, milles esineb kolm lausemuutujat?',
        options: ['3', '6', '8', '9'],
        correct: 2,
        exp: 'Kui muutujaid on $n$, siis väärtustusi on $2^n$. Kolme muutuja korral $2^3=8$.',
      },
    ],
    toesuspuu: [
      {
        q: 'Mida näitab tõesuspuu avatud haru?',
        options: ['Vastuolu', 'Valemi või valemihulga kehtestavat väärtustust', 'Ainult tautoloogiat', 'Sekventsi tuletust'],
        correct: 1,
        exp: 'Avatud haru annab väärtustuse, millel haru valemid saavad korraga tõesed olla.',
      },
      {
        q: 'Kuidas kontrollida tõesuspuuga, kas $F$ on samaselt tõene?',
        options: ['Ehita puu valemile $F$ ja otsi avatud haru', 'Ehita puu valemile $\\neg F$ ja kontrolli, kas kõik harud sulguvad', 'Ehita puu ainult atomaarsetele valemitele', 'Kontrolli ainult ühte väärtustust'],
        correct: 1,
        exp: '$F$ on tautoloogia siis, kui $\\neg F$ ei ole kehtestatav ehk tõesuspuu kõik harud sulguvad.',
      },
      {
        q: 'Millal haru sulgub?',
        options: ['Kui harus on ainult literaalid', 'Kui harus esineb valem ja tema eitus', 'Kui harus on disjunktsioon', 'Kui harus on rohkem kui kolm valemit'],
        correct: 1,
        exp: 'Haru sulgub vastuolu tõttu: samal harus on korraga $A$ ja $\\neg A$.',
      },
    ],
    predikaadid: [
      {
        q: 'Milline samaväärsus on korrektne?',
        options: ['$\\neg\\forall xF \\equiv \\forall x\\neg F$', '$\\neg\\forall xF \\equiv \\exists x\\neg F$', '$\\forall xF \\equiv \\exists xF$', '$\\neg\\exists xF \\equiv \\exists x\\neg F$'],
        correct: 1,
        exp: 'Kvantori eitamisel vahetub $\\forall$ kvantoriks $\\exists$ ning eitus liigub valemi sisse.',
      },
      {
        q: 'Mida tähendab kinnine predikaatarvutuse valem?',
        options: ['Valemil ei ole vabu muutujaid', 'Valem on samaselt tõene', 'Valem sisaldab ainult ühte kvantorit', 'Valem on alati väär'],
        correct: 0,
        exp: 'Kinnine valem ehk lause ei sõltu vabade muutujate väärtustest.',
      },
      {
        q: 'Miks ei saa kvantoreid üldiselt vabalt vahetada?',
        options: ['$\\forall x\\exists y$ lubab y-l sõltuda x-ist', 'Kvantorid ei mõjuta tõeväärtust', '$\\exists$ ja $\\forall$ on samad', 'Sest predikaate ei tohi eitada'],
        correct: 0,
        exp: '$\\forall x\\exists y$ korral võib iga $x$ jaoks sobida erinev $y$; $\\exists y\\forall x$ nõuab ühte sama $y$ kõigile.',
      },
    ],
    signatuur: [
      {
        q: 'Mis kuulub signatuuri $\\sigma=\\langle C;F;P\\rangle$?',
        options: ['Konstandid, funktsionaalsümbolid ja predikaatsümbolid', 'Ainult tõeväärtused', 'Ainult muutujad', 'Ainult kvantorid'],
        correct: 0,
        exp: 'Signatuur fikseerib keeletähised: konstandid, funktsioonisümbolid ja predikaatsümbolid.',
      },
      {
        q: 'Mida teeb interpretatsioon funktsionaalsümboliga?',
        options: ['Muudab selle predikaadiks', 'Annab sellele vastava funktsiooni põhihulgal', 'Eemaldab selle valemist', 'Muudab selle kvantoriks'],
        correct: 1,
        exp: 'Interpretatsioon annab igale $n$-kohalisele funktsionaalsümbolile $n$-kohalise funktsiooni kandjal.',
      },
      {
        q: 'Mis on valemi mudel?',
        options: ['Tabel kõigi väärtustustega', 'Interpretatsioon, milles valem on tõene', 'Ainult põhihulk', 'Valemi prefikskuju'],
        correct: 1,
        exp: 'Mudel on interpretatsioon, kus valem kehtib vastavalt vabade muutujate väärtustele.',
      },
    ],
    samavaarsus: [
      {
        q: 'Milline on De Morgani seadus?',
        options: ['$\\neg(F\\&G)\\equiv\\neg F\\lor\\neg G$', '$\\neg(F\\&G)\\equiv F\\lor G$', '$F\\Rightarrow G\\equiv F\\&G$', '$F\\lor(F\\&G)\\equiv G$'],
        correct: 0,
        exp: 'Konjunktsiooni eitus muutub eituste disjunktsiooniks.',
      },
      {
        q: 'Kuidas saada täielik DNK tõeväärtustabelist?',
        options: ['Võta väärad read', 'Võta tõesed read ja tee neist täielikud lihtkonjunktsioonid', 'Kustuta kõik eitused', 'Võta ainult esimene rida'],
        correct: 1,
        exp: 'Täielik DNK koostatakse nendest ridadest, kus valem on tõene.',
      },
      {
        q: 'Millal on valemid $F$ ja $G$ samaväärsed?',
        options: ['Kui neil on sama pikkus', 'Kui nende tõeväärtused langevad kõigil väärtustustel kokku', 'Kui mõlemas on sama arv sulge', 'Kui mõlemad sisaldavad implikatsiooni'],
        correct: 1,
        exp: 'Samaväärsus tähendab sama tõeväärtust igal muutujate väärtustusel.',
      },
    ],
    prefikskuju: [
      {
        q: 'Mis on prefikskujul valemi üldine kuju?',
        options: ['$M Q_1x_1\\cdots Q_nx_n$', '$Q_1x_1\\cdots Q_nx_nM$', '$F\\vdash G$', '$F\\Leftrightarrow G$'],
        correct: 1,
        exp: 'Prefikskujul on kõik kvantorid ees ja kvantoriteta maatriks järel.',
      },
      {
        q: 'Mida tuleb enne kvantorite ette toomist tavaliselt teha?',
        options: ['Eemaldada kõik muutujad', 'Eemaldada implikatsioonid ja viia eitused atomaarsete valemiteni', 'Asendada kõik kvantorid disjunktsiooniga', 'Kirjutada valem alati DNK-sse'],
        correct: 1,
        exp: 'Prefikskujule viimiseks puhastatakse loogilised tehted ja eitused enne kvantorite liigutamist.',
      },
      {
        q: 'Miks muutujaid vahel ümber nimetatakse?',
        options: ['Et vältida muutujate sidumise konflikte', 'Et valem muutuks alati vääraks', 'Et kvantorid kaoksid', 'Et saada lühem tekst'],
        correct: 0,
        exp: 'Ümbernimetamine aitab vältida olukorda, kus kvantori ette toomine seob vale muutuja.',
      },
    ],
    aksiomaatika: [
      {
        q: 'Mida tähendab teooria korrektsus?',
        options: ['Kõik tõesed valemid on tuletatavad', 'Iga tuletatav valem on semantiliselt tõene', 'Kõik valemid on aksioomid', 'Ühtegi valemit ei saa tuletada'],
        correct: 1,
        exp: 'Korrektsus liigub süntaksist semantikasse: tuletatavus tagab tõesuse.',
      },
      {
        q: 'Mida tähendab täielikkus?',
        options: ['Iga semantiliselt tõene valem on tuletatav', 'Iga valem on väär', 'Iga aksioom on prefikskujul', 'Ükski reegel ei säilita tõesust'],
        correct: 0,
        exp: 'Täielikkus on korrektsuse vastassuund: semantiline kehtivus annab tuletatavuse.',
      },
      {
        q: 'Mis on formaalne tuletus?',
        options: ['Valemite järjend, kus iga valem on aksioom või saadud reegliga eelnevatest', 'Ainult tõeväärtustabel', 'Graafi ahel', 'Suvaline seletus sõnadega'],
        correct: 0,
        exp: 'Tuletus on reeglitega kontrollitav valemite järjend.',
      },
    ],
    sekvents: [
      {
        q: 'Mis on sekventsi $F_1,\\ldots,F_n\\vdash G$ valemkuju?',
        options: ['$F_1\\lor\\cdots\\lor F_n\\lor G$', '$F_1\\&\\cdots\\&F_n\\Rightarrow G$', '$G\\Rightarrow F_1$', '$\\neg G$'],
        correct: 1,
        exp: 'Sekventsi valemkuju on eesliikmete konjunktsioonist tagaliikmesse minev implikatsioon.',
      },
      {
        q: 'Milleks kasutatakse reeglit $\\vdash\\&$?',
        options: ['Paremal konjunktsiooni tõestamiseks', 'Vasakul konjunktsiooni eemaldamiseks', 'Implikatsiooni eitamiseks', 'Kvantori eemaldamiseks'],
        correct: 0,
        exp: 'Paremal $F\\&G$ tõestamiseks tuleb tõestada mõlemad pooled.',
      },
      {
        q: 'Millal saab haru sulgeda aksioomina?',
        options: ['Kui sama valem on vasakul ja paremal', 'Kui paremal on alati konjunktsioon', 'Kui vasakul on kolm valemit', 'Kui sekvents sisaldab kvantorit'],
        correct: 0,
        exp: 'Aksioomse haru tüüpiline kuju on $F\\vdash F$ või selle nõrgestatud variant.',
      },
    ],
    peano: [
      {
        q: 'Mis on Peano aritmeetika signatuur kursuses?',
        options: ['$\\langle0;\\prime,+,\\cdot;=\\rangle$', '$\\langle;\\lor,\\&;=\\rangle$', '$\\langle V;E\\rangle$', '$\\langle0;R;P\\rangle$'],
        correct: 0,
        exp: 'Peano aritmeetikas kasutatakse nulli, järglase operatsiooni, liitmist, korrutamist ja võrdust.',
      },
      {
        q: 'Mida ütleb induktsiooni idee?',
        options: ['Kui väide kehtib $0$ korral ja kandub $x$-ilt $x\\prime$-le, siis kehtib kõigi naturaalarvude korral', 'Kõik arvud on võrdsed', 'Iga valem on väär', 'Korrutamine on keelatud'],
        correct: 0,
        exp: 'Induktsioon koosneb baasist ja sammust ning annab väite kõigi naturaalarvude jaoks.',
      },
      {
        q: 'Milline on liitmise rekursiooni põhireegel?',
        options: ['$x+0=x$', '$x+0=0$', '$x+y=x$', '$x\\cdot0=x$'],
        correct: 0,
        exp: 'Liitmise baasreegel on $x+0=x$; järglasega liitmine defineeritakse eraldi.',
      },
    ],
    graafid: [
      {
        q: 'Mis on lihtgraafi serv?',
        options: ['Tipuhulga kaheelemendiline alamhulk', 'Suvaline arv', 'Ühe tipu järglane', 'Predikaat'],
        correct: 0,
        exp: 'Suunamata lihtgraafi serv ühendab kahte erinevat tippu.',
      },
      {
        q: 'Mida ütleb tipuastmete teoreem?',
        options: ['$\\sum d(v)=2|E|$', '$\\sum d(v)=|V|$', '$|E|=|V|$', '$d(v)=0$ igal tipul'],
        correct: 0,
        exp: 'Iga serv panustab astmete summasse kahega.',
      },
      {
        q: 'Mitu serva on täisgraafil $K_n$?',
        options: ['$n$', '$n-1$', '$\\frac{n(n-1)}2$', '$2n$'],
        correct: 2,
        exp: 'Täisgraafis on iga kahe tipu vahel serv, seega servade arv on $\\binom n2$.',
      },
    ],
    tipuastmed: [
      {
        q: 'Milline tingimus peab lihtgraafi astmejärjendil kindlasti kehtima?',
        options: ['Astmete summa on paaris', 'Kõik astmed on paaritud', 'Kõik astmed on võrdsed', 'Astmete summa on $|V|$'],
        correct: 0,
        exp: 'Astmete summa on $2|E|$, seega alati paarisarv.',
      },
      {
        q: 'Mida teeb Havel-Hakimi algoritm ühes sammus?',
        options: ['Eemaldab suurima astme ja vähendab järgmist sama arvu astmeid ühe võrra', 'Liidab kõik astmed kokku', 'Asendab kõik astmed nulliga', 'Kontrollib ainult paarsust'],
        correct: 0,
        exp: 'See samm modelleerib suurima astmega tipu ühendamist järgmiste tippudega.',
      },
      {
        q: 'Miks ei saa lihtgraafis aste olla vähemalt $n$?',
        options: ['Tipul saab olla ühendus maksimaalselt ülejäänud $n-1$ tipuga', 'Sest astmed peavad olema negatiivsed', 'Sest graaf peab olema puu', 'Sest silmused on kohustuslikud'],
        correct: 0,
        exp: 'Lihtgraafis ei ole silmuseid ega kordusservi, seega tipp saab olla ühendatud kuni $n-1$ teise tipuga.',
      },
    ],
    ahelad: [
      {
        q: 'Mis on ahela pikkus?',
        options: ['Tippude arv', 'Servade arv ahelas', 'Graafi kõikide servade arv', 'Sidususkomponentide arv'],
        correct: 1,
        exp: 'Ahela pikkuseks loetakse järjestikuste sammude ehk servade arvu.',
      },
      {
        q: 'Mis eristab tsüklit kinnisest ahelast?',
        options: ['Tsüklis ei kordu vahepealsed tipud ja servi on vähemalt kolm', 'Tsüklis ei ole servi', 'Tsükkel on alati suunatud', 'Tsükkel peab läbima kõik tipud'],
        correct: 0,
        exp: 'Tsükkel on kinnine ahel, mis ei läbi ühtegi vahepealset tippu kaks korda.',
      },
      {
        q: 'Mis on Hamiltoni ahel?',
        options: ['Ahel, mis läbib iga serva täpselt korra', 'Ahel, mis läbib iga tipu täpselt korra', 'Lühim tee kahe tipu vahel', 'Nullgraafi ahel'],
        correct: 1,
        exp: 'Hamiltoni ahel on tippude, mitte servade, ühekordse läbimise tingimus.',
      },
    ],
    sidusus: [
      {
        q: 'Millal on graaf sidus?',
        options: ['Iga kahe tipu vahel leidub ahel', 'Kõik astmed on nullid', 'Graafis pole tsükleid', 'Graaf on alati täisgraaf'],
        correct: 0,
        exp: 'Sidusus tähendab, et ühestkõik millise kahe tipu vahel on võimalik liikuda ahelat mööda.',
      },
      {
        q: 'Mis on sild?',
        options: ['Serv, mille eemaldamisel sidususkomponentide arv kasvab', 'Isoleeritud tipp', 'Kõige suurema astmega tipp', 'Hamiltoni tsükkel'],
        correct: 0,
        exp: 'Silla eemaldamine lõhub graafi rohkemateks komponentideks.',
      },
      {
        q: 'Mis on eraldav tipp?',
        options: ['Tipp, mille eemaldamisel sidususkomponentide arv kasvab', 'Tipp astmega 0 ainult', 'Iga puu leht', 'Tipp, mis kuulub täisgraafi'],
        correct: 0,
        exp: 'Eraldav tipp on tipu analoog sillale.',
      },
    ],
    isomorfism: [
      {
        q: 'Mida graafide isomorfism säilitab?',
        options: ['Tipuarvu, servaarvu ja astmeid', 'Ainult joonise välimust', 'Ainult tippude nimesid', 'Ainult värvi'],
        correct: 0,
        exp: 'Isomorfism nimetab tipud ümber, kuid säilitab struktuursed omadused.',
      },
      {
        q: 'Kui kahel graafil on erinev astmejärjend, siis nad...',
        options: ['ei saa olla isomorfsed', 'on kindlasti isomorfsed', 'on mõlemad puud', 'on mõlemad Euleri graafid'],
        correct: 0,
        exp: 'Astmejärjend on isomorfismi invariant.',
      },
      {
        q: 'Mida tähendab bijektiivne tipukujutus isomorfismis?',
        options: ['Igal lähtegraafi tipul on täpselt üks vastav tipp ja vastupidi', 'Kõik tipud lähevad samaks tipuks', 'Servad kustutatakse', 'Ainult üks tipp jääb alles'],
        correct: 0,
        exp: 'Bijektsioon seob tippude hulgad üks-üheselt.',
      },
    ],
    eulerhamilton: [
      {
        q: 'Millal on sidus graaf Euleri graaf?',
        options: ['Kui kõik tipuastmed on paarisarvud', 'Kui leidub Hamiltoni ahel', 'Kui graaf on täisgraaf', 'Kui tal pole servi'],
        correct: 0,
        exp: 'Sidusas graafis leidub kinnine Euleri ahel parajasti siis, kui kõik astmed on paarisarvud.',
      },
      {
        q: 'Millal leidub sidusas graafis lahtine Euleri ahel?',
        options: ['Kui paaritu astmega tippe on 0 või 2', 'Kui paaritu astmega tippe on 3', 'Kui kõik tipud on isoleeritud', 'Ainult puudes'],
        correct: 0,
        exp: 'Euleri ahel võib alata ja lõppeda kahes paaritu astmega tipus.',
      },
      {
        q: 'Mida annab Diraci teoreem?',
        options: ['Piisava tingimuse Hamiltoni tsükli leidumiseks', 'Täieliku Euleri graafi kriteeriumi', 'Lühima tee algoritmi', 'Astmete summa valemi'],
        correct: 0,
        exp: 'Diraci tingimus on piisav, mitte tarvilik: selle täitumisel on graaf Hamiltoni graaf.',
      },
    ],
    puud: [
      {
        q: 'Mitu serva on $n$-tipulisel puul?',
        options: ['$n-1$', '$n$', '$2n$', '$\\frac{n(n-1)}2$'],
        correct: 0,
        exp: 'Igas $n$-tipulises puus on täpselt $n-1$ serva.',
      },
      {
        q: 'Mis juhtub puus ühe serva eemaldamisel?',
        options: ['Graaf ei ole enam sidus', 'Tekib täisgraaf', 'Servade arv kasvab', 'Kõik tipud kaovad'],
        correct: 0,
        exp: 'Puu iga serv on sild; selle eemaldamine lõhub sidususe.',
      },
      {
        q: 'Mis on mets?',
        options: ['Graaf, mille iga sidususkomponent on puu', 'Ainult üks tsükkel', 'Täisgraafide kogum', 'Suunatud graaf ilma kaarteta'],
        correct: 0,
        exp: 'Mets koosneb puudest sidususkomponentidena.',
      },
    ],
    toespuud: [
      {
        q: 'Mis on toespuu?',
        options: ['Sidusa graafi alamgraaf, mis sisaldab kõiki tippe ja on puu', 'Kõigi servade hulk', 'Suunatud tsükkel', 'Graafi täiend'],
        correct: 0,
        exp: 'Toespuu säilitab kõik tipud, kuid jätab alles just nii palju servi, et saada puu.',
      },
      {
        q: 'Mis on Kruskali algoritmi põhiidee?',
        options: ['Vali kasvava kaaluga servi ja väldi tsükleid', 'Alusta alati suurima kaaluga servast', 'Leia ainult lühim tee', 'Kustuta kõik lehed'],
        correct: 0,
        exp: 'Kruskal lisab odavaimaid servi, mis ei tekita tsüklit.',
      },
      {
        q: 'Mis eristab Primi algoritmi Kruskalist?',
        options: ['Prim kasvatab ühte puud valitud algtipust', 'Prim ei kasuta kaale', 'Prim töötab ainult suunatud graafidel', 'Prim leiab Hamiltoni tsükli'],
        correct: 0,
        exp: 'Prim hoiab üht kasvavat puud ning lisab odavaima serva puu ja välise tipu vahel.',
      },
    ],
    suunatud: [
      {
        q: 'Mis on suunatud graafi kaar $(u,v)$?',
        options: ['Ühendus algtipust $u$ lõpptippu $v$', 'Suunamata serv', 'Kaheelemendiline alamhulk', 'Tipp astmega 0'],
        correct: 0,
        exp: 'Suunatud kaarel on algtipp ja lõpptipp.',
      },
      {
        q: 'Mis on tipu sisendaste?',
        options: ['Tipusse sisenevate kaarte arv', 'Tipust väljuvate kaarte arv', 'Kõigi tippude arv', 'Servade kogukaal'],
        correct: 0,
        exp: 'Sisendaste loendab kaared, mille lõpptipp on antud tipp.',
      },
      {
        q: 'Mis on suunatud graafi alusgraaf?',
        options: ['Suunamata graaf, mis saadakse kaarte asendamisel servadega', 'Graaf ainult silmustega', 'Graaf ilma tippudeta', 'Ainult naabrusmaatriks'],
        correct: 0,
        exp: 'Alusgraaf unustab kaarte suuna ning eemaldab silmused.',
      },
    ],
    luhimtee: [
      {
        q: 'Millal Dijkstra algoritm ei tööta korrektselt?',
        options: ['Kui leidub negatiivse kaaluga serv', 'Kui kaalud on positiivsed', 'Kui graaf on sidus', 'Kui graafis on rohkem kui kolm tippu'],
        correct: 0,
        exp: 'Dijkstra eeldab mittenegatiivseid kaale.',
      },
      {
        q: 'Milleks kasutatakse Floydi-Warshalli algoritmi?',
        options: ['Kõigi tipupaaride lühimate teede leidmiseks', 'Ainult minimaalse toespuu leidmiseks', 'Ainult Euleri ahela leidmiseks', 'Isomorfismi kontrolliks'],
        correct: 0,
        exp: 'Floydi-Warshall arvutab lühimad teed kõigi tipupaaride vahel.',
      },
      {
        q: 'Mis on lõdvendamine Dijkstra algoritmis?',
        options: ['Naabri kauguse parandamine, kui leiti lühem tee', 'Kõigi servade kustutamine', 'Tipu astme suurendamine', 'Graafi täiendamine'],
        correct: 0,
        exp: 'Kui tee läbi valitud tipu annab väiksema kauguse, uuendatakse naabri kaugust.',
      },
    ],
  };

  window.DM_MINI_CHECK_ROUTES = Object.keys(TOPIC_MINI_CHECKS);

  function readTopicChecks() {
    try { return JSON.parse(localStorage.getItem(TOPIC_CHECK_KEY)) || {}; }
    catch { return {}; }
  }

  function saveTopicChecks(results) {
    localStorage.setItem(TOPIC_CHECK_KEY, JSON.stringify(results));
  }

  function isTopicCheckCompleted(result) {
    return Boolean(result?.total)
      && Array.isArray(result.answers)
      && result.answers.length >= result.total
      && result.answers.every(answer => answer !== null && answer !== undefined);
  }

  function initTopicMiniCheck(route) {
    const questions = TOPIC_MINI_CHECKS[route];
    const view = document.getElementById('view');
    if (!view || !questions || document.getElementById('topicMiniCheck')) return;

    const savedChecks = readTopicChecks();
    const previous = isTopicCheckCompleted(savedChecks[route]) ? savedChecks[route] : null;
    const section = document.createElement('section');
    section.className = 'card topic-mini-check';
    section.id = 'topicMiniCheck';
    section.innerHTML = `
      <div class="topic-exercises-head">
        <div>
          <h2>Mini-kontroll</h2>
          <p>Kolm kiiret küsimust selle peatüki põhiasjade üle. Peatükk märgitakse tehtuks pärast vastuste kontrollimist.</p>
        </div>
        <span class="tag ${previous ? 'good' : 'accent'}">${previous ? `${previous.score}/${previous.total}` : `${questions.length} küsimust`}</span>
      </div>
      ${previous ? `<p class="muted">Viimane tulemus: ${previous.score}/${previous.total} (${Math.round(100 * previous.score / previous.total)}%)</p>` : ''}
      <div class="mini-question-list">
        ${questions.map((question, index) => `
          <article class="mini-question" data-mini-question="${index}">
            <h3>${index + 1}. ${question.q}</h3>
            <div class="mini-options">
              ${question.options.map((option, optionIndex) => `
                <label class="mini-option" data-mini-option="${optionIndex}">
                  <input type="radio" name="mini-${route}-${index}" value="${optionIndex}">
                  <span>${option}</span>
                </label>
              `).join('')}
            </div>
            <div class="mini-feedback" data-mini-feedback="${index}"></div>
          </article>
        `).join('')}
      </div>
      <div class="btn-row">
        <button class="btn small" id="checkMiniControl" type="button">Kontrolli vastuseid</button>
        <button class="btn small secondary" id="resetMiniControl" type="button">Tühjenda valikud</button>
        ${previous ? '<button class="btn small secondary" id="clearMiniResult" type="button">Eemalda salvestatud tulemus</button>' : ''}
      </div>
      <div id="miniCheckResult"></div>
    `;
    view.appendChild(section);
    renderMath(section);

    section.querySelector('#checkMiniControl').addEventListener('click', () => {
      let score = 0;
      const answers = [];
      questions.forEach((question, index) => {
        const selected = section.querySelector(`input[name="mini-${route}-${index}"]:checked`);
        const selectedValue = selected ? Number(selected.value) : null;
        const correct = selectedValue === question.correct;
        if (correct) score++;
        answers.push(selectedValue);

        const questionEl = section.querySelector(`[data-mini-question="${index}"]`);
        questionEl.querySelectorAll('.mini-option').forEach(label => {
          const optionIndex = Number(label.dataset.miniOption);
          label.classList.toggle('correct', optionIndex === question.correct);
          label.classList.toggle('wrong', selectedValue === optionIndex && !correct);
        });
        const feedback = section.querySelector(`[data-mini-feedback="${index}"]`);
        feedback.className = `mini-feedback ${correct ? 'good' : 'bad'} show`;
        feedback.innerHTML = `
          <strong>${correct ? 'Õige.' : selectedValue === null ? 'Vastus valimata.' : 'Vale.'}</strong>
          <span>${question.exp}</span>
          ${correct ? '' : `<div class="btn-row"><button class="btn small secondary" data-mini-weak="${index}" type="button">Lisa vigade päevikusse</button><span class="muted" data-mini-weak-status="${index}"></span></div>`}
        `;
      });

      const missing = answers.some(answer => answer === null);
      const pct = Math.round(100 * score / questions.length);
      if (!missing) {
        const results = readTopicChecks();
        results[route] = {
          score,
          total: questions.length,
          answers,
          date: new Date().toISOString(),
        };
        saveTopicChecks(results);
        window.DM?.updateProgress?.();
      }

      section.querySelector('#miniCheckResult').innerHTML = `
        <div class="topic-tool-result ${missing ? 'warn' : pct >= 70 ? 'good' : pct >= 40 ? 'warn' : 'bad'}">
          <strong>${missing ? 'Poolik mini-kontroll' : 'Tulemus'}: ${score}/${questions.length} (${pct}%)</strong>
          <span>${missing ? 'Vasta kõigile küsimustele; peatükk märgitakse tehtuks alles pärast täieliku mini-kontrolli kontrollimist.' : pct >= 70 ? 'Peatüki põhiasjad on heas seisus.' : 'Märgi valed küsimused päevikusse ja tee sama teema üks harjutus juurde.'}</span>
        </div>
      `;

      section.querySelectorAll('[data-mini-weak]').forEach(button => {
        button.addEventListener('click', () => {
          const index = Number(button.dataset.miniWeak);
          const question = questions[index];
          const selectedValue = answers[index];
          const selectedText = selectedValue === null ? 'Vastus jäi valimata' : plainText(question.options[selectedValue]);
          window.DMWeaknesses?.add({
            type: 'mini-check',
            route,
            topic: routeLabel(route),
            title: plainText(question.q).slice(0, 120),
            note: `Valisin: ${selectedText}. Õige: ${plainText(question.options[question.correct])}.`,
            sourceKey: `mini:${route}:${index}`,
          });
          const status = section.querySelector(`[data-mini-weak-status="${index}"]`);
          if (status) status.textContent = 'Lisatud.';
        });
      });
      renderMath(section);
    });

    section.querySelector('#resetMiniControl').addEventListener('click', () => {
      section.querySelectorAll('input[type="radio"]').forEach(input => { input.checked = false; });
      section.querySelectorAll('.mini-option').forEach(label => label.classList.remove('correct', 'wrong'));
      section.querySelectorAll('.mini-feedback').forEach(feedback => {
        feedback.className = 'mini-feedback';
        feedback.innerHTML = '';
      });
      section.querySelector('#miniCheckResult').innerHTML = '';
    });

    section.querySelector('#clearMiniResult')?.addEventListener('click', () => {
      const results = readTopicChecks();
      delete results[route];
      saveTopicChecks(results);
      window.DM?.render ? window.DM.render(route) : location.reload();
    });
  }

  function initTopicExercises(route) {
    const exercises = TOPIC_EXERCISES[route];
    const view = document.getElementById('view');
    if (!view || !exercises || document.getElementById('topicExercises')) return;

    const section = document.createElement('section');
    section.className = 'card topic-exercises';
    section.id = 'topicExercises';
    section.innerHTML = `
      <div class="topic-exercises-head">
        <div>
          <h2>Lahendusülesanded</h2>
          <p>Proovi enne lahenduse avamist ise mõni rida kirja panna.</p>
        </div>
        <span class="tag accent">${exercises.length} tk</span>
      </div>
      <div class="topic-exercise-list">
        ${exercises.map((exercise, index) => `
          <details class="topic-exercise">
            <summary>
              <span>Ülesanne ${index + 1}. ${exercise.title}</span>
              <small>Lahendus</small>
            </summary>
            <div class="topic-exercise-prompt">${exercise.prompt}</div>
            <div class="topic-exercise-solution">
              <h4>Lahendus</h4>
              ${exercise.solution}
              <div class="btn-row">
                <button class="btn small secondary" data-topic-weak="${index}" type="button">Märgi vigade päevikusse</button>
                <span class="muted" data-topic-weak-status="${index}"></span>
              </div>
            </div>
          </details>
        `).join('')}
      </div>
    `;
    view.appendChild(section);
    renderMath(section);
    section.querySelectorAll('[data-topic-weak]').forEach(button => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.topicWeak);
        const exercise = exercises[index];
        window.DMWeaknesses?.add({
          type: 'exercise',
          route,
          topic: routeLabel(route),
          title: exercise.title,
          note: plainText(exercise.prompt).slice(0, 220),
          sourceKey: `exercise:${route}:${index}`,
        });
        const status = section.querySelector(`[data-topic-weak-status="${index}"]`);
        if (status) status.textContent = 'Lisatud.';
      });
    });
  }

  function initGraphStepTasks(route) {
    const tasks = GRAPH_STEP_TASKS[route];
    const view = document.getElementById('view');
    if (!view || !tasks || document.getElementById('graphStepTasks')) return;

    const section = document.createElement('section');
    section.className = 'card graph-step-tasks';
    section.id = 'graphStepTasks';
    view.appendChild(section);

    let taskIndex = 0;
    let stepIndex = 0;
    let feedback = null;

    function resetTask(index = taskIndex) {
      taskIndex = index;
      stepIndex = 0;
      feedback = null;
    }

    function choiceClass(step, optionIndex) {
      if (!feedback || feedback.selected === null) return '';
      if (optionIndex === step.correct) return ' correct';
      if (optionIndex === feedback.selected && !feedback.correct) return ' wrong';
      return '';
    }

    function addWeaknessForStep(step, selected) {
      const selectedText = selected === null ? 'Vastus jäi valimata' : plainText(step.options[selected]);
      window.DMWeaknesses?.add({
        type: 'graph-step',
        route,
        topic: routeLabel(route),
        title: `${tasks[taskIndex].title}: ${plainText(step.question).slice(0, 90)}`,
        note: `Valisin: ${selectedText}. Õige: ${plainText(step.options[step.correct])}.`,
        sourceKey: `graph-step:${route}:${taskIndex}:${stepIndex}`,
      });
    }

    function render() {
      const task = tasks[taskIndex];
      const complete = stepIndex >= task.steps.length;
      const activeStep = complete ? null : task.steps[stepIndex];
      const completedCount = Math.min(stepIndex, task.steps.length);
      const progressPct = Math.round(100 * completedCount / task.steps.length);

      section.innerHTML = `
        <div class="topic-exercises-head">
          <div>
            <h2>Kontrollitavad samm-ülesanded</h2>
            <p>Vali iga graafiteooria ülesande juures järgmine õige samm. Vale valiku saad kohe vigade päevikusse lisada.</p>
          </div>
          <span class="tag accent">${completedCount}/${task.steps.length}</span>
        </div>

        ${tasks.length > 1 ? `
          <div class="graph-step-tabs">
            ${tasks.map((item, index) => `
              <button class="btn small ${index === taskIndex ? '' : 'secondary'}" data-graph-task="${index}" type="button">${item.title}</button>
            `).join('')}
          </div>
        ` : ''}

        <div class="graph-step-case">
          <strong>${task.title}</strong>
          <p>${task.intro}</p>
        </div>

        <div class="progress-bar graph-step-progress"><div class="progress-fill" style="width:${progressPct}%"></div></div>

        <ol class="graph-step-list">
          ${task.steps.map((step, index) => `
            <li class="${complete || index < stepIndex ? 'complete' : index === stepIndex ? 'active' : ''}">
              <strong>Samm ${index + 1}</strong>
              <span>${complete || index < stepIndex ? plainText(step.options[step.correct]) : index === stepIndex ? 'vali järgmine samm' : 'ootab'}</span>
            </li>
          `).join('')}
        </ol>

        ${complete ? `
          <div class="topic-tool-result good">
            <strong>Samm-ülesanne valmis.</strong>
            <span>Oled selle ülesande kõik kontrollsammud läbi teinud. Nüüd tasub sama peatüki mini-kontroll ära lõpetada.</span>
          </div>
          <div class="btn-row">
            <button class="btn small secondary" id="graphStepRestart" type="button">Tee uuesti</button>
          </div>
        ` : `
          <div class="graph-step-panel">
            <h3>Samm ${stepIndex + 1}. ${activeStep.question}</h3>
            <div class="graph-step-choices">
              ${activeStep.options.map((option, optionIndex) => `
                <label class="graph-step-choice${choiceClass(activeStep, optionIndex)}">
                  <input type="radio" name="graph-step-choice" value="${optionIndex}" ${feedback ? 'disabled' : ''} ${feedback?.selected === optionIndex ? 'checked' : ''}>
                  <span>${option}</span>
                </label>
              `).join('')}
            </div>
            ${feedback ? `
              <div class="topic-tool-result ${feedback.selected === null ? 'warn' : feedback.correct ? 'good' : 'bad'} graph-step-feedback">
                <strong>${feedback.selected === null ? 'Vali vastus.' : feedback.correct ? 'Õige samm.' : 'Vale samm.'}</strong>
                <span>${feedback.selected === null ? 'Enne kontrollimist vali üks pakutud sammudest.' : activeStep.explanation}</span>
              </div>
            ` : ''}
            <div class="btn-row">
              <button class="btn small" id="graphStepCheck" type="button" ${feedback ? 'disabled' : ''}>Kontrolli sammu</button>
              ${feedback?.correct ? '<button class="btn small" id="graphStepNext" type="button">Järgmine samm</button>' : ''}
              <button class="btn small secondary" id="graphStepRestart" type="button">Alusta uuesti</button>
              ${feedback && !feedback.correct && feedback.selected !== null ? '<button class="btn small secondary" id="graphStepWeak" type="button">Lisa vigade päevikusse</button><span class="muted" id="graphStepWeakStatus"></span>' : ''}
            </div>
          </div>
        `}
      `;

      renderMath(section);

      section.querySelectorAll('[data-graph-task]').forEach(button => {
        button.addEventListener('click', () => {
          resetTask(Number(button.dataset.graphTask));
          render();
        });
      });

      section.querySelector('#graphStepCheck')?.addEventListener('click', () => {
        const selected = section.querySelector('input[name="graph-step-choice"]:checked');
        const selectedValue = selected ? Number(selected.value) : null;
        feedback = {
          selected: selectedValue,
          correct: selectedValue === activeStep.correct,
        };
        render();
      });

      section.querySelector('#graphStepNext')?.addEventListener('click', () => {
        if (!feedback?.correct) return;
        stepIndex += 1;
        feedback = null;
        render();
      });

      section.querySelector('#graphStepRestart')?.addEventListener('click', () => {
        resetTask();
        render();
      });

      section.querySelector('#graphStepWeak')?.addEventListener('click', () => {
        addWeaknessForStep(activeStep, feedback?.selected ?? null);
        const status = section.querySelector('#graphStepWeakStatus');
        if (status) status.textContent = 'Lisatud.';
      });
    }

    render();
  }

  function readNotes() {
    try { return JSON.parse(localStorage.getItem(CHAPTER_NOTES_KEY)) || {}; }
    catch { return {}; }
  }

  function saveNotes(notes) {
    localStorage.setItem(CHAPTER_NOTES_KEY, JSON.stringify(notes));
  }

  function initChapterNotes(route) {
    if (!TOPIC_EXERCISES[route]) return;
    const view = document.getElementById('view');
    if (!view || document.getElementById('chapterNotes')) return;

    const notes = readNotes();
    const section = document.createElement('section');
    section.className = 'card chapter-notes';
    section.id = 'chapterNotes';
    section.innerHTML = `
      <div class="chapter-notes-head">
        <div>
          <h2>Minu märkmed</h2>
          <p>Kirjuta siia selle peatüki segased kohad, meeldetuletused või lahenduse ideed.</p>
        </div>
        <span class="notes-status" id="chapterNotesStatus">Salvestatud</span>
      </div>
      <textarea id="chapterNotesText" rows="6" placeholder="Näiteks: vaata üle kvantorite eitamine või tee veel üks Havel-Hakimi näide.">${escapeHtml(notes[route] || '')}</textarea>
    `;
    view.appendChild(section);

    const textarea = section.querySelector('#chapterNotesText');
    const status = section.querySelector('#chapterNotesStatus');
    let timer = null;
    textarea.addEventListener('input', () => {
      status.textContent = 'Salvestan...';
      clearTimeout(timer);
      timer = setTimeout(() => {
        const next = readNotes();
        next[route] = textarea.value;
        saveNotes(next);
        status.textContent = 'Salvestatud';
      }, 200);
    });
  }

  window.initTopicTools = function (route) {
    if (route === 'samavaarsus') initEquivalenceTool();
    if (route === 'predikaadid') {
      initQuantifierModelTool();
      initPredicateModelBuilder();
    }
    if (route === 'sekvents') initSequentHelperTool();
    if (route === 'tipuastmed') initDegreeSequenceTool();
    if (route === 'eulerhamilton') initEulerHamiltonTool();
    if (route === 'puud') initTreePropertyTool();
    initTopicExercises(route);
    initGraphStepTasks(route);
    initTopicMiniCheck(route);
    initChapterNotes(route);
  };
})();

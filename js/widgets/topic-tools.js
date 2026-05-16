/* ===== Small interactive tools embedded in theory pages ===== */

(function () {
  'use strict';

  const CHAPTER_NOTES_KEY = 'dm_chapter_notes_v1';

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
            </div>
          </details>
        `).join('')}
      </div>
    `;
    view.appendChild(section);
    renderMath(section);
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
    initChapterNotes(route);
  };
})();

/* ===== Interactive truth-tree builder for propositional logic ===== */

(function () {
  'use strict';

  const SYMBOLS = [
    { label: '¬', insert: '!' },
    { label: '&', insert: '&' },
    { label: '∨', insert: '|' },
    { label: '⇒', insert: '->' },
    { label: '⇔', insert: '<->' },
    { label: '(', insert: '(' },
    { label: ')', insert: ')' },
  ];

  const EXAMPLES = [
    { label: 'Modus ponens', value: '(A -> B) & A -> B', goal: 'tautology' },
    { label: 'De Morgan', value: '!(A & B) <-> (!A | !B)', goal: 'tautology' },
    { label: 'Kehtestatav', value: '(A -> B) & !B', goal: 'satisfiable' },
    { label: 'Vasturääkivus', value: 'A & !A', goal: 'contradiction' },
  ];

  let nodeSeq = 0;

  function tokenize(s) {
    const tokens = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if (s.startsWith('<->', i) || s.startsWith('<=>', i)) { tokens.push({ t: 'iff' }); i += 3; continue; }
      if (s.startsWith('->', i) || s.startsWith('=>', i)) { tokens.push({ t: 'imp' }); i += 2; continue; }
      if (c === '⇔' || c === '↔') { tokens.push({ t: 'iff' }); i++; continue; }
      if (c === '⇒' || c === '→' || c === '⊃') { tokens.push({ t: 'imp' }); i++; continue; }
      if (c === '¬' || c === '~' || c === '!') { tokens.push({ t: 'not' }); i++; continue; }
      if (c === '&' || c === '∧' || c === '·') { tokens.push({ t: 'and' }); i++; continue; }
      if (c === '|' || c === '∨' || c === '+') { tokens.push({ t: 'or' }); i++; continue; }
      if (c === '(') { tokens.push({ t: 'lp' }); i++; continue; }
      if (c === ')') { tokens.push({ t: 'rp' }); i++; continue; }
      if (/[A-Za-z]/.test(c)) {
        let v = '';
        while (i < s.length && /[A-Za-z0-9_]/.test(s[i])) v += s[i++];
        if (v === '1' || v.toUpperCase() === 'T') { tokens.push({ t: 'lit', v: true }); continue; }
        if (v === '0' || v.toUpperCase() === 'F') { tokens.push({ t: 'lit', v: false }); continue; }
        tokens.push({ t: 'var', v });
        continue;
      }
      if (c === '1') { tokens.push({ t: 'lit', v: true }); i++; continue; }
      if (c === '0') { tokens.push({ t: 'lit', v: false }); i++; continue; }
      throw new Error(`Tundmatu sümbol "${c}" positsioonil ${i}.`);
    }
    return tokens;
  }

  function parse(tokens) {
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
      if (tok.t === 'lp') { eat(); const e = parseIff(); expect('rp'); return e; }
      if (tok.t === 'var') { eat(); return { op: 'var', v: tok.v }; }
      if (tok.t === 'lit') { eat(); return { op: 'lit', v: tok.v }; }
      throw new Error('Ootamatu sümbol.');
    }
    const ast = parseIff();
    if (pos < tokens.length) throw new Error('Ootamatu sümbol valemi lõpus.');
    return ast;
  }

  function astToStr(ast) {
    const prec = { iff: 1, imp: 2, or: 3, and: 4, not: 5, var: 6, lit: 6 };
    function go(node, parent = 0) {
      if (node.op === 'var') return node.v;
      if (node.op === 'lit') return node.v ? '1' : '0';
      if (node.op === 'not') {
        const text = `¬${go(node.a, prec.not)}`;
        return prec.not < parent ? `(${text})` : text;
      }
      const sym = { and: ' ∧ ', or: ' ∨ ', imp: ' ⇒ ', iff: ' ⇔ ' }[node.op];
      const text = `${go(node.a, prec[node.op])}${sym}${go(node.b, prec[node.op])}`;
      return prec[node.op] < parent ? `(${text})` : text;
    }
    return go(ast);
  }

  function isAtomic(ast) {
    return ast.op === 'var' || ast.op === 'lit';
  }

  function makeFormula(sign, ast, rule = '') {
    return { id: ++nodeSeq, sign, ast, expanded: isAtomic(ast), rule };
  }

  function cloneBranch(branch) {
    return {
      formulas: branch.formulas.map(f => ({ ...f })),
      steps: [...branch.steps],
      closed: false,
      reason: '',
    };
  }

  function signedText(f) {
    return `${f.sign ? 'T' : 'F'} ${astToStr(f.ast)}`;
  }

  function closureReason(branch) {
    const seen = new Map();
    for (const f of branch.formulas) {
      if (f.ast.op === 'lit') {
        if ((f.sign && !f.ast.v) || (!f.sign && f.ast.v)) return `${signedText(f)} on vastuolu`;
        continue;
      }
      if (f.ast.op !== 'var') continue;
      const prev = seen.get(f.ast.v);
      if (prev !== undefined && prev !== f.sign) return `${f.ast.v} on samal harus tõene ja väär`;
      seen.set(f.ast.v, f.sign);
    }
    return '';
  }

  function addLinear(branch, source, additions, label) {
    source.expanded = true;
    additions.forEach(item => branch.formulas.push(makeFormula(item.sign, item.ast, label)));
    branch.steps.push(`${signedText(source)}: ${label}`);
    return [branch];
  }

  function addBranches(branch, source, branches, label) {
    source.expanded = true;
    branch.steps.push(`${signedText(source)}: ${label}`);
    return branches.map((items, index) => {
      const next = cloneBranch(branch);
      items.forEach(item => next.formulas.push(makeFormula(item.sign, item.ast, `${label}, haru ${index + 1}`)));
      return next;
    });
  }

  function expandOne(branch, formula) {
    const { sign, ast } = formula;
    if (ast.op === 'not') {
      return addLinear(branch, formula, [{ sign: !sign, ast: ast.a }], 'eituse reegel');
    }
    if (ast.op === 'and') {
      if (sign) return addLinear(branch, formula, [{ sign: true, ast: ast.a }, { sign: true, ast: ast.b }], 'T∧: mõlemad tõesed');
      return addBranches(branch, formula, [[{ sign: false, ast: ast.a }], [{ sign: false, ast: ast.b }]], 'F∧: hargnemine');
    }
    if (ast.op === 'or') {
      if (sign) return addBranches(branch, formula, [[{ sign: true, ast: ast.a }], [{ sign: true, ast: ast.b }]], 'T∨: hargnemine');
      return addLinear(branch, formula, [{ sign: false, ast: ast.a }, { sign: false, ast: ast.b }], 'F∨: mõlemad väärad');
    }
    if (ast.op === 'imp') {
      if (sign) return addBranches(branch, formula, [[{ sign: false, ast: ast.a }], [{ sign: true, ast: ast.b }]], 'T⇒: hargnemine');
      return addLinear(branch, formula, [{ sign: true, ast: ast.a }, { sign: false, ast: ast.b }], 'F⇒: eeldus tõene, järeldus väär');
    }
    if (ast.op === 'iff') {
      if (sign) {
        return addBranches(branch, formula, [
          [{ sign: true, ast: ast.a }, { sign: true, ast: ast.b }],
          [{ sign: false, ast: ast.a }, { sign: false, ast: ast.b }],
        ], 'T⇔: sama tõeväärtus');
      }
      return addBranches(branch, formula, [
        [{ sign: true, ast: ast.a }, { sign: false, ast: ast.b }],
        [{ sign: false, ast: ast.a }, { sign: true, ast: ast.b }],
      ], 'F⇔: erinev tõeväärtus');
    }
    formula.expanded = true;
    return [branch];
  }

  function buildTree(startSign, ast) {
    nodeSeq = 0;
    let branches = [{
      formulas: [makeFormula(startSign, ast, 'algus')],
      steps: [],
      closed: false,
      reason: '',
    }];
    let changed = true;
    let guard = 0;

    while (changed && guard++ < 200) {
      changed = false;
      const nextRound = [];
      for (const branch of branches) {
        const reason = closureReason(branch);
        if (reason) {
          branch.closed = true;
          branch.reason = reason;
          nextRound.push(branch);
          continue;
        }
        const formula = branch.formulas.find(f => !f.expanded && !isAtomic(f.ast));
        if (!formula) {
          nextRound.push(branch);
          continue;
        }
        changed = true;
        nextRound.push(...expandOne(branch, formula));
      }
      branches = nextRound;
    }

    branches.forEach(branch => {
      const reason = closureReason(branch);
      branch.closed = Boolean(reason);
      branch.reason = reason;
    });

    return branches;
  }

  function valuationFromBranch(branch) {
    const values = {};
    branch.formulas.forEach(f => {
      if (f.ast.op === 'var' && values[f.ast.v] === undefined) values[f.ast.v] = f.sign;
    });
    return Object.keys(values).sort().map(k => `${k}=${values[k] ? 1 : 0}`).join(', ') || 'muutujaid pole vaja fikseerida';
  }

  function verdict(goal, branches) {
    const allClosed = branches.every(b => b.closed);
    const openBranches = branches.filter(b => !b.closed);
    if (goal === 'tautology') {
      return allClosed
        ? { cls: 'good', title: 'Valem on samaselt tõene', text: 'Valemi vääraks eeldamine sulgeb kõik harud.' }
        : { cls: 'warn', title: 'Valem ei ole samaselt tõene', text: `Avatud haru annab vastunäite: ${valuationFromBranch(openBranches[0])}.` };
    }
    if (goal === 'contradiction') {
      return allClosed
        ? { cls: 'good', title: 'Valem on samaselt väär', text: 'Valemi tõeseks eeldamine sulgeb kõik harud.' }
        : { cls: 'warn', title: 'Valem ei ole samaselt väär', text: `Avatud haru teeb valemi tõeseks: ${valuationFromBranch(openBranches[0])}.` };
    }
    return allClosed
      ? { cls: 'bad', title: 'Valem ei ole kehtestatav', text: 'Valemi tõeseks eeldamine viib igal harus vastuoluni.' }
      : { cls: 'good', title: 'Valem on kehtestatav', text: `Üks sobiv väärtustus: ${valuationFromBranch(openBranches[0])}.` };
  }

  function renderResult(goal, ast, branches) {
    const v = verdict(goal, branches);
    return `
      <div class="truth-tree-verdict ${v.cls}">
        <h3>${v.title}</h3>
        <p>${v.text}</p>
      </div>
      <div class="truth-tree-branches">
        ${branches.map((branch, index) => `
          <div class="truth-tree-branch ${branch.closed ? 'closed' : 'open'}">
            <div class="truth-tree-branch-head">
              <strong>Haru ${index + 1}</strong>
              <span class="tag ${branch.closed ? 'bad' : 'good'}">${branch.closed ? 'suletud' : 'avatud'}</span>
            </div>
            <ol>
              ${branch.formulas.map(f => `
                <li class="${f.expanded && !isAtomic(f.ast) ? 'expanded' : ''}">
                  <code>${signedText(f)}</code>
                  ${f.rule ? `<small>${f.rule}</small>` : ''}
                </li>
              `).join('')}
            </ol>
            <p class="muted">${branch.closed ? branch.reason : `Väärtustus: ${valuationFromBranch(branch)}`}</p>
          </div>
        `).join('')}
      </div>
      <details class="truth-tree-steps">
        <summary>Rakendatud sammud</summary>
        ${branches.map((branch, index) => `
          <h4>Haru ${index + 1}</h4>
          ${branch.steps.length ? `<ol>${branch.steps.map(step => `<li>${step}</li>`).join('')}</ol>` : '<p>Lisareegleid ei olnud vaja.</p>'}
        `).join('')}
      </details>
    `;
  }

  function insertAtCursor(input, text) {
    const pos = input.selectionStart || 0;
    const value = input.value;
    input.value = value.slice(0, pos) + text + value.slice(pos);
    input.focus();
    input.selectionStart = input.selectionEnd = pos + text.length;
  }

  window.initTruthTree = function () {
    const view = document.getElementById('view');
    if (!view || document.getElementById('truthTreeBuilder')) return;

    const builder = document.createElement('div');
    builder.id = 'truthTreeBuilder';
    builder.className = 'card truth-tree-builder';
    builder.innerHTML = `
      <h2>Interaktiivne tõesuspuu ehitaja</h2>
      <p>Lausearvutuse valemite jaoks. Predikaatloogika kvantorireegleid see tööriist veel ei rakenda.</p>
      <div class="symbol-bar" id="treeSymbolBar"></div>
      <div class="input-row">
        <input id="treeFormulaInput" type="text" placeholder="Nt: (A -> B) & A -> B" autocomplete="off">
        <select id="treeGoal">
          <option value="tautology">Kontrolli samaselt tõesust</option>
          <option value="satisfiable">Kontrolli kehtestatavust</option>
          <option value="contradiction">Kontrolli samaselt väärust</option>
        </select>
        <button class="btn" id="buildTreeBtn">Ehita puu</button>
      </div>
      <div id="treeFormulaError" style="color: var(--bad); font-size: 13px;"></div>
      <div class="btn-row">
        <strong>Näited:</strong>
        ${EXAMPLES.map((ex, index) => `<button class="btn small secondary" data-tree-example="${index}">${ex.label}</button>`).join('')}
      </div>
      <div id="truthTreeResult"></div>
    `;

    const firstTip = view.querySelector('.card');
    if (firstTip) firstTip.insertAdjacentElement('beforebegin', builder);
    else view.appendChild(builder);

    const input = document.getElementById('treeFormulaInput');
    const goal = document.getElementById('treeGoal');
    const result = document.getElementById('truthTreeResult');
    const error = document.getElementById('treeFormulaError');
    const bar = document.getElementById('treeSymbolBar');

    bar.innerHTML = SYMBOLS.map(s => `<button type="button" data-insert="${s.insert}">${s.label}</button>`).join('');
    bar.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => insertAtCursor(input, btn.dataset.insert));
    });

    function run() {
      error.textContent = '';
      result.innerHTML = '';
      const text = input.value.trim();
      if (!text) return;
      try {
        const ast = parse(tokenize(text));
        const startSign = goal.value === 'tautology' ? false : true;
        const branches = buildTree(startSign, ast);
        result.innerHTML = renderResult(goal.value, ast, branches);
      } catch (err) {
        error.textContent = err.message;
      }
    }

    document.getElementById('buildTreeBtn').addEventListener('click', run);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') run(); });
    document.querySelectorAll('[data-tree-example]').forEach(btn => {
      btn.addEventListener('click', () => {
        const ex = EXAMPLES[Number(btn.dataset.treeExample)];
        input.value = ex.value;
        goal.value = ex.goal;
        run();
      });
    });
  };
})();

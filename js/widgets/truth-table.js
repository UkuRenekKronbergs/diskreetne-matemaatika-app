/* ===== Truth table builder ===== */
/* Recursive-descent parser for propositional logic formulas. */

(function () {
  'use strict';

  // Symbols
  const SYMBOLS = [
    {label: '¬', insert: '!'},
    {label: '&', insert: '&'},
    {label: '∨', insert: '|'},
    {label: '⇒', insert: '->'},
    {label: '⇔', insert: '<->'},
    {label: '(', insert: '('},
    {label: ')', insert: ')'},
  ];

  // ---- Tokenizer ----
  function tokenize(s) {
    const tokens = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      // Multi-char operators
      if (s.startsWith('<->', i) || s.startsWith('<=>', i)) { tokens.push({t: 'iff'}); i += 3; continue; }
      if (s.startsWith('->', i) || s.startsWith('=>', i)) { tokens.push({t: 'imp'}); i += 2; continue; }
      // Unicode operators
      if (c === '⇔' || c === '↔') { tokens.push({t: 'iff'}); i++; continue; }
      if (c === '⇒' || c === '→' || c === '⊃') { tokens.push({t: 'imp'}); i++; continue; }
      if (c === '¬' || c === '~' || c === '!') { tokens.push({t: 'not'}); i++; continue; }
      if (c === '&' || c === '∧' || c === '·') { tokens.push({t: 'and'}); i++; continue; }
      if (c === '|' || c === '∨' || c === '+') { tokens.push({t: 'or'}); i++; continue; }
      if (c === '(') { tokens.push({t: 'lp'}); i++; continue; }
      if (c === ')') { tokens.push({t: 'rp'}); i++; continue; }
      if (/[A-Za-z]/.test(c)) {
        let v = '';
        while (i < s.length && /[A-Za-z0-9_]/.test(s[i])) v += s[i++];
        if (v === '1' || v.toUpperCase() === 'T') { tokens.push({t: 'lit', v: true}); continue; }
        if (v === '0' || v.toUpperCase() === 'F') { tokens.push({t: 'lit', v: false}); continue; }
        tokens.push({t: 'var', v});
        continue;
      }
      if (c === '1') { tokens.push({t: 'lit', v: true}); i++; continue; }
      if (c === '0') { tokens.push({t: 'lit', v: false}); i++; continue; }
      throw new Error(`Tundmatu sümbol: "${c}" positsioonil ${i}`);
    }
    return tokens;
  }

  // ---- Parser (precedence: ¬ > & > ∨ > ⇒ > ⇔, right-associative for ⇒, ⇔) ----
  function parse(tokens) {
    let pos = 0;
    function peek() { return tokens[pos]; }
    function eat() { return tokens[pos++]; }
    function expect(t) {
      const tok = peek();
      if (!tok || tok.t !== t) throw new Error(`Oodati ${t}, sain ${tok ? tok.t : 'lõppu'}`);
      return eat();
    }

    function parseIff() {
      let left = parseImp();
      while (peek() && peek().t === 'iff') { eat(); left = {op: 'iff', a: left, b: parseImp()}; }
      return left;
    }
    function parseImp() {
      const left = parseOr();
      if (peek() && peek().t === 'imp') { eat(); return {op: 'imp', a: left, b: parseImp()}; } // right-assoc
      return left;
    }
    function parseOr() {
      let left = parseAnd();
      while (peek() && peek().t === 'or') { eat(); left = {op: 'or', a: left, b: parseAnd()}; }
      return left;
    }
    function parseAnd() {
      let left = parseNot();
      while (peek() && peek().t === 'and') { eat(); left = {op: 'and', a: left, b: parseNot()}; }
      return left;
    }
    function parseNot() {
      if (peek() && peek().t === 'not') { eat(); return {op: 'not', a: parseNot()}; }
      return parseAtom();
    }
    function parseAtom() {
      const t = peek();
      if (!t) throw new Error('Ootamatu valemilõpp');
      if (t.t === 'lp') { eat(); const e = parseIff(); expect('rp'); return e; }
      if (t.t === 'var') { eat(); return {op: 'var', v: t.v}; }
      if (t.t === 'lit') { eat(); return {op: 'lit', v: t.v}; }
      throw new Error(`Ootamatu sümbol`);
    }

    const result = parseIff();
    if (pos < tokens.length) throw new Error(`Ootamatu sümbol valemi lõpus`);
    return result;
  }

  // ---- Evaluator ----
  function evalAst(ast, env) {
    switch (ast.op) {
      case 'lit': return ast.v;
      case 'var': return env[ast.v];
      case 'not': return !evalAst(ast.a, env);
      case 'and': return evalAst(ast.a, env) && evalAst(ast.b, env);
      case 'or':  return evalAst(ast.a, env) || evalAst(ast.b, env);
      case 'imp': return !evalAst(ast.a, env) || evalAst(ast.b, env);
      case 'iff': return evalAst(ast.a, env) === evalAst(ast.b, env);
    }
  }

  // ---- AST → pretty string ----
  function astToStr(ast) {
    const PREC = {iff: 1, imp: 2, or: 3, and: 4, not: 5};
    function go(node, parentPrec) {
      if (node.op === 'lit') return node.v ? '1' : '0';
      if (node.op === 'var') return node.v;
      if (node.op === 'not') return `¬${go(node.a, PREC.not)}`;
      const cur = PREC[node.op];
      const sym = { and: ' ∧ ', or: ' ∨ ', imp: ' ⇒ ', iff: ' ⇔ ' }[node.op];
      let s = `${go(node.a, cur)}${sym}${go(node.b, cur)}`;
      if (cur < parentPrec) s = `(${s})`;
      return s;
    }
    return go(ast, 0);
  }

  // ---- Collect variables ----
  function collectVars(ast) {
    const set = new Set();
    function walk(n) {
      if (!n) return;
      if (n.op === 'var') set.add(n.v);
      ['a', 'b'].forEach(k => n[k] && walk(n[k]));
    }
    walk(ast);
    return [...set].sort();
  }

  // ---- Collect subformulas (post-order) ----
  function collectSubs(ast) {
    const out = [];
    const seen = new Set();
    function walk(n) {
      if (!n) return;
      if (n.op === 'var' || n.op === 'lit') return;
      ['a', 'b'].forEach(k => n[k] && walk(n[k]));
      const s = astToStr(n);
      if (!seen.has(s)) { seen.add(s); out.push({ast: n, str: s}); }
    }
    walk(ast);
    return out;
  }

  // ---- Build truth table ----
  function buildTable(ast) {
    const vars = collectVars(ast);
    const subs = collectSubs(ast);
    const n = vars.length;
    const rows = [];
    let allTrue = true, allFalse = true;
    for (let i = (1 << n) - 1; i >= 0; i--) {
      const env = {};
      vars.forEach((v, j) => env[v] = !!(i & (1 << (n - 1 - j))));
      const subVals = subs.map(s => evalAst(s.ast, env));
      const result = subs.length ? subVals[subVals.length - 1] : evalAst(ast, env);
      rows.push({env, subVals, result});
      if (result) allFalse = false; else allTrue = false;
    }
    return {vars, subs, rows, allTrue, allFalse};
  }

  // ---- Render ----
  function renderTable(result, formulaStr) {
    if (!result.vars.length) {
      const ans = result.rows[0].result;
      return `<div class="card">
        <p>Konstantne valem: <strong>${formulaStr}</strong> = <span class="${ans ? 'val-1' : 'val-0'}">${ans ? '1 (tõene)' : '0 (väär)'}</span></p>
      </div>`;
    }
    const headerVars = result.vars.map(v => `<th>${v}</th>`).join('');
    const headerSubs = result.subs.map(s => `<th>${s.str}</th>`).join('');

    const bodyRows = result.rows.map(r => {
      const cells = result.vars.map(v => `<td class="${r.env[v] ? 'val-1' : 'val-0'}">${r.env[v] ? 1 : 0}</td>`).join('');
      const subCells = r.subVals.map((v, i) => {
        const isLast = i === r.subVals.length - 1;
        return `<td class="${v ? 'val-1' : 'val-0'} ${isLast ? 'highlight' : ''}">${v ? 1 : 0}</td>`;
      }).join('');
      return `<tr>${cells}${subCells}</tr>`;
    }).join('');

    let verdict;
    if (result.allTrue) verdict = `<span class="tag good">samaselt tõene (tautoloogia)</span>`;
    else if (result.allFalse) verdict = `<span class="tag bad">samaselt väär (vasturääkivus)</span>`;
    else verdict = `<span class="tag warn">kehtestatav, kuid mitte samaselt tõene</span>`;

    const trueCount = result.rows.filter(r => r.result).length;

    return `<div class="card">
      <h3>Tulemus: ${formulaStr}</h3>
      <p>${verdict} — tõene ${trueCount}/${result.rows.length} väärtustusel.</p>
      <div style="overflow-x: auto;">
      <table class="truth-table">
        <thead><tr>${headerVars}${headerSubs}</tr></thead>
        <tbody>${bodyRows}</tbody>
      </table>
      </div>
    </div>`;
  }

  // ---- Init UI ----
  window.initTruthTable = function () {
    const bar = document.getElementById('symbolBar');
    const input = document.getElementById('formulaInput');
    const btn = document.getElementById('buildBtn');
    const clearBtn = document.getElementById('clearBtn');
    const err = document.getElementById('formulaError');
    const out = document.getElementById('ttResult');
    if (!input || !btn) return;

    bar.innerHTML = SYMBOLS.map(s => `<button data-i="${s.insert}">${s.label}</button>`).join('');
    bar.querySelectorAll('button').forEach(b => {
      b.addEventListener('click', () => {
        const pos = input.selectionStart || 0;
        const v = input.value;
        input.value = v.slice(0, pos) + b.dataset.i + v.slice(pos);
        input.focus();
        input.selectionStart = input.selectionEnd = pos + b.dataset.i.length;
      });
    });

    function go() {
      err.textContent = '';
      out.innerHTML = '';
      const txt = input.value.trim();
      if (!txt) return;
      try {
        const tokens = tokenize(txt);
        const ast = parse(tokens);
        const result = buildTable(ast);
        out.innerHTML = renderTable(result, astToStr(ast));
      } catch (e) {
        err.textContent = '⚠ ' + e.message;
      }
    }
    btn.addEventListener('click', go);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
    clearBtn?.addEventListener('click', () => { input.value = ''; out.innerHTML = ''; err.textContent = ''; });

    document.querySelectorAll('[data-example]').forEach(b => {
      b.addEventListener('click', () => { input.value = b.dataset.example; go(); });
    });
  };
})();

/* ===== Full DNF/CNF generator ===== */

(function () {
  'use strict';

  function tokenize(s) {
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

  function parse(tokens) {
    let pos = 0;
    const peek = () => tokens[pos];
    const eat = () => tokens[pos++];
    function expect(t) {
      if (!peek() || peek().t !== t) throw new Error(`Oodati ${t}, sain ${peek() ? peek().t : 'lõppu'}.`);
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

  function evaluate(ast, env) {
    switch (ast.op) {
      case 'var': return Boolean(env[ast.v]);
      case 'not': return !evaluate(ast.a, env);
      case 'and': return evaluate(ast.a, env) && evaluate(ast.b, env);
      case 'or': return evaluate(ast.a, env) || evaluate(ast.b, env);
      case 'imp': return !evaluate(ast.a, env) || evaluate(ast.b, env);
      case 'iff': return evaluate(ast.a, env) === evaluate(ast.b, env);
      default: return false;
    }
  }

  function renderMath(el) {
    if (!window.renderMathInElement || !el) return;
    window.renderMathInElement(el, {
      delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
      throwOnError: false,
    });
  }

  function literal(v, value, forCnf) {
    if (forCnf) return value ? `\\neg ${v}` : v;
    return value ? v : `\\neg ${v}`;
  }

  function parenthesize(parts, op) {
    if (parts.length === 0) return op === '\\lor' ? '0' : '1';
    if (parts.length === 1) return parts[0];
    return parts.map(part => `(${part})`).join(` ${op} `);
  }

  function buildForms(rows, vars) {
    const trueRows = rows.filter(row => row.value);
    const falseRows = rows.filter(row => !row.value);
    const dnfTerms = trueRows.map(row => vars.map(v => literal(v, row.env[v], false)).join(' \\& '));
    const cnfTerms = falseRows.map(row => vars.map(v => literal(v, row.env[v], true)).join(' \\lor '));
    return {
      dnf: trueRows.length === 0 ? '0' : trueRows.length === rows.length ? '1' : parenthesize(dnfTerms, '\\lor'),
      cnf: falseRows.length === 0 ? '1' : falseRows.length === rows.length ? '0' : parenthesize(cnfTerms, '\\&'),
      trueRows,
      falseRows,
    };
  }

  window.initNormalForms = function () {
    const view = document.getElementById('view');
    if (!view) return;
    view.innerHTML = `
      <h1>DNK/KNK generaator</h1>
      <p>Sisesta lausearvutuse valem. Tööriist koostab tõeväärtustabeli ning täieliku disjunktiivse ja konjunktiivse normaalkuju.</p>
      <div class="card">
        <div class="symbol-bar">
          ${['¬', '&', '∨', '⇒', '⇔', '(', ')'].map(sym => `<button type="button" data-nf-symbol="${sym}">${sym}</button>`).join('')}
        </div>
        <div class="input-row">
          <input id="nfInput" type="text" value="(A -> B) & (B -> C)" autocomplete="off">
          <button class="btn" id="nfBuild" type="button">Koosta</button>
        </div>
        <div class="btn-row">
          <button class="btn small secondary" data-nf-example="!(A & B)">De Morgan</button>
          <button class="btn small secondary" data-nf-example="A | !A">Tautoloogia</button>
          <button class="btn small secondary" data-nf-example="A & !A">Vastuolu</button>
        </div>
        <div id="nfError" class="form-error"></div>
      </div>
      <div id="nfResult"></div>
    `;

    const input = document.getElementById('nfInput');
    document.querySelectorAll('[data-nf-symbol]').forEach(btn => {
      btn.addEventListener('click', () => {
        const start = input.selectionStart ?? input.value.length;
        input.value = `${input.value.slice(0, start)}${btn.dataset.nfSymbol}${input.value.slice(start)}`;
        input.focus();
        input.selectionStart = input.selectionEnd = start + btn.dataset.nfSymbol.length;
      });
    });
    document.querySelectorAll('[data-nf-example]').forEach(btn => {
      btn.addEventListener('click', () => { input.value = btn.dataset.nfExample; build(); });
    });
    document.getElementById('nfBuild').addEventListener('click', build);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') build(); });

    function build() {
      const error = document.getElementById('nfError');
      const out = document.getElementById('nfResult');
      error.textContent = '';
      try {
        const ast = parse(tokenize(input.value));
        const vars = [...collectVars(ast)].sort();
        if (vars.length > 6) throw new Error('Liiga palju muutujaid. Hoia näide kuni 6 muutujaga.');
        const rows = [];
        for (let mask = 0; mask < 2 ** vars.length; mask++) {
          const env = {};
          vars.forEach((v, i) => { env[v] = Boolean(mask & (1 << (vars.length - i - 1))); });
          rows.push({ env, value: evaluate(ast, env) });
        }
        const forms = buildForms(rows, vars);
        out.innerHTML = `
          <div class="normal-form-grid">
            <div class="card">
              <h3>Täielik DNK</h3>
              <div class="formula">$$${forms.dnf}$$</div>
              <p class="muted">Koostatud ${forms.trueRows.length} tõese rea põhjal.</p>
            </div>
            <div class="card">
              <h3>Täielik KNK</h3>
              <div class="formula">$$${forms.cnf}$$</div>
              <p class="muted">Koostatud ${forms.falseRows.length} väära rea põhjal.</p>
            </div>
          </div>
          <div class="topic-table-wrap">
            <table class="truth-table">
              <thead><tr>${vars.map(v => `<th>${v}</th>`).join('')}<th>F</th></tr></thead>
              <tbody>${rows.map(row => `<tr>${vars.map(v => `<td>${row.env[v] ? 1 : 0}</td>`).join('')}<td class="${row.value ? 'val-1' : 'val-0'}">${row.value ? 1 : 0}</td></tr>`).join('')}</tbody>
            </table>
          </div>
        `;
        renderMath(out);
      } catch (err) {
        error.textContent = err.message;
        out.innerHTML = '';
      }
    }
    build();
  };
})();

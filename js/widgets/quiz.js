/* ===== Quiz, Flashcards, Glossary widgets ===== */

(function () {
  'use strict';

  // ============ QUIZ ============
  const QUESTIONS = [
    {
      q: 'Mis on lausearvutuse valem $A \\Rightarrow A \\& B$ tõeväärtus, kui $A=1, B=0$?',
      options: ['1 (tõene)', '0 (väär)', 'See sõltub muutujatest', 'Pole defineeritud'],
      correct: 1,
      exp: '$1 \\& 0 = 0$, seega $A \\Rightarrow A\\&B = 1 \\Rightarrow 0 = 0$.',
    },
    {
      q: 'Milline neist on samaselt tõene valem (tautoloogia)?',
      options: ['$A \\& B$', '$A \\lor B$', '$A \\lor \\neg A$', '$A \\& \\neg A$'],
      correct: 2,
      exp: 'Välistatud kolmanda seadus: iga lause on kas tõene või väär, seega $A \\lor \\neg A$ on alati tõene.',
    },
    {
      q: 'De Morgani seadus ütleb, et $\\neg(A \\& B) \\equiv$ ?',
      options: ['$\\neg A \\& \\neg B$', '$\\neg A \\lor \\neg B$', '$A \\& \\neg B$', '$\\neg A \\Rightarrow B$'],
      correct: 1,
      exp: 'LS11: $\\neg(F\\&G) \\equiv \\neg F \\lor \\neg G$.',
    },
    {
      q: 'Mitu väärtustust on 4 muutujat sisaldaval valemil?',
      options: ['8', '16', '24', '4'],
      correct: 1,
      exp: '$2^n = 2^4 = 16$ väärtustust.',
    },
    {
      q: 'Implikatsioon $F \\Rightarrow G$ on samaväärne valemiga:',
      options: ['$\\neg F \\& G$', '$\\neg F \\lor G$', '$F \\lor \\neg G$', '$F \\& G$'],
      correct: 1,
      exp: 'LS14: $F \\Rightarrow G \\equiv \\neg F \\lor G$. Implikatsioon on väär ainult juhul, kui $F=1$ ja $G=0$.',
    },
    {
      q: 'Predikaatloogikas $\\neg \\forall x P(x) \\equiv$ ?',
      options: ['$\\forall x \\neg P(x)$', '$\\exists x \\neg P(x)$', '$\\neg \\exists x P(x)$', '$\\exists x P(x)$'],
      correct: 1,
      exp: 'Kvantorite eitamine: $\\neg \\forall \\to \\exists \\neg$.',
    },
    {
      q: 'Peano aritmeetika signatuur on:',
      options: ['$\\langle 0, 1; +, \\cdot; = \\rangle$', '$\\langle 0; \', +, \\cdot; = \\rangle$', '$\\langle 0; +, \\cdot; <, = \\rangle$', '$\\langle\\,; +, \\cdot, -; = \\rangle$'],
      correct: 1,
      exp: 'Peano signatuur: $\\langle 0; \', +, \\cdot; = \\rangle$ — üks konstant ($0$), üks ühekohaline funktsioon ($\'$), kaks kahekohalist ($+, \\cdot$), üks predikaat ($=$).',
    },
    {
      q: 'Peano aksioom P3 ütleb, et:',
      options: ['$\\forall x(0+x = x)$', '$\\forall x(x+0 = x)$', '$\\forall x \\neg(x\' = 0)$', '$\\forall x(x\' = x+1)$'],
      correct: 1,
      exp: 'P3: $\\forall x(x+0 = x)$ — null on liitmise neutraalelement (paremalt). $\\forall x(0+x=x)$ tuleb tõestada induktsiooniga.',
    },
    {
      q: 'Sekvents on:',
      options: ['Tehetega valem', 'Aksiomatiline süsteem', 'Avaldis kujul $\\Gamma \\vdash F$', 'Tõesuspuu element'],
      correct: 2,
      exp: 'Sekvents on $\\Gamma \\vdash F$, kus $\\Gamma$ on valemite hulk ja $F$ valem; loeme: „valemitest $\\Gamma$ on tuletatav $F$".',
    },
    {
      q: 'Tipuastmete teoreem ütleb, et:',
      options: ['$\\sum d(v) = |V|$', '$\\sum d(v) = |E|$', '$\\sum d(v) = 2|E|$', '$\\sum d(v) = 2|V|$'],
      correct: 2,
      exp: 'Iga serv panustab 2 ühikut summasse (1 igale otstipule), seega $\\sum d(v) = 2|E|$.',
    },
    {
      q: 'Mitu serva on täisgraafil $K_5$?',
      options: ['5', '10', '15', '20'],
      correct: 1,
      exp: '$\\binom{5}{2} = \\frac{5 \\cdot 4}{2} = 10$ serva.',
    },
    {
      q: 'Graaf on Euleri graaf parajasti siis, kui:',
      options: ['Ta on sidus ja kõik tipuastmed paarisarvud', 'Ta on sidus ja igal tipul aste vähemalt $n/2$', 'Tal on Hamiltoni tsükkel', 'Ta on puu'],
      correct: 0,
      exp: 'Euleri teoreem: sidus ja kõik tipuastmed paarisarvud ⇔ kinnine Euleri ahel olemas.',
    },
    {
      q: 'Mitu serva on $n$-tipulisel puul?',
      options: ['$n$', '$n-1$', '$n+1$', '$n(n-1)/2$'],
      correct: 1,
      exp: '$n$-tipulisel puul on alati täpselt $n-1$ serva.',
    },
    {
      q: 'Kruskali algoritm:',
      options: ['Kasvatab puud ühest tipust alates', 'Lisab vähima kaaluga servi, vältides tsüklite teket', 'Leiab lühima tee', 'Kontrollib sidusust'],
      correct: 1,
      exp: 'Kruskal sorteerib servad kaalu järgi, lisab järgemööda neid, mis ei tekita tsüklit.',
    },
    {
      q: 'Dijkstra algoritm ei töö, kui:',
      options: ['Graaf on suunatud', 'Graafis on tsükleid', 'Graafis on negatiivseid kaale', 'Graafis on $> 100$ tippu'],
      correct: 2,
      exp: 'Dijkstra eeldab mittenegatiivseid kaale. Negatiivsete kaalude korral kasuta Bellman–Fordi.',
    },
    {
      q: 'Diraci teoreem annab piisava tingimuse Hamiltoni tsükli leidumiseks: iga tipu aste on vähemalt:',
      options: ['$n/4$', '$n/3$', '$n/2$', '$n-1$'],
      correct: 2,
      exp: 'Diraci teoreem: kui $n \\geq 3$ ja iga tipu aste $\\geq n/2$, siis graaf on Hamiltoni graaf.',
    },
    {
      q: 'Floydi–Warshalli algoritmi keerukus on:',
      options: ['$O(n)$', '$O(n^2)$', '$O(n^3)$', '$O(2^n)$'],
      correct: 2,
      exp: 'Kolm sisestatud tsüklit üle $n$ tipu ⇒ $O(n^3)$.',
    },
    {
      q: 'Mitmest aksioomist koosneb Peano aritmeetika?',
      options: ['3', '5', '7', '10'],
      correct: 2,
      exp: 'P1–P6 (konkreetsed) ja P7 (induktsiooniaksioomi skeem) — kokku 7 aksioomi(skeemi).',
    },
    {
      q: 'Sekventsiaalse lausearvutuse korrektsuse teoreem ütleb, et:',
      options: ['Iga samaselt tõene valem on tuletatav', 'Iga tuletatav sekvents vastab semantilisele järeldumisele', 'Iga aksioom on samaselt tõene', 'Iga reegel säilitab samaväärsuse'],
      correct: 1,
      exp: 'Korrektsus = süntaktiline tuletatavus ⇒ semantiline järeldumine. Täielikkus on vastupidine suund.',
    },
    {
      q: 'Tipu $v$ aste $d(v)$ on:',
      options: ['Tipuga intsidentsete servade arv', 'Tipust kõige kaugema tipu kaugus', 'Naabertipu arv', 'Tsükli pikkus, mis tippu sisaldab'],
      correct: 0,
      exp: 'Tipu aste = sellesse tippu kuluvate servade arv. Sageli on see ka naabertipu arv, kui multigraafidega ei arvestata.',
    },
  ];

  function pickRandom(arr, n) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, n);
  }

  window.initQuiz = function () {
    const view = document.getElementById('view');
    view.innerHTML = `
      <h1>Kiirviktoriin</h1>
      <p>Vali 10 juhuslikku küsimust ja testi end. Vastuse järel ilmub seletus.</p>

      <div class="card" id="quizSetup">
        <p>Vajuta nuppu, et alustada uut viktoriini.</p>
        <button class="btn" id="startQuiz">Alusta!</button>
      </div>
      <div id="quizContent"></div>
      <div id="quizResult"></div>
    `;
    document.getElementById('startQuiz').addEventListener('click', startQuiz);
  };

  function startQuiz() {
    const questions = pickRandom(QUESTIONS, 10);
    let idx = 0, score = 0;
    document.getElementById('quizSetup').style.display = 'none';
    document.getElementById('quizResult').innerHTML = '';

    function showQuestion() {
      const q = questions[idx];
      const content = document.getElementById('quizContent');
      content.innerHTML = `
        <div class="quiz-card">
          <div class="quiz-progress">
            <span>Küsimus ${idx + 1} / ${questions.length}</span>
            <span>Skoor: ${score}</span>
          </div>
          <div class="quiz-q">${q.q}</div>
          <div class="quiz-options">
            ${q.options.map((opt, i) => `<button class="quiz-option" data-i="${i}">${opt}</button>`).join('')}
          </div>
          <div class="quiz-explanation" id="quizExp"></div>
          <div class="btn-row" style="margin-top: 12px;">
            <button class="btn small" id="nextQ" style="display:none;">${idx + 1 === questions.length ? 'Lõpeta' : 'Järgmine →'}</button>
          </div>
        </div>
      `;
      // Re-render math
      if (window.renderMathInElement) {
        window.renderMathInElement(content, {
          delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}],
          throwOnError: false,
        });
      }

      content.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = +btn.dataset.i;
          content.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
          if (i === q.correct) {
            btn.classList.add('correct');
            score++;
          } else {
            btn.classList.add('wrong');
            content.querySelectorAll('.quiz-option')[q.correct].classList.add('correct');
          }
          const exp = document.getElementById('quizExp');
          exp.innerHTML = q.exp;
          exp.classList.add('show');
          if (window.renderMathInElement) {
            window.renderMathInElement(exp, {
              delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}],
              throwOnError: false,
            });
          }
          document.getElementById('nextQ').style.display = 'inline-block';
        });
      });
      document.getElementById('nextQ').addEventListener('click', () => {
        idx++;
        if (idx < questions.length) showQuestion();
        else showResult();
      });
    }

    function showResult() {
      document.getElementById('quizContent').innerHTML = '';
      const pct = Math.round(100 * score / questions.length);
      let medal = '🥉';
      if (pct >= 90) medal = '🏆';
      else if (pct >= 70) medal = '🥇';
      else if (pct >= 50) medal = '🥈';
      document.getElementById('quizResult').innerHTML = `
        <div class="card">
          <div class="quiz-score">${medal} ${score} / ${questions.length} (${pct}%)</div>
          <p style="text-align:center; color:var(--fg-2); margin-top:8px;">
            ${pct >= 70 ? 'Suurepärane! Sa oskad asju!' : pct >= 50 ? 'Pole paha — natuke veel korrata.' : 'Loe konspekti ja proovi uuesti!'}
          </p>
          <div class="btn-row" style="justify-content:center;">
            <button class="btn" onclick="window.initQuiz()">Mängi uuesti</button>
          </div>
        </div>
      `;
    }
    showQuestion();
  }

  // ============ FLASHCARDS ============
  window.initFlashcards = function () {
    const view = document.getElementById('view');
    const cards = window.GLOSSARY;
    let idx = 0;
    let order = pickRandom(cards.map((_, i) => i), cards.length);

    view.innerHTML = `
      <h1>Mõistekaardid</h1>
      <p>Juhuslikus järjekorras mõisted. Kliki kaardile, et näha definitsiooni.</p>
      <div id="flashContainer"></div>
    `;

    function show() {
      const card = cards[order[idx]];
      document.getElementById('flashContainer').innerHTML = `
        <div class="flashcard" id="flashCard">
          <div class="flashcard-front">
            <div class="term">${card.term}</div>
          </div>
          <div class="flashcard-back">
            <div class="def-text">${card.def}</div>
          </div>
          <span class="flashcard-hint">Kliki, et pöörata · ${idx + 1} / ${order.length}</span>
        </div>
        <div class="btn-row" style="justify-content:center;">
          <button class="btn small secondary" id="prevCard">← Eelmine</button>
          <button class="btn small" id="nextCard">Järgmine →</button>
          <button class="btn small secondary" id="shuffleCards">🔀 Sega uuesti</button>
        </div>
      `;
      document.getElementById('flashCard').addEventListener('click', e => {
        e.currentTarget.classList.toggle('flipped');
      });
      document.getElementById('prevCard').addEventListener('click', () => {
        idx = (idx - 1 + order.length) % order.length;
        show();
      });
      document.getElementById('nextCard').addEventListener('click', () => {
        idx = (idx + 1) % order.length;
        show();
      });
      document.getElementById('shuffleCards').addEventListener('click', () => {
        order = pickRandom(cards.map((_, i) => i), cards.length);
        idx = 0;
        show();
      });
    }
    show();
  };

  // ============ GLOSSARY ============
  window.initGlossary = function () {
    const list = document.getElementById('glossaryList');
    const filterInput = document.getElementById('glossaryFilter');
    if (!list) return;
    function render(filter = '') {
      const f = filter.toLowerCase().trim();
      const items = window.GLOSSARY
        .filter(g => !f || g.term.toLowerCase().includes(f) || g.def.toLowerCase().includes(f))
        .sort((a, b) => a.term.localeCompare(b.term, 'et'));
      list.innerHTML = items.length === 0
        ? '<p>Ei leidnud mõisteid.</p>'
        : items.map(g => `
          <div class="def" style="margin: 8px 0;">
            <strong style="color: var(--accent);">${g.term}</strong> — ${g.def}
          </div>
        `).join('');
    }
    filterInput.addEventListener('input', e => render(e.target.value));
    render();
  };
})();

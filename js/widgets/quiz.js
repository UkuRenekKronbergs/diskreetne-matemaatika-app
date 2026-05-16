/* ===== Quiz, Flashcards, Glossary widgets ===== */

(function () {
  'use strict';

  const GLOSSARY_LEARNED_KEY = 'dm_glossary_learned_v1';
  const FLASH_SRS_KEY = 'dm_flashcard_srs_v1';

  // ============ QUIZ ============
  const QUESTIONS = [
    {
      tags: ['loogika', 'kt1'],
      q: 'Mis on lausearvutuse valem $A \\Rightarrow A \\& B$ tõeväärtus, kui $A=1, B=0$?',
      options: ['1 (tõene)', '0 (väär)', 'See sõltub muutujatest', 'Pole defineeritud'],
      correct: 1,
      exp: '$1 \\& 0 = 0$, seega $A \\Rightarrow A\\&B = 1 \\Rightarrow 0 = 0$.',
    },
    {
      tags: ['loogika', 'kt1'],
      q: 'Milline neist on samaselt tõene valem ehk tautoloogia?',
      options: ['$A \\& B$', '$A \\lor B$', '$A \\lor \\neg A$', '$A \\& \\neg A$'],
      correct: 2,
      exp: 'Välistatud kolmanda seadus: iga lause on kas tõene või väär, seega $A \\lor \\neg A$ on alati tõene.',
    },
    {
      tags: ['loogika', 'kt1'],
      q: 'De Morgani seadus ütleb, et $\\neg(A \\& B) \\equiv$ ?',
      options: ['$\\neg A \\& \\neg B$', '$\\neg A \\lor \\neg B$', '$A \\& \\neg B$', '$\\neg A \\Rightarrow B$'],
      correct: 1,
      exp: '$\\neg(F\\&G) \\equiv \\neg F \\lor \\neg G$.',
    },
    {
      tags: ['loogika'],
      q: 'Mitu väärtustust on 4 muutujat sisaldaval lausearvutuse valemil?',
      options: ['8', '16', '24', '4'],
      correct: 1,
      exp: '$2^n = 2^4 = 16$ väärtustust.',
    },
    {
      tags: ['loogika', 'kt1'],
      q: 'Implikatsioon $F \\Rightarrow G$ on samaväärne valemiga:',
      options: ['$\\neg F \\& G$', '$\\neg F \\lor G$', '$F \\lor \\neg G$', '$F \\& G$'],
      correct: 1,
      exp: '$F \\Rightarrow G \\equiv \\neg F \\lor G$. Implikatsioon on väär ainult juhul, kui $F=1$ ja $G=0$.',
    },
    {
      tags: ['predikaadid', 'kt1'],
      q: 'Predikaatloogikas $\\neg \\forall x P(x) \\equiv$ ?',
      options: ['$\\forall x \\neg P(x)$', '$\\exists x \\neg P(x)$', '$\\neg \\exists x P(x)$', '$\\exists x P(x)$'],
      correct: 1,
      exp: 'Kvantorite eitamine: $\\neg \\forall x P(x) \\equiv \\exists x \\neg P(x)$.',
    },
    {
      tags: ['predikaadid', 'kt1'],
      q: 'Mida tähendab, et predikaatarvutuse valem on kinnine?',
      options: ['Valem ei sisalda tehteid', 'Valemil pole vabu muutujaid', 'Valem on samaselt tõene', 'Valem on prefikskujul'],
      correct: 1,
      exp: 'Kinnisel valemil ehk lausel ei ole vabu muutujaid.',
    },
    {
      tags: ['predikaadid', 'kt1'],
      q: 'Milline on prefikskujul valemi üldine kuju?',
      options: ['$M Q_1x_1...Q_nx_n$', '$Q_1x_1...Q_nx_n M$', '$F \\Rightarrow G$', '$\\Gamma \\vdash F$'],
      correct: 1,
      exp: 'Prefikskujul on kõik kvantorid ees ja kvantoriteta maatriks järel: $Q_1x_1...Q_nx_nM$.',
    },
    {
      tags: ['peano', 'kt1'],
      q: 'Peano aritmeetika signatuur on:',
      options: ['$\\langle 0, 1; +, \\cdot; = \\rangle$', '$\\langle 0; \\,\\prime, +, \\cdot; = \\rangle$', '$\\langle 0; +, \\cdot; <, = \\rangle$', '$\\langle\\,; +, \\cdot, -; = \\rangle$'],
      correct: 1,
      exp: 'Peano signatuur: $\\langle 0; \\,\\prime, +, \\cdot; = \\rangle$.',
    },
    {
      tags: ['peano', 'kt1'],
      q: 'Peano aksioom P3 ütleb, et:',
      options: ['$\\forall x(0+x = x)$', '$\\forall x(x+0 = x)$', '$\\forall x \\neg(x\\prime = 0)$', '$\\forall x(x\\prime = x+1)$'],
      correct: 1,
      exp: 'P3: $\\forall x(x+0 = x)$. Väide $\\forall x(0+x=x)$ tuleb eraldi tõestada.',
    },
    {
      tags: ['sekvents', 'kt1'],
      q: 'Sekvents on:',
      options: ['Tehetega valem', 'Aksiomaatiline süsteem', 'Avaldis kujul $\\Gamma \\vdash F$', 'Tõesuspuu haru'],
      correct: 2,
      exp: 'Sekvents on $\\Gamma \\vdash F$, kus $\\Gamma$ on valemite hulk või järjend ja $F$ valem.',
    },
    {
      tags: ['sekvents', 'kt1'],
      q: 'Sekventsiaalse lausearvutuse korrektsuse teoreem ütleb, et:',
      options: ['Iga samaselt tõene valem on tuletatav', 'Iga tuletatav sekvents vastab semantilisele järeldumisele', 'Iga aksioom on samaselt väär', 'Iga reegel säilitab ainult samaväärsuse'],
      correct: 1,
      exp: 'Korrektsus = süntaktiline tuletatavus annab semantilise järeldumise. Täielikkus on vastupidine suund.',
    },
    {
      tags: ['graafid'],
      q: 'Tipuastmete teoreem ütleb, et:',
      options: ['$\\sum d(v) = |V|$', '$\\sum d(v) = |E|$', '$\\sum d(v) = 2|E|$', '$\\sum d(v) = 2|V|$'],
      correct: 2,
      exp: 'Iga serv panustab astmete summasse 2 ühikut, seega $\\sum d(v) = 2|E|$.',
    },
    {
      tags: ['graafid'],
      q: 'Mitu serva on täisgraafil $K_5$?',
      options: ['5', '10', '15', '20'],
      correct: 1,
      exp: '$\\binom{5}{2} = \\frac{5 \\cdot 4}{2} = 10$ serva.',
    },
    {
      tags: ['graafid'],
      q: 'Graaf on Euleri graaf parajasti siis, kui:',
      options: ['Ta on sidus ja kõik tipuastmed paarisarvud', 'Ta on sidus ja igal tipul aste vähemalt $n/2$', 'Tal on Hamiltoni tsükkel', 'Ta on puu'],
      correct: 0,
      exp: 'Euleri teoreem: sidus ja kõik tipuastmed paarisarvud parajasti siis, kui leidub kinnine Euleri ahel.',
    },
    {
      tags: ['graafid'],
      q: 'Mitu serva on $n$-tipulisel puul?',
      options: ['$n$', '$n-1$', '$n+1$', '$n(n-1)/2$'],
      correct: 1,
      exp: '$n$-tipulisel puul on alati täpselt $n-1$ serva.',
    },
    {
      tags: ['graafid'],
      q: 'Kruskali algoritm:',
      options: ['Kasvatab puud ühest tipust alates', 'Lisab vähima kaaluga servi, vältides tsüklite teket', 'Leiab lühima tee', 'Kontrollib isomorfismi'],
      correct: 1,
      exp: 'Kruskal sorteerib servad kaalu järgi ja lisab neid, mis ei tekita tsüklit.',
    },
    {
      tags: ['graafid'],
      q: 'Dijkstra algoritm ei tööta korrektselt, kui:',
      options: ['Graaf on suunatud', 'Graafis on tsükleid', 'Graafis on negatiivseid kaale', 'Graafis on rohkem kui 100 tippu'],
      correct: 2,
      exp: 'Dijkstra eeldab mittenegatiivseid kaale.',
    },
    {
      tags: ['graafid'],
      q: 'Diraci teoreem annab piisava tingimuse Hamiltoni tsükli leidumiseks: iga tipu aste on vähemalt:',
      options: ['$n/4$', '$n/3$', '$n/2$', '$n-1$'],
      correct: 2,
      exp: 'Kui $n \\ge 3$ ja iga tipu aste on vähemalt $n/2$, siis graaf on Hamiltoni graaf.',
    },
    {
      tags: ['graafid'],
      q: 'Floydi-Warshalli algoritmi ajaline keerukus on:',
      options: ['$O(n)$', '$O(n^2)$', '$O(n^3)$', '$O(2^n)$'],
      correct: 2,
      exp: 'Kolm pesastatud tsüklit üle $n$ tipu annavad $O(n^3)$.',
    },
  ];

  const QUIZ_TOPICS = [
    { id: 'all', label: 'Kogu kursus', description: 'Segamini loogika ja graafid' },
    { id: 'loogika', label: 'Lausearvutus', description: 'Tõeväärtused, samaväärsus, tehted' },
    { id: 'predikaadid', label: 'Predikaadid', description: 'Kvantorid, prefikskuju, kinnised valemid' },
    { id: 'kt1', label: 'Kontrolltöö 1', description: 'Loogika esimese poole fookus' },
    { id: 'graafid', label: 'Graafiteooria', description: 'Puud, Euler, Hamilton, algoritmid' },
  ];

  function pickRandom(arr, n) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, n);
  }

  function renderMath(el) {
    if (!window.renderMathInElement || !el) return;
    window.renderMathInElement(el, {
      delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}],
      throwOnError: false,
    });
  }

  function questionsForTopic(topic) {
    return topic === 'all' ? QUESTIONS : QUESTIONS.filter(q => q.tags.includes(topic));
  }

  window.initQuiz = function () {
    const view = document.getElementById('view');
    const topicCards = QUIZ_TOPICS.map(topic => {
      const count = questionsForTopic(topic.id).length;
      return `
        <label class="quiz-topic">
          <input type="radio" name="quizTopic" value="${topic.id}" ${topic.id === 'all' ? 'checked' : ''}>
          <span>
            <strong>${topic.label}</strong>
            <small>${topic.description} · ${count} küsimust pangas</small>
          </span>
        </label>
      `;
    }).join('');

    view.innerHTML = `
      <h1>Kiirviktoriin</h1>
      <p>Vali teema ja testi end. Vastuse järel ilmub seletus.</p>

      <div class="card" id="quizSetup">
        <div class="quiz-topic-grid">${topicCards}</div>
        <div class="grade-target-row" style="margin-top: 14px;">
          <label class="grade-field">
            <span>Küsimuste arv</span>
            <select id="quizCount">
              <option value="5">5</option>
              <option value="10" selected>10</option>
              <option value="15">15</option>
            </select>
          </label>
          <button class="btn" id="startQuiz">Alusta</button>
        </div>
      </div>
      <div id="quizContent"></div>
      <div id="quizResult"></div>
    `;
    document.getElementById('startQuiz').addEventListener('click', startQuiz);
  };

  function startQuiz() {
    const topic = document.querySelector('input[name="quizTopic"]:checked')?.value || 'all';
    const requested = Number(document.getElementById('quizCount')?.value || 10);
    const bank = questionsForTopic(topic);
    const questions = pickRandom(bank, Math.min(requested, bank.length));
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
            <button class="btn small" id="nextQ" style="display:none;">${idx + 1 === questions.length ? 'Lõpeta' : 'Järgmine'}</button>
          </div>
        </div>
      `;
      renderMath(content);

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
          renderMath(exp);
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
      document.getElementById('quizResult').innerHTML = `
        <div class="card">
          <div class="quiz-score">${score} / ${questions.length} (${pct}%)</div>
          <p style="text-align:center; color:var(--fg-2); margin-top:8px;">
            ${pct >= 70 ? 'Hea seis. Võid raskema teema ette võtta.' : pct >= 50 ? 'Põhi on olemas, aga kordamine tasub ära.' : 'Võta konspekt kõrvale ja tee üks ring veel.'}
          </p>
          <div class="btn-row" style="justify-content:center;">
            <button class="btn" id="restartQuiz">Uus viktoriin</button>
          </div>
        </div>
      `;
      document.getElementById('restartQuiz').addEventListener('click', window.initQuiz);
    }
    showQuestion();
  }

  // ============ FLASHCARDS ============
  window.initFlashcards = function () {
    const view = document.getElementById('view');
    const cards = window.GLOSSARY || [];
    let idx = 0;
    let order = [];
    let lastAction = '';

    view.innerHTML = `
      <h1>Mõistekaardid</h1>
      <p>Anki-stiilis kordamine: unustatud mõisted tulevad varem tagasi, kindlalt teatud mõisted liiguvad kaugemale tulevikku.</p>
      <div class="flashcard-srs" id="flashStats"></div>
      <div id="flashContainer"></div>
    `;

    function todayKey(offset = 0) {
      const d = new Date();
      d.setDate(d.getDate() + offset);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    }

    function loadSchedule() {
      try { return JSON.parse(localStorage.getItem(FLASH_SRS_KEY)) || {}; }
      catch { return {}; }
    }

    function saveSchedule(schedule) {
      localStorage.setItem(FLASH_SRS_KEY, JSON.stringify(schedule));
    }

    function stateFor(schedule, card) {
      if (!schedule[card.term]) {
        schedule[card.term] = {
          due: todayKey(),
          interval: 0,
          ease: 2.35,
          reps: 0,
          lapses: 0,
        };
      }
      return schedule[card.term];
    }

    function buildQueue(mode = 'due') {
      const schedule = loadSchedule();
      const today = todayKey();
      const indexes = cards.map((_, i) => i);
      indexes.forEach(i => stateFor(schedule, cards[i]));
      saveSchedule(schedule);
      const due = indexes.filter(i => stateFor(schedule, cards[i]).due <= today);
      order = mode === 'all' || due.length === 0
        ? pickRandom(indexes, indexes.length)
        : due.sort((a, b) => {
          const sa = stateFor(schedule, cards[a]);
          const sb = stateFor(schedule, cards[b]);
          return sa.due.localeCompare(sb.due) || sa.reps - sb.reps || sb.lapses - sa.lapses;
        });
      idx = 0;
    }

    function updateStats() {
      const schedule = loadSchedule();
      const today = todayKey();
      const total = cards.length;
      const due = cards.filter(card => stateFor(schedule, card).due <= today).length;
      const learning = cards.filter(card => stateFor(schedule, card).reps > 0).length;
      const mature = cards.filter(card => stateFor(schedule, card).interval >= 7).length;
      saveSchedule(schedule);
      document.getElementById('flashStats').innerHTML = `
        <div><strong>${due}</strong><span>täna korrata</span></div>
        <div><strong>${learning}</strong><span>alustatud</span></div>
        <div><strong>${mature}</strong><span>7+ päeva vahega</span></div>
        <div><strong>${total}</strong><span>mõistet kokku</span></div>
      `;
    }

    function gradeCurrent(grade) {
      const card = cards[order[idx]];
      if (!card) return;
      const schedule = loadSchedule();
      const state = stateFor(schedule, card);
      if (grade === 'known') {
        state.interval = state.reps === 0 ? 3 : Math.max(3, Math.round(state.interval * state.ease));
        state.ease = Math.min(3.2, state.ease + 0.15);
        state.reps += 1;
        state.due = todayKey(state.interval);
        lastAction = `"${card.term}" liigub ${state.interval} päeva kaugusele.`;
      } else if (grade === 'partial') {
        state.interval = 1;
        state.ease = Math.max(1.35, state.ease - 0.05);
        state.reps += 1;
        state.due = todayKey(1);
        lastAction = `"${card.term}" tuleb homme uuesti.`;
      } else {
        state.interval = 0;
        state.ease = Math.max(1.3, state.ease - 0.2);
        state.lapses += 1;
        state.due = todayKey();
        order.splice(Math.min(idx + 3, order.length), 0, order[idx]);
        lastAction = `"${card.term}" jääb tänasesse kordamisse.`;
      }
      saveSchedule(schedule);
      idx += 1;
      if (idx >= order.length) buildQueue();
      show();
    }

    function show() {
      updateStats();
      const card = cards[order[idx]];
      if (!card) {
        document.getElementById('flashContainer').innerHTML = `
          <div class="card">
            <h3>${cards.length ? 'Tänane kordamine on valmis.' : 'Sõnastik puudub.'}</h3>
            <p>${cards.length ? 'Kõik tänase kuupäevaga mõisted on üle vaadatud. Võid segada kõik kaardid, kui tahad veel harjutada.' : ''}</p>
            <button class="btn small" id="studyAllCards" type="button">Harjuta kõiki kaarte</button>
          </div>
        `;
        document.getElementById('studyAllCards')?.addEventListener('click', () => {
          buildQueue('all');
          show();
        });
        return;
      }
      const state = stateFor(loadSchedule(), card);
      document.getElementById('flashContainer').innerHTML = `
        <div class="flashcard" id="flashCard">
          <div class="flashcard-front">
            <div class="term">${card.term}</div>
            <div class="flashcard-meta">Korda: ${state.due} · intervall ${state.interval} päeva · eksimusi ${state.lapses}</div>
          </div>
          <div class="flashcard-back">
            <div class="def-text">${card.def}</div>
          </div>
          <span class="flashcard-hint">Kliki, et pöörata · ${idx + 1} / ${order.length}</span>
        </div>
        <div class="srs-buttons" aria-label="Kordamise hinnang">
          <button class="btn small success" id="knownCard" type="button">Teadsin</button>
          <button class="btn small secondary" id="partialCard" type="button">Poolteadsin</button>
          <button class="btn small danger" id="missedCard" type="button">Ei teadnud</button>
        </div>
        <div class="btn-row" style="justify-content:center;">
          <button class="btn small secondary" id="prevCard">Eelmine</button>
          <button class="btn small" id="nextCard">Järgmine</button>
          <button class="btn small secondary" id="shuffleCards">Sega kõiki</button>
          <button class="btn small secondary" id="resetSrs">Lähtesta kordamine</button>
        </div>
        ${lastAction ? `<p class="muted flashcard-action">${lastAction}</p>` : ''}
      `;
      renderMath(document.getElementById('flashContainer'));
      document.getElementById('flashCard').addEventListener('click', e => {
        e.currentTarget.classList.toggle('flipped');
      });
      document.getElementById('knownCard').addEventListener('click', () => gradeCurrent('known'));
      document.getElementById('partialCard').addEventListener('click', () => gradeCurrent('partial'));
      document.getElementById('missedCard').addEventListener('click', () => gradeCurrent('missed'));
      document.getElementById('prevCard').addEventListener('click', () => {
        idx = (idx - 1 + order.length) % order.length;
        show();
      });
      document.getElementById('nextCard').addEventListener('click', () => {
        idx = (idx + 1) % order.length;
        show();
      });
      document.getElementById('shuffleCards').addEventListener('click', () => {
        buildQueue('all');
        lastAction = 'Kõik kaardid on segatud.';
        show();
      });
      document.getElementById('resetSrs').addEventListener('click', () => {
        if (!confirm('Lähtesta mõistekaartide kordamise ajalugu?')) return;
        localStorage.removeItem(FLASH_SRS_KEY);
        lastAction = 'Kordamise ajalugu lähtestatud.';
        buildQueue();
        show();
      });
    }
    buildQueue();
    show();
  };

  // ============ GLOSSARY ============
  function getLearnedTerms() {
    try { return new Set(JSON.parse(localStorage.getItem(GLOSSARY_LEARNED_KEY)) || []); }
    catch { return new Set(); }
  }

  function saveLearnedTerms(learned) {
    localStorage.setItem(GLOSSARY_LEARNED_KEY, JSON.stringify([...learned]));
  }

  window.initGlossary = function () {
    const list = document.getElementById('glossaryList');
    const filterInput = document.getElementById('glossaryFilter');
    if (!list || !filterInput) return;

    const controls = document.createElement('div');
    controls.className = 'glossary-controls';
    controls.innerHTML = `
      <div class="glossary-progress" id="glossaryProgress"></div>
      <select id="glossaryStatusFilter" aria-label="Sõnastiku oleku filter">
        <option value="all">Kõik mõisted</option>
        <option value="open">Veel õppida</option>
        <option value="learned">Selgeks märgitud</option>
      </select>
      <button class="btn small secondary" id="glossaryClearLearned" type="button">Tühjenda märgistused</button>
    `;
    filterInput.insertAdjacentElement('afterend', controls);

    const statusFilter = document.getElementById('glossaryStatusFilter');
    const clearBtn = document.getElementById('glossaryClearLearned');

    function render() {
      const learned = getLearnedTerms();
      const f = filterInput.value.toLowerCase().trim();
      const status = statusFilter.value;
      const items = (window.GLOSSARY || [])
        .filter(g => !f || g.term.toLowerCase().includes(f) || g.def.toLowerCase().includes(f))
        .filter(g => status === 'all' || (status === 'learned' ? learned.has(g.term) : !learned.has(g.term)))
        .sort((a, b) => a.term.localeCompare(b.term, 'et'));

      const total = (window.GLOSSARY || []).length;
      document.getElementById('glossaryProgress').innerHTML = `
        <strong>${learned.size} / ${total}</strong> mõistet selgeks märgitud
        <div class="progress-bar"><div class="progress-fill" style="width:${total ? Math.round(100 * learned.size / total) : 0}%"></div></div>
      `;

      list.innerHTML = items.length === 0
        ? '<p>Ei leidnud mõisteid.</p>'
        : items.map(g => {
          const done = learned.has(g.term);
          return `
            <div class="def glossary-entry ${done ? 'learned' : ''}">
              <div class="glossary-entry-head">
                <strong>${g.term}</strong>
                <button class="btn small ${done ? 'success' : 'secondary'}" data-term="${g.term}" type="button">
                  ${done ? 'Selge' : 'Märgi selgeks'}
                </button>
              </div>
              <div>${g.def}</div>
            </div>
          `;
        }).join('');

      list.querySelectorAll('[data-term]').forEach(btn => {
        btn.addEventListener('click', () => {
          const next = getLearnedTerms();
          if (next.has(btn.dataset.term)) next.delete(btn.dataset.term);
          else next.add(btn.dataset.term);
          saveLearnedTerms(next);
          render();
        });
      });
    }

    filterInput.addEventListener('input', render);
    statusFilter.addEventListener('change', render);
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem(GLOSSARY_LEARNED_KEY);
      render();
    });
    render();
  };
})();

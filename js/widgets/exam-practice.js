/* ===== 32-point exam practice generator ===== */

(function () {
  'use strict';

  const BLUEPRINT = [
    { slot: 'Peano aritmeetika', points: 6, type: 'peano' },
    { slot: 'Järeldumine või mudel', points: 7, type: 'inference' },
    { slot: 'Sekventsiaalne lausearvutus', points: 6, type: 'sequent' },
    { slot: 'Prefikskuju', points: 6, type: 'prefix' },
    { slot: 'Signatuur ja interpretatsioon', points: 7, type: 'signature' },
  ];

  const TASKS = {
    peano: [
      {
        title: 'Peano: null vasakult',
        body: 'Esitage Peano aritmeetika signatuur ja kolm aksioomi. Tõestage Peano aksioomidest, et $\\forall x(0+x=x)$. Väljendage signatuuris väide $2\\cdot3+1=7$.',
        hint: 'Alusta induktsiooniga valemi $F(x): 0+x=x$ jaoks.',
      },
      {
        title: 'Peano: korrutamine nulliga',
        body: 'Sõnastage Peano aritmeetika induktsiooniaksioom. Tõestage, et $\\forall x(0\\cdot x=0)$. Väljendage ja tõestage $0\\prime+0\\prime\\prime=0\\prime\\prime\\prime$.',
        hint: 'Korrutamise rekursioonis kasuta sammu $x\\cdot y\\prime = x\\cdot y + x$.',
      },
      {
        title: 'Peano: järglase liitmine',
        body: 'Esitage Peano aritmeetika signatuur. Tõestage $\\forall x\\forall y(x\\prime+y=x+y\\prime)$. Rakendage tulemust arvutusele $1\\cdot2=2$.',
        hint: 'Tõestus liigub tavaliselt induktsiooniga üle $y$.',
      },
      {
        title: 'Peano: kommutatiivsuse erijuht',
        body: 'Tõestage Peano aksioomide abil $\\forall x(x+0\\prime=0\\prime+x)$. Seejärel väljendage ja tõestage $0\\prime\\prime+0\\prime=0\\prime\\prime\\prime$.',
        hint: 'Kasuta P3/P4 definitsioone ja eelnevalt tõestatud nulli vasakpoolset omadust.',
      },
    ],
    inference: [
      {
        title: 'Eksistentsist universaalseks',
        body: 'Tõestage, et $\\exists x\\forall y(F(x)\\lor G(y)) \\models \\forall y\\exists x(F(x)\\lor G(y))$, kuid vastupidine järeldumine üldjuhul ei kehti.',
        hint: 'Vastupidise jaoks ehita kaheelemendiline interpretatsioon, kus igal $y$ jaoks sobib mingi $x$, aga ühist $x$ ei leidu.',
      },
      {
        title: 'Disjunktsiooni ja üldisuse suund',
        body: 'Tõestage $\\forall x F(x)\\lor\\forall x G(x) \\models \\forall x(F(x)\\lor G(x))$. Selgitage, miks pöördsuund ei kehti.',
        hint: 'Pöördsuuna mudelis võivad $F$ ja $G$ eri elementidel vahelduda.',
      },
      {
        title: 'Konjunktsioon eksistentsi sees',
        body: 'Tõestage $\\exists x(F(x)\\&G(x)) \\models \\exists xF(x)\\&\\exists xG(x)$ ning leidke näide, kus pööratud järeldumine ei kehti.',
        hint: 'Pöördnäites tee $F$ tõeseks ühel ja $G$ teisel elemendil.',
      },
      {
        title: 'Universaalne implikatsioon',
        body: 'Tõestage $\\forall x(F(x)\\Rightarrow G(x)) \\models \\forall xF(x)\\Rightarrow\\forall xG(x)$.',
        hint: 'Võta suvaline interpretatsioon ja eelda, et $\\forall xF(x)$ on tõene.',
      },
    ],
    sequent: [
      {
        title: 'Sekvents: kontrapositsioon',
        body: 'Sõnastage korrektsuse teoreem. Tuletage sekvents $P\\Rightarrow Q \\vdash \\neg Q\\Rightarrow\\neg P$.',
        hint: 'Implikatsiooni paremale viimiseks lisa eelduseks $\\neg Q$ ja näita $\\neg P$.',
      },
      {
        title: 'Sekvents: disjunktiivne jaotus',
        body: 'Sõnastage täielikkuse teoreem. Tuletage sekvents $(P\\lor Q)\\&R \\vdash (P\\&R)\\lor(Q\\&R)$.',
        hint: 'Kasuta vasakul konjunktsiooni ning seejärel vasakul disjunktsiooni juhtumiteks jagamist.',
      },
      {
        title: 'Sekvents: modus ponens valemina',
        body: 'Defineerige sekventsi valemkuju. Tuletage $\\neg(P\\Rightarrow Q) \\vdash P\\&\\neg Q$.',
        hint: 'Vasakul oleva implikatsiooni eituse jaoks kasuta reegleid, mis annavad $P$ ja $\\neg Q$.',
      },
      {
        title: 'Sekvents: kahe juhu eliminatsioon',
        body: 'Sõnastage sekventsiaalse lausearvutuse korrektsus. Tuletage $A\\Rightarrow B,\\neg A\\Rightarrow B \\vdash B$.',
        hint: 'Kasuta välistatud kolmanda printsiipi või disjunktsiooni juhtumeid $A$ ja $\\neg A$.',
      },
    ],
    prefix: [
      {
        title: 'Prefikskuju: variant A tüüp',
        body: 'Teisendage valem $\\neg\\exists y(\\exists xP(x)\\Rightarrow(Q(y)\\Rightarrow\\forall xR(x)))$ prefikskujule, kus eitused on atomaarsete valemite ees ja implikatsiooni ei esine.',
        hint: 'Eemalda implikatsioonid, vii eitus sisse, nimeta korduvad seotud muutujad ümber.',
      },
      {
        title: 'Prefikskuju: variant D tüüp',
        body: 'Teisendage valem $\\neg\\exists x(\\forall yP(x,y)\\Rightarrow\\exists zQ(z))$ prefikskujule.',
        hint: '$\\neg\\exists x$ muutub $\\forall x\\neg$; implikatsioonist saab disjunktsioon.',
      },
      {
        title: 'Prefikskuju: variant E tüüp',
        body: 'Teisendage valem $\\neg\\forall x(\\exists yP(x,y)\\Rightarrow\\exists z\\neg Q(x,z))$ prefikskujule.',
        hint: '$\\neg\\forall x$ muutub $\\exists x\\neg$ ja $\\neg\\exists z\\neg Q$ muutub $\\forall zQ$.',
      },
      {
        title: 'Prefikskuju: variant F tüüp',
        body: 'Defineerige prefikskuju. Teisendage $\\neg(\\forall xP(x)\\Rightarrow\\exists y\\forall zQ(y,z))$ prefikskujule.',
        hint: 'Kasuta samaväärsust $\\neg(A\\Rightarrow B)\\equiv A\\&\\neg B$.',
      },
    ],
    signature: [
      {
        title: 'Signatuur: maatriks',
        body: 'Leidke võimalikult väheste elementidega signatuur ja interpretatsioon, et väljendada väiteid maatriksi $A\\in Mat_{m,n}(\\mathbb{N})$ kohta. Väljendage: viimase rea elemendid on kasvavas järjestuses; täpselt üks veerg koosneb nullidest.',
        hint: 'Mõtle, kas põhihulk võiks olla indeksite ja väärtuste ühine kandja või on vaja sorteerimist imiteerida predikaatidega.',
      },
      {
        title: 'Signatuur: jaguvus naturaalarvudel',
        body: 'Signatuuris $\\langle\\,; +,\\cdot; =, |\\rangle$ üle $\\mathbb{N}$ väljendage: $x=1$, $x$ on paaris, $x$ on algarv, $x$ ja $y$ on ühistegurita.',
        hint: '$x=1$ saab väljendada korrutamise neutraalelemendi kaudu.',
      },
      {
        title: 'Signatuur: funktsioon',
        body: 'Valige signatuur funktsiooni $f:\\mathbb{N}\\to\\mathbb{N}$ omaduste jaoks. Väljendage: $f$ on monotoonselt mittekahanev; $f$-l leidub püsipunkt.',
        hint: 'Kasuta funktsionaalsümbolit $f$ ja järjestuse või aritmeetika väljendamiseks sobivaid predikaate.',
      },
      {
        title: 'Signatuur: hulgad',
        body: 'Põhihulgal $\\mathcal{P}(\\mathbb{N})$ ja signatuuris $\\langle\\,;\\cup,\\cap;=\\rangle$ väljendage: $x=\\emptyset$, $x=\\mathbb{N}$, $x\\subseteq y$, $x\\prime=y$ kui $x\\prime$ tähendab täiendit.',
        hint: 'Tühihulka ja universaalhulka saab iseloomustada lõike ja ühendi abil.',
      },
    ],
  };

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function renderMath(el) {
    if (!window.renderMathInElement || !el) return;
    window.renderMathInElement(el, {
      delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}],
      throwOnError: false,
    });
  }

  function makeExam() {
    return BLUEPRINT.map(part => ({ ...part, task: pick(TASKS[part.type]) }));
  }

  function renderExam(exam) {
    return `
      <div class="exam-total">
        <strong>32 punkti</strong>
        <span>5 ülesannet, kontrolltöö 1 struktuuri järgi</span>
      </div>
      <ol class="exam-task-list">
        ${exam.map((item, index) => `
          <li class="exam-task">
            <div class="exam-task-head">
              <span>Ülesanne ${index + 1}. ${item.slot}</span>
              <strong>${item.points} p</strong>
            </div>
            <h3>${item.task.title}</h3>
            <p>${item.task.body}</p>
            <details>
              <summary>Vihje</summary>
              <p>${item.task.hint}</p>
            </details>
          </li>
        `).join('')}
      </ol>
    `;
  }

  window.initExamPractice = function () {
    const view = document.getElementById('view');
    if (!view) return;
    let exam = makeExam();

    view.innerHTML = `
      <h1>Harjutustöö generaator</h1>
      <p>Koosta juhuslik 32-punktine töö vanade kontrolltööde ülesandetüüpide põhjal. Vihjeid kasuta alles pärast päris proovimist.</p>
      <div class="card">
        <div class="btn-row">
          <button class="btn" id="newExam">Uus harjutustöö</button>
          <button class="btn secondary" id="shuffleOne">Vaheta üks juhuslik ülesanne</button>
        </div>
        <div class="exam-checklist">
          <span class="tag accent">Soovitus</span>
          Võta 90 minutit, kirjuta lahendus paberile ja alles siis ava vihjed.
        </div>
      </div>
      <div id="examOutput"></div>
    `;

    function render() {
      const out = document.getElementById('examOutput');
      out.innerHTML = renderExam(exam);
      renderMath(out);
    }

    document.getElementById('newExam').addEventListener('click', () => {
      exam = makeExam();
      render();
    });
    document.getElementById('shuffleOne').addEventListener('click', () => {
      const i = Math.floor(Math.random() * exam.length);
      exam[i] = { ...exam[i], task: pick(TASKS[exam[i].type]) };
      render();
    });

    render();
  };
})();

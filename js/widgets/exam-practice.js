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
        solution: `
          <p>Signatuuriks sobib $\\langle 0; \\prime,+,\\cdot; =\\rangle$. Kolmeks aksioomiks võib tuua näiteks $\\neg(x\\prime=0)$, $x\\prime=y\\prime\\Rightarrow x=y$ ja liitmise rekursiooni $x+0=x$, $x+y\\prime=(x+y)\\prime$.</p>
          <p>Induktsioon valemiga $F(x): 0+x=x$: baas $0+0=0$ tuleb liitmise definitsioonist. Kui $0+x=x$, siis $0+x\\prime=(0+x)\\prime=x\\prime$. Seega $\\forall x(0+x=x)$.</p>
          <p>Väide on $((0\\prime\\prime\\cdot0\\prime\\prime\\prime)+0\\prime)=0\\prime\\prime\\prime\\prime\\prime\\prime\\prime$.</p>
        `,
      },
      {
        title: 'Peano: korrutamine nulliga',
        body: 'Sõnastage Peano aritmeetika induktsiooniaksioom. Tõestage, et $\\forall x(0\\cdot x=0)$. Väljendage ja tõestage $0\\prime+0\\prime\\prime=0\\prime\\prime\\prime$.',
        hint: 'Korrutamise rekursioonis kasuta sammu $x\\cdot y\\prime = x\\cdot y + x$.',
        solution: `
          <p>Induktsiooniaksioom: iga valemi $F$ korral $(F(0)\\&\\forall x(F(x)\\Rightarrow F(x\\prime)))\\Rightarrow\\forall xF(x)$.</p>
          <p>Vali $F(x): 0\\cdot x=0$. Baas: $0\\cdot0=0$. Samm: kui $0\\cdot x=0$, siis $0\\cdot x\\prime=0\\cdot x+0=0+0=0$. Seega $\\forall x(0\\cdot x=0)$.</p>
          <p>$0\\prime+0\\prime\\prime=(0\\prime+0\\prime)\\prime=((0\\prime+0)\\prime)\\prime=(0\\prime)\\prime\\prime=0\\prime\\prime\\prime$.</p>
        `,
      },
      {
        title: 'Peano: järglase liitmine',
        body: 'Esitage Peano aritmeetika signatuur. Tõestage $\\forall x\\forall y(x\\prime+y=x+y\\prime)$. Rakendage tulemust arvutusele $1\\cdot2=2$.',
        hint: 'Tõestus liigub tavaliselt induktsiooniga üle $y$.',
        solution: `
          <p>Signatuur: $\\langle 0; \\prime,+,\\cdot; =\\rangle$.</p>
          <p>Fikseeri $x$ ja tee induktsioon üle $y$. Baas: $x\\prime+0=x\\prime$ ja $x+0\\prime=(x+0)\\prime=x\\prime$. Samm: kui $x\\prime+y=x+y\\prime$, siis $x\\prime+y\\prime=(x\\prime+y)\\prime=(x+y\\prime)\\prime=x+(y\\prime)\\prime$.</p>
          <p>$1\\cdot2=0\\prime\\cdot0\\prime\\prime=(0\\prime\\cdot0\\prime)+0\\prime=((0\\prime\\cdot0)+0\\prime)+0\\prime=(0+0\\prime)+0\\prime=0\\prime\\prime$.</p>
        `,
      },
      {
        title: 'Peano: kommutatiivsuse erijuht',
        body: 'Tõestage Peano aksioomide abil $\\forall x(x+0\\prime=0\\prime+x)$. Seejärel väljendage ja tõestage $0\\prime\\prime+0\\prime=0\\prime\\prime\\prime$.',
        hint: 'Kasuta P3/P4 definitsioone ja eelnevalt tõestatud nulli vasakpoolset omadust.',
        solution: `
          <p>Vasak pool on $x+0\\prime=(x+0)\\prime=x\\prime$. Piisab näidata induktsiooniga, et $0\\prime+x=x\\prime$.</p>
          <p>Baas: $0\\prime+0=0\\prime$. Samm: kui $0\\prime+x=x\\prime$, siis $0\\prime+x\\prime=(0\\prime+x)\\prime=(x\\prime)\\prime$. Järelikult $x+0\\prime=0\\prime+x$.</p>
          <p>$0\\prime\\prime+0\\prime=(0\\prime\\prime+0)\\prime=(0\\prime\\prime)\\prime=0\\prime\\prime\\prime$.</p>
        `,
      },
    ],
    inference: [
      {
        title: 'Eksistentsist universaalseks',
        body: 'Tõestage, et $\\exists x\\forall yH(x,y) \\models \\forall y\\exists xH(x,y)$, kuid vastupidine järeldumine üldjuhul ei kehti.',
        hint: 'Vastupidise jaoks ehita kaheelemendiline interpretatsioon, kus iga $y$ jaoks sobib mingi $x$, aga ühist $x$ ei leidu.',
        solution: `
          <p>Kui leidub element $a$, mille korral $H(a,y)$ kehtib iga $y$ jaoks, siis iga konkreetse $y$ jaoks saab eksistentsikvantori tunnistajaks võtta sama $a$. Seega $\\forall y\\exists xH(x,y)$.</p>
          <p>Pöördsuuna vastumudel: kandja $\\{0,1\\}$ ja $H(x,y)$ kehtib parajasti siis, kui $x=y$. Siis iga $y$ jaoks leidub sobiv $x$ ehk $x=y$, aga ei leidu ühtainsat $x$, mis sobiks korraga kõigi $y$ jaoks.</p>
        `,
      },
      {
        title: 'Disjunktsiooni ja üldisuse suund',
        body: 'Tõestage $\\forall x F(x)\\lor\\forall x G(x) \\models \\forall x(F(x)\\lor G(x))$. Selgitage, miks pöördsuund ei kehti.',
        hint: 'Pöördsuuna mudelis võivad $F$ ja $G$ eri elementidel vahelduda.',
        solution: `
          <p>Kui $\\forall xF(x)$ on tõene, siis iga $x$ korral on $F(x)\\lor G(x)$ tõene. Sama kehtib juhul, kui $\\forall xG(x)$ on tõene. Seega järeldub $\\forall x(F(x)\\lor G(x))$.</p>
          <p>Pöördsuuna vastumudel: kandja $\\{0,1\\}$, $F$ tõene ainult elemendil $0$ ja $G$ tõene ainult elemendil $1$. Siis iga elemendi korral $F(x)\\lor G(x)$ kehtib, kuid kumbki $\\forall xF(x)$ ega $\\forall xG(x)$ ei kehti.</p>
        `,
      },
      {
        title: 'Konjunktsioon eksistentsi sees',
        body: 'Tõestage $\\exists x(F(x)\\&G(x)) \\models \\exists xF(x)\\&\\exists xG(x)$ ning leidke näide, kus pööratud järeldumine ei kehti.',
        hint: 'Pöördnäites tee $F$ tõeseks ühel ja $G$ teisel elemendil.',
        solution: `
          <p>Kui leidub $a$, mille korral $F(a)\\&G(a)$, siis sama $a$ tõestab nii $\\exists xF(x)$ kui ka $\\exists xG(x)$.</p>
          <p>Pöördsuuna vastumudel: kandja $\\{0,1\\}$, $F$ tõene ainult $0$ korral ja $G$ tõene ainult $1$ korral. Siis $\\exists xF(x)$ ja $\\exists xG(x)$ on mõlemad tõesed, kuid ühtegi elementi, millel mõlemad korraga kehtiksid, ei ole.</p>
        `,
      },
      {
        title: 'Universaalne implikatsioon',
        body: 'Tõestage $\\forall x(F(x)\\Rightarrow G(x)) \\models \\forall xF(x)\\Rightarrow\\forall xG(x)$.',
        hint: 'Võta suvaline interpretatsioon ja eelda, et $\\forall xF(x)$ on tõene.',
        solution: `
          <p>Olgu interpretatsioonis $\\forall x(F(x)\\Rightarrow G(x))$ tõene. Et näidata implikatsiooni $\\forall xF(x)\\Rightarrow\\forall xG(x)$, eelda $\\forall xF(x)$.</p>
          <p>Võta suvaline element $a$. Eeldusest $\\forall xF(x)$ saame $F(a)$ ja eeldusest $\\forall x(F(x)\\Rightarrow G(x))$ saame $F(a)\\Rightarrow G(a)$. Modus ponens annab $G(a)$. Kuna $a$ oli suvaline, siis $\\forall xG(x)$.</p>
        `,
      },
    ],
    sequent: [
      {
        title: 'Sekvents: kontrapositsioon',
        body: 'Sõnastage korrektsuse teoreem. Tuletage sekvents $P\\Rightarrow Q \\vdash \\neg Q\\Rightarrow\\neg P$.',
        hint: 'Implikatsiooni paremale viimiseks lisa eelduseks $\\neg Q$ ja näita $\\neg P$.',
        solution: `
          <p>Korrektsus: kui sekvents on formaalses süsteemis tuletatav, siis tema valemkuju on semantiliselt tõene.</p>
          <p>Tuletuse idee: paremal oleva implikatsiooni jaoks eelda lisaks $\\neg Q$ ja näita $\\neg P$. Selleks eelda omakorda $P$; eeldusest $P\\Rightarrow Q$ saad $Q$, mis on vastuolus eeldusega $\\neg Q$. Seega $P$ viib vastuoluni ning saad $\\neg P$.</p>
        `,
      },
      {
        title: 'Sekvents: disjunktiivne jaotus',
        body: 'Sõnastage täielikkuse teoreem. Tuletage sekvents $(P\\lor Q)\\&R \\vdash (P\\&R)\\lor(Q\\&R)$.',
        hint: 'Kasuta vasakul konjunktsiooni ning seejärel vasakul disjunktsiooni juhtumiteks jagamist.',
        solution: `
          <p>Täielikkus: iga semantiliselt tõene valem või kehtiv sekvents on süsteemis tuletatav.</p>
          <p>Eeldusest $(P\\lor Q)\\&R$ saad vasakul konjunktsiooni reegliga $P\\lor Q$ ja $R$. Disjunktsiooni vasakreegel jagab tõestuse kaheks: kui $P$, siis $P\\&R$ ja seega $(P\\&R)\\lor(Q\\&R)$; kui $Q$, siis $Q\\&R$ ja seega sama disjunktsioon.</p>
        `,
      },
      {
        title: 'Sekvents: modus ponens valemina',
        body: 'Defineerige sekventsi valemkuju. Tuletage $\\neg(P\\Rightarrow Q) \\vdash P\\&\\neg Q$.',
        hint: 'Vasakul oleva implikatsiooni eituse jaoks kasuta reegleid, mis annavad $P$ ja $\\neg Q$.',
        solution: `
          <p>Sekventsi $F_1,\\ldots,F_n\\vdash G$ valemkuju on $F_1\\&\\cdots\\&F_n\\Rightarrow G$; sekventsi $\\vdash G$ valemkuju on $G$.</p>
          <p>Kasuta samaväärsust $\\neg(P\\Rightarrow Q)\\equiv P\\&\\neg Q$. Sekventsiaalselt saab selle avada nii, et $\\neg(P\\Rightarrow Q)$ vasakul annab kaks sihti: näidata $P$ ja näidata $\\neg Q$; seejärel paremal konjunktsiooni reegel annab $P\\&\\neg Q$.</p>
        `,
      },
      {
        title: 'Sekvents: kahe juhu eliminatsioon',
        body: 'Sõnastage sekventsiaalse lausearvutuse korrektsus. Tuletage $A\\Rightarrow B,\\neg A\\Rightarrow B \\vdash B$.',
        hint: 'Kasuta välistatud kolmanda printsiipi või disjunktsiooni juhtumeid $A$ ja $\\neg A$.',
        solution: `
          <p>Korrektsus tähendab, et iga tuletatav sekvents on semantiliselt kehtiv.</p>
          <p>Tuletuse skeem: kasuta juhtumiteks jagamist valemi $A\\lor\\neg A$ järgi. Kui $A$, siis eeldusest $A\\Rightarrow B$ saad $B$. Kui $\\neg A$, siis eeldusest $\\neg A\\Rightarrow B$ saad $B$. Mõlemal juhul järeldub $B$.</p>
        `,
      },
    ],
    prefix: [
      {
        title: 'Prefikskuju: variant A tüüp',
        body: 'Teisendage valem $\\neg\\exists y(\\exists xP(x)\\Rightarrow(Q(y)\\Rightarrow\\forall xR(x)))$ prefikskujule, kus eitused on atomaarsete valemite ees ja implikatsiooni ei esine.',
        hint: 'Eemalda implikatsioonid, vii eitus sisse, nimeta korduvad seotud muutujad ümber.',
        solution: `
          <p>Nimeta sisemine $\\forall xR(x)$ ümber näiteks kujule $\\forall zR(z)$.</p>
          <p>$\\neg\\exists y(\\exists xP(x)\\Rightarrow(Q(y)\\Rightarrow\\forall zR(z)))$ teisendub kujule $\\forall y\\neg(\\neg\\exists xP(x)\\lor\\neg Q(y)\\lor\\forall zR(z))$.</p>
          <p>Pärast eituse sisseviimist saad prefikskuju $\\forall y\\exists x\\exists z(P(x)\\&Q(y)\\&\\neg R(z))$.</p>
        `,
      },
      {
        title: 'Prefikskuju: variant D tüüp',
        body: 'Teisendage valem $\\neg\\exists x(\\forall yP(x,y)\\Rightarrow\\exists zQ(z))$ prefikskujule.',
        hint: '$\\neg\\exists x$ muutub $\\forall x\\neg$; implikatsioonist saab disjunktsioon.',
        solution: `
          <p>$\\neg\\exists x(\\forall yP(x,y)\\Rightarrow\\exists zQ(z))$ annab $\\forall x\\neg(\\neg\\forall yP(x,y)\\lor\\exists zQ(z))$.</p>
          <p>De Morgani ja kvantorieituste järel: $\\forall x(\\forall yP(x,y)\\&\\forall z\\neg Q(z))$.</p>
          <p>Prefikskuju: $\\forall x\\forall y\\forall z(P(x,y)\\&\\neg Q(z))$.</p>
        `,
      },
      {
        title: 'Prefikskuju: variant E tüüp',
        body: 'Teisendage valem $\\neg\\forall x(\\exists yP(x,y)\\Rightarrow\\exists z\\neg Q(x,z))$ prefikskujule.',
        hint: '$\\neg\\forall x$ muutub $\\exists x\\neg$ ja $\\neg\\exists z\\neg Q$ muutub $\\forall zQ$.',
        solution: `
          <p>$\\neg\\forall x$ muutub kujule $\\exists x\\neg$. Implikatsiooni eitus annab $A\\&\\neg B$.</p>
          <p>Seega saad $\\exists x(\\exists yP(x,y)\\&\\neg\\exists z\\neg Q(x,z))$, mis on $\\exists x(\\exists yP(x,y)\\&\\forall zQ(x,z))$.</p>
          <p>Prefikskuju: $\\exists x\\exists y\\forall z(P(x,y)\\&Q(x,z))$.</p>
        `,
      },
      {
        title: 'Prefikskuju: variant F tüüp',
        body: 'Defineerige prefikskuju. Teisendage $\\neg(\\forall xP(x)\\Rightarrow\\exists y\\forall zQ(y,z))$ prefikskujule.',
        hint: 'Kasuta samaväärsust $\\neg(A\\Rightarrow B)\\equiv A\\&\\neg B$.',
        solution: `
          <p>Prefikskuju on valem kujul $Q_1x_1\\cdots Q_nx_nF'$, kus kvantorid on alguses ja maatriks $F'$ on kvantoriteta.</p>
          <p>$\\neg(A\\Rightarrow B)\\equiv A\\&\\neg B$, seega valem muutub kujule $\\forall xP(x)\\&\\neg\\exists y\\forall zQ(y,z)$.</p>
          <p>Teine pool on $\\forall y\\exists z\\neg Q(y,z)$, seega prefikskuju on $\\forall x\\forall y\\exists z(P(x)\\&\\neg Q(y,z))$.</p>
        `,
      },
    ],
    signature: [
      {
        title: 'Signatuur: maatriks',
        body: 'Leidke võimalikult väheste elementidega signatuur ja interpretatsioon, et väljendada väiteid maatriksi $A\\in Mat_{m,n}(\\mathbb{N})$ kohta. Väljendage: viimase rea elemendid on kasvavas järjestuses; täpselt üks veerg koosneb nullidest.',
        hint: 'Mõtle, kas põhihulk võiks olla indeksite ja väärtuste ühine kandja või on vaja sorteerimist imiteerida predikaatidega.',
        solution: `
          <p>Üks sobiv lahendus on kasutada signatuuri indeksite ja väärtuste jaoks: predikaadid $Row,Col$, järjestus $<$, konstant $l$ viimase rea jaoks, konstant $0$ ning funktsioon $a(i,j)$ maatriksielemendi väärtuse jaoks.</p>
          <p>Viimane rida kasvab: $\\forall j\\forall k((Col(j)\\&Col(k)\\&j<k)\\Rightarrow a(l,j)<a(l,k))$.</p>
          <p>Täpselt üks nullveerg: $\\exists c(Col(c)\\&\\forall i(Row(i)\\Rightarrow a(i,c)=0)\\&\\forall d((Col(d)\\&\\forall i(Row(i)\\Rightarrow a(i,d)=0))\\Rightarrow d=c))$.</p>
        `,
      },
      {
        title: 'Signatuur: jaguvus naturaalarvudel',
        body: 'Signatuuris $\\langle\\,; +,\\cdot; =, |\\rangle$ üle $\\mathbb{N}$ väljendage: $x=1$, $x$ on paaris, $x$ on algarv, $x$ ja $y$ on ühistegurita.',
        hint: '$x=1$ saab väljendada korrutamise neutraalelemendi kaudu.',
        solution: `
          <p>$x=1$: $\\forall y(x\\cdot y=y)$.</p>
          <p>$x$ on paaris: $\\exists k(x=k+k)$.</p>
          <p>$x$ on algarv: $x\\neq0\\&x\\neq1\\&\\forall a\\forall b(x=a\\cdot b\\Rightarrow(a=1\\lor b=1))$.</p>
          <p>$x$ ja $y$ on ühistegurita: $\\forall d((d|x\\&d|y)\\Rightarrow d=1)$.</p>
        `,
      },
      {
        title: 'Signatuur: funktsioon',
        body: 'Valige signatuur funktsiooni $f:\\mathbb{N}\\to\\mathbb{N}$ omaduste jaoks. Väljendage: $f$ on monotoonselt mittekahanev; $f$-l leidub püsipunkt.',
        hint: 'Kasuta funktsionaalsümbolit $f$ ja järjestuse või aritmeetika väljendamiseks sobivaid predikaate.',
        solution: `
          <p>Sobib signatuur $\\langle\\,; f; \\leq,=\\rangle$ üle põhihulga $\\mathbb{N}$.</p>
          <p>Monotoonselt mittekahanev: $\\forall x\\forall y(x\\leq y\\Rightarrow f(x)\\leq f(y))$.</p>
          <p>Püsipunkt leidub: $\\exists x(f(x)=x)$.</p>
        `,
      },
      {
        title: 'Signatuur: hulgad',
        body: 'Põhihulgal $\\mathcal{P}(\\mathbb{N})$ ja signatuuris $\\langle\\,;\\cup,\\cap;=\\rangle$ väljendage: $x=\\emptyset$, $x=\\mathbb{N}$, $x\\subseteq y$, $x\\prime=y$ kui $x\\prime$ tähendab täiendit.',
        hint: 'Tühihulka ja universaalhulka saab iseloomustada lõike ja ühendi abil.',
        solution: `
          <p>$x=\\emptyset$: $\\forall y(x\\cap y=x)$.</p>
          <p>$x=\\mathbb{N}$: $\\forall y(x\\cup y=x)$.</p>
          <p>$x\\subseteq y$: $x\\cap y=x$ ehk samaväärselt $x\\cup y=y$.</p>
          <p>$x\\prime=y$: $x\\cap y=\\emptyset$ ja $x\\cup y=\\mathbb{N}$, kus $\\emptyset$ ja $\\mathbb{N}$ saab kasutada ülalolevate definitsioonide kaudu.</p>
        `,
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
            <details class="exam-solution" data-exam-solution>
              <summary>Vastus / lahenduse tuum</summary>
              <div class="exam-solution-body">${item.task.solution || '<p>Vastus on lisamisel.</p>'}</div>
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
          <button class="btn" id="newExam" type="button">Uus harjutustöö</button>
          <button class="btn secondary" id="shuffleOne" type="button">Vaheta üks juhuslik ülesanne</button>
          <button class="btn secondary" id="openAnswers" type="button">Ava vastused</button>
          <button class="btn secondary" id="closeAnswers" type="button">Peida vastused</button>
        </div>
        <div class="exam-checklist">
          <span class="tag accent">Soovitus</span>
          Võta 90 minutit, kirjuta lahendus paberile ja alles siis ava vihjed või vastused.
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
    document.getElementById('openAnswers').addEventListener('click', () => {
      document.querySelectorAll('[data-exam-solution]').forEach(details => { details.open = true; });
    });
    document.getElementById('closeAnswers').addEventListener('click', () => {
      document.querySelectorAll('[data-exam-solution]').forEach(details => { details.open = false; });
    });

    render();
  };
})();

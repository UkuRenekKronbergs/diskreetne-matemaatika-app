/* ===== Search, cheat-sheet and long-term study helpers ===== */

(function () {
  'use strict';

  const STREAK_KEY = 'dm_streak_v1';

  const CHEAT_SHEETS = [
    {
      group: 'Matemaatiline loogika',
      title: 'Lausearvutus',
      route: 'lausearvutus',
      items: [
        'Tehted: $\\neg$, $\\&$, $\\lor$, $\\Rightarrow$, $\\Leftrightarrow$; prioriteet samas järjekorras.',
        '$F\\Rightarrow G\\equiv \\neg F\\lor G$; väär ainult juhul $F=1$, $G=0$.',
        'Samaselt tõene: tõene igal väärtustusel. Kehtestatav: tõene vähemalt ühel väärtustusel.',
        '$F_1,\\ldots,F_n\\models G$ parajasti siis, kui $F_1\\&\\cdots\\&F_n\\Rightarrow G$ on tautoloogia.',
      ],
    },
    {
      group: 'Matemaatiline loogika',
      title: 'Tõesuspuu',
      route: 'toesuspuu',
      items: [
        'Kehtestatavus: pane puu juureks $F$; avatud haru annab väärtustuse.',
        'Samaselt tõesus: pane juureks $\\neg F$; kõik harud sulguvad $\\Rightarrow F$ on tautoloogia.',
        'Alfa-reeglid lisavad samasse harusse; beeta-reeglid hargnevad.',
        'Vastuolu harus: sama valem ja tema eitus.',
      ],
    },
    {
      group: 'Matemaatiline loogika',
      title: 'Predikaadid ja kvantorid',
      route: 'predikaadid',
      items: [
        'Predikaat $P:M^n\\to\\{0,1\\}$. Kvantorid: $\\forall$ ja $\\exists$.',
        '$\\neg\\forall xF\\equiv\\exists x\\neg F$; $\\neg\\exists xF\\equiv\\forall x\\neg F$.',
        'Kvantorite järjekord loeb: $\\forall x\\exists y$ ei tähenda üldiselt sama, mis $\\exists y\\forall x$.',
        'Kontranäite jaoks piisab sageli väikesest 2- või 3-elemendilisest mudelist.',
      ],
    },
    {
      group: 'Matemaatiline loogika',
      title: 'Signatuur ja interpretatsioon',
      route: 'signatuur',
      items: [
        'Signatuur $\\sigma=\\langle C;F;P\\rangle$: konstandid, funktsioonisümbolid, predikaatsümbolid.',
        'Interpretatsioon fikseerib põhihulga ning annab igale sümbolile tähenduse.',
        'Konstant $c$ muutub elemendiks $c^\\alpha$; funktsioonisümbol funktsiooniks; predikaatsümbol predikaadiks.',
        'Valemi mudel on interpretatsioon, kus valem on tõene kõigil vabade muutujate väärtustel.',
      ],
    },
    {
      group: 'Matemaatiline loogika',
      title: 'Samaväärsus ja normaalkujud',
      route: 'samavaarsus',
      items: [
        '$F\\equiv G$ parajasti siis, kui $F\\Leftrightarrow G$ on samaselt tõene.',
        'De Morgan: $\\neg(F\\&G)\\equiv\\neg F\\lor\\neg G$ ja $\\neg(F\\lor G)\\equiv\\neg F\\&\\neg G$.',
        'DNK: lihtkonjunktsioonide disjunktsioon. KNK: lihtdisjunktsioonide konjunktsioon.',
        'Täielik DNK tuleb tõestest tabeliridadest; täielik KNK vääradest tabeliridadest.',
      ],
    },
    {
      group: 'Matemaatiline loogika',
      title: 'Prefikskuju',
      route: 'prefikskuju',
      items: [
        'Prefikskuju: $Q_1x_1\\cdots Q_nx_nM$, kus $M$ on kvantoriteta maatriks.',
        'Sammud: eemalda $\\Rightarrow,\\Leftrightarrow$; vii eitused atomaarsete valemiteni; nimeta muutujad vajadusel ümber; too kvantorid ette.',
        '$\\neg(A\\Rightarrow B)\\equiv A\\&\\neg B$; $A\\Rightarrow B\\equiv\\neg A\\lor B$.',
      ],
    },
    {
      group: 'Matemaatiline loogika',
      title: 'Sekvents ja Peano',
      route: 'sekvents',
      items: [
        'Sekvents: $F_1,\\ldots,F_n\\vdash G$. Valemkuju: $F_1\\&\\cdots\\&F_n\\Rightarrow G$.',
        'Korrektsus: tuletatav $\\Rightarrow$ semantiliselt kehtiv. Täielikkus: semantiliselt kehtiv $\\Rightarrow$ tuletatav.',
        'Peano signatuur: $\\langle0;\\prime,+,\\cdot;=\\rangle$.',
        'Induktsioon: $F(0)\\&\\forall x(F(x)\\Rightarrow F(x\\prime))\\Rightarrow\\forall xF(x)$.',
      ],
    },
    {
      group: 'Graafiteooria',
      title: 'Graafi mõiste ja tipuastmed',
      route: 'graafid',
      items: [
        'Graaf $G=(V,E)$, kus $E$ koosneb $V$ kaheelemendilistest alamhulkadest.',
        'Tipuaste $d(v)$: tipuga intsidentsete servade arv.',
        'Tipuastmete teoreem: $\\sum_{v\\in V}d(v)=2|E|$; paaritu astmega tippe on paarisarv.',
        'Lihtgraafis peab iga aste olema vahemikus $0,\\ldots,n-1$.',
      ],
    },
    {
      group: 'Graafiteooria',
      title: 'Ahelad, sidusus, isomorfism',
      route: 'ahelad',
      items: [
        'Ahel: tippude järjend, kus järjestikused tipud on servaga ühendatud.',
        'Tsükkel: kinnine ahel vähemalt kolme servaga, vahepealsed tipud ei kordu.',
        'Sidus graaf: iga kahe tipu vahel leidub ahel.',
        'Isomorfism säilitab tipuarvu, servaarvu, astmejärjendi, tsüklid ja sidususe.',
      ],
    },
    {
      group: 'Graafiteooria',
      title: 'Euler, Hamilton, puud',
      route: 'eulerhamilton',
      items: [
        'Euleri graaf: sidus ja kõik astmed paarisarvud.',
        'Euleri ahel leidub sidusas graafis, kui paaritu astmega tippe on $0$ või $2$.',
        'Dirac: kui $n\\ge3$ ja iga aste vähemalt $n/2$, siis graaf on Hamiltoni graaf.',
        'Puu: sidus ja tsükliteta; $n$ tipuga puus on $n-1$ serva.',
      ],
    },
    {
      group: 'Graafiteooria',
      title: 'Toespuud ja lühim tee',
      route: 'toespuud',
      items: [
        'Toespuu: sidusa graafi alamgraaf, mis sisaldab kõiki tippe ja on puu.',
        'Kruskal: vali kasvava kaaluga servi, vältides tsükleid.',
        'Prim: kasvata puud ühest tipust, valides odavaima serva puu ja välise tipu vahel.',
        'Dijkstra: mittenegatiivsete kaaludega lühim tee ühest algtipust; Floyd-Warshall: kõik paarid, $O(n^3)$.',
      ],
    },
  ];

  function renderMath(el) {
    if (!window.renderMathInElement || !el) return;
    window.renderMathInElement(el, {
      delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
      throwOnError: false,
    });
  }

  function localDateKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function daysBetween(a, b) {
    const start = new Date(`${a}T00:00:00`);
    const end = new Date(`${b}T00:00:00`);
    return Math.round((end - start) / 86400000);
  }

  window.initStreak = function () {
    const today = localDateKey();
    let data = { streak: 0, last: null, best: 0 };
    try { data = { ...data, ...(JSON.parse(localStorage.getItem(STREAK_KEY)) || {}) }; }
    catch {}

    if (data.last !== today) {
      data.streak = data.last && daysBetween(data.last, today) === 1 ? data.streak + 1 : 1;
      data.last = today;
      data.best = Math.max(data.best || 0, data.streak);
      localStorage.setItem(STREAK_KEY, JSON.stringify(data));
    }

    const box = document.getElementById('streakBox');
    if (box) box.textContent = `Õpijada: ${data.streak} ${data.streak === 1 ? 'päev' : 'päeva'} · rekord ${data.best || data.streak}`;
  };

  function repairText(text) {
    const value = String(text || '');
    if (!/[ÃÂâ]/.test(value)) return value;
    try { return decodeURIComponent(escape(value)); }
    catch { return value; }
  }

  function normalize(text) {
    return repairText(text).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  }

  function escapeHtml(text) {
    return String(text || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  function escapeRegExp(text) {
    return String(text || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function contextFor(text, query) {
    const repaired = repairText(text).replace(/\s+/g, ' ').trim();
    const idx = normalize(repaired).indexOf(normalize(query));
    const start = Math.max(0, idx - 130);
    const end = Math.min(repaired.length, (idx >= 0 ? idx : 0) + query.length + 180);
    let snippet = repaired.slice(start, end);
    if (start > 0) snippet = `...${snippet}`;
    if (end < repaired.length) snippet += '...';
    const safe = escapeHtml(snippet);
    const pattern = escapeRegExp(query.trim());
    return pattern ? safe.replace(new RegExp(pattern, 'ig'), match => `<mark>${match}</mark>`) : safe;
  }

  window.initStudySearch = function () {
    const view = document.getElementById('view');
    if (!view) return;
    view.innerHTML = `
      <h1>Konspekti otsing</h1>
      <p>Otsi kõigi ekstraktitud PDF-ide tekstist. Tulemused näitavad PDF-i nime, lehekülge ja lähikonteksti.</p>
      <div class="card">
        <div class="input-row">
          <input id="studySearchInput" type="text" placeholder="Nt: Havel-Hakimi, prefikskuju, Euleri graaf" autocomplete="off">
          <button class="btn" id="studySearchBtn" type="button">Otsi</button>
        </div>
        <div class="muted" id="studySearchStatus">Andmestik laadimata.</div>
      </div>
      <div id="studySearchResults"></div>
    `;

    const status = document.getElementById('studySearchStatus');
    let pages = [];
    fetch('data/extracted.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        pages = Object.entries(data).flatMap(([file, list]) => (list || []).map((text, index) => ({
          file,
          page: index + 1,
          text: repairText(text),
          search: normalize(text),
        })));
        status.textContent = `${pages.length} lehekülge laaditud.`;
      })
      .catch(err => {
        status.textContent = `Otsinguandmestikku ei saanud laadida: ${err.message}`;
      });

    function search() {
      const query = document.getElementById('studySearchInput').value.trim();
      const out = document.getElementById('studySearchResults');
      if (query.length < 2) {
        out.innerHTML = '<div class="card muted">Sisesta vähemalt kaks märki.</div>';
        return;
      }
      const nq = normalize(query);
      const hits = pages
        .map(page => ({ ...page, idx: page.search.indexOf(nq) }))
        .filter(page => page.idx >= 0)
        .slice(0, 30);

      status.textContent = `${hits.length}${hits.length === 30 ? '+' : ''} tulemust päringule "${query}".`;
      out.innerHTML = hits.length ? hits.map(hit => `
        <article class="search-hit">
          <div class="search-hit-head">
            <strong>${escapeHtml(repairText(hit.file))}</strong>
            <a class="btn small secondary" href="materjalid/${encodeURIComponent(hit.file)}#page=${hit.page}" target="_blank">lk ${hit.page}</a>
          </div>
          <p>${contextFor(hit.text, query)}</p>
        </article>
      `).join('') : '<div class="card muted">Tulemusi ei leitud. Proovi lühemat vormi või ilma käändelõputa.</div>';
    }

    document.getElementById('studySearchBtn').addEventListener('click', search);
    document.getElementById('studySearchInput').addEventListener('keydown', e => { if (e.key === 'Enter') search(); });
  };

  window.initCheatSheet = function () {
    const view = document.getElementById('view');
    if (!view) return;
    const groups = [...new Set(CHEAT_SHEETS.map(item => item.group))];
    view.innerHTML = `
      <h1>Cheat-sheet</h1>
      <p>Kompaktne viimase hetke kordamisvaade. Printides jäävad alles ainult põhisisu ja valemid.</p>
      <div class="btn-row no-print">
        <button class="btn" id="printCheatSheet" type="button">Prindi / salvesta PDF-iks</button>
        <a class="btn secondary" href="#otsing">Otsi konspektist</a>
      </div>
      <div class="cheat-sheet">
        ${groups.map(group => `
          <section class="cheat-group">
            <h2>${group}</h2>
            <div class="cheat-grid">
              ${CHEAT_SHEETS.filter(item => item.group === group).map(item => `
                <article class="cheat-card">
                  <h3><a href="#${item.route}">${item.title}</a></h3>
                  <ul>${item.items.map(line => `<li>${line}</li>`).join('')}</ul>
                </article>
              `).join('')}
            </div>
          </section>
        `).join('')}
      </div>
    `;
    document.getElementById('printCheatSheet').addEventListener('click', () => window.print());
    renderMath(view);
  };
})();

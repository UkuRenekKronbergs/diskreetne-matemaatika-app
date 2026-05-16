/* ===== Content for Diskreetne matemaatika I =====
 * All theory content as HTML strings, keyed by route.
 * Math notation uses $...$ (inline) and $$...$$ (display), rendered by KaTeX.
 */

window.CONTENT = {

/* ============= AVALEHT ============= */
avaleht: `
<h1>Tere tulemast! 🎓</h1>
<p>See on interaktiivne õppekeskkond Tartu Ülikooli kursusele <strong>Diskreetne matemaatika I</strong> (LTMS.00.019). Kõik materjalid põhinevad Kati Aini loengukonspektil (Valdis Laan, 2020; täiendanud Kati Ain, 28.01.2026) ja praktikumiülesannete kogul (Reimo Palm, Valdis Laan, Kati Ain).</p>

<div class="dashboard">
  <a href="#hinnekalkulaator" class="dash-card">
    <span class="icon">∑</span>
    <h3>Hinde kalkulaator</h3>
    <p>Sisesta TBL, kontrolltööde ja lisapunktide seis ning vaata, mis miinimum on veel vaja.</p>
  </a>
  <a href="#lausearvutus" class="dash-card">
    <span class="icon">∧</span>
    <h3>Lausearvutus</h3>
    <p>Lihtlaused, valemid, tõeväärtustabelid, samaselt tõesus.</p>
  </a>
  <a href="#toesuspuu" class="dash-card">
    <span class="icon">🌲</span>
    <h3>Tõesuspuu meetod</h3>
    <p>Süstemaatiline viis valemi omaduste kontrollimiseks.</p>
  </a>
  <a href="#predikaadid" class="dash-card">
    <span class="icon">∀∃</span>
    <h3>Predikaatloogika</h3>
    <p>Predikaadid, kvantorid, signatuur ja interpretatsioonid.</p>
  </a>
  <a href="#peano" class="dash-card">
    <span class="icon">ℕ</span>
    <h3>Peano aritmeetika</h3>
    <p>7 aksioomi, induktsioon, naturaalarvude omadused.</p>
  </a>
  <a href="#grapheditor" class="dash-card">
    <span class="icon">📈</span>
    <h3>Graafiredaktor</h3>
    <p>Joonista graafe, vaata naabrusmaatriksit, leia astmeid.</p>
  </a>
  <a href="#toespuud" class="dash-card">
    <span class="icon">🌳</span>
    <h3>Toespuud</h3>
    <p>Kruskali ja Primi algoritmid samm-sammult.</p>
  </a>
  <a href="#luhimtee" class="dash-card">
    <span class="icon">🛣️</span>
    <h3>Lühim tee</h3>
    <p>Dijkstra ja Floydi–Warshalli algoritmid.</p>
  </a>
  <a href="#kviis" class="dash-card">
    <span class="icon">❓</span>
    <h3>Kiirviktoriin</h3>
    <p>Kontrolli, kas oled materjali selgeks saanud.</p>
  </a>
  <a href="#harjutustoo" class="dash-card">
    <span class="icon">32</span>
    <h3>Harjutustöö</h3>
    <p>Koosta juhuslik 32-punktine kontrolltöö vanade ülesandetüüpide põhjal.</p>
  </a>
</div>

<div class="card">
  <h3>📚 Kuidas seda keskkonda kasutada?</h3>
  <ol>
    <li><strong>Loe teooriat</strong> järjest läbi vasakult menüüst — alustades lausearvutusest.</li>
    <li><strong>Tee interaktiivseid harjutusi</strong> iga teema juures (tõeväärtustabel, prefikskuju, graafialgoritmid).</li>
    <li><strong>Testi end</strong> kiirviktoriiniga ja vaata vanu kontrolltöid.</li>
    <li>Edenemine salvestub automaatselt sinu seadmesse (localStorage).</li>
  </ol>
</div>

<div class="tip">
  💡 <strong>Vihje:</strong> Iga lehekülg avab valdkonna lühidalt, aga sügavate tõestuste jaoks vaata loengukonspekti (<a href="materjalid/DMI_konspekt_2026_28.01.pdf" target="_blank">PDF</a>).
</div>
`,

/* ============= KURSUS ============= */
kursus: `
<h1>Kursuse info</h1>
<table>
  <tr><td><strong>Ainekood</strong></td><td>LTMS.00.019</td></tr>
  <tr><td><strong>Aine</strong></td><td>Diskreetne matemaatika I</td></tr>
  <tr><td><strong>Maht</strong></td><td>6 EAP</td></tr>
  <tr><td><strong>Loengud</strong></td><td>18 tundi</td></tr>
  <tr><td><strong>Praktikumid</strong></td><td>64 tundi</td></tr>
  <tr><td><strong>Iseseisev töö</strong></td><td>74 tundi</td></tr>
  <tr><td><strong>Hindamine</strong></td><td>Hinne kujuneb jooksvalt — eksamit ei ole</td></tr>
  <tr><td><strong>Õppejõud</strong></td><td>Kati Ain</td></tr>
  <tr><td><strong>E-post</strong></td><td>kati.ain@ut.ee</td></tr>
  <tr><td><strong>Ruum</strong></td><td>4060</td></tr>
</table>

<h2>Kursuse sisu</h2>
<p>Sissejuhatus matemaatilisse loogikasse ja graafiteooriasse. Kursus koosneb kahest suurest osast.</p>

<h3>1. osa — Matemaatiline loogika</h3>
<ul>
  <li>Lausearvutuse kordamine, tõesuspuud</li>
  <li>Predikaadid, kvantorid</li>
  <li>Signatuur, interpretatsioonid</li>
  <li>Predikaatarvutuse valemi tõesus mudelil</li>
  <li>Samaselt tõesus ja loogiline samaväärsus</li>
  <li>Predikaatloogika põhisamaväärsused</li>
  <li>Valemi prefikskuju</li>
  <li>Aksiomaatilised teooriad</li>
  <li>Sekventsiaalne lausearvutus</li>
  <li>Peano aksioomid</li>
  <li>Naturaalarvude omadused</li>
</ul>

<h3>2. osa — Graafiteooria</h3>
<ul>
  <li>Graafi mõiste</li>
  <li>Tipuastmed, ahelad, tsüklid</li>
  <li>Sidusus, isomorfism</li>
  <li>Euleri ja Hamiltoni graafid</li>
  <li>Puud ja nende põhiomadused</li>
  <li>Toespuud (Kruskali ja Primi algoritmid)</li>
  <li>Suunatud graafid</li>
  <li>Lühima tee leidmise ülesanne (Floyd–Warshall, Dijkstra)</li>
</ul>

<h2>Materjalid</h2>
<div class="pdf-list">
  <a href="materjalid/DMI_konspekt_2026_28.01.pdf" target="_blank">
    📘 Loengukonspekt (Valdis Laan, täiendanud Kati Ain, 28.01.2026)
    <div class="meta">125 lehekülge — kogu teooria</div>
  </a>
  <a href="materjalid/DM_1_ülesannete_kogu_2026K.pdf" target="_blank">
    📋 Praktikumiülesannete kogu (kevad 2026)
    <div class="meta">47 lehekülge, 20 peatükki</div>
  </a>
  <a href="materjalid/Kontrolltoo_1_07.04.2026_Variant_A.pdf" target="_blank">
    📝 Kontrolltöö 1 (07.04.2026), Variant A
  </a>
  <a href="materjalid/Kontrolltoo_1_Variant_D.pdf" target="_blank">
    📝 Kontrolltöö 1, Variant D
  </a>
  <a href="materjalid/Kontrolltoo_1_Variant_E.pdf" target="_blank">
    📝 Kontrolltöö 1, Variant E
  </a>
  <a href="materjalid/Kontrolltoo_1_Variant_F.pdf" target="_blank">
    📝 Kontrolltöö 1, Variant F
  </a>
  <a href="materjalid/Kontrolltoo_1_jareltoo_21.04.2026_Variant_C.pdf" target="_blank">
    📝 Järeltöö (21.04.2026), Variant C
  </a>
  <a href="materjalid/Kontrolltoo_1_lahendused.pdf" target="_blank">
    ✅ Kontrolltöö 1 lahendused
  </a>
</div>
`,

/* ============= HINDE KALKULAATOR ============= */
hinnekalkulaator: `<h1>Hinde kalkulaator</h1><p>Laadimine...</p>`,

/* ============= LAUSEARVUTUS ============= */
lausearvutus: `
<h1>Lausearvutus</h1>
<p>Lausearvutuse uurimisobjektideks on <strong>laused</strong>, millele saab vastavusse seada tõeväärtuse („tõene" / „väär", tähistame $1$ ja $0$).</p>

<div class="card">
  <h3>Aksiomaatika</h3>
  <p><strong>Välistatud kolmanda seadus.</strong> Iga lause on kas tõene või väär.</p>
  <p><strong>Mittevasturääkivuse seadus.</strong> Ükski lause ei saa olla korraga tõene ja väär.</p>
</div>

<h2>Lausearvutuse tehted</h2>
<table>
  <thead><tr><th>Tehte nimi</th><th>Tähis</th><th>Grammatiline seos</th></tr></thead>
  <tbody>
    <tr><td>Eitus</td><td>$\\neg$</td><td>ei</td></tr>
    <tr><td>Konjunktsioon</td><td>$\\&$, $\\land$</td><td>ja</td></tr>
    <tr><td>Disjunktsioon</td><td>$\\lor$</td><td>või (mittevälistav)</td></tr>
    <tr><td>Implikatsioon</td><td>$\\Rightarrow$, $\\to$</td><td>kui ..., siis ...</td></tr>
    <tr><td>Ekvivalents</td><td>$\\Leftrightarrow$, $\\leftrightarrow$</td><td>... parajasti siis, kui ...</td></tr>
  </tbody>
</table>

<div class="note">
  Käesolevas kursuses eelistame sümboleid $\\neg, \\&, \\lor, \\Rightarrow, \\Leftrightarrow$. Tehete prioriteet kõrgeimast madalaimani: $\\neg, \\&, \\lor, \\Rightarrow, \\Leftrightarrow$.
</div>

<div class="def">
  <strong>Lausearvutuse valem.</strong>
  <ol>
    <li>Iga lausemuutuja on lausearvutuse valem.</li>
    <li>Kui $F$ on valem, siis ka $\\neg F$ on valem.</li>
    <li>Kui $F$ ja $G$ on valemid, siis ka $(F\\&G), (F\\lor G), (F\\Rightarrow G), (F\\Leftrightarrow G)$ on valemid.</li>
  </ol>
</div>

<h2>Tõeväärtuse leidmine</h2>
<div class="def">
  Lausearvutuse valemi tõeväärtus muutujate väärtustusel:
  <ul>
    <li>$\\neg G$ on tõene parajasti siis, kui $G$ on väär</li>
    <li>$G\\&H$ on tõene parajasti siis, kui $G=1$ ja $H=1$</li>
    <li>$G\\lor H$ on tõene parajasti siis, kui $G=1$ või $H=1$</li>
    <li>$G\\Rightarrow H$ on tõene parajasti siis, kui $G=0$ või $H=1$</li>
    <li>$G\\Leftrightarrow H$ on tõene parajasti siis, kui $G=H$</li>
  </ul>
</div>

<h2>Põhitabel</h2>
<table class="truth-table">
  <thead><tr><th>$G$</th><th>$H$</th><th>$G\\&H$</th><th>$G\\lor H$</th><th>$G\\Rightarrow H$</th><th>$G\\Leftrightarrow H$</th><th>$\\neg G$</th></tr></thead>
  <tbody>
    <tr><td class="val-1">1</td><td class="val-1">1</td><td class="val-1">1</td><td class="val-1">1</td><td class="val-1">1</td><td class="val-1">1</td><td class="val-0">0</td></tr>
    <tr><td class="val-1">1</td><td class="val-0">0</td><td class="val-0">0</td><td class="val-1">1</td><td class="val-0">0</td><td class="val-0">0</td><td class="val-0">0</td></tr>
    <tr><td class="val-0">0</td><td class="val-1">1</td><td class="val-0">0</td><td class="val-1">1</td><td class="val-1">1</td><td class="val-0">0</td><td class="val-1">1</td></tr>
    <tr><td class="val-0">0</td><td class="val-0">0</td><td class="val-0">0</td><td class="val-0">0</td><td class="val-1">1</td><td class="val-1">1</td><td class="val-1">1</td></tr>
  </tbody>
</table>

<h2>Valemite omadused</h2>
<div class="def">
  Lausearvutuse valem on:
  <ul>
    <li><strong>samaselt tõene</strong> (tautoloogia), kui ta on igal väärtustusel tõene</li>
    <li><strong>samaselt väär</strong>, kui ta on igal väärtustusel väär</li>
    <li><strong>kehtestatav</strong>, kui ta on vähemalt ühel väärtustusel tõene</li>
  </ul>
</div>

<div class="example">
  $A \\lor \\neg A$ on samaselt tõene (välistatud kolmanda seadus).<br>
  $A \\& \\neg A$ on samaselt väär (vasturääkivus).<br>
  $A \\lor B$ ei ole samaselt tõene ega samaselt väär, kuid on kehtestatav.
</div>

<div class="theorem">
  <strong>Järeldumine.</strong> Valemitest $F_1, \\ldots, F_n$ järeldub valem $G$ (tähis $F_1, \\ldots, F_n \\models G$), kui igal väärtustusel, kus kõik $F_i$ on tõesed, on ka $G$ tõene.
  <br><br>
  Kehtib: $F_1, \\ldots, F_n \\models G$ parajasti siis, kui $F_1 \\& F_2 \\& \\cdots \\& F_n \\Rightarrow G$ on samaselt tõene.
</div>

<div class="tip">
  📝 <strong>Mine harjutama:</strong> <a href="#truthtable">Tõeväärtustabeli ehitaja</a>, kus saad ise valemit sisestada ja näha tulemust!
</div>
`,

/* ============= TRUTH TABLE ============= */
truthtable: `
<h1>Tõeväärtustabeli ehitaja</h1>
<p>Sisesta lausearvutuse valem ja näe selle tõeväärtustabelit. Lubatud tähised: muutujad <code>A-Z</code>, eitus <code>!</code> või <code>¬</code>, konjunktsioon <code>&</code> või <code>∧</code>, disjunktsioon <code>|</code> või <code>∨</code>, implikatsioon <code>-></code> või <code>⇒</code>, ekvivalents <code>&lt;-></code> või <code>⇔</code>.</p>

<div class="card">
  <div class="symbol-bar" id="symbolBar"></div>
  <div class="input-row">
    <input id="formulaInput" type="text" placeholder="Nt: A & !B -> (C | A)" autocomplete="off">
    <button class="btn" id="buildBtn">Ehita tabel</button>
    <button class="btn secondary" id="clearBtn">Tühjenda</button>
  </div>
  <div id="formulaError" style="color: var(--bad); font-size: 13px; margin-top: 4px;"></div>

  <div class="btn-row" style="margin-top: 16px;">
    <strong>Näited:</strong>
    <button class="btn small secondary" data-example="A | !A">A ∨ ¬A (taut.)</button>
    <button class="btn small secondary" data-example="A & !A">A & ¬A (vastur.)</button>
    <button class="btn small secondary" data-example="(A -> B) & A -> B">Modus ponens</button>
    <button class="btn small secondary" data-example="!(A & B) <-> (!A | !B)">De Morgan</button>
    <button class="btn small secondary" data-example="A -> B <-> !B -> !A">Kontrapositsioon</button>
    <button class="btn small secondary" data-example="(A -> B) & (B -> C) -> (A -> C)">Hüpoteetiline süllogism</button>
  </div>
</div>

<div id="ttResult"></div>
`,

/* ============= TÕESUSPUU ============= */
toesuspuu: `
<h1>Tõesuspuu meetod</h1>
<p>Tõesuspuu on süstemaatiline meetod selleks, et kontrollida, kas lausearvutuse valem on samaselt tõene, samaselt väär või kehtestatav. Meetod uurib valemi struktuuri ja võimaldab kiiremini lahenduseni jõuda kui tõeväärtustabel.</p>

<div class="card">
  <h3>Põhiidee</h3>
  <p>Eeldame, et valem on <strong>tõene</strong> (või vastavalt väär), ja püüame leida muutujate väärtustuse, mis annab selle tulemuse. Kui igas harus tekib vastuolu, järeldub, et meie eeldus oli vale.</p>
</div>

<table>
  <thead><tr><th>Ülesanne</th><th>Tõesuspuu tippu kirjutame</th><th>Järeldus, kui igas harus on vastuolu</th><th>Järeldus, kui mõnes harus pole vastuolu</th></tr></thead>
  <tbody>
    <tr>
      <td>Kas $F$ on kehtestatav?</td>
      <td>$F$</td>
      <td>$F$ ei ole kehtestatav (samaselt väär)</td>
      <td>$F$ on kehtestatav</td>
    </tr>
    <tr>
      <td>Kas $F$ on samaselt tõene?</td>
      <td>$\\neg F$</td>
      <td>$F$ on samaselt tõene</td>
      <td>$F$ ei ole samaselt tõene</td>
    </tr>
    <tr>
      <td>Kas $F$ on samaselt väär?</td>
      <td>$F$</td>
      <td>$F$ on samaselt väär</td>
      <td>$F$ ei ole samaselt väär</td>
    </tr>
  </tbody>
</table>

<h2>Lagundamisreeglid</h2>

<div class="compare">
  <div>
    <h4>α-reeglid (mõlemad harud)</h4>
    <p>$F \\& G \\Rightarrow F, G$ (mõlemad alla)</p>
    <p>$\\neg(F \\lor G) \\Rightarrow \\neg F, \\neg G$</p>
    <p>$\\neg(F \\Rightarrow G) \\Rightarrow F, \\neg G$</p>
    <p>$\\neg \\neg F \\Rightarrow F$</p>
  </div>
  <div>
    <h4>β-reeglid (hargnemine)</h4>
    <p>$F \\lor G \\Rightarrow F \\mid G$</p>
    <p>$\\neg(F \\& G) \\Rightarrow \\neg F \\mid \\neg G$</p>
    <p>$F \\Rightarrow G \\Rightarrow \\neg F \\mid G$</p>
    <p>$F \\Leftrightarrow G \\Rightarrow (F\\&G) \\mid (\\neg F \\& \\neg G)$</p>
    <p>$\\neg(F \\Leftrightarrow G) \\Rightarrow (F \\& \\neg G) \\mid (\\neg F \\& G)$</p>
  </div>
</div>

<div class="example">
  <strong>Näide.</strong> Kas $(A \\Rightarrow B) \\& A \\Rightarrow B$ on samaselt tõene?
  <ol>
    <li>Kirjutame puu juurde valemi eituse: $\\neg((A \\Rightarrow B) \\& A \\Rightarrow B)$</li>
    <li>$\\neg(F \\Rightarrow G)$ tüüpi: $(A \\Rightarrow B) \\& A$ ja $\\neg B$</li>
    <li>$\\&$-reegel: $A \\Rightarrow B$ ja $A$</li>
    <li>$\\Rightarrow$-reegel hargneb: $\\neg A$ või $B$</li>
    <li>Mõlemad harud sisaldavad vasturääkivust ($\\neg A$ vs $A$; $B$ vs $\\neg B$).</li>
    <li>Järeldus: valem on samaselt tõene. ✓</li>
  </ol>
</div>

<div class="tip">
  💡 Kui kõik harud sulguvad ($\\bot$), siis valemi eitus on samaselt väär, järelikult valem ise on samaselt tõene.
</div>

<h2>Eelised tõeväärtustabeli ees</h2>
<ul>
  <li>Kiirem suure muutujate arvuga valemite puhul ($2^n$ rida vs lineaarne lagundamine)</li>
  <li>Annab automaatselt <em>kontranäite</em>, kui valem pole samaselt tõene</li>
  <li>Üldistub predikaatarvutusele (tõesuspuu predikaatarvutuses)</li>
</ul>

<h2>Tõesuspuu predikaatarvutuses</h2>
<p>Predikaatarvutuses lisanduvad kvantorireeglid:</p>
<ul>
  <li>$\\forall x F(x) \\Rightarrow F(t)$ (suvaline term $t$, võib korrata)</li>
  <li>$\\exists x F(x) \\Rightarrow F(a)$ (uus konstant $a$)</li>
  <li>$\\neg \\forall x F(x) \\Rightarrow \\exists x \\neg F(x)$</li>
  <li>$\\neg \\exists x F(x) \\Rightarrow \\forall x \\neg F(x)$</li>
</ul>
`,

/* ============= PREDIKAADID ============= */
predikaadid: `
<h1>Predikaadid ja kvantorid</h1>

<div class="def">
  <strong>Predikaat</strong> on lause omadus või seos, mis sõltub muutujatest. Näiteks $P(x)$: „$x$ on algarv".
</div>

<p>Lausearvutuses on lihtlaused „mustad kastid" — me ei näe nende sisu. Predikaatarvutus võimaldab seda struktuuri uurida.</p>

<div class="example">
  <strong>Näide.</strong> Vaatleme lauseid:
  <ul>
    <li>„Sokrates on inimene" — predikaat $H(\\text{Sokrates})$</li>
    <li>„Kõik inimesed on surelikud" — $\\forall x(H(x) \\Rightarrow S(x))$</li>
    <li>„Leidub algarv, mis on suurem kui 100" — $\\exists x(P(x) \\& x > 100)$</li>
  </ul>
</div>

<h2>Kvantorid</h2>
<div class="def">
  <ul>
    <li><strong>Üldsuse kvantor</strong> $\\forall$ („iga", „kõik"): $\\forall x F(x)$ — iga $x$ korral kehtib $F(x)$</li>
    <li><strong>Olemasolu kvantor</strong> $\\exists$ („leidub", „mõni"): $\\exists x F(x)$ — leidub vähemalt üks $x$, mille korral kehtib $F(x)$</li>
  </ul>
</div>

<div class="example">
  <strong>Eitused.</strong>
  <ul>
    <li>$\\neg \\forall x F(x) \\equiv \\exists x \\neg F(x)$ („mitte iga $x$ rahulda $F$" $=$ „leidub $x$, mis ei rahulda")</li>
    <li>$\\neg \\exists x F(x) \\equiv \\forall x \\neg F(x)$ („ei leidu $x$, mis rahuldab" $=$ „iga $x$ ei rahulda")</li>
  </ul>
</div>

<h2>Vaba ja seotud muutuja</h2>
<div class="def">
  Muutuja esinemine on <strong>seotud</strong>, kui ta jääb kvantori järel oleva valemi sisse. Muidu on ta esinemine <strong>vaba</strong>. Valem on <strong>kinnine</strong> (s.t. <em>lause</em>), kui temas pole vabu muutujaid.
</div>

<div class="example">
  Valemis $\\forall x(P(x) \\Rightarrow Q(x, y))$:
  <ul>
    <li>$x$ on igal pool seotud kvantoriga $\\forall x$</li>
    <li>$y$ on vaba muutuja (väljapoolt $\\forall$-i ulatust)</li>
  </ul>
</div>

<h2>Kvantorite järjekord</h2>
<div class="note">
  Kvantorite järjekord on <strong>oluline</strong>! $\\forall x \\exists y \\neq \\exists y \\forall x$.
</div>
<div class="example">
  Põhihulgaks $\\mathbb{N}$:
  <ul>
    <li>$\\forall x \\exists y (y > x)$ — „iga arvu jaoks leidub temast suurem" — <span class="tag good">tõene</span></li>
    <li>$\\exists y \\forall x (y > x)$ — „leidub arv, mis on suurem kui kõik teised" — <span class="tag bad">väär</span></li>
  </ul>
</div>

<div class="card topic-tool" id="quantifierModelTool"></div>

<h2>Predikaatarvutuse süntaks</h2>
<div class="def">
  <strong>Predikaatarvutuse valem</strong> ehitatakse järgmiselt:
  <ol>
    <li>Atomaarsed valemid (predikaat, mille muutujad on termid) on valemid.</li>
    <li>Kui $F$ on valem, siis $\\neg F$ on valem.</li>
    <li>Kui $F, G$ on valemid, siis $(F\\&G), (F\\lor G), (F\\Rightarrow G), (F\\Leftrightarrow G)$ on valemid.</li>
    <li>Kui $F$ on valem ja $x$ muutuja, siis $\\forall x F$ ja $\\exists x F$ on valemid.</li>
  </ol>
</div>

<div class="tip">
  💡 <strong>Termid</strong> on muutujad, konstandid ja funktsioonisümbolite väärtused. Näiteks $x$, $0$, $f(x, y)$, $x + 3$ on termid.
</div>
`,

/* ============= SIGNATUUR ============= */
signatuur: `
<h1>Signatuur ja interpretatsioonid</h1>

<div class="def">
  <strong>Signatuur</strong> $\\sigma$ on kolmik $\\langle C; F; P \\rangle$, kus:
  <ul>
    <li>$C$ — <strong>konstantsümbolite</strong> hulk</li>
    <li>$F$ — <strong>funktsionaalsümbolite</strong> hulk (igaühele on määratud aritsus)</li>
    <li>$P$ — <strong>predikaatsümbolite</strong> hulk (igaühele on määratud aritsus; sageli sisaldab võrdust $=$)</li>
  </ul>
</div>

<div class="example">
  <strong>Peano aritmeetika signatuur:</strong> $\\sigma = \\langle 0;\\, ',\\, +,\\, \\cdot;\\, =\\rangle$
  <ul>
    <li>$0$ — konstantsümbol</li>
    <li>$'$ — ühekohaline (järgneva elemendi funktsioon)</li>
    <li>$+, \\cdot$ — kahekohalised funktsionaalsümbolid</li>
    <li>$=$ — võrduspredikaat</li>
  </ul>
</div>

<h2>Interpretatsioon</h2>
<div class="def">
  Signatuuri $\\sigma$ <strong>interpretatsioon</strong> koosneb:
  <ul>
    <li><strong>Põhihulgast</strong> $M$ (mittetühi hulk)</li>
    <li>Igale konstantsümbolile $c \\in C$ on määratud element $c^M \\in M$</li>
    <li>Igale $n$-kohalisele funktsionaalsümbolile $f \\in F$ on määratud funktsioon $f^M: M^n \\to M$</li>
    <li>Igale $n$-kohalisele predikaatsümbolile $P \\in P$ on määratud predikaat $P^M \\subseteq M^n$ (resp. funktsioon $M^n \\to \\{0,1\\}$)</li>
  </ul>
</div>

<div class="example">
  <strong>Näide (Peano standardne mudel).</strong> $\\sigma = \\langle 0; ', +, \\cdot; =\\rangle$, $M = \\mathbb{N}$:
  <ul>
    <li>$0^M = 0$, $'^M(n) = n+1$ (järgmise elemendi funktsioon)</li>
    <li>$+^M, \\cdot^M$ on tavalised liitmine ja korrutamine</li>
    <li>$=^M$ on tavaline võrdus</li>
  </ul>
</div>

<h2>Tõesus mudelil</h2>
<p>Olgu $\\mathcal{M}$ signatuuri $\\sigma$ interpretatsioon põhihulgaga $M$ ja $F$ on suletud (lause) signatuuris $\\sigma$. Defineerime $\\mathcal{M} \\models F$ („$F$ on tõene mudelil $\\mathcal{M}$"):</p>
<ul>
  <li>Atomaarne valem $P(t_1, \\ldots, t_n)$ on tõene parajasti siis, kui $(t_1^M, \\ldots, t_n^M) \\in P^M$</li>
  <li>Konnektiivid lahkkonduvad nagu lausearvutuses</li>
  <li>$\\forall x F(x)$ on tõene parajasti siis, kui iga $a \\in M$ korral on $F(a)$ tõene</li>
  <li>$\\exists x F(x)$ on tõene parajasti siis, kui leidub $a \\in M$, mille korral $F(a)$ on tõene</li>
</ul>

<h2>Valemi omadused</h2>
<div class="def">
  Valem $F$ on:
  <ul>
    <li><strong>samaselt tõene</strong>, kui ta on tõene <em>igal</em> mudelil ja muutujate väärtustusel</li>
    <li><strong>samaselt väär</strong>, kui ta on väär igal mudelil ja väärtustusel</li>
    <li><strong>kehtestatav</strong>, kui leidub mudel ja väärtustus, kus ta on tõene</li>
  </ul>
</div>

<h2>Väidete väljendamine</h2>
<p>Tüüpiline ülesanne: anda signatuur ja interpretatsioon, väljendada eestikeelne väide loogikavalemina.</p>

<div class="example">
  <strong>Põhihulk $M = \\mathbb{N}$, signatuur $\\sigma = \\langle\\,;\\, +, \\cdot;\\, =, |\\rangle$,</strong> kus $|$ on jaguvuspredikaat.
  <ul>
    <li>$x = 1$: $\\forall y(x \\cdot y = y)$</li>
    <li>$x$ on paarisarv: $\\exists y(x = y + y)$</li>
    <li>$x$ on algarv: $\\forall y(y | x \\Rightarrow (y = 1 \\lor y = x)) \\& \\neg(x = 1)$</li>
    <li>$x, y$ on ühistegurita: $\\forall z((z | x \\& z | y) \\Rightarrow z = 1)$</li>
  </ul>
</div>

<div class="tip">
  💡 Sageli on kasulik defineerida abivalem (näiteks $\\text{algarv}(x) := \\ldots$) ja seda kasutada.
</div>
`,

/* ============= SAMAVAARSUS ============= */
samavaarsus: `
<h1>Valemite samaväärsus</h1>

<div class="def">
  Lausearvutuse valemid $F$ ja $G$ on <strong>samaväärsed</strong> ($F \\equiv G$), kui nende tõeväärtused on võrdsed igal muutujate väärtustusel.
  <br><br>
  <em>Kontroll:</em> $F \\equiv G$ parajasti siis, kui $F \\Leftrightarrow G$ on samaselt tõene.
</div>

<div class="card topic-tool" id="equivalenceTool"></div>

<h2>Lausearvutuse põhisamaväärsused</h2>

<div class="eq-list">
  <div class="eq"><span class="eq-label">LS1 (idempotentsus)</span>$F\\&F \\equiv F$</div>
  <div class="eq"><span class="eq-label">LS2 (idempotentsus)</span>$F \\lor F \\equiv F$</div>
  <div class="eq"><span class="eq-label">LS3 (kommutatiivsus)</span>$F\\&G \\equiv G\\&F$</div>
  <div class="eq"><span class="eq-label">LS4 (kommutatiivsus)</span>$F \\lor G \\equiv G \\lor F$</div>
  <div class="eq"><span class="eq-label">LS5 (assotsiatiivsus)</span>$(F\\&G)\\&H \\equiv F\\&(G\\&H)$</div>
  <div class="eq"><span class="eq-label">LS6 (assotsiatiivsus)</span>$(F \\lor G) \\lor H \\equiv F \\lor (G \\lor H)$</div>
  <div class="eq"><span class="eq-label">LS7 (neeldumine)</span>$F\\&(F \\lor G) \\equiv F$</div>
  <div class="eq"><span class="eq-label">LS8 (neeldumine)</span>$F \\lor F\\&G \\equiv F$</div>
  <div class="eq"><span class="eq-label">LS9 (distributiivsus)</span>$F\\&(G \\lor H) \\equiv F\\&G \\lor F\\&H$</div>
  <div class="eq"><span class="eq-label">LS10 (distributiivsus)</span>$F \\lor G\\&H \\equiv (F \\lor G)\\&(F \\lor H)$</div>
  <div class="eq"><span class="eq-label">LS11 (De Morgan)</span>$\\neg(F\\&G) \\equiv \\neg F \\lor \\neg G$</div>
  <div class="eq"><span class="eq-label">LS12 (De Morgan)</span>$\\neg(F \\lor G) \\equiv \\neg F\\&\\neg G$</div>
  <div class="eq"><span class="eq-label">LS13 (implikatsioon)</span>$F \\Rightarrow G \\equiv \\neg(F\\&\\neg G)$</div>
  <div class="eq"><span class="eq-label">LS14 (implikatsioon)</span>$F \\Rightarrow G \\equiv \\neg F \\lor G$</div>
  <div class="eq"><span class="eq-label">LS15</span>$F\\&G \\equiv \\neg(F \\Rightarrow \\neg G)$</div>
  <div class="eq"><span class="eq-label">LS16</span>$F \\lor G \\equiv \\neg F \\Rightarrow G$</div>
  <div class="eq"><span class="eq-label">LS17 (ekvivalents)</span>$F \\Leftrightarrow G \\equiv F\\&G \\lor \\neg F\\&\\neg G$</div>
  <div class="eq"><span class="eq-label">LS18 (ekvivalents)</span>$F \\Leftrightarrow G \\equiv (F \\Rightarrow G)\\&(G \\Rightarrow F)$</div>
  <div class="eq"><span class="eq-label">LS19</span>$F\\&T \\equiv F$</div>
  <div class="eq"><span class="eq-label">LS20</span>$F \\lor T \\equiv T$</div>
  <div class="eq"><span class="eq-label">LS21</span>$F\\&V \\equiv V$</div>
  <div class="eq"><span class="eq-label">LS22</span>$F \\lor V \\equiv F$</div>
  <div class="eq"><span class="eq-label">LS23 (topelteitus)</span>$\\neg\\neg F \\equiv F$</div>
</div>

<p><em>$T$ on suvaline samaselt tõene valem, $V$ on suvaline samaselt väär valem.</em></p>

<h2>Predikaatloogika põhisamaväärsused</h2>

<h3>De Morgani seadused kvantoritele</h3>
<div class="eq-list">
  <div class="eq"><span class="eq-label">PS1</span>$\\neg \\forall x F(x) \\equiv \\exists x \\neg F(x)$</div>
  <div class="eq"><span class="eq-label">PS2</span>$\\neg \\exists x F(x) \\equiv \\forall x \\neg F(x)$</div>
</div>

<h3>Kvantorite vahetus konnektiividega</h3>
<p>Kui $x$ ei esine vabalt valemis $G$:</p>
<div class="eq-list">
  <div class="eq"><span class="eq-label">PS3</span>$\\forall x(F(x) \\& G) \\equiv \\forall x F(x) \\& G$</div>
  <div class="eq"><span class="eq-label">PS4</span>$\\forall x(F(x) \\lor G) \\equiv \\forall x F(x) \\lor G$</div>
  <div class="eq"><span class="eq-label">PS5</span>$\\exists x(F(x) \\& G) \\equiv \\exists x F(x) \\& G$</div>
  <div class="eq"><span class="eq-label">PS6</span>$\\exists x(F(x) \\lor G) \\equiv \\exists x F(x) \\lor G$</div>
</div>

<h3>Distributiivsus</h3>
<div class="eq-list">
  <div class="eq"><span class="eq-label">PS7</span>$\\forall x(F(x) \\& G(x)) \\equiv \\forall x F(x) \\& \\forall x G(x)$</div>
  <div class="eq"><span class="eq-label">PS8</span>$\\exists x(F(x) \\lor G(x)) \\equiv \\exists x F(x) \\lor \\exists x G(x)$</div>
</div>

<div class="note">
  <strong>Tähelepanu!</strong> Üldjuhul <strong>ei</strong> kehti:
  <ul>
    <li>$\\forall x(F(x) \\lor G(x)) \\not\\equiv \\forall x F(x) \\lor \\forall x G(x)$ — vaid järeldumine paremalt vasakule</li>
    <li>$\\exists x(F(x) \\& G(x)) \\not\\equiv \\exists x F(x) \\& \\exists x G(x)$ — vaid järeldumine vasakult paremale</li>
  </ul>
</div>

<h3>Kvantorite vahetatavus</h3>
<div class="eq-list">
  <div class="eq"><span class="eq-label">PS9</span>$\\forall x \\forall y F \\equiv \\forall y \\forall x F$</div>
  <div class="eq"><span class="eq-label">PS10</span>$\\exists x \\exists y F \\equiv \\exists y \\exists x F$</div>
</div>

<div class="note">
  $\\forall x \\exists y F \\not\\equiv \\exists y \\forall x F$ — üldjuhul ainult järeldumine vasakult paremale: $\\exists y \\forall x F \\models \\forall x \\exists y F$.
</div>

<h3>Implikatsioon ja kvantorid</h3>
<p>Kui $x$ ei esine vabalt valemis $G$:</p>
<div class="eq-list">
  <div class="eq"><span class="eq-label">PS11</span>$\\forall x(G \\Rightarrow F(x)) \\equiv G \\Rightarrow \\forall x F(x)$</div>
  <div class="eq"><span class="eq-label">PS12</span>$\\exists x(F(x) \\Rightarrow G) \\equiv \\forall x F(x) \\Rightarrow G$</div>
  <div class="eq"><span class="eq-label">PS13</span>$\\forall x(F(x) \\Rightarrow G) \\equiv \\exists x F(x) \\Rightarrow G$</div>
  <div class="eq"><span class="eq-label">PS14</span>$\\exists x(G \\Rightarrow F(x)) \\equiv G \\Rightarrow \\exists x F(x)$</div>
</div>
`,

/* ============= PREFIKSKUJU ============= */
prefikskuju: `
<h1>Valemi prefikskuju</h1>

<div class="def">
  Predikaatarvutuse valem on <strong>prefikskujul</strong>, kui kõik kvantorid asuvad valemi alguses ja ülejäänud osa (<strong>maatriks</strong>) ei sisalda kvantoreid.
  <br><br>
  Vorm: $Q_1 x_1 Q_2 x_2 \\ldots Q_n x_n M$, kus $Q_i \\in \\{\\forall, \\exists\\}$ ja $M$ on kvantorivaba.
</div>

<h2>Teisendamise algoritm</h2>
<ol class="steps">
  <li><strong>Elimineerime $\\Leftrightarrow$:</strong> $F \\Leftrightarrow G \\equiv (F \\Rightarrow G) \\& (G \\Rightarrow F)$</li>
  <li><strong>Elimineerime $\\Rightarrow$:</strong> $F \\Rightarrow G \\equiv \\neg F \\lor G$ (valikuline)</li>
  <li><strong>Viime eitused atomaarsete valemite ette</strong> — kasutame De Morgani seadusi:
    <ul>
      <li>$\\neg(F\\&G) \\equiv \\neg F \\lor \\neg G$, $\\neg(F\\lor G) \\equiv \\neg F \\& \\neg G$</li>
      <li>$\\neg \\forall x F \\equiv \\exists x \\neg F$, $\\neg \\exists x F \\equiv \\forall x \\neg F$</li>
      <li>$\\neg \\neg F \\equiv F$</li>
    </ul>
  </li>
  <li><strong>Nimetame ümber seotud muutujad,</strong> et iga kvantor kasutaks unikaalset muutujanime.</li>
  <li><strong>Toome kvantorid välja</strong> — kasutame PS3–PS6, PS11–PS14.</li>
</ol>

<div class="example">
  <strong>Näide.</strong> Teisendame $\\neg \\exists y(\\exists x P(x) \\Rightarrow (Q(y) \\Rightarrow \\forall x R(x)))$ prefikskujule.
  <ol>
    <li>Eemaldame implikatsioonid (kasutame $A \\Rightarrow B \\equiv \\neg A \\lor B$):<br>$\\neg \\exists y(\\neg \\exists x P(x) \\lor (\\neg Q(y) \\lor \\forall x R(x)))$</li>
    <li>Viime eituse sisse: $\\neg \\exists y \\to \\forall y \\neg$:<br>$\\forall y \\neg(\\neg \\exists x P(x) \\lor (\\neg Q(y) \\lor \\forall x R(x)))$</li>
    <li>De Morgan: $\\neg(A \\lor B) \\equiv \\neg A \\& \\neg B$:<br>$\\forall y(\\exists x P(x) \\& \\neg(\\neg Q(y) \\lor \\forall x R(x)))$</li>
    <li>Veel De Morgan:<br>$\\forall y(\\exists x P(x) \\& (Q(y) \\& \\neg \\forall x R(x)))$</li>
    <li>$\\neg \\forall x R(x) \\to \\exists x \\neg R(x)$:<br>$\\forall y(\\exists x P(x) \\& (Q(y) \\& \\exists x \\neg R(x)))$</li>
    <li>Nimetame muutujad ümber, et vältida kollisioone:<br>$\\forall y(\\exists x_1 P(x_1) \\& (Q(y) \\& \\exists x_2 \\neg R(x_2)))$</li>
    <li>Toome kvantorid välja:<br>$\\forall y \\exists x_1 \\exists x_2 (P(x_1) \\& Q(y) \\& \\neg R(x_2))$</li>
  </ol>
</div>

<div class="tip">
  💡 Tüüpiline kontrolltöö ülesanne: teisenda valem prefikskujule, kus eitused on ainult atomaarsete valemite ees ja valem ei sisalda implikatsiooni. Vaata <a href="#kontrolltood">vanu kontrolltöid</a>.
</div>

<h2>Interaktiivne harjutus</h2>
<div class="card">
  <p>Vali valem ja teisenda samm-sammult prefikskujule.</p>
  <div id="prefixWidget"></div>
</div>
`,

/* ============= AKSIOMAATIKA ============= */
aksiomaatika: `
<h1>Aksiomaatilised teooriad</h1>

<div class="def">
  <strong>Aksiomaatiline teooria</strong> koosneb:
  <ul>
    <li><strong>Tähestikust</strong> (sümbolid)</li>
    <li><strong>Süntaksist</strong> (valemite moodustamise reeglid)</li>
    <li><strong>Aksioomidest</strong> (eelduste hulk)</li>
    <li><strong>Tuletusreeglitest</strong> (kuidas teoreeme aksioomidest tuletada)</li>
  </ul>
</div>

<h2>Olulised mõisted</h2>
<div class="def">
  <ul>
    <li>Valem $F$ on <strong>teoreem</strong> (tähistus $\\vdash F$), kui ta saadakse aksioomidest tuletusreeglite abil.</li>
    <li>Teooria on <strong>korrektne</strong> ehk <strong>kõlbulik</strong>, kui iga teoreem on semantiliselt tõene.</li>
    <li>Teooria on <strong>täielik</strong>, kui iga semantiliselt tõene valem on teoreem.</li>
    <li>Teooria on <strong>mittevasturääkiv</strong>, kui ei leidu valemit $F$, mille korral nii $F$ kui $\\neg F$ oleksid teoreemid.</li>
  </ul>
</div>

<h2>Hilberti programm</h2>
<p>David Hilberti idee: kogu matemaatika saab redutseeruda aksioomide ja tuletusreeglite süsteemiks. <strong>Gödeli mittetäielikkuse teoreem</strong> (1931) näitas, et iga piisavalt rikas mittevasturääkiv süsteem on mittetäielik.</p>

<h2>Aksiomaatilised teooriad selles kursuses</h2>
<ul>
  <li><a href="#sekvents">Sekventsiaalne lausearvutus</a> — täielik ja korrektne lausearvutuse jaoks</li>
  <li><a href="#peano">Peano aritmeetika</a> — naturaalarvude aksiomaatiline teooria</li>
</ul>
`,

/* ============= SEKVENTS ============= */
sekvents: `
<h1>Sekventsiaalne lausearvutus</h1>

<div class="def">
  <strong>Sekvents</strong> on avaldis kujul $\\Gamma \\vdash F$, kus $\\Gamma$ on lõplik valemite hulk (võibolla tühi) ja $F$ on valem. Loeme: „valemite hulgast $\\Gamma$ on tuletatav valem $F$".
</div>

<h2>Tuletusreeglid</h2>

<h3>Aksioom</h3>
<div class="formula">$\\Gamma, F \\vdash F$</div>
<p>(igal valemil on triviaalne tuletus iseendast)</p>

<h3>Reeglid konnektiivide jaoks</h3>

<div class="compare">
  <div>
    <h4>Konjunktsioon</h4>
    <div class="formula">
      $(\\vdash \\&)$: $\\dfrac{\\Gamma \\vdash F \\quad \\Gamma \\vdash G}{\\Gamma \\vdash F \\& G}$
    </div>
    <div class="formula">
      $(\\& \\vdash)$: $\\dfrac{\\Gamma, F, G \\vdash H}{\\Gamma, F \\& G \\vdash H}$
    </div>
  </div>
  <div>
    <h4>Disjunktsioon</h4>
    <div class="formula">
      $(\\vdash \\lor)_1$: $\\dfrac{\\Gamma \\vdash F}{\\Gamma \\vdash F \\lor G}$
    </div>
    <div class="formula">
      $(\\vdash \\lor)_2$: $\\dfrac{\\Gamma \\vdash G}{\\Gamma \\vdash F \\lor G}$
    </div>
    <div class="formula">
      $(\\lor \\vdash)$: $\\dfrac{\\Gamma, F \\vdash H \\quad \\Gamma, G \\vdash H}{\\Gamma, F \\lor G \\vdash H}$
    </div>
  </div>
</div>

<div class="compare">
  <div>
    <h4>Implikatsioon</h4>
    <div class="formula">
      $(\\vdash \\Rightarrow)$: $\\dfrac{\\Gamma, F \\vdash G}{\\Gamma \\vdash F \\Rightarrow G}$
    </div>
    <div class="formula">
      $(\\Rightarrow \\vdash)$: $\\dfrac{\\Gamma \\vdash F \\quad \\Gamma \\vdash F \\Rightarrow G}{\\Gamma \\vdash G}$
    </div>
  </div>
  <div>
    <h4>Eitus</h4>
    <div class="formula">
      $(\\vdash \\neg)$: $\\dfrac{\\Gamma, F \\vdash G \\quad \\Gamma, F \\vdash \\neg G}{\\Gamma \\vdash \\neg F}$
    </div>
    <div class="formula">
      $(\\vdash \\sim)$: $\\dfrac{\\Gamma \\vdash \\neg \\neg F}{\\Gamma \\vdash F}$
    </div>
  </div>
</div>

<h3>Struktuurireeglid</h3>
<div class="compare">
  <div>
    <h4>$(S+)$ — nõrgendamine</h4>
    <div class="formula">$\\dfrac{\\Gamma \\vdash F}{\\Gamma, G \\vdash F}$</div>
  </div>
  <div>
    <h4>$(S\\sim)$ — vahetus</h4>
    <div class="formula">$\\dfrac{\\Gamma, \\Delta, F \\vdash G}{\\Gamma, F, \\Delta \\vdash G}$</div>
  </div>
</div>

<h2>Korrektsuse ja täielikkuse teoreemid</h2>
<div class="theorem">
  <strong>Korrektsuse teoreem.</strong> Kui sekvents $F_1, \\ldots, F_n \\vdash G$ on tuletatav sekventsiaalses lausearvutuses, siis $F_1, \\ldots, F_n \\models G$.
</div>
<div class="theorem">
  <strong>Täielikkuse teoreem.</strong> Kui $F_1, \\ldots, F_n \\models G$, siis sekvents $F_1, \\ldots, F_n \\vdash G$ on tuletatav sekventsiaalses lausearvutuses.
</div>

<h2>Näide: tuletame $\\neg(P \\Rightarrow Q) \\vdash P\\&\\neg Q$</h2>

<div class="card">
<ol class="steps">
  <li>$P \\vdash P$ (aksioom)</li>
  <li>$P, P \\Rightarrow Q \\vdash Q$ ($(\\Rightarrow \\vdash)$ rakendades aksioomidele)</li>
  <li>Püüame näidata, et $\\neg(P \\Rightarrow Q) \\vdash P$:
    <ul>
      <li>Eeldame vastuväiteliselt $\\neg P$, näitame, et siis $P \\Rightarrow Q$ tuletatav (sest $\\neg P, P \\vdash Q$ — vasturääkivusest järeldub kõik).</li>
      <li>Saame vastuolu eeldusega $\\neg(P \\Rightarrow Q)$.</li>
    </ul>
  </li>
  <li>Analoogiliselt: $\\neg(P \\Rightarrow Q) \\vdash \\neg Q$.</li>
  <li>$(\\vdash \\&)$ abil saame $\\neg(P \\Rightarrow Q) \\vdash P\\&\\neg Q$. ✓</li>
</ol>
</div>

<div class="tip">
  📝 Vanades kontrolltöödes on tüüpilised tuletused: $P \\Rightarrow Q \\vdash \\neg Q \\Rightarrow \\neg P$, $(P \\lor Q) \\& R \\vdash (P\\&R) \\lor (Q\\&R)$, $A \\Rightarrow B, \\neg A \\Rightarrow B \\vdash B$.
</div>

<h2>Sekventsiaalne predikaatarvutus</h2>
<p>Lausearvutuse reeglitele lisanduvad kvantorireeglid:</p>
<div class="formula">
  $(\\vdash \\forall)^*$: $\\dfrac{\\Gamma \\vdash F(x)}{\\Gamma \\vdash \\forall x F(x)}$
  &nbsp;&nbsp;
  $(\\forall \\vdash)$: $\\dfrac{\\Gamma, F(t) \\vdash G}{\\Gamma, \\forall x F(x) \\vdash G}$
</div>
<div class="formula">
  $(\\vdash \\exists)$: $\\dfrac{\\Gamma \\vdash F(t)}{\\Gamma \\vdash \\exists x F(x)}$
  &nbsp;&nbsp;
  $(\\exists \\vdash)^*$: $\\dfrac{\\Gamma, F(x) \\vdash G}{\\Gamma, \\exists x F(x) \\vdash G}$
</div>
<p><em>$^*$ tähistatud reeglites ei tohi muutuja $x$ esineda vabalt sekventsi üheski teises valemis. $t$ on suvaline term.</em></p>
`,

/* ============= PEANO ============= */
peano: `
<h1>Peano aritmeetika</h1>

<p>Naturaalarvude aksiomaatiline teooria, mille kirjeldas itaalia matemaatik Giuseppe Peano 1888. aastal.</p>

<div class="def">
  <strong>Signatuur:</strong> $\\sigma = \\langle 0; ', +, \\cdot; =\\rangle$
  <ul>
    <li>$0$ — konstantsümbol (number null)</li>
    <li>$'$ — ühekohaline funktsionaalsümbol (järgneva elemendi leidmine, $x'$ tähendab „$x$ järglane"; ka $x+1$)</li>
    <li>$+, \\cdot$ — kahekohalised funktsionaalsümbolid (liitmine, korrutamine)</li>
    <li>$=$ — võrduspredikaat</li>
  </ul>
</div>

<h2>Peano aksioomid</h2>

<div class="card">
  <p><strong>P1.</strong> $\\forall x \\neg(x' = 0)$ — null ei ole ühegi naturaalarvu järglane</p>
  <p><strong>P2.</strong> $\\forall x \\forall y(x' = y' \\Rightarrow x = y)$ — järglase funktsioon on injektiivne</p>
  <p><strong>P3.</strong> $\\forall x(x + 0 = x)$ — liitmise neutraalne element</p>
  <p><strong>P4.</strong> $\\forall x \\forall y(x + y' = (x+y)')$ — liitmise rekursiivne definitsioon</p>
  <p><strong>P5.</strong> $\\forall x(x \\cdot 0 = 0)$ — korrutamise null</p>
  <p><strong>P6.</strong> $\\forall x \\forall y(x \\cdot y' = x \\cdot y + x)$ — korrutamise rekursiivne definitsioon</p>
  <p><strong>P7 (induktsiooniaksioom).</strong> Iga signatuuri $\\sigma$ valemi $F(x)$ jaoks:
    $$F(0) \\& \\forall x(F(x) \\Rightarrow F(x')) \\Rightarrow \\forall x F(x)$$
  </p>
</div>

<div class="note">
  Aksioomide kirjapanekul kasutame tavalist matemaatika notatsiooni: $x \\cdot y$ tähistame ka $xy$, ja $x = y$ on lugemise sümbol — formaalselt on tegu predikaadiga $=(x, y)$.
</div>

<h2>Standardne mudel</h2>
<p>Peano aksioomide standardne mudel on hulk $\\mathbb{N} = \\{0, 1, 2, \\ldots\\}$, kus:</p>
<ul>
  <li>$0^M = 0$</li>
  <li>$'^M(n) = n + 1$</li>
  <li>$+^M, \\cdot^M$ on tavalised tehted</li>
  <li>$=^M$ on tavaline võrdus</li>
</ul>

<div class="note">
  Peano aksioomidel on ka <strong>mittestandardseid mudeleid</strong>, mille konstruktsioonid on keerukad ja kursuses neid ei käsitleta.
</div>

<h2>Induktsioon</h2>
<div class="def">
  Induktsiooniaksioomi P7 tõttu, kui tahame näidata, et $\\forall x F(x)$ kehtib, piisab veenduda:
  <ol>
    <li><strong>Induktsioonibaas:</strong> $F(0)$ on tõene</li>
    <li><strong>Induktsioonisamm:</strong> $\\forall x(F(x) \\Rightarrow F(x'))$ on tõene</li>
  </ol>
</div>

<h2>Tõestus: $\\forall x(0 + x = x)$</h2>
<div class="card">
  <p><strong>Tõestame induktsiooniga $x$ järgi.</strong></p>

  <p><em>Alus.</em> Vaja näidata, et $0 + 0 = 0$.<br>
  Aksioomi P3 põhjal $x + 0 = x$. Asendades $x := 0$, saame $0 + 0 = 0$. ✓</p>

  <p><em>Samm.</em> Vaja näidata, et $\\forall x(0 + x = x \\Rightarrow 0 + x' = x')$.<br>
  Olgu $a$ suvaline ja eeldame, et $0 + a = a$. Peame näitama, et $0 + a' = a'$.<br>
  $0 + a' = (0 + a)'$ (aksioomi P4 põhjal) $= a'$ (eelduse ja võrduse omaduste põhjal). ✓</p>

  <p>Aksioomi P7 põhjal $\\forall x(0 + x = x)$. $\\square$</p>
</div>

<h2>Tüüpilised teoreemid Peano aritmeetikas</h2>
<ul>
  <li>$\\forall x(0 + x = x)$ — nulli kommutatiivsus</li>
  <li>$\\forall x \\forall y \\forall z((x+y) + z = x + (y+z))$ — assotsiatiivsus</li>
  <li>$\\forall x \\forall y(x + y = y + x)$ — kommutatiivsus</li>
  <li>$\\forall x(0 \\cdot x = 0)$</li>
  <li>$\\forall x \\forall y \\forall z(x \\cdot (y + z) = x \\cdot y + x \\cdot z)$ — distributiivsus</li>
  <li>$\\forall x \\forall y \\forall z((xy)z = x(yz))$ — korrutamise assotsiatiivsus</li>
  <li>$\\forall x \\forall y(xy = yx)$ — korrutamise kommutatiivsus</li>
</ul>

<h2>Konkreetsete väärtuste väljendamine</h2>
<p>Naturaalarvud Peano signatuuris:</p>
<ul>
  <li>$1 = 0'$</li>
  <li>$2 = 0''$</li>
  <li>$3 = 0'''$</li>
  <li>$n = 0^{\\underbrace{''\\cdots'}_{n}}$</li>
</ul>

<div class="example">
  <strong>Näide.</strong> Väljendame $2 \\cdot 3 + 1 = 7$ Peano signatuuris:
  $$0'' \\cdot 0''' + 0' = 0'''''''$$
</div>

<div class="tip">
  📝 Tüüpilised kontrolltöö ülesanded:
  <ul>
    <li>Esita Peano aritmeetika signatuur ja 3–4 aksioomi</li>
    <li>Tõesta lähtudes ainult aksioomidest, et $\\forall x(0 \\cdot x = 0)$ või sarnane väide</li>
    <li>Väljenda Peano signatuuris konkreetne võrdus, näiteks $3 \\cdot 2 + 1 = 7$</li>
  </ul>
</div>
`,

/* ============= GRAAFID ============= */
graafid: `
<h1>Graafi mõiste</h1>

<div class="def">
  <strong>Graaf</strong> on järjestatud paar $G = (V, E)$, kus:
  <ul>
    <li>$V$ on mittetühi hulk — <strong>tippude hulk</strong></li>
    <li>$E$ on hulk, mille elemendid on $V$ kaheelemendilised alamhulgad — <strong>servade hulk</strong></li>
  </ul>
  Naabertipud on tipud, mis on ühendatud servaga. Naaberservad on servad, millel on ühine otstipp.
</div>

<div class="example">
  Graaf tippudega $V = \\{u, v, w, x, y, z\\}$ ja servadega $E = \\{uv, uy, vw, vz, wy, xy, yz\\}$.
  Tipud $u$ ja $y$ on naabertipud, kuid $u$ ja $z$ ei ole.
</div>

<h2>Põhilised graafitüübid</h2>

<div class="def">
  <strong>Täisgraaf</strong> $K_n$ — $n$-tipuline graaf, mille iga kahe tipu vahel on serv. Servade arv: $\\binom{n}{2} = \\frac{n(n-1)}{2}$.
</div>

<div class="def">
  <strong>Nullgraaf</strong> $O_n$ — $n$-tipuline graaf, milles pole ühtegi serva.
</div>

<div class="def">
  <strong>Täiendgraaf</strong> $\\overline{G}$ — graafil $G$ on $V$ samaks, kuid servaga ühendatud parajasti need tipud, mis polnud $G$-s ühendatud. Kehtib: $\\overline{K_n} = O_n$ ja $\\overline{O_n} = K_n$.
</div>

<h2>Esituste viisid</h2>

<h3>Naabrusmaatriks</h3>
<div class="def">
  $n \\times n$-maatriks $A = (a_{ij})$, kus
  $$a_{ij} = \\begin{cases} 1, & \\text{kui } v_i v_j \\in E \\\\ 0, & \\text{muidu} \\end{cases}$$
</div>
<p>Suunamata graafi naabrusmaatriks on alati sümmeetriline ja peadiagonaal koosneb nullidest (eeldades, et silmused puuduvad).</p>

<h3>Intsidentsusmaatriks</h3>
<div class="def">
  $n \\times m$-maatriks $B = (b_{ij})$, kus
  $$b_{ij} = \\begin{cases} 1, & \\text{kui } v_i \\text{ on serva } e_j \\text{ otstipp} \\\\ 0, & \\text{muidu} \\end{cases}$$
</div>
<p>Iga veerg sisaldab täpselt kaks ühte (serval on kaks otstippu).</p>

<h2>Graafioperatsioonid</h2>
<ul>
  <li>Serva kustutamine</li>
  <li>Serva lisamine kahe seniühendamata tipu vahele</li>
  <li>Tipu kustutamine koos kõigi temaga intsidentsete servadega</li>
  <li>Tipu lisamine koos servadega uue tipu ja teatava hulga seniste tippude vahele</li>
</ul>

<div class="def">
  <strong>Alamgraaf.</strong> Graaf $G' = (V', E')$ on graafi $G = (V, E)$ alamgraaf, kui $V' \\subseteq V$ ja $E' \\subseteq E$.
</div>

<div class="tip">
  💡 <strong>Mängi graafidega:</strong> <a href="#grapheditor">Graafiredaktoris</a> saad ise tippe ja servi joonistada, vaadata naabrusmaatriksit ja tipuastmeid.
</div>
`,

/* ============= TIPUASTMED ============= */
tipuastmed: `
<h1>Tipuastmed</h1>

<div class="def">
  Graafi tipu $v$ <strong>astmeks ehk valentsiks</strong> $d(v)$ nimetatakse selle tipuga intsidentsete servade arvu.
  <br><br>
  Kui graafis on $n$ tippu, siis iga tipu $v$ korral $d(v) \\in \\{0, 1, \\ldots, n-1\\}$.
</div>

<div class="def">
  <ul>
    <li><strong>Isoleeritud tipp</strong> — tipp, mille aste on 0</li>
    <li><strong>Rippuv tipp ehk leht</strong> — tipp, mille aste on 1</li>
  </ul>
</div>

<h2>Tipuastmete teoreem</h2>
<div class="theorem">
  Igas graafis on kõigi tippude astmete summa võrdne servade arvu kahekordsega:
  $$\\sum_{v \\in V} d(v) = 2 |E|$$
</div>
<p><strong>Tõestus.</strong> Iga serv aitab kaasa kahe tipu astmesse — ühele kummalegi otstipule. Seega kogusumma on $2|E|$. $\\square$</p>

<h2>Paaritu astmega tipud</h2>
<div class="theorem">
  Igas graafis on paaritu astmega tippe paarisarv.
</div>
<p><strong>Tõestus.</strong> Paaritu astmega tippude astmete summa peab olema paaris (kuna kogusumma on paaris). Paarituid arve liites saame paarisarvu ainult juhul, kui neid on paarisarv. $\\square$</p>

<h2>Regulaarne graaf</h2>
<div class="def">
  <strong>$k$-regulaarne graaf</strong> — graaf, mille iga tipu aste on $k$.
</div>
<p>$n$-tipulise $k$-regulaarse graafi servade arv on $\\frac{nk}{2}$.</p>

<div class="example">
  <ul>
    <li>$K_n$ on $(n-1)$-regulaarne</li>
    <li>$O_n$ on $0$-regulaarne</li>
    <li>Tsükkel $C_n$ on $2$-regulaarne</li>
  </ul>
</div>

<div class="note">
  Kas leidub 5-tipuline 3-regulaarne graaf? <strong>Ei!</strong> Servade arv oleks $\\frac{5 \\cdot 3}{2} = 7{,}5$, mis pole täisarv.
</div>

<h2>Tipuastmete järjend</h2>
<div class="def">
  $n$-tipulise graafi <strong>tipuastmete järjend</strong> on $n$-korteež $(d(v_1), d(v_2), \\ldots, d(v_n))$. Üldjuhul järjestatakse mittekahanevalt või mittekasvavalt.
</div>

<h3>Havel–Hakimi teoreem</h3>
<div class="theorem">
  Naturaalarvude mittekasvav järjend $d_1, d_2, \\ldots, d_n$ ($n \\geq 2$) on mingi graafi tipuastmete järjendiks parajasti siis, kui järjend
  $$d_2 - 1, d_3 - 1, \\ldots, d_{d_1+1} - 1, d_{d_1+2}, \\ldots, d_n$$
  on mingi graafi tipuastmete järjendiks.
</div>

<p>See annab algoritmi: vaata, kas etteantud järjendile vastab graaf — võta suurim arv, lahuta selle järgmistest järjendi elementidest ühe ja korda.</p>

<div class="example">
  Kas $(4, 3, 3, 2, 2, 1, 1)$ on tipuastmete järjend?
  <ol>
    <li>$(3, 3, 2, 2, 1, 1) \\to (2, 1, 1, 0, 1)$ — sorteerime: $(2, 1, 1, 1, 0)$</li>
    <li>$(2, 1, 1, 1, 0) \\to (0, 0, 1, 0)$ — sorteerime: $(1, 0, 0, 0)$</li>
    <li>$(1, 0, 0, 0) \\to (0, 0, 0) = $ graafi $O_3$ astmed ✓</li>
  </ol>
  Jah, järjend vastab graafile.
</div>

<div class="card topic-tool" id="degreeSequenceTool"></div>
`,

/* ============= AHELAD ============= */
ahelad: `
<h1>Ahelad ja tsüklid</h1>

<div class="def">
  <strong>Ahel</strong> graafis on tippude ja servade vahelduv järjend
  $$v_0, e_1, v_1, e_2, \\ldots, v_{k-1}, e_k, v_k$$
  kus $e_i = v_{i-1} v_i$ on serv ja iga kaks järjestikust tippu on ühendatud servaga.
  <br><br>
  <strong>Ahela pikkus</strong> = servade arv ahelas (mitte tippude arv!).
</div>

<div class="def">
  <strong>Lihtahel</strong> — ahel, mille kõik tipud on erinevad.
</div>

<div class="def">
  <strong>Kinnine ahel</strong> — ahel, mille esimene ja viimane tipp langevad kokku.
  <br><br>
  <strong>Tsükkel</strong> — kinnine ahel, milles on vähemalt 3 serva ja mis ei läbi ühtegi tippu mitu korda.
</div>

<h2>Tippude vaheline kaugus</h2>
<div class="def">
  Tippude $u, v$ ($u \\neq v$) <strong>vaheline kaugus</strong> $d(u, v)$ on miinimum nende tippude vaheliste lihtahelate pikkustest. Kui ahelaid ei leidu, siis $d(u,v) = \\infty$.
</div>

<h2>Ahelate ja lihtahelate seos</h2>
<div class="theorem">
  Kui graafis leidub ahel tippudest $u$ tippu $v$, siis leidub ka <strong>lihtahel</strong> $u$-st $v$-sse.
</div>
<p><strong>Tõestus.</strong> Eemaldades ahelast kõigi korduvate tippude vahelised lõigud, saame lihtahela. $\\square$</p>

<h2>Tsüklite leidumise tingimused</h2>
<div class="theorem">
  Olgu $G$ graaf, mille iga tipu aste on vähemalt $l \\geq 2$. Siis $G$ sisaldab:
  <ol>
    <li>lihtahela, mille pikkus on vähemalt $l$,</li>
    <li>tsükli, mille pikkus on vähemalt $l + 1$.</li>
  </ol>
</div>

<div class="theorem">
  Kui graafis on servi vähemalt sama palju kui tippe, siis selles graafis leidub tsükkel.
</div>
`,

/* ============= SIDUSUS ============= */
sidusus: `
<h1>Sidusus</h1>

<div class="def">
  Graaf on <strong>sidus</strong>, kui tema iga kahe tipu vahel leidub ahel.
  <br><br>
  <em>Ühetipulist graafi loetakse sidusaks.</em>
</div>

<div class="def">
  Graafi <strong>sidususkomponendid</strong> on selle graafi maksimaalsed sidusad alamgraafid (s.t. sidusad alamgraafid, mida ei saa enam laiendada).
</div>

<p>Graaf on sidus parajasti siis, kui tal on ainult üks sidususkomponent.</p>

<h2>Sild ja eraldav tipp</h2>

<div class="def">
  Graafi serv on <strong>sild</strong>, kui tema eemaldamisel graafist sidususkomponentide arv suureneb.
</div>

<div class="def">
  Tipp $u$ on <strong>eraldav tipp</strong>, kui tipu ja temaga intsidentsete servade eemaldamisel sidususkomponentide arv suureneb.
</div>

<div class="theorem">
  Graafi serv on sild parajasti siis, kui ta ei kuulu ühessegi tsüklisse.
</div>

<h2>Sidususe võrratused</h2>
<div class="theorem">
  Kui $n$-tipulisel graafil on $m$ serva ja $k$ sidususkomponenti, siis
  $$n - k \\leq m \\leq \\frac{(n-k)(n-k+1)}{2}$$
</div>

<div class="theorem">
  Kui $n$-tipulisel graafil on rohkem kui $\\binom{n-1}{2}$ serva, siis ta on sidus.
</div>

<h2>Tugev sidusus (suunatud graafides)</h2>
<div class="def">
  Suunatud graaf on <strong>tugevalt sidus</strong>, kui iga kahe tipu $u, v$ korral leidub suunatud ahel nii $u$-st $v$-sse kui ka $v$-st $u$-sse.
</div>

<div class="def">
  Suunatud graaf on <strong>nõrgalt sidus</strong>, kui selle aluseks olev suunamata graaf on sidus.
</div>
`,

/* ============= ISOMORFISM ============= */
isomorfism: `
<h1>Graafide isomorfism</h1>

<div class="def">
  Graafid $G_1 = (V_1, E_1)$ ja $G_2 = (V_2, E_2)$ on <strong>isomorfsed</strong> ($G_1 \\cong G_2$), kui leidub bijektsioon $\\varphi: V_1 \\to V_2$ nii, et iga $u, v \\in V_1$ korral:
  $$uv \\in E_1 \\iff \\varphi(u)\\varphi(v) \\in E_2$$
  Sellist bijektsiooni $\\varphi$ nimetatakse <strong>isomorfismiks</strong>.
</div>

<p>Isomorfsed graafid on „sama" graafid — erinevad ainult tippude nimedega.</p>

<h2>Isomorfismi vajalikud tingimused</h2>
<p>Kui $G_1 \\cong G_2$, siis:</p>
<ul>
  <li>$|V_1| = |V_2|$ (sama arv tippe)</li>
  <li>$|E_1| = |E_2|$ (sama arv servi)</li>
  <li>Sama tipuastmete järjend</li>
  <li>Sama arv sidususkomponente</li>
  <li>Sama arv $k$-tsükleid iga $k$ jaoks</li>
  <li>Sama arv eraldavaid tippe ja sildu</li>
</ul>

<div class="note">
  Need on <strong>tarvilikud</strong> tingimused, kuid mitte piisavad. Kahe graafi puhul samade tipuastmete järjenditega ei pruugi olla isomorfsed!
</div>

<h2>Isomorfismi näitamine</h2>
<p><strong>Strateegia:</strong> leia konkreetne bijektsioon ja tõesta, et see säilitab servad.</p>

<h2>Mitteisomorfsuse näitamine</h2>
<p><strong>Strateegia:</strong> leia <em>isomorfsuse invariant</em>, mis erineb. Näiteks:</p>
<ul>
  <li>Erinev tipuastmete järjend</li>
  <li>Erinev arv tsükleid mingi pikkusega</li>
  <li>Üks graaf on sidus, teine mitte</li>
  <li>Üks graaf sisaldab konkreetset alamgraafi (nt $K_3$), teine ei sisalda</li>
</ul>

<div class="example">
  Graafid:
  <ul>
    <li>$G_1$: tee (path) $P_4$ — 4 tipuga, astmed $(1, 2, 2, 1)$</li>
    <li>$G_2$: täht $K_{1,3}$ — 4 tipuga, astmed $(3, 1, 1, 1)$</li>
  </ul>
  Tipuastmete järjendid erinevad, seega graafid ei ole isomorfsed.
</div>
`,

/* ============= EULER HAMILTON ============= */
eulerhamilton: `
<h1>Euleri ja Hamiltoni graafid</h1>

<h2>Euleri ahel</h2>
<div class="def">
  <strong>Euleri ahel</strong> — ahel, mis sisaldab graafi <em>iga serva täpselt ühe korra</em>.
  <br>
  <strong>Kinnine Euleri ahel</strong> — Euleri ahel, mille esimene ja viimane tipp langevad kokku.
</div>

<div class="def">
  <strong>Euleri graaf</strong> — sidus graaf, milles leidub kinnine Euleri ahel.
</div>

<h2>Euleri teoreem</h2>
<div class="theorem">
  <strong>Euleri teoreem (1736).</strong> Graaf on Euleri graaf parajasti siis, kui ta on sidus ja tema iga tipu aste on paarisarv.
</div>

<div class="theorem">
  Sidusas graafis leidub Euleri ahel (mitte tingimata kinnine) parajasti siis, kui paaritu astmega tippe on täpselt 0 või 2.
</div>

<div class="example">
  <strong>Königsbergi sildade probleem.</strong> Kas saab teha jalutuskäigu, ületades igat silda täpselt üks kord?
  Vastav graaf (multigraaf) on Königsbergi linna kaardi mudel — kaldad ja saared on tipud, sillad on servad. Kõigi tippude astmed on paaritud (3, 3, 3, 5), seega kinnist Euleri ahelat ei leidu. Euler andis sellega probleemile <span class="tag bad">eitava</span> vastuse.
</div>

<div class="example">
  Täisgraaf $K_n$ on Euleri graaf parajasti siis, kui $n$ on paaritu.
</div>

<h2>Hamiltoni tsükkel</h2>
<div class="def">
  <strong>Hamiltoni tsükkel</strong> — tsükkel, mis läbib graafi <em>iga tippu täpselt ühe korra</em>.
  <br>
  <strong>Hamiltoni graaf</strong> — graaf, milles leidub Hamiltoni tsükkel.
</div>

<div class="note">
  Erinevus Eulerist: Euler — iga <em>serv</em> üks kord; Hamilton — iga <em>tipp</em> üks kord.
</div>

<h2>Diraci teoreem</h2>
<div class="theorem">
  <strong>Diraci teoreem.</strong> Olgu $G$ $n$-tipuline graaf, $n \\geq 3$, ja iga tipu aste vähemalt $\\frac{n}{2}$. Siis $G$ on Hamiltoni graaf.
</div>

<div class="note">
  See on <strong>piisav</strong>, kuid mitte tarvilik tingimus. On Hamiltoni graafe, kus tipuastmed on väiksemad kui $n/2$.
</div>

<h2>Ore teoreem</h2>
<div class="theorem">
  <strong>Ore teoreem.</strong> Olgu $G$ $n$-tipuline graaf, $n \\geq 3$. Kui iga kahe mitteühenduva tipu $u, v$ korral $d(u) + d(v) \\geq n$, siis $G$ on Hamiltoni graaf.
</div>

<div class="card topic-tool" id="eulerHamiltonTool"></div>

<h2>Rändkaupmehe ülesanne</h2>
<p>Kaalutud graafis leida Hamiltoni tsükkel, mille servade kaalude summa on vähim. <strong>NP-raske</strong> probleem.</p>
`,

/* ============= PUUD ============= */
puud: `
<h1>Puud</h1>

<div class="def">
  Graafi nimetatakse <strong>puuks</strong>, kui ta on sidus ja ei sisalda tsükleid.
</div>

<div class="def">
  <strong>Mets</strong> — graaf, mille kõik sidususkomponendid on puud.
</div>

<div class="def">
  Puu <strong>rippuvaid tippe</strong> (astmega 1) nimetatakse <strong>lehtedeks</strong>.<br>
  Mitterippuvaid tippe nimetatakse <strong>sisetippudeks</strong>.
</div>

<h2>Puude põhiomadused</h2>

<div class="theorem">
  Vähemalt kahetipulisel puul on vähemalt kaks lehte.
</div>

<div class="theorem">
  <strong>Põhiomadus.</strong> Iga $n$-tipulisel puul on täpselt $n - 1$ serva.
</div>

<div class="theorem">
  <strong>Karakteriseeringud.</strong> Olgu $G$ $n$-tipuline graaf. Järgmised tingimused on samaväärsed:
  <ol>
    <li>$G$ on puu (sidus ja tsükleid pole)</li>
    <li>$G$ on sidus ja sellel on $n-1$ serva</li>
    <li>$G$-l pole tsükleid ja sellel on $n-1$ serva</li>
    <li>$G$ on sidus ja iga serva kustutamine tekitab mittesidusa graafi</li>
    <li>$G$-s pole tsükleid ja iga uue serva lisamine tekitab tsükli</li>
    <li>$G$ on sidus ja iga kahte erinevat tippu ühendab täpselt üks lihtahel</li>
  </ol>
</div>

<div class="card topic-tool" id="treePropertyTool"></div>

<h2>Juurega puu</h2>
<div class="def">
  <strong>Juurega puu</strong> — puu, milles on välja valitud üks tipp, mida nimetatakse <strong>juureks</strong>. See defineerib tippude vahel vanem/laps-suhte.
</div>

<h2>Binaarsed puud</h2>
<div class="def">
  <strong>Binaarne puu</strong> — juurega puu, milles igal tipul on kuni 2 last (vasak ja parem). Kasutatakse arvutiteaduses andmestruktuurina.
</div>
`,

/* ============= TOESPUUD ============= */
toespuud: `
<h1>Toespuud (aluspuud)</h1>

<div class="def">
  Sidusa graafi <strong>toespuuks ehk aluspuuks</strong> nimetatakse sellist alamgraafi, mis sisaldab kõiki tippe ja on puu.
</div>

<div class="theorem">
  Igal sidusal graafil leidub toespuu.
</div>

<h2>Kaalutud graafid</h2>
<div class="def">
  <strong>Kaalutud graaf</strong> on kolmik $(V, E, \\omega)$, kus $\\omega: E \\to \\mathbb{R}^+$. Positiivset reaalarvu $\\omega(e)$ nimetatakse serva $e$ <strong>kaaluks</strong>.
  <br><br>
  Toespuu <strong>kaaluks</strong> $\\omega(T)$ loetakse tema servade kaalude summat. Toespuu on <strong>minimaalse kaaluga</strong>, kui ei leidu väiksema kaaluga toespuud.
</div>

<h2>Kruskali algoritm</h2>

<div class="card">
  <h3>Algoritm</h3>
  <p><strong>Antud:</strong> $n$-tipuline sidus kaalutud graaf $G = (V, E, \\omega)$<br>
  <strong>Leida:</strong> minimaalse kaaluga toespuu<br>
  <strong>Idee:</strong> lisame minimaalse kaaluga servi nii, et ei tekiks tsükleid.</p>

  <ol>
    <li>Vali servaks $e_1$ graafi $G$ minimaalse kaaluga serv.</li>
    <li>Iga $i = 2, 3, \\ldots, n-1$ korral vali servaks $e_i$ graafi $G$ minimaalse kaaluga serv, mis:
      <ul>
        <li>erineb servadest $e_1, \\ldots, e_{i-1}$</li>
        <li>ei moodusta koos servadega $e_1, \\ldots, e_{i-1}$ tsüklit</li>
      </ul>
    </li>
    <li>Tagasta graaf $T = (V, \\{e_1, e_2, \\ldots, e_{n-1}\\})$.</li>
  </ol>
</div>

<h2>Primi (Jarníki) algoritm</h2>

<div class="card">
  <h3>Algoritm</h3>
  <p><strong>Idee:</strong> kasvatame puud ühest tipust alates, valides igal sammul vähima kaaluga serva, mis puud laiendab.</p>

  <ol>
    <li>Vali graafist välja suvaline tipp $v$. Olgu $T_0$ ainsa tipuga $v$ ja $U := V \\setminus \\{v\\}$.</li>
    <li>Iga $i = 1, \\ldots, n-1$ korral:
      <ul>
        <li>leia vähima kaaluga serv $e_i$, mis ühendab graafi $T_{i-1}$ mingit tippu hulgaga $U$;</li>
        <li>olgu $w$ uus tipp ($e_i$ teine otstipp), $T_i := T_{i-1} \\cup \\{e_i, w\\}$, $U := U \\setminus \\{w\\}$.</li>
      </ul>
    </li>
    <li>Tagasta $T_{n-1}$.</li>
  </ol>
</div>

<h2>Korrektsus</h2>
<div class="theorem">
  Nii Kruskali kui ka Primi algoritm leiavad sidusast kaalutud graafist minimaalse kaaluga toespuu.
</div>

<div class="note">
  Erinevad minimaalse kaaluga toespuud võivad olla erinevad! Algoritmid leiavad <em>mõne</em> minimaalse kaaluga toespuu, ja see võib sõltuda alguspunkti või servade kaalu järjekorra valikust.
</div>

<div class="tip">
  💡 <strong>Proovi ise:</strong> <a href="#grapheditor">Graafiredaktoris</a> saad joonistada kaalutud graafi ja jooksutada Kruskali / Primi algoritmi samm-sammult!
</div>

<div class="example">
  <strong>Näide.</strong> Graafi $G$ servadega:
  $\\{uw: 2, vy: 2, vw: 3, ux: 3, uv: 3, xy: 5, wx: 4\\}$

  <p><em>Kruskal:</em> valime järjest $uw$ (2), $vy$ (2), $vw$ (3), $ux$ (3). Kokku 4 serva = $n-1$. Kaal: $2+2+3+3 = 10$.</p>
</div>
`,

/* ============= SUUNATUD ============= */
suunatud: `
<h1>Suunatud graafid</h1>

<div class="def">
  <strong>Suunatud graaf</strong> on järjestatud paar $D = (V, A)$, kus:
  <ul>
    <li>$V$ on tippude hulk</li>
    <li>$A$ on <strong>kaarte</strong> hulk — järjestatud paarid tippudest: $A \\subseteq V \\times V$</li>
  </ul>
  Kaart $(u, v) \\in A$ tähendab serva, mis on suunatud $u$-st $v$-sse.
</div>

<h2>Sisse- ja väljaaste</h2>
<div class="def">
  <ul>
    <li>$d^{+}(v)$ — tipu $v$ <strong>sisseaste</strong> (kui mitu kaart lõpeb tipus $v$)</li>
    <li>$d^{-}(v)$ — tipu $v$ <strong>väljaaste</strong> (kui mitu kaart algab tipust $v$)</li>
  </ul>
</div>

<div class="theorem">
  Suunatud graafis: $\\sum_v d^{+}(v) = \\sum_v d^{-}(v) = |A|$.
</div>

<h2>Suunatud ahel ja tugev sidusus</h2>
<div class="def">
  <strong>Suunatud ahel</strong> tipust $u$ tippu $v$ — järjend $u = v_0, v_1, \\ldots, v_k = v$, kus iga $(v_{i-1}, v_i) \\in A$.
</div>

<div class="def">
  Suunatud graaf $D$ on:
  <ul>
    <li><strong>tugevalt sidus</strong>, kui iga $u, v \\in V$ vahel leiduvad suunatud ahelad mõlemas suunas</li>
    <li><strong>nõrgalt sidus</strong>, kui aluseks olev suunamata graaf on sidus</li>
  </ul>
</div>

<h2>Naabrusmaatriks suunatud graafis</h2>
<p>$A = (a_{ij})$, kus $a_{ij} = 1$ kui $(v_i, v_j) \\in A$, muidu $0$. <strong>Üldjuhul ei ole sümmeetriline.</strong></p>

<h2>Kaalutud suunatud graaf</h2>
<div class="def">
  Suunatud graafi <strong>kaalumatriks</strong> $W = (\\omega_{ij})$:
  $$\\omega_{ij} = \\begin{cases} \\omega(v_i, v_j), & \\text{kui } (v_i, v_j) \\in A \\\\ 0, & \\text{kui } i = j \\\\ \\infty, & \\text{muidu} \\end{cases}$$
</div>

<p>Praktikas asendatakse $\\infty$ piisavalt suure arvuga (nt $n \\cdot r$, kus $r$ on maksimaalne kaal).</p>
`,

/* ============= LÜHIM TEE ============= */
luhimtee: `
<h1>Lühima tee leidmine</h1>

<p>Praktiliselt oluline ülesanne: leida kahe tipu vahel vähima kaaluga (lühim) suunatud ahel kaalutud suunatud graafis.</p>

<h2>Floydi–Warshalli algoritm</h2>

<div class="card">
  <p><strong>Antud:</strong> kaalutud suunatud graaf $G = (V, E, \\omega)$<br>
  <strong>Leida:</strong> lühimad teed <em>kõigi</em> tipupaaride vahel<br>
  <strong>Andmestruktuur:</strong> kaks $n \\times n$ maatriksit $A$ ja $B$:
  <ul>
    <li>$a_{ij}$ — seni leitud lühima tee kaal tipust $i$ tippu $j$</li>
    <li>$b_{ij}$ — lühima tee järgmise tipu number (tipust $i$ tippu $b_{ij}$ ja edasi $j$-sse)</li>
  </ul>
  </p>

  <h3>Algoritm</h3>
  <p>Initsialiseerime $A := W$ (kaalumatriks) ja $b_{ij} := j$.</p>
  <p>Iga $k = 1, 2, \\ldots, n$ korral:</p>
  <ul>
    <li>iga $i, j \\in \\{1, \\ldots, n\\}$, $i \\neq j$, $i \\neq k$, $j \\neq k$ korral:</li>
    <li>kui $a_{ik} + a_{kj} < a_{ij}$, siis:
      <ul>
        <li>$a_{ij} := a_{ik} + a_{kj}$</li>
        <li>$b_{ij} := b_{ik}$</li>
      </ul>
    </li>
  </ul>
</div>

<div class="theorem">
  Pärast Floydi–Warshalli algoritmi:
  <ul>
    <li>Kui leidub suunatud ahel $i$-st $j$-sse, siis $a_{ij}$ on lühima tee kaal ja $b_{ij}$ — tipp peale $i$-d sellel teel.</li>
    <li>Kui ei leidu, siis $a_{ij} = \\infty$.</li>
  </ul>
</div>

<p><strong>Keerukus:</strong> $\\mathcal{O}(n^3)$ aja jaoks, $\\mathcal{O}(n^2)$ mälu.</p>

<h2>Dijkstra algoritm</h2>

<div class="card">
  <p><strong>Antud:</strong> kaalutud suunatud graaf, algtipp $a$, lõpptipp $z$ (kõigi servade kaalud $\\geq 0$)<br>
  <strong>Leida:</strong> lühim tee tipust $a$ tippu $z$<br>
  <strong>Andmestruktuur:</strong>
  <ul>
    <li>$S$ — tippude hulk, kuhu on leitud lühim tee (alguses tühi)</li>
    <li>$L[i]$ — seni leitud vähima tee pikkus tipust $a$ tippu $i$</li>
  </ul>
  </p>

  <h3>Algoritm</h3>
  <ol>
    <li>Initsialiseerime: $L[a] := 0$, $L[i] := \\infty$ iga $i \\neq a$ korral. $S := \\emptyset$.</li>
    <li>Vali $u \\notin S$, mille korral $L[u]$ on minimaalne. Lisa $u$ hulka $S$.</li>
    <li>Iga $u$ naabri $v \\notin S$ korral:
      <ul>
        <li>kui $L[u] + \\omega_{uv} < L[v]$, siis $L[v] := L[u] + \\omega_{uv}$</li>
      </ul>
    </li>
    <li>Kui $z \\in S$, siis lõpetame; $L[z]$ on lühim kaugus.</li>
    <li>Muidu mine sammu 2 juurde.</li>
  </ol>
</div>

<p><strong>Keerukus:</strong> Naiivse realisatsiooni puhul $\\mathcal{O}(n^2)$; binaarse hunnikuga $\\mathcal{O}((n+m) \\log n)$.</p>

<div class="note">
  Dijkstra eeldab <strong>mittenegatiivseid kaale</strong>! Negatiivsete servade korral tuleb kasutada Bellman–Fordi või Floydi–Warshalli.
</div>

<h2>Lemma 2.135</h2>
<div class="theorem">
  Dijkstra algoritmi töö igal etapil iga tipu $v$ korral kui $L[v] \\neq \\infty$, siis leidub suunatud ahel tipust $a$ tippu $v$, mille pikkus on $L[v]$.
</div>

<div class="tip">
  💡 <strong>Proovi ise:</strong> <a href="#grapheditor">Graafiredaktoris</a> on Dijkstra ja Floydi–Warshalli interaktiivne visualiseering.
</div>
`,

/* ============= KONTROLLTÖÖD ============= */
kontrolltood: `
<h1>Vanad kontrolltööd</h1>

<p>Kontrolltöö nr 1 katab kursuse esimese poole (matemaatiline loogika). Iga variant koosneb tüüpiliselt 5 ülesandest, mille kogupunktidearv on 32. Allpool on toodud kõigi senise kevadsemestri variantide ülesanded.</p>

<div class="card">
  <h3>📝 Variant A (07.04.2026)</h3>

  <div class="def">
    <strong>Ülesanne 1 (6 p)</strong>
    <ol type="a">
      <li>Esitage Peano aritmeetika signatuur ja 3 aksioomi.</li>
      <li>Tõestage lähtudes ainult Peano aritmeetika aksioomidest ja võrduspredikaadi omadustest, et naturaalarvudel on omadus $\\forall x(0' + x = x')$.</li>
      <li>Väljendage Peano aritmeetika signatuuris väide $2 \\cdot 3 + 1 = 7$.</li>
    </ol>
  </div>

  <div class="def">
    <strong>Ülesanne 2 (7 p)</strong>
    <ol type="a">
      <li>Defineerige predikaatarvutuse valemite järeldumine.</li>
      <li>Tõestage, et predikaatarvutuse valemite $F$ ja $G$ korral kehtib järeldumine
      $$\\exists x \\forall y (F(x) \\lor G(y)) \\models \\forall y \\exists x (F(x) \\lor G(y)),$$
      kuid vastupidine järeldumine üldjuhul ei kehti.</li>
    </ol>
  </div>

  <div class="def">
    <strong>Ülesanne 3 (6 p)</strong>
    <ol type="a">
      <li>Sõnastage sekventsiaalse lausearvutuse täielikkuse teoreem.</li>
      <li>Tuletage sekvents $\\neg(P \\Rightarrow Q) \\vdash P\\&\\neg Q$.</li>
    </ol>
  </div>

  <div class="def">
    <strong>Ülesanne 4 (6 p)</strong>
    <ol type="a">
      <li>Defineerige predikaatarvutuse valem.</li>
      <li>Teisendage valem $\\neg \\exists y(\\exists x P(x) \\Rightarrow (Q(y) \\Rightarrow \\forall x R(x)))$ prefikskujule, kus eitused on atomaarsete valemite ees ja valem ei sisalda implikatsiooni.</li>
    </ol>
  </div>

  <div class="def">
    <strong>Ülesanne 5 (7 p)</strong>
    <ol type="a">
      <li>Defineerige signatuuri interpretatsioon.</li>
      <li>Leidke võimalikult väheste elementidega sobiv signatuur ja selle interpretatsioon, et väljendada laused maatriksi $A \\in \\text{Mat}_{m,n}(\\mathbb{N})$ kohta.</li>
      <li>Väljendage selle signatuuri silmas pidades:
        <ol type="i">
          <li>Maatriksi $A$ viimase rea elemendid on kasvavas järjestuses.</li>
          <li>Maatriksis $A$ on täpselt üks nullidest koosnev veerg.</li>
        </ol>
      </li>
    </ol>
  </div>

  <p><a href="materjalid/Kontrolltoo_1_07.04.2026_Variant_A.pdf" target="_blank" class="btn small">Vaata PDF-i</a></p>
</div>

<div class="card">
  <h3>📝 Variant D</h3>
  <ul>
    <li><strong>Ül 1.</strong> Peano: $\\forall x(0 + x = x)$ tõestamine, väljendada $3 \\cdot 2 + 1 = 7$.</li>
    <li><strong>Ül 2.</strong> Tõestada $\\forall x F(x) \\lor \\forall x G(x) \\models \\forall x(F(x) \\lor G(x))$.</li>
    <li><strong>Ül 3.</strong> Korrektsuse teoreem; tuletada $P \\Rightarrow Q \\vdash \\neg Q \\Rightarrow \\neg P$.</li>
    <li><strong>Ül 4.</strong> Prefikskuju: $\\neg \\exists x(\\forall y P(x,y) \\Rightarrow \\exists z Q(z))$.</li>
    <li><strong>Ül 5.</strong> Funktsioon $f: \\mathbb{N} \\to \\mathbb{N}$: $f$ on monotoonselt mittekahanev, $f$-l leidub püsipunkt.</li>
  </ul>
  <p><a href="materjalid/Kontrolltoo_1_Variant_D.pdf" target="_blank" class="btn small">Vaata PDF-i</a></p>
</div>

<div class="card">
  <h3>📝 Variant E</h3>
  <ul>
    <li><strong>Ül 1.</strong> Täielikkuse teoreem; tuletada $(P \\lor Q)\\&R \\vdash (P\\&R) \\lor (Q\\&R)$.</li>
    <li><strong>Ül 2.</strong> Signatuur $\\langle\\,;+, \\cdot;=,|\\rangle$ üle $\\mathbb{N}$: väljenda $x=1$, $x$ paaris, $x$ algarv, $x, y$ ühistegurita.</li>
    <li><strong>Ül 3.</strong> Peano: $\\forall x(0 \\cdot x = 0)$; väljendada ja tõestada $0' + 0'' = 0'''$.</li>
    <li><strong>Ül 4.</strong> Prefikskuju: $\\neg \\forall x(\\exists y P(x,y) \\Rightarrow \\exists z \\neg Q(x,z))$.</li>
    <li><strong>Ül 5.</strong> Järeldumine: $\\exists x(F(x)\\&G(x)) \\models \\exists x F(x) \\& \\exists x G(x)$, pööratud ei kehti.</li>
  </ul>
  <p><a href="materjalid/Kontrolltoo_1_Variant_E.pdf" target="_blank" class="btn small">Vaata PDF-i</a></p>
</div>

<div class="card">
  <h3>📝 Variant F</h3>
  <ul>
    <li><strong>Ül 1.</strong> Definieeri prefikskuju; teisenda $\\neg(\\forall x P(x) \\Rightarrow \\exists y \\forall z Q(y, z))$.</li>
    <li><strong>Ül 2.</strong> Peano: $\\forall x(x + 0' = 0' + x)$; väljendada ja tõestada $0'' + 0' = 0'''$.</li>
    <li><strong>Ül 3.</strong> Täielikkus; tuletada $P\\&(Q \\lor R) \\vdash (P\\&Q) \\lor (P\\&R)$.</li>
    <li><strong>Ül 4.</strong> Signatuur $\\langle\\,;+,\\cdot;=\\rangle$ üle $\\mathbb{N}$: $x=0$, $x=1$, $x | y$, $x, y$ ühistegurita.</li>
    <li><strong>Ül 5.</strong> Järeldumine: $\\forall x(F(x) \\Rightarrow G(x)) \\models \\forall x F(x) \\Rightarrow \\forall x G(x)$.</li>
  </ul>
  <p><a href="materjalid/Kontrolltoo_1_Variant_F.pdf" target="_blank" class="btn small">Vaata PDF-i</a></p>
</div>

<div class="card">
  <h3>📝 Järeltöö, Variant C (21.04.2026)</h3>
  <ul>
    <li><strong>Ül 1.</strong> Signatuur; põhihulk $\\mathcal{P}(\\mathbb{N})$, $\\langle;\\cup,\\cap;=\\rangle$: $x = \\emptyset$, $x = \\mathbb{N}$, $x \\subseteq y$, $x' = y$.</li>
    <li><strong>Ül 2.</strong> Täielikkus; $A \\Rightarrow B, \\neg A \\Rightarrow B \\vdash B$.</li>
    <li><strong>Ül 3.</strong> Peano: $\\forall x \\forall y(x' + y = x + y')$; tõestada $1 \\cdot 2 = 2$.</li>
    <li><strong>Ül 4.</strong> Kehtestatavus; näita, et $\\forall x \\exists y((R(x,y)\\&P(y)) \\lor (\\neg Q(x) \\& \\neg R(y, x)))$ on kehtestatav, kuid mitte samaselt tõene.</li>
    <li><strong>Ül 5.</strong> Järeldumine: $F(x) \\Rightarrow \\exists x \\neg G(x) \\models \\exists x(G(x) \\Rightarrow \\neg F(x))$.</li>
  </ul>
  <p><a href="materjalid/Kontrolltoo_1_jareltoo_21.04.2026_Variant_C.pdf" target="_blank" class="btn small">Vaata PDF-i</a></p>
</div>

<div class="tip">
  💡 Lahendused: <a href="materjalid/Kontrolltoo_1_lahendused.pdf" target="_blank">Kontrolltöö 1 lahendused (PDF)</a>
</div>
`,

/* ============= HARJUTUSTÖÖ GENERAATOR (laeb widget) ============= */
harjutustoo: `<h1>Harjutustöö generaator</h1><p>Laadimine...</p>`,

/* ============= ÜLESANDED ============= */
ulesanded: `
<h1>Praktikumiülesanded</h1>

<p>Allpool on kogu praktikumiülesannete kogu (Reimo Palm, Valdis Laan, Kati Ain) avamiseks PDF-ina ja kokkuvõte iga peatüki sisust.</p>

<a href="materjalid/DM_1_ülesannete_kogu_2026K.pdf" target="_blank" class="btn">📋 Ava ülesannete kogu (PDF)</a>

<div class="card">
  <h3>1. Lausearvutuse kordamine</h3>
  <p>Sulgude eemaldamine ja taastamine valemites; samaselt tõesus ja kehtestatavus; De Morgani seadused; süllogismid; spetsifikatsioonide loogiline analüüs.</p>
</div>

<div class="card">
  <h3>2. Tõesuspuu meetod</h3>
  <p>Tõesuspuu kasutamine kehtestatavuse, samaselt tõesuse, samaselt vääruse ja järeldumiste kontrollimiseks.</p>
</div>

<div class="card">
  <h3>3. Predikaadid ja kvantorid</h3>
  <p>Predikaatarvutuse valemite süntaks, vabad ja seotud muutujad, kvantorite tähendus.</p>
</div>

<div class="card">
  <h3>4. Väidete väljendamine</h3>
  <p>Eestikeelsete väidete teisendamine predikaatarvutuse valemiteks.</p>
</div>

<div class="card">
  <h3>5. Tõesuspuu predikaatarvutuses</h3>
  <p>Kvantorireeglid; predikaatarvutuse valemite uurimine tõesuspuu meetodil.</p>
</div>

<div class="card">
  <h3>6. Valemite samaväärsus</h3>
  <p>Põhisamaväärsuste rakendamine; samaväärsuse tõestamine.</p>
</div>

<div class="card">
  <h3>7. Tõestamine interpretatsioonide abil</h3>
  <p>Mudelite konstrueerimine, mille abil näidata, et valem on / pole samaselt tõene.</p>
</div>

<div class="card">
  <h3>8. Aksiomaatilised teooriad</h3>
  <p>Signatuuri ja interpretatsiooni mõiste; mudelite konstrueerimine.</p>
</div>

<div class="card">
  <h3>9. Sekventsiaalne lausearvutus</h3>
  <p>Sekventside tuletamine reeglite abil.</p>
</div>

<div class="card">
  <h3>10. Naturaalarvude omaduste tõestamine</h3>
  <p>Peano aksioomide abil naturaalarvude omaduste tõestamine, induktsiooni rakendamine.</p>
</div>

<div class="card">
  <h3>11–14. Graafiteooria (sissejuhatus, tipuastmed, sidusus, Euler/Hamilton)</h3>
  <p>Põhilised omadused, tipuastmete teoreem, isomorfism, Euleri ja Hamiltoni graafid.</p>
</div>

<div class="card">
  <h3>15–17. Puud ja toespuud</h3>
  <p>Puu omaduste tõestamine; Kruskali ja Primi algoritmid.</p>
</div>

<div class="card">
  <h3>18–20. Suunatud graafid, tugev sidusus, lühim tee</h3>
  <p>Floydi–Warshalli ja Dijkstra algoritmid; tugev sidusus.</p>
</div>
`,

/* ============= SÕNASTIK ============= */
sonastik: `
<h1>Mõistete sõnastik</h1>
<p>Kursuse Moodle'i sõnastiku põhjal koostatud mõistete nimekiri. Otsing vaatab nii mõiste nimetust kui definitsiooni.</p>

<input type="text" id="glossaryFilter" placeholder="Otsi mõistet..." style="margin-bottom: 16px;">

<div id="glossaryList"></div>
`,

/* ============= GRAAFIREDAKTOR (laeb widget) ============= */
grapheditor: `<h1>Graafiredaktor</h1><p>Laadimine...</p>`,

/* ============= KIIRVIKTORIIN (laeb widget) ============= */
kviis: `<h1>Kiirviktoriin</h1><p>Laadimine...</p>`,

/* ============= MÕISTEKAARDID (laeb widget) ============= */
flashcards: `<h1>Mõistekaardid</h1><p>Laadimine...</p>`,

};

/* ===== Legacy glossary terms; active course glossary lives in js/glossary.js =====
window.GLOSSARY = [
  {term: "Lausearvutus", def: "Loogikaharu, mis uurib lauseid ja nende kompositsioonseid omadusi tõeväärtuste põhjal."},
  {term: "Lausemuutuja", def: "Sümbol (A, B, C, ...), mis võib omandada väärtuse 1 (tõene) või 0 (väär)."},
  {term: "Tehe (lausearvutuse)", def: "Eitus ¬, konjunktsioon &, disjunktsioon ∨, implikatsioon ⇒, ekvivalents ⇔."},
  {term: "Tõeväärtustabel", def: "Tabel, mis näitab valemi tõeväärtust kõikidel muutujate väärtustustel."},
  {term: "Samaselt tõene", def: "Valem, mis on tõene igal muutujate väärtustusel (tautoloogia)."},
  {term: "Samaselt väär", def: "Valem, mis on väär igal muutujate väärtustusel (vasturääkivus)."},
  {term: "Kehtestatav", def: "Valem, mis on vähemalt ühel väärtustusel tõene."},
  {term: "Samaväärsus", def: "Valemid F ja G on samaväärsed (F ≡ G), kui nende tõeväärtused on võrdsed igal väärtustusel."},
  {term: "Järeldumine", def: "Valemitest F₁,...,F_n järeldub valem G (F₁,...,F_n ⊨ G), kui igal väärtustusel, kus kõik F_i on tõesed, on ka G tõene."},
  {term: "Tõesuspuu", def: "Meetod valemi omaduste kontrollimiseks struktuuri lagundamise teel."},
  {term: "Predikaat", def: "Muutujate omadus või seos: P(x), Q(x,y) jne."},
  {term: "Kvantor", def: "Üldsuse ∀ („iga\") või olemasolu ∃ („leidub\")."},
  {term: "Vaba muutuja", def: "Muutuja esinemine valemis, mis pole ühegi kvantori ulatuses."},
  {term: "Seotud muutuja", def: "Muutuja esinemine valemis, mis on kvantori ulatuses."},
  {term: "Kinnine valem (lause)", def: "Predikaatarvutuse valem ilma vabade muutujateta."},
  {term: "Signatuur", def: "Kolmik ⟨C; F; P⟩, kus C — konstantsümbolid, F — funktsionaalsümbolid, P — predikaatsümbolid."},
  {term: "Interpretatsioon", def: "Signatuuri sümbolite tähenduse fikseerimine põhihulgal."},
  {term: "Põhihulk (mudeli kandja)", def: "Mittetühi hulk M, mille üle interpretatsioon defineeritud on."},
  {term: "Mudel", def: "Valemi(te) mudel — interpretatsioon, milles need valemid on tõesed."},
  {term: "Prefikskuju", def: "Predikaatarvutuse valem, kus kõik kvantorid asuvad valemi alguses ja maatriks on kvantorivaba."},
  {term: "Sekvents", def: "Avaldis Γ ⊢ F, kus Γ on valemite hulk ja F valem."},
  {term: "Korrektsus", def: "Aksiomaatiline teooria on korrektne, kui iga teoreem on semantiliselt tõene."},
  {term: "Täielikkus", def: "Aksiomaatiline teooria on täielik, kui iga tõene valem on teoreem."},
  {term: "Peano aritmeetika", def: "Naturaalarvude aksiomaatiline teooria signatuuriga ⟨0; ', +, ·; =⟩."},
  {term: "Induktsiooniaksioom", def: "Peano P7: F(0) & ∀x(F(x) ⇒ F(x')) ⇒ ∀x F(x)."},
  {term: "Graaf", def: "Järjestatud paar G=(V,E), kus V on tippude hulk ja E on servade hulk (V kaheelemendilised alamhulgad)."},
  {term: "Naabertipud", def: "Tipud, mis on ühendatud servaga."},
  {term: "Tipu aste (valents) d(v)", def: "Tipuga intsidentsete servade arv."},
  {term: "Isoleeritud tipp", def: "Tipp, mille aste on 0."},
  {term: "Rippuv tipp (leht)", def: "Tipp, mille aste on 1."},
  {term: "Täisgraaf K_n", def: "Graaf, mille iga kahe tipu vahel on serv. Servi: n(n-1)/2."},
  {term: "Nullgraaf O_n", def: "Graaf ilma servadeta."},
  {term: "Täiendgraaf", def: "Graaf, milles servaga on ühendatud parajasti need tipud, mille vahel originaalis serv puudus."},
  {term: "Regulaarne graaf", def: "Graaf, mille kõigi tippude astmed on võrdsed."},
  {term: "Ahel", def: "Tippude ja servade vahelduv järjend, kus iga kaks järjestikust tippu on ühendatud servaga."},
  {term: "Lihtahel", def: "Ahel, mille kõik tipud on erinevad."},
  {term: "Tsükkel", def: "Kinnine ahel, milles ≥ 3 serva ja ükski tipp ei kordu."},
  {term: "Sidusus", def: "Graaf on sidus, kui iga kahe tipu vahel leidub ahel."},
  {term: "Sidususkomponent", def: "Graafi maksimaalne sidus alamgraaf."},
  {term: "Sild", def: "Serv, mille eemaldamine suurendab sidususkomponentide arvu."},
  {term: "Eraldav tipp", def: "Tipp, mille eemaldamine suurendab sidususkomponentide arvu."},
  {term: "Isomorfism", def: "Bijektsioon graafide tippude vahel, mis säilitab servad."},
  {term: "Euleri ahel", def: "Ahel, mis sisaldab graafi iga serva täpselt ühe korra."},
  {term: "Euleri graaf", def: "Sidus graaf, milles leidub kinnine Euleri ahel; kõigi tippude astmed paarisarvud."},
  {term: "Hamiltoni tsükkel", def: "Tsükkel, mis läbib iga tippu täpselt ühe korra."},
  {term: "Hamiltoni graaf", def: "Graaf, milles leidub Hamiltoni tsükkel."},
  {term: "Puu", def: "Sidus graaf ilma tsükliteta. n tipuga puul on n-1 serva."},
  {term: "Mets", def: "Graaf, mille sidususkomponendid on puud."},
  {term: "Toespuu (aluspuu)", def: "Sidusa graafi alamgraaf, mis sisaldab kõiki tippe ja on puu."},
  {term: "Minimaalse kaaluga toespuu", def: "Toespuu, mille servade kaalude summa on vähim."},
  {term: "Kruskali algoritm", def: "Lisab järjest minimaalse kaaluga servi nii, et ei teki tsüklit."},
  {term: "Primi algoritm", def: "Kasvatab puud ühest tipust, valides igal sammul vähima kaaluga serva, mis puud laiendab."},
  {term: "Suunatud graaf", def: "Paar (V, A), kus A ⊆ V×V on kaarte hulk."},
  {term: "Sisseaste d⁺(v)", def: "Tipus v lõppevate kaarte arv."},
  {term: "Väljaaste d⁻(v)", def: "Tipust v algavate kaarte arv."},
  {term: "Tugev sidusus", def: "Suunatud graaf on tugevalt sidus, kui iga kahe tipu vahel leiduvad suunatud ahelad mõlemas suunas."},
  {term: "Dijkstra algoritm", def: "Lühima tee leidmine ühest tipust kõigisse teistesse (mittenegatiivsed kaalud)."},
  {term: "Floydi–Warshalli algoritm", def: "Lühimad teed kõigi tipupaaride vahel; O(n³) keerukus."},
];
*/

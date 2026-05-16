# Diskreetne matemaatika I — interaktiivne õppekeskkond

Interaktiivne veebirakendus Tartu Ülikooli kursuse **Diskreetne matemaatika I** (LTMS.00.019) materjali õppimiseks. Kogu sisu on eesti keeles ja põhineb Kati Aini loengukonspektil ja praktikumiülesannete kogul (Reimo Palm, Valdis Laan, Kati Ain).

## ✨ Mida saab teha

- **Loe teooriat** kõigi peatükkide kohta — lausearvutusest kuni Dijkstra algoritmini.
- **Ehita tõeväärtustabeleid** sisestades suvalisi lausearvutuse valemeid (parser toetab `&`, `|`, `!`, `->`, `<->`).
- **Ehita tõesuspuid** lausearvutuse valemitele ning kontrolli samaselt tõesust, samaselt väärust ja kehtestatavust.
- **Kasuta teemasiseseid tööriistu** samaväärsuse, kvantorite, astmejärjendite, Euleri/Hamiltoni tingimuste ja puude omaduste kontrollimiseks.
- **Lahenda teemasiseseid lahendusülesandeid** iga suurema teoorialehe lõpus, koos avatava lahenduskäiguga.
- **Joonista graafe** interaktiivsel lõuendil — lisa tippe, servi, määra kaale, vaata naabrusmaatriksit.
- **Jooksuta algoritme** — Kruskali, Primi, Dijkstra ja Floydi–Warshalli — samm-sammult.
- **Tee teemaviktoriini** 5–15 juhusliku küsimusega kogu kursusest, kontrolltöö 1 teemadest või graafiteooriast.
- **Korda mõistekaartidega** ja märgi sõnastikus selgeks kõik olulised mõisted.
- **Vaata vanu kontrolltöid** (variandid A, C, D, E, F) eesti keeles.
- **Koosta harjutustöö** juhusliku 32-punktise kontrolltöö struktuuriga.
- **Arvuta hinnet** TBL punktide, kontrolltööde lävendite ja lisapunktide põhjal.

## 🚀 Käivitamine

```bash
# Kuna kõik on staatiline HTML/CSS/JS, piisab lihtsast veebiserverist:
cd app
python -m http.server 8000
# Ava http://localhost:8000
```

Või lihtsalt ava `index.html` brauseris (mõned brauserid blokeerivad kohaliku PDF-i avamist, nii et HTTP-server on soovitatav).

## 📂 Failistruktuur

```
app/
├── index.html             # Põhilehekülg
├── css/style.css          # Kujundus (tume teema)
├── js/
│   ├── app.js             # Marsruutimine, edenemise jälgimine
│   ├── content.js         # Kogu teooriasisu
│   ├── glossary.js        # Kursuse Moodle'i sõnastiku mõisted
│   └── widgets/
│       ├── truth-table.js # Lausearvutuse parser + tõeväärtustabel
│       ├── truth-tree.js  # Interaktiivne lausearvutuse tõesuspuu ehitaja
│       ├── prefix-form.js # Prefikskuju samm-sammult näited
│       ├── graph-editor.js# Canvas-põhine graafiredaktor + algoritmid
│       ├── algorithms.js  # (reserved)
│       ├── quiz.js        # Viktoriin, mõistekaardid, sõnastik
│       ├── exam-practice.js # 32-punktise harjutustöö generaator
│       ├── grade-calculator.js # Hinde ja miinimumi kalkulaator
│       └── topic-tools.js # Väikesed tööriistad ja lahendusülesanded teoorialehtede sees
├── vendor/katex/          # KaTeX lokaalne fallback offline kasutuseks
└── materjalid/            # PDF-id: konspekt, ülesanded, kontrolltööd
```

## 🎯 Peatükid

### 1. osa — Matemaatiline loogika
- Lausearvutus, tõeväärtustabelid, samaselt tõesus
- Tõesuspuu meetod
- Predikaadid, kvantorid
- Signatuur ja interpretatsioonid
- Lausearvutuse + predikaatloogika põhisamaväärsused
- Valemi prefikskuju
- Aksiomaatilised teooriad
- Sekventsiaalne lausearvutus
- Peano aritmeetika ja induktsioon

### 2. osa — Graafiteooria
- Graafi mõiste, tüübid (täisgraaf, nullgraaf, regulaarne, jne)
- Tipuastmed, ahelad, tsüklid
- Sidusus, isomorfism
- Euleri ja Hamiltoni graafid
- Puud ja toespuud (Kruskali ja Primi algoritmid)
- Suunatud graafid
- Lühima tee leidmine (Floydi–Warshalli ja Dijkstra algoritmid)

## 🛠 Tehnoloogiad

- **Vanilla JavaScript** — pole vajalik framework, ehitusriistu ega NPMi
- **KaTeX** matemaatilise notatsiooni renderdamiseks (CDN-ist)
- **Canvas API** graafide joonistamiseks
- **LocalStorage** edenemise salvestamiseks

## 📚 Allikad

- *Diskreetne matemaatika I konspekt* — Valdis Laan, täiendanud Kati Ain (28.01.2026)
- *DM I praktikumiülesannete kogu* — Reimo Palm, Valdis Laan, Kati Ain (2026K)
- Kontrolltööde variandid A, C, D, E, F (kevadsemester 2026)

## 📄 Litsents

MIT — vaata [LICENSE](LICENSE).

Õppematerjalid (PDF-id `materjalid/` kaustas) kuuluvad oma autoritele ja Tartu Ülikoolile; need on lisatud rakendusele üliõpilaste isiklikuks kasutamiseks.

---

> Tehtud Tartu Ülikooli informaatika tudengile.

# Diskreetne matemaatika I — interaktiivne õppekeskkond

Interaktiivne veebirakendus Tartu Ülikooli kursuse **Diskreetne matemaatika I** (LTMS.00.019) materjali õppimiseks. Kogu sisu on eesti keeles ja põhineb Kati Aini loengukonspektil ja praktikumiülesannete kogul (Reimo Palm, Valdis Laan, Kati Ain).

## ✨ Mida saab teha

- **Loe teooriat** kõigi peatükkide kohta — lausearvutusest kuni Dijkstra algoritmini.
- **Kasuta õppimise töölauda**, mis koondab tänased mõistekaardid, peatükkide edenemise, märkmed ja viimase viktoriini tulemuse.
- **Pea vigade päevikut**, kuhu saab lisada nõrgad kohad käsitsi, viktoriini valed vastused või teemaharjutused kordamiseks.
- **Tee teemalõpu mini-kontrolle** iga suurema peatüki lõpus; peatükk märgitakse tehtuks alles pärast mini-kontrolli vastuste kontrollimist.
- **Lahenda graafiteooria kontrollitavaid samm-ülesandeid**, kus Havel-Hakimi, Kruskali, Primi, Dijkstra, Floydi-Warshalli ja sidususe otsused kontrollitakse sammhaaval.
- **Ehita tõeväärtustabeleid** sisestades suvalisi lausearvutuse valemeid (parser toetab `&`, `|`, `!`, `->`, `<->`).
- **Genereeri täielikku DNK/KNK kuju** valemist koos tõeväärtustabeliga.
- **Ehita tõesuspuid** lausearvutuse valemitele ning kontrolli samaselt tõesust, samaselt väärust ja kehtestatavust.
- **Otsi konspektidest** mõisteid ja teoreeme kõigi ekstraktitud PDF-lehtede seest koos kontekstiga.
- **Kasuta teemasiseseid tööriistu** samaväärsuse, kvantorite, predikaadimudelite, Havel-Hakimi astmejärjendite, sekventside, Euleri/Hamiltoni tingimuste ja puude omaduste kontrollimiseks.
- **Lahenda teemasiseseid lahendusülesandeid** iga suurema teoorialehe lõpus, koos avatava lahenduskäiguga.
- **Genereeri lõputult parameetrilisi ülesandeid** prefikskuju, Havel-Hakimi, kaalutud graafide ja sekventside harjutamiseks; tulemused salvestuvad ja valed vastused liiguvad vigade päevikusse.
- **Lisa peatüki märkmeid** iga teoorialehe alla; märkmed salvestuvad brauseri kohalikku salvestusruumi.
- **Joonista graafe** interaktiivsel lõuendil — lisa tippe, servi, määra kaale, vaata naabrusmaatriksit.
- **Jooksuta algoritme** — Kruskali, Primi, Dijkstra ja Floydi–Warshalli — samm-sammult.
- **Tee teemaviktoriini** 5–15 juhusliku küsimusega kogu kursusest, kontrolltöö 1 teemadest või graafiteooriast.
- **Korda mõistekaartidega** spaced repetition põhimõttel ja märgi sõnastikus selgeks kõik olulised mõisted.
- **Kasuta spikrit** viimase hetke kompaktseks kordamiseks või printimiseks.
- **Vaata vanu kontrolltöid** (variandid A, C, D, E, F) eesti keeles.
- **Koosta harjutustöö** juhusliku 32-punktise kontrolltöö struktuuriga.
- **Arvuta hinnet** TBL punktide, kontrolltööde lävendite ja lisapunktide põhjal.
- **Paigalda rakendus PWA-na** ning kasuta seda pärast esmast laadimist ka võrguühenduseta.

## 🚀 Käivitamine

```bash
# Kuna kõik on staatiline HTML/CSS/JS, piisab lihtsast veebiserverist:
cd app
python -m http.server 8000
# Ava http://localhost:8000
```

Või lihtsalt ava `index.html` brauseris (mõned brauserid blokeerivad kohaliku PDF-i avamist, nii et HTTP-server on soovitatav).

## 📲 PWA / võrguühenduseta kasutus

Rakendus sisaldab `manifest.webmanifest` faili ja `service-worker.js` võrguühenduseta kasutuse vahemälu. Ava rakendus HTTP-serveri kaudu ja lae see korra täielikult ära; seejärel pakub brauser võimalust rakendus paigaldada. Pärast esmast vahemällu salvestamist töötavad teoorialehed, tööriistad, KaTeX, konspektiotsing, PDF-materjalid ja kohalik edenemine ka ilma internetita.

Kui arenduse ajal staatilisi faile muudad, suurenda `service-worker.js` failis `CACHE_NAME` väärtust, et brauser võtaks uue võrguühenduseta versiooni kasutusele.

## 📂 Failistruktuur

```
app/
├── index.html             # Põhilehekülg
├── manifest.webmanifest   # PWA manifest installimiseks
├── service-worker.js      # Võrguühenduseta vahemälu ja navigatsiooni varuvariant
├── icons/                 # PWA ikoonid
├── css/style.css          # Kujundus (tume teema)
├── data/extracted.json    # PDF-idest ekstraktitud tekst konspektiotsingu jaoks
├── js/
│   ├── app.js             # Marsruutimine, edenemise jälgimine
│   ├── content.js         # Kogu teooriasisu
│   ├── glossary.js        # Kursuse Moodle'i sõnastiku mõisted
│   ├── pwa.js             # PWA installinupp ja service workeri registreerimine
│   └── widgets/
│       ├── truth-table.js # Lausearvutuse parser + tõeväärtustabel
│       ├── truth-tree.js  # Interaktiivne lausearvutuse tõesuspuu ehitaja
│       ├── prefix-form.js # Prefikskuju samm-sammult näited
│       ├── graph-editor.js# Canvas-põhine graafiredaktor + algoritmid
│       ├── algorithms.js  # (reserved)
│       ├── quiz.js        # Viktoriin, mõistekaardid, sõnastik
│       ├── exam-practice.js # 32-punktise harjutustöö generaator
│       ├── grade-calculator.js # Hinde ja miinimumi kalkulaator
│       ├── normal-forms.js # Täieliku DNK/KNK generaator
│       ├── problem-generator.js # Lõputu parameetriline ülesannete generaator + tulemuste statistika
│       ├── study-tools.js # Õppimise töölaud, vigade päevik, konspektiotsing, spikker, õpijada
│       └── topic-tools.js # Väikesed tööriistad ja lahendusülesanded teoorialehtede sees
├── vendor/katex/          # KaTeX-i kohalik varu võrguühenduseta kasutuseks
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
- **KaTeX** matemaatilise notatsiooni renderdamiseks lokaalsest `vendor/` kaustast
- **Canvas API** graafide joonistamiseks
- **LocalStorage** edenemise, mõistekaartide kordamise, õpijada ja peatüki märkmete salvestamiseks

## 📚 Allikad

- *Diskreetne matemaatika I konspekt* — Valdis Laan, täiendanud Kati Ain (28.01.2026)
- *DM I praktikumiülesannete kogu* — Reimo Palm, Valdis Laan, Kati Ain (2026K)
- Kontrolltööde variandid A, C, D, E, F (kevadsemester 2026)

## 📄 Litsents

MIT — vaata [LICENSE](LICENSE).

Õppematerjalid (PDF-id `materjalid/` kaustas) kuuluvad oma autoritele ja Tartu Ülikoolile; need on lisatud rakendusele üliõpilaste isiklikuks kasutamiseks.

---

> Tehtud Tartu Ülikooli informaatika tudengile.

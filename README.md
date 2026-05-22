# Diskreetne matemaatika I — interaktiivne õppekeskkond

Interaktiivne veebirakendus Tartu Ülikooli kursuse **Diskreetne matemaatika I** (LTMS.00.019) materjali õppimiseks. Kogu sisu on eesti keeles ja põhineb Kati Aini loengukonspektil ja praktikumiülesannete kogul (Reimo Palm, Valdis Laan, Kati Ain).

> **Mitteametlik õppevahend.** See rakendus ei ole Tartu Ülikooli ametlik kursusekeskkond ega asenda Moodle'it, ÕIS-i või õppejõu juhiseid. Hinnatavas töös, kontrolltööl või eksamil kasuta seda ainult siis, kui õppejõud on sellise abivahendi sõnaselgelt lubanud.

> **Avalikult jagatav versioon ei tohiks sisaldada kursuse ametlikke PDF-e ega PDF-idest ekstraktitud tekstiandmeid.** Kood ja AI-genereeritud kontrolltöö harjutusfailid võivad olla avalikud; kursuse algmaterjalid ja `data/extracted.json` on mõeldud ainult lokaalseks/isiklikuks kasutuseks juhul, kui sul on materjalide kasutamiseks õigus.

## ✨ Mida saab teha

- **Loe teooriat** kõigi peatükkide kohta — lausearvutusest kuni Dijkstra algoritmini.
- **Kasuta õppimise töölauda**, mis koondab tänased mõistekaardid, peatükkide edenemise, märkmed ja viimase viktoriini tulemuse.
- **Pea vigade päevikut**, kuhu saab lisada nõrgad kohad käsitsi, viktoriini valed vastused või teemaharjutused kordamiseks.
- **Tee teemalõpu mini-kontrolle** iga suurema peatüki lõpus; peatükk märgitakse tehtuks alles pärast mini-kontrolli vastuste kontrollimist.
- **Lahenda graafiteooria kontrollitavaid samm-ülesandeid**, kus Havel-Hakimi, Kruskali, Primi, Dijkstra, Floydi-Warshalli ja sidususe otsused kontrollitakse sammhaaval.
- **Ehita tõeväärtustabeleid** sisestades suvalisi lausearvutuse valemeid (parser toetab `&`, `|`, `!`, `->`, `<->`).
- **Genereeri täielikku DNK/KNK kuju** valemist koos tõeväärtustabeliga.
- **Ehita tõesuspuid** lausearvutuse valemitele ning kontrolli samaselt tõesust, samaselt väärust ja kehtestatavust.
- **Kasuta teemasiseseid tööriistu** samaväärsuse, kvantorite, predikaadimudelite, Havel-Hakimi astmejärjendite, sekventside, Euleri/Hamiltoni tingimuste ja puude omaduste kontrollimiseks.
- **Lahenda teemasiseseid lahendusülesandeid** iga suurema teoorialehe lõpus, koos avatava lahenduskäiguga.
- **Genereeri lõputult parameetrilisi ülesandeid** prefikskuju, Havel-Hakimi, kaalutud graafide ja sekventside harjutamiseks; tulemused salvestuvad ja valed vastused liiguvad vigade päevikusse.
- **Lisa peatüki märkmeid** iga teoorialehe alla; märkmed salvestuvad brauseri kohalikku salvestusruumi.
- **Joonista graafe** interaktiivsel lõuendil — lisa tippe, servi, määra kaale, vaata naabrusmaatriksit.
- **Jooksuta algoritme** — Kruskali, Primi, Dijkstra ja Floydi–Warshalli — samm-sammult.
- **Tee teemaviktoriini** 5–15 juhusliku küsimusega kogu kursusest, kontrolltöö 1 teemadest või graafiteooriast.
- **Korda mõistekaartidega** spaced repetition põhimõttel ja märgi sõnastikus selgeks kõik olulised mõisted.
- **Kasuta spikrit** viimase hetke kompaktseks kordamiseks või printimiseks.
- **Vaata AI-genereeritud harjutus- ja kontrolltöövariante** (KT1 A-K ja KT2 B-D) eesti keeles koos ülesannete ja lahendustega.
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

## Kontroll

```powershell
cd app
.\scripts\check.ps1
```

Kontrollskript vaatab üle JavaScripti süntaksi, JSON-failid ja Git diff'i whitespace-probleemid. `data/extracted.json` on valikuline lokaalne fail; avalikku reposse seda ei lisata.

## 📲 PWA / võrguühenduseta kasutus

Rakendus sisaldab `manifest.webmanifest` faili ja `service-worker.js` võrguühenduseta kasutuse vahemälu. Ava rakendus HTTP-serveri kaudu ja lae see korra täielikult ära; seejärel pakub brauser võimalust rakendus paigaldada. Pärast esmast vahemällu salvestamist töötavad rakenduse kest, teoorialehed, tööriistad, KaTeX ja kohalik edenemine ka ilma internetita.

Kursuse ametlikke PDF-materjale ja `data/extracted.json` andmestikku ei panda PWA precache'i. AI-genereeritud kontrolltöö harjutusfailid võivad olla avalikus versioonis kaasas; lokaalses versioonis laadib brauser muud lubatud materjalid vajadusel tavapärase runtime-cache'i kaudu.

Kui arenduse ajal staatilisi faile muudad, suurenda `service-worker.js` failis `CACHE_NAME` väärtust, et brauser võtaks uue võrguühenduseta versiooni kasutusele.

## 📂 Failistruktuur

```
app/
├── index.html             # Põhilehekülg
├── manifest.webmanifest   # PWA manifest installimiseks
├── service-worker.js      # Võrguühenduseta vahemälu ja navigatsiooni varuvariant
├── icons/                 # PWA ikoonid
├── css/style.css          # Kujundus (tume teema)
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
│       ├── study-tools.js # Õppimise töölaud, vigade päevik, spikker, õpijada
│       └── topic-tools.js # Väikesed tööriistad ja lahendusülesanded teoorialehtede sees
├── vendor/katex/          # KaTeX-i kohalik varu võrguühenduseta kasutuseks
└── materjalid/            # Avalikus repos AI-genereeritud harjutusfailid; lokaalselt lubatud kursuse PDF-id
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

- **Vanilla JavaScript** — raamistikku, ehitustööriistu ega NPMi pole vaja
- **KaTeX** matemaatilise notatsiooni renderdamiseks lokaalsest `vendor/` kaustast
- **Canvas API** graafide joonistamiseks
- **LocalStorage** edenemise, mõistekaartide kordamise, õpijada ja peatüki märkmete salvestamiseks

## 📚 Allikad

- *Diskreetne matemaatika I konspekt* — Valdis Laan, täiendanud Kati Ain (28.01.2026)
- *DM I praktikumiülesannete kogu* — Reimo Palm, Valdis Laan, Kati Ain (2026K)
- AI-genereeritud kontrolltööde harjutusvariandid KT1 A-K ja KT2 B-D (kevadsemester 2026)

## Tehisintellekti kasutus

Rakenduse arenduses on kasutatud tehisintellekti programmeerimise, ideede struktureerimise ja teksti sõnastamise abivahendina. Väljundit on käsitsi üle vaadatud; tehisintellekti ei käsitleta autorina. Õppetöös tuleb tehisintellekti kasutamisel järgida kursuse õppejõu juhiseid, akadeemilise aususe põhimõtteid, privaatsust ja andmekaitset.

## 📄 Litsents

Rakenduse lähtekood on MIT-litsentsiga — vaata [LICENSE-CODE](LICENSE-CODE).

Õppematerjalid, PDF-id, kontrolltööd, lahendused ja nendest ekstraktitud tekst ei kuulu MIT-litsentsi alla — vaata [MATERIALS-LICENSE.md](MATERIALS-LICENSE.md) ja [NOTICE.md](NOTICE.md). AI-genereeritud kontrolltöö harjutusfailid on avalikus versioonis kaasas harjutusmaterjalina.

## Avaliku jagamise kontrollnimekiri

Enne GitHubi, Netlifysse, Vercelisse või ZIP-failina jagamist kontrolli:

- `materjalid/` kaustas on avalikus versioonis ainult AI-genereeritud `Kontrolltoo_1_*.pdf`, `KT2_*.pdf` ja `KT2_*.tex` harjutusfailid;
- `data/extracted.json` ei ole repos ega arhiivis;
- `.git/` kataloogi ei panda jagatavasse arhiivi;
- README-s on alles mitteametliku õppevahendi ja materjalide õiguste märkus;
- kui kasutad kursuse materjale või lahendusi, on selleks õppejõu või õiguste omaja luba.

---

> Tehtud Tartu Ülikooli informaatika tudengile.

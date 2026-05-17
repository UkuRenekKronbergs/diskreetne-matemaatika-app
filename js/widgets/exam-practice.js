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
      {
        title: 'Peano: variant G',
        body: 'Esitage Peano aritmeetika signatuur ja neli aksioomi. Tõestage $\\forall x(0\\prime\\prime+x=x\\prime\\prime)$. Väljendage ja tõestage $2+2=4$.',
        hint: 'Tee induktsioon valemiga $F(x):0\\prime\\prime+x=x\\prime\\prime$ ning kasuta liitmise rekursiooni.',
        solution: `
          <p>Signatuur on $\\langle 0; \\prime,+,\\cdot;=\\rangle$. Aksioomidest sobivad näiteks $\\neg(x\\prime=0)$, $x\\prime=y\\prime\\Rightarrow x=y$, $x+0=x$ ja $x+y\\prime=(x+y)\\prime$.</p>
          <p>Induktsioon $F(x):0\\prime\\prime+x=x\\prime\\prime$. Baas: $0\\prime\\prime+0=0\\prime\\prime$. Samm: kui $0\\prime\\prime+a=a\\prime\\prime$, siis $0\\prime\\prime+a\\prime=(0\\prime\\prime+a)\\prime=(a\\prime\\prime)\\prime=(a\\prime)\\prime\\prime$.</p>
          <p>$2+2=4$ kirjutub $0\\prime\\prime+0\\prime\\prime=0\\prime\\prime\\prime\\prime$ ning $0\\prime\\prime+0\\prime\\prime=(0\\prime\\prime+0\\prime)\\prime=((0\\prime\\prime+0)\\prime)\\prime=(0\\prime\\prime\\prime)\\prime=0\\prime\\prime\\prime\\prime$.</p>
        `,
      },
      {
        title: 'Peano: variant H',
        body: 'Esitage Peano aritmeetika signatuur ja kolm aksioomi. Tõestage $\\forall x(x+0\\prime=x\\prime)$. Väljendage ja tõestage $3+1=4$.',
        hint: 'Siin ei ole induktsiooni vaja: kasuta otse aksioome $x+0=x$ ja $x+y\\prime=(x+y)\\prime$.',
        solution: `
          <p>Signatuur on $\\langle 0; \\prime,+,\\cdot;=\\rangle$. Kolmeks aksioomiks võib võtta näiteks $x+0=x$, $x+y\\prime=(x+y)\\prime$ ja $x\\cdot0=0$.</p>
          <p>Suvalise $a$ korral $a+0\\prime=(a+0)\\prime=a\\prime$, seega $\\forall x(x+0\\prime=x\\prime)$.</p>
          <p>$3+1=4$ on $0\\prime\\prime\\prime+0\\prime=0\\prime\\prime\\prime\\prime$. Tõestus: $0\\prime\\prime\\prime+0\\prime=(0\\prime\\prime\\prime+0)\\prime=(0\\prime\\prime\\prime)\\prime=0\\prime\\prime\\prime\\prime$.</p>
        `,
      },
      {
        title: 'Peano: variant I',
        body: 'Esitage Peano aritmeetika signatuur ja neli aksioomi. Kasutades tulemust $\\forall x(0+x=x)$, tõestage $\\forall x(x\\cdot0\\prime=x)$. Väljendage ja tõestage $2\\cdot3=6$.',
        hint: 'Korrutamise rekursioon annab $x\\cdot y\\prime=x\\cdot y+x$.',
        solution: `
          <p>Signatuur on $\\langle 0; \\prime,+,\\cdot;=\\rangle$. Vaja lähevad näiteks $x+0=x$, $x+y\\prime=(x+y)\\prime$, $x\\cdot0=0$ ja $x\\cdot y\\prime=x\\cdot y+x$.</p>
          <p>Suvalise $a$ korral $a\\cdot0\\prime=a\\cdot0+a=0+a=a$, kus viimane võrdus kasutab eelnevalt tõestatud omadust $\\forall x(0+x=x)$.</p>
          <p>$2\\cdot3=6$ on $0\\prime\\prime\\cdot0\\prime\\prime\\prime=0\\prime\\prime\\prime\\prime\\prime\\prime$. Üks arvutuskäik: $0\\prime\\prime\\cdot0\\prime\\prime\\prime=(0\\prime\\prime\\cdot0\\prime\\prime)+0\\prime\\prime=((0\\prime\\prime\\cdot0\\prime)+0\\prime\\prime)+0\\prime\\prime=(0\\prime\\prime+0\\prime\\prime)+0\\prime\\prime=0\\prime\\prime\\prime\\prime+0\\prime\\prime=0\\prime\\prime\\prime\\prime\\prime\\prime$.</p>
        `,
      },
      {
        title: 'Peano: variant J',
        body: 'Esitage Peano aritmeetika signatuur ja neli aksioomi. Kasutades tulemust $\\forall x(0+x=x)$, tõestage $\\forall x(x\\cdot0\\prime=x)$. Väljendage ja tõestage $2+2=4$.',
        hint: 'Korrutamise osas kasuta P6 ja P5; liitmisel rakenda P4 kaks korda.',
        solution: `
          <p>Signatuur on $\\langle0;\\prime,+,\\cdot;=\\rangle$. Sobivad aksioomid: $x+0=x$, $x+y\\prime=(x+y)\\prime$, $x\\cdot0=0$, $x\\cdot y\\prime=x\\cdot y+x$.</p>
          <p>$a\\cdot0\\prime=a\\cdot0+a=0+a=a$, seega $\\forall x(x\\cdot0\\prime=x)$.</p>
          <p>$2+2=4$: $0\\prime\\prime+0\\prime\\prime=(0\\prime\\prime+0\\prime)\\prime=((0\\prime\\prime+0)\\prime)\\prime=((0\\prime\\prime)\\prime)\\prime=0\\prime\\prime\\prime\\prime$.</p>
        `,
      },
      {
        title: 'Peano: variant K',
        body: 'Esitage Peano aritmeetika signatuur ja neli aksioomi. Tõestage $\\forall x(x+0\\prime=x\\prime)$. Väljendage ja tõestage $1+3=4$.',
        hint: '$x+0\\prime=(x+0)\\prime$ ja $x+0=x$.',
        solution: `
          <p>Signatuur: $\\langle0;\\prime,+,\\cdot;=\\rangle$. Vaja on näiteks P1, P2, P3 ja P4.</p>
          <p>Suvalise $a$ korral $a+0\\prime=(a+0)\\prime=a\\prime$. Seega $\\forall x(x+0\\prime=x\\prime)$.</p>
          <p>$1+3=4$: $0\\prime+0\\prime\\prime\\prime=(0\\prime+0\\prime\\prime)\\prime=((0\\prime+0\\prime)\\prime)\\prime=(((0\\prime+0)\\prime)\\prime)\\prime=0\\prime\\prime\\prime\\prime$.</p>
        `,
      },
      {
        title: 'Peano: variant L',
        body: 'Esitage Peano aritmeetika signatuur ja neli aksioomi. Tõestage $\\forall x(x\\cdot0\\prime\\prime=x+x)$. Väljendage ja tõestage $2\\cdot2=4$.',
        hint: 'Ava $0\\prime\\prime$ korrutamise rekursiooniga kaks korda.',
        solution: `
          <p>Kasuta aksioome $x+0=x$, $x+y\\prime=(x+y)\\prime$, $x\\cdot0=0$ ja $x\\cdot y\\prime=x\\cdot y+x$.</p>
          <p>$a\\cdot0\\prime\\prime=a\\cdot0\\prime+a=(a\\cdot0+a)+a=(0+a)+a=a+a$.</p>
          <p>$2\\cdot2=4$: $0\\prime\\prime\\cdot0\\prime\\prime=(0\\prime\\prime\\cdot0\\prime)+0\\prime\\prime=(0+0\\prime\\prime)+0\\prime\\prime=0\\prime\\prime+0\\prime\\prime=0\\prime\\prime\\prime\\prime$.</p>
        `,
      },
      {
        title: 'Peano: variant M',
        body: 'Esitage Peano aritmeetika signatuur ja neli aksioomi. Tõestage induktsiooniga $\\forall x(0\\prime\\cdot x=x)$. Väljendage ja tõestage $3+1=4$.',
        hint: 'Induktsiooni sammus kasuta $0\\prime\\cdot a\\prime=0\\prime\\cdot a+0\\prime$.',
        solution: `
          <p>Signatuur on $\\langle0;\\prime,+,\\cdot;=\\rangle$; sobivad P3, P4, P5, P6 ja induktsiooniskeem.</p>
          <p>Baas: $0\\prime\\cdot0=0$. Samm: kui $0\\prime\\cdot a=a$, siis $0\\prime\\cdot a\\prime=0\\prime\\cdot a+0\\prime=a+0\\prime=a\\prime$. Seega $\\forall x(0\\prime\\cdot x=x)$.</p>
          <p>$3+1=4$: $0\\prime\\prime\\prime+0\\prime=(0\\prime\\prime\\prime+0)\\prime=(0\\prime\\prime\\prime)\\prime=0\\prime\\prime\\prime\\prime$.</p>
        `,
      },
      {
        title: 'Peano: variant N',
        body: 'Esitage Peano aritmeetika signatuur ja neli aksioomi. Tõestage $\\forall x(x+0\\prime\\prime=x\\prime\\prime)$. Väljendage ja tõestage $2\\cdot1=2$.',
        hint: 'Liitmisel kasuta P4 kaks korda; korrutamisel $x\\cdot0\\prime=x\\cdot0+x$.',
        solution: `
          <p>Suvalise $a$ korral $a+0\\prime\\prime=(a+0\\prime)\\prime=((a+0)\\prime)\\prime=(a\\prime)\\prime=a\\prime\\prime$.</p>
          <p>$2\\cdot1=2$: $0\\prime\\prime\\cdot0\\prime=0\\prime\\prime\\cdot0+0\\prime\\prime=0+0\\prime\\prime=0\\prime\\prime$, kasutades P6, P5 ja tulemust $0+x=x$.</p>
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
      {
        title: 'Järeldumine: variant G',
        body: 'Defineerige predikaatarvutuse valemite järeldumine. Tõestage $\\forall xF(x)\\&\\exists xG(x) \\models \\exists x(F(x)\\&G(x))$ ning näidake, et vastupidine järeldumine üldjuhul ei kehti.',
        hint: 'Tõestuses kasuta $\\exists xG(x)$ tunnistajat; vastupidise jaoks piisab kaheelemendilisest mudelist.',
        solution: `
          <p>$F_1,\\ldots,F_n\\models G$ tähendab, et igas interpretatsioonis ja vabade muutujate igal väärtustusel, kus kõik $F_i$ on tõesed, on tõene ka $G$.</p>
          <p>Kui $\\forall xF(x)$ ja $\\exists xG(x)$ on tõesed, siis leidub element $a$, mille korral $G(a)$. Üldisusest saame ka $F(a)$, seega $F(a)\\&G(a)$ ja järelikult $\\exists x(F(x)\\&G(x))$.</p>
          <p>Vastupidise vastumudel: kandja $\\{a,b\\}$, $F(a)=1$, $G(a)=1$, $F(b)=0$, $G(b)=0$. Siis $\\exists x(F(x)\\&G(x))$ on tõene, kuid $\\forall xF(x)$ on väär.</p>
        `,
      },
      {
        title: 'Kehtestatavus: variant H',
        body: 'Defineerige predikaatarvutuse valemi kehtestatavus. Näidake, et $\\exists xP(x)\\&\\exists x\\neg P(x)$ on kehtestatav, kuid ei ole samaselt tõene.',
        hint: 'Ühes mudelis peab $P$ olema mõnel elemendil tõene ja mõnel väär; teises mudelis lase valemil läbi kukkuda.',
        solution: `
          <p>Valem on kehtestatav, kui ta on tõene vähemalt ühes interpretatsioonis oma vabade muutujate mingitel väärtustel.</p>
          <p>Kehtestatavuse mudel: kandja $\\{a,b\\}$, $P(a)=1$ ja $P(b)=0$. Siis leidub nii $P$-element kui ka mitte-$P$-element.</p>
          <p>Valem ei ole samaselt tõene, sest üheelemendilises mudelis $\\{a\\}$, kus $P(a)=1$, on $\\exists x\\neg P(x)$ väär.</p>
        `,
      },
      {
        title: 'Järeldumine: variant I',
        body: 'Defineerige predikaatarvutuse valemite järeldumine. Tõestage $\\forall x(F(x)\\Rightarrow G(x)) \\models \\exists xF(x)\\Rightarrow\\exists xG(x)$ ning näidake, et vastupidine järeldumine üldjuhul ei kehti.',
        hint: 'Kui $\\exists xF(x)$ on tõene, vali tunnistaja ja kasuta universaalset implikatsiooni.',
        solution: `
          <p>Eeldame, et $\\forall x(F(x)\\Rightarrow G(x))$ on tõene. Kui $\\exists xF(x)$ on väär, on implikatsioon tõene. Kui $\\exists xF(x)$ on tõene, leidub $a$, mille korral $F(a)$. Universaalsest eeldusest saame $F(a)\\Rightarrow G(a)$, järelikult $G(a)$ ja seega $\\exists xG(x)$.</p>
          <p>Vastupidise vastumudel: kandja $\\{a,b\\}$, $F(a)=1$, $G(a)=0$, $F(b)=0$, $G(b)=1$. Siis $\\exists xF(x)\\Rightarrow\\exists xG(x)$ on tõene, aga $\\forall x(F(x)\\Rightarrow G(x))$ on väär, sest $a$ rikub implikatsiooni.</p>
        `,
      },
      {
        title: 'Järeldumine: variant J',
        body: 'Defineerige predikaatarvutuse valemite järeldumine. Tõestage $\\forall x(F(x)\\Rightarrow G(x)) \\models \\exists xF(x)\\Rightarrow\\exists xG(x)$ ning näidake, et vastupidine järeldumine ei kehti.',
        hint: 'Kui $\\exists xF(x)$ on tõene, vali tunnistaja $a$ ja kasuta universaalset eeldust.',
        solution: `
          <p>Kui $\\exists xF(x)$ on väär, on implikatsioon tõene. Kui leidub $a$, mille korral $F(a)$, siis eeldusest $\\forall x(F(x)\\Rightarrow G(x))$ saame $G(a)$, seega $\\exists xG(x)$.</p>
          <p>Vastumudel pöördsuunale: $M=\\{a,b\\}$, $F(a)=1$, $G(a)=0$, $F(b)=0$, $G(b)=1$.</p>
        `,
      },
      {
        title: 'Kehtestatavus: variant K',
        body: 'Defineerige predikaatarvutuse valemi kehtestatavus. Näidake, et $\\exists x\\forall y(R(x,y)\\lor P(y))$ on kehtestatav, kuid ei ole samaselt tõene.',
        hint: 'Üheelemendiline mudel piisab nii positiivseks näiteks kui vastunäiteks.',
        solution: `
          <p>Valem on kehtestatav, kui leidub interpretatsioon ja vabade muutujate väärtustus, millel valem on tõene.</p>
          <p>Kehtestatav: $M=\\{a\\}$, $R(a,a)=1$, $P(a)=0$. Mitte samaselt tõene: $M=\\{a\\}$, $R(a,a)=0$, $P(a)=0$, siis iga võimalik tunnistaja kukub läbi.</p>
        `,
      },
      {
        title: 'Järeldumine: variant L',
        body: 'Tõestage, et $\\exists x\\forall yH(x,y) \\models \\forall y\\exists xH(x,y)$, kuid vastupidine järeldumine üldjuhul ei kehti.',
        hint: 'Esisuunas kasuta sama tunnistajat iga $y$ jaoks; vastupidiseks sobib seos $x>y$ naturaalarvudel.',
        solution: `
          <p>Kui leidub $a$, mille korral iga $b$ jaoks $H(a,b)$, siis iga konkreetse $y=b$ jaoks saab eksistentsikvantori tunnistajaks võtta sama $a$.</p>
          <p>Pöördsuuna vastunäide: $M=\\mathbb{N}$ ja $H(x,y)$ tähendab $x>y$. Iga $y$ jaoks leidub $x=y+1$, aga ühte kõigist suuremat naturaalarvu ei leidu.</p>
        `,
      },
      {
        title: 'Järeldumine: variant M',
        body: 'Defineerige järeldumine. Tõestage $\\forall xF(x) \\models \\exists xF(x)$ ning näidake, et vastupidine järeldumine üldjuhul ei kehti.',
        hint: 'Predikaatarvutuse interpretatsiooni põhihulk on mittetühi.',
        solution: `
          <p>Kui $\\forall xF(x)$ kehtib, siis iga põhihulga elemendi korral kehtib $F$. Kuna põhihulk on mittetühi, leidub vähemalt üks element, mis on $\\exists xF(x)$ tunnistaja.</p>
          <p>Vastumudel pöördsuunale: $M=\\{a,b\\}$, $F(a)=1$, $F(b)=0$. Siis $\\exists xF(x)$ on tõene, kuid $\\forall xF(x)$ väär.</p>
        `,
      },
      {
        title: 'Kehtestatavus: variant N',
        body: 'Defineerige kehtestatavus. Näidake, et $\\exists x(P(x)\\&\\forall yR(x,y))$ on kehtestatav, kuid ei ole samaselt tõene.',
        hint: 'Muuda üheelemendilises mudelis ainult $P(a)$ väärtust.',
        solution: `
          <p>Kehtestatav mudel: $M=\\{a\\}$, $P(a)=1$ ja $R(a,a)=1$. Siis $x=a$ sobib tunnistajaks.</p>
          <p>Mitte samaselt tõene: $M=\\{a\\}$, $P(a)=0$ ja $R(a,a)=1$. Siis konjunktsioon $P(a)\\&\\forall yR(a,y)$ on väär.</p>
        `,
      },
      {
        title: 'Järeldumine: variant N',
        body: 'Tõestage $\\forall x(F(x)\\Rightarrow G(x)) \\models \\neg\\exists xG(x)\\Rightarrow\\neg\\exists xF(x)$ ning näidake, et vastupidine järeldumine üldjuhul ei kehti.',
        hint: 'Kasuta vastuväitelist mõtlemist: kui leiduks $F$-element, siis leiduks ka $G$-element.',
        solution: `
          <p>Eelda $\\neg\\exists xG(x)$. Kui leiduks $a$, mille korral $F(a)$, siis universaalsest eeldusest saaks $G(a)$, vastuolu. Seega $\\neg\\exists xF(x)$.</p>
          <p>Pöördsuuna vastumudel: $M=\\{a,b\\}$, $G(a)=1$, $G(b)=0$, $F(a)=0$, $F(b)=1$. Implikatsioon $\\neg\\exists xG(x)\\Rightarrow\\neg\\exists xF(x)$ on tõene, kuid $F(b)\\Rightarrow G(b)$ on väär.</p>
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
      {
        title: 'Sekvents: variant G',
        body: 'Sõnastage sekventsiaalse lausearvutuse korrektsuse teoreem. Tuletage $P\\Rightarrow Q, Q\\Rightarrow R \\vdash P\\Rightarrow R$.',
        hint: 'Vii parempoolne implikatsioon sisse: eelda lisaks $P$ ja tuleta järjest $Q$, siis $R$.',
        solution: `
          <p>Korrektsus: kui sekvents on süsteemis tuletatav, siis tema valemkuju on semantiliselt tõene.</p>
          <p>Olgu $\\Gamma=\\{P\\Rightarrow Q,Q\\Rightarrow R\\}$. Aksioomidega saame $\\Gamma,P\\vdash P$, $\\Gamma,P\\vdash P\\Rightarrow Q$ ja $\\Gamma,P\\vdash Q\\Rightarrow R$. Reegliga $\\Rightarrow\\vdash$ saame esmalt $\\Gamma,P\\vdash Q$, seejärel $\\Gamma,P\\vdash R$.</p>
          <p>Lõpuks annab reegel $\\vdash\\Rightarrow$ sekventsi $\\Gamma\\vdash P\\Rightarrow R$.</p>
        `,
      },
      {
        title: 'Sekvents: variant H',
        body: 'Sõnastage sekventsiaalse lausearvutuse täielikkuse teoreem. Tuletage $P\\Rightarrow R, Q\\Rightarrow R, P\\lor Q \\vdash R$.',
        hint: 'Tee kaks haru: $P$-harus kasuta $P\\Rightarrow R$, $Q$-harus kasuta $Q\\Rightarrow R$.',
        solution: `
          <p>Täielikkus: iga semantiliselt kehtiv sekvents on formaalses süsteemis tuletatav.</p>
          <p>Haru 1: eeldustest $P$ ja $P\\Rightarrow R$ saame reegliga $\\Rightarrow\\vdash$ tulemuse $R$. Haru 2: eeldustest $Q$ ja $Q\\Rightarrow R$ saame samuti $R$.</p>
          <p>Kuna mõlemas harus järeldub $R$, annab vasakpoolse disjunktsiooni reegel eeldusest $P\\lor Q$ sekventsi $P\\Rightarrow R,Q\\Rightarrow R,P\\lor Q\\vdash R$.</p>
        `,
      },
      {
        title: 'Sekvents: variant I',
        body: 'Sõnastage sekventsiaalse lausearvutuse korrektsuse teoreem. Tuletage $P\\&Q \\vdash Q\\&P$.',
        hint: 'Kasuta vasakul konjunktsiooni, et saada eraldi $P$ ja $Q$, ning paremal konjunktsiooni, et need vahetatud järjekorras kokku panna.',
        solution: `
          <p>Korrektsus tähendab, et iga tuletatav sekvents on semantiliselt kehtiv.</p>
          <p>Aksioomid annavad $P,Q\\vdash Q$ ja $P,Q\\vdash P$. Parempoolse konjunktsiooni reegliga saame $P,Q\\vdash Q\\&P$.</p>
          <p>Vasakpoolse konjunktsiooni reegel pakib eeldused kokku ning annab $P\\&Q\\vdash Q\\&P$.</p>
        `,
      },
      {
        title: 'Sekvents: variant J',
        body: 'Sõnastage korrektsuse teoreem. Tuletage $(P\\&Q)\\Rightarrow R, P, Q \\vdash R$.',
        hint: 'Pane $P$ ja $Q$ paremal konjunktsiooniks kokku ning kasuta implikatsiooni vasakul.',
        solution: `
          <p>Olgu $\\Gamma=\\{(P\\&Q)\\Rightarrow R,P,Q\\}$. Aksioomidest $\\Gamma\\vdash P$ ja $\\Gamma\\vdash Q$, seega $\\Gamma\\vdash P\\&Q$.</p>
          <p>Aksioomist $\\Gamma\\vdash(P\\&Q)\\Rightarrow R$ ning reeglist $\\Rightarrow\\vdash$ saame $\\Gamma\\vdash R$.</p>
        `,
      },
      {
        title: 'Sekvents: variant K',
        body: 'Sõnastage täielikkuse teoreem. Tuletage $P\\Rightarrow Q, Q\\Rightarrow R \\vdash P\\Rightarrow R$.',
        hint: 'Tee sama ahel: eelda $P$, saa $Q$, siis $R$, lõpuks vii implikatsioon paremale.',
        solution: `
          <p>Olgu $\\Gamma=\\{P\\Rightarrow Q,Q\\Rightarrow R\\}$. Tuletame $\\Gamma,P\\vdash Q$ ja sellest $\\Gamma,P\\vdash R$.</p>
          <p>Reegliga $\\vdash\\Rightarrow$ saame $\\Gamma\\vdash P\\Rightarrow R$.</p>
        `,
      },
      {
        title: 'Sekvents: variant L',
        body: 'Sõnastage korrektsuse teoreem. Tuletage $\\neg P\\lor Q \\vdash P\\Rightarrow Q$.',
        hint: 'Kasuta vasakul disjunktsiooni kahte haru: $\\neg P$ ja $Q$.',
        solution: `
          <p>Haru $Q$: eeldustest $Q,P$ saame aksioomiga $Q$, seega $Q\\vdash P\\Rightarrow Q$.</p>
          <p>Haru $\\neg P$: eeldustest $\\neg P,P$ saab vastuolu kaudu $Q$, seega $\\neg P\\vdash P\\Rightarrow Q$. Disjunktsiooni vasakreegel annab $\\neg P\\lor Q\\vdash P\\Rightarrow Q$.</p>
        `,
      },
      {
        title: 'Sekvents: variant M',
        body: 'Sõnastage täielikkuse teoreem. Tuletage $P\\&Q \\vdash Q\\&P$.',
        hint: 'Ava vasakul konjunktsioon ja kasuta parempoolset konjunktsiooni.',
        solution: `
          <p>Aksioomid annavad $P,Q\\vdash Q$ ja $P,Q\\vdash P$. Reegliga $\\vdash\\&$ saame $P,Q\\vdash Q\\&P$.</p>
          <p>Reegliga $\\&\\vdash$ saame $P\\&Q\\vdash Q\\&P$.</p>
        `,
      },
      {
        title: 'Sekvents: variant N',
        body: 'Sõnastage korrektsuse teoreem. Tuletage $P\\Rightarrow(Q\\Rightarrow R) \\vdash Q\\Rightarrow(P\\Rightarrow R)$.',
        hint: 'Parempoolsete implikatsioonide jaoks eelda järjest $Q$ ja $P$.',
        solution: `
          <p>Olgu $\\Gamma=\\{P\\Rightarrow(Q\\Rightarrow R)\\}$. Eeldustest $\\Gamma,Q,P$ saame $P$ ja $P\\Rightarrow(Q\\Rightarrow R)$, seega $Q\\Rightarrow R$.</p>
          <p>Koos eeldusega $Q$ saame $R$. Seejärel kaks korda reegel $\\vdash\\Rightarrow$: esmalt $\\Gamma,Q\\vdash P\\Rightarrow R$, siis $\\Gamma\\vdash Q\\Rightarrow(P\\Rightarrow R)$.</p>
        `,
      },
    ],
    prefix: [
      {
        title: 'Prefikskuju: implikatsiooni eitus',
        body: 'Teisendage valem $\\neg\\exists x(\\forall yP(y,x)\\Rightarrow(R(x)\\lor\\exists zS(z)))$ prefikskujule, kus eitused on atomaarsete valemite ees ja implikatsiooni ei esine.',
        hint: 'Kasuta samaväärsust $\\neg(A\\Rightarrow B)\\equiv A\\&\\neg B$ ning seejärel kvantorite eitamise reegleid.',
        solution: `
          <p>$\\neg\\exists x(\\forall yP(y,x)\\Rightarrow(R(x)\\lor\\exists zS(z)))\\equiv\\forall x\\neg(\\forall yP(y,x)\\Rightarrow(R(x)\\lor\\exists zS(z)))$.</p>
          <p>Implikatsiooni eituse järel: $\\forall x(\\forall yP(y,x)\\&\\neg(R(x)\\lor\\exists zS(z)))$.</p>
          <p>De Morgani ja kvantorieituste abil saame $\\forall x(\\forall yP(y,x)\\&\\neg R(x)\\&\\forall z\\neg S(z))$, prefikskujul $\\forall x\\forall y\\forall z(P(y,x)\\&\\neg R(x)\\&\\neg S(z))$.</p>
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
      {
        title: 'Prefikskuju: variant G',
        body: 'Defineerige predikaatarvutuse valem. Teisendage $\\neg\\forall x(\\exists yP(x,y)\\lor\\forall zQ(z,x))$ prefikskujule, kus eitused on atomaarsete valemite ees ja implikatsiooni ei esine.',
        hint: '$\\neg\\forall x$ muutub $\\exists x\\neg$ ning disjunktsiooni eitus muutub konjunktsiooniks.',
        solution: `
          <p>Predikaatarvutuse valemid saadakse atomaarsetest valemitest loogiliste tehete ja kvantorite abil.</p>
          <p>$\\neg\\forall x(\\exists yP(x,y)\\lor\\forall zQ(z,x))\\equiv\\exists x\\neg(\\exists yP(x,y)\\lor\\forall zQ(z,x))$.</p>
          <p>De Morgani seaduste ja kvantorieituste järel saame $\\exists x(\\forall y\\neg P(x,y)\\&\\exists z\\neg Q(z,x))$, prefikskujul $\\exists x\\forall y\\exists z(\\neg P(x,y)\\&\\neg Q(z,x))$.</p>
        `,
      },
      {
        title: 'Prefikskuju: variant H',
        body: 'Defineerige prefikskuju. Teisendage $\\forall x(P(x)\\Rightarrow\\exists y(Q(y)\\&\\neg R(x,y)))$ prefikskujule.',
        hint: 'Asenda implikatsioon disjunktsiooniga ja too $\\exists y$ üle disjunktsiooni.',
        solution: `
          <p>Prefikskuju on valem kujul $Q_1x_1\\cdots Q_nx_nF\\prime$, kus kõik kvantorid on alguses ja maatriks on kvantoriteta.</p>
          <p>$P(x)\\Rightarrow\\exists y(Q(y)\\&\\neg R(x,y))$ on samaväärne valemiga $\\neg P(x)\\lor\\exists y(Q(y)\\&\\neg R(x,y))$.</p>
          <p>Prefikskuju: $\\forall x\\exists y(\\neg P(x)\\lor(Q(y)\\&\\neg R(x,y)))$.</p>
        `,
      },
      {
        title: 'Prefikskuju: variant I',
        body: 'Defineerige predikaatarvutuse valem. Teisendage $\\neg\\exists x\\forall y(P(x,y)\\Rightarrow Q(y))$ prefikskujule.',
        hint: 'Eita kvantorid sissepoole ja kasuta $\\neg(A\\Rightarrow B)\\equiv A\\&\\neg B$.',
        solution: `
          <p>Predikaatarvutuse valemid moodustatakse atomaarsetest valemitest eituse, konjunktsiooni, disjunktsiooni, implikatsiooni, ekvivalentsi ning üldisus- ja olemasolukvantori abil.</p>
          <p>$\\neg\\exists x\\forall y(P(x,y)\\Rightarrow Q(y))\\equiv\\forall x\\neg\\forall y(P(x,y)\\Rightarrow Q(y))\\equiv\\forall x\\exists y\\neg(P(x,y)\\Rightarrow Q(y))$.</p>
          <p>Implikatsiooni eituse järel on prefikskuju $\\forall x\\exists y(P(x,y)\\&\\neg Q(y))$.</p>
        `,
      },
      {
        title: 'Prefikskuju: variant J',
        body: 'Defineerige prefikskuju. Teisendage $\\neg\\forall x(\\exists yP(x,y)\\lor\\forall zQ(z))$ prefikskujule.',
        hint: 'Eita üldisuskvantor ja seejärel disjunktsioon.',
        solution: `
          <p>$\\neg\\forall x(\\exists yP(x,y)\\lor\\forall zQ(z))\\equiv\\exists x\\neg(\\exists yP(x,y)\\lor\\forall zQ(z))$.</p>
          <p>Edasi $\\exists x(\\forall y\\neg P(x,y)\\&\\exists z\\neg Q(z))$, prefikskujul $\\exists x\\forall y\\exists z(\\neg P(x,y)\\&\\neg Q(z))$.</p>
        `,
      },
      {
        title: 'Prefikskuju: variant K',
        body: 'Defineerige predikaatarvutuse valem. Teisendage $\\exists xP(x)\\Rightarrow\\forall y(Q(y)\\lor\\neg R(x,y))$ prefikskujule.',
        hint: 'Asenda implikatsioon disjunktsiooniga; $x$ jääb teises pooles vabaks nagu algvalemis.',
        solution: `
          <p>Implikatsiooni eemaldamisel saame $\\neg\\exists xP(x)\\lor\\forall y(Q(y)\\lor\\neg R(x,y))$.</p>
          <p>Kvantorieituse ja prefiksisse toomise järel üks sobiv kuju on $\\forall u\\forall y(\\neg P(u)\\lor Q(y)\\lor\\neg R(x,y))$, kus seotuks nimetatud $u$ väldib kokkupõrget vaba $x$-iga.</p>
        `,
      },
      {
        title: 'Prefikskuju: variant L',
        body: 'Defineerige prefikskuju. Teisendage $\\neg\\exists x((P(x)\\&\\forall yQ(y))\\Rightarrow\\exists zR(x,z))$ prefikskujule.',
        hint: 'Kõigepealt $\\neg\\exists x$ ja siis implikatsiooni eitus.',
        solution: `
          <p>$\\neg\\exists x(A\\Rightarrow B)\\equiv\\forall x\\neg(A\\Rightarrow B)\\equiv\\forall x(A\\&\\neg B)$.</p>
          <p>Siin saame $\\forall x(P(x)\\&\\forall yQ(y)\\&\\forall z\\neg R(x,z))$, prefikskujul $\\forall x\\forall y\\forall z(P(x)\\&Q(y)\\&\\neg R(x,z))$.</p>
        `,
      },
      {
        title: 'Prefikskuju: variant M',
        body: 'Defineerige predikaatarvutuse valem. Teisendage $\\neg(\\exists xP(x)\\&\\forall y(Q(y)\\Rightarrow R(y)))$ prefikskujule.',
        hint: 'Kasuta De Morgani seadust ja implikatsiooni eitust.',
        solution: `
          <p>$\\neg(\\exists xP(x)\\&\\forall y(Q(y)\\Rightarrow R(y)))\\equiv\\forall x\\neg P(x)\\lor\\exists y\\neg(Q(y)\\Rightarrow R(y))$.</p>
          <p>Implikatsiooni eitus annab $\\forall x\\neg P(x)\\lor\\exists y(Q(y)\\&\\neg R(y))$, prefikskujul $\\forall x\\exists y(\\neg P(x)\\lor(Q(y)\\&\\neg R(y)))$.</p>
        `,
      },
      {
        title: 'Prefikskuju: variant N',
        body: 'Defineerige prefikskuju. Teisendage $\\forall x(\\exists yP(x,y)\\&Q(x))\\Rightarrow\\forall zR(z)$ prefikskujule.',
        hint: 'Implikatsioonist saab disjunktsioon ning vasaku poole eitus läheb konjunktsiooni sisse.',
        solution: `
          <p>$A\\Rightarrow B\\equiv\\neg A\\lor B$, seega $\\neg\\forall x(\\exists yP(x,y)\\&Q(x))\\lor\\forall zR(z)$.</p>
          <p>See on $\\exists x(\\forall y\\neg P(x,y)\\lor\\neg Q(x))\\lor\\forall zR(z)$, prefikskujul $\\exists x\\forall y\\forall z(\\neg P(x,y)\\lor\\neg Q(x)\\lor R(z))$.</p>
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
      {
        title: 'Signatuur: variant G',
        body: 'Defineerige signatuuri interpretatsioon. Põhihulgal $\\mathbb{N}$ ja signatuuris $\\langle\\,;+,\\cdot;=\\rangle$ väljendage: $x=0$, $x=1$, $x$ on ruutarv, $x$ jagab $y$-d, $x$ on kordarv.',
        hint: 'Defineeri null ja üks nende universaalsete omadustega; jaguvuse jaoks kasuta tunnistajat.',
        solution: `
          <p>Signatuuri interpretatsioon on paar $\\alpha=\\langle M_\\alpha;I_\\alpha\\rangle$, kus $M_\\alpha$ on mittetühi põhihulk ning $I_\\alpha$ tõlgendab konstantsümbolid elementideks, funktsionaalsümbolid funktsioonideks ja predikaatsümbolid predikaatideks.</p>
          <p>Olgu $Z(t):\\equiv\\forall u(t+u=u)$ ja $U(t):\\equiv\\forall u(u\\cdot t=u)$. Siis $x=0$ on $Z(x)$ ja $x=1$ on $U(x)$.</p>
          <p>Ruutarv: $\\exists y(y\\cdot y=x)$. Jaguvus: $\\exists z(x\\cdot z=y)$. Kordarv: $\\neg Z(x)\\&\\neg U(x)\\&\\exists a\\exists b(\\neg U(a)\\&\\neg U(b)\\&a\\cdot b=x)$.</p>
        `,
      },
      {
        title: 'Signatuur: variant H graafidel',
        body: 'Defineerige signatuur. Valige minimaalne signatuur suunamata graafi jaoks ning väljendage: graafil ei ole silmuseid; tipp $x$ on isoleeritud; graafil leidub kolmnurk; igal tipul leidub naaber.',
        hint: 'Piisab binaarsest servapredikaadist $E$ ja võrdusest.',
        solution: `
          <p>Signatuur on järjestatud kolmik $\\sigma=\\langle C;F;P\\rangle$, kus $C$ on konstantsümbolite hulk, $F$ funktsionaalsümbolite hulk ja $P$ mittetühi predikaatsümbolite hulk.</p>
          <p>Graafi jaoks sobib $\\sigma=\\langle\\,;\\,;=,E\\rangle$, kus põhihulk on tippude hulk ja $E(u,v)$ tähendab, et tippude $u$ ja $v$ vahel on serv.</p>
          <p>Silmuseid pole: $\\forall x\\neg E(x,x)$. $x$ isoleeritud: $\\forall y\\neg E(x,y)$. Kolmnurk: $\\exists x\\exists y\\exists z(x\\neq y\\&x\\neq z\\&y\\neq z\\&E(x,y)\\&E(y,z)\\&E(z,x))$. Igal tipul on naaber: $\\forall x\\exists y(x\\neq y\\&E(x,y))$.</p>
        `,
      },
      {
        title: 'Signatuur: variant I hulkadel',
        body: 'Defineerige signatuur. Põhihulgal $\\mathcal{P}(\\mathbb{N})$ ja signatuuris $\\langle\\,;\\cup,\\cap;=\\rangle$ väljendage: $x$ ja $y$ on ühisosata; $x\\cup y=\\mathbb{N}$; $x$ on $y$ pärisalamhulk; $x$ ja $y$ jaotavad $\\mathbb{N}$ kaheks osaks.',
        hint: 'Tühihulga ja universaalhulga saab defineerida ainult $\\cup$, $\\cap$ ja võrdusega.',
        solution: `
          <p>Olgu $E(t):\\equiv\\forall z(t\\cup z=z)$ ehk $t=\\emptyset$ ja $N(t):\\equiv\\forall z(t\\cup z=t)$ ehk $t=\\mathbb{N}$.</p>
          <p>Ühisosata: $E(x\\cap y)$. Ühend on kogu $\\mathbb{N}$: $N(x\\cup y)$. Pärisalamhulk: $x\\cap y=x\\&\\neg(x=y)$.</p>
          <p>Kaheks osaks jaotus: $E(x\\cap y)\\&N(x\\cup y)\\&\\neg E(x)\\&\\neg E(y)$.</p>
        `,
      },
      {
        title: 'Signatuur: variant J naturaalarvudel',
        body: 'Defineerige signatuur. Põhihulgal $\\mathbb{N}$ ja signatuuris $\\langle0;+,\\cdot;=,\\leq\\rangle$ väljendage: $x\\neq0$, $x<y$, $x$ on ruutarv, $x$ jagab $y$-d.',
        hint: 'Ruutarvu ja jaguvuse jaoks kasuta eksistentsikvantorit.',
        solution: `
          <p>Signatuur on $\\sigma=\\langle C;F;P\\rangle$, kus $C$ on konstantsümbolid, $F$ funktsionaalsümbolid ja $P$ predikaatsümbolid.</p>
          <p>$x\\neq0$: $\\neg(x=0)$. $x<y$: $x\\leq y\\&\\neg(x=y)$. Ruutarv: $\\exists z(z\\cdot z=x)$. Jaguvus: $\\exists z(x\\cdot z=y)$.</p>
        `,
      },
      {
        title: 'Signatuur: variant K suunatud graafil',
        body: 'Defineerige signatuuri interpretatsioon. Valige signatuur suunatud graafi jaoks ja väljendage: igal tipul on väljuv naaber; graaf on sümmeetriline; tipp $x$ on isoleeritud.',
        hint: 'Kasuta kahekohalist predikaati $E(u,v)$ kaare jaoks.',
        solution: `
          <p>Sobib $\\sigma=\\langle\\,;\\,;=,E\\rangle$, kandja on tippude hulk ja $E(u,v)$ tähendab kaart $u$-st $v$-sse.</p>
          <p>Igal tipul väljuv naaber: $\\forall x\\exists yE(x,y)$. Sümmeetriline: $\\forall x\\forall y(E(x,y)\\Rightarrow E(y,x))$. $x$ isoleeritud: $\\forall y(\\neg E(x,y)\\&\\neg E(y,x))$.</p>
        `,
      },
      {
        title: 'Signatuur: variant L hulkadel',
        body: 'Defineerige signatuur. Põhihulgal $\\mathcal{P}(\\mathbb{N})$ ja signatuuris $\\langle\\,;\\cup,\\cap;=\\rangle$ väljendage: $x\\cap y=\\emptyset$, $x\\cup y=\\mathbb{N}$, $x\\subsetneq y$, $x$ ja $y$ moodustavad $\\mathbb{N}$ lahutuse kaheks osaks.',
        hint: 'Kasuta abivalemeid tühihulga ja universaalhulga jaoks.',
        solution: `
          <p>Olgu $E(t):\\equiv\\forall u(t\\cup u=u)$ ja $N(t):\\equiv\\forall u(t\\cup u=t)$.</p>
          <p>$x\\cap y=\\emptyset$: $E(x\\cap y)$. $x\\cup y=\\mathbb{N}$: $N(x\\cup y)$. $x\\subsetneq y$: $x\\cap y=x\\&\\neg(x=y)$. Lahutus kaheks osaks: $E(x\\cap y)\\&N(x\\cup y)$.</p>
        `,
      },
      {
        title: 'Signatuur: variant M funktsioonil',
        body: 'Defineerige signatuuri interpretatsioon. Valige signatuur funktsiooni $f:\\mathbb{N}\\to\\mathbb{N}$ jaoks ja väljendage: $f$ on injektiivne; $f$ on rangelt kasvav; leidub perioodiga 2 punkt.',
        hint: 'Kasuta funktsionaalsümbolit $f$ ja predikaati $\\leq$.',
        solution: `
          <p>Sobib $\\sigma=\\langle\\,;f;=,\\leq\\rangle$ üle $\\mathbb{N}$. Tähista $u<v$ valemiga $u\\leq v\\&\\neg(u=v)$.</p>
          <p>Injektiivne: $\\forall x\\forall y(f(x)=f(y)\\Rightarrow x=y)$. Rangelt kasvav: $\\forall x\\forall y(x<y\\Rightarrow f(x)<f(y))$. Periood 2: $\\exists x(f(f(x))=x)$.</p>
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

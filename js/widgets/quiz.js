/* ===== Quiz, Flashcards, Glossary widgets ===== */

(function () {
  'use strict';

  const GLOSSARY_LEARNED_KEY = 'dm_glossary_learned_v1';
  const FLASH_SRS_KEY = 'dm_flashcard_srs_v1';
  const QUIZ_RESULT_KEY = 'dm_quiz_last_v1';

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
    {
      tags: ['loogika', 'kt1'],
      q: 'Mida tähendab, et lausearvutuse valemid $F$ ja $G$ on samaväärsed?',
      options: ['Neil on sama peatehe', 'Neil on igal väärtustusel sama tõeväärtus', 'Neil on sama arv sulge', 'Mõlemad sisaldavad samu muutujaid'],
      correct: 1,
      exp: 'Samaväärsus $F\\equiv G$ tähendab, et $F$ ja $G$ tõeväärtused langevad kokku igal neis esinevate muutujate väärtustusel.',
    },
    {
      tags: ['loogika', 'kt1'],
      q: 'Milline valem on samaselt väär?',
      options: ['$A\\lor\\neg A$', '$A\\Rightarrow A$', '$A\\&\\neg A$', '$A\\lor B$'],
      correct: 2,
      exp: '$A\\&\\neg A$ ei saa ühelgi väärtustusel tõene olla, sest $A$ ja $\\neg A$ ei saa korraga tõesed olla.',
    },
    {
      tags: ['loogika', 'kt1'],
      q: 'Millal on implikatsioon $F\\Rightarrow G$ väär?',
      options: ['Kui $F=0$ ja $G=0$', 'Kui $F=0$ ja $G=1$', 'Kui $F=1$ ja $G=0$', 'Kui $F=1$ ja $G=1$'],
      correct: 2,
      exp: 'Implikatsioon on väär ainult juhul, kui eeldus on tõene ja järeldus väär: $1\\Rightarrow0=0$.',
    },
    {
      tags: ['loogika', 'kt1'],
      q: 'Neelamisseadus $F\\&(F\\lor G)\\equiv$ ?',
      options: ['$F$', '$G$', '$F\\&G$', '$F\\lor G$'],
      correct: 0,
      exp: 'Neelamisseadused: $F\\&(F\\lor G)\\equiv F$ ja $F\\lor(F\\&G)\\equiv F$.',
    },
    {
      tags: ['loogika', 'kt1'],
      q: 'Mis on literaal?',
      options: ['Ainult konjunktsioonidest koosnev valem', 'Lausemuutuja või tema eitus', 'Iga samaselt tõene valem', 'Tõeväärtustabeli rida'],
      correct: 1,
      exp: 'Literaal on lausemuutuja või selle eitus, näiteks $A$ või $\\neg A$.',
    },
    {
      tags: ['loogika', 'kt1'],
      q: 'Täieliku DNK liikmed vastavad tavaliselt:',
      options: ['väärtustustele, millel valem on tõene', 'väärtustustele, millel valem on väär', 'ainult muutujate nimedele', 'ainult samaselt vääradele valemitele'],
      correct: 0,
      exp: 'Täielikus disjunktiivses normaalkujus võetakse lihtkonjunktsioonid nende väärtustuste järgi, millel valem on tõene.',
    },
    {
      tags: ['loogika', 'kt1'],
      q: 'Täieliku KNK liikmed vastavad tavaliselt:',
      options: ['tõestusridadele', 'väärtustustele, millel valem on väär', 'ainult positiivsetele literaalidele', 'ainult ühe muutujaga valemitele'],
      correct: 1,
      exp: 'Täielikus konjunktiivses normaalkujus ehitatakse lihtdisjunktsioonid nende väärtustuste järgi, millel valem on väär.',
    },
    {
      tags: ['loogika'],
      q: 'Mitu väärtustust teeb valemi $A\\lor B$ tõeseks?',
      options: ['1', '2', '3', '4'],
      correct: 2,
      exp: '$A\\lor B$ on väär ainult väärtustusel $A=0,B=0$, seega neljast väärtustusest kolm teevad selle tõeseks.',
    },
    {
      tags: ['loogika'],
      q: 'Mida tähendab lausearvutuse valemi kehtestatavus?',
      options: ['Valem on tõene igal väärtustusel', 'Valem on väär igal väärtustusel', 'Valem on tõene vähemalt ühel väärtustusel', 'Valem sisaldab ainult ühte muutujat'],
      correct: 2,
      exp: 'Kehtestatav valem on tõene vähemalt ühel väärtustusel. Samaselt tõene valem on tõene kõigil väärtustustel.',
    },
    {
      tags: ['predikaadid', 'kt1'],
      q: 'Mis on $n$-kohaline predikaat hulgal $M$?',
      options: ['Kujutus $M^n\\to\\{0,1\\}$', 'Kujutus $\\{0,1\\}\\to M^n$', 'Ainult naturaalarvude tehe', 'Lausearvutuse muutuja'],
      correct: 0,
      exp: '$n$-kohaline predikaat on kujutus $P:M^n\\to\\{0,1\\}$ ehk ta annab igale $n$-tuplele tõeväärtuse.',
    },
    {
      tags: ['predikaadid', 'kt1'],
      q: 'Signatuur on järjestatud kolmik:',
      options: ['$\\langle V;E;\\omega\\rangle$', '$\\langle C;F;P\\rangle$', '$\\langle M;I\\rangle$', '$\\langle 0;1;2\\rangle$'],
      correct: 1,
      exp: 'Signatuur on $\\sigma=\\langle C;F;P\\rangle$, kus $C$ on konstantsümbolid, $F$ funktsionaalsümbolid ja $P$ predikaatsümbolid.',
    },
    {
      tags: ['predikaadid', 'kt1'],
      q: 'Signatuuri interpretatsioon on paar:',
      options: ['$\\langle C;F;P\\rangle$', '$\\langle M_\\alpha;I_\\alpha\\rangle$', '$\\langle V;E\\rangle$', '$\\langle F;G\\rangle$'],
      correct: 1,
      exp: 'Interpretatsioon on $\\alpha=\\langle M_\\alpha;I_\\alpha\\rangle$, kus $M_\\alpha$ on mittetühi kandja ja $I_\\alpha$ tõlgendab sümbolid.',
    },
    {
      tags: ['predikaadid', 'kt1'],
      q: 'Milline muutuja on valemis $\\forall x(P(x,y)\\Rightarrow Q(x))$ vaba?',
      options: ['$x$', '$y$', 'Mõlemad $x$ ja $y$', 'Ühtegi vaba muutujat ei ole'],
      correct: 1,
      exp: '$x$ on seotud kvantoriga $\\forall x$, kuid $y$ ei ole ühegi kvantori mõjupiirkonnas seotud.',
    },
    {
      tags: ['predikaadid', 'kt1'],
      q: 'Kvantorite eitamisel $\\neg\\exists xP(x)\\equiv$ ?',
      options: ['$\\exists x\\neg P(x)$', '$\\forall x\\neg P(x)$', '$\\forall xP(x)$', '$\\neg\\forall x\\neg P(x)$'],
      correct: 1,
      exp: 'Olemasolukvantori eitus muutub üldisuskvantoriks: $\\neg\\exists xP(x)\\equiv\\forall x\\neg P(x)$.',
    },
    {
      tags: ['predikaadid', 'kt1'],
      q: 'Mida tähendab, et interpretatsioon $\\alpha$ on valemi $F$ mudel?',
      options: ['$F$ on selles interpretatsioonis väär kõigil väärtustustel', '$F$ on selles interpretatsioonis tõene oma vabade muutujate kõigil väärtustel', '$F$ ei sisalda kvantoreid', '$F$ on lausearvutuse valem'],
      correct: 1,
      exp: 'Valemi mudel on interpretatsioon, milles valem on tõene vabade muutujate kõikidel väärtustel.',
    },
    {
      tags: ['predikaadid', 'kt1'],
      q: 'Milline valem on prefikskujul?',
      options: ['$P(x)\\&\\forall yQ(y)$', '$\\forall x\\exists y(P(x)\\Rightarrow Q(y))$', '$(\\forall xP(x))\\lor Q$', '$\\neg\\exists xP(x)$'],
      correct: 1,
      exp: 'Prefikskujul on kõik kvantorid valemi alguses. Valemis $\\forall x\\exists y(P(x)\\Rightarrow Q(y))$ on kvantorid ees ja maatriks järel.',
    },
    {
      tags: ['predikaadid', 'kt1'],
      q: 'Valem $\\exists xP(x)\\&\\exists x\\neg P(x)$ on kehtestatav näiteks siis, kui:',
      options: ['põhihulk on tühi', 'põhihulgas on üks element ja $P$ on kõikjal tõene', 'leidub üks element, kus $P$ on tõene, ja teine, kus $P$ on väär', '$P$ on kõikjal väär'],
      correct: 2,
      exp: 'Valem nõuab korraga $P$-tunnistajat ja $\\neg P$-tunnistajat. Selleks sobib näiteks kaheelemendiline kandja.',
    },
    {
      tags: ['peano', 'kt1'],
      q: 'Peano aksioom P4 kirjeldab liitmist järglasega. See on:',
      options: ['$x+y\\prime=(x+y)\\prime$', '$x\\cdot y\\prime=x\\cdot y+x$', '$x+0=0$', '$x\\prime=y\\prime\\Rightarrow x=y$'],
      correct: 0,
      exp: 'P4: $\\forall x\\forall y(x+y\\prime=(x+y)\\prime)$.',
    },
    {
      tags: ['peano', 'kt1'],
      q: 'Peano aksioom P5 on:',
      options: ['$x\\cdot0=0$', '$x+0=x$', '$0+x=x$', '$x\\cdot0\\prime=x$'],
      correct: 0,
      exp: 'P5 defineerib korrutamise nulliga: $\\forall x(x\\cdot0=0)$. Väide $x\\cdot0\\prime=x$ tuleb P5, P6 ja $0+x=x$ abil tõestada.',
    },
    {
      tags: ['peano', 'kt1'],
      q: 'Peano aksioom P6 ütleb, et:',
      options: ['$x+y\\prime=(x+y)\\prime$', '$x\\cdot y\\prime=x\\cdot y+x$', '$x\\prime=0$', '$0+x=x$'],
      correct: 1,
      exp: 'P6 on korrutamise rekursioon: $\\forall x\\forall y(x\\cdot y\\prime=x\\cdot y+x)$.',
    },
    {
      tags: ['peano', 'kt1'],
      q: 'Kuidas kirjutada arv $3$ Peano tähistuses?',
      options: ['$0\\prime$', '$0\\prime\\prime$', '$0\\prime\\prime\\prime$', '$3$ on eraldi konstantsümbol'],
      correct: 2,
      exp: 'Arv $3$ kirjutatakse $0\\prime\\prime\\prime$, sest see on nulli kolmekordne järglane.',
    },
    {
      tags: ['peano', 'kt1'],
      q: 'Miks on $x+0\\prime=x\\prime$ Peano aksioomidest kohe leitav?',
      options: ['Sest $0\\prime=0$', 'Sest $x+0\\prime=(x+0)\\prime=x\\prime$', 'Sest korrutamine on kommutatiivne', 'Sest iga valem on samaselt tõene'],
      correct: 1,
      exp: 'P4 annab $x+0\\prime=(x+0)\\prime$ ja P3 annab $x+0=x$, seega tulemuseks on $x\\prime$.',
    },
    {
      tags: ['peano', 'kt1'],
      q: 'Tõestus $\\forall x(0+x=x)$ tehakse tavaliselt:',
      options: ['induktsiooniga üle $x$', 'tõeväärtustabeliga', 'Dijkstra algoritmiga', 'ainult definitsiooniga $x\\cdot0=0$'],
      correct: 0,
      exp: 'Väide $0+x=x$ ei ole otsene P3, sest P3 annab $x+0=x$. Seda tõestatakse induktsiooniga üle $x$.',
    },
    {
      tags: ['sekvents', 'kt1'],
      q: 'Sekventsi $F_1,F_2,\\ldots,F_n\\vdash G$ valemkuju on:',
      options: ['$F_1\\lor\\cdots\\lor F_n\\lor G$', '$F_1\\&F_2\\&\\cdots\\&F_n\\Rightarrow G$', '$G\\Rightarrow F_1\\&\\cdots\\&F_n$', '$F_1\\Leftrightarrow G$'],
      correct: 1,
      exp: 'Sekventsi valemkuju on eelduste konjunktsioonist järeldusse minev implikatsioon.',
    },
    {
      tags: ['sekvents', 'kt1'],
      q: 'Reegel $(\\vdash\\&)$ lubab tuletada $\\Gamma\\vdash F\\&G$, kui on olemas:',
      options: ['$\\Gamma\\vdash F$ ja $\\Gamma\\vdash G$', '$\\Gamma,F,G\\vdash H$', '$\\Gamma\\vdash F\\lor G$', '$F\\vdash\\Gamma$'],
      correct: 0,
      exp: 'Parempoolse konjunktsiooni reegel ühendab kaks sama kontekstiga tõestust: $\\Gamma\\vdash F$ ja $\\Gamma\\vdash G$.',
    },
    {
      tags: ['sekvents', 'kt1'],
      q: 'Reegel $(\\vdash\\Rightarrow)$ lubab valemi $F\\Rightarrow G$ paremale saada, kui on tuletatud:',
      options: ['$\\Gamma,F\\vdash G$', '$\\Gamma\\vdash F$ ja $\\Gamma\\vdash G$', '$\\Gamma,G\\vdash F$', '$F\\Rightarrow G\\vdash\\Gamma$'],
      correct: 0,
      exp: 'Implikatsiooni paremale viimiseks eeldatakse ajutiselt $F$ ja tuletatakse $G$: sellest saab $\\Gamma\\vdash F\\Rightarrow G$.',
    },
    {
      tags: ['sekvents', 'kt1'],
      q: 'Sekventsiaalse lausearvutuse täielikkuse teoreem ütleb, et:',
      options: ['Iga tuletatav sekvents on semantiliselt kehtiv', 'Iga semantiliselt kehtiv sekvents on tuletatav', 'Ühtegi sekventsi ei saa tuletada', 'Ainult konjunktsioonid on tuletatavad'],
      correct: 1,
      exp: 'Täielikkus on suund semantikast süntaksisse: kui sekvents on semantiliselt kehtiv, siis ta on tuletatav.',
    },
    {
      tags: ['sekvents', 'kt1'],
      q: 'Sekventsi $P\\&Q\\vdash Q\\&P$ tuletamisel on põhiidee:',
      options: ['avada vasakul konjunktsioon ja panna paremal konjunktsioon teises järjekorras kokku', 'kasutada ainult disjunktsiooni reeglit', 'asendada $P$ ja $Q$ nullidega', 'näidata, et $P$ on samaselt väär'],
      correct: 0,
      exp: 'Vasakul $P\\&Q$ annab eeldusteks $P$ ja $Q$; paremal saab neist reegliga $(\\vdash\\&)$ kokku panna $Q\\&P$.',
    },
    {
      tags: ['graafid'],
      q: 'Kui lihtgraafil on $n$ tippu ja $m$ serva, siis täiendgraafil on servi:',
      options: ['$m$', '$\\binom n2-m$', '$n-m$', '$2m$'],
      correct: 1,
      exp: 'Kõigi võimalike servade arv on $\\binom n2$. Täiendgraafis on parajasti need servad, mida algses graafis ei olnud.',
    },
    {
      tags: ['graafid'],
      q: '$n$-tipulise $k$-regulaarse graafi servade arv on:',
      options: ['$nk$', '$nk/2$', '$n+k$', '$2n/k$'],
      correct: 1,
      exp: 'Astmete summa on $nk$ ja see võrdub $2|E|$, seega $|E|=nk/2$.',
    },
    {
      tags: ['graafid'],
      q: 'Igas graafis on paaritu astmega tippe:',
      options: ['alati paarisarv', 'alati paaritu arv', 'täpselt üks', 'täpselt null'],
      correct: 0,
      exp: 'Tipuastmete summa on paarisarv $2|E|$, mistõttu paaritu astmega tippude arv peab olema paaris.',
    },
    {
      tags: ['graafid'],
      q: 'Havel-Hakimi esimene samm järjendile $(3,3,2,2,2)$ annab pärast sorteerimist:',
      options: ['$(2,2,1,1)$', '$(3,2,2,1)$', '$(2,1,1,0)$', '$(4,2,2,2)$'],
      correct: 0,
      exp: 'Eemalda esimene $3$ ja vähenda kolme järgmist elementi: $(3,2,2,2)\\to(2,1,1,2)$, sorteeritult $(2,2,1,1)$.',
    },
    {
      tags: ['graafid'],
      q: 'Miks ei saa $(4,4,1,1)$ olla 4-tipulise lihtgraafi astmejärjend?',
      options: ['Sest aste ei saa olla suurem kui $n-1=3$', 'Sest summa on paarisarv', 'Sest kõik astmed peavad võrdsed olema', 'Sest järjendis on kaks ühte'],
      correct: 0,
      exp: '4-tipulises lihtgraafis saab tipu aste olla maksimaalselt $3$, sest tipp saab olla ühendatud ainult ülejäänud kolme tipuga.',
    },
    {
      tags: ['graafid'],
      q: 'Metsal, millel on $n$ tippu ja $k$ sidususkomponenti, on servi:',
      options: ['$n+k$', '$n-k$', '$k-n$', '$nk$'],
      correct: 1,
      exp: 'Iga puukomponent annab ühe võrra vähem servi kui tippe. Kokku on metsas $n-k$ serva.',
    },
    {
      tags: ['graafid'],
      q: 'Graafi serv on sild, kui:',
      options: ['tema eemaldamisel sidususkomponentide arv suureneb', 'ta kuulub täisgraafi', 'ta on alati suurima kaaluga serv', 'ta ühendab tipu iseendaga'],
      correct: 0,
      exp: 'Sild on serv, mille eemaldamine lõhub graafi sidususe mõttes rohkemateks komponentideks.',
    },
    {
      tags: ['graafid'],
      q: 'Graafi tipp on eraldav tipp, kui:',
      options: ['tema aste on alati $0$', 'tema eemaldamisel koos intsidentsete servadega sidususkomponentide arv kasvab', 'ta on täisgraafi tipp', 'ta kuulub igasse tsüklisse'],
      correct: 1,
      exp: 'Eraldav tipp on tipp, mille eemaldamine koos temaga intsidentsete servadega suurendab sidususkomponentide arvu.',
    },
    {
      tags: ['graafid'],
      q: 'Sidusas graafis leidub lahtine Euleri ahel parajasti siis, kui paaritu astmega tippe on:',
      options: ['täpselt 1', 'täpselt 2', 'täpselt 3', 'vähemalt 4'],
      correct: 1,
      exp: 'Lahtine Euleri ahel leidub sidusas graafis siis, kui paaritu astmega tippe on täpselt kaks. Kinnise Euleri ahela korral on neid null.',
    },
    {
      tags: ['graafid'],
      q: 'Täisgraaf $K_n$ on Euleri graaf parajasti siis, kui:',
      options: ['$n$ on paaritu', '$n$ on paarisarv', '$n=2$', '$n$ on algarv'],
      correct: 0,
      exp: '$K_n$ iga tipu aste on $n-1$. Kõik astmed on paarisarvud parajasti siis, kui $n$ on paaritu.',
    },
    {
      tags: ['graafid'],
      q: 'Täisgraaf $K_n$ on Hamiltoni graaf, kui:',
      options: ['$n\\ge3$', '$n=1$', 'ainult siis, kui $n$ on paaritu', 'ainult siis, kui $n$ on paarisarv'],
      correct: 0,
      exp: 'Kui $n\\ge3$, saab täisgraafis valida tsükli, mis läbib kõik tipud täpselt ühe korra.',
    },
    {
      tags: ['graafid'],
      q: 'Diraci teoreemi tingimus on:',
      options: ['tarvilik ja piisav', 'ainult tarvilik', 'piisav, kuid mitte tarvilik', 'seotud ainult Euleri graafidega'],
      correct: 2,
      exp: 'Diraci teoreem annab piisava tingimuse Hamiltoni tsükli leidumiseks, aga Hamiltoni graaf võib olemas olla ka siis, kui tingimus ei kehti.',
    },
    {
      tags: ['graafid'],
      q: 'Primi algoritm erineb Kruskali algoritmist selle poolest, et Prim:',
      options: ['kasvatab ühte puud valitud algtipust', 'ei kasuta servade kaale', 'leiab alati lühima tee kahe tipu vahel', 'töötab ainult suunatud graafidel'],
      correct: 0,
      exp: 'Prim alustab ühest tipust ja lisab igal sammul vähima serva, mis ühendab kasvavat puud mõne uue tipuga.',
    },
    {
      tags: ['graafid'],
      q: 'Suunatud graafis kehtib alati:',
      options: ['$\\sum_v d^+(v)=\\sum_v d^-(v)=|A|$', '$\\sum_v d^+(v)=2|A|$', '$\\sum_v d^-(v)=2|V|$', '$d^+(v)=d^-(v)$ iga tipu korral'],
      correct: 0,
      exp: 'Iga kaar väljub ühest tipust ja siseneb ühte tippu, seega väljundastmete summa ja sisendastmete summa on mõlemad kaarte arv $|A|$.',
    },
    {
      tags: ['graafid'],
      q: 'Suunamata lihtgraafi naabrusmaatriks on:',
      options: ['sümmeetriline ja silmusteta graafi korral peadiagonaalil nullidega', 'alati diagonaalmaatriks', 'alati ainult ühtedest koosnev', 'mitte kunagi sümmeetriline'],
      correct: 0,
      exp: 'Kui $uv$ on serv, siis on ka $vu$ sama serv; seetõttu on maatriks sümmeetriline. Silmusteta lihtgraafil on diagonaalil nullid.',
    },
    {
      tags: ['graafid'],
      q: 'Suunatud graaf on tugevalt sidus, kui:',
      options: ['alusgraaf on sidus', 'iga kahe tipu vahel leidub suunatud tee mõlemas suunas', 'iga tipu sisendaste on null', 'graafis pole ühtegi kaart'],
      correct: 1,
      exp: 'Tugev sidusus nõuab suunatud ligipääsetavust mõlemas suunas iga tipupaari vahel.',
    },
    {
      tags: ['graafid'],
      q: 'Suunatud graaf on nõrgalt sidus, kui:',
      options: ['iga kahe tipu vahel leidub suunatud tee mõlemas suunas', 'tema alusgraaf on sidus', 'kõik sisendastmed on võrdsed väljundastmetega', 'tal on täpselt üks kaar'],
      correct: 1,
      exp: 'Nõrk sidusus ignoreerib kaarte suunda: suunatud graafi alusgraaf peab olema sidus.',
    },
    {
      tags: ['loogika', 'kt1'],
      q: 'Millal on ekvivalents $F\\Leftrightarrow G$ väär?',
      options: ['Kui $F$ ja $G$ on mõlemad tõesed', 'Kui $F$ ja $G$ on mõlemad väärad', 'Kui $F$ ja $G$ väärtused erinevad', 'Ainult siis, kui $F$ on väär'],
      correct: 2,
      exp: 'Ekvivalents on tõene täpselt siis, kui pooltel on sama tõeväärtus; erinevate väärtuste korral on ta väär.',
    },
    {
      tags: ['loogika', 'kt1'],
      q: 'Valemi $A\\Rightarrow B$ täielikus DNK-s puudub rida:',
      options: ['$A=0,B=0$', '$A=0,B=1$', '$A=1,B=0$', '$A=1,B=1$'],
      correct: 2,
      exp: '$A\\Rightarrow B$ on väär ainult väärtustusel $A=1,B=0$, seega seda rida DNK tõeste ridade hulgas ei ole.',
    },
    {
      tags: ['loogika'],
      q: 'Kui valem on samaselt tõene, siis ta on kindlasti:',
      options: ['kehtestatav', 'samaselt väär', 'ainult ühe muutujaga', 'prefikskujul'],
      correct: 0,
      exp: 'Samaselt tõene valem on tõene igal väärtustusel, seega ka vähemalt ühel väärtustusel ehk kehtestatav.',
    },
    {
      tags: ['loogika'],
      q: 'Mitu tõest rida on valemil $A\\Leftrightarrow B$ kahe muutuja tõeväärtustabelis?',
      options: ['1', '2', '3', '4'],
      correct: 1,
      exp: '$A\\Leftrightarrow B$ on tõene ridadel $00$ ja $11$, kokku kahel real.',
    },
    {
      tags: ['predikaadid', 'kt1'],
      q: 'Milline järeldumine kehtib mittetühjal põhihulgal?',
      options: ['$\\forall xP(x) \\models \\exists xP(x)$', '$\\exists xP(x) \\models \\forall xP(x)$', '$\\exists xP(x) \\models \\exists x\\neg P(x)$', '$\\forall xP(x) \\models \\forall x\\neg P(x)$'],
      correct: 0,
      exp: 'Predikaatloogika interpretatsiooni põhihulk on mittetühi. Kui $P$ kehtib kõigil elementidel, leidub ka $P$-tunnistaja.',
    },
    {
      tags: ['predikaadid', 'kt1'],
      q: 'Valemis $\\exists x(P(x)\\&Q(y))$ on vaba muutuja:',
      options: ['$x$', '$y$', '$x$ ja $y$', 'vabu muutujaid ei ole'],
      correct: 1,
      exp: '$x$ on seotud olemasolukvantoriga, kuid $y$ jääb vabaks.',
    },
    {
      tags: ['predikaadid', 'kt1'],
      q: 'Milline teisendus on õige?',
      options: ['$\\neg\\exists xP(x)\\equiv\\exists x\\neg P(x)$', '$\\neg\\forall xP(x)\\equiv\\exists x\\neg P(x)$', '$\\forall xP(x)\\equiv\\exists xP(x)$', '$\\exists xP(x)\\equiv\\forall x\\neg P(x)$'],
      correct: 1,
      exp: 'Üldisuskvantori eitus muutub olemasolukvantoriks: $\\neg\\forall xP(x)\\equiv\\exists x\\neg P(x)$.',
    },
    {
      tags: ['predikaadid', 'kt1'],
      q: 'Järeldumine $\\exists x\\forall yH(x,y) \\models \\forall y\\exists xH(x,y)$ kehtib, sest:',
      options: ['iga $y$ jaoks saab kasutada sama tunnistajat $x$', 'kvantorid võib alati vabalt ümber tõsta', '$H$ peab olema sümmeetriline', 'põhihulk peab olema üheelemendiline'],
      correct: 0,
      exp: 'Kui leidub üks $x$, mis töötab kõigi $y$ jaoks, siis iga konkreetse $y$ jaoks sobib seesama $x$.',
    },
    {
      tags: ['peano', 'kt1'],
      q: 'Peano aksioom $x\\prime=y\\prime\\Rightarrow x=y$ väljendab:',
      options: ['järeltulijafunktsiooni injektiivsust', 'liitmise kommutatiivsust', 'korrutamise distributiivsust', 'induktsiooni lõppemist'],
      correct: 0,
      exp: 'Kui kahel arvul on sama järeltulija, siis arvud ise on võrdsed: järeltulija on injektiivne.',
    },
    {
      tags: ['peano', 'kt1'],
      q: 'Mida ütleb aksioom $\\neg(x\\prime=0)$?',
      options: ['Null ei ole ühegi naturaalarvu järeltulija', 'Iga arv on null', 'Iga arv on mingi arvu järeltulija', 'Liitmine nulliga muudab arvu'],
      correct: 0,
      exp: 'Peano aritmeetikas ei ole null ühegi elemendi järeltulija.',
    },
    {
      tags: ['peano', 'kt1'],
      q: 'Induktsiooniskeemi sammus tuleb näidata:',
      options: ['$F(0)$', '$F(x)\\Rightarrow F(x\\prime)$', '$F(x)\\Rightarrow F(0)$', '$F(x\\prime)\\Rightarrow F(x)$'],
      correct: 1,
      exp: 'Induktsiooni samm näitab, et omadus kandub suvaliselt arvult tema järeltulijale.',
    },
    {
      tags: ['sekvents', 'kt1'],
      q: 'Reegel $(\\lor\\vdash)$ kasutab tavaliselt kahte haru:',
      options: ['$\\Gamma,F\\vdash H$ ja $\\Gamma,G\\vdash H$', '$\\Gamma\\vdash F$ ja $\\Gamma\\vdash G$', '$F\\vdash G$ ja $G\\vdash F$', '$\\Gamma\\vdash F\\lor G$ ja $\\Gamma\\vdash H$'],
      correct: 0,
      exp: 'Kui $F$-eeldusest saab $H$ ja $G$-eeldusest saab $H$, siis $F\\lor G$ eeldusest saab samuti $H$.',
    },
    {
      tags: ['sekvents', 'kt1'],
      q: 'Sekventsi $P\\vdash Q\\Rightarrow P$ tõestamisel kasutatakse lõpus reeglit:',
      options: ['$(\\vdash\\Rightarrow)$', '$(\\lor\\vdash)$', '$(\\vdash\\lor)$', 'lõikereeglit ainult'],
      correct: 0,
      exp: 'Kui ajutise eeldusega $Q$ on tuletatud $P$, saab paremale tuua implikatsiooni $Q\\Rightarrow P$.',
    },
    {
      tags: ['graafid'],
      q: 'Täiendgraafi kohta kehtib $\\overline{K_n}=$',
      options: ['$K_n$', '$O_n$', '$P_n$', '$C_n$'],
      correct: 1,
      exp: 'Täisgraafil $K_n$ on kõik võimalikud servad olemas, seega täiendgraafis pole ühtegi serva: $O_n$.',
    },
    {
      tags: ['graafid'],
      q: 'Kui graaf on $k$-regulaarne ja tal on $n$ tippu, siis peab $nk$ olema:',
      options: ['paarisarv', 'paaritu arv', 'alati algarv', 'võrdne $n-1$-ga'],
      correct: 0,
      exp: 'Astmete summa on $nk$ ja see võrdub $2|E|$, seega peab $nk$ olema paarisarv.',
    },
    {
      tags: ['graafid'],
      q: 'Puu on alati:',
      options: ['sidus ja tsükliteta', 'regulaarne', 'täisgraaf', 'Hamiltoni graaf'],
      correct: 0,
      exp: 'Puu definitsioonis on keskne, et graaf on sidus ja ei sisalda tsükleid.',
    },
    {
      tags: ['graafid'],
      q: 'Suunatud graafi väljundaste $d^+(v)$ loendab:',
      options: ['tipust $v$ väljuvaid kaari', 'tippu $v$ sisenevaid kaari', 'kõiki graafi servi', 'ainult silmuseid'],
      correct: 0,
      exp: 'Väljundaste on kaarte arv, mille algtipuks on $v$. Sisendaste loendab tippu sisenevaid kaari.',
    },
  ];

  const QUIZ_TOPICS = [
    { id: 'all', label: 'Kogu kursus', description: 'Segamini loogika ja graafid' },
    { id: 'loogika', label: 'Lausearvutus', description: 'Tõeväärtused, samaväärsus, tehted' },
    { id: 'predikaadid', label: 'Predikaadid', description: 'Kvantorid, prefikskuju, kinnised valemid' },
    { id: 'peano', label: 'Peano', description: 'Aksioomid, induktsioon, arvutused' },
    { id: 'sekvents', label: 'Sekvents', description: 'Tuletusreeglid, korrektsus, täielikkus' },
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

  function routeForQuestion(q) {
    const map = {
      loogika: 'lausearvutus',
      predikaadid: 'predikaadid',
      peano: 'peano',
      sekvents: 'sekvents',
      graafid: 'graafid',
    };
    const tag = q.tags.find(item => map[item]);
    return map[tag] || 'viktoriin';
  }

  function routeName(route) {
    const names = {
      lausearvutus: 'Lausearvutus',
      predikaadid: 'Predikaadid',
      peano: 'Peano',
      sekvents: 'Sekvents',
      graafid: 'Graafiteooria',
      kviis: 'Kogu kursus',
    };
    return names[route] || route;
  }

  function plainText(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent.replace(/\s+/g, ' ').trim();
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
              <option value="20">20</option>
              <option value="25">25</option>
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
          const wrong = i !== q.correct;
          content.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
          if (!wrong) {
            btn.classList.add('correct');
            score++;
          } else {
            btn.classList.add('wrong');
            content.querySelectorAll('.quiz-option')[q.correct].classList.add('correct');
          }
          const exp = document.getElementById('quizExp');
          exp.innerHTML = wrong
            ? `${q.exp}<div class="btn-row"><button class="btn small secondary" id="logQuizMistake" type="button">Lisa vigade päevikusse</button><span class="muted" id="quizMistakeStatus"></span></div>`
            : q.exp;
          exp.classList.add('show');
          renderMath(exp);
          document.getElementById('logQuizMistake')?.addEventListener('click', () => {
            const route = routeForQuestion(q);
            window.DMWeaknesses?.add({
              type: 'quiz',
              route,
              topic: topic === 'all' ? routeName(route) : QUIZ_TOPICS.find(item => item.id === topic)?.label || routeName(route),
              title: plainText(q.q).slice(0, 120),
              note: `Valisin: ${plainText(q.options[i])}. Õige: ${plainText(q.options[q.correct])}.`,
              sourceKey: `quiz:${plainText(q.q)}`,
            });
            const status = document.getElementById('quizMistakeStatus');
            if (status) status.textContent = 'Lisatud.';
          });
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
      const topicLabel = QUIZ_TOPICS.find(item => item.id === topic)?.label || 'Kogu kursus';
      localStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify({
        topic,
        topicLabel,
        score,
        total: questions.length,
        pct,
        date: new Date().toISOString(),
      }));
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
    let topicFilter = 'all';

    view.innerHTML = `
      <h1>Mõistekaardid</h1>
      <p>Anki-stiilis kordamine: unustatud mõisted tulevad varem tagasi, kindlalt teatud mõisted liiguvad kaugemale tulevikku.</p>
      <div class="filter-panel flashcard-filter">
        <span class="filter-label">Kaardipakk</span>
        <div class="filter-chip-group" role="group" aria-label="Mõistekaartide teema">
          <button class="filter-chip active" data-flash-topic="all" type="button" aria-pressed="true">Kõik</button>
          <button class="filter-chip" data-flash-topic="logic" type="button" aria-pressed="false">Loogika</button>
          <button class="filter-chip" data-flash-topic="graph" type="button" aria-pressed="false">Graafiteooria</button>
        </div>
      </div>
      <div class="flashcard-srs" id="flashStats"></div>
      <div id="flashContainer"></div>
    `;

    const topicButtons = [...view.querySelectorAll('[data-flash-topic]')];

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

    function filteredIndexes() {
      return cards
        .map((card, i) => ({ card, i }))
        .filter(({ card }) => topicFilter === 'all' || getGlossaryTopic(card.term) === topicFilter)
        .map(({ i }) => i);
    }

    function deckLabel() {
      if (topicFilter === 'logic') return 'loogika';
      if (topicFilter === 'graph') return 'graafiteooria';
      return 'kõigi mõistete';
    }

    function doneMessage() {
      if (topicFilter === 'all') {
        return 'Kõik tänase kuupäevaga mõisted on üle vaadatud. Võid selle paki kaardid segada, kui tahad veel harjutada.';
      }
      return `Kõik ${deckLabel()} tänase kuupäevaga mõisted on üle vaadatud. Võid selle paki kaardid segada, kui tahad veel harjutada.`;
    }

    function buildQueue(mode = 'due') {
      const schedule = loadSchedule();
      const today = todayKey();
      const indexes = filteredIndexes();
      indexes.forEach(i => stateFor(schedule, cards[i]));
      saveSchedule(schedule);
      const due = indexes.filter(i => stateFor(schedule, cards[i]).due <= today);
      order = mode === 'all'
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
      const indexes = filteredIndexes();
      const topicCards = indexes.map(i => cards[i]);
      const total = topicCards.length;
      const due = topicCards.filter(card => stateFor(schedule, card).due <= today).length;
      const learning = topicCards.filter(card => stateFor(schedule, card).reps > 0).length;
      const mature = topicCards.filter(card => stateFor(schedule, card).interval >= 7).length;
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
        const total = filteredIndexes().length;
        document.getElementById('flashContainer').innerHTML = `
          <div class="card">
            <h3>${total ? 'Tänane kordamine on valmis.' : 'Selles kaardipakis pole mõisteid.'}</h3>
            <p>${total ? doneMessage() : ''}</p>
            ${total ? '<button class="btn small" id="studyAllCards" type="button">Harjuta selle paki kaarte</button>' : ''}
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
          <button class="btn small secondary" id="shuffleCards">Sega kaardid</button>
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
        lastAction = topicFilter === 'all' ? 'Kõik kaardid on segatud.' : `${deckLabel()} kaardid on segatud.`;
        show();
      });
      document.getElementById('resetSrs').addEventListener('click', () => {
        const message = topicFilter === 'all'
          ? 'Lähtesta mõistekaartide kordamise ajalugu?'
          : `Lähtesta ${deckLabel()} kaartide kordamise ajalugu?`;
        if (!confirm(message)) return;
        if (topicFilter === 'all') {
          localStorage.removeItem(FLASH_SRS_KEY);
        } else {
          const schedule = loadSchedule();
          filteredIndexes().forEach(i => delete schedule[cards[i].term]);
          saveSchedule(schedule);
        }
        lastAction = topicFilter === 'all'
          ? 'Kordamise ajalugu lähtestatud.'
          : `${deckLabel()} kaartide kordamise ajalugu lähtestatud.`;
        buildQueue();
        show();
      });
    }

    function setTopicFilter(nextTopic) {
      topicFilter = nextTopic;
      topicButtons.forEach(button => {
        const active = button.dataset.flashTopic === nextTopic;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      lastAction = '';
      buildQueue();
      show();
    }

    topicButtons.forEach(button => {
      button.addEventListener('click', () => setTopicFilter(button.dataset.flashTopic));
    });

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

  const GLOSSARY_GRAPH_TERMS = new Set([
    'Ahel',
    'Alamgraaf',
    'Alusgraaf',
    'Eraldav tipp',
    'Euleri ahel',
    'Euleri graaf',
    'Graaf',
    'Graafide isomorfism',
    'Graafi kaal',
    'Hamiltoni ahel',
    'Hamiltoni graaf',
    'Intsidentsus',
    'Isoleeritud tipp',
    'Kaalutud graaf',
    'Kaar',
    'Kinnine ahel',
    'Kruskali algoritm',
    'Leht',
    'Lihtahel',
    'Mets',
    'Naaberservad',
    'Naabertipud',
    'Naabrusmaatriks',
    'Nullgraaf',
    'Otstipud',
    'Primi algoritm',
    'Puu',
    'Puu sisetipp',
    'Regulaarne graaf',
    'Rippuv tipp',
    'Sidus graaf',
    'Sidususkomponent',
    'Sild',
    'Silmus',
    'Sisend',
    'Sisendaste',
    'Suunatud graaf',
    'Tipuaste',
    'Toespuu',
    'Tsükkel',
    'Täiendgraaf',
    'Täisgraaf',
    'Väljund',
    'Väljundaste',
  ]);

  function getGlossaryTopic(term) {
    return GLOSSARY_GRAPH_TERMS.has(term) ? 'graph' : 'logic';
  }

  window.initGlossary = function () {
    const list = document.getElementById('glossaryList');
    const filterInput = document.getElementById('glossaryFilter');
    if (!list || !filterInput) return;

    const controls = document.createElement('div');
    controls.className = 'glossary-controls';
    controls.innerHTML = `
      <div class="glossary-progress" id="glossaryProgress"></div>
      <div class="filter-chip-group glossary-topic-filter" role="group" aria-label="Sõnastiku teema">
        <button class="filter-chip active" data-glossary-topic="all" type="button" aria-pressed="true">Kõik</button>
        <button class="filter-chip" data-glossary-topic="logic" type="button" aria-pressed="false">Loogika</button>
        <button class="filter-chip" data-glossary-topic="graph" type="button" aria-pressed="false">Graafiteooria</button>
      </div>
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
    const topicButtons = [...controls.querySelectorAll('[data-glossary-topic]')];
    let topicFilter = 'all';

    function setTopicFilter(nextTopic) {
      topicFilter = nextTopic;
      topicButtons.forEach(button => {
        const active = button.dataset.glossaryTopic === nextTopic;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      render();
    }

    function render() {
      const learned = getLearnedTerms();
      const f = filterInput.value.toLowerCase().trim();
      const status = statusFilter.value;
      const topicItems = (window.GLOSSARY || [])
        .filter(g => topicFilter === 'all' || getGlossaryTopic(g.term) === topicFilter);
      const items = topicItems
        .filter(g => !f || g.term.toLowerCase().includes(f) || g.def.toLowerCase().includes(f))
        .filter(g => status === 'all' || (status === 'learned' ? learned.has(g.term) : !learned.has(g.term)))
        .sort((a, b) => a.term.localeCompare(b.term, 'et'));

      const total = topicItems.length;
      const learnedTotal = topicItems.filter(g => learned.has(g.term)).length;
      document.getElementById('glossaryProgress').innerHTML = `
        <strong>${learnedTotal} / ${total}</strong> mõistet selgeks märgitud
        <div class="progress-bar"><div class="progress-fill" style="width:${total ? Math.round(100 * learnedTotal / total) : 0}%"></div></div>
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
    topicButtons.forEach(button => {
      button.addEventListener('click', () => setTopicFilter(button.dataset.glossaryTopic));
    });
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem(GLOSSARY_LEARNED_KEY);
      render();
    });
    render();
  };
})();

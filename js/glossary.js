/* ===== Course glossary from Moodle ===== */

window.GLOSSARY = [
  {
    term: "Ahel",
    def: "Ahel graafis G on selline tippude järjend v0, v1, ..., vk, kus iga kaks järjestikust tippu on ühendatud servaga. Tippe v0 ja vk nimetame ahela otstippudeks, ülejäänud tippe ahela sisetippudeks. Ahela v0, v1, ..., vk pikkuseks loeme arvu k.",
  },
  {
    term: "Alamgraaf",
    def: "Graafi G′ = (V′, E′) nimetame graafi G = (V, E) alamgraafiks, kui ta on saadud graafist G teatud hulga tippude ja servade kustutamisel ehk V′ ⊆ V ja E′ ⊆ E.",
  },
  {
    term: "Alusgraaf",
    def: "Suunatud graafi alusgraaf on suunamata graaf, mis on saadud suunatud graafi kaarte asendamisel servadega, kusjuures silmused on eemaldatud.",
  },
  {
    term: "Boole'i funktsioon",
    def: "Kujutust {0,1}^n → {0,1} nimetame n-kohaliseks Boole'i funktsiooniks.",
  },
  {
    term: "De Morgani seadused",
    def: "¬(F ∨ G) ≡ ¬F & ¬G<br>¬(F & G) ≡ ¬F ∨ ¬G",
  },
  {
    term: "Disjunktiivne normaalkuju",
    def: "Lausearvutuse valemi F disjunktiivseks normaalkujuks (DNK) nimetame valemiga F samaväärset valemit, mis kujutab endast erinevate lihtkonjunktsioonide disjunktsiooni. Disjunktiivses normaalkujus esinevaid lihtkonjunktsioone nimetame selle DNK liikmeteks.",
  },
  {
    term: "Distributiivsuse seadused",
    def: "F & (G ∨ H) ≡ F & G ∨ F & H<br>F ∨ G & H ≡ (F ∨ G) & (F ∨ H)",
  },
  {
    term: "Eraldav tipp",
    def: "Graafi tippu v nimetame eraldavaks tipuks, kui tema eemaldamisel graafist koos temaga intsidentsete servadega graafi sidususkomponentide arv kasvab.",
  },
  {
    term: "Euleri ahel",
    def: "Euleri ahel on ahel, mis sisaldab graafi iga serva täpselt ühe korra.",
  },
  {
    term: "Euleri graaf",
    def: "Euleri graaf on sidus graaf, milles leidub kinnine Euleri ahel.",
  },
  {
    term: "Graaf",
    def: "Graaf on paar G = (V, E), kus V on mittetühi hulk ja E on hulk, mille elementideks on hulga V mingid kaheelemendilised alamhulgad. Hulga V elemente nimetame graafi G tippudeks ja hulga E elemente graafi G servadeks.",
  },
  {
    term: "Graafide isomorfism",
    def: "Graafe G = (V, E) ja G′ = (V′, E′) nimetame isomorfseteks, kui leidub selline bijektiivne kujutus φ: V → V′, et uv ∈ E parajasti siis, kui φ(u)φ(v) ∈ E′.",
  },
  {
    term: "Graafi kaal",
    def: "Kaalutud graafi G kaaluks ω(G) loeme tema servade kaalude summa.",
  },
  {
    term: "Hamiltoni ahel",
    def: "Hamiltoni ahel on ahel, mis läbib graafi igat tippu täpselt ühe korra.",
  },
  {
    term: "Hamiltoni graaf",
    def: "Hamiltoni graaf on graaf, mis sisaldab Hamiltoni tsüklit.",
  },
  {
    term: "Interpretatsioon",
    def: "Signatuuri σ = ⟨C; F; P⟩ interpretatsioon on järjestatud paar α = ⟨Mα; Iα⟩, kus Mα on mingi mittetühi hulk, mida nimetame põhihulgaks ehk interpretatsiooni kandjaks, ja Iα on interpreteeriv kujutus, mis teisendab iga konstantsümboli c ∈ C hulga Mα mingiks elemendiks cα; iga n-kohalise funktsionaalsümboli f ∈ F mingiks n-kohaliseks funktsiooniks fα: Mα^n → Mα; iga n-kohalise predikaatsümboli P ∈ P mingiks n-kohaliseks predikaadiks Pα: Mα^n → {0,1}.",
  },
  {
    term: "Intsidentsus",
    def: "Kui graafi tipp v kuulub servale e, siis ütleme, et tipp v ja serv e on intsidentsed.",
  },
  {
    term: "Isoleeritud tipp",
    def: "Graafi tippu v nimetame isoleeritud tipuks, kui tema aste on 0.",
  },
  {
    term: "Järeldumine lausearvutuses",
    def: "Ütleme, et lausearvutuse valemitest F1, F2, ..., Fn järeldub valem G, kui igal neis valemites esinevate muutujate väärtustusel, millel valemid F1, F2, ..., Fn on tõesed, on tõene ka valem G. Järeldumist tähistame F1, F2, ..., Fn ⊨ G.",
  },
  {
    term: "Järeldumine predikaatarvutuses",
    def: "Ütleme, et predikaatarvutuse valemitest F1, ..., Fn järeldub predikaatarvutuse valem G, kui igas interpretatsioonis vabade muutujate kõikidel väärtustel, kus valemid F1, ..., Fn on tõesed, on ka valem G tõene. Tähistame seda F1, ..., Fn ⊨ G.",
  },
  {
    term: "Kaalutud graaf",
    def: "Kaalutud graafiks nimetame kolmikut (V, E, ω), kus (V, E) on graaf ja ω: E → R+ on kujutus. Positiivset reaalarvu ω(e) nimetame serva e kaaluks.",
  },
  {
    term: "Kaar",
    def: "Olgu meil tegemist suunatud graafiga G = (V, E). Hulga E elemente nimetame selle graafi kaarteks. Kaare e = (u, v) algtipuks nimetame tippu u ja lõpptipuks tippu v. Ütleme, et kaar e väljub tipust u ja siseneb tippu v.",
  },
  {
    term: "Kehtestatavus lausearvutuses",
    def: "Lausearvutuse valem on kehtestatav, kui ta on tõene vähemalt ühel väärtustusel.",
  },
  {
    term: "Kehtestatavus predikaatarvutuses",
    def: "Predikaatarvutuse valemit F nimetame kehtestatavaks, kui ta on tõene vähemalt ühes interpretatsioonis oma vabade muutujate mingitel väärtustel.",
  },
  {
    term: "Kinnine ahel",
    def: "Kinnine ahel on ahel, mille esimene ja viimane tipp on samad.",
  },
  {
    term: "Konjunktiivne normaalkuju",
    def: "Lausearvutuse valemi F konjunktiivseks normaalkujuks (KNK) nimetame valemiga F samaväärset valemit, mis kujutab endast erinevate lihtdisjunktsioonide konjunktsiooni. Konjunktiivses normaalkujus esinevaid lihtdisjunktsioone nimetame selle KNK liikmeteks.",
  },
  {
    term: "Korrektsus",
    def: "Formaalset aksiomaatilist teooriat T nimetatakse korrektseks semantika S suhtes, kui iga teoorias T tuletatav valem on tõene semantikas S.",
  },
  {
    term: "Kruskali algoritm",
    def: "Kruskali algoritm leiab suvalise sidusa kaalutud graafi minimaalse kaaluga toespuu. Algoritm: vali servaks e1 graafi G minimaalse kaaluga serv. Iga i = 2, 3, ..., n − 1 korral vali servaks ei graafi G minimaalse kaaluga serv, mis erineb servades e1, ..., ei−1 ja ei moodusta nendega tsüklit. Tulemuseks tagasta graaf T = (V, {e1, ..., en−1}).",
  },
  {
    term: "Kvantorid",
    def: "Olgu P(x1, ..., xi, ..., xn) hulgal M defineeritud n-kohaline predikaat, kus n ≥ 1 ja i ∈ {1, ..., n}. Kirjutis ∀xiP(x1, ..., xi, ..., xn) tähistab (n − 1)-kohalist predikaati, mis on tõene parajasti siis, kui ülejäänud muutujate väärtuste korral hulga M iga elemendi m korral on P tõene. Operaatorit ∀ nimetame üldisuskvantoriks ehk universaalsuskvantoriks. Kirjutis ∃xiP(x1, ..., xi, ..., xn) tähistab (n − 1)-kohalist predikaati, mis on tõene parajasti siis, kui mingi hulga M elemendi m korral on P tõene. Operaatorit ∃ nimetame olemasolukvantoriks ehk eksistentsikvantoriks.",
  },
  {
    term: "Lausearvutuse lause",
    def: "Lausearvutuse lause on lause, millele saab vastavusse seada tõeväärtuse. Sealjuures rahuldavad lausearvutuse laused kahte tingimust: välistatud kolmanda seadus - iga lause on kas tõene või väär; mittevasturääkivuse seadus - ükski lause pole korraga nii tõene kui väär.",
  },
  {
    term: "Lausearvutuse valem",
    def: "Lausearvutuse valemid on parajasti need avaldised, mida saab koostada järgmiste reeglite abil: iga lausemuutuja on lausearvutuse valem; kui F on lausearvutuse valem, siis ¬F on lausearvutuse valem; kui F ja G on lausearvutuse valemid, siis (F & G), (F ∨ G), (F ⇒ G) ja (F ⇔ G) on lausearvutuse valemid.",
  },
  {
    term: "Lausemuutuja",
    def: "Lausearvutuses tähistame lihtlauseid suurte ladina tähtedega, näiteks A, B, C, mida nimetame lausemuutujateks.",
  },
  {
    term: "Leht",
    def: "Leht on puu rippuv tipp.",
  },
  {
    term: "Lihtahel",
    def: "Lihtahel on ahel, mille kõik tipud on erinevad.",
  },
  {
    term: "Lihtdisjunktsioon",
    def: "Lausearvutuse valemit nimetame lihtdisjunktsiooniks ehk elementaardisjunktsiooniks, kui ta on moodustatud literaalidest vaid disjunktsiooni tehte abil, kusjuures iga lausemuutuja esineb selles valemis kuni üks kord. See tähendab, et lihtdisjunktsioon on lausearvutuse valem kujul L1 ∨ L2 ∨ ... ∨ Ln, kus L1, L2, ..., Ln on literaalid.",
  },
  {
    term: "Lihtkonjunktsioon",
    def: "Lausearvutuse valemit nimetame lihtkonjunktsiooniks ehk elementaarkonjunktsiooniks, kui ta on moodustatud literaalidest vaid konjunktsiooni tehte abil, kusjuures iga lausemuutuja esineb selles valemis kuni üks kord. See tähendab, et lihtkonjunktsioon on lausearvutuse valem kujul L1 & L2 & ... & Ln, kus L1, L2, ..., Ln on literaalid.",
  },
  {
    term: "Literaal",
    def: "Lausemuutujat või tema eitust nimetame literaaliks. Lausemuutujat nimetame positiivseks literaaliks. Lausemuutuja eitust nimetame negatiivseks literaaliks. Näiteks lausemuutujad X, Y on positiivsed literaalid, samas ¬X on negatiivne literaal.",
  },
  {
    term: "Mets",
    def: "Mets on graaf, mille kõik sidususkomponendid on puud.",
  },
  {
    term: "Naaberservad",
    def: "Naaberservad on graafi servad, millel leidub ühine otstipp.",
  },
  {
    term: "Naabertipud",
    def: "Naabertipud on tipud, mille vahel leidub ühine serv.",
  },
  {
    term: "Naabrusmaatriks",
    def: "Olgu graaf G = (V, E) tippude hulgaga V = {v1, ..., vn}. Graafi G naabrusmaatriksiks nimetatakse n × n-maatriksit A = (aij), kus aij = 1 parajasti siis, kui {vi, vj} ∈ E. Vastasel juhul aij = 0. Kui meil on tegemist suunatud graafiga F = (V1, E1), siis naabrusmaatriks on n × n-maatriks B = (bij), kus bij = 1 parajasti siis, kui (vi, vj) ∈ E1. Vastasel juhul bij = 0.",
  },
  {
    term: "Neelamisseadused",
    def: "F & (F ∨ G) ≡ F<br>F ∨ F & G ≡ F",
  },
  {
    term: "Nullgraaf",
    def: "Nullgraaf on graaf, milles puuduvad servad. n-tipulist nullgraafi tähistame sümboliga On.",
  },
  {
    term: "Otstipud",
    def: "Iga graafi serv on intsidentne täpselt kahe tipuga, mida nimetame selle serva otstippudeks.",
  },
  {
    term: "Predikaadi tõesuspiirkond",
    def: "Predikaadi P: M^n → {0,1} tõesuspiirkonnaks nimetame hulka Tp ⊆ M^n, kus Tp = {(a1, a2, ..., an) ∈ M^n | P(a1, a2, ..., an) = 1}.",
  },
  {
    term: "Predikaat",
    def: "Mittetühjal hulgal M defineeritud n-kohaliseks predikaadiks nimetame kujutust P: M^n → {0,1}. Hulka M^n nimetame selle predikaadi indiviidide piirkonnaks.",
  },
  {
    term: "Predikaatarvutuse valem",
    def: "Predikaatarvutuse valemid on parajasti need avaldised, mida saab moodustada järgmiste reeglite abil: kui P on n-kohaline predikaatsümbol ja t1, t2, ..., tn on termid, siis P(t1, t2, ..., tn) on predikaatarvutuse valem; kui F on predikaatarvutuse valem, siis ¬F on predikaatarvutuse valem; kui F ja G on predikaatarvutuse valemid, siis (F & G), (F ∨ G), (F ⇒ G) ja (F ⇔ G) on predikaatarvutuse valemid; kui x on indiviidmuutuja ja F on predikaatarvutuse valem, siis ∀xF ja ∃xF on predikaatarvutuse valemid. Ainult esimese punkti põhjal moodustatud valemeid nimetame atomaarseteks valemiteks ehk elementaarvalemiteks.",
  },
  {
    term: "Prefikskuju",
    def: "Ütleme, et predikaatarvutuse valem F on prefikskujul, kui ta ei sisalda kvantoreid või F = Q1x1Q2x2...QnxnF′, kus Q1, Q2, ..., Qn on kvantorid, x1, x2, ..., xn on indiviidmuutujad ning valem F′ on kvantoriteta valem, mida nimetame valemi F maatriksiks.",
  },
  {
    term: "Primi algoritm",
    def: "Primi algoritm leiab suvalise sidusa kaalutud graafi vähima kaaluga toespuu. Algoritm: vali graafis G välja suvaline tipp v. Olgu T0 graaf ainsa tipuga v ja olgu U := V ∖ {v}. Iga i = 1, ..., n − 1 korral leia graafist G vähima kaaluga serv ei, mis ühendab mingit graafi Ti−1 tippu mingi U tipuga wi; lisa alamgraafile Ti−1 serv ei koos tipuga wi, tähista saadud graaf Ti; eemalda wi hulgast U. Tagasta graaf Tn−1.",
  },
  {
    term: "Puu",
    def: "Graafi nimetame puuks, kui ta on sidus ja ei sisalda ühtegi tsüklit.",
  },
  {
    term: "Puu sisetipp",
    def: "Puu tippe, mis pole lehed, nimetame sisetippudeks.",
  },
  {
    term: "Regulaarne graaf",
    def: "Graafi nimetame regulaarseks, kui tema kõikide tippude astmed on võrdsed. Kui kõikide tippude astmed on võrdsed arvuga k, siis öeldakse, et graaf on k-regulaarne.",
  },
  {
    term: "Rippuv tipp",
    def: "Graafi tippu v nimetame rippuvaks tipuks, kui tema aste on 1.",
  },
  {
    term: "Samaselt tõesus lausearvutuses",
    def: "Lausearvutuse valem on samaselt tõene, kui ta on tõene igal väärtustusel.",
  },
  {
    term: "Samaselt tõesus predikaatarvutuses",
    def: "Predikaatarvutuse valemit F nimetame samaselt tõeseks, kui ta on tõene igas interpretatsioonis oma vabade muutujate kõikidel väärtustel.",
  },
  {
    term: "Samaselt väärus lausearvutuses",
    def: "Lausearvutuse valem on samaselt väär, kui ta on väär igal väärtustusel.",
  },
  {
    term: "Samaselt väärus predikaatarvutuses",
    def: "Predikaatarvutuse valemit F nimetame samaselt vääraks, kui ta on väär igas interpretatsioonis oma vabade muutujate kõikidel väärtustel.",
  },
  {
    term: "Samaväärsus lausearvutuses",
    def: "Lausearvutuse valemid F ja G on samaväärsed, kui nende tõeväärtused on võrdsed igal nendes valemites esinevate muutujate väärtustusel. Samaväärsust tähistame F ≡ G.",
  },
  {
    term: "Samaväärsus predikaatarvutuses",
    def: "Predikaatarvutuse valemeid F ja G nimetame samaväärseteks, kui nende tõeväärtused on võrdsed igas interpretatsioonis valemite vabade muutujate kõikidel väärtustel. Tähistame seda F ≡ G.",
  },
  {
    term: "Sekvents",
    def: "Sekventsideks nimetatakse sümbolite järjendeid kujul ⊢ G ja F1, F2, ..., Fn ⊢ G, kus F1, F2, ..., Fn, G on lausearvutuse valemid, mis ei sisalda ekvivalentsitehet.",
  },
  {
    term: "Sekventsi eesliige",
    def: "Sekventsi F1, F2, ..., Fn ⊢ G eesliikmeks ehk antetsedendiks nimetatakse valemite järjendit F1, F2, ..., Fn.",
  },
  {
    term: "Sekventsi tagaliige",
    def: "Sekventsi F1, F2, ..., Fn ⊢ G tagaliikmeks ehk suktsedendiks nimetatakse valemit G.",
  },
  {
    term: "Sekventsi valemkuju",
    def: "Sekventsi F1, F2, ..., Fn ⊢ G valemkujuks nimetatakse lausearvutuse valemit F1 & F2 & ... & Fn ⇒ G. Sekventsi ⊢ G valemkujuks nimetatakse lausearvutuse valemit G.",
  },
  {
    term: "Sidus graaf",
    def: "Graafi nimetame sidusaks, kui selle iga kahe tipu vahel leidub ahel.",
  },
  {
    term: "Sidususkomponent",
    def: "Graafi G sidususkomponent on graafi sidus alamgraaf, mis ei kuulu ühtegi teise graafi G sidusasse alamgraafi.",
  },
  {
    term: "Signatuur",
    def: "Signatuuriks nimetame järjestatud kolmikut σ = ⟨C; F; P⟩, kus C on konstantsümbolite hulk, F on funktsionaalsümbolite hulk ja P on mittetühi predikaatsümbolite hulk.",
  },
  {
    term: "Sild",
    def: "Graafi serva nimetame sillaks, kui tema eemaldamisel graafi sidususkomponentide arv suureneb.",
  },
  {
    term: "Silmus",
    def: "Suunatud graafis nimetame silmuseks kaart, mille alg- ja lõpptipp on samad.",
  },
  {
    term: "Sisend",
    def: "Suunatud graafi sisend on tipp, millesse ei sisene ühtegi kaart.",
  },
  {
    term: "Sisendaste",
    def: "Suunatud graafi tipu sisendastmeks nimetame sellesse tippu sisenevate kaarte arvu.",
  },
  {
    term: "Suunatud graaf",
    def: "Suunatud graaf on paar (V, E), kus V on mittetühi hulk ja E ⊆ V × V. Hulga V elemente nimetame graafi tippudeks, hulga E elemente graafi kaarteks.",
  },
  {
    term: "Tehe",
    def: "Olgu n naturaalarv ja X mittetühi hulk. Hulgal X määratud n-kohaliseks ehk n-aarseks tehteks nimetatakse kujutust hulgast X^n hulka X. Nullkohaline tehe on hulgast X elemendi fikseerimine, ühekohaline tehe seab igale hulga X elemendile vastavusse mingi hulga X elemendi, kahekohaline tehe seab igale elementide paarile (x, y) ∈ X vastavusse elemendi hulgast X jne.",
  },
  {
    term: "Term",
    def: "Termid signatuuris σ on parajasti need avaldised, mida saab koostada järgmiste reeglite abil: iga indiviidmuutuja on term; iga signatuuri σ konstantsümbol on term; kui f on signatuuri σ n-kohaline funktsionaalsümbol ja t1, t2, ..., tn on termid, siis f(t1, t2, ..., tn) on term.",
  },
  {
    term: "Tipuaste",
    def: "Graafi tipu v astmeks ehk valentsiks nimetame selle tipuga intsidentsete servade arvu. Tipu v astet tähistame d(v).",
  },
  {
    term: "Toespuu",
    def: "Sidusa graafi toespuuks ehk aluspuuks nimetame tema sellist alamgraafi, mis sisaldab kõiki tema tippe ning on puu.",
  },
  {
    term: "Tsükkel",
    def: "Tsükkel on kinnine ahel, milles on vähemalt kolm serva ning mis ei läbi ühtegi tippu kaks korda.",
  },
  {
    term: "Tuletatav valem",
    def: "Valemit nimetatakse tuletatavaks formaalses aksiomaatilises teoorias, kui leidub tuletus, mille viimane liige see valem on.",
  },
  {
    term: "Tuletus",
    def: "Tuletuseks ehk formaalseks tõestuseks nimetatakse formaalses aksiomaatilises teoorias sellist valemite järjendit, kus iga valem on kas aksioom või saadud mingi tuletusreegli abil mingitest talle eelnevatest valemitest.",
  },
  {
    term: "Täielik disjunktiivne normaalkuju",
    def: "Lausearvutuse valemi F disjunktiivset normaalkuju (DNK) nimetame täielikuks, kui kõik selles esinevad lihtkonjunktsioonid ehk selle DNK liikmed on täielikud lihtkonjunktsioonid.",
  },
  {
    term: "Täielik konjunktiivne normaalkuju",
    def: "Lausearvutuse valemi F konjunktiivset normaalkuju (KNK) nimetame täielikuks, kui kõik selles esinevad lihtdisjunktsioonid ehk selle KNK liikmed on täielikud lihtdisjunktsioonid.",
  },
  {
    term: "Täielikkus",
    def: "Formaalset aksiomaatilist teooriat T nimetatakse täielikuks semantika S suhtes, kui iga semantikas S tõene valem on teoorias T tuletatav.",
  },
  {
    term: "Täielik lihtdisjunktsioon",
    def: "Lihtdisjunktsiooni nimetame täielikuks, kui iga vaatluse all olev lausemuutuja esineb selles täpselt ühe korra. Näiteks kui meil on vaatluse all lausemuutujad X, Y, Z, siis lausearvutuse valem ¬X ∨ Z ∨ ¬Y on täielik elementaardisjunktsioon, aga valem X ∨ Y ei ole.",
  },
  {
    term: "Täielik lihtkonjunktsioon",
    def: "Lihtkonjunktsiooni nimetame täielikuks, kui iga vaatluse all olev lausemuutuja esineb selles täpselt ühe korra. Näiteks kui meil on vaatluse all lausemuutujad X, Y, Z, siis lausearvutuse valem ¬X & Z & ¬Y on täielik elementaarkonjunktsioon, aga valem X & Y ei ole.",
  },
  {
    term: "Täiendgraaf",
    def: "Graafi G = (V, E) täiendgraaf ehk täiend on graaf Ḡ = (V′, E′), mille tippude hulk on sama, mis G tippude hulk (V′ = V), aga servade hulka E′ kuuluvad parajasti need servad, mis hulka E ei kuulu.",
  },
  {
    term: "Täisgraaf",
    def: "Täisgraaf on graaf, mille iga kahe tipu vahel on serv. n-tipulist täisgraafi tähistatakse sümboliga Kn.",
  },
  {
    term: "Valemi mudel",
    def: "Valemi F mudeliks nimetame sellist interpretatsiooni α, milles valem F on tõene oma vabade muutujate kõikidel väärtustel. Sel juhul öeldakse, et valem F on tõene mudelis α. Interpretatsiooni α nimetame valemite hulga {F1, ..., Fn} mudeliks, kui see interpretatsioon on iga üksiku valemi mudel.",
  },
  {
    term: "Väljund",
    def: "Suunatud graafi väljund on tipp, millest ei välju ühtegi kaart.",
  },
  {
    term: "Väljundaste",
    def: "Suunatud graafi tipu väljundastmeks nimetame sellest tipust väljuvate kaarte arvu.",
  },
  {
    term: "Väärtustus",
    def: "Olgu meil vaatluse all n lausemuutujat X1, X2, ..., Xn. Kui igale lausemuutujale omistame tõeväärtuse 1 või 0, siis sellist tõeväärtuste komplekti nimetame nende lausemuutujate väärtustuseks.",
  },
];

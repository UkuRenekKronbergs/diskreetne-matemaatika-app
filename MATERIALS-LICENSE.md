# Õppematerjalide kasutuspiirang

See fail eristab rakenduse koodi ja õppematerjalid.

## Mis ei kuulu MIT-litsentsi alla

MIT-litsents ei laiene järgmistele failidele ega sisule:

- `materjalid/` kaustas olevad PDF-id ja kursusefailid;
- vanad kontrolltööd, harjutusvariandid ja lahendused;
- `data/extracted.json`, kui see sisaldab PDF-idest ekstraktitud teksti;
- kursuse Moodle'i, konspekti, ülesannetekogu või sõnastiku täistekst, kui selle kasutamiseks pole eraldi luba.

Need materjalid kuuluvad oma autoritele ja/või Tartu Ülikoolile. Neid tohib kasutada ainult sellises ulatuses, milleks kasutajal on õigus.

Erand: `materjalid/Kontrolltoo_1_*.pdf`, `materjalid/KT2_*.pdf` ja `materjalid/KT2_*.tex` failid on AI-genereeritud harjutusvariandid, nende lahendused ja lahenduste lähtefailid. Need võib avalikku reposse ja avalikku veebiversiooni lisada harjutusmaterjalina.

## Avalik repo või avalik veebiversioon

Avalikku reposse või avalikku veebiversiooni ei tohiks lisada:

- `materjalid/` kausta muid faile peale AI-genereeritud `Kontrolltoo_1_*.pdf`, `KT2_*.pdf` ja `KT2_*.tex` harjutusfailide;
- `data/extracted.json`;
- `.git/` kataloogi sisaldavat arhiivi;
- muid faile, mis sisaldavad kolmanda osapoole õppematerjalide täisteksti.

Avalikult jagatav versioon peaks sisaldama ainult rakenduse koodi, enda kirjutatud seletusi ja tööriistu ning avaldamiseks lubatud AI-genereeritud harjutusmaterjale.

## Lokaalne kasutus

Kui sul on kursuse materjalide kasutamiseks õigus, võid hoida muid `materjalid/` faile ja `data/extracted.json` faili oma lokaalses koopias. Need failid on `.gitignore` abil avalikust koodirepost eraldatud.

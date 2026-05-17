# Õppematerjalide kasutuspiirang

See fail eristab rakenduse koodi ja õppematerjalid.

## Mis ei kuulu MIT-litsentsi alla

MIT-litsents ei laiene järgmistele failidele ega sisule:

- `materjalid/` kaustas olevad PDF-id ja kursusefailid;
- vanad kontrolltööd, harjutusvariandid ja lahendused;
- `data/extracted.json`, kui see sisaldab PDF-idest ekstraktitud teksti;
- kursuse Moodle'i, konspekti, ülesannetekogu või sõnastiku täistekst, kui selle kasutamiseks pole eraldi luba.

Need materjalid kuuluvad oma autoritele ja/või Tartu Ülikoolile. Neid tohib kasutada ainult sellises ulatuses, milleks kasutajal on õigus.

## Avalik repo või avalik veebiversioon

Avalikku reposse või avalikku veebiversiooni ei tohiks lisada:

- `materjalid/`;
- `data/extracted.json`;
- `.git/` kataloogi sisaldavat arhiivi;
- muid faile, mis sisaldavad kolmanda osapoole õppematerjalide täisteksti.

Avalikult jagatav versioon peaks sisaldama ainult rakenduse koodi, enda kirjutatud seletusi ja tööriistu.

## Lokaalne kasutus

Kui sul on kursuse materjalide kasutamiseks õigus, võid hoida `materjalid/` kausta ja `data/extracted.json` faili oma lokaalses koopias. Need failid on `.gitignore` abil avalikust koodirepost eraldatud.

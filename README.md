# TessOro — portatessere digitale

Applicazione web installabile (PWA) per iPhone e Android, derivata dalla versione Tesseria 1.2.39. TessOro 1.0.0 mantiene scansione dei codici, foto del fronte, ordinamento, backup e consultazione offline.

## Pubblicazione in un nuovo repository
1. Crea il repository pubblico `tessoro` nel tuo account GitHub.
2. Carica **il contenuto di questa cartella** nella radice del repository, non la cartella stessa.
3. In Settings → Pages seleziona Deploy from a branch, `main`, `/ (root)`.
4. Apri `https://gabriele1211.github.io/tessoro/`.
5. Su iPhone: Safari → Condividi → Aggiungi alla schermata Home. Su Android: Chrome → Installa app.

## Dati e migrazione
Le tessere e le fotografie sono archiviate localmente nel browser/dispositivo, non su GitHub. I dati salvati sotto il dominio/percorso di Tesseria **non vengono trasferiti automaticamente** alla nuova installazione: in Tesseria esporta un backup JSON e in TessOro importalo. TessOro accetta backup `Tesseria` e `TessOro`. Il nuovo nome usa chiavi locali e database distinti.

## Note
La scansione può dipendere da browser, illuminazione, qualità del codice e hardware della cassa. Il primo caricamento del motore di scansione può richiedere Internet. Verificare il comportamento reale su iOS e Android. I testi legali vanno verificati rispetto agli obblighi applicabili; il cambio di nome non costituisce una verifica della disponibilità del marchio TessOro.

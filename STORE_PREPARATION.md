# TessOro — preparazione per App Store e Google Play

Questo ramo **store-preparation** non modifica il sito GitHub Pages (ramo main).
È una base di packaging Capacitor, **non ancora un'app verificata o pubblicabile**.

## Requisiti
- Node.js 20 o 22 e npm
- Android Studio e Android SDK per Android
- macOS con Xcode per iOS
- Account sviluppatore Apple/Google per la distribuzione

## Procedura
1. Clonare il repository e passare a `store-preparation`.
2. Eseguire `npm install` (crea il lockfile) e `npm run web:prepare`.
3. Eseguire `npx cap add android` e, su macOS, `npx cap add ios`.
4. Eseguire `npm run native:sync`.
5. Aprire i progetti con `npx cap open android` / `npx cap open ios`.

`scripts/prepare-native.mjs` copia i file web nella cartella `www/`, escluso il service worker. Le modifiche alla PWA originale restano intatte. La compilazione nativa deve essere effettuata e verificata prima della pubblicazione.

## Blocchi da risolvere prima di uno store
- Verificare il funzionamento della fotocamera con WKWebView e Android WebView, incluse autorizzazioni e scansione codici.
- Verificare `createImageBitmap`, IndexedDB, localStorage e la selezione fotografie su dispositivi reali; aggiungere bridge/plugin nativi dove necessario.
- Verificare l'esportazione e l'importazione dei backup JSON: la modalità `Blob` + download del browser potrebbe non funzionare in una WebView.
- Adattare guida all'installazione PWA e avvisi di aggiornamento per le versioni native.
- Verificare e, se necessario, incorporare localmente la libreria scanner attualmente caricata da CDN, per un uso offline affidabile.
- Preparare icone native, splash screen, screenshot, informative privacy e dichiarazioni dei permessi.
- Definire firma, versionCode/versionName Android, bundle identifier definitivo iOS, provisioning e pacchetti firmati.
- Testare la migrazione: i dati della PWA GitHub Pages **non sono condivisi** con l'app nativa. Esportare il backup dalla PWA e importarlo nella nuova app.

## Identificativo provvisorio
`io.github.gabriele1211.tessoro` — confermare prima della prima pubblicazione; cambiarlo dopo la distribuzione crea un'app distinta.

## Sicurezza
Non caricare su GitHub chiavi di firma, certificati, password o profili privati.

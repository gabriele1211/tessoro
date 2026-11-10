import {cpSync,copyFileSync,existsSync,mkdirSync,rmSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
const root=resolve(import.meta.dirname,'..'),out=join(root,'www');
const files=['index.html','style.css','app.js','photos.js','version.js','manifest.webmanifest'];
for(const file of files){if(!existsSync(join(root,file)))throw Error('File mancante: '+file)}
if(!existsSync(join(root,'icons')))throw Error('Cartella icons mancante');
rmSync(out,{recursive:true,force:true});mkdirSync(out,{recursive:true});
for(const file of files)copyFileSync(join(root,file),join(out,file));
cpSync(join(root,'icons'),join(out,'icons'),{recursive:true});
// The native bundle is offline-capable without a PWA service worker.
// Keep the original app code for the web edition; remove only SW registration in the native copy.
let app=readFileSync(join(out,'app.js'),'utf8');
app=app.replace(/if\s*\(\s*['"]serviceWorker['"]\s+in\s+navigator\s*\)/g,'if (false)');
writeFileSync(join(out,'app.js'),app);
let html=readFileSync(join(out,'index.html'),'utf8');
html=html.replace(/<link rel="manifest" href="\.\/manifest\.webmanifest">/,'');
writeFileSync(join(out,'index.html'),html);
console.log('TessOro native web assets prepared in www/');

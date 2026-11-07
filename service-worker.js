/* TessOro 1.0.3: navigazione network-first, risorse statiche cache-first per offline. */
const CACHE='tessoro-v1.0.3';
const ASSETS=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./version.js','./photos.js','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('tessoro-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin)return;
 if(req.mode==='navigate'){
  event.respondWith(fetch(req,{cache:'no-store'}).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy)).catch(()=>{})}return response}).catch(async()=>await caches.match('./index.html')||await caches.match('./')));
  return;
 }
 const dynamic=/\/(app|photos|version)\.js$|\/style\.css$/.test(url.pathname);
 if(dynamic){event.respondWith(fetch(req,{cache:'no-store'}).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{})}return response}).catch(()=>caches.match(req)));return}
 event.respondWith(caches.match(req).then(cached=>cached||fetch(req)));
});

self.addEventListener('message',event=>{if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting()});

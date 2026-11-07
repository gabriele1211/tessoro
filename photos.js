'use strict';
/* Foto locali in IndexedDB; nessuna trasmissione a server. */
window.TessOroPhotos=(()=>{
 const DB='tessoro.photos.v1',STORE='fronts';
 function open(){return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore(STORE);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
 async function transaction(mode,action){const db=await open();return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,mode),req=action(tx.objectStore(STORE));req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);tx.oncomplete=()=>db.close();tx.onabort=()=>reject(tx.error)})}
 const get=id=>transaction('readonly',s=>s.get(id));
 const put=(id,data)=>transaction('readwrite',s=>s.put(data,id));
 const del=id=>transaction('readwrite',s=>s.delete(id));
 async function compress(file){if(!file.type.startsWith('image/'))throw Error('Seleziona una fotografia');if(file.size>15_000_000)throw Error('Foto troppo grande (max 15 MB)');const bitmap=await createImageBitmap(file);const scale=Math.min(1,1400/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();return canvas.toDataURL('image/jpeg',0.78)}
 return {get,put,del,compress};
})();

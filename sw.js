const CACHE='casa-en-calma-v5';
const ASSETS=['./','./index.html','./manifest.json','./assets/icon-192.png','./assets/icon-512.png','./assets/icon-maskable-512.png','./assets/logo-casa-en-calma.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  // Solo GET del mismo sitio; la sincronización y el tiempo van siempre a la red
  if(e.request.method!=='GET'||u.origin!==location.origin||u.pathname.startsWith('/.netlify/'))return;
  e.respondWith(fetch(e.request).then(r=>{
    if(r&&r.ok&&r.status===200){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}
    return r;
  }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});

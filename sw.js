const CACHE='traffic-github-v1';
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(['./index.html','./manifest.webmanifest','./icon.png']);await self.skipWaiting();})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('traffic-github-')&&k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith((async()=>{const c=await caches.open(CACHE);if(e.request.mode==='navigate'){const r=await c.match(new URL('./index.html',self.registration.scope));if(r)return r;}return await c.match(e.request)||fetch(e.request);})());});

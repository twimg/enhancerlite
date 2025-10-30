const CACHE = 'enhancerlite-allinone-v1';
const ASSETS = [
  './MediaEnhancer_Lite_AllInOne_PWA.html',
  './manifest.webmanifest',
  './sw.js'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request).then(res=> res || fetch(e.request).then(r=>{
      const copy = r.clone();
      caches.open(CACHE).then(c=> c.put(e.request, copy)).catch(()=>{});
      return r;
    }).catch(()=> caches.match('./MediaEnhancer_Lite_AllInOne_PWA.html')))
  );
});

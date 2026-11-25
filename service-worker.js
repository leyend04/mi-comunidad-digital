const VERSION = 'mcd-v2-minimalista';
const ASSETS = [
  './', './index.html', './estilos.css', './datos.js', './aplicacion.js',
  './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('mcd-') && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(fetch(request).then(response => {
    if (response.ok && response.type === 'basic') {
      const copia = response.clone();
      caches.open(VERSION).then(cache => cache.put(request, copia)).catch(() => {});
    }
    return response;
  }).catch(async () => {
    const guardado = await caches.match(request);
    if (guardado) return guardado;
    if (request.mode === 'navigate') return caches.match('./index.html');
    return Response.error();
  }));
});

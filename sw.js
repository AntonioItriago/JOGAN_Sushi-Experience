const CACHE_NAME = 'jogan-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/fondo.jpg?v=3',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Instalar Service Worker y forzar activación inmediata
self.addEventListener('install', event => {
  self.skipWaiting(); // Fuerza activación inmediata
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('SW: Error cacheando', err))
  );
});

// Interceptar peticiones y responder desde cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request);
      })
  );
});

// Limpiar caches viejos y tomar control inmediato
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    }).then(() => {
      return self.clients.claim(); // Toma control de todas las pestañas
    })
  );
});
const CACHE_NAME = 'jogan-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/fondo.jpg',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Instalar Service Worker y precargar recursos
self.addEventListener('install', event => {
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

// Limpiar caches viejos al actualizar
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});
/* Caché ligera: sirve cuando abrís la app desde https o localhost (no desde file://). */
const CACHE = "trabajun-v1";
const ASSETS = [
  "./index.html",
  "./css/styles.css",
  "./js/data.js",
  "./js/app.js",
  "./icon.svg",
  "./manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

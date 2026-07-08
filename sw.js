const CACHE_NAME = "app-ligacoes-v1";
const ARQUIVOS = ["./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARQUIVOS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Sempre tenta a rede primeiro (dados de ligação precisam ser atuais);
  // só usa o cache se estiver offline.
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

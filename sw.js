// 改动文件后把版本号加一，旧缓存就会被替换
const CACHE = "art2048-v7";
const FILES = ["./", "index.html", "style.css", "game.js", "manifest.json",
  "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png", "img/lascaux.jpg"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
// 优先联网取最新，断网时用缓存
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request))
  );
});

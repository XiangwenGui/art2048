// 改动文件后把版本号加一，旧缓存就会被替换
const CACHE = "art2048-v11";
// 先缓存界面和缩略图；大图在第一次打开时再缓存
const FILES = ["./", "index.html", "style.css", "data.js", "game.js", "manifest.json",
  "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png",
  "img/thumb/01_sargent.jpg", "img/thumb/02_bouguereau.jpg", "img/thumb/03_ingres.jpg", "img/thumb/04_vermeer.jpg", "img/thumb/05_rembrandt.jpg", "img/thumb/06_velazquez.jpg", "img/thumb/07_artemisia.jpg", "img/thumb/08_caravaggio.jpg", "img/thumb/09_holbein.jpg", "img/thumb/10_raphael.jpg", "img/thumb/11_durer.jpg", "img/thumb/12_leonardo.jpg", "img/thumb/13_botticelli.jpg", "img/thumb/14_vanderweyden.jpg", "img/thumb/15_vaneyck.jpg", "img/thumb/16_giotto.jpg", "img/thumb/17_lascaux.jpg"];
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

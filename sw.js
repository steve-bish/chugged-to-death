const CACHE_NAME = 'chugged2death-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'IMG_5163.jpeg',
  'IMG_5164.jpeg',
  'IMG_5165.jpeg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(response => response || fetch(e.request)));
});

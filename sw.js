const CACHE_NAME = 'chugged2death-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'IMG_5163.jpeg',
  'IMG_5164.jpeg',
  'IMG_5165.jpeg'
];

// Install: Save everything to the phone
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Activate: Clean up old versions
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

// Fetch: Try the cache first, then the network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

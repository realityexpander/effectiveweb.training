
const cacheName = 'stockz-cache-v0.0.5';
const resources = ['index.html', 'style.css', 'app.js', 'd3/d3.js', 'images/logo.svg'];

const prefetch = (name) => caches.open(name).then(cache => cache.addAll(resources));

self.addEventListener('install', event => {
    console.log('worker install');
    self.skipWaiting();
    event.waitUntil(prefetch(cacheName));
}
)

self.addEventListener('fetch', event => {
    const { request } = event;
    console.log('worker onfetch ', request);
    event.respondWith(caches.match(request).
        then(response => (response || fetch(request))))
});

// Clear out the old caches
self.addEventListener('activate', event => {
    console.log('worker cleaning old caches');
    self.clients.claim();
    const staleCaches = caches.keys()
        .then(keys => keys
            .filter(key => key !== cacheName)
            .map(stale => caches.delete(stale))
        );
    event.waitUntil(staleCaches);
})

self.addEventListener('message', event => {
    console.log("worker evt", event);
    caches.delete(cacheName).then(_ => prefetch(cacheName));
});
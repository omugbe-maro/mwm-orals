// MWM Orals offline support. The cache name changes whenever the site or content changes.
const CACHE = 'mwm-orals-8b2064cfe2';
const PRECACHE = ["./", "index.html", "content.json", "manifest.webmanifest", "brand/icon-192.png", "brand/icon-512.png", "fonts/barlow-condensed-latin-600-normal.woff2", "fonts/barlow-condensed-latin-700-normal.woff2", "fonts/ibm-plex-sans-latin-400-normal.woff2", "fonts/ibm-plex-sans-latin-500-normal.woff2", "fonts/ibm-plex-sans-latin-600-normal.woff2", "fonts/ibm-plex-mono-latin-500-normal.woff2"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('mwm-orals-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  const url = new URL(req.url);
  const fresh = req.mode === 'navigate' || url.pathname.endsWith('/content.json') || url.pathname.endsWith('/index.html');
  if (fresh) {
    // network first, so updates show at once; fall back to the cached copy offline
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
  } else {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r; })));
  }
});

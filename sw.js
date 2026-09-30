// Magic Marble has moved to https://www.magic-camelot.com/marble/play/.
// This replacement worker clears the old offline cache and removes itself, so an app installed from
// this address loads the forwarding page on its next start.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => clients.forEach((c) => c.navigate(c.url))),
  );
});

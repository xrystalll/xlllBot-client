const CACHE_NAME = 'xlllBot-client-cache';

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
    .then(keyList =>
      Promise.all(keyList.map(key => {
        if (!cacheWhitelist.includes(key)) {
          return caches.delete(key)
        }
      }))
    )
  )
})

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      fetch('manifest.json')
      .then(response => response.json())
      .then(assets => {
        const resources = [
          '/images/icon-192.png'
        ]
        cache.addAll(resources)
      })
    })
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(err => console.info(err))
    )
  }
})
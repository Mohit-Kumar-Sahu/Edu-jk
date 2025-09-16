const CACHE_NAME = 'edupath-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/favicon.ico',
  '/assets/logo.png',
  // Add other static assets here
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch event - serve cached assets, fallback to network, fallback to offline page
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          // Cache new requests
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === 'basic'
          ) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Fallback to offline page for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
    })
  );
});

// Background sync for offline data (optional, requires registration in app)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-offline-data') {
    event.waitUntil(syncOfflineData());
  }
});

async function syncOfflineData() {
  // Implement logic to sync data stored offline (e.g., IndexedDB) with backend
  // This is a placeholder function and should be customized as per app needs
  try {
    const allClients = await self.clients.matchAll();
    for (const client of allClients) {
      client.postMessage({ type: 'SYNC_STARTED' });
    }
    // Sync logic here...
    for (const client of allClients) {
      client.postMessage({ type: 'SYNC_COMPLETED' });
    }
  } catch (error) {
    console.error('Error syncing offline data:', error);
  }
}

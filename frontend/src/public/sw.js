// Service Worker for EduPath Navigator PWA
const CACHE_NAME = 'edupath-navigator-v2';
const API_CACHE_NAME = 'edupath-api-v1';
const STATIC_CACHE_NAME = 'edupath-static-v1';

const urlsToCache = [
  '/',
  '/manifest.json',
  '/offline.html'
];

const API_ENDPOINTS = [
  '/api/users',
  '/api/achievements',
  '/api/colleges',
  '/api/courses'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then(cache => cache.addAll(urlsToCache)),
      caches.open(API_CACHE_NAME)
    ])
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event with network-first for API calls, cache-first for static assets
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Handle API requests
  if (API_ENDPOINTS.some(endpoint => url.pathname.startsWith(endpoint))) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache successful GET requests
          if (event.request.method === 'GET' && response.status === 200) {
            const responseClone = response.clone();
            caches.open(API_CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Return cached version if network fails
          return caches.match(event.request);
        })
    );
    return;
  }

  // Handle static assets
  if (event.request.destination === 'script' ||
      event.request.destination === 'style' ||
      event.request.destination === 'image' ||
      event.request.destination === 'font') {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request).then(response => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(STATIC_CACHE_NAME).then(cache => {
                cache.put(event.request, responseClone);
              });
            }
            return response;
          });
        })
    );
    return;
  }

  // Default cache-first strategy for other requests
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  try {
    // Get all pending sync items from IndexedDB
    const syncItems = await getSyncItems();

    for (const item of syncItems) {
      try {
        await syncItem(item);
        await removeSyncItem(item.id);
      } catch (error) {
        console.error('Failed to sync item:', item.id, error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Helper functions for IndexedDB operations
async function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('EduPathNavigatorDB', 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function getSyncItems() {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction(['syncQueue'], 'readonly');
    const store = transaction.objectStore('syncQueue');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  } catch (error) {
    console.error('Failed to get sync items:', error);
    return [];
  }
}

async function syncItem(item) {
  try {
    let response;
    switch (item.type) {
      case 'achievement':
        response = await fetch(`/api/achievements/user/${item.userId}/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.data)
        });
        break;
      case 'profile':
        response = await fetch(`/api/users/${item.userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.data)
        });
        break;
      case 'quiz':
        response = await fetch('/api/quiz/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.data)
        });
        break;
      default:
        throw new Error(`Unknown sync type: ${item.type}`);
    }

    if (!response.ok) {
      throw new Error(`Sync failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to sync item:', item.id, error);
    throw error;
  }
}

async function removeSyncItem(id) {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction(['syncQueue'], 'readwrite');
    const store = transaction.objectStore('syncQueue');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.error('Failed to remove sync item:', error);
  }
}

// Push notifications (if needed in future)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: data.data
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

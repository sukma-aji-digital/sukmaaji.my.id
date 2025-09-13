// Service Worker for Sukma Aji Digital PWA - NO CACHE VERSION
// This service worker is configured to NOT cache content to ensure fresh updates

const CACHE_NAME = 'sukma-aji-digital-no-cache-v' + Date.now();

// Install event - skip caching for fresh content
self.addEventListener('install', (event) => {
    console.log('Service Worker installing - NO CACHE mode');
    // Skip waiting to activate immediately
    self.skipWaiting();
});

// Activate event - clear all caches to ensure fresh content
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating - clearing all caches');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    console.log('Deleting cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            // Take control of all clients immediately
            return self.clients.claim();
        })
    );
});

// Fetch event - always fetch from network, no caching
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request.clone()).then((response) => {
            // Always return fresh response from network
            const responseClone = response.clone();

            // Add no-cache headers to the response
            const headers = new Headers(responseClone.headers);
            headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
            headers.set('Pragma', 'no-cache');
            headers.set('Expires', '0');

            return new Response(responseClone.body, {
                status: responseClone.status,
                statusText: responseClone.statusText,
                headers: headers
            });
        }).catch((error) => {
            console.log('Fetch failed, network unavailable:', error);
            // Return a basic offline response
            return new Response('Network unavailable. Please check your connection.', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                    'Content-Type': 'text/plain',
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
                })
            });
        })
    );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('Background sync triggered');
        // Handle background sync tasks here
    }
});

// Push notification handler
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: '/images/logo.webp',
        badge: '/images/logo.webp',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '2'
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore',
                icon: '/images/logo.webp'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/images/logo.webp'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Sukma Aji Digital', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'explore') {
        // Open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    } else if (event.action === 'close') {
        // Do nothing, notification is already closed
    } else {
        // Default action - open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handler for manual cache clearing
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        console.log('Manually clearing cache:', cacheName);
                        return caches.delete(cacheName);
                    })
                );
            })
        );
    }
});

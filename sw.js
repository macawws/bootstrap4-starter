/*
 *  Firmino.us
 *  Copyright 2016. All rights reserved.
 *
 */

// Use a cacheName for cache versioning
var cacheName = 'v1:static';

// During the installation phase, you'll usually want to cache static assets.
self.addEventListener('install', function(e) {
    // Once the service worker is installed, go ahead and fetch the resources to make this work offline.
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
              '/',
              '/assets/dist/css/blackpalm.min.css',
              '/assets/dist/js/blackpalm.min.js'
            ]).then(function() {
                self.skipWaiting();
            });
        })
    );
});


self.addEventListener('activate',  function(event) {
  event.waitUntil(self.clients.claim());
});

// when the browser fetches a URL…
self.addEventListener('fetch', function(event) {
    // … either respond with the cached object or go ahead and fetch the actual URL
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                // retrieve from cache
                return response;
            }
            // fetch as normal
            return fetch(event.request);
        })
    );
});
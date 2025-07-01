const CACHE_NAME = 'ai-assistant-v1'
const urlsToCache = [
	'/',
	'/api/chat',
	'https://telegram.org/js/telegram-web-app.js',
]

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
	)
})

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			if (response) {
				return response
			}
			return fetch(event.request)
		})
	)
})

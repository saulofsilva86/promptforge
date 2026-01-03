// ==================== SERVICE WORKER ====================
// PromptForge PWA

const CACHE_NAME = 'promptforge-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './app.html',
    './styles.css',
    './app.js',
    './data.js',
    './auth.js',
    './manifest.json'
];

// Instalação
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker: Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Service Worker: Cacheando arquivos');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                console.log('✅ Service Worker: Instalado!');
                return self.skipWaiting();
            })
    );
});

// Ativação
self.addEventListener('activate', (event) => {
    console.log('🚀 Service Worker: Ativando...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('🗑️ Service Worker: Limpando cache antigo');
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => {
            console.log('✅ Service Worker: Ativo!');
            return self.clients.claim();
        })
    );
});

// Fetch - Estratégia: Network First, Cache Fallback
self.addEventListener('fetch', (event) => {
    // Ignora requests para o Google Apps Script (sempre online)
    if (event.request.url.includes('script.google.com')) {
        event.respondWith(fetch(event.request));
        return;
    }
    
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Clona a resposta para o cache
                const responseClone = response.clone();
                caches.open(CACHE_NAME)
                    .then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                return response;
            })
            .catch(() => {
                // Se offline, busca no cache
                return caches.match(event.request)
                    .then((response) => {
                        if (response) {
                            return response;
                        }
                        // Se não encontrou no cache
                        return new Response('Offline - Conteúdo não disponível', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});
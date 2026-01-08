import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    const url = new URL(request.url);
    // Ha a főoldalra mennek, a fő HTML-t szolgáljuk ki
    if (url.pathname === '/') {
      return await fetch('https://vide-sg-la-1.marosvarilevente09.workers.dev/direct/Videósok.html');
    }

    // Ha más fájlra mennek, pl CSS vagy HTML
    return await fetch(`https://vide-sg-la-1.marosvarilevente09.workers.dev${url.pathname}`);
  } catch (err) {
    return new Response('Hiba történt a webhely betöltésekor', { status: 500 });
  }
}

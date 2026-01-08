import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    const url = new URL(request.url);

    // Ha a főoldalra mennénk, a "Videósok.html"-t adjuk vissza
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return await fetchAsset('direct/Videósok.html');
    }

    // Minden más fájlt a direct/ mappából szolgálunk ki
    return await fetchAsset(`direct${url.pathname}`);
  } catch (err) {
    return new Response('Hiba: a fájl nem található.', { status: 404 });
  }
}

async function fetchAsset(path) {
  const assetUrl = new URL(path, 'https://vide-sg-la-1.marosvarilevente09.workers.dev/');
  const response = await fetch(assetUrl);
  return response;
}

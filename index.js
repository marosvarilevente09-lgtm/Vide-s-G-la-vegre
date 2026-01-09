import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  try {
    const url = new URL(event.request.url);
    // Ha a főoldalra megyünk, index.html-t adunk vissza
    const path = url.pathname === '/' ? '/index.html' : url.pathname;

    // Kiszolgáljuk a statikus fájlokat a 'direct' mappából
    return await getAssetFromKV(event, {
      mapRequestToAsset: req => new Request(path, req)
    });
  } catch (err) {
    return new Response('File not found', { status: 404 });
  }
}

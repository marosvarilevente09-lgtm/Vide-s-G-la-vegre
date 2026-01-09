import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  try {
    // Ha a felhasználó a főoldalra megy, akkor index.html-t adunk
    const url = new URL(event.request.url);
    const path = url.pathname === '/' ? '/index.html' : url.pathname;

    // Cloudflare assets handler-rel próbáljuk kiszolgálni
    return await getAssetFromKV(event, { mapRequestToAsset: req => new Request(path, req) });
  } catch (err) {
    return new Response('File not found', { status: 404 });
  }
}

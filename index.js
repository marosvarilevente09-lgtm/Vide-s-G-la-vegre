import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  try {
    const url = new URL(event.request.url);

    // Ha a főoldalra mennél, mindig index.html-t adunk
    const path = url.pathname === '/' ? '/index.html' : url.pathname;

    // getAssetFromKV mindig friss fájlt ad, nem cache-elt
    return await getAssetFromKV(event, {
      mapRequestToAsset: req => new Request(path, req),
      cacheControl: {
        bypassCache: true  // 🟢 Ez a kulcs, mindig friss
      }
    });
  } catch (err) {
    return new Response('File not found', { status: 404 });
  }
}

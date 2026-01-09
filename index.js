import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  try {
    const request = event.request;
    // Ez biztosan a ./direct/index.html-t fogja betölteni
    return await getAssetFromKV(event, {
      mapRequestToAsset: req => new Request("/index.html", req)
    });
  } catch (err) {
    return new Response('File not found', { status: 404 });
  }
}

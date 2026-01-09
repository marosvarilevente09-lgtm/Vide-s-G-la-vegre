import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  try {
    const url = new URL(event.request.url);
    // ha a kezdőlap, mindig az Szavazas 2026.html-t adja
    const options = {
      mapRequestToAsset: req => {
        let pathname = new URL(req.url).pathname;
        if (pathname === "/") pathname = "/Szavazas 2026.html";
        return new Request(pathname, req);
      }
    };
    return await getAssetFromKV(event, options);
  } catch (err) {
    return new Response('File not found', { status: 404 });
  }
}

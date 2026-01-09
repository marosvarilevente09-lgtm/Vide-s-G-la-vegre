import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  try {
    const options = {
      mapRequestToAsset: req => {
        let pathname = new URL(req.url).pathname;
        if (pathname === "/") pathname = "/index.html"; // kezdőlap
        return new Request(pathname, req);
      }
    };
    return await getAssetFromKV(event, options);
  } catch (err) {
    return new Response('File not found', { status: 404 });
  }
}

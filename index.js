import fetch from 'node-fetch';

const zoneId = 'A_TE_ZONE_ID';
const apiToken = 'A_TE_API_TOKEN';

await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ purge_everything: true })
});
console.log('Cache cleared!');

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
        bypassCache: true // 🟢 Ez a kulcs!
      }
    });
  } catch (err) {
    // Hibakezelés: ha nincs fájl
    return new Response('File not found', { status: 404 });
  }
}

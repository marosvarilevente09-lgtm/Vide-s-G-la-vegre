import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  try {
    const url = new URL(event.request.url);
    const path = url.pathname === '/' ? '/index.html' : url.pathname;

    return await getAssetFromKV(event, {
      mapRequestToAsset: req => new Request(path, req),
      cacheControl: {
        bypassCache: true  // 🟢 Mindig frissíti a CSS-t és HTML-t
      }
    });
  } catch (err) {
    return new Response('File not found', { status: 404 });
  }
}
export default {
  async fetch(request, env) {
    if (request.method === "POST") {
      try {
        const data = await request.json();

        await env.DB.prepare(
          "INSERT INTO votes (name, source) VALUES (?, ?)"
        )
        .bind(data.name, data.source)
        .run();

        return new Response("Szavazat mentve!", { status: 200 });
      } catch (err) {
        return new Response("Hiba: " + err.message, { status: 500 });
      }
    }

    if (request.method === "GET") {
      const { results } = await env.DB.prepare(
        "SELECT * FROM votes ORDER BY created_at DESC"
      ).all();

      return new Response(JSON.stringify(results), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response("Csak GET vagy POST metódus engedélyezett", { status: 405 });
  }
};

import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export default {
  async fetch(request, env, ctx) {
    const eredmények = {
      status: "ok",
      time: new Date().toISOString()
    };

    try {
      // Ha statikus fájlokra megy a kérés
      if (request.method === "GET" && request.url.endsWith(".html") || request.url.endsWith(".css") || request.url.endsWith(".js")) {
        const url = new URL(request.url);
        const path = url.pathname === '/' ? '/index.html' : url.pathname;

        return await getAssetFromKV({ request }, {
          mapRequestToAsset: req => new Request(path, req),
          cacheControl: { bypassCache: true } // mindig frissíti a CSS-t/HTML-t
        });
      }

      // POST metódus feldolgozása (adatbázisba mentés)
      if (request.method === "POST") {
        const { name, source } = await request.json();

        await env.DB.prepare(
          "INSERT INTO votes (name, source) VALUES (?, ?)"
        )
        .bind(name, source)
        .run();

        return new Response("✔ Mentve az adatbázisba");
      }

      // GET metódus feldolgozása (adatok lekérése)
      if (request.method === "GET") {
        const { results } = await env.DB.prepare(
          "SELECT * FROM votes ORDER BY created_at DESC"
        ).all();

        return new Response(JSON.stringify(results), {
          headers: { "Content-Type": "application/json" }
        });
      }

      // Ha nem GET vagy POST
      return new Response("Csak GET vagy POST metódus engedélyezett", { status: 405 });

    } catch (err) {
      return new Response("Hiba: " + err.message, { status: 500 });
    }
  }
};



addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    // A Cloudflare Worker automatikusan kezeli az assets könyvtárat
    return await getAssetFromKV(event) // Ezt az API-t Cloudflare kezeli
  } catch (err) {
    // Ha a fájl nem található, visszaadjuk a fő oldalt (index.html)
    return new Response("Fájl nem található", { status: 404 })
  }
}

addEventListener("fetch", event => {
  event.respondWith(
    new Response("Hello World from Cloudflare Worker!", {
      headers: { "content-type": "text/plain" }
    })
  )
})
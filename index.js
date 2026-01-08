addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  let path = url.pathname

  // Ha a főoldalra mennénk, a "Videósok.html"-t adjuk vissza
  if (path === "/" || path === "/index.html") {
    path = "/Videósok.html"
  }

  // Minden más fájl a direct/ mappából
  path = `/direct${path}`

  try {
    const response = await fetch(new URL(path, "https://vide-sg-la-1.marosvarilevente09.workers.dev/"))
    if (!response.ok) throw new Error("Fájl nem található")
    return response
  } catch (err) {
    return new Response("404 - Fájl nem található.", { status: 404 })
  }
}

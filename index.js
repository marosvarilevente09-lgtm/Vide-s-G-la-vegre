addEventListener("fetch", event => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  const url = new URL(event.request.url);
  let path = url.pathname === "/" ? "/Szavazas 2026.html" : url.pathname; // kezdőlap beállítása

  try {
    return await fetch(new Request(`./direct${path}`, event.request));
  } catch (err) {
    return new Response("File not found", { status: 404 });
  }
}

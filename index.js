addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  const path = url.pathname === "/" ? "/Szavazas 2026.html" : url.pathname;

  event.respondWith(fetch(path, event.request));
});

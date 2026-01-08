// index.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // Ha root, akkor a főoldalt küldjük
    const path = url.pathname === "/" ? "/Szavazas 2026.html" : url.pathname;
    return fetch(path, request);
  }
};

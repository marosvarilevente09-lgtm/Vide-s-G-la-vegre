export default {
  async fetch(request, env) {
    // A HTML fájlok és CSS fájlok a "direct/" mappából
    const url = new URL(request.url);
    let path = url.pathname;

    // Ha "/" jön, töltsd be az index.html-t (példa)
    if (path === "/") path = "/Videósok.html"; 

    try {
      const file = await env.__STATIC_CONTENT.fetch(path);
      return file;
    } catch (err) {
      return new Response("A fájl nem található: " + path, { status: 404 });
    }
  }
};

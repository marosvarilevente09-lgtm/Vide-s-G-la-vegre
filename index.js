import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  try {
    event.respondWith(
      getAssetFromKV(event)
    )
  } catch (e) {
    event.respondWith(
      new Response('Page not found', { status: 404 })
    )
  }
})

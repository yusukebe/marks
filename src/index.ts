import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import { router } from './router'

const handleEvent = async (event: FetchEvent): Promise<Response> => {
  const requestUrl = new URL(event.request.url)
  if (requestUrl.pathname === '/' || requestUrl.pathname.includes('static')) {
    return await getAssetFromKV(event)
  } else {
    return await router.handle(event.request)
  }
}

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(handleEvent(event))
})

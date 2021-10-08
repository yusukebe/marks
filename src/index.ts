import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import { router } from './router'
import { parseAuthHeader, unauthorizedResponse } from './auth'

declare let NAME: string
declare let PASS: string

const handleEvent = async (event: FetchEvent): Promise<Response> => {
  const request = event.request

  const credentials = parseAuthHeader(
    request.headers.get('Authorization') || '',
  )
  if (!credentials || credentials.name !== NAME || credentials.pass !== PASS) {
    return unauthorizedResponse('Unauthorized')
  }

  const requestUrl = new URL(request.url)
  if (
    requestUrl.pathname === '/' ||
    requestUrl.pathname === '/favicon.ico' ||
    requestUrl.pathname.includes('static')
  ) {
    return await getAssetFromKV(event)
  } else {
    return await router.handle(request, event)
  }
}

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(handleEvent(event))
})

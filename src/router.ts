import { Router } from 'itty-router'
import { getOGP } from './ogp'

declare let BOOKMARK: KVNamespace

const router = Router()
const key = 'links'

const getLinks = async (key: string): Promise<string[]> => {
  const json = await BOOKMARK.get(key)
  const links = json != null ? JSON.parse(json) : []
  return links
}

const addLink = async (key: string, linkUrl: string): Promise<string[]> => {
  let links = await getLinks(key)
  const linkSet = new Set(links)
  if (linkSet.has(linkUrl)) {
    linkSet.delete(linkUrl)
  }
  links = [...linkSet]
  links.unshift(linkUrl)
  await BOOKMARK.put(key, JSON.stringify(links))
  return links
}

router.get('/links', async () => {
  const links = await getLinks(key)
  return new Response(JSON.stringify(links), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  })
})

router.post('/links', async (request: Request) => {
  const requestBody = await request.json()

  if ('url' in requestBody) {
    const requestUrl = requestBody.url
    await addLink(key, requestUrl)
    const responseBody = {
      message: 'Link added',
      url: requestUrl,
    }
    return new Response(JSON.stringify(responseBody), {
      headers: { 'content-type': 'application/json' },
      status: 200,
    })
  } else {
    return new Response('Must provide a valid URL', {
      status: 400,
    })
  }
})

router.get('/link', async (request: Request) => {
  const requestUrl = new URL(request.url)
  const linkUrl = requestUrl.searchParams.get('url')
  if (!linkUrl) {
    return new Response(JSON.stringify({}), {
      headers: { 'contenty-type': 'application/json' },
      status: 404,
    })
  }
  const ogps = await getOGP(linkUrl)
  return new Response(JSON.stringify(ogps), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  })
})

export { router }

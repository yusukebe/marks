import { Router } from 'itty-router'
import { getOGP } from './ogp'
import { getLinks, addLink } from './app'

const router = Router()

router.get('/links', async () => {
  const links = await getLinks()
  return new Response(JSON.stringify(links), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  })
})

router.post('/links', async (request: Request) => {
  const requestBody = await request.json()

  if ('url' in requestBody) {
    const requestUrl = requestBody.url
    await addLink(requestUrl)
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

router.get('/ogp', async (request: Request) => {
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

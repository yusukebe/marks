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
    try {
      await addLink(requestUrl)
    } catch (err) {
      console.log(err)
      return new Response('Internal Server Error', {
        status: 500,
      })
    }
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

router.get('/ogp', async (request: Request, event: FetchEvent) => {
  const requestUrl = new URL(request.url)
  const linkUrl = requestUrl.searchParams.get('url')
  let response: Response
  if (!linkUrl) {
    response = new Response(JSON.stringify({}), {
      headers: {
        'contenty-type': 'application/json',
      },
      status: 404,
    })
  } else {
    const { ogp, cached } = await getOGP(linkUrl)
    response = new Response(JSON.stringify(ogp), {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
    })
    if (cached) {
      response.headers.append('x-kv-cache', 'HIT')
    } else {
      response.headers.append('x-kv-cached', 'MISS')
    }
  }
  return response
})

export { router }

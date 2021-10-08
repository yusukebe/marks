import { Router } from 'itty-router'
import { getLinks, addLink, deleteLink } from './app'

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
    let key: string
    try {
      key = await addLink(requestUrl)
    } catch (err) {
      console.log(err)
      return new Response('Internal Server Error', {
        status: 500,
      })
    }
    const responseBody = {
      key: key,
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

router.delete('/links', async (request: Request) => {
  const requestBody = await request.json()
  if ('url' in requestBody) {
    const requestUrl = requestBody.url
    let deleted = false
    try {
      deleted = await deleteLink(requestUrl)
    } catch (err) {
      console.log(err)
      return new Response('Internal Server Error', {
        status: 500,
      })
    }
    const responseBody = {
      deleted: deleted,
      message: 'Link deleted',
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

export { router }

import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { serveStatic } from 'hono/serve-static'
import { bodyParse } from 'hono/body-parse'
import { getLinks, addLink, deleteLink } from './app'

declare let NAME: string
declare let PASS: string

const hono = new Hono()

hono.use('*', basicAuth({ username: NAME, password: PASS }))
hono.use('/static/*', serveStatic())
hono.use('/favicon.ico', serveStatic())
hono.use('/', serveStatic())
hono.use('/links/*', bodyParse())

hono.get('/links', async (c) => {
  const cursor = c.req.query('cursor')
  const limit = c.req.query('limit') || '20'
  const links = await getLinks(cursor, Number(limit))
  return c.json(links)
})

hono.post('/links', async (c) => {
  const requestBody = c.req.parsedBody

  if ('url' in requestBody) {
    const requestUrl = requestBody.url
    const key = await addLink(requestUrl)
    const responseBody = {
      key: key,
      message: 'Link added',
      url: requestUrl,
    }
    return c.json(responseBody)
  } else {
    return c.notFound()
  }
})

hono.delete('/links', async (c) => {
  const requestBody = c.req.parsedBody

  if ('url' in requestBody) {
    const requestUrl = requestBody.url
    const deleted = await deleteLink(requestUrl)
    const responseBody = {
      deleted: deleted,
      message: 'Link deleted',
      url: requestUrl,
    }
    return c.json(responseBody)
  } else {
    return c.notFound()
  }
})

hono.fire()

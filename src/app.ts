import { fetchOGP, OGP } from './ogp'

declare let BOOKMARK: KVNamespace
const PREFIX: string = 'v1:link:'
const OGP_PREFIX: string = 'v1:ogp:'

interface Link {
  url: string
  key: string
  title: string
  description?: string
  image?: string
}

const getLinks = async (): Promise<Link[]> => {
  const list = await BOOKMARK.list({ prefix: PREFIX })
  const keys = list.keys

  const links: Link[] = keys.map((value) => {
    const metadata = value.metadata as OGP
    const link: Link = metadata as Link //XXX
    return link
  })

  return links
}

const deleteOGP = async (ogpKey: string): Promise<boolean> => {
  const json = await BOOKMARK.get(ogpKey)

  if (json) {
    const ogpInKV = JSON.parse(json) as OGP
    const linkKey = ogpInKV.key
    if (linkKey) {
      console.log('delete: ' + ogpKey)
      await BOOKMARK.delete(ogpKey)
      console.log('delete: ' + linkKey)
      await BOOKMARK.delete(linkKey)
    }
    return true
  } else {
    return false
  }
}

const addLink = async (url: string): Promise<string> => {
  if (!isURL(url)) {
    throw new Error(url + ' is not URL')
  }

  const ogpKey = OGP_PREFIX + url
  await deleteOGP(ogpKey)

  const ogp = await fetchOGP(url)

  const linkKey = PREFIX + makeKey()
  ogp.key = linkKey
  await BOOKMARK.put(ogpKey, JSON.stringify(ogp))

  try {
    await BOOKMARK.put(linkKey, url, {
      metadata: ogp,
    })
  } catch (err) {
    console.log('error ' + err)
  }

  return linkKey
}

const isURL = (url: string): boolean => {
  const regexp = /^https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/
  const match = url.match(regexp)
  return match !== null
}

const makeKey = (): string => {
  const hash = 99999999999999 - new Date().getTime()
  return `${hash}`
}

export { getLinks, addLink }

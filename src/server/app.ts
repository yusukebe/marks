import { fetchOGP, OGP } from './ogp'
import { isURL, makeKey } from '../util'

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

const deleteLink = async (url: string): Promise<boolean> => {
  const ogpKey = OGP_PREFIX + url
  const json = await BOOKMARK.get(ogpKey)

  if (!json) return false
  const ogpInKV = JSON.parse(json) as OGP
  const linkKey = ogpInKV.key
  if (linkKey) {
    console.log('delete: ' + ogpKey)
    await BOOKMARK.delete(ogpKey)
    console.log('delete: ' + linkKey)
    await BOOKMARK.delete(linkKey)
  }
  return true
}

const addLink = async (url: string): Promise<string> => {
  if (!isURL(url)) {
    throw new Error(url + ' is not URL')
  }

  await deleteLink(url)

  const ogp = await fetchOGP(url)
  const linkKey = PREFIX + makeKey()
  ogp.key = linkKey

  const ogpKey = OGP_PREFIX + url
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

export { getLinks, addLink, deleteLink }

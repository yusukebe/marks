import { fetchOGP, OGP } from './ogp'
import { isURL, makeKey } from '../util'
import { Link, ListResult } from '../types'

declare let BOOKMARK: KVNamespace
const PREFIX: string = 'v1:link:'
const OGP_PREFIX: string = 'v1:ogp:'

const getLinks = async (cursor: string | undefined, limit: number = 20): Promise<ListResult> => {
  const list = await BOOKMARK.list<Link>({ prefix: PREFIX, limit: limit, cursor: cursor })
  const keys = list.keys

  const links = keys
    .map((value) => value.metadata)
    .filter((link): link is Link => link != undefined)

  return { links: links, cursor: list.cursor, complete: list.list_complete }
}

const deleteLink = async (url: string): Promise<boolean> => {
  const ogpKey = OGP_PREFIX + url
  const json = await BOOKMARK.get(ogpKey)

  if (!json) return false
  const ogpInKV: OGP = JSON.parse(json)
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
  if (!isURL(url)) throw new Error(url + ' is not URL')

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

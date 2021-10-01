declare let BOOKMARK: KVNamespace
const KEY: string = 'links'

const getLinks = async (): Promise<string[]> => {
  const json = await BOOKMARK.get(KEY)
  const links = json != null ? JSON.parse(json) : []
  return links
}

const addLink = async (linkUrl: string): Promise<string[]> => {
  if (!isURL(linkUrl)) {
    throw new Error(linkUrl + ' is not URL')
  }
  let links = await getLinks()
  const linkSet = new Set(links)
  if (linkSet.has(linkUrl)) {
    linkSet.delete(linkUrl)
  }
  links = [...linkSet]
  links.unshift(linkUrl)
  await BOOKMARK.put(KEY, JSON.stringify(links))
  return links
}

const isURL = (url: string): boolean => {
  const regexp = /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/
  const match = url.match(regexp)
  return match !== null
}

export { getLinks, addLink }

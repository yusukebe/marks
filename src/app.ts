declare let BOOKMARK: KVNamespace
const KEY: string = 'links'

const getLinks = async (): Promise<string[]> => {
  const json = await BOOKMARK.get(KEY)
  const links = json != null ? JSON.parse(json) : []
  return links
}

const addLink = async (linkUrl: string): Promise<string[]> => {
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

export { getLinks, addLink }

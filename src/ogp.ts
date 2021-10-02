import DOMParser from 'dom-parser'

declare let BOOKMARK: KVNamespace

const getOGP = async (url: string) => {
  const key = 'OGP-' + url
  const json = await BOOKMARK.get(key)
  let ogp = {}

  if (json) {
    ogp = JSON.parse(json)
    return { ogp: ogp, cached: true }
  }

  const response = await fetch(url)
  const html = await response.text()

  const parser = new DOMParser()
  const doc = parser.parseFromString(html)
  const meta = doc.getElementsByTagName('meta')
  if (!meta) {
    return {}
  }

  ogp = Array.from(meta)
    .filter((element) => element.getAttribute('property'))
    .reduce((pre: { [key: string]: string }, ogp) => {
      const property = ogp.getAttribute('property')
      const content = ogp.getAttribute('content')
      if (property && content) {
        pre[property] = content
      }
      return pre
    }, {})

  await BOOKMARK.put(key, JSON.stringify(ogp), {
    expirationTtl: 60 * 60 * 24 * 30,
  })
  return { ogp: ogp, cached: false }
}

export { getOGP }

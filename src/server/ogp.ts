import DOMParser from 'dom-parser'
import { decode } from 'html-entities'
import { OGP } from '../types'

const truncateString = (str: string, length: number) => {
  if (!str) return ''
  return str.length > length ? str.substring(0, length - 3) + '...' : str
}

const extractCanonical = (doc: DOMParser.Dom): string | null => {
  const links = doc.getElementsByTagName('link')
  if (links) {
    for (const i in links) {
      const rel = links[i].getAttribute('rel')
      if (rel && rel.toLowerCase() == 'canonical') {
        const url = links[i].getAttribute('href')
        return url
      }
    }
  }
  return null
}

const fetchOGP = async (url: string): Promise<OGP> => {
  let ogp: OGP

  const response = await fetch(url)
  const html = await response.text()

  const parser = new DOMParser()
  const doc = parser.parseFromString(html)
  url = extractCanonical(doc) || url

  const meta = doc.getElementsByTagName('meta')
  if (meta) {
    const data = Array.from(meta)
      .filter((element) => element.getAttribute('property'))
      .reduce((pre: Record<string, string>, ogp) => {
        const property = ogp.getAttribute('property')
        const content = ogp.getAttribute('content')
        if (property && content) {
          pre[property] = content
        }
        return pre
      }, {})
    let title = data['og:title']
    if (!title) {
      const elements = doc.getElementsByTagName('title')
      title = elements ? elements[0].textContent : url
    }
    ogp = {
      url: url,
      title: title,
      description: truncateString(data['og:description'], 60),
      image: data['og:image'],
    }
  } else {
    ogp = {
      url: url,
      title: url,
    }
  }

  ogp.title = decode(ogp.title)
  ogp.description = ogp.description ? decode(ogp.description) : ogp.description
  return ogp
}

export { fetchOGP, OGP }

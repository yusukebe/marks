import DOMParser from 'dom-parser'
import { decode } from 'html-entities'

interface OGP {
  key?: string
  url: string
  title: string
  description?: string
  image?: string
}

const truncateString = (str: string, length: number) => {
  if (!str) {
    return ''
  }
  return str.length > length ? str.substring(0, length - 3) + '...' : str
}

const getOGP = async (url: string): Promise<OGP> => {
  let ogp: OGP

  const response = await fetch(url)
  const html = await response.text()

  const parser = new DOMParser()
  const doc = parser.parseFromString(html)

  const meta = doc.getElementsByTagName('meta')
  if (!meta) {
    const elements = doc.getElementsByTagName('title')
    ogp = {
      url: url,
      title: elements ? elements[0].textContent : url,
    }
  } else {
    const data = Array.from(meta)
      .filter((element) => element.getAttribute('property'))
      .reduce((pre: { [key: string]: string }, ogp) => {
        const property = ogp.getAttribute('property')
        const content = ogp.getAttribute('content')
        if (property && content) {
          pre[property] = content
        }
        return pre
      }, {})
    ogp = {
      url: url,
      title: data['og:title'],
      description: truncateString(data['og:description'], 50),
      image: data['og:image'],
    }
  }
  ogp.title = decode(ogp.title)
  ogp.description = ogp.description ? decode(ogp.description) : ogp.description
  return ogp
}

export { getOGP, OGP }

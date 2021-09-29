import DOMParser from 'dom-parser'

const getOGP = async (url: string) => {
  const response = await fetch(url)
  const html = await response.text()

  const parser = new DOMParser()
  const doc = parser.parseFromString(html)
  const meta = doc.getElementsByTagName('meta')
  if (!meta) {
    return {}
  }

  const ogp = Array.from(meta)
    .filter(element => element.getAttribute('property'))
    .reduce((pre: { [key: string]: string }, ogp) => {
      const property = ogp.getAttribute('property')
      const content = ogp.getAttribute('content')
      if (property && content) {
        pre[property] = content
      }
      return pre
    }, {})
  return ogp
}

export { getOGP }

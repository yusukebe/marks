const getParam = (name) => {
  const url = new URL(location)
  return url.searchParams.get(name)
}

const removeParam = () => {
  const url = new URL(location)
  url.searchParams.delete('url')
  history.replaceState(null, null, url)
}

const isUrl = (url) => {
  const regexp = /^https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/
  const match = url.match(regexp)
  return match !== null
}

const truncateString = (str, length) => {
  if (!str) {
    return ''
  }
  return str.length > length ? str.substring(0, length - 3) + '...' : str
}

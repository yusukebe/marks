export const getParam = (name: string) => {
  const url = new URL(location.toString())
  return url.searchParams.get(name)
}

export const removeParam = () => {
  const url = new URL(location.toString())
  url.searchParams.delete('url')
  history.replaceState(null, '', url)
}

export const truncateString = (str: string, length: number) => {
  if (!str) return ''
  return str.length > length ? str.substring(0, length - 3) + '...' : str
}

export const isURL = (url: string): boolean => {
  const regexp = /^https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/
  const match = url.match(regexp)
  return match !== null
}

export const makeKey = (): string => {
  const hash = 99999999999999 - new Date().getTime()
  return `${hash}`
}

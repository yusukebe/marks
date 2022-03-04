export type Link = {
  url: string
  key: string
  title: string
  description?: string
  image?: string
}

export type ListResult = {
  links: Link[]
  cursor: string | undefined
  complete: boolean
}

export type OGP = {
  key?: string
  url: string
  title: string
  description?: string
  image?: string
}

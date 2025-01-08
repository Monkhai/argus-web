import { atom } from 'jotai'

export type SearchQuery = {
  query: string
  tags?: string[]
  description?: string
}
export const searchAtom = atom<SearchQuery>({
  query: '',
  tags: [],
  description: '',
})

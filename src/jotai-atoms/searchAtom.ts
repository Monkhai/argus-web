import { ResourceType } from '@/queries/resources/resourceTypes'
import { atom } from 'jotai'

export type SearchQuery = {
  query: string
  tags?: string[]
  description?: string
  authorUsername?: string
  type?: ResourceType
}
export const searchQueryAtom = atom<SearchQuery>({
  query: '',
  tags: [],
  description: '',
  authorUsername: '',
  type: undefined,
})

import { ResourceType } from '@/queries/resources/resourceTypes'
import { atom } from 'jotai'

export type SearchQuery = {
  prompt: string
  authorUsername?: string
  tags?: string[]
  description?: string
  type?: ResourceType
}
export const searchQueryAtom = atom<SearchQuery>({
  prompt: '',
  tags: [],
  description: '',
  authorUsername: '',
  type: undefined,
})

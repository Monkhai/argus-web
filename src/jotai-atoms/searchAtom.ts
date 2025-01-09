import { ResourceType } from '@/queries/resources/resourceTypes'
import { atom } from 'jotai'
import { useSearchParams } from 'next/navigation'

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

export function useSearchQuery() {
  const searchParams = useSearchParams()
  const prompt = searchParams.get('prompt') ?? ''
  const description = searchParams.get('description') ?? ''
  const tags = searchParams.get('tags') ?? ''
  const parsedTags = (() => {
    try {
      return tags ? JSON.parse(decodeURIComponent(tags)) : []
    } catch (e) {
      console.error('Failed to parse tags:', e)
      return []
    }
  })()

  return { prompt, description, tags: parsedTags }
}

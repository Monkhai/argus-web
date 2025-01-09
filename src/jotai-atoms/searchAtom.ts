import { ResourceType } from '@/queries/resources/resourceTypes'
import { atom, useAtom } from 'jotai'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form'

export type SearchQuery = {
  prompt: string
  authorUsername?: string
  tags?: string[]
  description?: string
  type?: ResourceType
}

const initialState: SearchQuery = {
  prompt: '',
  tags: [],
  description: '',
  authorUsername: '',
  type: undefined,
}

export const searchQueryAtom = atom<SearchQuery>(initialState)

export interface SearchFormData {
  prompt: string
  description?: string
  tags: string[]
}

// Hook to sync URL params with atom
export function useSyncSearchParams(setValue: UseFormSetValue<SearchFormData>) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)

  // Sync URL params to atom
  useEffect(() => {
    if (!pathname?.includes('/search')) {
      setSearchQuery(initialState)
      return
    }

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

    setSearchQuery({
      prompt,
      description,
      tags: parsedTags,
      authorUsername: searchParams.get('authorUsername') ?? '',
      type: searchParams.get('type') as ResourceType | undefined,
    })
  }, [searchParams, pathname, setSearchQuery])

  // Sync atom to URL
  useEffect(() => {
    if (!pathname?.includes('/search')) return

    const params = new URLSearchParams()
    if (searchQuery.prompt) params.set('prompt', searchQuery.prompt)
    if (searchQuery.description) params.set('description', searchQuery.description)
    if (searchQuery.tags?.length) params.set('tags', JSON.stringify(searchQuery.tags))
    if (searchQuery.authorUsername) params.set('authorUsername', searchQuery.authorUsername)
    if (searchQuery.type) params.set('type', searchQuery.type)

    router.push(`/search?${params.toString()}`)
  }, [searchQuery, pathname, router])

  // sync form data
  useEffect(() => {
    setValue('prompt', searchQuery.prompt)
    setValue('description', searchQuery.description)
    setValue('tags', searchQuery.tags ?? [])
  }, [searchQuery, setValue])
}

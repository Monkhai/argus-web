import { functions } from '@/firebase'
import { searchQueryAtom } from '@/jotai-atoms/searchAtom'
import { useAuth } from '@/providers/AuthProvider'
import { useQuery } from '@tanstack/react-query'
import { httpsCallable } from 'firebase/functions'
import { useAtom } from 'jotai'
import { queryKeystore } from '../queryKeystore'
import { ResourceData, ResourceType } from './resourceTypes'

type SearchResourcesRequest = {
  prompt: string
  authorUsername?: string
  tags?: string[]
  description?: string
  type?: ResourceType
}

type SearchResourcesResponse = {
  resources: ResourceData[]
}

const searchResourcesFn = httpsCallable<SearchResourcesRequest, SearchResourcesResponse>(functions, 'searchResources')

export async function searchResources(data: SearchResourcesRequest) {
  const res = await searchResourcesFn(data)
  return res.data.resources
}

export function useSearchTweets() {
  const [searchQuery] = useAtom(searchQueryAtom)
  const { user } = useAuth()

  return useQuery({
    queryKey: queryKeystore.searchResources(user!.uid, searchQuery),
    queryFn: () => searchResources(searchQuery),
    enabled: !!user,
  })
}

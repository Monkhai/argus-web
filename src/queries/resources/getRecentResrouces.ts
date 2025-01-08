import { functions } from '@/firebase'
import { httpsCallable } from 'firebase/functions'
import { atom, useAtomValue } from 'jotai'
import { ResourceData, ResourceType } from './resourceTypes'
import { useAuth } from '@/providers/AuthProvider'
import { useQuery } from '@tanstack/react-query'
import { queryKeystore } from '../queryKeystore'

export type GetRecentResourcesRequest = {
  count: number
  type?: ResourceType
}

type GetRecentResourcesResponse = {
  resources: ResourceData[]
}

const fn = httpsCallable<GetRecentResourcesRequest, GetRecentResourcesResponse>(functions, 'getRecentResources')

export async function getRecentResrouces(request: GetRecentResourcesRequest) {
  const res = await fn(request)
  return res.data.resources
}

export const recentResourcesAtom = atom<GetRecentResourcesRequest>({
  count: 10,
})

export function useGetRecentResources() {
  const request = useAtomValue(recentResourcesAtom)
  const { user } = useAuth()
  return useQuery({
    queryKey: queryKeystore.recentResources(user!.uid, request),
    queryFn: async () => await getRecentResrouces(request),
    enabled: !!user,
  })
}

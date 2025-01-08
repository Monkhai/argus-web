import { SearchQuery } from '@/jotai-atoms/searchAtom'
import { GetRecentResourcesRequest } from './resources/getRecentResrouces'

export const queryKeystore = {
  searchResources: (userId: string, searchQuery: SearchQuery) => [userId, 'searchResources', searchQuery],
  recentResources: (userId: string, request: GetRecentResourcesRequest) => [userId, 'recentResources', request],
  baseRecentResources: (userId: string) => [userId, 'recentResources'],
}

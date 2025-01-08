import { SearchQuery } from '@/jotai-atoms/searchAtom'

export const queryKeystore = {
  searchResources: (userId: string, searchQuery: SearchQuery) => [userId, 'searchResources', searchQuery],
  recentResources: (userId: string, length: number) => [userId, 'recentResources', length],
}

import { SearchQuery } from '@/jotai-atoms/searchAtom'

export const queryKeystore = {
  tweets: (userId: string, searchQuery: SearchQuery) => [userId, 'tweets', searchQuery],
}

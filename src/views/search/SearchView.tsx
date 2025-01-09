'use client'
import { useSearchResources } from '@/queries/resources/searchResources'
import SearchViewUI from './SearchViewUI'

export default function SearchView() {
  const { data, isLoading, error } = useSearchResources()

  if (isLoading) return <div>Loading...</div>
  if (error || !data) return <div>Error: {error?.message}</div>

  return <SearchViewUI resources={data} />
}

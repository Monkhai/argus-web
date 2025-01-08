'use client'

import { useGetRecentResources } from '@/queries/resources/getRecentResrouces'
import HomeViewUI from './HomeViewUI'

export default function HomeView() {
  const { data, isLoading, error } = useGetRecentResources()

  if (isLoading) return <div>Loading...</div>

  if (!data || error) return <div>No data</div>

  return <HomeViewUI resources={data} />
}

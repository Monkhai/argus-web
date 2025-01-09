import React from 'react'
import { ResourceData } from '@/queries/resources/resourceTypes'
import ResourceCard from '@/components/cards/ResourceCard/ResourceCard'

interface Props {
  resources: ResourceData[]
}

export default function SearchViewUI({ resources }: Props) {
  return (
    <div className="h-full overflow-y-auto px-10">
      {resources.map(resource => (
        <ResourceCard key={resource.resourceId} resource={resource} />
      ))}
    </div>
  )
}

import { ResourceData } from '@/queries/resources/resourceTypes'
import ResourceCard from './ResourceCard/ResourceCard'

interface Props {
  resources: ResourceData[]
}

export default function ResourceGrid({ resources }: Props) {
  return (
    <div className="mx-auto max-w-[2000px]">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {resources.map(resource => (
          <div key={resource.resourceId} className="flex">
            <ResourceCard resource={resource} />
          </div>
        ))}
      </div>
    </div>
  )
}

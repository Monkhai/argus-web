import { ResourceData } from '@/queries/resources/resourceTypes'
import ResourceCard from './ResourceCard/ResourceCard'

interface Props {
  resources: ResourceData[]
}

export default function ResourceGrid({ resources }: Props) {
  return (
    <div className="mx-auto h-full max-w-[2000px] overflow-y-auto">
      <div className="h-full grid grid-cols-1 overflow-y-auto gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {resources.map((resource, index) => (
          <div key={resource.resourceId} className="flex">
            <ResourceCard resource={resource} index={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

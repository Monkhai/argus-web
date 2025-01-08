import ResourceCard from '@/components/cards/ResourceCard/ResourceCard'
import { ResourceData } from '@/queries/resources/resourceTypes'

interface Props {
  resources: ResourceData[]
}
export default function HomeViewUI({ resources }: Props) {
  return (
    <div className="h-full overflow-y-auto px-10">
      {resources.map(resource => (
        <ResourceCard key={resource.resourceId} resource={resource} />
      ))}
    </div>
  )
}

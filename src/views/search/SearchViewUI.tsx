import ResourceGrid from '@/components/resources/ResoucesGrid/ResourceGrid'
import { ResourceData } from '@/queries/resources/resourceTypes'

interface Props {
  resources: ResourceData[]
}

export default function SearchViewUI({ resources }: Props) {
  return (
    <div className="h-full overflow-y-auto px-10">
      <ResourceGrid resources={resources} />
    </div>
  )
}

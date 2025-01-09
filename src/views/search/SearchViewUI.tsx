import ResourceGrid from '@/components/resources/ResoucesGrid/ResourceGrid'
import { ResourceData } from '@/queries/resources/resourceTypes'

interface Props {
  resources: ResourceData[]
}

export default function SearchViewUI({ resources }: Props) {
  return (
    <div className="h-full overflow-y-auto w-full px-4 py-6 sm:px-6 lg:px-8">
      <ResourceGrid resources={resources} />
    </div>
  )
}

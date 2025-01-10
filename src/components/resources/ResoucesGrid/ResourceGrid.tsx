import { ResourceData } from '@/queries/resources/resourceTypes'
import ResourceCard from './ResourceCard/ResourceCard'
import { AnimatePresence } from 'motion/react'

interface Props {
  resources: ResourceData[]
}

export default function ResourceGrid({ resources }: Props) {
  return (
    <div className="mx-auto h-full max-w-[2000px] overflow-y-auto">
      <div className="h-full grid grid-cols-1 overflow-y-auto gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5">
        <AnimatePresence>
          {resources.map((resource, index) => (
            <ResourceCard key={resource.resourceId} resource={resource} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

import { ResourceData } from '@/queries/resources/resourceTypes'
import { ResourceCardUI } from './ResourceCardUI'

interface Props {
  resource: ResourceData
  index: number
}
export default function ResourceCard({ resource, index }: Props) {
  return (
    <>
      <ResourceCardUI resource={resource} index={index} />
    </>
  )
}

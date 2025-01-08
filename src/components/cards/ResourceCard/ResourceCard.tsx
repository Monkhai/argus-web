import { ResourceData } from '@/queries/resources/resourceTypes'
import { ResourceCardUI } from './ResourceCardUI'

interface Props {
  resource: ResourceData
}
export default function ResourceCard({ resource }: Props) {
  return <ResourceCardUI resource={resource} />
}

export type UserMetadata = {
  tags: string[]
  description: string
}

export const resourceType = ['tweet'] as const
export type ResourceType = (typeof resourceType)[number]
export type ResourceData = {
  type: ResourceType
  resourceId: string
  createdAt: string
  text: string
  authorUsername: string
  authorId: string
  tags: string[]
  description: string
  userId: string
}

export type ResourceContentForEmbedding = {
  type: ResourceType
  text: string
  tags: string[]
  description: string
  authorUsername: string
  authorId: string
  createdAt: string
}

export type IndexEntryMetadata = {
  text: string
  type: ResourceType
  authorUsername: string
  authorId: string
  createdAt: string
  tags: string[]
  description: string
}

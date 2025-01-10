export type ResourceMetadata = {
  tags: string[];
  description: string;
};

export const resourceType = ["tweet"] as const;
export enum ResourceType {
  TWEET = "tweet",
  ARTICLE = "article",
}

export type TweetData = {
  authorUsername: string;
  authorId: string;
  text: string;
};

export type ArticleData = {
  text: string;
};

export type ResourceData = {
  type: ResourceType;
  url: string;
  resourceId: string;
  tags: string[];
  description: string;
  createdAt: string;
  userId: string;

  data: TweetData | ArticleData;
};
export type ResourceContentForEmbedding = {
  type: ResourceType;
  text: string;
  tags: string[];
  description: string;
  authorUsername: string;
  authorId: string;
  createdAt: string;
};

export type IndexEntryMetadata = {
  text: string;
  type: ResourceType;
  authorUsername: string;
  authorId: string;
  createdAt: string;
  tags: string[];
  description: string;
};

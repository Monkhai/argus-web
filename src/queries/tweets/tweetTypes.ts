export type TweetData = {
  tweetId: string
  createdAt: string
  text: string
  authorUsername: string
  authorId: string
  tags: string[]
  description: string
  userId: string
}

export type UserMetadata = {
  tags: string[]
  description: string
}

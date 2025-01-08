import { functions } from '@/firebase'
import { httpsCallable } from 'firebase/functions'
import { UserMetadata } from './tweetTypes'

type CreateTweetDocumentRequest = {
  url: string
  userMetadata: UserMetadata
}

export const createTweetFn = httpsCallable<CreateTweetDocumentRequest, { success: boolean }>(functions, 'createTweetDocument')

export async function createTweet(data: CreateTweetDocumentRequest) {
  const res = await createTweetFn(data)
  return res.data
}

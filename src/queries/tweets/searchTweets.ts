import { httpsCallable } from 'firebase/functions'
import { TweetData } from './tweetTypes'
import { functions } from '@/firebase'

type SearchTweetsRequest = {
  prompt: string
  authorUsername?: string
  tags?: string[]
  description?: string
}

type SearchTweetsResponse = {
  tweets: TweetData[]
}

const searchTweetFn = httpsCallable<SearchTweetsRequest, SearchTweetsResponse>(functions, 'searchTweets')

export async function searchTweets(data: SearchTweetsRequest) {
  const res = await searchTweetFn(data)
  return res.data.tweets
}

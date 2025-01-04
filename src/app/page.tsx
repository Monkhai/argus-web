'use client'

import { app } from '@/firebase'
import { QueryResponse, RecordMetadata } from '@pinecone-database/pinecone'
import { getFunctions, httpsCallable } from 'firebase/functions'
export default function Home() {
  const functions = getFunctions(app)
  const createTweetDoc = httpsCallable<{ url: string }, { success: boolean }>(functions, 'createTwitterDocument')
  const searchTweets = httpsCallable<{ prompt: string }, QueryResponse<RecordMetadata>>(functions, 'searchTweets')

  async function search(prompt: string) {
    const {
      data: { matches },
    } = await searchTweets({ prompt })
    const filtered = matches.filter(match => match.score && match.score > 0.75)
    console.log(filtered)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <form
        className="flex flex-row gap-4"
        onSubmit={e => {
          e.preventDefault()
          createTweetDoc({ url: e.currentTarget.tweetInput.value }).then(res => console.log(res))
        }}
      >
        <input type="text" name="tweetInput" placeholder="Enter tweet ID" className="border text-black p-2 mr-2 w-60 rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-32">
          Submit
        </button>
      </form>
      <form
        className="flex flex-row gap-4"
        onSubmit={e => {
          e.preventDefault()
          search(e.currentTarget.promptInput.value)
        }}
      >
        <input type="text" name="promptInput" placeholder="Enter your prompt" className="border text-black p-2 mr-2 w-60 rounded" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-32">
          Generate
        </button>
      </form>
    </div>
  )
}

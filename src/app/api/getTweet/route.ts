import { NextResponse } from 'next/server'
import { Scraper } from '@the-convocation/twitter-scraper'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const tweetId = searchParams.get('tweetId')

  if (!tweetId) {
    return NextResponse.json({ error: 'Missing tweetId' }, { status: 400 })
  }

  try {
    const scraper = new Scraper()
    const tweetData = await scraper.getTweet(tweetId)

    return NextResponse.json(tweetData)
  } catch (error) {
    console.error('Error fetching tweet:', error)
    return NextResponse.json({ error: 'Failed to fetch tweet' }, { status: 500 })
  }
}

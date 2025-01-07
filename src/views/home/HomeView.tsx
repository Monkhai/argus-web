import ResourceForm from '@/components/forms/ResourceForm'
import { app } from '@/firebase'
import { getFunctions, httpsCallable } from 'firebase/functions'

const downloadYoutubeVideoFn = httpsCallable(getFunctions(app), 'download_youtube_video')
export default function HomeView() {
  async function downloadYoutubeVideo() {
    'use server'
    console.log('downloadYoutubeVideo')
    try {
      const url = 'https://www.youtube.com/watch?v=eU_6ZRVOEiQ'
      const res = await downloadYoutubeVideoFn({ url })
      console.log(res, 'res')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="min-h-screen bg-stone-800 py-8">
      <div className="container mx-auto">
        <form action={downloadYoutubeVideo}>
          <button>Download</button>
        </form>
        <h1 className="text-2xl font-bold mb-6 text-white px-6">Add New Resource</h1>
        <ResourceForm />
      </div>
    </div>
  )
}

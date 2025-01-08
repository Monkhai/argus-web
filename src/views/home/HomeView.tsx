import TweetForm from '@/components/forms/TweetForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function HomeView() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-primary px-6">Add New Tweet</h1>
        <Dialog>
          <DialogTrigger>
            <h1>Add New Tweet</h1>
          </DialogTrigger>
          <DialogContent className="!bg-background">
            <DialogHeader>
              <DialogTitle>Add New Tweet</DialogTitle>
            </DialogHeader>
            <TweetForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

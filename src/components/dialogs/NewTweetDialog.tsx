import { useState } from 'react'
import TweetForm from '../forms/TweetForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

export default function NewTweetDialog() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="text-start w-full">Tweet</DialogTrigger>
      <DialogContent aria-describedby={undefined} className="!bg-background">
        <DialogHeader>
          <DialogTitle>Add New Tweet</DialogTitle>
        </DialogHeader>
        <TweetForm />
      </DialogContent>
    </Dialog>
  )
}

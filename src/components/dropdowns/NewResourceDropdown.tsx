import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { PlusCircle } from 'lucide-react'
import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import TweetForm from '../forms/TweetForm'
import { useState } from 'react'
import { ResourceType } from '@/queries/resources/resourceTypes'

export function NewResourceDropdown() {
  const [resourceType, setResourceType] = useState<ResourceType>(ResourceType.TWEET)
  return (
    <div className="flex justify-center items-center h-[60px]">
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <PlusCircle className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setResourceType(ResourceType.TWEET)}>
              <DialogTrigger>New Tweet</DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent>
          {DialogHeaderMap[resourceType]}
          {DialogContentMap[resourceType]}
        </DialogContent>
      </Dialog>
    </div>
  )
}

const DialogHeaderMap = {
  [ResourceType.TWEET]: (
    <DialogHeader>
      <DialogTitle>Add New Tweet</DialogTitle>
    </DialogHeader>
  ),
}

const DialogContentMap = {
  [ResourceType.TWEET]: <TweetForm />,
}

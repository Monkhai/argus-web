import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useMediaQuery } from '@/hooks/use-media-query'
import { ResourceType } from '@/queries/resources/resourceTypes'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import TweetForm from '../forms/TweetForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'

export function NewResourceDropdown() {
  const [resourceType, setResourceType] = useState<ResourceType>(ResourceType.TWEET)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
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
            {ContentMap[resourceType]}
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center h-[60px]">
      <Drawer>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <PlusCircle className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setResourceType(ResourceType.TWEET)}>
              <DrawerTrigger>New Tweet</DrawerTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DrawerContent className="px-6 pb-6">
          {DrawerHeaderMap[resourceType]}
          {ContentMap[resourceType]}
        </DrawerContent>
      </Drawer>
    </div>
  )
}

const DrawerHeaderMap = {
  [ResourceType.TWEET]: (
    <DrawerHeader draggable>
      <DrawerTitle>Add New Tweet</DrawerTitle>
    </DrawerHeader>
  ),
}

const DialogHeaderMap = {
  [ResourceType.TWEET]: (
    <DialogHeader>
      <DialogTitle>Add New Tweet</DialogTitle>
    </DialogHeader>
  ),
}

const ContentMap = {
  [ResourceType.TWEET]: <TweetForm />,
}

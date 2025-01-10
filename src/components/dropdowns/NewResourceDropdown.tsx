import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/hooks/use-media-query";
import { toast } from "@/hooks/use-toast";
import { useCreateResource } from "@/queries/resources/createResource";
import { ResourceType } from "@/queries/resources/resourceTypes";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import ResourceForm, { ResourceFormData } from "../forms/ResourceForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

export function NewResourceDropdown() {
  const [resourceType, setResourceType] = useState<ResourceType>(
    ResourceType.TWEET,
  );
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const {
    mutate: createResource,
    isPending,
    reset,
    isSuccess,
  } = useCreateResource({
    onSuccessCallback() {
      toast({
        title: "Success",
        description: "Tweet has been created successfully.",
        className:
          "border border-emerald-500 dark:border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/10 text-white ",
      });
    },
    onErrorCallback(error) {
      toast({
        title: "Error creating tweet",
        description: error.message,
        className:
          "border border-red-500 dark:border-red-500 bg-red-500/10 dark:bg-red-500/10 text-white ",
      });
    },
  });

  function handleSubmit(data: ResourceFormData) {
    createResource({
      type: resourceType,
      url: data.link,
      userMetadata: {
        description: data.description,
        tags: data.tags,
      },
    });
  }

  if (isDesktop) {
    return (
      <div className="flex h-[60px] items-center justify-center">
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <PlusCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={() => setResourceType(ResourceType.TWEET)}
              >
                <DialogTrigger>New Tweet</DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
            {DialogHeaderMap[resourceType]}
            {ContentMap[resourceType]({
              isPending,
              isSuccess,
              reset,
              onSubmit: handleSubmit,
            })}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="flex h-[60px] items-center justify-center">
      <Drawer>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <PlusCircle className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.values(ResourceType).map((type) => (
              <DropdownMenuItem
                key={type}
                onSelect={() => setResourceType(type)}
              >
                <DrawerTrigger>{type}</DrawerTrigger>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DrawerContent className="px-6 pb-6">
          {DrawerHeaderMap[resourceType]}
          {ContentMap[resourceType]({
            isPending,
            isSuccess,
            reset,
            onSubmit: handleSubmit,
          })}
        </DrawerContent>
      </Drawer>
    </div>
  );
}

const DrawerHeaderMap = {
  [ResourceType.TWEET]: (
    <DrawerHeader draggable>
      <DrawerTitle>Add New Tweet</DrawerTitle>
    </DrawerHeader>
  ),
};

const DialogHeaderMap = {
  [ResourceType.TWEET]: (
    <DialogHeader>
      <DialogTitle>Add New Tweet</DialogTitle>
    </DialogHeader>
  ),
};

const ContentMap = {
  [ResourceType.TWEET]: ({
    isPending,
    isSuccess,
    onSubmit,
    reset,
  }: {
    isPending: boolean;
    isSuccess: boolean;
    reset: () => void;
    onSubmit: (data: ResourceFormData) => void;
  }) => (
    <ResourceForm
      resourceType={ResourceType.TWEET}
      isPending={isPending}
      isSuccess={isSuccess}
      reset={reset}
      onSubmit={onSubmit}
    />
  ),
};

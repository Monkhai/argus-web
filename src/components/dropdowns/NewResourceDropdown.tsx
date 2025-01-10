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
              {Object.values(ResourceType).map((type) => (
                <DropdownMenuItem
                  key={type}
                  onSelect={() => setResourceType(type)}
                >
                  <DialogTrigger className="w-full text-left">
                    {type}
                  </DialogTrigger>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New {labelMap[resourceType]}</DialogTitle>
            </DialogHeader>
            <ResourceForm
              resourceType={resourceType}
              isPending={isPending}
              isSuccess={isSuccess}
              reset={reset}
              onSubmit={handleSubmit}
            />
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
          <DrawerHeader draggable>
            <DrawerTitle>Add New {labelMap[resourceType]}</DrawerTitle>
          </DrawerHeader>
          <ResourceForm
            resourceType={resourceType}
            isPending={isPending}
            isSuccess={isSuccess}
            reset={reset}
            onSubmit={handleSubmit}
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
}

// TODO: share this. you are using it in Resource Form as well!
const labelMap: Record<ResourceType, string> = {
  [ResourceType.TWEET]: "Tweet",
  [ResourceType.ARTICLE]: "Article",
};

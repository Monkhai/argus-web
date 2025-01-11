import {
  ResourceData,
  ResourceMetadata,
} from "@/queries/resources/resourceTypes";
import { ResourceCardUI } from "./ResourceCardUI";
import { useDeleteResource } from "@/queries/resources/deleteResource";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ResourceForm from "@/components/forms/ResourceForm";
import { useUpdateResource } from "@/queries/resources/updateResrouce";

interface Props {
  resource: ResourceData;
  index: number;
}
export default function ResourceCard({ resource, index }: Props) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isEditOpen, setIsEditOpen] = useState(false);

  const { mutate, isPending: isDeletePending } = useDeleteResource();
  function handleDelete() {
    mutate({ resourceId: resource.resourceId });
  }

  const {
    mutate: updateResource,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    reset: resetUpdate,
  } = useUpdateResource();
  function handleUpdate(resourceMetadata: ResourceMetadata) {
    updateResource({
      resourceId: resource.resourceId,
      resourceMetadata,
    });
  }

  return (
    <>
      <ResourceCardUI
        resource={resource}
        index={index}
        onDelete={handleDelete}
        isDeletePending={isDeletePending}
        isMobile={isMobile}
        onUpdate={() => setIsEditOpen(true)}
      />

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit resource</DialogTitle>
          </DialogHeader>
          <ResourceForm
            onSubmit={handleUpdate}
            isPending={isUpdatePending}
            isSuccess={isUpdateSuccess}
            reset={resetUpdate}
            resourceType={resource.type}
            initialValues={{
              title: resource.title,
              description: resource.description,
              tags: resource.tags,
              link: resource.url,
            }}
            disableUrl
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

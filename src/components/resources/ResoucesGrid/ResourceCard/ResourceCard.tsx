import { ResourceData } from "@/queries/resources/resourceTypes";
import { ResourceCardUI } from "./ResourceCardUI";
import { useDeleteResource } from "@/queries/resources/deleteResource";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Props {
  resource: ResourceData;
  index: number;
}
export default function ResourceCard({ resource, index }: Props) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { mutate, isPending: isDeletePending } = useDeleteResource();
  function handleDelete() {
    mutate({ resourceId: resource.resourceId });
  }

  return (
    <>
      <ResourceCardUI
        resource={resource}
        index={index}
        onDelete={handleDelete}
        isDeletePending={isDeletePending}
        isMobile={isMobile}
      />
    </>
  );
}

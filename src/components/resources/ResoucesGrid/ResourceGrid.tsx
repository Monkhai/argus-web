import { ResourceData } from "@/queries/resources/resourceTypes";
import ResourceCard from "./ResourceCard/ResourceCard";
import { AnimatePresence } from "motion/react";
import ResourcesGridContainer from "./ResourcesGridContainer";

interface Props {
  resources: ResourceData[];
}

export default function ResourceGrid({ resources }: Props) {
  return (
    <ResourcesGridContainer>
      <AnimatePresence>
        {resources.map((resource, index) => (
          <ResourceCard
            key={resource.resourceId}
            resource={resource}
            index={index}
          />
        ))}
      </AnimatePresence>
    </ResourcesGridContainer>
  );
}

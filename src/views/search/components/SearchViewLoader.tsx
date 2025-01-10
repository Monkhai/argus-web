import ResourceGridSkeleton from "@/components/resources/ResoucesGrid/ResourcesGridSkeleton";
import View from "@/shared/containers/View";
import React from "react";

export default function SearchViewLoader() {
  return (
    <View>
      <ResourceGridSkeleton />
    </View>
  );
}

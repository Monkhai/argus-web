import ResourceGridSkeleton from "@/components/resources/ResoucesGrid/ResourcesGridSkeleton";
import View from "@/shared/containers/View";
import React from "react";

export default function HomeViewLoader() {
  return (
    <View>
      <ResourceGridSkeleton />
    </View>
  );
}

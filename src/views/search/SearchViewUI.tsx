import ResourceGrid from "@/components/resources/ResoucesGrid/ResourceGrid";
import { ResourceData } from "@/queries/resources/resourceTypes";
import View from "@/shared/containers/View";

interface Props {
  resources: ResourceData[];
}

export default function SearchViewUI({ resources }: Props) {
  return (
    <View>
      <ResourceGrid resources={resources} />
    </View>
  );
}

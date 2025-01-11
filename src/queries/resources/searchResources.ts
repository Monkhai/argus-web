import { functions } from "@/firebase";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";
import { queryKeystore } from "../queryKeystore";
import { ResourceData, ResourceType } from "./resourceTypes";
import { useAtom } from "jotai";
import { searchQueryAtom } from "@/jotai-atoms/searchAtom";

type SearchResourcesRequest = {
  prompt: string;
  authorUsername?: string;
  tags?: string[];
  description?: string;
  type?: ResourceType;
  title?: string;
};

type SearchResourcesResponse = {
  resources: ResourceData[];
};

const searchResourcesFn = httpsCallable<
  SearchResourcesRequest,
  SearchResourcesResponse
>(functions, "searchResources");

export async function searchResources(data: SearchResourcesRequest) {
  const res = await searchResourcesFn(data);
  return res.data.resources;
}

export function useSearchResources() {
  const [searchQuery] = useAtom(searchQueryAtom);
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeystore.searchResources(user!.uid, searchQuery),
    queryFn: () => searchResources(searchQuery),
    enabled: !!user,
  });
}

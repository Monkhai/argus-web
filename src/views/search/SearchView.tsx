"use client";
import { useSearchResources } from "@/queries/resources/searchResources";
import SearchViewUI from "./SearchViewUI";
import SearchViewLoader from "./components/SearchViewLoader";

export default function SearchView() {
  const { data, isLoading, error } = useSearchResources();

  if (isLoading) return <SearchViewLoader />;

  if (error || !data) return <div>Error: {error?.message}</div>;

  return <SearchViewUI resources={data} />;
}

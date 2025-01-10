"use client";

import { useGetRecentResources } from "@/queries/resources/getRecentResrouces";
import HomeViewUI from "./HomeViewUI";
import HomeViewLoader from "./components/HomeViewLoader";

export default function HomeView() {
  const { data, isLoading, error } = useGetRecentResources();

  if (isLoading) {
    return <HomeViewLoader />;
  }

  if (!data || error) return <div>No data</div>;

  return <HomeViewUI resources={data} />;
}

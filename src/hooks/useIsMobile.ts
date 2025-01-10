import { MOBILE_QUERY } from "@/components/CONSTANTS";
import { useMediaQuery } from "./use-media-query";

export function useIsMobile() {
  return useMediaQuery(MOBILE_QUERY);
}

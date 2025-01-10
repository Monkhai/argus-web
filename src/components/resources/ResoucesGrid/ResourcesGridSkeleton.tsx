import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQuery } from "@/hooks/use-media-query";
import { AnimatePresence, motion } from "motion/react";
import ResourcesGridContainer from "./ResourcesGridContainer";

export default function ResourceGridSkeleton() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const items = isMobile ? 2 : 8;
  return (
    <ResourcesGridContainer>
      <AnimatePresence>
        {Array.from({ length: items }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            layout
          >
            <Skeleton className="group flex h-[250px] w-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    </ResourcesGridContainer>
  );
}

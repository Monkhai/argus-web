import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  ResourceData,
  ResourceType,
  TweetData,
} from "@/queries/resources/resourceTypes";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ExternalLink, Loader2, MoreHorizontal } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

interface Props {
  resource: ResourceData;
  index: number;
  isDeletePending: boolean;
  isMobile: boolean;
  onDelete: () => void;
}

export function ResourceCardUI({
  resource,
  index,
  onDelete,
  isDeletePending,
  isMobile,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      layout
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group flex h-[250px] w-full flex-col">
        <CardHeader className="flex flex-shrink-0 flex-row items-start justify-between space-y-0 p-3 pt-2">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              {resource.type === ResourceType.TWEET && (
                <span className="text-sm font-medium">
                  @{(resource.data as TweetData).authorUsername}
                </span>
              )}
              <time className="text-xs text-muted-foreground">
                {format(new Date(resource.createdAt), "MMM d, yyyy")}
              </time>
            </div>
          </div>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "cursor-pointer rounded-full p-2 text-muted-foreground opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100",
              {
                "opacity-100": isMobile,
              },
            )}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-2">
            <h3 className="line-clamp-3 leading-tight tracking-tight">
              {resource.data.text}
            </h3>
            {resource.description && (
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {resource.description}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex !items-center justify-between p-3">
          <ResourceFooter
            resource={resource}
            isDeletePending={isDeletePending}
            onDelete={onDelete}
            isMobile={isMobile}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function ResourceFooter({
  resource,
  isDeletePending,
  onDelete,
  isMobile,
}: {
  resource: ResourceData;
  isDeletePending: boolean;
  isMobile: boolean;

  onDelete: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex flex-wrap items-center justify-start gap-2">
        {resource.tags.slice(0, 3).map((tag: string) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
        <TooltipProvider>
          <Tooltip delayDuration={0} open={isOpen} onOpenChange={setIsOpen}>
            <TooltipTrigger
              onClick={() => {
                if (isMobile) {
                  setIsOpen((prev) => !prev);
                }
              }}
              className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground opacity-50 transition-opacity"
            >
              + {resource.tags.length - 3}
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex max-w-[250px] flex-wrap gap-2">
                {resource.tags.slice(0).map((tag, index) => (
                  <span
                    key={tag + index}
                    className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            disabled={isDeletePending}
            onClick={onDelete}
            className="text-red-500 transition-all hover:cursor-pointer dark:text-red-400"
          >
            Delete resource
            {isDeletePending ? (
              <AnimatePresence>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                </motion.span>
              </AnimatePresence>
            ) : (
              <span className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

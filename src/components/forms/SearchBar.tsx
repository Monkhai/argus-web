"use client";

import { TagInput } from "@/components/ui/TagInput";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  SearchFormData,
  searchQueryAtom,
  useSyncSearchParams,
} from "@/jotai-atoms/searchAtom";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NewResourceDropdown } from "../dropdowns/NewResourceDropdown";
import { Button } from "../ui/button";

export function SearchBar() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [searchQuery] = useAtom(searchQueryAtom);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const { control, handleSubmit, setValue, watch } = useForm<SearchFormData>({
    defaultValues: {
      prompt: searchQuery.prompt,
      description: searchQuery.description,
      tags: searchQuery.tags,
    },
  });
  useSyncSearchParams(setValue);

  const onSubmit = (data: SearchFormData) => {
    if (!isAdvancedOpen) {
      router.push(`/search?prompt=${data.prompt}`);
      setValue("prompt", data.prompt);
      setValue("tags", []);
      setValue("description", "");
      return;
    }
    router.push(
      `/search?prompt=${data.prompt}&tags=${encodeURIComponent(JSON.stringify(data.tags))}&description=${data.description}`,
    );
    setIsAdvancedOpen(false);
    setValue("prompt", data.prompt);
    setValue("tags", data.tags || []);
    setValue("description", data.description || "");
  };

  return (
    <section className="z-50 mt-8 flex w-full flex-row items-start justify-between gap-4 px-6">
      {!isMobile && (
        <Link
          href={"/home"}
          className="flex h-[60px] !w-[60px] flex-shrink-0 items-center justify-center"
        >
          <Image
            src="/logo.png"
            alt="logo"
            className="object-contain"
            width={40}
            height={40}
          />
        </Link>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="h-[60px] w-full">
        <div className="flex w-full flex-col flex-wrap overflow-hidden rounded-lg border border-input bg-background shadow-sm">
          <div className="flex items-center bg-secondary p-2 px-4">
            <div className="flex h-5 w-5 items-center justify-center text-muted-foreground">
              <Search className="h-5 w-5" />
            </div>
            <Controller
              name="prompt"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full !border-none !bg-transparent !shadow-none !ring-0 focus-visible:ring-0"
                  placeholder="Search resources..."
                />
              )}
            />
            <button
              type="button"
              onClick={() => setIsAdvancedOpen((prev) => !prev)}
              className="flex h-5 w-5 items-center justify-center text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronRight
                className={cn(
                  "h-5 w-5 rotate-0 transition-transform duration-200",
                  {
                    "rotate-90": isAdvancedOpen,
                  },
                )}
              />
            </button>
          </div>

          <AnimatePresence>
            {isAdvancedOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden rounded-b-lg border-t border-input bg-background"
              >
                <div className="space-y-4 p-4">
                  <TagInput
                    label="Tags"
                    onChange={(tags) => setValue("tags", tags)}
                    placeholder="Type and use space to add tags"
                    value={watch("tags")}
                  />

                  {/* Description Input */}
                  <div className="space-y-2.5">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Description
                    </label>
                    <Controller
                      name="description"
                      control={control}
                      rules={{ required: false }}
                      render={({ field, fieldState: { error } }) => (
                        <div className="space-y-2">
                          <textarea
                            {...field}
                            id="description"
                            rows={4}
                            className="min-h-[120px] w-full resize-none"
                            placeholder="Add a description of the tweet to help with search it later"
                          />
                          {error && (
                            <p className="text-sm font-medium text-destructive">
                              {error.message}
                            </p>
                          )}
                        </div>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button color="primary" type="submit">
                        Search
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>

      <NewResourceDropdown />
    </section>
  );
}

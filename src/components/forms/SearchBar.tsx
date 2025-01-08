'use client'

import { TagInput } from '@/components/ui/TagInput'
import { searchQueryAtom } from '@/jotai-atoms/searchAtom'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { ChevronRight, PlusCircle, Search } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import TweetForm from './TweetForm'

interface SearchFormData {
  query: string
  description?: string
  tags: string[]
}

export function SearchBar() {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const { control, handleSubmit, setValue, watch } = useForm<SearchFormData>({
    defaultValues: {
      query: searchQuery.query,
      description: searchQuery.description,
      tags: searchQuery.tags,
    },
  })
  const tags = watch('tags')

  const onSubmit = (data: SearchFormData) => {
    setSearchQuery({
      query: data.query,
      tags: data.tags,
      description: data.description,
    })
  }

  return (
    <section className="flex flex-row items-start justify-between w-full px-10 gap-4 my-8">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-[60px]">
        <div className="flex flex-col flex-wrap w-full bg-background shadow-sm rounded-lg border border-input overflow-hidden">
          <div className="flex items-center p-2 bg-secondary">
            <div className="text-muted-foreground">
              <Search className="h-5 w-5" />
            </div>
            <Controller
              name="query"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full pl-10 pr-12 !bg-transparent !border-none !shadow-none !ring-0 focus-visible:ring-0"
                  placeholder="Search tweets..."
                />
              )}
            />
            <button
              type="button"
              onClick={() => setIsAdvancedOpen(prev => !prev)}
              className="px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight
                className={cn('rotate-0 transition-transform duration-200', {
                  'rotate-90': isAdvancedOpen,
                })}
              />
            </button>
          </div>

          <AnimatePresence>
            {isAdvancedOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden bg-background border-t border-input rounded-b-lg"
              >
                <div className="space-y-4 p-4">
                  <TagInput
                    label="Tags"
                    onChange={tags => setValue('tags', tags)}
                    value={tags}
                    placeholder="Type and use space to add tags"
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
                            className="w-full resize-none min-h-[120px]"
                            placeholder="Add a description of the tweet to help with search it later"
                          />
                          {error && <p className="text-sm font-medium text-destructive">{error.message}</p>}
                        </div>
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
      <Dialog>
        <DialogTrigger>
          <div className="h-[60px] w-[60px] flex items-center justify-center">
            <PlusCircle />
          </div>
        </DialogTrigger>
        <DialogContent className="!bg-background">
          <DialogHeader>
            <DialogTitle>Add New Tweet</DialogTitle>
          </DialogHeader>
          <TweetForm />
        </DialogContent>
      </Dialog>
    </section>
  )
}

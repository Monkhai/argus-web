'use client'

import Image from 'next/image'
import { TagInput } from '@/components/ui/TagInput'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { NewResourceDropdown } from '../dropdowns/NewResourceDropdown'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { SearchFormData, searchQueryAtom, useSyncSearchParams } from '@/jotai-atoms/searchAtom'

export function SearchBar() {
  const router = useRouter()
  const [searchQuery] = useAtom(searchQueryAtom)
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const { control, handleSubmit, setValue, watch } = useForm<SearchFormData>({
    defaultValues: {
      prompt: searchQuery.prompt,
      description: searchQuery.description,
      tags: searchQuery.tags,
    },
  })
  useSyncSearchParams(setValue)

  const onSubmit = (data: SearchFormData) => {
    if (!isAdvancedOpen) {
      router.push(`/search?prompt=${data.prompt}`)
      setValue('prompt', data.prompt)
      setValue('tags', [])
      setValue('description', '')
      return
    }
    router.push(`/search?prompt=${data.prompt}&tags=${encodeURIComponent(JSON.stringify(data.tags))}&description=${data.description}`)
    setIsAdvancedOpen(false)
    setValue('prompt', data.prompt)
    setValue('tags', data.tags || [])
    setValue('description', data.description || '')
  }

  return (
    <section className="z-50 flex flex-row items-start justify-between w-full px-10 gap-4 my-8">
      <Link href={'/home'} className="h-[60px] w-[60px] flex items-center justify-center">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-[60px]">
        <div className="flex flex-col flex-wrap w-full bg-background shadow-sm rounded-lg border border-input overflow-hidden">
          <div className="flex items-center p-2 px-4 bg-secondary">
            <div className="text-muted-foreground w-5 h-5 flex justify-center items-center">
              <Search className="h-5 w-5" />
            </div>
            <Controller
              name="prompt"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full !bg-transparent !border-none !shadow-none!ring-0 focus-visible:ring-0"
                  placeholder="Search resources..."
                />
              )}
            />
            <button
              type="button"
              onClick={() => setIsAdvancedOpen(prev => !prev)}
              className="h-5 w-5 flex justify-center items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight
                className={cn('rotate-0 transition-transform duration-200 h-5 w-5', {
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
                    placeholder="Type and use space to add tags"
                    value={watch('tags')}
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
  )
}

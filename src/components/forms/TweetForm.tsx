'use client'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { X } from 'lucide-react'
import { app } from '@/firebase'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'

interface ResourceFormData {
  link: string
  description: string
  tags: string[]
}

type UserMetadata = {
  tags: string[]
  description: string
}

type CreateTweetDocumentRequest = {
  url: string
  userMetadata: UserMetadata
}

const createTweetFn = httpsCallable<CreateTweetDocumentRequest, { success: boolean }>(getFunctions(app), 'createTweetDocument')

async function createTweet(data: CreateTweetDocumentRequest) {
  const res = await createTweetFn(data)
  console.log(res, 'res')
}

export default function TweetForm() {
  const { toast } = useToast()
  const [tagInput, setTagInput] = useState('')
  const { control, handleSubmit, watch, setValue } = useForm<ResourceFormData>({
    defaultValues: {
      link: '',
      description: '',
      tags: [],
    },
  })
  const tags = watch('tags')

  const { mutate, isPending } = useMutation({
    mutationFn: createTweet,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Tweet has been created successfully.',
        className: 'border border-emerald-500 dark:border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/10 text-white ',
      })
    },
    onError: error => {
      toast({
        title: 'Error creating tweet',
        description: error.message,
        className: 'border border-red-500 dark:border-red-500 bg-red-500/10 dark:bg-red-500/10 text-white ',
      })
    },
  })

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const lastChar = value[value.length - 1]

    if (lastChar === ' ') {
      // Get the tag without the space
      const newTag = value.trim()

      // Only add if it's not empty and not already in the list
      if (newTag && !tags.includes(newTag)) {
        setValue('tags', [...tags, newTag])
      }

      // Clear the input
      setTagInput('')
    } else {
      setTagInput(value)
    }
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace when input is empty to remove the last tag
    if (e.key === 'Backspace' && !tagInput) {
      e.preventDefault()
      setValue('tags', tags.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setValue(
      'tags',
      tags.filter(tag => tag !== tagToRemove)
    )
  }

  const onSubmit = (data: ResourceFormData) => {
    mutate({
      url: data.link,
      userMetadata: {
        tags: data.tags,
        description: data.description,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* Link Input */}
      <div className="space-y-2.5">
        <label htmlFor="link" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Tweet Link
        </label>
        <Controller
          name="link"
          control={control}
          rules={{
            required: 'Link is required',
            pattern: {
              value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
              message: 'Please enter a valid URL',
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div className="space-y-2">
              <input {...field} type="url" id="link" className="w-full" placeholder="https://example.com" />
              {error && <p className="text-sm font-medium text-destructive">{error.message}</p>}
            </div>
          )}
        />
      </div>

      {/* Tags Input */}
      <div className="space-y-2.5">
        <label htmlFor="tags" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Tags <span className="text-muted-foreground opacity-50">(optional)</span>
        </label>
        <div className="flex flex-wrap gap-2 p-2 min-h-[42px] w-full bg-secondary border border-input rounded-lg focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent transition-colors">
          {tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-tertiary text-secondary-foreground"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X size={14} className="hover:text-muted-foreground" />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={tagInput}
            onChange={handleTagInput}
            onKeyDown={handleTagKeyDown}
            className="flex-1 w-full !p-0 !bg-transparent !border-0 !shadow-none text-sm outline-none placeholder:text-muted-foreground"
            placeholder={tags.length === 0 ? 'Type and use space to add tags' : ''}
          />
        </div>
      </div>

      {/* Description Input */}
      <div className="space-y-2.5">
        <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Description <span className="text-muted-foreground opacity-50">(optional)</span>
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="relative w-full px-4 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="absolute right-4 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Saving...</span>
          </div>
        ) : (
          'Save Resource'
        )}
      </button>
    </form>
  )
}

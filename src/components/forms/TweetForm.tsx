'use client'
import { useToast } from '@/hooks/use-toast'
import { createTweet } from '@/queries/tweets/createTweet'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { TagInput } from '../ui/TagInput'

interface ResourceFormData {
  link: string
  description: string
  tags: string[]
}

export default function TweetForm() {
  const { toast } = useToast()
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
      <TagInput label="Tags" onChange={tags => setValue('tags', tags)} value={tags} placeholder="Type and use space to add tags" />
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

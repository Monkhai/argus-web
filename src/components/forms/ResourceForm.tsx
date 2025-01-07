'use client'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { X } from 'lucide-react'
import { app } from '@/firebase'
import { getFunctions, httpsCallable } from 'firebase/functions'

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

export default function ResourceForm() {
  const [tagInput, setTagInput] = useState('')
  const { control, handleSubmit, watch, setValue } = useForm<ResourceFormData>({
    defaultValues: {
      link: '',
      description: '',
      tags: [],
    },
  })

  const tags = watch('tags')

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

  const onSubmit = async (data: ResourceFormData) => {
    console.log(data)
    await createTweet({
      url: data.link,
      userMetadata: {
        tags: data.tags,
        description: data.description,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 space-y-6 text-white">
      {/* Link Input */}
      <div className="space-y-2">
        <label htmlFor="link" className="block text-sm font-medium text-white">
          Resource Link
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
            <div>
              <input
                {...field}
                type="url"
                id="link"
                className="w-full px-4 py-2 bg-stone-700 border border-stone-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-white placeholder-stone-400"
                placeholder="https://example.com"
              />
              {error && <p className="mt-1 text-sm text-red-400">{error.message}</p>}
            </div>
          )}
        />
      </div>

      {/* Tags Input */}
      <div className="space-y-2">
        <label htmlFor="tags" className="block text-sm font-medium text-white">
          Tags (optional)
        </label>
        <div className="flex flex-wrap gap-2 p-2 border border-stone-600 bg-stone-700 rounded-lg min-h-[42px]">
          {tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-stone-600 text-white">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="ml-2 focus:outline-none">
                <X size={14} className="hover:text-stone-300" />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={tagInput}
            onChange={handleTagInput}
            onKeyDown={handleTagKeyDown}
            className="flex-1 min-w-[120px] outline-none bg-transparent text-white placeholder-stone-400"
            placeholder="Type and use space to add tags"
          />
        </div>
      </div>

      {/* Description Input */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-white">
          Description (optional)
        </label>
        <Controller
          name="description"
          control={control}
          rules={{ required: false }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <textarea
                {...field}
                id="description"
                rows={4}
                className="w-full px-4 py-2 bg-stone-700 border border-stone-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none text-white placeholder-stone-400"
                placeholder="Add a description of your resource... (optional)"
              />
              {error && <p className="mt-1 text-sm text-red-400">{error.message}</p>}
            </div>
          )}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-stone-600 rounded-lg hover:bg-stone-500 focus:ring-4 focus:ring-stone-400 focus:outline-none transition-all"
      >
        Save Resource
      </button>
    </form>
  )
}

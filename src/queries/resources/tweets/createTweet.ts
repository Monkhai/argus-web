import { functions } from '@/firebase'
import { toast } from '@/hooks/use-toast'
import { useAuth } from '@/providers/AuthProvider'
import { queryClient } from '@/providers/QueryProvider'
import { queryKeystore } from '@/queries/queryKeystore'
import { useMutation } from '@tanstack/react-query'
import { httpsCallable } from 'firebase/functions'
import { UserMetadata } from '../resourceTypes'

type CreateTweetDocumentRequest = {
  url: string
  userMetadata: UserMetadata
}

export const createTweetFn = httpsCallable<CreateTweetDocumentRequest, { success: boolean }>(functions, 'createTweetDocument')

export async function createTweet(data: CreateTweetDocumentRequest) {
  const res = await createTweetFn(data)
  return res.data
}

export function useCreateTweet() {
  const { user } = useAuth()

  return useMutation({
    mutationFn: createTweet,
    onSuccess: () => {
      if (!user?.uid) return
      queryClient.invalidateQueries({ queryKey: queryKeystore.baseRecentResources(user.uid) })
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
}

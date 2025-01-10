import { functions } from '@/firebase'
import { useAuth } from '@/providers/AuthProvider'
import { queryClient } from '@/providers/QueryProvider'
import { useMutation } from '@tanstack/react-query'
import { httpsCallable } from 'firebase/functions'
import { redirect } from 'next/navigation'
import { queryKeystore } from '../queryKeystore'
import { ResourceMetadata } from './resourceTypes'

type UpdateResourceRequest = {
  resourceId: string
  resourceMetadata: ResourceMetadata
}

type UpdateResourceResponse = {
  success: boolean
}

const fn = httpsCallable<UpdateResourceRequest, UpdateResourceResponse>(functions, 'updateResource')

async function updateResource(request: UpdateResourceRequest): Promise<UpdateResourceResponse> {
  const { data } = await fn(request)
  return data
}

export function useUpdateResource() {
  const { user } = useAuth()
  if (!user) {
    redirect('/login')
  }
  return useMutation({
    mutationFn: updateResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeystore.baseRecentResources(user!.uid) })
    },
  })
}

import { functions } from '@/firebase'
import { useAuth } from '@/providers/AuthProvider'
import { useMutation } from '@tanstack/react-query'
import { httpsCallable } from 'firebase/functions'
import { redirect } from 'next/navigation'
import { queryKeystore } from '../queryKeystore'
import { queryClient } from '@/providers/QueryProvider'

type DeleteResourceRequest = {
  resourceId: string
}

type DeleteResourceResponse = {
  success: boolean
}

const fn = httpsCallable<DeleteResourceRequest, DeleteResourceResponse>(functions, 'deleteResource')

async function deleteResource(req: DeleteResourceRequest) {
  const res = await fn(req)
  return res.data
}

export function useDeleteResource() {
  const { user } = useAuth()
  if (!user) {
    redirect('/login')
  }
  return useMutation({
    mutationFn: deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeystore.baseRecentResources(user!.uid) })
    },
  })
}

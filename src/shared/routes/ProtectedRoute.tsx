'use client'

import { ReactNode, useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'

export function ProtectedRoute({ children }: { children?: ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      redirect('/login')
    }
  }, [user, loading, router])

  if (loading) return null
  return <>{children}</>
}

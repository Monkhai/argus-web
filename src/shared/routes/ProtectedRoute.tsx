'use client'

import { useAuth } from '@/providers/AuthProvider'
import { redirect } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

export function ProtectedRoute({ children }: { children?: ReactNode }) {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      redirect('/login')
    }
  }, [user, loading])

  if (loading) return null
  return <>{children}</>
}

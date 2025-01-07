'use client'
import { useAuth } from '@/providers/AuthProvider'
import { redirect } from 'next/navigation'

export default function Page() {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
      </div>
    )
  }
  if (!user) return redirect('/login')
  redirect('/home')
}

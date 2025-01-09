import { SearchBar } from '@/components/forms/SearchBar'
import React, { Suspense } from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <Suspense fallback={null}>
        <SearchBar />
      </Suspense>
      {children}
    </div>
  )
}

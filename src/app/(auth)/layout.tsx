import { SearchBar } from '@/components/forms/SearchBar'
import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <SearchBar />
      {children}
    </div>
  )
}

import { ProtectedRoute } from '@/shared/routes/ProtectedRoute'
import SearchView from '@/views/search/SearchView'
import React from 'react'

export default function page() {
  return (
    <ProtectedRoute>
      <SearchView />
    </ProtectedRoute>
  )
}

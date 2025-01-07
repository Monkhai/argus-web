import { ProtectedRoute } from '@/shared/routes/ProtectedRoute'
import HomeView from '@/views/home/HomeView'
import React from 'react'

export default function page() {
  return (
    <ProtectedRoute>
      <HomeView />
    </ProtectedRoute>
  )
}

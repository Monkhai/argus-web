'use client'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useEffect } from 'react'
import GoogleButton from 'react-google-button'
import { motion } from 'motion/react'
import { auth } from '@/firebase'
import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'

export default function LoginView() {
  const authProvider = new GoogleAuthProvider()
  const { user, loading } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!loading && user) {
      router.replace('/home')
    }
  }, [loading, router, user])

  if (loading) {
    return (
      <div className="flex h-dvh w-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="relative text-white flex h-dvh w-screen flex-col items-center justify-center gap-8 px-8">
      <div className="relative flex flex-col items-center gap-2">
        <motion.img
          initial={{ opacity: 0, bottom: -50, scale: 0.5 }}
          animate={{ opacity: 1, bottom: 0, scale: 1 }}
          transition={{ duration: 1 }}
          src="/logo.png"
          width={50}
          height={50}
          alt="logo"
          className="relative rounded-full object-contain"
        />
        <motion.h1
          initial={{ opacity: 0, bottom: -50, scale: 0.5 }}
          animate={{ opacity: 1, bottom: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative text-2xl font-medium"
        >
          Welcome to Argus
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, bottom: -50, scale: 0.5 }}
          animate={{ opacity: 1, bottom: 0, scale: 1 }}
          className="relative text-lg font-medium"
          transition={{ delay: 1, duration: 1 }}
        >
          Actually find that thing you saved
        </motion.h2>
      </div>
      <motion.div
        initial={{ opacity: 0, bottom: -50, scale: 0.5 }}
        animate={{ opacity: 1, bottom: 0, scale: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative"
      >
        <GoogleButton type="dark" style={{ borderRadius: '10px', overflow: 'hidden' }} onClick={() => signInWithPopup(auth, authProvider)}>
          login
        </GoogleButton>
      </motion.div>
    </div>
  )
}

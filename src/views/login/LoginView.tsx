'use client'
import { auth } from '@/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { motion } from 'motion/react'
import GoogleButton from 'react-google-button'

export default function LoginView() {
  const authProvider = new GoogleAuthProvider()

  return (
    <div className="relative text-white flex h-screen w-screen bg-stone-800 flex-col items-center justify-center gap-8 px-8">
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

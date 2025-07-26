"use client";

import { Suspense, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LoginForm } from '@/components/login-form'
import { Card, CardContent } from '@/components/ui/card'

function LoginFormFallback() {
  return (
    <Card className="w-full max-w-sm md:max-w-3xl">
      <CardContent className="flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p className="text-muted-foreground">Loading login form...</p>
      </CardContent>
    </Card>
  )
}

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // If user is already authenticated, redirect to home
    if (status !== "loading" && session) {
      router.replace("/")
    }
  }, [session, status, router])

  // Show loading while checking authentication or redirecting
  if (status === "loading") {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <Card className="w-full max-w-sm md:max-w-3xl">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Checking authentication...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If user is authenticated, show loading while redirecting
  if (session) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <Card className="w-full max-w-sm md:max-w-3xl">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Redirecting to home...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show login form for unauthenticated users
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10"
    >
      <div className="max-w-sm md:max-w-3xl">
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </div>
    </motion.div>
  )
}

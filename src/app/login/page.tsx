import { Suspense } from 'react'
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
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="max-w-sm md:max-w-3xl">
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}

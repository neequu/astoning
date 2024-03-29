import { lazily } from 'react-lazily'
import { Suspense } from 'react'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { LOGIN_MSG } from '@/lib/constants'
import { authService } from '@/services/auth'
import { LoadingSkeleton } from '@/components/loading-state/LoadingSkeleton'

const { AuthPanel } = lazily(() => import('@/components/auth/AuthPanel'))

export function Login() {
  return (
    <PageWrapper className="mt-12">
      <div className="sm:w-1/3 sm:min-w-96 sm:mx-auto rounded-md border border-muted p-10 shadow-md">
        <h1 className="font-bold text-2xl mb-8">Log Into your account</h1>
        <Suspense fallback={<LoadingSkeleton />}>
          <AuthPanel authEvent={authService.loginWithCredentials} message={LOGIN_MSG} />
        </Suspense>
      </div>
    </PageWrapper>
  )
}

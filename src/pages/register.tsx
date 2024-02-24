import { Suspense } from 'react'
import { lazily } from 'react-lazily'
import { LoadingSkeleton } from '@/components/loading-state/LoadingSkeleton'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { REGISTER_MSG } from '@/lib/constants'
import { authService } from '@/services/auth'

const { AuthPanel } = lazily(() => import('@/components/auth/AuthPanel'))

export function Register() {
  return (
    <PageWrapper className="mt-12">
      <div className="sm:w-1/3 sm:min-w-96 sm:mx-auto rounded-md border border-muted sm:p-10 p-4 shadow-md">
        <h1 className="font-bold text-2xl mb-8">Create your account</h1>
        <Suspense fallback={<LoadingSkeleton />}>
          <AuthPanel authEvent={authService.register} message={REGISTER_MSG} />
        </Suspense>
      </div>
    </PageWrapper>
  )
}

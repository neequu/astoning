import { AuthPanel } from '@/components/AuthPanel'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { REGISTER_MSG } from '@/lib/constants'
import { authService } from '@/services/auth'

export function Register() {
  return (
    <PageWrapper className="mt-12">
      <div className="sm:w-1/3 sm:min-w-96 sm:mx-auto rounded-md border border-muted sm:p-10 p-4 shadow-md">
        <h1 className="font-bold text-2xl mb-8">Create your account</h1>
        <AuthPanel handleAuth={authService.register} message={REGISTER_MSG} />
      </div>
    </PageWrapper>
  )
}

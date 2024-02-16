import { Auth } from '@/components/Auth'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { LOGIN_MSG } from '@/lib/constants'
import { authService } from '@/services/auth'

export default function Login() {
  return (
    <PageWrapper className="mt-12">
      <div className="sm:w-1/3 sm:min-w-80 sm:mx-auto rounded-md border border-muted p-10 shadow-md">
        <h1 className="font-bold text-2xl mb-8">Log Into your account</h1>
        <Auth handleAuth={authService.loginWithCredentials} message={LOGIN_MSG} />
      </div>
    </PageWrapper>
  )
}

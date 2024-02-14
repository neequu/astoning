import { Auth } from '@/components/Auth'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { registerMsg } from '@/lib/constants'
import { authService } from '@/services/auth'

export default function Register() {
  return (
    <PageWrapper className="mt-12">
      <div className="sm:w-1/3 sm:min-w-80 sm:mx-auto">
        <h1 className="font-bold text-2xl mb-8">Create your account</h1>
        <Auth handleAuth={authService.register} message={registerMsg} />
      </div>
    </PageWrapper>
  )
}

import { Auth } from '@/components/Auth'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { registerMsg } from '@/lib/constants'
import { authService } from '@/services/auth'

export default function Register() {
  return (
    <PageWrapper className="mt-12">
      <div className=" sm:w-96 mx-auto w-5/6">
        <h1 className="font-bold text-2xl mb-8">Create your account</h1>
        <Auth handleAuth={authService.register} message={registerMsg} />
      </div>
    </PageWrapper>
  )
}

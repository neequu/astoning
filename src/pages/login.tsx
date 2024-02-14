import { Auth } from '@/components/Auth'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import supabase from '@/services/supabase'
import type { Credentials } from '@/types/auth'

export default function Login() {
  const handleLogin = async ({ email, password }: Credentials) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error)
      console.error(error.message)
  }

  return (
    <PageWrapper className="mt-12">
      <div className="sm:w-1/3 sm:min-w-80 sm:mx-auto">
        <h1 className="font-bold text-2xl mb-8">Log Into your account</h1>
        <Auth handleAuth={handleLogin} />
      </div>
    </PageWrapper>
  )
}

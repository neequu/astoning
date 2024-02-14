import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Auth } from '@/components/Auth'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { setUser } from '@/redux/slices/authSlice'
import supabase from '@/services/supabase'
import type { Credentials } from '@/types/auth'

export default function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleRegister = async ({ email, password }: Credentials) => {
    const { data: { user } } = await supabase.auth.signUp({ email, password })
    dispatch(setUser(!!user))
    navigate('/')
    toast.success('sign up!')
  }

  return (
    <PageWrapper className="mt-12">
      <div className="sm:w-1/3 sm:min-w-80 sm:mx-auto">
        <h1 className="font-bold text-2xl mb-8">Create your account</h1>
        <Auth handleAuth={handleRegister} />
      </div>
    </PageWrapper>
  )
}

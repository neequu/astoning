import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import { toast } from 'sonner'
import { AuthForm } from '@/components/AuthForm'
import { formSchema } from '@/lib/validations'
import { validationFields } from '@/lib/constants'
import type { Credentials } from '@/types/auth'

import { useAppDispatch } from '@/hooks/reduxHooks'
import { setUser } from '@/redux/slices/authSlice'

// import { GithubIcon } from 'lucide-react'
// import { OAuth } from '@/components/OAuth'

interface Props {
  handleAuth: (data: Credentials) => Promise<User | null>
}

export function Auth({ handleAuth }: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function handleAuthSuccess(user: User) {
    dispatch(setUser(user))
    navigate('/')
    toast.success('Authorized!')
  }

  const authForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user = await handleAuth(values)
    if (user !== null)
      handleAuthSuccess(user)
  }

  return (
    <AuthForm handleSubmit={onSubmit} form={authForm} fields={validationFields}>
      {/* <OAuth provider="github" Icon={GithubIcon} /> */}
    </AuthForm>
  )
}

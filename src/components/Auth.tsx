import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import { AuthForm } from '@/components/AuthForm'
import { formSchema } from '@/lib/validations'
import { validationFields } from '@/lib/constants'
import type { Credentials } from '@/types/auth'

import { useAppDispatch } from '@/hooks/redux-hooks'
import { OAuth } from '@/components/OAuth'
import { authService } from '@/services/auth'
import { handleAuthSuccess } from '@/lib/utils'

import GithubIcon from '@/assets/github.svg'

interface Props {
  handleAuth: (data: Credentials) => Promise<User | null>
  message?: string
}

export function Auth({ handleAuth, message }: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const authForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user = await handleAuth(values)
    if (user !== null)
      handleAuthSuccess(user, navigate, dispatch, message)
  }

  return (
    <AuthForm handleSubmit={onSubmit} form={authForm} fields={validationFields}>
      <OAuth provider="github" Icon={GithubIcon} handleOAuth={authService.loginWithOath} />
    </AuthForm>
  )
}

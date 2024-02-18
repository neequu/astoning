import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import type { Provider, User } from '@supabase/supabase-js'
import { useState } from 'react'
import { AuthForm } from '@/components/AuthForm'
import { formSchema } from '@/lib/validations'
import { VALID_FIELDS } from '@/lib/constants'
import type { Credentials } from '@/types/auth'

import { useAppDispatch } from '@/hooks/redux-hooks'
import { OAuth } from '@/components/OAuth'
import { authService } from '@/services/auth'
import { handleAuthSuccess } from '@/lib/utils'

import { GithubIcon } from '@/components/icons/github'

interface Props {
  handleAuth: (data: Credentials) => Promise<User | null >
  message?: string
}

export function AuthPanel({ handleAuth, message }: Props) {
  const [isFormDisabled, setIsFormDisabled] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const authForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    const user = await handleAuth(values)
    if (user !== null)
      handleAuthSuccess(user, navigate, dispatch, message)
  }

  async function handleOAuth(provider: Provider): Promise<void> {
    setIsFormDisabled(true)
    await authService.loginWithOAuth(provider)
    setIsFormDisabled(false)
  }

  return (
    <AuthForm handleSubmit={onSubmit} form={authForm} fields={VALID_FIELDS} isDisabled={isFormDisabled}>
      <OAuth provider="github" handleOAuth={handleOAuth}>
        <GithubIcon className="ml-2 text-xl" />
      </OAuth>
    </AuthForm>
  )
}

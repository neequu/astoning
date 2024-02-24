import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { Credentials, Provider, User } from '@/types/auth'
import { AuthForm } from '@/components/auth/AuthForm'
import { formSchema } from '@/lib/validations'
import { VALID_FIELDS } from '@/lib/constants'

import { useAppDispatch } from '@/hooks/store-hooks'
import { OAuth } from '@/components/auth/OAuth'
import { authService } from '@/services/auth'
import { showNotificationSuccess } from '@/lib/utils'

import { GithubIcon } from '@/components/icons/github'
import { userSet } from '@/store/slices/auth-slice'

interface Props {
  authEvent: (data: Credentials) => Promise<User | null >
  message?: string
}

export function AuthPanel({ authEvent, message }: Props) {
  const [isOAuthProcessing, setIsOAuthProcessing] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const authForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function handleAuthSuccess(user: User): void {
    dispatch(userSet(user))
    navigate('/')
    showNotificationSuccess(message)
  }

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    const user = await authEvent(values)
    if (user !== null)
      handleAuthSuccess(user)
  }

  async function handleOAuth(provider: Provider): Promise<void> {
    setIsOAuthProcessing(true)
    await authService.loginWithOAuth(provider)
    setIsOAuthProcessing(false)
  }

  return (
    <AuthForm handleSubmit={onSubmit} form={authForm} fields={VALID_FIELDS} isDisabled={isOAuthProcessing}>
      <OAuth provider="github" handleOAuth={handleOAuth} isDisabled={isOAuthProcessing}>
        <GithubIcon className="ml-2 text-xl" />
      </OAuth>
    </AuthForm>
  )
}

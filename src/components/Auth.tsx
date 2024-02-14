import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { GithubIcon } from 'lucide-react'
import { AuthForm } from '@/components/AuthForm'
import { formSchema } from '@/lib/validations'
import { validationFields } from '@/lib/constants'
import type { Credentials } from '@/types/auth'
import { OAuth } from '@/components/OAuth'

interface Props {
  handleAuth: (data: Credentials) => void
}

export function Auth({ handleAuth }: Props) {
  const authForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleAuth({ ...values })
  }

  return (
    <div>
      <AuthForm handleSubmit={onSubmit} form={authForm} fields={validationFields}>
        <OAuth provider="github" Icon={GithubIcon} />
      </AuthForm>
    </div>
  )
}

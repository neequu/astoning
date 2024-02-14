import { toast } from 'sonner'
import type { z } from 'zod'
import { useDispatch } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AuthForm } from '@/components/AuthForm'
import { authorize } from '@/redux/slices/authSlice'
import { formSchema } from '@/lib/validations'
import { validationFields } from '@/lib/constants'
import type { Credentials } from '@/types/auth'

interface Props {
  handleAuth: (data: Credentials) => void
}

export function Auth({ handleAuth }: Props) {
  const dispatch = useDispatch()
  const authForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(authorize())
    handleAuth({ ...values })
    toast.success(values.email)
  }

  return (
    <div>
      <AuthForm handleSubmit={onSubmit} form={authForm} fields={validationFields} />
    </div>
  )
}

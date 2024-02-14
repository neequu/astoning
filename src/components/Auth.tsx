import { toast } from 'sonner'
import type { z } from 'zod'
import { useDispatch } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AuthForm } from '@/components/AuthForm'
import { authorize } from '@/redux/slices/authSlice'
import { formSchema } from '@/lib/validations'
import { validationFields } from '@/lib/constants'

export function Auth() {
  const dispatch = useDispatch()

  const authForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(authorize())
    toast.success(values.email)
  }

  return (
    <div>
      <AuthForm handleSubmit={onSubmit} form={authForm} fields={validationFields} />
    </div>
  )
}

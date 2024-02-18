import type { z } from 'zod'
import type { UseFormReturn } from 'react-hook-form'
import type { formSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { capitalizeWord } from '@/lib/utils'
import type { ValidAuthFormFields } from '@/types/auth'

interface Props {
  handleSubmit: (values: z.infer<typeof formSchema>) => void
  form: UseFormReturn<{ [key in ValidAuthFormFields]: string }>
  fields: ValidAuthFormFields[]
  children?: React.ReactNode
  isDisabled?: boolean
}

export function AuthForm({ handleSubmit, form, fields, children, isDisabled }: Props) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4" autoComplete="off">

        { fields.map(item => (
          <FormField
            key={item}
            control={form.control}
            name={item}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{capitalizeWord(item)}</FormLabel>
                <FormControl>
                  <Input type={item} placeholder={`Enter ${item}`} {...field} disabled={isDisabled} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ),
        )}
        <div className="flex flex-col">
          <Button className="font-bold mt-6" disabled={form.formState.isSubmitting} type="submit">Submit</Button>
        </div>
      </form>
      {children && (
        <div className="flex flex-col">
          <p className="my-2 text-center text-muted-foreground">or</p>
          {children}
        </div>
      )}
    </Form>
  )
}

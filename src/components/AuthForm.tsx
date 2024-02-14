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
}

export function AuthForm({ handleSubmit, form, fields }: Props) {
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
                  <Input type={item} placeholder={`Enter ${item}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ),
        )}

        <Button className="font-bold" disabled={form.formState.isSubmitting} type="submit">Submit</Button>
      </form>
    </Form>
  )
}

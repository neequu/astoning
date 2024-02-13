import { z } from 'zod'

export const formSchema = z.object({
  email: z.string().email({
    message: 'Enter a valid email.',
  }),
  password: z.string().min(2).max(10, {
    message: 'Username must be at least 2 characters.',
  }),
})

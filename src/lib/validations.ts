import { z } from 'zod'

export const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email 🫡' }),
  password: z.string().min(6, {
    message: 'Password needs to be 6+ characters 🫣',
  }).max(50, {
    message: 'Password needs to be less than 50 symbols 😫',
  }),
})

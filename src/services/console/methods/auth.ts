/* eslint-disable no-console */
import type { ZodError } from 'zod'
import { formSchema } from '@/lib/validations'
import type { Credentials } from '@/types/auth'
import { authService } from '@/services/auth'

function validateCredentials(data: Credentials) {
  try {
    const validatedData = formSchema.parse(data)
    return { success: true, data: validatedData }
  }
  catch (error) {
    return { success: false, error }
  }
}

export function register(params: string[]) {
  const [email, password] = params
  const res = validateCredentials({ email, password })
  if (res.success) {
    authService.register({ email, password })
      .then(res => console.log(res?.email))
  }
  else {
    const er = res.error as ZodError
    er.issues.forEach(e => console.warn(`${e.message} → fix ${e.path}`))
  }
}
export function login(params: string[]) {
  const [email, password] = params

  const res = validateCredentials({ email, password })
  if (res.success) {
    authService.loginWithCredentials({ email, password })
      .then(res => console.log(res?.email))
  }
  else {
    const er = res.error as ZodError
    er.issues.forEach(e => console.warn(`${e.message} → fix ${e.path}`))
  }
}
export function signOut() {
  authService.signOut()
    .then(res => console.log(res))
}
export async function getUser() {
  const user = await authService.getUser()
  return user
}

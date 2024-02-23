/* eslint-disable no-console */
import type { ZodError } from 'zod'
import { formSchema } from '@/lib/validations'
import type { Credentials, User } from '@/types/auth'
import { authService } from '@/services/auth'

type ValidationResponse = { success: boolean, data: Credentials, error?: undefined } | { success: boolean, error: unknown, data?: undefined }

function validateCredentials(data: Credentials): ValidationResponse {
  try {
    const validatedData = formSchema.parse(data)
    return { success: true, data: validatedData }
  }
  catch (error) {
    return { success: false, error }
  }
}

export async function register(params: string[]): Promise<void> {
  const [email, password] = params
  const res = validateCredentials({ email, password })
  if (res.success) {
    await authService.register({ email, password })
    console.log('✅')
  }
  else {
    // using as here to specify error type
    const er = res.error as ZodError
    er.issues.forEach(e => console.warn(`${e.message} → fix ${e.path}`))
  }
}
export async function login(params: string[]): Promise<void> {
  const [email, password] = params

  const validation = validateCredentials({ email, password })
  if (validation.success) {
    await authService.loginWithCredentials({ email, password })
    console.log('✅')
  }
  else {
    const er = validation.error as ZodError
    er.issues.forEach(e => console.warn(`${e.message} → fix ${e.path}`))
  }
}
export async function signOut(): Promise<void> {
  await authService.signOut()
  console.log('✅')
}
export async function getUser(): Promise<User | null> {
  const user = await authService.getUser()
  return user
}

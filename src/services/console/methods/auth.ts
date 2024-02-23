/* eslint-disable no-console */
import type { ZodError } from 'zod'
import { formSchema } from '@/lib/validations'
import databaseMethods from '@/services/db/db-methods-switch'
import type { Credentials } from '@/types/auth'

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
    databaseMethods.register({ email, password })
      .then(res => console.log(res))
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
    databaseMethods.loginWithCredentials({ email, password })
      .then(res => console.log(res))
  }
  else {
    const er = res.error as ZodError
    er.issues.forEach(e => console.warn(`${e.message} → fix ${e.path}`))
  }
}
export function signOut() {
  databaseMethods.signOut()
    .then(res => console.log(res))
}
export async function getUser() {
  const user = await databaseMethods.getUser()
  return user
}

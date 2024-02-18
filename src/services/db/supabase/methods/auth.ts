import type { Provider } from '@supabase/supabase-js'
import type { Credentials } from '@/types/auth'
import { handleError, handleSuccess } from '@/lib/utils'
import supabase from '@/services/db/supabase/client'

export async function _getUser() {
  const { data: { session }, error } = await supabase.auth.getSession()

  const user = session?.user ?? null

  if (error) {
    handleError(error?.message)
    return null
  }

  return user
}

export async function _loginWithCredentials(cred: Credentials) {
  const { data: { user }, error } = await supabase.auth.signInWithPassword(cred)

  if (error || !user) {
    handleError(error?.message)
    return null
  }

  return user
}

export async function _register(cred: Credentials) {
  const { data: { user }, error } = await supabase.auth.signUp(cred)

  if (error || !user) {
    handleError(error?.message)
    return null
  }

  return user
}

export async function _loginWithOath(provider: Provider) {
  await supabase.auth.signInWithOAuth({
    provider,
  })
}

export async function _signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    handleError(error?.message)
    return null
  }

  handleSuccess('Signed out!')
  return null
}

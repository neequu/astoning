import type { Provider } from '@supabase/supabase-js'
import type { Credentials } from '@/types/auth'
import { handleError, handleSuccess } from '@/lib/utils'
import supabase from '@/services/db/supabase/client'
import type { Auth } from '@/types/db/db-methods'

export async function getUser(): Promise<ReturnType<Auth['getUser']>> {
  const { data: { session }, error } = await supabase.auth.getSession()

  const user = session?.user ?? null

  if (error) {
    handleError(error?.message)
    return null
  }

  return user
}

export async function loginWithCredentials(cred: Credentials): Promise<ReturnType<Auth['loginWithCredentials']>> {
  const { data: { user }, error } = await supabase.auth.signInWithPassword(cred)

  if (error || !user) {
    handleError(error?.message)
    return null
  }

  return user
}

export async function register(cred: Credentials): Promise<ReturnType<Auth['register']>> {
  const { data: { user }, error } = await supabase.auth.signUp(cred)

  if (error || !user) {
    handleError(error?.message)
    return null
  }

  return user
}

export async function loginWithOAuth(provider: Provider): Promise<ReturnType<Auth['loginWithOAuth']>> {
  await supabase.auth.signInWithOAuth({
    provider,
  })
  return null
}

export async function signOut(): Promise<ReturnType<Auth['signOut']>> {
  const { error } = await supabase.auth.signOut()

  if (error) {
    handleError(error?.message)
    return null
  }

  handleSuccess('Signed out!')
  return null
}

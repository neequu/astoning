import type { Credentials, Provider } from '@/types/db/db'
import { showNotificationError, showNotificationSuccess } from '@/lib/utils'
import supabase from '@/services/db/supabase/client'
import type { Auth } from '@/types/db/db-methods'

export async function getUser(): Promise<ReturnType<Auth['getUser']>> {
  const { data: { session }, error } = await supabase.auth.getSession()

  const user = session?.user ?? null

  if (error) {
    showNotificationError(error?.message)
    return null
  }

  return user
}

export async function loginWithCredentials(cred: Credentials): Promise<ReturnType<Auth['loginWithCredentials']>> {
  const { data: { user }, error } = await supabase.auth.signInWithPassword(cred)

  if (error || !user) {
    showNotificationError(error?.message)
    return null
  }

  return user
}

export async function register(cred: Credentials): Promise<ReturnType<Auth['register']>> {
  const { data: { user }, error } = await supabase.auth.signUp(cred)

  if (error || !user) {
    showNotificationError(error?.message)
    return null
  }

  return user
}

export async function loginWithOAuth(provider: Provider): Promise<ReturnType<Auth['loginWithOAuth']>> {
  try {
    await supabase.auth.signInWithOAuth({
      provider,
    })
  }
  catch (e) {
    showNotificationError('Couldn\'t authorize with this method')
  }
  return null
}

export async function signOut(): Promise<ReturnType<Auth['signOut']>> {
  const { error } = await supabase.auth.signOut()

  if (error) {
    showNotificationError(error?.message)
    return null
  }

  showNotificationSuccess('Signed out!')
  return null
}

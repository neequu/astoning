import type { Credentials, Provider } from '@/types/auth'
import { showNotificationError, showNotificationSuccess } from '@/lib/utils'
import supabase from '@/services/db/supabase/client'
import type { Auth } from '@/types/db/db-methods'

export const supabaseAuth: Auth = {
  getUser: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()

    const user = session?.user ?? null

    if (error) {
      showNotificationError(error?.message)
      return null
    }

    return user
  },

  loginWithCredentials: async (cred: Credentials) => {
    const { data: { user }, error } = await supabase.auth.signInWithPassword(cred)

    if (error || !user) {
      showNotificationError(error?.message)
      return null
    }

    return user
  },

  register: async (cred: Credentials) => {
    const { data: { user }, error } = await supabase.auth.signUp(cred)

    if (error || !user) {
      showNotificationError(error?.message)
      return null
    }

    return user
  },

  loginWithOAuth: async (provider: Provider) => {
    try {
      await supabase.auth.signInWithOAuth({
        provider,
      })
    }
    catch (e) {
      showNotificationError('Couldn\'t authorize with this method')
    }
    return null
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      showNotificationError(error?.message)
      return null
    }

    showNotificationSuccess('Signed out!')
    return null
  },
}

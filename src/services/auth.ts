import type { Provider } from '@supabase/supabase-js'
import supabase from '@/services/supabase'
import type { Credentials } from '@/types/auth'
import { handleError } from '@/lib/utils'

export const authService = {

  loginWithCredentials: async (cred: Credentials) => {
    const { data: { user }, error } = await supabase.auth.signInWithPassword(cred)

    if (error || !user)
      return handleError(error?.message)

    return user
  },

  register: async (cred: Credentials) => {
    const { data: { user }, error } = await supabase.auth.signUp(cred)

    if (error || !user)
      return handleError(error?.message)

    return user
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()

    if (error)
      return handleError(error?.message)
  },

  getUser: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()

    const user = session?.user ?? null

    if (error)
      return handleError(error?.message)

    return user
  },

  loginWithOath: async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({
      provider,
    })
  },
}

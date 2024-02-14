import supabase from '@/services/supabase'
import type { Credentials } from '@/types/auth'
import { handleError } from '@/lib/utils'

export const authService = {

  login: async (cred: Credentials) => {
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

}

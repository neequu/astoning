import type { Provider } from '@supabase/supabase-js'
import _DBMethods from './db/db-methods'
import type { Credentials } from '@/types/auth'

export const authService = {

  loginWithCredentials: (cred: Credentials) => _DBMethods._loginWithCredentials(cred),

  register: (cred: Credentials) => _DBMethods._register(cred),

  signOut: _DBMethods._signOut,

  getUser: _DBMethods._getUser,

  loginWithOath: (provider: Provider) => _DBMethods._loginWithOath(provider),
}

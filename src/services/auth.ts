import type { Provider } from '@supabase/supabase-js'
import { _getUser, _loginWithCredentials, _loginWithOath, _register, _signOut } from './db/db-methods'
import type { Credentials } from '@/types/auth'

export const authService = {

  loginWithCredentials: (cred: Credentials) => _loginWithCredentials(cred),

  register: (cred: Credentials) => _register(cred),

  signOut: _signOut,

  getUser: _getUser,

  loginWithOath: (provider: Provider) => _loginWithOath(provider),
}

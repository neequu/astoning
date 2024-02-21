import _DB_METHODS from './db/db-methods-switch'
import type { Credentials, Provider } from '@/types/auth'
import type { Auth } from '@/types/db/db-methods'

export const authService: Auth = {

  loginWithCredentials: (cred: Credentials): ReturnType<Auth['loginWithCredentials']> => _DB_METHODS.loginWithCredentials(cred),

  register: (cred: Credentials): ReturnType<Auth['register']> => _DB_METHODS.register(cred),

  signOut: (): ReturnType<Auth['signOut']> => _DB_METHODS.signOut(),

  getUser: (): ReturnType<Auth['getUser']> => _DB_METHODS.getUser(),

  loginWithOAuth: (provider: Provider): ReturnType<Auth['loginWithOAuth']> => _DB_METHODS.loginWithOAuth(provider),
}

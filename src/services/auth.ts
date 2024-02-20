import _DB_METHODS from './db/db-methods-switch'
import type { Credentials, Provider } from '@/types/db/db'
import type { Auth } from '@/types/db/db-methods'

export const authService = {

  loginWithCredentials: (cred: Credentials): Promise<ReturnType<Auth['loginWithCredentials']>> => _DB_METHODS.loginWithCredentials(cred),

  register: (cred: Credentials): Promise<ReturnType<Auth['register']>> => _DB_METHODS.register(cred),

  signOut: (): Promise<ReturnType<Auth['signOut']>> => _DB_METHODS.signOut(),

  getUser: (): Promise<ReturnType<Auth['getUser']>> => _DB_METHODS.getUser(),

  loginWithOAuth: (provider: Provider): Promise<ReturnType<Auth['loginWithOAuth']>> => _DB_METHODS.loginWithOAuth(provider),
}

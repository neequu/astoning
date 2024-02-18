import type { Provider, User } from '@supabase/supabase-js'
import { verifyLocalStorageByKey } from '../client'
import { generateTimestampTz, handleError, handleSuccess } from '@/lib/utils'
import { LS_KEY } from '@/lib/constants'
import type { UserWithCredentials } from '@/types/db/localstorage'
import type { Credentials } from '@/types/auth'
import type { Auth } from '@/types/db/db-methods'

export async function getUser(): Promise<ReturnType<Auth['getUser']>> {
  verifyLocalStorageByKey(LS_KEY.auth)

  const prevData: UserWithCredentials[] = JSON.parse(localStorage.getItem(LS_KEY.auth)!)
  const currentUser = prevData.find(user => user.activeSession)

  if (!currentUser) {
    handleError('No user!')
    return null
  }

  return currentUser.user
}

export async function loginWithCredentials(cred: Credentials): Promise<ReturnType<Auth['loginWithCredentials']>> {
  verifyLocalStorageByKey(LS_KEY.auth)

  const prevData: UserWithCredentials[] = JSON.parse(localStorage.getItem(LS_KEY.auth)!)
  const user = prevData.find(user => ((user.email === cred.email) && (user.password === cred.password)))

  if (!user) {
    handleError('Invalid credentials')
    return null
  }

  const newData = prevData.map((user) => {
    if ((user.email === cred.email) && (user.password === cred.password))
      user.activeSession = true
    return user
  })

  localStorage.setItem(LS_KEY.auth, JSON.stringify(newData))

  return user.user
}

export async function register(cred: Credentials): Promise<ReturnType<Auth['register']>> {
  verifyLocalStorageByKey(LS_KEY.auth)

  const timestamptz = generateTimestampTz()
  const appMetadata = { app: 'neequu app' }
  const userMetadata = { about: 'very good user' }

  const user: User = { id: cred.password + cred.email, created_at: timestamptz, app_metadata: appMetadata, user_metadata: userMetadata, aud: 'zxc' }

  const userObject: UserWithCredentials = { ...cred, user, activeSession: true }
  const prevData: UserWithCredentials[] = JSON.parse(localStorage.getItem(LS_KEY.auth)!)

  localStorage.setItem(LS_KEY.auth, JSON.stringify([...prevData, userObject]))

  return user
}

export async function loginWithOAuth(provider: Provider): Promise<ReturnType<Auth['loginWithOAuth']>> {
  handleError(`Loggin with ${provider} is temporarily unavailable`)
  return null
}

export async function signOut(): Promise<ReturnType<Auth['signOut']>> {
  verifyLocalStorageByKey(LS_KEY.auth)

  const prevData: UserWithCredentials[] = JSON.parse(localStorage.getItem(LS_KEY.auth)!)

  const newData = prevData.map((user) => {
    if (user.activeSession)
      user.activeSession = false
    return user
  })

  localStorage.setItem(LS_KEY.auth, JSON.stringify(newData))

  handleSuccess('Signed out!')
  return null
}

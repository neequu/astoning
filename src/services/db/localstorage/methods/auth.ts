import { verifyLocalStorageByKey } from '../client'
import { generateTimestampTz, showNotificationError, showNotificationSuccess } from '@/lib/utils'
import { LS_KEYS } from '@/lib/constants'
import type { Auth } from '@/types/db/db-methods'
import type { Credentials, Provider, User, UserWithCredentials } from '@/types/auth'

export async function getUser(): Promise<ReturnType<Auth['getUser']>> {
  verifyLocalStorageByKey(LS_KEYS.auth)

  const prevData: UserWithCredentials[] = JSON.parse(localStorage.getItem(LS_KEYS.auth)!)
  const currentUser = prevData.find(user => user.activeSession)

  if (!currentUser) {
    showNotificationError('No user!')
    return null
  }

  return currentUser.user
}

export async function loginWithCredentials(cred: Credentials): Promise<ReturnType<Auth['loginWithCredentials']>> {
  verifyLocalStorageByKey(LS_KEYS.auth)

  const prevData: UserWithCredentials[] = JSON.parse(localStorage.getItem(LS_KEYS.auth)!)
  const user = prevData.find(user => ((user.email === cred.email) && (user.password === cred.password)))

  if (!user) {
    showNotificationError('Invalid credentials')
    return null
  }

  const newData = prevData.map((user) => {
    if ((user.email === cred.email) && (user.password === cred.password))
      user.activeSession = true
    return user
  })

  localStorage.setItem(LS_KEYS.auth, JSON.stringify(newData))

  return user.user
}

export async function register(cred: Credentials): Promise<ReturnType<Auth['register']>> {
  verifyLocalStorageByKey(LS_KEYS.auth)

  const timestamptz = generateTimestampTz()
  const appMetadata = { app: 'neequu app' }
  const userMetadata = { about: 'very good user' }

  const user: User = { id: cred.password + cred.email, created_at: timestamptz, app_metadata: appMetadata, user_metadata: userMetadata, aud: 'authenticated' }

  const userObject: UserWithCredentials = { ...cred, user, activeSession: true }
  const prevData: UserWithCredentials[] = JSON.parse(localStorage.getItem(LS_KEYS.auth)!)

  localStorage.setItem(LS_KEYS.auth, JSON.stringify([...prevData, userObject]))

  return user
}

export async function loginWithOAuth(provider: Provider): Promise<ReturnType<Auth['loginWithOAuth']>> {
  showNotificationError(`Loggin with ${provider} is temporarily unavailable`)
  return null
}

export async function signOut(): Promise<ReturnType<Auth['signOut']>> {
  verifyLocalStorageByKey(LS_KEYS.auth)

  const prevData: UserWithCredentials[] = JSON.parse(localStorage.getItem(LS_KEYS.auth)!)

  const newData = prevData.map((user) => {
    if (user.activeSession)
      user.activeSession = false
    return user
  })

  localStorage.setItem(LS_KEYS.auth, JSON.stringify(newData))

  showNotificationSuccess('Signed out!')
  return null
}

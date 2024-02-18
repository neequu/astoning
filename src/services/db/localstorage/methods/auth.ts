import type { Provider, User } from '@supabase/supabase-js'
import { verifyLocalStorageByKey } from '../client'
import { generateTimestampTz, handleError, handleSuccess } from '@/lib/utils'
import { LS_KEY } from '@/lib/constants'
import type { UserWithCredentials } from '@/types/db/localstorage'
import type { Credentials } from '@/types/auth'

export async function _getUser(): Promise<User | null> {
  verifyLocalStorageByKey(LS_KEY.auth)

  const prevData: UserWithCredentials[] = JSON.parse(localStorage.getItem(LS_KEY.auth)!)
  const currentUser = prevData.find(user => user.activeSession)

  if (!currentUser) {
    handleError('No user!')
    return null
  }

  return currentUser.user
}

export async function _loginWithCredentials(cred: Credentials): Promise<User | null> {
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

export async function _register(cred: Credentials): Promise<User | null> {
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

// reason: can't do that in LS
// eslint-disable-next-line unused-imports/no-unused-vars
export async function _loginWithOath(provider: Provider): Promise<null> {
  handleError('This functionality is temporarily unavailable')
  return null
}

export async function _signOut(): Promise<null> {
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

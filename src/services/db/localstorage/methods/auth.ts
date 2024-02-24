import { verifyLocalStorageByKey } from '../client'
import { generateTimestampTz, showNotificationError, showNotificationSuccess } from '@/lib/utils'
import { LS_KEYS } from '@/lib/constants'
import type { Auth } from '@/types/db/db-methods'
import type { Credentials, Provider, User, UserWithCredentials } from '@/types/auth'

export const localStorageAuth: Auth = {

  getUser: async () => {
    verifyLocalStorageByKey(LS_KEYS.auth)

    const prevData: UserWithCredentials[] = JSON.parse(localStorage.getItem(LS_KEYS.auth)!)
    const currentUser = prevData.find(user => user.activeSession)

    if (!currentUser) {
      showNotificationError('No user!')
      return null
    }

    return currentUser.user
  },

  loginWithCredentials: async (cred: Credentials) => {
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
  },

  register: async (cred: Credentials) => {
    verifyLocalStorageByKey(LS_KEYS.auth)

    const prevData: UserWithCredentials[] = JSON.parse(localStorage.getItem(LS_KEYS.auth)!)
    const existingUser = prevData.find(u => u.email === cred.email)
    if (existingUser) {
      showNotificationError('Already exists')
      return null
    }

    const timestamptz = generateTimestampTz()
    const user: User = { id: cred.password + cred.email, created_at: timestamptz }
    const userObject: UserWithCredentials = { ...cred, user, activeSession: true }

    localStorage.setItem(LS_KEYS.auth, JSON.stringify([...prevData, userObject]))

    return user
  },

  loginWithOAuth: async (provider: Provider) => {
    showNotificationError(`Loggin with ${provider} is temporarily unavailable`)
    return null
  },

  signOut: async () => {
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
  },
}

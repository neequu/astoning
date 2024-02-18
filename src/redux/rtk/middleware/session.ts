import { createListenerMiddleware } from '@reduxjs/toolkit'
import { setUser } from '../../slices/auth-slice'
import { generateTimestampTz } from '@/lib/utils'
import { SESSIONS_KEY } from '@/lib/constants'

export const sessionMiddleware = createListenerMiddleware()

sessionMiddleware.startListening({
  actionCreator: setUser,
  effect: (action) => {
    setSession(action.payload?.id)
  },
})

function setSession(userId: string | undefined) {
  if (!userId)
    return

  if (!localStorage.getItem(SESSIONS_KEY))
    localStorage.setItem(SESSIONS_KEY, JSON.stringify([]))

  const prevData = localStorage.getItem(SESSIONS_KEY)

  const timestamptz = generateTimestampTz()
  const pastSessions: { userId: string, timestamptz: string }[] = JSON.parse(prevData!)

  const newData = ([...pastSessions, { userId, timestamptz }])
  // eslint-disable-next-line no-console
  console.log('Added entry. Sessions: ', newData)

  localStorage.setItem(SESSIONS_KEY, JSON.stringify(newData))
}

import { createListenerMiddleware } from '@reduxjs/toolkit'
import { setUser } from '../../slices/auth-slice'
import { generateTimestampTz } from '@/lib/utils'
import { setSession } from '@/redux/slices/session-slice'

export const sessionMiddleware = createListenerMiddleware()

sessionMiddleware.startListening({
  actionCreator: setUser,
  effect: (action, listenerApi) => {
    const email = action.payload?.email ?? ''
    const timestamptz = generateTimestampTz()
    listenerApi.dispatch(setSession({ email, timestamptz }))
  },
})

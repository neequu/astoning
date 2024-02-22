import { addListener, createListenerMiddleware } from '@reduxjs/toolkit'
import { setUser } from '../../slices/auth-slice'
import { generateTimestampTz } from '@/lib/utils'
import { setSession } from '@/store/slices/session-slice'
import type { AppDispatch, RootState } from '@/store'

export const sessionMiddleware = createListenerMiddleware()
export const addAppListener = addListener.withTypes<RootState, AppDispatch>()

sessionMiddleware.startListening({
  actionCreator: setUser,
  effect: (action, listenerApi) => {
    const email = action.payload?.email ?? ''
    const timestamptz = generateTimestampTz()
    listenerApi.dispatch(setSession({ email, timestamptz }))
  },
})

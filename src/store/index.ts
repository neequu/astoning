import { configureStore } from '@reduxjs/toolkit'
import { sessionMiddleware } from './utils/middleware/session'
import { consoleMiddleware } from './utils/middleware/console'
import authSlice from '@/store/slices/auth-slice'
import sessionSlice from '@/store/slices/session-slice'
import { animeApi } from '@/store/api/anime-api'
import { dbApi } from '@/store/api/db-api'
import visitSlice from '@/store/slices/visit-slice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    session: sessionSlice,
    visit: visitSlice,
    [animeApi.reducerPath]: animeApi.reducer,
    [dbApi.reducerPath]: dbApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(animeApi.middleware).concat(dbApi.middleware).prepend(sessionMiddleware.middleware).prepend(consoleMiddleware.middleware),

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

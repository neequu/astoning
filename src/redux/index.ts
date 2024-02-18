import { configureStore } from '@reduxjs/toolkit'
import { sessionMiddleware } from '@/redux/rtk/middleware/session'
import authSlice from '@/redux/slices/auth-slice'
import { animeApi } from '@/redux/api/anime-api'
import { dbApi } from '@/redux/api/db-api'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [animeApi.reducerPath]: animeApi.reducer,
    [dbApi.reducerPath]: dbApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(sessionMiddleware.middleware).concat(animeApi.middleware).concat(dbApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

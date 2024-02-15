import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/redux/slices/auth-slice'
import { animeApi } from '@/redux/apis/anime-api'
import { dbApi } from '@/redux/apis/db-api'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [animeApi.reducerPath]: animeApi.reducer,
    [dbApi.reducerPath]: dbApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(animeApi.middleware).concat(dbApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

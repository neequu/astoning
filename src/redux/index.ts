import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/redux/slices/auth-slice'
import { animeApi } from '@/redux/apis/anime-api'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [animeApi.reducerPath]: animeApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(animeApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

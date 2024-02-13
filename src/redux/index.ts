import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/redux/slices/authSlice'
import { animeApi } from '@/redux/apis/animeApi'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [animeApi.reducerPath]: animeApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(animeApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

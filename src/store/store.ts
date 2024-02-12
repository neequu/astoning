import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/store/auth/authSlice'
import { apiSlice } from '@/store/api/apiSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

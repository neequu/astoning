import { configureStore } from '@reduxjs/toolkit'
import { consoleMiddleware } from './utils/middleware/console'
import authSlice from '@/store/slices/auth-slice'
import { animeApi } from '@/store/api/anime-api'
import { dbApi } from '@/store/api/db-api'
import visitSlice from '@/store/slices/visit-slice'
import telegramSlice from '@/features/slices/telegram'
import { telegramFeatApi } from '@/features/api/telegram'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    telegram: telegramSlice,
    visit: visitSlice,
    [animeApi.reducerPath]: animeApi.reducer,
    [dbApi.reducerPath]: dbApi.reducer,
    [telegramFeatApi.reducerPath]: telegramFeatApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(animeApi.middleware).concat(dbApi.middleware).concat(telegramFeatApi.middleware).prepend(consoleMiddleware.middleware),

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

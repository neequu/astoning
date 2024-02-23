import { configureStore } from '@reduxjs/toolkit'
import { consoleMiddleware } from '@/store/utils/middleware/console'
import authSlice from '@/store/slices/auth-slice'
import { animeApi } from '@/store/api/anime-api'
import { dbApi } from '@/store/api/db-api'
import visitSlice from '@/store/slices/visit-slice'
import entityVisitSlice from '@/store/entity'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    visit: visitSlice,
    entityVisit: entityVisitSlice,
    [animeApi.reducerPath]: animeApi.reducer,
    [dbApi.reducerPath]: dbApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(animeApi.middleware).concat(dbApi.middleware).prepend(consoleMiddleware.middleware),

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

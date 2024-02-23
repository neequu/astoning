import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TELEGRAM_FEAT_URL } from '@/lib/constants'

export const animeApi = createApi({
  reducerPath: 'feature-api',
  baseQuery: fetchBaseQuery({ baseUrl: TELEGRAM_FEAT_URL }),
  endpoints: builder => ({
    getFeatureFlag: builder.query<any, void>({
      query: () => 'api/tg-feat-flag',
    }),

  }),
})

export const { useGetFeatureFlagQuery } = animeApi

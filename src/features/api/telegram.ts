import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER_URL, TELEGRAM_FEAT_URL } from '@/lib/constants'
import type { FeatureState } from '@/types/features'

export const telegramFeatApi = createApi({
  reducerPath: 'tg-feature-api',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: builder => ({
    getFeatureFlag: builder.query<FeatureState, void>({
      query: () => TELEGRAM_FEAT_URL,
    }),

  }),
})

export const { useGetFeatureFlagQuery } = telegramFeatApi

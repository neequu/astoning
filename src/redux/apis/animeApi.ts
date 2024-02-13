import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse, ApiResponseSingle } from '@/types/anime'
import { baseUrl } from '@/lib/constants'

export const animeApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    getAnime: builder.query<ApiResponse, void>({
      query: () => 'anime',
    }),
    getAnimeById: builder.query<ApiResponseSingle, number>({
      query: id => `anime/${id}`,
    }),
    getAnimeSearch: builder.query<ApiResponse, string>({
      query: q => ({
        url: 'anime',
        params: { q },
      }),
    }),
  }),
})

export const { useGetAnimeQuery, useGetAnimeSearchQuery, useGetAnimeByIdQuery } = animeApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse, ApiResponseSingle } from '@/types/anime'
import { BASE_API_URL } from '@/lib/constants'
import { transformAnimeData } from '@/lib/rtk/transforms'

export const animeApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: builder => ({
    getAnime: builder.query<ApiResponse, void>({
      query: () => 'anime',
      transformResponse: (response: ApiResponse) => ({
        ...response,
        data: response.data.map(transformAnimeData),
      }),
    }),
    getAnimeById: builder.query<ApiResponseSingle, number>({
      query: id => `anime/${id}`,
      transformResponse: (response: ApiResponseSingle) => ({
        ...response,
        data: transformAnimeData(response.data),
      }),
    }),
    getAnimeSearch: builder.query<ApiResponse, string>({
      query: q => ({
        url: 'anime',
        params: { q },
      }),
      transformResponse: (response: ApiResponse) => ({
        ...response,
        data: response.data.map(transformAnimeData),
      }),
    }),
  }),
})

export const { useGetAnimeQuery, useGetAnimeSearchQuery, useGetAnimeByIdQuery } = animeApi

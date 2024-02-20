import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse, ApiResponseSingle } from '@/types/api/anime'
import { BASE_API_URL } from '@/lib/constants'
import { transformAnimeData } from '@/redux/rtk/transforms/transform-anime-data'

export const animeApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: builder => ({
    getAnime: builder.query<ApiResponse, number>({
      query: (page = 1) => ({
        url: 'anime',
        params: { page },
      }),
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
    getAnimeSearch: builder.query<ApiResponse, { q: string, limit?: number, page?: number }>({
      query: ({ q, limit, page = 1 }) => ({
        url: 'anime',
        params: { q, limit, page },
      }),
      transformResponse: (response: ApiResponse) => ({
        ...response,
        data: response.data.map(transformAnimeData),
      }),
    }),
  }),
})

export const { useGetAnimeQuery, useGetAnimeSearchQuery, useGetAnimeByIdQuery } = animeApi

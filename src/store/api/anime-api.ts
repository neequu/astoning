import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse, ApiResponseSingle, QueryResponse, QueryResponseSingle } from '@/types/api/anime'
import { BASE_API_URL } from '@/lib/constants'
import { transformAnimeData, transformPaginationData } from '@/store/utils/transforms/transform-api-data'

export const animeApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: builder => ({
    getAnime: builder.query<QueryResponse, number>({
      query: (page = 1) => ({
        url: 'anime',
        params: { page },
      }),

      transformResponse: (response: ApiResponse) => ({
        ...response,
        data: response.data.map(transformAnimeData),
        pagination: transformPaginationData(response.pagination),
      }),
    }),

    getAnimeById: builder.query<QueryResponseSingle, number>({
      query: id => `anime/${id}`,
      transformResponse: (response: ApiResponseSingle) => ({
        ...response,
        data: transformAnimeData(response.data),
      }),
    }),

    getAnimeSearch: builder.query<QueryResponse, { q: string, limit?: number, page?: number }>({
      query: ({ q, limit, page = 1 }) => ({
        url: 'anime',
        params: { q, limit, page },
      }),
      transformResponse: (response: ApiResponse) => ({
        ...response,
        data: response.data.map(transformAnimeData),
        pagination: transformPaginationData(response.pagination),
      }),
    }),
  }),
})

export const { useGetAnimeQuery, useGetAnimeSearchQuery, useGetAnimeByIdQuery } = animeApi

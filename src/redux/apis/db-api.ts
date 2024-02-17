import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '@supabase/supabase-js'
import { likeService } from '@/services/like'
import { historyService } from '@/services/history'
import type { Tables } from '@/types/db'

export const dbApi = createApi({
  reducerPath: 'db',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['LikeById', 'Like', 'History'],
  endpoints: builder => ({
    getFavorites: builder.query<{ item_id: number }[] | null, User['id'] | undefined>({
      queryFn: async (userId) => {
        const data = await likeService.getFavorites(userId)
        return { data }
      },
      providesTags: ['Like'],
    }),
    getFavoritesById: builder.query<{ item_id: number }[] | null, { itemId: number, userId: User['id'] | undefined }>({
      queryFn: async ({ itemId, userId }) => {
        const data = await likeService.getFavoriteById(itemId, userId)
        return { data }
      },
      providesTags: ['LikeById'],
    }),
    changeLike: builder.mutation<number | null, { itemId: number, isCurrentStateActive: boolean, userId: User['id'] | undefined }>({
      queryFn: async ({ itemId, isCurrentStateActive, userId }) => {
        const data = await likeService.changeLike(itemId, isCurrentStateActive, userId)
        return { data }
      },
      invalidatesTags: ['Like', 'LikeById'],
    }),
    // history
    getHistory: builder.query<Tables<'history'>[] | null, User['id'] | undefined>({
      queryFn: async (userId) => {
        const data = await historyService.getHistory(userId)
        return { data }
      },
      providesTags: ['History'],
    }),
    addHistory: builder.mutation<null, { query: string, userId: User['id'] | undefined }>({
      queryFn: async ({ query, userId }) => {
        const data = await historyService.addHistory(query, userId)
        return { data }
      },
      invalidatesTags: ['History'],
    }),
    deleteHistoryById: builder.mutation<null, { itemId: number, userId: User['id'] | undefined }>({
      queryFn: async ({ itemId, userId }) => {
        const data = await historyService.deleteHistoryById(itemId, userId)
        return { data }
      },
      invalidatesTags: ['History'],
    }),
    deleteAllHistory: builder.mutation<null, { userId: User['id'] | undefined }>({
      queryFn: async ({ userId }) => {
        const data = await historyService.deleteAllHistory(userId)
        return { data }
      },
      invalidatesTags: ['History'],
    }),
  }),
})

export const { useGetFavoritesQuery, useGetFavoritesByIdQuery, useChangeLikeMutation } = dbApi

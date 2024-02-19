import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '@supabase/supabase-js'
import { likeService } from '@/services/like'
import { historyService } from '@/services/history'
import type { Favorites, History } from '@/types/db/db-methods'

export const dbApi = createApi({
  reducerPath: 'db',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Like', 'History'],
  endpoints: builder => ({
    getFavorites: builder.query<ReturnType<Favorites['getFavorites']>, User['id'] | undefined>({
      queryFn: async (userId) => {
        const data = await likeService.getFavorites(userId)
        return { data }
      },
      providesTags: ['Like'],
    }),
    getFavoritesById: builder.query<ReturnType<Favorites['getFavoriteById']>, { itemId: number, userId: User['id'] | undefined }>({
      queryFn: async ({ itemId, userId }) => {
        const data = await likeService.getFavoriteById(itemId, userId)
        return { data }
      },
      providesTags: ['Like'],
    }),
    changeLike: builder.mutation<ReturnType<Favorites['addFavorite']>, { itemId: number, isCurrentStateActive: boolean, userId: User['id'] | undefined }>({
      queryFn: async ({ itemId, isCurrentStateActive, userId }) => {
        const data = await likeService.changeLike(itemId, isCurrentStateActive, userId)
        return { data }
      },
      invalidatesTags: ['Like'],
    }),
    // history
    getHistory: builder.query<ReturnType<History['getHistory']>, User['id'] | undefined>({
      queryFn: async (userId) => {
        const data = await historyService.getHistory(userId)
        return { data }
      },
      providesTags: ['History'],
    }),
    addHistory: builder.mutation<ReturnType<History['addHistory']>, { query: string, userId: User['id'] | undefined }>({
      queryFn: async ({ query, userId }) => {
        const data = await historyService.addHistory(query, userId)
        return { data }
      },
      invalidatesTags: ['History'],
    }),
    deleteHistoryById: builder.mutation<ReturnType<History['deleteHistoryById']>, { itemId: number, userId: User['id'] | undefined }>({
      queryFn: async ({ itemId, userId }) => {
        const data = await historyService.deleteHistoryById(itemId, userId)
        return { data }
      },
      invalidatesTags: ['History'],
    }),
    deleteAllHistory: builder.mutation<ReturnType<History['deleteAllHistory']>, { userId: User['id'] | undefined }>({
      queryFn: async ({ userId }) => {
        const data = await historyService.deleteAllHistory(userId)
        return { data }
      },
      invalidatesTags: ['History'],
    }),
  }),
})

export const { useGetFavoritesQuery, useGetFavoritesByIdQuery, useChangeLikeMutation, useDeleteAllHistoryMutation, useAddHistoryMutation, useDeleteHistoryByIdMutation, useGetHistoryQuery } = dbApi

import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import type { FavoritesTransformed, HistoryTransformed } from '@/types/db/db'
import type { User } from '@/types/auth'
import { likeService } from '@/services/like'
import { historyService } from '@/services/history'
import { transformFavoritesData, transformHistoryData } from '@/store/utils/transforms/transform-db-data'

export const dbApi = createApi({
  reducerPath: 'db',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Like', 'History'],
  endpoints: builder => ({
    // likes
    getFavorites: builder.query<FavoritesTransformed[] | null, User['id'] | undefined>({
      queryFn: async (userId) => {
        const res = await likeService.getFavorites(userId)
        const data = res ? res.map(transformFavoritesData) : null
        return { data }
      },
      providesTags: ['Like'],
    }),
    getFavoritesById: builder.query<FavoritesTransformed | null, { itemId: number, userId: User['id'] | undefined }>({
      queryFn: async ({ itemId, userId }) => {
        const res = await likeService.getFavoriteById(itemId, userId)
        const data = res ? transformFavoritesData(res) : null
        return { data }
      },
      providesTags: ['Like'],
    }),
    changeLike: builder.mutation<number | null, { itemId: number, isCurrentStateActive: boolean, userId: User['id'] | undefined }>({
      queryFn: async ({ itemId, isCurrentStateActive, userId }) => {
        const data = await likeService.changeLike(itemId, isCurrentStateActive, userId)
        return { data }
      },
      invalidatesTags: ['Like'],
    }),

    // history
    getHistory: builder.query<HistoryTransformed[] | null, User['id'] | undefined>({
      queryFn: async (userId) => {
        const res = await historyService.getHistory(userId)
        const data = res ? res.map(transformHistoryData) : null
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
    deleteHistoryById: builder.mutation<number | null, { itemId: number, userId: User['id'] | undefined }>({
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

export const { useGetFavoritesQuery, useGetFavoritesByIdQuery, useChangeLikeMutation, useDeleteAllHistoryMutation, useAddHistoryMutation, useDeleteHistoryByIdMutation, useGetHistoryQuery } = dbApi

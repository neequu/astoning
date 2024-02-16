import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '@supabase/supabase-js'
import { likeService } from '@/services/like'

export const dbApi = createApi({
  reducerPath: 'db',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['LikeById', 'Like'],
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
  }),
})

export const { useGetFavoritesQuery, useGetFavoritesByIdQuery, useChangeLikeMutation } = dbApi

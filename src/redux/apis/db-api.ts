import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '@supabase/supabase-js'
import { likeService } from '@/services/like'
import type { Tables } from '@/types/db'

export const dbApi = createApi({
  reducerPath: 'db',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['LikeById', 'Like'],
  endpoints: builder => ({
    getFavorites: builder.query<Tables<'favorites'>[], User['id'] | undefined>({
      // @ts-expect-error database types currently not working todo: fix
      queryFn: async (userId) => {
        const data = await likeService.getFavorites(userId)
        return { data }
      },
      providesTags: ['Like'],
    }),
    getFavoritesById: builder.query<Tables<'favorites'>[], { itemId: number, userId: User['id'] | undefined }>({
      // @ts-expect-error database types currently not working todo: fix
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

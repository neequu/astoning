import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { likeService } from '@/services/like'
import type { Tables } from '@/types/db'

export const dbApi = createApi({
  reducerPath: 'db',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['LikeById', 'Like'],
  endpoints: builder => ({
    getFavorites: builder.query<Tables<'favorites'>[], void>({
      // @ts-expect-error database types currently not working todo: fix
      queryFn: async () => {
        const data = await likeService.getFavorites()
        return { data }
      },
      providesTags: ['Like'],
    }),
    getFavoritesById: builder.query<Tables<'favorites'>[], number>({
      // @ts-expect-error database types currently not working todo: fix
      queryFn: async (id) => {
        const data = await likeService.getFavoriteById(id)
        return { data }
      },
      providesTags: ['LikeById'],
    }),
    changeLike: builder.mutation<number | null, { id: number, initialState: boolean }>({
      queryFn: async ({ id, initialState }) => {
        const data = await likeService.changeLike(id, initialState)
        return { data }
      },
      invalidatesTags: ['Like', 'LikeById'],
    }),
  }),
})

export const { useGetFavoritesQuery, useGetFavoritesByIdQuery, useChangeLikeMutation } = dbApi

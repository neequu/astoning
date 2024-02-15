import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { likeService } from '@/services/like'
import type { Tables } from '@/types/db'

export const dbApi = createApi({
  reducerPath: 'db',
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    getFavorites: builder.query<Tables<'favorites'>, void>({
      // @ts-expect-error database types currently not working todo: fix
      queryFn: async () => {
        const data = await likeService.getFavorites()
        return { data }
      },
    }),
    getFavoritesById: builder.query<Tables<'favorites'>, number>({
      // @ts-expect-error database types currently not working todo: fix
      queryFn: async (id) => {
        const data = await likeService.getFavoriteById(id)
        return { data }
      },
    }),
  }),
})

export const { useGetFavoritesQuery, useGetFavoritesByIdQuery } = dbApi
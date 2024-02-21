import type { Credentials, Provider, User } from '@/types/auth'
import type { Tables } from '@/types/db/db'

export interface Auth {
  getUser: () => Promise<User | null>
  loginWithCredentials: (cred: Credentials) => Promise<User | null>
  register: (cred: Credentials) => Promise<User | null>
  loginWithOAuth: (provider: Provider) => Promise<User | null>
  signOut: () => Promise<User | null>
}
export interface Favorites {
  getFavorites: (userId: User['id'] | undefined) => Promise<Tables<'favorites'>[] | null>
  getFavoriteById: (itemId: number, userId: User['id'] | undefined) => Promise<Tables<'favorites'> | null>
  addFavorite: (itemId: number, userId: User['id'] | undefined) => Promise<number | null>
  removeFavorite: (itemId: number, userId: User['id'] | undefined) => Promise<number | null>
  changeLike: (itemId: number, isCurrentStateActive: boolean, userId: User['id'] | undefined) => Promise<number | null>
}
export interface History {
  getHistory: (userId: User['id'] | undefined) => Promise<Tables<'history'>[] | null>
  addHistory: (query: string, userId: User['id'] | undefined) => Promise<null>
  deleteHistoryById: (itemId: number, userId: User['id'] | undefined) => Promise<null | number>
  deleteAllHistory: (userId: User['id'] | undefined) => Promise<null>
}

export type DBMethods = Auth & Favorites & History

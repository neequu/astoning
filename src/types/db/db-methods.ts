import type { Provider, User } from '@supabase/supabase-js'
import type { Credentials } from '../auth'
import type { Tables } from './supabase'

export interface Auth {
  getUser: () => User | null
  loginWithCredentials: (cred: Credentials) => User | null
  register: (cred: Credentials) => User | null
  loginWithOAuth: (provider: Provider) => User | null
  signOut: (cred: Credentials) => User | null
}
export interface Favorites {
  getFavorites: (userId: User['id'] | undefined) => Tables<'favorites'>[] | null
  getFavoriteById: (itemId: number, userId: User['id'] | undefined) => Pick<Tables<'favorites'>, 'item_id'> | null
  addFavorite: (itemId: number, userId: User['id'] | undefined) => number | null
  removeFavorite: (itemId: number, userId: User['id'] | undefined) => number | null
}
export interface History {
  getHistory: (userId: User['id'] | undefined) => Tables<'history'>[] | null
  addHistory: (query: string, userId: User['id'] | undefined) => null
  deleteHistoryById: (itemId: number, userId: User['id'] | undefined) => null
  deleteAllHistory: (userId: User['id'] | undefined) => null
}

export type DBMethods = Auth & Favorites & History

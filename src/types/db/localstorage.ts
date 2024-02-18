import type { User } from '@supabase/supabase-js'
import type { Credentials } from '../auth'
import type { Tables } from '@/types/db/supabase'

export interface FavoritesLS extends Tables<'favorites'> {}
export interface HistoryLS extends Tables<'history'> {}

export type UserWithCredentials = { user: User, activeSession: boolean } & Credentials

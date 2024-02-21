import type { Provider as SupabaseProvider, User as SupabaseUser } from '@supabase/supabase-js'

export type UserWithCredentials = { user: User, activeSession: boolean } & Credentials

export type UserOptional = User | null

export type ValidAuthFormFields = 'email' | 'password'

export interface Credentials {
  email: string
  password: string
}

export interface User extends SupabaseUser {}
export type Provider = SupabaseProvider

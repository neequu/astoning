import type { User } from '@supabase/supabase-js'

export type UserOptional = User | null

export type ValidAuthFormFields = 'email' | 'password'

export interface Credentials {
  email: string
  password: string
}

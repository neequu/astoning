import type { User } from '@supabase/supabase-js'
import type { Credentials } from '../auth'

export type UserWithCredentials = { user: User, activeSession: boolean } & Credentials

// review: if lazy used, this doesn't work for some reason
import * as supabaseMethods from './supabase/methods'
import * as LSMethods from './localstorage/methods'
import type { DBMethods } from '@/types/db/db-methods'

const isDbSupabase = import.meta.env.VITE_REMOTE_STORE === 'SUPABASE'

const databaseMethods: DBMethods = isDbSupabase
  ? {
      ...supabaseMethods.supabaseHistory,
      ...supabaseMethods.supabaseFavorites,
      ...supabaseMethods.supabaseAuth,
    }
  : {
      ...LSMethods.localStorageHistory,
      ...LSMethods.localStorageFavorites,
      ...LSMethods.localStorageAuth,
    }

export default databaseMethods

import * as supabaseMethods from './supabase/methods'
import * as LSMethods from './localstorage/methods'

const isDbSupabase = import.meta.env.VITE_DB === 'SUPABASE'

export default isDbSupabase ? supabaseMethods : LSMethods

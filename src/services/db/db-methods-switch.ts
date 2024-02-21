// review: if lazy used, this doesn't work for some reason
import * as supabaseMethods from './supabase/methods'
import * as LSMethods from './localstorage/methods'

const isDbSupabase = import.meta.env.VITE_REMOTE_STORE === 'SUPABASE'

export default isDbSupabase ? supabaseMethods : LSMethods

import { createClient } from '@supabase/supabase-js'

// import type { Database } from '@/types/db'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
// todo: setup db types

// const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase

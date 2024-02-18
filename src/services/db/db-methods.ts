import * as supabaseMethods from './supabase/methods'
import * as LSMethods from './localstorage/methods'

let _DBMethods: any

if (import.meta.env.VITE_DB === 'SUPABASE')
  _DBMethods = supabaseMethods
else
  _DBMethods = LSMethods

export default _DBMethods

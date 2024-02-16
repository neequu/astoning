import type { ValidAuthFormFields } from '@/types/auth'

export const BASE_API_URL = 'https://api.jikan.moe/v4'

export const MAX__HIDDEN_BLOCK_TEXT_LEN = 285

export const VALID_FIELDS: ValidAuthFormFields[] = ['email', 'password']

export const LOGIN_MSG = 'Successfully logged in!'
export const REGISTER_MSG = 'Successfully signed up!'

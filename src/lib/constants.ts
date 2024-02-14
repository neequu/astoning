import type { ValidAuthFormFields } from '@/types/auth'

export const baseUrl = 'https://api.jikan.moe/v4'

export const maxTextLengthForHiddenBlock = 285

export const validationFields: ValidAuthFormFields[] = ['email', 'password']

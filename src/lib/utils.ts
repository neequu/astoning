import { type ClassValue, clsx } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import type { User } from '@supabase/supabase-js'
import type { NavigateFunction } from 'react-router-dom'
import { setUser } from '@/redux/slices/auth-slice'
import type { AppDispatch } from '@/redux'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformQuery(value: string) {
  return encodeURIComponent(value).toLowerCase()
}

export function capitalizeWord(word: string) {
  return `${word[0].toUpperCase()}${word.slice(1)}`
}

export function handleError(errorMsg = 'There was an error') {
  toast.error(errorMsg)
}

export function handleSuccess(errorMsg = 'Success!') {
  toast.success(errorMsg)
}

export function handleAuthSuccess(user: User, navigate: NavigateFunction, dispatch: AppDispatch, successMsg = 'Success!', redirectUrl = '/') {
  dispatch(setUser(user))
  navigate(redirectUrl)
  handleSuccess(successMsg)
}

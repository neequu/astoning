import { type ClassValue, clsx } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import type { NavigateFunction } from 'react-router-dom'
import type { User } from '@/types/db/db'
import { setUser } from '@/store/slices/auth-slice'
import type { AppDispatch } from '@/store'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function transformQuery(value: string): string {
  return encodeURIComponent(value).toLowerCase()
}

export function capitalizeWord(word: string): string {
  return `${word[0].toUpperCase()}${word.slice(1)}`
}

export function showNotificationError(errorMsg = 'There was an error'): void {
  toast.error(errorMsg)
}

export function showNotificationSuccess(errorMsg = 'Success!'): void {
  toast.success(errorMsg)
}

export function handleAuthSuccess(user: User, navigate: NavigateFunction, dispatch: AppDispatch, successMsg = 'Success!', redirectUrl = '/'): void {
  dispatch(setUser(user))
  navigate(redirectUrl)
  showNotificationSuccess(successMsg)
}

export function transformDateFromString(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function generateTimestampTz(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0')
  const timezoneOffset = `${getTimezoneOffset(now)}`

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}${timezoneOffset}`
}

export function getTimezoneOffset(date: Date): string {
  const offset = date.getTimezoneOffset()
  const sign = offset < 0 ? '+' : '-'
  const hours = String(Math.abs(Math.floor(offset / 60))).padStart(2, '0')
  const minutes = String(Math.abs(offset % 60)).padStart(2, '0')
  return `${sign}${hours}:${minutes}`
}

export function generateItemId(lastItemId: number): number {
  const newId = lastItemId + 1
  return newId
}

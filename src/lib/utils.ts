import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformQuery(value: string) {
  return encodeURIComponent(value).toLowerCase()
}

export function capitalizeWord(word: string) {
  return `${word[0].toUpperCase()}${word.slice(1)}`
}

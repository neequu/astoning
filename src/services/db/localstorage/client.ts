import { LS_KEYS } from '@/lib/constants'

function initializeLocalStorage(): void {
  // check if keys are present → set default values if not
  Object.keys(LS_KEYS).forEach((key) => {
    if (!localStorage.getItem(key))
      localStorage.setItem(key, JSON.stringify([]))
  })
}

export function verifyLocalStorageByKey(key: string): void {
  if (!localStorage.getItem(key))
    localStorage.setItem(key, JSON.stringify([]))
}

initializeLocalStorage()

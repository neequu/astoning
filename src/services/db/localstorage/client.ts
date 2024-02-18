import { LS_KEY } from '@/lib/constants'

// check if keys are present → set default values if not
function initializeLocalStorage(): void {
  Object.keys(LS_KEY).forEach((key) => {
    if (!localStorage.getItem(key))
      localStorage.setItem(key, JSON.stringify([]))
  })
}

export function verifyLocalStorageByKey(key: string, placeholder: unknown = []): void {
  if (!localStorage.getItem(key))
    localStorage.setItem(key, JSON.stringify(placeholder))
}

initializeLocalStorage()

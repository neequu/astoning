import { nn } from '@/services/console'
import { store } from '@/store'
import { showCommands } from '@/services/console/utils'

declare global {
  interface Window {
    nn: (cmd: string) => void
  }
}

export function initializeConsole() {
  if (!window.nn) {
    window.nn = nn(store.dispatch)
    showCommands()
  }
}

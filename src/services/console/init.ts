import { nn } from '@/services/console'
import { store } from '@/store'
import { showCommands } from '@/services/console/utils'

declare global {
  interface Window {
    nn: (cmd: string) => void
  }
}

export function initializeConsole(): void {
  if (!window.nn) {
    window.nn = nn(store.dispatch)
    showCommands()
    // eslint-disable-next-line no-console
    console.log('use commands with "nn(...)"')
  }
}

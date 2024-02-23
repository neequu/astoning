/* eslint-disable no-console */
import { availableCommands } from '@/services/console/commands'

export function showCommands(): void {
  console.table(availableCommands)
}
export function showError(): void {
  console.warn('😡😡😡😡😡')
  showCommands()
  console.warn('😡😡😡😡😡')
}

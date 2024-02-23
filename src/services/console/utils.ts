/* eslint-disable no-console */
import { availableCommands } from '@/services/console/commands'

export function showCommands() {
  console.table(availableCommands)
}
export function showError() {
  console.warn('😡😡😡😡😡')
  showCommands()
  console.warn('😡😡😡😡😡')
}

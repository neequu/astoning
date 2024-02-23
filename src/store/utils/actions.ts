import { createAction } from '@reduxjs/toolkit'

export const setConsoleCommand = createAction('console', (command: string, params: string[]) => ({ payload: { command, params } }))

import type { AppDispatch } from '@/store'
import { setConsoleCommand } from '@/store/utils/actionts'

export function nn(dispatch: AppDispatch): (cmd: string) => void {
  return (input: string) => {
    const [command, ...rest] = input.trim().split(' ')
    const params = rest.filter(p => p !== '')
    if (command)
      dispatch(setConsoleCommand(command, params))
  }
}

import type { AppDispatch } from '@/store'
import { setConsoleCommand } from '@/store/utils/actions'

export function nn(dispatch: AppDispatch) {
  return (input: string) => {
    const [command, ...rest] = input.trim().split(' ')
    const params = rest.filter(p => p !== '')
    if (command)
      dispatch(setConsoleCommand(command, params))
  }
}

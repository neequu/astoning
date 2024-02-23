import { createAction } from '@reduxjs/toolkit'
import type { AppDispatch } from '@/store'
import { consoleMiddleware } from '@/store/utils/middleware/console'
import { commands } from '@/services/console/commands'
import { getAnime, getAnimeById, searchAnime } from '@/services/console/methods/api'
import { login, register, signOut } from '@/services/console/methods/auth'
import { addFavorite, getFavorites, removeFavorite } from '@/services/console/methods/favorites'
import { addHistory, deleteAllHistory, deleteHistoryById, getHistory } from '@/services/console/methods/history'
import { showError } from '@/services/console/utils'

export const setConsoleCommand = createAction('console', (command, params) => ({ payload: { command, params } }))

export function nn(dispatch: AppDispatch) {
  return (input: string) => {
    const [command, ...rest] = input.trim().split(' ')
    const params = rest.filter(p => p !== '')
    if (command)
      dispatch(setConsoleCommand(command, params))
  }
}

consoleMiddleware.startListening({
  actionCreator: setConsoleCommand,
  effect: (action, listenerApi) => {
    const { command, params } = action.payload
    const dispatch = listenerApi.dispatch

    switch (command) {
      case commands['anime-get-all']:
        getAnime(params, dispatch)
        break
      case commands['anime-get-one']:
        searchAnime(params, dispatch)
        break
      case commands['anime-search']:
        getAnimeById(params, dispatch)
        break
      case commands.register:
        register(params)
        break
      case commands.login:
        login(params)
        break
      case commands.signout:
        signOut()
        break
      case commands['like-add']:
        addFavorite(params)
        break
      case commands['like-remove']:
        removeFavorite(params)
        break
      case commands['likes-get-all']:
        getFavorites()
        break
      case commands['history-get-all']:
        getHistory()
        break
      case commands['history-add']:
        addHistory(params)
        break
      case commands['history-remove-one']:
        deleteHistoryById(params)
        break
      case commands['history-remove-all']:
        deleteAllHistory()
        break
      default:
        showError()
    }
  },
})

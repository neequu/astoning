import { createListenerMiddleware } from '@reduxjs/toolkit'
import { commands } from '@/services/console/commands'
import { getAnime, getAnimeById, searchAnime } from '@/services/console/methods/api'
import { login, register, signOut } from '@/services/console/methods/auth'
import { addFavorite, getFavorites, removeFavorite } from '@/services/console/methods/favorites'
import { addHistory, deleteAllHistory, deleteHistoryById, getHistory } from '@/services/console/methods/history'
import { showError } from '@/services/console/utils'
import { setConsoleCommand } from '@/store/utils/actionts'
import type { AppDispatch, RootState } from '@/store'

export const consoleMiddleware = createListenerMiddleware()
export const startConsoleMiddleware = consoleMiddleware.startListening.withTypes<RootState, AppDispatch>()

startConsoleMiddleware({
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

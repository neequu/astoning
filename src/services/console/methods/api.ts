/* eslint-disable no-console */
import type { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { addHistory } from './history'
import { animeApi as api } from '@/store/api/anime-api'

export function getAnime(params: string[], dispatch: ThunkDispatch<unknown, unknown, UnknownAction>) {
  const page = +params[0] || 1
  dispatch(api.endpoints.getAnime.initiate(page))
    .unwrap()
    .then(res => console.table(res.data))
    .catch(e => console.warn(e))
}
export function getAnimeById(params: string[], dispatch: ThunkDispatch<unknown, unknown, UnknownAction>) {
  const id = +params[0]
  if (id) {
    dispatch(api.endpoints.getAnimeById.initiate(id))
      .unwrap()
      .then(res => console.table(res.data))
      .catch(e => console.warn(e.data.message))
  }
  else {
    console.warn('bad params')
  }
}
export function searchAnime(params: string[], dispatch: ThunkDispatch<unknown, unknown, UnknownAction>): void {
  const query = params.join(' ')
  if (query) {
    dispatch(api.endpoints.getAnimeSearch.initiate({ q: query }))
      .unwrap()
      .then(res => console.table(res.data))
      .then(() => addHistory(params))
  }
  else {
    console.warn('bad params')
  }
}

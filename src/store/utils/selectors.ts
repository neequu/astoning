import type { RootState } from '@/store'

export const selectUser = (state: RootState) => state.auth.user
export const selectSession = (state: RootState) => state.session
// for create selector
export const getVisits = (state: RootState) => state.visit.cards
export const getFilter = (state: RootState) => state.visit.filter

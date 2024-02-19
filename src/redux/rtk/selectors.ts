import type { RootState } from '@/redux'

export const selectUser = (state: RootState) => state.auth.user
export const selectSession = (state: RootState) => state.session

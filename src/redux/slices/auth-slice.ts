import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { UserOptional } from '@/types/auth'

interface AuthSlice {
  user: UserOptional
}

const initialState: AuthSlice = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserOptional>) {
      state.user = action.payload
    },

  },
})

export const { setUser } = authSlice.actions

export default authSlice.reducer

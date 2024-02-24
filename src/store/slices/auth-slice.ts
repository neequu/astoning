import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/types/auth'

interface AuthSlice {
  user: User | null
}

const initialState: AuthSlice = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userSet(state, action: PayloadAction<User | null>) {
      state.user = action.payload
    },
  },
})

export const { userSet } = authSlice.actions

export default authSlice.reducer

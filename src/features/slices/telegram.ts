import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { FeatureState } from '@/types/features'

const initialState: FeatureState = {
  isTelegramShareEnabled: false,
}

export const telegramSlice = createSlice({
  name: 'tg-feature',
  initialState,
  reducers: {
    setTelegramShareEnabled: (state, action: PayloadAction<boolean>) => {
      state.isTelegramShareEnabled = action.payload
    },
  },
})

export const { setTelegramShareEnabled } = telegramSlice.actions

export default telegramSlice.reducer

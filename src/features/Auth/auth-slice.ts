import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type InitialStateAuthType = {
  isLoggedIn: boolean
}

const initialState: InitialStateAuthType = {
  isLoggedIn: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStatusLogged(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
  },
})

export const { setStatusLogged } = authSlice.actions
export const authReducer = authSlice.reducer

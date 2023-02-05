import { createSlice } from '@reduxjs/toolkit'

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
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
    },
    register(state) {
      state.isLoggedIn = true
    },
  },
})

export const { login, register, logout } = authSlice.actions
export const authReducer = authSlice.reducer

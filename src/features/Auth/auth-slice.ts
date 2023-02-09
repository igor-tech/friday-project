import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppDispatch } from '../../App/store'
import { handleServerNetworkError } from '../../common/utils'
import { setData } from '../Profile/profile-slice'

import { authAPI, LoginType, RegisterType } from './auth-api'

export type InitialStateAuthType = {
  isLoggedIn: boolean
  isRegistered: boolean
}

const initialState: InitialStateAuthType = {
  isLoggedIn: false,
  isRegistered: false,
}

export const loginAT = createAsyncThunk('auth/login', async (data: LoginType, { dispatch }) => {
  try {
    const response = await authAPI.login(data)

    dispatch(setData(response.data))
    dispatch(setStatusLogged({ value: true }))
  } catch (e) {
    handleServerNetworkError(e, dispatch as AppDispatch)
  }
})

export const RegisterAT = createAsyncThunk(
  'auth/register',
  async (data: RegisterType, { dispatch }) => {
    try {
      const response = await authAPI.register(data)

      // dispatch(setStatusLogged({ value: true }))
      dispatch(setRegistered(true))
    } catch (e) {
      handleServerNetworkError(e, dispatch as AppDispatch)
    }
  }
)

export const LogoutAT = createAsyncThunk('auth/logout', async (thunkAPI, { dispatch }) => {
  try {
    const response = await authAPI.logout()

    // dispatch(setData({ UserData: res.data }))
    dispatch(setStatusLogged({ value: false }))
  } catch (e) {
    handleServerNetworkError(e, dispatch as AppDispatch)
  }
})

export const PingAT = createAsyncThunk('auth/ping', async (time: number, { dispatch }) => {
  try {
    const response = authAPI.ping(time)

    console.log(response)
  } catch (e) {
    handleServerNetworkError(e, dispatch as AppDispatch)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStatusLogged(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
    setRegistered: (state, action) => {
      state.isRegistered = action.payload
    },
  },
})

export const { setStatusLogged, setRegistered } = authSlice.actions
export const authReducer = authSlice.reducer

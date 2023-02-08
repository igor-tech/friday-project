import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { AppDispatch } from '../../App/store'
import { handleServerNetworkError } from '../../common/utils/error-utils'
import { setData } from '../Profile/profile-slice'

import { authAPI, LoginType, RegisterType } from './auth-api'

export type InitialStateAuthType = {
  isLoggedIn: boolean
}

const initialState: InitialStateAuthType = {
  isLoggedIn: false,
}

export const loginAT = createAsyncThunk('auth/login', async (data: LoginType, { dispatch }) => {
  try {
    const response = await authAPI.login(data)

    dispatch(setData(response.data))
    dispatch(setStatusLogged({ value: true }))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    console.log(err)
    handleServerNetworkError(err, dispatch as AppDispatch)
  }
})

export const RegisterAT = createAsyncThunk(
  'auth/register',
  async (data: RegisterType, { dispatch }) => {
    try {
      const response = await authAPI.register(data)

      dispatch(setStatusLogged({ value: true }))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      handleServerNetworkError(err, dispatch as AppDispatch)
    }
  }
)

export const LogoutAT = createAsyncThunk('auth/logout', async (thunkAPI, { dispatch }) => {
  try {
    const response = await authAPI.logout()

    // dispatch(setData({ UserData: res.data }))
    dispatch(setStatusLogged({ value: false }))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    handleServerNetworkError(err, dispatch as AppDispatch)
  }
})

export const PingAT = createAsyncThunk('auth/ping', async (time: number, { dispatch }) => {
  try {
    const response = authAPI.ping(time)

    console.log(response)
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    handleServerNetworkError(err, dispatch as AppDispatch)
  }
})

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

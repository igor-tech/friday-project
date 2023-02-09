import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppDispatch } from '../../App/store'
import { handleServerNetworkError } from '../../common/utils'
import { setData, UserType } from '../Profile/profile-slice'

import { authAPI, LoginType, RegisterType } from './auth-api'

import { setAppMessage, setAppStatus } from 'App/app-slice'

export type InitialStateAuthType = {
  isRegistered: boolean
  isLoggedIn: boolean
}

const initialState: InitialStateAuthType = {
  isLoggedIn: false,
  isRegistered: false,
}

export const loginAT = createAsyncThunk('auth/login', async (data: LoginType, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  try {
    const response = await authAPI.login(data)

    dispatch(setData(response.data))
    dispatch(setStatusLogged(true))
    dispatch(setAppStatus('success'))
    dispatch(setAppMessage('You are successfully Logged in'))
  } catch (e) {
    handleServerNetworkError(e, dispatch as AppDispatch)
  }
})

export const RegisterAT = createAsyncThunk(
  'auth/register',
  async (data: RegisterType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await authAPI.register(data)
      dispatch(setRegistered(true))
      dispatch(setAppStatus('success'))
      dispatch(setAppMessage('You are successfully Registered'))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)

export const LogoutAT = createAsyncThunk('auth/logout', async (thunkAPI, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  try {
    await authAPI.logout()

    dispatch(setData({} as UserType))
    dispatch(setStatusLogged(false))
    dispatch(setAppStatus('success'))
    dispatch(setAppMessage('Good Bye :)'))
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  }
})

export const PingAT = createAsyncThunk('auth/ping', async (time: number, { dispatch }) => {
  try {
    const response = authAPI.ping(time)

    console.log(response)
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRegistered: (state, action) => {
      state.isRegistered = action.payload
    },
    setStatusLogged(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    },
  },
})

export const { setRegistered, setStatusLogged } = authSlice.actions
export const authReducer = authSlice.reducer

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authAPI } from '../features/Auth/auth-api'
import { setStatusLogged } from '../features/Auth/auth-slice'
import { setData } from '../features/Profile/profile-slice'

type StatusType = 'idle' | 'loading' | 'failed' | 'success'

type InitialStateType = {
  status: StatusType
  message: null | string
  isInitialized: boolean
}

const initialState: InitialStateType = {
  status: 'idle',
  message: null,
  isInitialized: false,
}

export const getMeAuthTC = createAsyncThunk('app/getMeAuth', async (_, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  try {
    const { data } = await authAPI.me()

    dispatch(setStatusLogged(true))

    dispatch(setData(data))
    dispatch(setAppStatus('success'))
  } catch (e) {
    dispatch(setStatusLogged(false))
    dispatch(setAppStatus('failed'))
  } finally {
    dispatch(isInitialized(true))
  }
})

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppMessage(state, action: PayloadAction<null | string>) {
      state.message = action.payload
    },
    setAppStatus(state, action: PayloadAction<StatusType>) {
      state.status = action.payload
    },
    isInitialized: (state, action) => {
      state.isInitialized = action.payload
    },
  },
})

export const { setAppMessage, setAppStatus, isInitialized } = appSlice.actions
export const appReducer = appSlice.reducer

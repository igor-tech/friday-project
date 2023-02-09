import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { handleServerNetworkError } from '../common/utils'
import { profileAPI } from '../features/Profile/profile-api'
import { upDateNameAC } from '../features/Profile/profile-slice'

type StatusType = 'idle' | 'loading' | 'failed' | 'success'

type InitialStateType = {
  isLoggedIn: boolean
  status: StatusType
  message: null | string
}

const initialState: InitialStateType = {
  isLoggedIn: false,
  status: 'idle',
  message: null,
}

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
    setStatusLoggedAC(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    },
  },
})

export const { setAppMessage, setAppStatus, setStatusLoggedAC } = appSlice.actions
export const appReducer = appSlice.reducer

export const getMeAuthTC = createAsyncThunk('app/getMeAuth', async (_, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  try {
    const { data } = await profileAPI.me()

    dispatch(setStatusLoggedAC(true))
    dispatch(upDateNameAC(data))
    dispatch(setAppStatus('success'))
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  }
})

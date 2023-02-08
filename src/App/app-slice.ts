import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type StatusType = 'idle' | 'loading' | 'failed' | 'success'

type InitialStateType = {
  status: StatusType
  message: null | string
}

const initialState: InitialStateType = {
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
  },
})

export const { setAppMessage, setAppStatus } = appSlice.actions
export const appReducer = appSlice.reducer

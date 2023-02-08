import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type StatusType = 'idle' | 'loading' | 'failed' | 'success'

type InitialStateType = {
  status: StatusType
  Error: null | string
}

const initialState: InitialStateType = {
  status: 'idle',
  Error: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppError(state, action: PayloadAction<null | string>) {
      state.Error = action.payload
    },
    setAppStatus(state, action: PayloadAction<StatusType>) {
      state.status = action.payload
    },
  },
})

export const { setAppError, setAppStatus } = appSlice.actions
export const appReducer = appSlice.reducer

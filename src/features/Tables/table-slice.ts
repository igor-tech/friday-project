import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isInitialized: false,
}

const InitialStateAuthType = typeof initialState

export const authSlice = createSlice({
  name: 'table',
  initialState: InitialStateAuthType,
  reducers: {},
})

export const {} = authSlice.actions
export const tableReducer = authSlice.reducer

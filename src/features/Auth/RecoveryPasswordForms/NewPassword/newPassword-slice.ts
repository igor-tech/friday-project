import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AUTH_RESET, SetNewPasswordReqType } from '../../auth-api'

interface initialStateType {
  isSetNewPassword: boolean
}

const initialState: initialStateType = {
  isSetNewPassword: false,
}

export const setNewPassword = createAsyncThunk(
  'setNewPassword',
  async (request: SetNewPasswordReqType, { dispatch }) => {
    try {
      const { data } = await AUTH_RESET.setNewPassword(request)

      dispatch(isSetNewPassword(true))
    } catch (err: any) {
      dispatch(isSetNewPassword(false))
      console.log(err.message)
      console.log(err.response.data.error)
    }
  }
)

export const newPasswordSlice = createSlice({
  name: 'auth/newPassword',
  initialState,
  reducers: {
    isSetNewPassword: (state, action: PayloadAction<boolean>) => {
      state.isSetNewPassword = action.payload
    },
  },
})

export const setNewPasswordReducer = newPasswordSlice.reducer
export const { isSetNewPassword } = newPasswordSlice.actions

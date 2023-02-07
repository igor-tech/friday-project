import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AUTH_RESET } from '../../auth-api'

interface initialStateType {
  isSetNewPassword: boolean
}

const initialState: initialStateType = {
  isSetNewPassword: false,
}

export const setNewPassword = createAsyncThunk(
  'setNewPassword',
  async (request: any, { dispatch }) => {
    try {
      const {
        data: { info },
      } = await AUTH_RESET.setNewPassword(request)

      console.log(info)
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

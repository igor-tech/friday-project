import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppMessage, setAppStatus } from '../../../../App/app-slice'
import { handleServerNetworkError } from '../../../../common/utils'
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
    dispatch(setAppStatus('loading'))
    try {
      const { data } = await AUTH_RESET.setNewPassword(request)

      dispatch(setAppStatus('success'))
      dispatch(setAppMessage('New password successfully created'))
      dispatch(isSetNewPassword(true))
    } catch (err: any) {
      dispatch(isSetNewPassword(false))
      handleServerNetworkError(err, dispatch)
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

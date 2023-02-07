import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AUTH_RESET } from '../../auth-api'

interface initialStateType {
  email: string
  isRecovery: boolean
}

const initialState: initialStateType = {
  email: '',
  isRecovery: false,
}

const requestEmailMessage = `<div style="background-color: lime; padding: 15px">
     password recovery link:
    <a href='http://localhost:3000/#/set-new-password/$token$'>
   link</a>
     </div>`

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (email: string, { dispatch }) => {
    const request = {
      email,
      from: 'test-front-admin <yakovenko.sergey.work@gmail.com>',
      message: requestEmailMessage,
    }

    try {
      const { data } = await AUTH_RESET.forgotPassword(request)

      if (data.info.success) {
        dispatch(isRecoveryPassword(true))
      }

      return email
    } catch (err: any) {
      dispatch(isRecoveryPassword(false))
      console.log(err.message)
      console.log(err.response.data.error)
    }
  }
)

export const recoveryPasswordSlice = createSlice({
  name: 'auth/recoveryPassword',
  initialState,
  reducers: {
    isRecoveryPassword: (state, action: PayloadAction<boolean>) => {
      state.isRecovery = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.email = action.payload!
    })
  },
})

export const recoveryPasswordReducer = recoveryPasswordSlice.reducer
export const { isRecoveryPassword } = recoveryPasswordSlice.actions

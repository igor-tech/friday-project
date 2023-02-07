import { AnyAction, configureStore } from '@reduxjs/toolkit'
import { ThunkDispatch } from 'redux-thunk'

import { setNewPasswordReducer } from '../features/Auth/RecoveryPasswordForms/NewPassword/newPassword-slice'
import { recoveryPasswordReducer } from '../features/Auth/RecoveryPasswordForms/RecoveryPassword/recovery-password-slice'

export const store = configureStore({
  reducer: {
    recoveryPassword: recoveryPasswordReducer,
    setNewPassword: setNewPasswordReducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>

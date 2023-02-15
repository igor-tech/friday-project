import { AnyAction, configureStore } from '@reduxjs/toolkit'
import { ThunkDispatch } from 'redux-thunk'

import { authReducer } from '../features/Auth/auth-slice'
import { setNewPasswordReducer } from '../features/Auth/RecoveryPasswordForms/NewPassword/newPassword-slice'
import { recoveryPasswordReducer } from '../features/Auth/RecoveryPasswordForms/RecoveryPassword/recovery-password-slice'
import { profileReducer } from '../features/Profile/profile-slice'
import { CardsReducer } from '../features/Tables/Table-cards/cards-slice'
import { packsReducer } from '../features/Tables/table-slice'

import { appReducer } from './app-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recoveryPassword: recoveryPasswordReducer,
    setNewPassword: setNewPasswordReducer,
    profile: profileReducer,
    app: appReducer,
    packs: packsReducer,
    cards: CardsReducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>

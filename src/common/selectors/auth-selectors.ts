import { RootState } from '../../App/store'

export const isLoggedInSelector = (state: RootState) => state.auth.isLoggedIn
export const isRegisteredSelector = (state: RootState) => state.auth.isRegistered

export const isSetNewPasswordSelector = (state: RootState) => state.setNewPassword.isSetNewPassword
export const isRecoverySelector = (state: RootState) => state.recoveryPassword.isRecovery
export const emailSelector = (state: RootState) => state.recoveryPassword.email

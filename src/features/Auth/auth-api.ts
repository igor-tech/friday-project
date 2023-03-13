import { instance, instanceHeroku } from 'common'

export const authAPI = {
  login(data: LoginType) {
    return instance.post<ResponseLoginType>(`/auth/login`, data)
  },
  logout() {
    return instance.delete<ResponseLogoutType>('/auth/me')
  },
  register(data: RegisterType) {
    instanceHeroku.post<ResponseRegisterType>(`/auth/register`, data)
  },
  me() {
    return instance.post<ResponseLoginType>(`auth/me`, {})
  },
}

export const AUTH_RESET = {
  forgotPassword(data: ForgotPasswordReqType) {
    return instanceHeroku.post<ForgotPasswordResType>('/auth/forgot', data)
  },
  setNewPassword(data: SetNewPasswordReqType) {
    return instanceHeroku.post<SetNewPasswordResType>('/auth/set-new-password', data)
  },
}

export type LoginType = RegisterType & {
  rememberMe: boolean
}
export type RegisterType = {
  email: string
  password: string
}
export type ResponseLoginType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
}
export type ResponseLogoutType = {
  info: 'logOut success —ฅ/ᐠ.̫ .ᐟฅ—'
  error: string
}
export type ResponseRegisterType = {
  addedUser: {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
  }
  error?: string
}

interface ForgotPasswordReqType {
  email: string
  from: string
  message: string
}

interface ForgotPasswordResType {
  success: boolean
  error?: string
  info: string
}

interface SetNewPasswordResType {
  info: string
  error: string
}

export interface SetNewPasswordReqType {
  password: string
  resetPasswordToken: string
}

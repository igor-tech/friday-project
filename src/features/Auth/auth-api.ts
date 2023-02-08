import { instance } from '../../common'
import { instance1 } from '../../common/constants/instance'

export const authAPI = {
  login: (data: LoginType) => instance.post<ResponseLoginType>(`/auth/login`, data),
  logout: () => instance.delete<ResponseLogoutType>('/auth/me'),
  register: (data: RegisterType) => instance1.post<ResponseRegisterType>(`/auth/register`, data),
  ping: (time: number) => instance.get<ResponsePingType>(`ping?frontTime=${time}`),
}

//types
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
  publicCardPacksCount: number // количество колод
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean
  error?: string
}
export type ResponseLogoutType = {
  info: 'logOut success —ฅ/ᐠ.̫ .ᐟฅ—'
  error: string
}
export type ResponseRegisterType = {
  addedUser: {
    // не важные данные, просто для проверки
    // чтобы посмотреть как выглядит созданный юзер
  }
  error?: string
}

export type ResponsePingType = {
  ping: number
  // миллисекунд идёт запрос на бэк
  backTime: number
  // время на сервере
  frontTime: number
  // присланное время фронта
  info: string
}

interface ForgotPasswordReqType {
  email: string
  from: string
  message: string
}

interface ForgotPasswordResType {
  data: {
    success: boolean
  }
  error?: string
}

interface SetNewPasswordResType {
  info: string
  error: string
}

export interface SetNewPasswordReqType {
  password: string
  resetPasswordToken: string
}

export const AUTH_RESET = {
  forgotPassword(request: ForgotPasswordReqType) {
    return instance.post('/auth/forgot', request)
  },
  setNewPassword(request: SetNewPasswordReqType) {
    return instance.post<SetNewPasswordResType>('/auth/set-new-password', request)
  },
}

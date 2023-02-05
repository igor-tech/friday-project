import { instance } from '../../common/constants/instance'

export const authAPI = {
  login: (data: LoginType) => instance.post<ResponseLoginType>(`/auth/login`, { data }),
  logout: () => instance.delete<ResponseLogoutType>('/auth/me'),
  register: (data: RegisterType) => instance.post<ResponseRegisterType>(`/auth/register`, { data }),
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

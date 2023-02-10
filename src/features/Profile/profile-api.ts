import { instance } from '../../common'

export const profileAPI = {
  updateUserInfo: (updatedUserData: updatedUserDataType) => {
    return instance.put(`auth/me`, updatedUserData)
  },
}

export type updatedUserDataType = {
  name?: string
  avatar?: string | null | undefined
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

import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const AuthAPI = {
  updateUserInfo(updatedUserData: updatedUserDataType) {
    return instance.put(`auth/me`, { ...updatedUserData })
  },
}

export type updatedUserDataType = {
  name?: string
  avatar?: string | null | undefined
}
export const profileAPI = {}

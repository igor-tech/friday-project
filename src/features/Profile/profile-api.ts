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

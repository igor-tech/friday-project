import { RootState } from '../../App/store'

export const userEmailSelector = (state: RootState) => state.profile.user.email
export const userNameSelector = (state: RootState) => state.profile.user.name
export const userAvatarSelector = (state: RootState) => state.profile.user.avatar

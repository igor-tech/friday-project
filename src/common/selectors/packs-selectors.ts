import { RootState } from '../../App/store'

export const cardPacksSelector = (state: RootState) => state.packs.cardPacks
export const userIdSelector = (state: RootState) => state.profile.user._id

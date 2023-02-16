import { RootState } from '../../App/store'

export const cardPacksSelector = (state: RootState) => state.packs.cardPacks
export const CardsSelector = (state: RootState) => state.cards.cards
export const packsUserIdSelector = (state: RootState) => state.packs.packsQueryParams.user_id

import { RootState } from '../../App/store'

export const cardPacksSelector = (state: RootState) => state.packs.cardPacks
export const CardsSelector = (state: RootState) => state.cards.cards
export const packsUserIdSelector = (state: RootState) => state.packs.packsQueryParams.user_id
export const packsQueryParamsSelector = (state: RootState) => state.packs.packsQueryParams
export const pageSelector = (state: RootState) => state.packs.packsQueryParams.page
export const pageCountSelector = (state: RootState) => state.packs.packsQueryParams.pageCount
export const cardPacksTotalCountSelector = (state: RootState) => state.packs.cardPacksTotalCount
export const isPacksLoadingSelector = (state: RootState) => state.packs.isPacksLoading

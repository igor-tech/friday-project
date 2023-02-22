import { RootState } from '../../App/store'

export const cardPacksSelector = (state: RootState) => state.packs.cardPacks
export const CardsSelector = (state: RootState) => state.cards.cards
export const cardPacksTotalCountSelector = (state: RootState) => state.packs.cardPacksTotalCount
export const isPacksLoadingSelector = (state: RootState) => state.packs.isPacksLoading
export const minCardsCountSelector = (state: RootState) => state.packs.minCardsCount
export const maxCardsCountSelector = (state: RootState) => state.packs.maxCardsCount

export const packsUserIdSelector = (state: RootState) => state.packs.packsQueryParams.user_id
export const packsQueryParamsSelector = (state: RootState) => state.packs.packsQueryParams
export const pageSelector = (state: RootState) => state.packs.packsQueryParams.page
export const pageCountSelector = (state: RootState) => state.packs.packsQueryParams.pageCount
export const packNameSelector = (state: RootState) => state.packs.packsQueryParams.packName
export const isFilterResetSelector = (state: RootState) => state.packs.isFilterReset

//modal
export const packNameSettingSelector = (state: RootState) => state.packs.packsSettingModal.packName
export const privateStatusSettingSelector = (state: RootState) =>
  state.packs.packsSettingModal.privateStatus
export const idPackSettingSelector = (state: RootState) => state.packs.packsSettingModal.packId

import { RootState } from '../../App/store'

export const cardQuestionSelector = (state: RootState) => state.cards.cardsQueryParams.cardQuestion
export const sortCardsSelector = (state: RootState) => state.cards.cardsQueryParams.sortCards
export const pageCardSelector = (state: RootState) => state.cards.cardsQueryParams.page
export const pageCountCardSelector = (state: RootState) => state.cards.cardsQueryParams.pageCount
export const packIdSelector = (state: RootState) => state.cards.cardsQueryParams.cardsPack_id

export const cardsSelectors = (state: RootState) => state.cards.cards
export const myPackUserIdSelector = (state: RootState) => state.cards.packUserId
export const packNameCardSelector = (state: RootState) => state.cards.packName
export const cardsTotalCountSelector = (state: RootState) => state.cards.cardsTotalCount
export const privateStatusSelector = (state: RootState) => state.cards.packPrivate
export const emptyCardSelector = (state: RootState) => state.cards.emptyCard
export const emptySearchCardSelector = (state: RootState) => state.cards.emptySearchCard

export const isCardLoadingSelector = (state: RootState) => state.cards.isCardLoading

export const questionSettingSelector = (state: RootState) => state.cards.cardsSettingModal.question
export const cardIdSettingSelector = (state: RootState) => state.cards.cardsSettingModal.cardId
export const answerSettingSelector = (state: RootState) => state.cards.cardsSettingModal.answer

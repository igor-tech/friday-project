import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../../App/store'
import { handleServerNetworkError } from '../../../common'
import {
  Cards,
  RequestCreateCard,
  RequestDeleteCard,
  RequestUpdateCard,
  RequestUpdatePack,
  ResponseGetCard,
  tableAPI,
} from '../table-api'

const initialState = {
  cards: [] as Cards[],
  packUserId: '',
  packName: '',
  packPrivate: false,
  cardsTotalCount: 2,
  minGrade: 0,
  maxGrade: 5,
  cardsQueryParams: {
    cardsPack_id: '',
    cardQuestion: '',
    sortCards: '0question',
    page: 1,
    pageCount: 7,
  },
  isCardLoading: false,
}

export const getCards = createAsyncThunk('get/cards', async (_, { dispatch, getState }) => {
  const { cardsPack_id, cardQuestion, sortCards, page, pageCount } = (getState() as RootState).cards
    .cardsQueryParams

  const queryParams = {
    cardsPack_id,
    cardQuestion,
    sortCards,
    page,
    pageCount,
  }

  dispatch(setLoadingCard(false))
  try {
    const { data } = await tableAPI.getCards(queryParams)

    dispatch(setDataCard(data))
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  } finally {
    dispatch(setLoadingCard(true))
  }
})

export const createNewCard = createAsyncThunk(
  'card/newCard',
  async (dataParam: RequestCreateCard, { dispatch, getState }) => {
    const { cardsPack_id } = (getState() as RootState).cards.cardsQueryParams
    const queryParams = {
      cardsPack_id,
      ...dataParam,
    }

    try {
      await tableAPI.createCard(queryParams)
      dispatch(getCards())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)

export const deleteCard = createAsyncThunk(
  'card/delete',
  async (cardId: RequestDeleteCard, { dispatch }) => {
    try {
      await tableAPI.deleteCard(cardId)
      dispatch(getCards())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)
export const updateCard = createAsyncThunk(
  'card/update',
  async (updateData: RequestUpdateCard, { dispatch }) => {
    try {
      await tableAPI.updateCard(updateData)
      dispatch(getCards())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)

export const updateCardPack = createAsyncThunk(
  'card/updateCardPack',
  async (updateData: RequestUpdatePack, { dispatch }) => {
    try {
      await tableAPI.updatePack(updateData)
      dispatch(getCards())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)
export const deleteCardPack = createAsyncThunk(
  'card/deleteCardPack',
  async (packId: string, { dispatch }) => {
    try {
      await tableAPI.deletePack(packId)
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)

type initialStateType = typeof initialState
export const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialState as initialStateType,
  reducers: {
    setDataCard: (state, action: PayloadAction<ResponseGetCard>) => {
      state.cards = action.payload.cards
      state.cardsTotalCount = action.payload.cardsTotalCount
      state.packName = action.payload.packName
      state.packUserId = action.payload.packUserId
      state.minGrade = action.payload.minGrade
      state.maxGrade = action.payload.maxGrade
    },
    setPacksCardId: (state, action) => {
      state.cardsQueryParams.cardsPack_id = action.payload
    },
    setSortCards: (state, action: PayloadAction<string>) => {
      state.cardsQueryParams.sortCards = action.payload
    },
    setLoadingCard: (state, action) => {
      state.isCardLoading = action.payload
    },
  },
})

export const { setPacksCardId, setDataCard, setSortCards, setLoadingCard } = cardsSlice.actions
export const CardsReducer = cardsSlice.reducer

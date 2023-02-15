import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../../App/store'
import { handleServerNetworkError } from '../../../common'
import {
  Cards,
  RequestCreateCard,
  RequestDeleteCard,
  RequestUpdateCard,
  ResponseGetCard,
  tableAPI,
} from '../table-api'

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

  try {
    const { data } = await tableAPI.getCards(queryParams)

    dispatch(setDataCard(data))
  } catch (e) {
    handleServerNetworkError(e, dispatch)
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
}

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
  },
})

export const { setPacksCardId, setDataCard, setSortCards } = cardsSlice.actions
export const CardsReducer = cardsSlice.reducer

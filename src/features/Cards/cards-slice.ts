import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../App/app-slice'
import { RootState } from '../../App/store'
import {
  Cards,
  RequestCreateCard,
  RequestDeleteCard,
  RequestUpdateCard,
  RequestUpdateGrade,
  RequestUpdatePack,
  ResponseGetCard,
  tableAPI,
} from '../Packs/table-api'

import { handleServerNetworkError } from 'common'

const initialState = {
  cards: [] as Cards[],
  packUserId: '',
  packName: '',
  packPrivate: false,
  cardsTotalCount: 2,
  minGrade: 0,
  maxGrade: 5,
  emptyCard: false,
  emptySearchCard: false,
  cardsQueryParams: {
    cardsPack_id: '',
    cardQuestion: '',
    sortCards: '0question',
    page: 1,
    pageCount: 7,
  },
  cardsSettingModal: {
    cardId: '',
    question: '',
    answer: '',
    answerImg: '',
    questionImg: '',
  },
  isCardLoading: false,
}

export const getCards = createAsyncThunk('get/cards', async (_, { dispatch, getState }) => {
  const queryParams = (getState() as RootState).cards.cardsQueryParams

  dispatch(setAppStatus('loading'))
  try {
    const { data } = await tableAPI.getCards(queryParams)

    if (data.cards.length === 0) {
      if (queryParams.cardQuestion === '') {
        dispatch(setEmptyCard(true))
      } else {
        dispatch(setEmptySearchCard(true))
      }
    } else {
      dispatch(setEmptyCard(false))
      dispatch(setEmptySearchCard(false))
    }

    dispatch(setDataCard(data))
    dispatch(setAppStatus('success'))
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

    dispatch(setAppStatus('loading'))
    try {
      await tableAPI.createCard(queryParams)
      dispatch(setAppStatus('success'))
      dispatch(getCards())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)

export const deleteCard = createAsyncThunk(
  'card/delete',
  async (cardId: RequestDeleteCard, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await tableAPI.deleteCard(cardId)
      dispatch(setAppStatus('success'))
      dispatch(getCards())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)
export const updateGrade = createAsyncThunk(
  'grade/update',
  async (data: RequestUpdateGrade, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await tableAPI.updateGrade(data)
      dispatch(setAppStatus('success'))
      dispatch(getCards())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)

export const updateCard = createAsyncThunk(
  'card/update',
  async (updateData: RequestUpdateCard, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    console.log(updateData)
    try {
      await tableAPI.updateCard(updateData)
      dispatch(setAppStatus('success'))
      dispatch(getCards())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)

export const updateCardPack = createAsyncThunk(
  'card/updateCardPack',
  async (updateData: RequestUpdatePack, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await tableAPI.updatePack(updateData)
      dispatch(setAppStatus('success'))
      dispatch(getCards())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)
export const deleteCardPack = createAsyncThunk(
  'card/deleteCardPack',
  async (packId: string, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await tableAPI.deletePack(packId)
      dispatch(setAppStatus('success'))
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
      state.packPrivate = action.payload.packPrivate
    },
    setEmptyCard: (state, action) => {
      state.emptyCard = action.payload
    },
    setEmptySearchCard: (state, action) => {
      state.emptySearchCard = action.payload
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
    setCardQuestion: (state, action: PayloadAction<string>) => {
      state.cardsQueryParams.cardQuestion = action.payload
    },
    setBetweenQuestion: (state, action: PayloadAction<{ page: number; pageCount: number }>) => {
      state.cardsQueryParams.page = action.payload.page
      state.cardsQueryParams.pageCount = action.payload.pageCount
    },
    setSettingEditCardModal: (
      state,
      action: PayloadAction<{
        cardId: string
        answer: string
        question: string
        answerImg: string
        questionImg: string
      }>
    ) => {
      state.cardsSettingModal.cardId = action.payload.cardId
      state.cardsSettingModal.answer = action.payload.answer
      state.cardsSettingModal.question = action.payload.question
      state.cardsSettingModal.questionImg = action.payload.questionImg
      state.cardsSettingModal.answerImg = action.payload.answerImg
    },
    setSettingDeleteCardModal: (
      state,
      action: PayloadAction<{ cardId: string; question: string }>
    ) => {
      state.cardsSettingModal.cardId = action.payload.cardId
      state.cardsSettingModal.question = action.payload.question
    },
  },
})

export const {
  setPacksCardId,
  setDataCard,
  setSortCards,
  setLoadingCard,
  setCardQuestion,
  setBetweenQuestion,
  setSettingEditCardModal,
  setSettingDeleteCardModal,
  setEmptyCard,
  setEmptySearchCard,
} = cardsSlice.actions
export const CardsReducer = cardsSlice.reducer

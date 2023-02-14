import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../App/app-slice'
import { handleServerNetworkError } from '../../common'

import { CardsPack, RequestGetParamsPack, ResponseGetPacks, tableAPI } from './table-api'

export const getPacks = createAsyncThunk(
  'packs/getPacks',
  async (data: RequestGetParamsPack, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const res = await tableAPI.getPack(data)

      dispatch(setDataPack(res.data))
      dispatch(setAppStatus('success'))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)

const initialState = {
  cardPacks: [] as CardsPack[],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 0,
  pageCount: 0,
}

type InitialStateType = typeof initialState

export const packsSlice = createSlice({
  name: 'packs',
  initialState: initialState as InitialStateType,
  reducers: {
    setDataPack: (state: InitialStateType, action: PayloadAction<ResponseGetPacks>) => {
      state.cardPacks = action.payload.cardPacks
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount
      state.maxCardsCount = action.payload.maxCardsCount
      state.minCardsCount = action.payload.minCardsCount
      state.page = action.payload.page
      state.pageCount = action.payload.pageCount
    },
  },
})

export const { setDataPack } = packsSlice.actions
export const packsReducer = packsSlice.reducer

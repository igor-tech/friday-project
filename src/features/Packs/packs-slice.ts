import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppMessage, setAppStatus } from '../../App/app-slice'
import { RootState } from '../../App/store'

import {
  CardsPack,
  RequestCreatePack,
  RequestUpdatePack,
  ResponseGetPacks,
  tableAPI,
} from './table-api'

import { handleServerNetworkError } from 'common'

export const getPacks = createAsyncThunk('packs/getPacks', async (_, { dispatch, getState }) => {
  const { pageCount, page, packName, sortPacks, max, min, user_id } = (getState() as RootState)
    .packs.packsQueryParams

  const queryParams = {
    pageCount,
    page,
    packName,
    sortPacks,
    max,
    min,
    user_id,
  }

  dispatch(setAppStatus('loading'))
  try {
    const { data } = await tableAPI.getPack(queryParams)

    dispatch(setDataPack(data))
    dispatch(setAppStatus('success'))
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  } finally {
    dispatch(setIsPacksLoading(true))
  }
})

export const createNewPack = createAsyncThunk(
  'create/newPack',
  async (dataParams: RequestCreatePack, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await tableAPI.createPack(dataParams)
      dispatch(setAppStatus('success'))
      dispatch(setAppMessage('Pack added successfully'))
      dispatch(getPacks())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)
export const deletePack = createAsyncThunk('delete/pack', async (idPack: string, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  try {
    await tableAPI.deletePack(idPack)
    dispatch(setAppMessage('Pack delete successfully'))
    dispatch(setAppStatus('success'))
    dispatch(getPacks())
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  }
})
export const updatePack = createAsyncThunk(
  'update/pack',
  async (updateData: RequestUpdatePack, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await tableAPI.updatePack(updateData)
      dispatch(setAppStatus('success'))
      dispatch(setAppMessage('PackName change successfully'))
      dispatch(getPacks())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)

const initialState = {
  cardPacks: [] as CardsPack[],
  cardPacksTotalCount: 0,
  maxCardsCount: 50,
  minCardsCount: 0,
  packsQueryParams: {
    packName: '',
    sortPacks: '0updated',
    min: 0,
    max: 0,
    page: 1,
    pageCount: 4,
    user_id: '',
  },
  isPacksLoading: false,
  isFilterReset: false,
}

type InitialStatePacksType = typeof initialState

export const packsSlice = createSlice({
  name: 'packs',
  initialState: initialState as InitialStatePacksType,
  reducers: {
    setDataPack: (state, action: PayloadAction<ResponseGetPacks>) => {
      state.cardPacks = action.payload.cardPacks
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount
      state.maxCardsCount = action.payload.maxCardsCount
      state.minCardsCount = action.payload.minCardsCount
      state.packsQueryParams.page = action.payload.page
      state.packsQueryParams.pageCount = action.payload.pageCount
    },
    setSortPacks: (state, action: PayloadAction<string>) => {
      state.packsQueryParams.sortPacks = action.payload
    },
    setValueFilter: (state, action: PayloadAction<{ userId: string }>) => {
      state.packsQueryParams.user_id = action.payload.userId
      state.packsQueryParams.min = 0
      state.packsQueryParams.max = 0
    },
    setBetweenValueFilter: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.packsQueryParams.max = action.payload.max
      state.packsQueryParams.min = action.payload.min
    },
    setSearchValueFilter: (state, action: PayloadAction<{ packName: string }>) => {
      state.packsQueryParams.packName = action.payload.packName
    },
    setPaginationValue: (state, action: PayloadAction<{ page: number; pageCount: number }>) => {
      state.packsQueryParams.page = action.payload.page
      state.packsQueryParams.pageCount = action.payload.pageCount
    },
    remove: (state, action: PayloadAction<any>) => {
      state.packsQueryParams = action.payload
    },
    setIsPacksLoading: (state, action) => {
      state.isPacksLoading = action.payload
    },
    // setQueryParam: (state, action) => {
    //   state.packsQueryParams.min = action.payload.minCardsCount
    //   state.packsQueryParams.max = action.payload.maxCardsCount
    //   state.packsQueryParams.user_id = action.payload.user_id
    //   state.packsQueryParams.pageCount = action.payload.pageCount
    //   state.packsQueryParams.page = action.payload.page
    // },
    setResetFilter: (state, action: PayloadAction<boolean>) => {
      state.isFilterReset = action.payload
    },
  },
})

export const {
  setDataPack,
  setSortPacks,
  setValueFilter,
  setBetweenValueFilter,
  setSearchValueFilter,
  setPaginationValue,
  remove,
  setIsPacksLoading,
  setResetFilter,
} = packsSlice.actions
export const packsReducer = packsSlice.reducer

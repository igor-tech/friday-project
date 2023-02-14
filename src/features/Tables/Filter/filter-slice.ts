import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppMessage, setAppStatus } from '../../../App/app-slice'
import { handleServerNetworkError } from '../../../common'
import { CardsPack, RequestGetParamsPack, tableAPI } from '../table-api'
import { setDataPack } from '../table-slice'

interface initialStateType {
  filter: string
}

const initialState: initialStateType = {
  filter: 'all',
}

export const setMyFilterAC = createAsyncThunk(
  'filter/setMyFilter',
  async (params: RequestGetParamsPack, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const myFilterPack = await tableAPI.getPack(params)

      dispatch(changeFilter('my'))
      dispatch(setDataPack(myFilterPack.data))
      dispatch(setAppStatus('success'))
      dispatch(setAppMessage('List cards updated'))
    } catch (err) {
      handleServerNetworkError(err, dispatch)
    }
  }
)

export const setAllFilterAC = createAsyncThunk(
  'filter/setAllFilter',
  async (params: RequestGetParamsPack, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const allPack = await tableAPI.getPack({})

      dispatch(setDataPack(allPack.data))
      dispatch(changeFilter('all'))
      dispatch(setAppStatus('success'))
      dispatch(setAppMessage('List cards updated'))
    } catch (err) {
      handleServerNetworkError(err, dispatch)
    }
  }
)

export const getBetweenFilterAC = createAsyncThunk(
  'filter/setBetweenFilterAC',
  async (params: RequestGetParamsPack, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const betweenPack = await tableAPI.getPack(params)

      dispatch(setDataPack(betweenPack.data))
      dispatch(setAppStatus('success'))
      dispatch(setAppMessage('List cards updated'))
    } catch (err) {
      handleServerNetworkError(err, dispatch)
    }
  }
)

export const getNameFilterAC = createAsyncThunk(
  'filter/setBetweenFilterAC',
  async (params: RequestGetParamsPack, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const namePack = await tableAPI.getPack(params)

      dispatch(setDataPack(namePack.data))
      dispatch(setAppStatus('success'))
      dispatch(setAppMessage('List cards updated'))
    } catch (err) {
      handleServerNetworkError(err, dispatch)
    }
  }
)

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setMyPack: (state, action: PayloadAction<CardsPack[]>) => {},
    changeFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload
    },
  },
})

export const filterReducer = filterSlice.reducer
export const { changeFilter } = filterSlice.actions

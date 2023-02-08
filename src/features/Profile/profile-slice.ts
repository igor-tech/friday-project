import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../App/root-reducer'
import { authAPI } from '../Auth/auth-api'
import { setStatusLogged } from '../Auth/auth-slice'

import { profileAPI } from './profile-api'

export type InitialStateAuthType = {
  isInitialized: boolean
  userId: string
  user: UserType
}

export const getMeAuthTC = createAsyncThunk(
  'profile/getMeAuth',
  // вопрос по типизации getMeAuth({}) и диспача внутри, если убрать request: {}
  async (_, { dispatch }) => {
    try {
      dispatch(setAppStatus('loading'))
      const { data } = await profileAPI.me()

      // dispatch(setInitializedAC(true)) // чиспачу в profile-slice пока не выбрали где будет
      dispatch(setStatusLogged({ value: true })) // чиспачу в auth-slice пока не выбрали где будет

      dispatch(upDateNameAC(data))
      dispatch(setAppStatus('success'))
    } catch (err: any) {
      console.log(err.message)
      console.log(err.response.data.error)
      dispatch(setAppStatus('failed'))
    } finally {
      dispatch(setInitializedAC(true))
    }
  }
)

export const upDateNameTC = createAsyncThunk(
  'profile/setNewName',
  async (newName: string, { dispatch }) => {
    try {
      const { data } = await profileAPI.updateUserInfo({
        name: newName,
        avatar: 'https//avatar-url.img',
      })

      dispatch(upDateNameAC(data.updatedUser))
    } catch (err: any) {
      console.log(err.message)
      console.log(err.response.data.error)
    }
  }
)

export const logOutAccountTC = createAsyncThunk('profile/setNewName', async (_, { dispatch }) => {
  try {
    await authAPI.logout()

    dispatch(logOutAccountAC(_))
    dispatch(setStatusLogged({ value: false })) // чиспачу в auth-slice пока не выбрали где будет
    dispatch(setInitializedAC(false)) // чиспачу в profile-slice пока не выбрали где будет
  } catch (err: any) {
    console.log(err.message)
    console.log(err.response.data.error)
  }
})

const initialState: InitialStateAuthType = {
  isInitialized: false,
  userId: '',
  user: {} as UserType,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    upDateNameAC: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
    setInitializedAC: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload
    },
    logOutAccountAC: state => {
      state.user = {} as UserType
      state.isInitialized = false
    },
    setData(state, action: PayloadAction<UserType>) {
      state.user = action.payload
    },
  },
})

export const { upDateNameAC, setInitializedAC, logOutAccountAC, setData } = profileSlice.actions
export const profileReducer = profileSlice.reducer

export type UserType = {
  _id: string
  email: string
  name: string
  avatar?: string | null
  publicCardPacksCount: number
  created: any
  updated: any
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string | null
}

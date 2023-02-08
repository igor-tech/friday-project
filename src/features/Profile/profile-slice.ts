import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { profileAPI, ResponseLoginType } from './profile-api'

export type InitialStateAuthType = {
  isLoggedIn: boolean
  userId: string
  user: UserType
}

export const getMeAuthTC = createAsyncThunk(
  'profile/getMeAuth',
  // вопрос по типизации getMeAuth({}) и диспача внутри, если убрать request: {}
  async (request: {}, { dispatch }) => {
    try {
      const { data } = await profileAPI.me()

      // все ок, диспачим в setStatusLogged значение тру, залогинены.
      dispatch(setStatusLoggedAC(true))
    } catch (err: any) {
      console.log(err.message)
      console.log(err.response.data.error)
    }
  }
)

export const upDateNameTC = createAsyncThunk(
  'profile/setNewName',
  async (newName: string, { dispatch }) => {
    try {
      const { data } = await profileAPI.updateUserInfo({ name: newName })

      dispatch(upDateNameAC(data))
    } catch (err: any) {
      console.log(err.message)
      console.log(err.response.data.error)
    }
  }
)

const initialState: InitialStateAuthType = {
  isLoggedIn: false,
  userId: '',
  user: {
    _id: '',
    email: 'Default@gmail.com',
    name: 'Default Name',
    avatar: null,
    publicCardPacksCount: 0, // количество колод
    created: Date,
    updated: Date,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
    error: null,
  },
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    upDateNameAC: (state, action: PayloadAction<{ user: UserType }>) => {
      state.user = action.payload.user
    },
    setStatusLoggedAC: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const { upDateNameAC, setStatusLoggedAC } = profileSlice.actions
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

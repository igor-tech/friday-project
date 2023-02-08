import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authAPI } from '../Auth/auth-api'
import { setStatusLogged } from '../Auth/auth-slice'

import { profileAPI, ResponseLoginType } from './profile-api'

export type InitialStateAuthType = {
  isLoggedIn: boolean
  userId: string
  user: UserType
}

export const getMeAuthTC = createAsyncThunk(
  'profile/getMeAuth',
  // вопрос по типизации getMeAuth({}) и диспача внутри, если убрать request: {}
  async (_, { dispatch }) => {
    try {
      const { data } = await profileAPI.me()

      dispatch(setStatusLogged({ value: true })) // чиспачу в auth-slice пока не выбрали где будет
      dispatch(setStatusLoggedAC(true)) // чиспачу в profile-slice пока не выбрали где будет

      dispatch(upDateNameAC(data))
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
    const { data } = await authAPI.logout()

    dispatch(logOutAccountAC(_))
    dispatch(setStatusLogged({ value: false })) // чиспачу в auth-slice пока не выбрали где будет
    dispatch(setStatusLoggedAC(false)) // чиспачу в profile-slice пока не выбрали где будет
  } catch (err: any) {
    console.log(err.message)
    console.log(err.response.data.error)
  }
})

const initialState: InitialStateAuthType = {
  isLoggedIn: false,
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
    setStatusLoggedAC: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    logOutAccountAC: (state, action) => {
      state.user = {} as UserType
      state.isLoggedIn = false
    },
  },
})

export const { upDateNameAC, setStatusLoggedAC, logOutAccountAC } = profileSlice.actions
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

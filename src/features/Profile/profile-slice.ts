import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus, setStatusLoggedAC } from '../../App/app-slice'
import { AppDispatch } from '../../App/store'
import { handleServerNetworkError } from '../../common/utils'
import { authAPI } from '../Auth/auth-api'

import { profileAPI } from './profile-api'

export type InitialStateAuthType = {
  userId: string
  user: UserType
}

export const upDateNameTC = createAsyncThunk(
  'profile/setNewName',
  async (newName: string, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const { data } = await profileAPI.updateUserInfo({
        name: newName,
        avatar: 'https//avatar-url.img',
      })

      dispatch(upDateNameAC(data.updatedUser))
      dispatch(setAppStatus('success'))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)

export const logOutAccountTC = createAsyncThunk('profile/setNewName', async (_, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  try {
    await authAPI.logout()

    dispatch(logOutAccountAC())
    dispatch(setStatusLoggedAC(false))
    dispatch(setAppStatus('success'))
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  }
})

const initialState: InitialStateAuthType = {
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
    logOutAccountAC: state => {
      state.user = {} as UserType
    },
    setData(state, action: PayloadAction<UserType>) {
      state.user = action.payload
    },
  },
})

export const { upDateNameAC, logOutAccountAC, setData } = profileSlice.actions
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

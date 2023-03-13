import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppMessage, setAppStatus } from '../../App/app-slice'

import { profileAPI } from './profile-api'

import { handleServerNetworkError } from 'common'

export type InitialStateAuthType = {
  userId: string
  user: UserType
}

export type upDateProfileType = {
  newName?: string
  newPhoto?: string
}

export const upDateProfileTC = createAsyncThunk(
  'profile/setNewName',
  async (newData: upDateProfileType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const { data } = await profileAPI.updateUserInfo({
        name: newData.newName,
        avatar: newData.newPhoto,
      })

      dispatch(upDateNameAC(data.updatedUser))
      dispatch(setAppStatus('success'))
      dispatch(setAppMessage('Profile updated'))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)

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
    setData(state, action: PayloadAction<UserType>) {
      state.user = action.payload
    },
  },
})

export const { upDateNameAC, setData } = profileSlice.actions
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

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppMessage, setAppStatus } from '../../App/app-slice'
import { handleServerNetworkError } from '../../common/utils'

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

import { AnyAction, configureStore } from '@reduxjs/toolkit'
import { ThunkDispatch } from 'redux-thunk'

import { authReducer } from '../features/Auth/auth-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>
